/**
 * Seobility flags "word repetition" on blog titles using the auto-pattern
 * "{Subtopic} in {Subject} Tutoring | Brand" (e.g. Biology...Biology). Rewrite
 * to drop the repeated word, keep the lead keyword, stay <=60 chars. A built-in
 * detector refuses any new title that still repeats a significant word.
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

const R = {
  "biology-cell-biology": "Cell Biology Tutoring | Dr. Shreyank Educare",
  "biology-molecular-biology": "Molecular Biology Tutoring | Dr. Shreyank Educare",
  "finance-practical-application-of-finance": "Practical Applications of Finance | Dr. Shreyank",
  "gmat-prep-verbal-quantitative-focus": "GMAT & GRE: Verbal & Quantitative Prep",
  "mandarin-conversational-mandarin-pronunciation": "Conversational Mandarin & Pronunciation",
  "physics-physics-the-underlying-math": "Physics & the Underlying Math | Dr. Shreyank",
  "university-biology-general-biology": "General Biology | University Tutor",
  "university-biology-molecular-biology": "Molecular Biology | University Tutor",
  "university-chemistry-ubc-chemistry-chem-111-121-123": "UBC Chemistry Tutor | CHEM 111/121/123",
  "university-finance-msc-phd-finance-studies": "MSc & PhD Finance Studies | Dr. Shreyank",
  "university-physics-ubc-physics-phys-100-101-107-108": "UBC Physics Tutor | PHYS 100/101/107/108",
  "vancouver-math-tutoring-elementary-middle-school-math": "Elementary & Middle School Math | Vancouver",
  "web-development-api-development-integration": "API Development & Integration | Web Dev",
  "web-development-backend-development-node-js-express": "Node.js & Express Backend | Dr. Shreyank",
  "web-development-frontend-development-html-css-react": "Frontend with HTML, CSS & React | Web Dev",
  "step-by-step-guide-stoichiometry-grade-11-chemistry": "Stoichiometry Guide for Grade 11 Chemistry",
};

const STOP = new Set(["the","and","in","of","for","a","to","with","dr","shreyank","educare","tutoring","tutor","by"]);
const repeatedWord = (t) => {
  const words = t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 3 && !STOP.has(w));
  const seen = {};
  for (const w of words) { seen[w] = (seen[w] || 0) + 1; if (seen[w] > 1) return w; }
  return null;
};

let fail = false;
const patches = [];
for (const [slug, t] of Object.entries(R)) {
  const rep = repeatedWord(t);
  if (rep) { console.error(`✗ ${slug}: new title still repeats "${rep}"`); fail = true; continue; }
  if (t.length > 60) { console.error(`✗ ${slug}: ${t.length} chars > 60`); fail = true; continue; }
  const doc = await c.fetch(`*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, "old":metaData.metaTitle}`, { s: slug });
  if (!doc?._id) { console.error(`✗ ${slug}: not found`); fail = true; continue; }
  console.log(`  ${slug}: (${doc.old?.length}ch) -> "${t}" (${t.length}ch)`);
  patches.push({ id: doc._id, slug, t });
}
if (fail) { console.error("\nRefused."); process.exit(1); }
console.log(`\n${patches.length} titles. Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}`);
if (!COMMIT) process.exit(0);
let tx = c.transaction();
for (const p of patches) tx = tx.patch(p.id, { set: { "metaData.metaTitle": p.t } });
await tx.commit();
let bad = 0;
for (const p of patches) { const t = await c.fetch(`*[_id==$id][0].metaData.metaTitle`, { id: p.id }); if (t !== p.t) { console.error(`✗ ${p.slug} not applied`); bad++; } }
console.log(bad ? `✗ ${bad} failed` : "✓ all verified live");
