/**
 * Publish the flagship article drafts.
 *
 * Publishing does NOT mark them reviewed. `reviewedByExpert` stays false, so
 * the byline and the structured data credit "Dr. Shreyank Educare" (the
 * organisation) rather than claiming Dr. Shreyank personally vouches for
 * teaching he has not read. Tick "Reviewed by Dr. Shreyank" in Studio per
 * article to switch the byline to his name.
 *
 * Idempotent: an already-published slug is skipped.
 *
 * Usage:
 *   Preview:  node --env-file=.env.local scripts/publish-flagship.mjs
 *   Apply:    node --env-file=.env.local scripts/publish-flagship.mjs --commit
 */
import { createClient } from "@sanity/client";

const commit = process.argv.includes("--commit");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("✗ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

const SLUGS = [
  "common-pre-calculus-12-mistakes-burnaby",
  "how-to-prepare-for-physics-12-british-columbia",
  "step-by-step-guide-stoichiometry-grade-11-chemistry",
  "what-ubc-calculus-students-should-review-before-first-midterm",
  "concept-gap-or-practice-gap-parents-guide",
];

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (publishing)" : "DRY RUN"}`);

  let published = 0;
  let skipped = 0;

  for (const slug of SLUGS) {
    const draftId = `drafts.${slug}`;
    const draft = await client.getDocument(draftId);
    const live = await client.getDocument(slug);

    if (!draft && live) {
      console.log(`  = ${slug} — already published`);
      skipped++;
      continue;
    }
    if (!draft) {
      console.log(`  ! ${slug} — no draft found`);
      continue;
    }

    // Strip system fields; keep reviewedByExpert as-is (false) on purpose.
    const { _id, _rev, _createdAt, _updatedAt, _system, ...doc } = draft;
    console.log(`  + ${slug}  (reviewedByExpert=${doc.reviewedByExpert === true})`);
    published++;

    if (commit) {
      await client.createOrReplace({ ...doc, _id: slug });
      await client.delete(draftId);
    }
  }

  console.log(
    `\nDone. ${published} ${commit ? "published" : "would be published"}, ${skipped} already live.` +
      (commit ? "\nBylines credit the organisation until each is ticked 'Reviewed by Dr. Shreyank' in Studio." : "\nRe-run with --commit to publish.")
  );
}

run().catch((e) => {
  console.error("Publish failed:", e?.message || e);
  process.exit(1);
});
