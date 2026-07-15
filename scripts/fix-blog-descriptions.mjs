/**
 * Replace the templated blog meta descriptions with specific ones.
 *
 * 89 of 97 posts shared the pattern "A comprehensive guide to understanding
 * [topic] under our [course] course…" — near-identical text that tells a
 * searcher nothing and reads as bulk-generated.
 *
 * Each post already has an authored, post-specific `excerpt` (~147 chars, a good
 * meta-description length), so the description is taken from that. A handful of
 * posts whose excerpt is ALSO templated are listed in OVERRIDES with copy
 * written for them specifically.
 *
 * Idempotent: a description that already matches its excerpt is skipped, and an
 * excerpt that is still templated is never copied over a description.
 *
 * Usage:
 *   Preview:  node --env-file=.env.local scripts/fix-blog-descriptions.mjs
 *   Apply:    node --env-file=.env.local scripts/fix-blog-descriptions.mjs --commit
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

const TEMPLATED = /A comprehensive guide to understanding/i;

/** Posts whose excerpt is also templated — written specifically for each. */
const OVERRIDES = {
  "biology-cell-biology": {
    excerpt:
      "The cell is where biology stops being vocabulary and starts being mechanism. A guide to structure, transport and division — and what exams actually ask.",
    description:
      "Cell biology explained as mechanism, not memorisation: structure, membranes, transport and division, plus the mistakes that cost marks. PhD-led tutoring in Burnaby & Vancouver.",
  },
  "mcat-prep-cars-drills": {
    excerpt:
      "CARS rewards disciplined reading, not speed-reading. How to drill passage analysis, argument structure and timing so the section stops feeling like a lottery.",
    description:
      "MCAT CARS drills that build disciplined reading: passage analysis, argument structure, timing and the traps in answer choices. MD-led MCAT tutoring, online.",
  },
  "mcat-prep-chemistry-physics": {
    excerpt:
      "The MCAT tests chemistry and physics as reasoning under time pressure, not recall. What to master, what to skim, and how to practise for the real format.",
    description:
      "MCAT chemistry and physics prep: the concepts worth mastering, the ones to skim, and how to practise for a test that rewards reasoning over recall. MD-led tutoring.",
  },
  "sat-prep-sat-mathematics": {
    excerpt:
      "SAT Math is easier mathematics than school, asked in trickier ways. Learn the question patterns, the shortcuts that save time, and where students lose easy marks.",
    description:
      "SAT Math prep: easier maths than school asked in trickier ways. Question patterns, time-saving shortcuts and where easy marks get lost. PhD-led SAT tutoring.",
  },
};

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing to Sanity)" : "DRY RUN (no changes written)"}`);

  const posts = await client.fetch(
    `*[_type == "post"]{ _id, "slug": slug.current, excerpt, "description": metaData.metaDescription }`
  );

  let changed = 0;
  let skipped = 0;
  let stuck = 0;

  for (const p of posts) {
    const ov = OVERRIDES[p.slug];
    const excerpt = ov?.excerpt ?? p.excerpt;
    const description = ov?.description ?? p.excerpt;

    // Never copy a templated excerpt over the description — that fixes nothing.
    if (!description || TEMPLATED.test(description)) {
      stuck++;
      console.log(`  ! ${p.slug} — no specific copy available, left alone`);
      continue;
    }
    if (p.description === description && (!ov || p.excerpt === excerpt)) {
      skipped++;
      continue;
    }

    changed++;
    if (changed <= 4) console.log(`  ${p.slug}\n      -> ${description.slice(0, 96)}…`);

    if (commit) {
      const set = { "metaData.metaDescription": description };
      if (ov) set.excerpt = ov.excerpt;
      await client.patch(p._id).set(set).commit();
    }
  }
  if (changed > 4) console.log(`  … and ${changed - 4} more`);

  console.log(
    `\nDone. ${posts.length} post(s): ${changed} ${commit ? "updated" : "would be updated"}, ` +
      `${skipped} already specific, ${stuck} still lacking copy.` +
      (commit ? "" : " Re-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Fix failed:", err?.message || err);
  process.exit(1);
});
