/**
 * Add missing `_key` values to Content Sections on landing-page documents.
 *
 * Every object inside a Sanity array needs a _key. The content migration wrote
 * `sections` without one, so Studio showed "Missing keys" and refused to let
 * the list be edited. This repairs the existing documents; the migration script
 * now sets _key itself, so new documents are unaffected.
 *
 * Idempotent: items that already have a _key keep it untouched.
 *
 * Usage:
 *   Preview:  node --env-file=.env.local scripts/fix-missing-section-keys.mjs
 *   Apply:    node --env-file=.env.local scripts/fix-missing-section-keys.mjs --commit
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const commit = process.argv.includes("--commit");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("✗ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });
const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing to Sanity)" : "DRY RUN (no changes written)"}`);

  const docs = await client.fetch(
    `*[_type == "pageFaq" && defined(sections)]{ _id, pageSlug, sections }`
  );

  let fixed = 0;
  let items = 0;

  for (const d of docs) {
    const missing = (d.sections || []).filter((s) => !s?._key).length;
    if (!missing) continue;
    const sections = (d.sections || []).map((s) => (s?._key ? s : { ...s, _key: key() }));
    fixed++;
    items += missing;
    if (fixed <= 5) console.log(`  ${String(d.pageSlug).padEnd(42)} +${missing} key(s)`);
    if (commit) await client.patch(d._id).set({ sections }).commit();
  }
  if (fixed > 5) console.log(`  … and ${fixed - 5} more`);

  console.log(
    `\nDone. ${docs.length} doc(s) with sections; ${fixed} ${commit ? "repaired" : "would be repaired"} (${items} item(s)).` +
      (commit ? "" : " Re-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Fix failed:", err?.message || err);
  process.exit(1);
});
