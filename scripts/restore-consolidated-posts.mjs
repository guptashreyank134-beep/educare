/**
 * Put back the 70 blog posts removed in the 2026-07-15 consolidation.
 *
 * ORDER (the lesson from doing this backwards last time):
 *   1. restore the documents to Sanity  <- this script
 *   2. THEN remove the redirects from next.config.ts and deploy
 *
 * That order never leaves a URL with neither content nor a redirect. While the
 * old config is still deployed the redirect keeps firing, so visitors land on
 * the programme page rather than a 404; once the deploy lands, the restored post
 * renders. Reversed, every URL 404s until the posts are back.
 *
 * "What to restore" is derived, not typed: it is every published post in the
 * backup that is currently absent from Sanity. So the script cannot restore the
 * wrong set, and it is idempotent — run it twice and the second run finds
 * nothing missing.
 *
 *   Plan:   node --env-file=.env.local scripts/restore-consolidated-posts.mjs
 *   Apply:  node --env-file=.env.local scripts/restore-consolidated-posts.mjs --commit
 */
import { client, commit } from "./flagship-lib.mjs";
import { readFileSync, existsSync } from "node:fs";

const BACKUP = "scripts/backups/all-posts-before-consolidation.json";
if (!existsSync(BACKUP)) { console.error(`✗ backup missing at ${BACKUP}`); process.exit(1); }

const backup = JSON.parse(readFileSync(BACKUP, "utf8"));
const live = new Set(await client.fetch(`*[_type == "post"]._id`));

// Only published docs; drafts are not what was deleted here.
const candidates = backup.filter((d) => d._type === "post" && !d._id.startsWith("drafts."));
const missing = candidates.filter((d) => !live.has(d._id));

const words = (b) => (Array.isArray(b) ? b : []).flatMap((x) => (Array.isArray(x.children) ? x.children.map((c) => c.text || "") : [])).join(" ").trim().split(/\s+/).filter(Boolean).length;

console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
console.log(`  backup holds        : ${candidates.length} published posts`);
console.log(`  currently in Sanity : ${candidates.length - missing.length}`);
console.log(`  to restore          : ${missing.length}`);

if (!missing.length) { console.log("\n  nothing missing — already restored (idempotent) ✓"); process.exit(0); }

// Strip system fields Sanity rejects or manages itself.
const clean = (d) => {
  const { _rev, _createdAt, _updatedAt, ...rest } = d;
  return rest;
};

console.log(`\n  posts to restore:`);
for (const d of missing) console.log(`     ${String(words(d.body)).padStart(4)}w  ${d.slug?.current}`);

if (!commit) { console.log(`\n  Re-run with --commit to restore.`); process.exit(0); }

let n = 0;
for (const d of missing) {
  await client.createOrReplace(clean(d));
  n++;
}
console.log(`\n  ✓ restored ${n} posts`);

const after = await client.fetch(`count(*[_type == "post" && !(_id in path("drafts.**"))])`);
console.log(`  published posts now : ${after}`);
console.log(`\n  NEXT: remove their redirects from next.config.ts, or they stay shadowed by a 301.`);
