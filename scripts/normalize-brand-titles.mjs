/**
 * Make the brand consistent across page titles.
 *
 * The real inconsistency is "Educare" (generic — it is not the brand, and it
 * competes with every other Educare) and "Dr Shreyank Educare" (missing the
 * period). "DSE" is already gone.
 *
 * POLICY — because "Dr. Shreyank Educare" costs 23 of a 60-character budget and
 * cannot always fit:
 *   1. Never "Educare" alone, never "DSE", always the period in "Dr."
 *   2. Use "Dr. Shreyank Educare" when the brand appears and the title stays ≤60
 *   3. Use "Dr. Shreyank" when the full brand would push it over
 *   4. Drop the brand entirely rather than truncate the keywords — Google appends
 *      the site name anyway, and the keywords earn the click
 *
 * TITLES maps the pages the client specified; the rest are normalised by policy.
 * Idempotent.
 *
 *   Preview:  node --env-file=.env.local scripts/normalize-brand-titles.mjs
 *   Apply:    node --env-file=.env.local scripts/normalize-brand-titles.mjs --commit
 */
import { createClient } from "@sanity/client";

const commit = process.argv.includes("--commit");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) { console.error("✗ Missing Sanity env vars."); process.exit(1); }
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

const MAX = 60;

/** Exact titles specified by the client. */
const TITLES = {
  "page:home": "Math & Science Tutoring in Burnaby & Vancouver | Dr. Shreyank",
  "page:programs": "Math & Science Tutoring Programs | Burnaby & Vancouver",
  "page:pricing": "Tutoring Prices in Burnaby & Vancouver | Dr. Shreyank Educare",
  "page:about": "Meet Our Math & Science Tutors | Dr. Shreyank Educare",
  "programPage:mathematics": "Math Tutor in Burnaby & Vancouver | Grades 6–12 & University",
  "programPage:physics": "Physics Tutor in Burnaby & Vancouver | Dr. Shreyank",
  "programPage:chemistry": "Chemistry Tutor in Burnaby & Vancouver | IB, AP & University",
  "programPage:computer-science": "Coding & Computer Science Tutor in Burnaby & Vancouver",
};

/** Apply the brand policy to any other title. */
function normalize(title) {
  let t = title.trim();

  // "Dr Shreyank Educare" -> "Dr. Shreyank Educare"
  t = t.replace(/\bDr\s+Shreyank\s+Educare\b/g, "Dr. Shreyank Educare");
  // "| DSE" -> full brand (none left, but keep the rule enforced)
  t = t.replace(/\s*[|\-–]\s*DSE\s*$/i, " | Dr. Shreyank Educare");
  // "| Educare" alone -> full brand
  t = t.replace(/\s*[|\-–]\s*Educare\s*$/i, " | Dr. Shreyank Educare");
  // stray "Educare" not preceded by "Shreyank"
  t = t.replace(/(?<!Shreyank\s)\bEducare\b(?!\s*\|)/g, "Dr. Shreyank Educare");

  if (t.length <= MAX) return t;

  // Too long: shorten the brand before touching the keywords.
  const short = t.replace(/\bDr\. Shreyank Educare\b/, "Dr. Shreyank");
  if (short.length <= MAX) return short;

  // Still too long: drop the brand suffix — keywords earn the click.
  const nobrand = short.replace(/\s*[|\-–]\s*Dr\. Shreyank\s*$/, "").trim();
  return nobrand.length <= MAX ? nobrand : nobrand;
}

async function run() {
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}   (max ${MAX} chars)`);
  const docs = await client.fetch(
    `*[_type in ["page","programPage"] && defined(metaData.metaTitle)]{_id,_type,"s":slug.current,"t":metaData.metaTitle}`
  );

  let changed = 0;
  const over = [];
  for (const d of docs) {
    const mapped = TITLES[`${d._type}:${d.s}`];
    const next = mapped ?? normalize(d.t);
    if (next.length > MAX) over.push([d.s, next.length, next]);
    if (next === d.t) continue;
    changed++;
    console.log(`  ${d.s}`);
    console.log(`    - ${d.t}  (${d.t.length})`);
    console.log(`    + ${next}  (${next.length})${mapped ? "  [client-specified]" : ""}`);
    if (commit) await client.patch(d._id).set({ "metaData.metaTitle": next }).commit();
  }

  // Uniqueness matters as much as the brand.
  const after = docs.map((d) => TITLES[`${d._type}:${d.s}`] ?? normalize(d.t));
  const seen = new Map();
  for (const t of after) seen.set(t, (seen.get(t) || 0) + 1);
  const dupes = [...seen.entries()].filter(([, n]) => n > 1);

  console.log(`\nDone. ${changed} title(s) ${commit ? "updated" : "would change"} of ${docs.length}.`);
  console.log(`  duplicates : ${dupes.length ? dupes.map(([t]) => t) : "none"}`);
  console.log(`  over ${MAX} chars : ${over.length ? over.map(([s, n]) => `${s} (${n})`) : "none"}`);
  if (!commit) console.log("\nRe-run with --commit to apply.");
}

run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
