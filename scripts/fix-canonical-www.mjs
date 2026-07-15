/**
 * Rewrite non-www canonical URLs stored in Sanity onto the www host.
 *
 * The site is served from www and the code now normalises canonicals at render
 * time, but the values saved in Studio were still non-www — which is confusing
 * to edit against and wrong if anything else reads the field directly.
 *
 * Idempotent: values already on www are skipped.
 *
 * Usage:
 *   Preview:  node --env-file=.env.local scripts/fix-canonical-www.mjs
 *   Apply:    node --env-file=.env.local scripts/fix-canonical-www.mjs --commit
 */

import { createClient } from "@sanity/client";

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

const toWww = (url) =>
  url.trim().replace(/^https?:\/\/(www\.)?drshreyankeducare\.com/i, "https://www.drshreyankeducare.com");

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing to Sanity)" : "DRY RUN (no changes written)"}`);

  const docs = await client.fetch(
    `*[defined(metaData.canonical)]{ _id, _type, "canonical": metaData.canonical }`
  );

  let changed = 0;
  for (const d of docs) {
    const next = toWww(d.canonical);
    if (next === d.canonical) continue;
    changed++;
    if (changed <= 5) console.log(`  ${d.canonical}\n    -> ${next}`);
    if (commit) await client.patch(d._id).set({ "metaData.canonical": next }).commit();
  }
  if (changed > 5) console.log(`  … and ${changed - 5} more`);

  console.log(
    `\nDone. ${docs.length} doc(s) with a canonical; ${changed} ${commit ? "rewritten to www" : "would be rewritten"}.` +
      (commit ? "" : " Re-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Fix failed:", err?.message || err);
  process.exit(1);
});
