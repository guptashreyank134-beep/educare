import { client, deadLinks } from "./flagship-lib.mjs";
const posts = await client.fetch(`*[_type=="post" && !(_id in path("drafts.**"))]{"slug":slug.current, body}`);
const all = new Map();
for (const p of posts) {
  if (!Array.isArray(p.body)) continue;
  for (const b of p.body) for (const m of b.markDefs || []) if (m.href) {
    if (!all.has(m.href)) all.set(m.href, new Set());
    all.get(m.href).add(p.slug);
  }
}
const dead = await deadLinks([...all.keys()]);
console.log(`  distinct internal links across ${posts.length} posts: ${[...all.keys()].filter(h=>h.startsWith("/")).length}`);
if (!dead.length) { console.log("  dead links: 0 ✓"); }
else {
  console.log(`  DEAD LINKS: ${dead.length}\n`);
  for (const d of dead) console.log(`   ${d}\n      used by: ${[...all.get(d)].join(", ")}`);
}
