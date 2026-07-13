/**
 * One-time migration: convert plain-string FAQ answers into Portable Text
 * (the new `faqAnswer` rich-text format) for `vancouverPage` and
 * `resourcePage` documents, including their drafts.
 *
 * Usage:
 *   1. Create a write token in Sanity (Manage > API > Tokens, "Editor" role).
 *   2. Add to .env.local:   SANITY_API_WRITE_TOKEN=sk...
 *      (and make sure NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET point at the
 *       real project, not the placeholder.)
 *   3. Preview (no writes):  node --env-file=.env.local scripts/migrate-faq-answers.mjs
 *   4. Apply the changes:    node --env-file=.env.local scripts/migrate-faq-answers.mjs --commit
 *
 * The script is idempotent — answers already in rich-text format are skipped,
 * so it is safe to run more than once.
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const commit = process.argv.includes("--commit");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "placeholder-project-123") {
  console.error("✗ NEXT_PUBLIC_SANITY_PROJECT_ID is missing or still the placeholder value.");
  process.exit(1);
}
if (!token) {
  console.error("✗ SANITY_API_WRITE_TOKEN is not set. Create an Editor token in Sanity and add it to .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: "raw", // include drafts as well as published documents
});

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

// "Line one\n\nLine two" -> two normal blocks, each with a single text span.
function stringToBlocks(text) {
  const segments = String(text)
    .split(/\n{1,}/)
    .map((s) => s.trim())
    .filter(Boolean);

  const source = segments.length ? segments : [""];

  return source.map((segment) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: segment, marks: [] }],
  }));
}

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing changes)" : "DRY RUN (no changes written)"}`);

  const docs = await client.fetch(
    `*[_type in ["vancouverPage", "resourcePage"]]{ _id, _type, faqs }`
  );

  let docsChanged = 0;
  let answersConverted = 0;

  for (const doc of docs) {
    if (!Array.isArray(doc.faqs) || doc.faqs.length === 0) continue;

    let changed = false;
    const newFaqs = doc.faqs.map((faq) => {
      // Only convert legacy string answers; leave rich-text answers untouched.
      if (typeof faq?.answer === "string") {
        changed = true;
        answersConverted++;
        return { ...faq, answer: stringToBlocks(faq.answer) };
      }
      return faq;
    });

    if (!changed) continue;
    docsChanged++;

    console.log(
      `  ${commit ? "Updating" : "Would update"} ${doc._id} (${doc.faqs.length} FAQ item(s))`
    );

    if (commit) {
      await client.patch(doc._id).set({ faqs: newFaqs }).commit();
    }
  }

  console.log(
    `\nDone. ${answersConverted} answer(s) across ${docsChanged} document(s) ${
      commit ? "converted." : "would be converted. Re-run with --commit to apply."
    }`
  );
}

run().catch((err) => {
  console.error("Migration failed:", err.message || err);
  process.exit(1);
});
