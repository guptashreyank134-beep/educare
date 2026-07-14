/**
 * One-time SEO migration: shorten titles that exceed 65 characters so they
 * don't get truncated in search results. Covers blog posts AND page /
 * programPage documents (whose metaData.metaTitle drives the <title>).
 *
 * The rendered <title> uses metaData.metaTitle when present, otherwise the
 * document title. This script shortens whichever field drives the title.
 *
 * Shortening rule (applied in order until <= 65 chars):
 *   1. Drop a leading "Mastering " prefix.
 *   2. If still too long, drop the " | Dr. Shreyank Educare" brand suffix.
 *   3. If still too long, truncate at a word boundary.
 *
 * Usage:
 *   1. Create an Editor token in Sanity (Manage > API > Tokens).
 *   2. Add SANITY_API_WRITE_TOKEN=sk... to .env.local (with the REAL project id).
 *   3. Preview:  node --env-file=.env.local scripts/shorten-blog-titles.mjs
 *   4. Apply:    node --env-file=.env.local scripts/shorten-blog-titles.mjs --commit
 *
 * Idempotent — titles already <= 65 chars are skipped, so it is safe to re-run.
 */

import { createClient } from "@sanity/client";

const commit = process.argv.includes("--commit");
const MAX = 65;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "placeholder-project-123") {
  console.error("✗ NEXT_PUBLIC_SANITY_PROJECT_ID is missing or still the placeholder value.");
  process.exit(1);
}
if (!token) {
  console.error("✗ SANITY_API_WRITE_TOKEN is not set. Create an Editor token and add it to .env.local.");
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

const BRAND_SUFFIX = /\s*[|\-–—]\s*Dr\.?\s*Shreyank\s*Educare\s*$/i;

function shorten(title) {
  let t = String(title).trim();
  if (t.length <= MAX) return t;

  // 1. Drop "Mastering " prefix
  t = t.replace(/^Mastering\s+/i, "").trim();
  if (t.length <= MAX) return t;

  // 2. Drop the brand suffix
  t = t.replace(BRAND_SUFFIX, "").trim();
  if (t.length <= MAX) return t;

  // 3. Truncate at a word boundary
  t = t.slice(0, MAX).replace(/\s+\S*$/, "").trim();
  return t;
}

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing changes)" : "DRY RUN (no changes written)"}`);

  const posts = await client.fetch(
    `*[_type in ["post", "page", "programPage"]]{ _id, _type, title, "metaTitle": metaData.metaTitle }`
  );

  let changed = 0;
  for (const post of posts) {
    // The <title> prefers metaTitle; shorten whichever field is the source.
    const usesMeta = typeof post.metaTitle === "string" && post.metaTitle.length > 0;
    const current = usesMeta ? post.metaTitle : post.title;
    if (typeof current !== "string" || current.length <= MAX) continue;

    const next = shorten(current);
    if (next === current) continue;

    changed++;
    console.log(`\n  ${current.length}→${next.length} chars`);
    console.log(`    - ${current}`);
    console.log(`    + ${next}`);

    if (commit) {
      const patch = client.patch(post._id);
      if (usesMeta) {
        patch.set({ "metaData.metaTitle": next });
      } else {
        patch.set({ title: next });
      }
      await patch.commit();
    }
  }

  console.log(
    `\nDone. ${changed} title(s) ${commit ? "shortened." : "would be shortened. Re-run with --commit to apply."}`
  );
}

run().catch((err) => {
  console.error("Migration failed:", err.message || err);
  process.exit(1);
});
