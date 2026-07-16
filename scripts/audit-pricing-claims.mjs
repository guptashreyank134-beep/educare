/** Where does the site state a price? Read before writing a pricing article. */
import { client } from "./flagship-lib.mjs";

const d = await client.fetch(
  `*[_id == "blog-post-how-much-does-math-tutoring-cost-burnaby"][0]{
     title, "headings": body[style match "h*"].children[0].text, metaData
   }`,
);
console.log("title   :", d?.title);
console.log("metaT   :", d?.metaData?.metaTitle);
console.log("metaD   :", d?.metaData?.metaDescription);
console.log("headings:");
for (const h of d?.headings || []) console.log("   -", h);

const parts = await client.fetch(
  `*[_id == "blog-post-how-much-does-math-tutoring-cost-burnaby"][0].body[].children[].text`,
);
const txt = (parts || []).join(" ");
console.log("\nevery sentence in that post mentioning a price:");
for (const s of txt.split(/(?<=[.!?])\s+/)) if (s.includes("$")) console.log("   *", s.trim());

console.log("\nprice claims across ALL posts (published):");
const posts = await client.fetch(
  `*[_type == "post" && !(_id in path("drafts.**"))]{"slug": slug.current, body}`,
);
for (const p of posts) {
  if (!Array.isArray(p.body)) continue;
  const t = p.body.flatMap((b) => (Array.isArray(b.children) ? b.children.map((c) => c.text || "") : [])).join(" ");
  for (const s of t.split(/(?<=[.!?])\s+/)) {
    if (/\$\s?\d/.test(s)) console.log(`   [${p.slug}] ${s.trim().slice(0, 150)}`);
  }
}
