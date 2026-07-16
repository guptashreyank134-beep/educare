/**
 * Shorten the 9 over-length programPage meta descriptions (>1000px) and fix two
 * broken tails ("consultation. session!", "consultation. today!").
 */
import { createClient } from "@sanity/client";
const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-12",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});
const COMMIT = process.argv.includes("--commit");
function wu(s){let u=0;for(const ch of s){if("iIl.,:;'|!jft".includes(ch))u+=0.34;else if("mwMW—".includes(ch))u+=0.92;else if(ch===" ")u+=0.3;else if(ch===ch.toUpperCase()&&ch!==ch.toLowerCase())u+=0.7;else u+=0.55;}return u;}
const dS=1065/wu("Dr. Shreyank Educare offers 1-on-1 tutoring, small group classes, online sessions & intensive exam prep in Burnaby. Flexible scheduling. Book a free 30-minute consultation.");
const dp=s=>Math.round(wu(s)*dS);

const R = {
  javascript: "Kids learn JavaScript by building real games, apps and websites in Vancouver — a structured 3-level program from beginner to advanced. Free consultation.",
  biology: "Understand biology, don't just memorize it. Expert tutoring for pre-med, nursing and high-school students in Burnaby & Vancouver. Free consultation.",
  "computer-science": "Expert CS tutoring for university students in Vancouver — data structures, algorithms, OOP, AI/ML, databases and coding assignments. Free consultation.",
  physics: "Struggling with Physics 11 or 12? Expert help with mechanics, electricity, waves and problem-solving in Burnaby & Vancouver. Free consultation.",
  "university-physics": "Struggling with PHYS 100/101 or Langara physics? University physics tutoring in Burnaby & Vancouver — mechanics, E&M and quantum. Book now!",
  mathematics: "Expert math tutoring for Grades 6–12 in Burnaby & Vancouver — Pre-Calculus 11/12, algebra, calculus and word problems. Book a free consultation.",
  "university-biology": "Go beyond memorization with expert university biology tutoring in Burnaby & Vancouver — genetics, anatomy, cell biology and ecology. Great for pre-med.",
  "mcat-prep": "MCAT coaching for pre-med students in Vancouver — all 4 sections, AAMC practice tests and score analytics. Target 510–520+. Free consultation!",
  "university-finance": "Finance tutoring for BCom, MBA, CFA (I, II, III) & CSC students in Vancouver & Burnaby — corporate finance, investments, risk and FinTech. Enroll today!",
};

let fail = false;
const patches = [];
for (const [slug, d] of Object.entries(R)) {
  const doc = await c.fetch(`*[_type=="programPage" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, "d":metaData.metaDescription}`, { s: slug });
  if (!doc?._id) { console.error(`✗ programPage/${slug}: not found`); fail = true; continue; }
  const px = dp(d);
  if (px > 1000) { console.error(`✗ ${slug}: new ${px}px still over 1000`); fail = true; continue; }
  console.log(`  ${slug}: ${doc.d ? dp(doc.d) : "?"}px -> ${px}px`);
  patches.push({ id: doc._id, slug, d });
}
if (fail) { console.error("\nRefused."); process.exit(1); }
console.log(`\n${patches.length} programPages. Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}`);
if (!COMMIT) process.exit(0);
let tx = c.transaction();
for (const p of patches) tx = tx.patch(p.id, { set: { "metaData.metaDescription": p.d } });
await tx.commit();
let bad = 0;
for (const p of patches) {
  const d = await c.fetch(`*[_id==$id][0].metaData.metaDescription`, { id: p.id });
  if (d !== p.d) { console.error(`✗ ${p.slug} not applied`); bad++; }
}
console.log(bad === 0 ? "✓ all verified live" : `✗ ${bad} failed`);
process.exit(bad === 0 ? 0 : 1);
