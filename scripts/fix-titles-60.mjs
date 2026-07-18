/**
 * Semrush flags titles > 60 characters (stricter than Seobility's pixel rule).
 * Seven Sanity metaTitles are 61–64 chars — some reverted to the old
 * word-repetition form ("X in Y Tutoring | Dr. Shreyank Educare"). Re-shorten
 * to <=60, keeping the lead keyword. Verifies each and reads back.
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

// slug -> { type, title }  (new title, <=60 chars)
const R = [
  { type: "post", slug: "physics-kinematics-dynamics", t: "Kinematics & Dynamics | Dr. Shreyank Educare" },
  { type: "post", slug: "biology-genetics-evolution", t: "Genetics & Evolution | Dr. Shreyank Educare" },
  { type: "post", slug: "ib-ap-tutoring-ap-physics-1-2-c", t: "AP Physics 1, 2 & C | IB & AP Tutoring" },
  { type: "post", slug: "university-biology-molecular-biology", t: "Molecular Biology | University Biology Tutor" },
  { type: "post", slug: "ib-ap-tutoring-ib-physics-chemistry-biology-sl-hl", t: "IB Physics, Chemistry & Biology (SL & HL)" },
  { type: "page", slug: "home", t: "Math & Science Tutoring in Burnaby & Vancouver" },
  { type: "page", slug: "pricing", t: "Tutoring Prices in Burnaby & Vancouver" },
];

let fail = false;
const patches = [];
for (const r of R) {
  if (r.t.length > 60) { console.error(`✗ ${r.slug}: new title ${r.t.length} chars > 60`); fail = true; continue; }
  const doc = await c.fetch(`*[_type==$t && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, "old":metaData.metaTitle}`, { t: r.type, s: r.slug });
  if (!doc?._id) { console.error(`✗ ${r.type}/${r.slug}: not found`); fail = true; continue; }
  console.log(`  ${r.slug}: ${doc.old?.length ?? "?"}ch -> ${r.t.length}ch  "${r.t}"`);
  patches.push({ id: doc._id, slug: r.slug, t: r.t });
}
if (fail) { console.error("\nRefused."); process.exit(1); }
console.log(`\n${patches.length} titles. Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}`);
if (!COMMIT) process.exit(0);
let tx = c.transaction();
for (const p of patches) tx = tx.patch(p.id, { set: { "metaData.metaTitle": p.t } });
await tx.commit();
let bad = 0;
for (const p of patches) {
  const t = await c.fetch(`*[_id==$id][0].metaData.metaTitle`, { id: p.id });
  if (t !== p.t) { console.error(`✗ ${p.slug} not applied`); bad++; }
}
console.log(bad ? `✗ ${bad} failed` : "✓ all verified live");
process.exit(bad ? 0 : 0);
