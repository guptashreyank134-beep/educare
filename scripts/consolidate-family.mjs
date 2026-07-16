/**
 * Consolidate one family of thin blog posts into the page that should own the topic.
 *
 * Order is deliberate and matters:
 *   1. the redirect must already exist in next.config.ts  (checked here, not assumed)
 *   2. only then is the post deleted
 * Reversed, there is a window where the URL 404s. A 301 that lands on a live page
 * is safe even while the post still exists, so redirects go first.
 *
 * Refuses to delete a post that anything still links to, refuses if the redirect
 * target does not resolve, and refuses if the backup is missing. Idempotent:
 * already-deleted posts are skipped.
 *
 *   Plan:   node --env-file=.env.local scripts/consolidate-family.mjs mandarin
 *   Apply:  node --env-file=.env.local scripts/consolidate-family.mjs mandarin --commit
 */
import { client, commit, deadLinks } from "./flagship-lib.mjs";
import { readFileSync, existsSync } from "node:fs";

const family = process.argv[2];
if (!family) { console.error("usage: consolidate-family.mjs <family> [--commit]"); process.exit(1); }

const TARGETS = {
  mandarin: "/programs/mandarin", french: "/programs/french", python: "/programs/python",
  javascript: "/programs/javascript", "web-development": "/programs/web-development",
  "computer-science": "/programs/computer-science", finance: "/programs/finance",
  biology: "/programs/biology", chemistry: "/programs/chemistry", physics: "/programs/physics",
  mathematics: "/programs/mathematics", "pre-calculus": "/pre-calculus-12-tutor-burnaby",
  "gmat-prep": "/programs/gmat-prep", "gre-prep": "/programs/gre-prep",
  "mcat-prep": "/programs/mcat-prep", "sat-prep": "/programs/sat-prep",
  "ib-ap-tutoring": "/programs/ib-ap-tutoring",
  "university-biology": "/programs/university-biology",
  "university-chemistry": "/programs/university-chemistry",
  "university-physics": "/programs/university-physics",
  "university-mathematics": "/programs/university-mathematics",
  "university-finance": "/programs/university-finance",
  "vancouver-math-tutoring": "/programs/mathematics",
  "burnaby-stem-tutoring": "/programs/burnaby-stem-tutoring",
};
const target = TARGETS[family];
if (!target) { console.error(`✗ unknown family "${family}"`); process.exit(1); }

const BACKUP = "scripts/backups/all-posts-before-consolidation.json";
if (!existsSync(BACKUP)) { console.error(`✗ backup missing at ${BACKUP} — refusing to delete anything.`); process.exit(1); }

const words = (b) => (Array.isArray(b) ? b : []).flatMap((x) => (Array.isArray(x.children) ? x.children.map((c) => c.text || "") : [])).join(" ").trim().split(/\s+/).filter(Boolean).length;

const all = await client.fetch(`*[_type == "post" && !(_id in path("drafts.**"))]{_id, "slug": slug.current, title, body}`);
const victims = all.filter((p) => p.slug.startsWith(family + "-") && words(p.body) < 1500);

console.log(`Mode: ${commit ? "COMMIT" : "PLAN"}`);
console.log(`family : ${family}`);
console.log(`target : ${target}`);

if (!victims.length) { console.log("\n  nothing to consolidate — already done (idempotent) ✓"); process.exit(0); }

// 1. the target must resolve
const dead = await deadLinks([target]);
if (dead.length) { console.error(`\n  ✗ target ${target} does not resolve — a 301 to a 404 is worse than a thin page.`); process.exit(1); }
console.log(`         ✓ target resolves`);

// 2. backup must contain every victim
const backup = JSON.parse(readFileSync(BACKUP, "utf8"));
const backedUp = new Set(backup.map((d) => d.slug?.current).filter(Boolean));
const missing = victims.filter((v) => !backedUp.has(v.slug));
if (missing.length) { console.error(`\n  ✗ not in the backup: ${missing.map((m) => m.slug).join(", ")} — refusing.`); process.exit(1); }
console.log(`         ✓ all ${victims.length} present in the backup`);

// 3. The redirect list in next.config.ts is the source of truth for what dies.
//    A thin post with no redirect is one we deliberately chose to keep and
//    deepen (e.g. the course-code pages) — skip it rather than delete it.
const cfg = readFileSync("next.config.ts", "utf8");
const kept = victims.filter((v) => !cfg.includes(`"/blog/${v.slug}"`));
for (const v of kept) console.log(`         – keeping ${v.slug} (no redirect declared)`);
const doomed = victims.filter((v) => cfg.includes(`"/blog/${v.slug}"`));
if (!doomed.length) { console.log("\n  nothing declared for consolidation in this family ✓"); process.exit(0); }
console.log(`         ✓ redirects present for all ${doomed.length} to be removed`);
victims.length = 0;
victims.push(...doomed);

// 4. nothing may still link to them
const surviving = await client.fetch(`*[_type == "post"]{"slug": slug.current, body}`);
const inbound = [];
const kill = new Set(victims.map((v) => v.slug));
for (const p of surviving) {
  if (!Array.isArray(p.body) || kill.has(p.slug)) continue;
  for (const b of p.body) for (const m of b.markDefs || []) {
    const hit = (m.href || "").match(/^\/blog\/(.+)$/);
    if (hit && kill.has(hit[1])) inbound.push(`${p.slug} -> ${hit[1]}`);
  }
}
if (inbound.length) { console.error(`\n  ✗ still linked from: ${inbound.join(", ")} — would create dead links.`); process.exit(1); }
console.log(`         ✓ nothing links to them`);

console.log(`\n  posts to remove (${victims.length}):`);
for (const v of victims) console.log(`     ${String(words(v.body)).padStart(4)}w  ${v.slug}`);

if (!commit) { console.log(`\n  Re-run with --commit to delete. Redirects are already live, so the URLs work either way.`); process.exit(0); }

for (const v of victims) {
  await client.delete(v._id);
  await client.delete(`drafts.${v._id}`).catch(() => {});
  console.log(`     deleted  ${v.slug}`);
}
console.log(`\n  ✓ ${victims.length} removed; /blog/<slug> now 301s to ${target}`);
