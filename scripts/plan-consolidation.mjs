/**
 * Map the thin blog posts into families and find a redirect target for each.
 *
 * Read-only. Nothing is deleted or written. The point is to see the shape of the
 * problem and to prove every family has a real page to redirect to BEFORE any
 * post is removed — a 301 to a 404 is worse than a thin page.
 */
import { client, deadLinks } from "./flagship-lib.mjs";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const posts = await client.fetch(
  `*[_type == "post" && !(_id in path("drafts.**"))]{"slug": slug.current, title, body}`,
);
const wordsOf = (b) => (Array.isArray(b) ? b : []).flatMap((x) => (Array.isArray(x.children) ? x.children.map((c) => c.text || "") : [])).join(" ").trim().split(/\s+/).filter(Boolean).length;

const thin = posts.map((p) => ({ ...p, words: wordsOf(p.body) })).filter((p) => p.words < 1500);

// Family = the leading topic segment of the slug.
const FAMILIES = [
  "mandarin", "french", "python", "javascript", "web-development", "computer-science",
  "finance", "biology", "chemistry", "physics", "mathematics", "pre-calculus",
  "gmat-prep", "gre-prep", "mcat-prep", "sat-prep", "ib-ap-tutoring",
  "university-biology", "university-chemistry", "university-physics", "university-mathematics",
  "university-finance", "vancouver-math-tutoring", "burnaby-stem-tutoring",
];
const famOf = (slug) => FAMILIES.filter((f) => slug.startsWith(f + "-")).sort((a, b) => b.length - a.length)[0] || "(other)";

const groups = {};
for (const p of thin) (groups[famOf(p.slug)] ||= []).push(p);

// Candidate redirect targets that actually exist.
const routes = new Set();
const walk = (dir, base = "") => {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (!statSync(full).isDirectory()) continue;
    if (e.startsWith("_") || e.startsWith("(") || e.startsWith("[")) continue;
    const r = `${base}/${e}`;
    if (existsSync(join(full, "page.tsx"))) routes.add(r);
    walk(full, r);
  }
};
walk("app");
for (const f of readdirSync("data")) {
  if (!f.endsWith(".ts")) continue;
  for (const m of readFileSync(join("data", f), "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)) routes.add(`/${m[1]}`);
}

// Proposed target per family — every one must be a route that exists.
const TARGET = {
  "mandarin": "/programs/mandarin",
  "french": "/programs/french",
  "python": "/programs/python",
  "javascript": "/programs/javascript",
  "web-development": "/programs/web-development",
  "computer-science": "/programs/computer-science",
  "finance": "/programs/finance",
  "biology": "/programs/biology",
  "chemistry": "/programs/chemistry",
  "physics": "/programs/physics",
  "mathematics": "/programs/mathematics",
  "pre-calculus": "/pre-calculus-12-tutor-burnaby",
  "gmat-prep": "/programs/gmat-prep",
  "gre-prep": "/programs/gre-prep",
  "mcat-prep": "/programs/mcat-prep",
  "sat-prep": "/programs/sat-prep",
  "ib-ap-tutoring": "/programs/ib-ap-tutoring",
  "university-biology": "/programs/university-biology",
  "university-chemistry": "/programs/university-chemistry",
  "university-physics": "/programs/university-physics",
  "university-mathematics": "/programs/university-mathematics",
  "university-finance": "/programs/university-finance",
  "vancouver-math-tutoring": "/programs/mathematics",
  "burnaby-stem-tutoring": "/programs/burnaby-stem-tutoring",
};

console.log(`thin posts: ${thin.length}\n`);
console.log("FAMILY".padEnd(26), "POSTS".padStart(5), "  AVG", "  TARGET");
console.log("-".repeat(88));
let ok = 0, broken = [];
for (const [fam, list] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
  const t = TARGET[fam];
  const exists = t && routes.has(t);
  const avg = Math.round(list.reduce((s, p) => s + p.words, 0) / list.length);
  console.log(
    fam.padEnd(26),
    String(list.length).padStart(5),
    String(avg).padStart(5),
    ` ${t || "(none)"} ${exists ? "✓" : "✗ DOES NOT EXIST"}`,
  );
  if (exists) ok += list.length; else broken.push(fam);
}
console.log("-".repeat(88));
console.log(`\n  posts with a valid redirect target : ${ok}`);
console.log(`  families with NO valid target      : ${broken.length}${broken.length ? " -> " + broken.join(", ") : " ✓"}`);
console.log(`\n  (other) bucket — needs individual judgement:`);
for (const p of groups["(other)"] || []) console.log(`     ${String(p.words).padStart(5)}  ${p.slug}`);
