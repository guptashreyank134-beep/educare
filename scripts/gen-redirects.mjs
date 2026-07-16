import { client } from "./flagship-lib.mjs";
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
const words = (b) => (Array.isArray(b) ? b : []).flatMap((x) => (Array.isArray(x.children) ? x.children.map((c) => c.text || "") : [])).join(" ").trim().split(/\s+/).filter(Boolean).length;
const all = await client.fetch(`*[_type=="post" && !(_id in path("drafts.**"))]{"slug":slug.current, body}`);
const fams = Object.keys(TARGETS).sort((a,b)=>b.length-a.length);
const out = [];
for (const p of all) {
  if (words(p.body) >= 1500) continue;
  const f = fams.find((f) => p.slug.startsWith(f + "-"));
  if (!f) continue;
  out.push([f, `  ["/blog/${p.slug}", "${TARGETS[f]}"],`]);
}
out.sort((a,b)=> a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
let last = "";
for (const [f, line] of out) {
  if (f !== last) { console.log(`\n  // ${f}`); last = f; }
  console.log(line);
}
console.error(`\n${out.length} redirect pairs generated`);
