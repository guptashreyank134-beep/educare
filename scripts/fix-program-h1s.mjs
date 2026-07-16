/**
 * Lengthen the short program-page H1s flagged by the Seobility crawl (all under
 * ~20 chars). Adds location keywords to help the page-2 Vancouver rankings.
 * Location word chosen to match what's already in each page body (so no new
 * "H1 keyword not in body" flag): "Burnaby & Vancouver" where both appear,
 * "Vancouver" where only Vancouver does. Replaces the FIRST <h1> (the hero).
 */
import { readFileSync, writeFileSync } from "node:fs";

// slug -> { old, new } (old = current hero H1 text, verified before swap)
const MAP = {
  physics: { old: "Physics Tutoring", neu: "Physics Tutoring in Burnaby & Vancouver" },
  chemistry: { old: "Chemistry Tutoring", neu: "Chemistry Tutoring in Burnaby & Vancouver" },
  biology: { old: "Biology Tutoring", neu: "Biology Tutoring in Burnaby & Vancouver" },
  finance: { old: "Finance Tutoring", neu: "Finance Tutoring in Burnaby & Vancouver" },
  "gmat-prep": { old: "GMAT Prep Program", neu: "GMAT Prep & Coaching in Burnaby & Vancouver" },
  "gre-prep": { old: "GRE Prep Program", neu: "GRE Prep & Coaching in Burnaby & Vancouver" },
  python: { old: "Python Programming", neu: "Python Programming Tutoring in Burnaby & Vancouver" },
  "physics-tutoring": { old: "Physics Tutoring", neu: "High School & University Physics Tutoring" },
  "ib-ap-tutoring": { old: "IB & AP Tutoring", neu: "IB & AP Tutoring in Vancouver" },
  "university-finance": { old: "University Finance", neu: "University Finance Tutoring in Vancouver" },
  "university-biology": { old: "University Biology", neu: "University Biology Tutoring in Vancouver" },
  "university-physics": { old: "University Physics", neu: "University Physics Tutoring in Vancouver" },
  french: { old: "French Course", neu: "French Language Tutoring in Vancouver" },
  mandarin: { old: "Mandarin Course", neu: "Mandarin Language Tutoring in Vancouver" },
  "mcat-prep": { old: "MCAT Prep Program", neu: "MCAT Prep & Tutoring in Vancouver" },
};

let fail = false;
for (const [slug, { old, neu }] of Object.entries(MAP)) {
  const file = `app/programs/${slug}/page.tsx`;
  let text = readFileSync(file, "utf8");
  // Match the first <h1 ...> ... </h1> and require its inner text === old.
  const m = text.match(/<h1\b[^>]*>\s*([\s\S]*?)\s*<\/h1>/);
  if (!m) { console.error(`✗ ${slug}: no <h1> found`); fail = true; continue; }
  const inner = m[1].trim();
  if (inner !== old) { console.error(`✗ ${slug}: hero H1 is "${inner}", expected "${old}"`); fail = true; continue; }
  const replaced = m[0].replace(m[1], (s) => s.replace(old, neu));
  text = text.replace(m[0], replaced);
  writeFileSync(file, text);
  console.log(`✓ ${slug}: "${old}" (${old.length}) -> "${neu}" (${neu.length})`);
}
if (fail) { console.error("\nSome pages not updated — review above."); process.exit(1); }
console.log("\nAll program H1s lengthened.");
