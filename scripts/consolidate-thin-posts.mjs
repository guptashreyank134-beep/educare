/**
 * Consolidate thin blog posts that cannibalise a stronger page.
 *
 * Each post below is a ~400-word generic overview of the exact topic a
 * dedicated landing page already covers properly. They rank for nothing
 * themselves and split signals with the page that should win, so each is
 * redirected to that page (301 via next.config.ts) and removed from the blog.
 *
 * SAFETY: every post is exported to scripts/backups/ before deletion, so the
 * content can be restored. Nothing is deleted without a backup on disk.
 *
 * The 301s must be added to next.config.ts — this script prints them.
 *
 * Usage:
 *   Preview:  node --env-file=.env.local scripts/consolidate-thin-posts.mjs
 *   Apply:    node --env-file=.env.local scripts/consolidate-thin-posts.mjs --commit
 */

import { createClient } from "@sanity/client";
import { writeFileSync, mkdirSync } from "node:fs";

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

/**
 * slug -> the page that should win the query.
 * Chosen so the destination genuinely serves the same intent; a redirect to a
 * loosely-related page would be worse than leaving the post alone.
 */
export const CONSOLIDATE = {
  // Exact title twins: both are "High School Physics in Physics Tutoring".
  // Keep neither — /physics-12-tutor-burnaby covers this properly.
  "physics-high-school-physics": "/physics-12-tutor-burnaby",
  "physics-tutoring-high-school-physics": "/physics-12-tutor-burnaby",

  // Two generic "university physics" overviews duplicating the landing page.
  // (The UBC and Langara posts are NOT touched — they are institution-specific
  // and genuinely useful.)
  "physics-tutoring-university-physics": "/university-physics-tutor-vancouver",
  "physics-university-level-physics": "/university-physics-tutor-vancouver",

  "physics-tutoring-physics-concepts-problem-solving": "/physics-problem-solving-tutor",

  // Generic Pre-Calculus overview. The specific pre-calculus topic posts
  // (polynomial, exponential/log, trig identities) are kept — they are distinct.
  "mathematics-pre-calculus": "/pre-calculus-12-tutor-burnaby",

  // "X in Burnaby STEM Tutoring" — each duplicates a dedicated subject page.
  "burnaby-stem-tutoring-physics-11-12": "/physics-12-tutor-burnaby",
  "burnaby-stem-tutoring-chemistry-11-12": "/chemistry-12-tutor-burnaby",
  "burnaby-stem-tutoring-biology-11-12": "/biology-12-tutor-burnaby",
  "burnaby-stem-tutoring-mathematics-grades-8-12": "/math-tutor-burnaby",
};

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (backup + delete)" : "DRY RUN (no changes written)"}`);

  const slugs = Object.keys(CONSOLIDATE);
  const posts = await client.fetch(`*[_type == "post" && slug.current in $slugs]`, { slugs });

  const found = new Set(posts.map((p) => p.slug?.current));
  for (const s of slugs) if (!found.has(s)) console.log(`  ! not found (already gone?): ${s}`);

  console.log(`\n${posts.length} post(s) to consolidate:`);
  for (const p of posts) {
    console.log(`  ${String(p.slug.current).padEnd(52)} -> ${CONSOLIDATE[p.slug.current]}`);
  }

  if (commit) {
    // Back up FIRST — never delete content without a copy on disk.
    mkdirSync("scripts/backups", { recursive: true });
    const file = "scripts/backups/consolidated-posts.json";
    writeFileSync(file, JSON.stringify(posts, null, 2), "utf8");
    console.log(`\n  backup written: ${file} (${posts.length} full documents)`);

    for (const p of posts) {
      await client.delete(p._id);
    }
    console.log(`  deleted ${posts.length} post(s) from Sanity`);
  }

  console.log("\n301 redirects for next.config.ts:");
  for (const [slug, dest] of Object.entries(CONSOLIDATE)) {
    console.log(`  ["/blog/${slug}", "${dest}"],`);
  }
  console.log(commit ? "" : "\nRe-run with --commit to apply.");
}

run().catch((err) => {
  console.error("Consolidation failed:", err?.message || err);
  process.exit(1);
});
