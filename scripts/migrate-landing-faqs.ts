/**
 * One-time migration: move the hardcoded landing-page FAQs (city / vertical /
 * SEO pages) into Sanity as `pageFaq` documents, so editors can edit them and
 * add hyperlinks in the answers.
 *
 * Answers are plain strings in the code data; they are converted to Portable
 * Text (a single paragraph) with the wording preserved exactly. The page keeps
 * falling back to the code list until a matching document exists, so nothing
 * breaks mid-migration.
 *
 * Idempotent: uses createIfNotExists, so re-running NEVER overwrites edits made
 * in the Studio.
 *
 * Usage:
 *   Preview:  node --experimental-strip-types --env-file=.env.local scripts/migrate-landing-faqs.ts
 *   Apply:    node --experimental-strip-types --env-file=.env.local scripts/migrate-landing-faqs.ts --commit
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { cities } from "../data/cities.ts";
import { seoPages } from "../data/seoPages.ts";
import { verticalPages } from "../data/verticalPages.ts";

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
  console.error("✗ SANITY_API_WRITE_TOKEN is not set. Add an Editor token to .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

/** Plain string -> Portable Text (single paragraph), so answers become editable rich text. */
function toPortableText(text: string) {
  return [
    {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text, marks: [] }],
    },
  ];
}

type Entry = {
  slug: string;
  title: string;
  pageType: "city" | "vertical" | "seo";
  faqs: Array<{ question: string; answer: string }>;
};

const entries: Entry[] = [
  ...cities.map((c) => ({
    slug: c.slug,
    title: `Math Tutor in ${c.name}`,
    pageType: "city" as const,
    faqs: c.faqs,
  })),
  ...verticalPages.map((p) => ({
    slug: p.slug,
    title: p.heroHeading,
    pageType: "vertical" as const,
    faqs: p.faqs,
  })),
  ...seoPages.map((p) => ({
    slug: p.slug,
    title: p.h1,
    pageType: "seo" as const,
    faqs: p.faqs,
  })),
];

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing to Sanity)" : "DRY RUN (no changes written)"}`);

  // Guard: a slug collision would make two pages share one FAQ document.
  const seen = new Set<string>();
  for (const e of entries) {
    if (seen.has(e.slug)) {
      console.error(`✗ Duplicate slug "${e.slug}" — aborting to avoid cross-wiring FAQs.`);
      process.exit(1);
    }
    seen.add(e.slug);
  }

  let created = 0;
  let skipped = 0;
  let totalFaqs = 0;

  for (const e of entries) {
    if (!e.faqs?.length) {
      console.log(`  – ${e.slug}: no FAQs in code, nothing to migrate.`);
      continue;
    }
    const _id = `pageFaq-${e.slug}`;
    const doc = {
      _id,
      _type: "pageFaq",
      title: e.title,
      pageSlug: e.slug,
      pageType: e.pageType,
      faqs: e.faqs.map((f) => ({
        _key: key(),
        question: f.question,
        answer: toPortableText(f.answer),
      })),
    };

    totalFaqs += e.faqs.length;

    if (commit) {
      const before = await client.getDocument(_id);
      await client.createIfNotExists(doc);
      if (before) skipped++;
      else created++;
    } else {
      const exists = await client.getDocument(_id);
      if (exists) skipped++;
      else created++;
    }
    console.log(`  ${e.pageType.padEnd(8)} ${e.slug.padEnd(42)} ${e.faqs.length} FAQ(s)`);
  }

  console.log(
    `\nDone. ${entries.length} page(s), ${totalFaqs} FAQ(s) total.` +
      `\n  ${created} document(s) ${commit ? "created" : "would be created"}` +
      `\n  ${skipped} already exist (left untouched — edits are never overwritten).` +
      (commit ? "" : "\nRe-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Migration failed:", err?.message || err);
  process.exit(1);
});
