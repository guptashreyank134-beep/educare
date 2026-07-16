/** Group the remaining thin posts so we upgrade what deserves depth and consolidate what doesn't. */
import { client } from "./flagship-lib.mjs";

const posts = await client.fetch(
  `*[_type == "post" && !(_id in path("drafts.**"))]{title, "slug": slug.current, body, reviewedByExpert}`,
);

const rows = posts.map((p) => {
  const b = Array.isArray(p.body) ? p.body : [];
  const words = b
    .flatMap((x) => (Array.isArray(x.children) ? x.children.map((c) => c.text || "") : []))
    .join(" ").trim().split(/\s+/).filter(Boolean).length;
  const headings = b.filter((x) => /^h[23]$/.test(x.style || "")).map((x) => (x.children || [])[0]?.text || "");
  return { slug: p.slug, title: p.title, words, headings, broken: !Array.isArray(p.body) };
});

// The auto-generated stubs all share the same skeleton headings.
const STUB = ["What You'll Learn Here", "Key Concepts to Master", "Where Students Slip Up", "Smart Ways to Study", "Your Questions, Answered", "How We Can Help"];
const isStub = (r) => STUB.filter((h) => r.headings.includes(h)).length >= 4;

const broken = rows.filter((r) => r.broken);
const stubs = rows.filter((r) => !r.broken && isStub(r));
const real = rows.filter((r) => !r.broken && !isStub(r) && r.words < 1500);
const done = rows.filter((r) => !r.broken && r.words >= 1500);

console.log(`TOTAL PUBLISHED POSTS: ${rows.length}\n`);
console.log(`  ${String(done.length).padStart(3)}  already >= 1,500 words`);
console.log(`  ${String(broken.length).padStart(3)}  BROKEN — body is a raw HTML string, not Portable Text`);
console.log(`  ${String(stubs.length).padStart(3)}  auto-generated stubs (identical 6-heading skeleton)`);
console.log(`  ${String(real.length).padStart(3)}  genuine articles under 1,500 words\n`);

console.log("BROKEN (live and probably rendering wrong):");
for (const r of broken) console.log(`   ${r.slug}`);

console.log("\nGENUINE ARTICLES WORTH DEEPENING (closest to the floor first):");
for (const r of real.sort((a, b) => b.words - a.words)) console.log(`   ${String(r.words).padStart(4)}  ${r.slug}`);

// How much do the stubs overlap each other? Group by their topic prefix.
const fam = {};
for (const r of stubs) {
  const key = r.slug.split("-").slice(0, 2).join("-");
  (fam[key] ||= []).push(r);
}
console.log("\nSTUB FAMILIES (each family shares one skeleton — consolidation candidates):");
for (const [k, v] of Object.entries(fam).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`   ${String(v.length).padStart(2)} posts  ${k}-*   avg ${Math.round(v.reduce((s, x) => s + x.words, 0) / v.length)} words`);
}
