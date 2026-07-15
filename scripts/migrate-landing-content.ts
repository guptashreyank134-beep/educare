/**
 * Migration: copy the hardcoded landing-page content (city / vertical / SEO)
 * into the existing `pageFaq` documents, so editors can change it in Studio.
 *
 * The FAQ migration already created one document per page; this fills in the
 * SEO + content fields alongside those FAQs. Pages fall back to the code values
 * for any field left empty, so this is additive and safe to run mid-flight.
 *
 * Idempotent: only fills fields that are currently EMPTY, so re-running never
 * overwrites edits made in the Studio.
 *
 * Usage:
 *   Preview:  node --experimental-strip-types --env-file=.env.local scripts/migrate-landing-content.ts
 *   Apply:    node --experimental-strip-types --env-file=.env.local scripts/migrate-landing-content.ts --commit
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

if (!projectId || !token) {
  console.error("✗ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

type Content = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  heroSubheading: string;
  intro: string[];
  sections: Array<{ heading: string; body?: string[]; points?: string[] }>;
};

const entries: Content[] = [
  ...cities.map((c) => ({
    slug: c.slug,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    heading: c.heroHeading,
    heroSubheading: c.heroSubheading,
    intro: c.intro,
    sections: [] as Content["sections"], // city pages have no generic sections
  })),
  ...verticalPages.map((p) => ({
    slug: p.slug,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    heading: p.heroHeading,
    heroSubheading: p.heroSubheading,
    intro: p.intro,
    sections: (p.sections || []).map((s) => ({ heading: s.heading, body: s.body, points: s.points })),
  })),
  ...seoPages.map((p) => ({
    slug: p.slug,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    heading: p.h1,
    heroSubheading: p.heroSubheading,
    intro: p.intro,
    sections: (p.sections || []).map((s) => ({ heading: s.heading, body: s.body, points: s.points })),
  })),
];

/** Drop undefined keys — Sanity rejects them. */
const clean = <T extends Record<string, any>>(o: T): T =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;

/** Every object inside a Sanity array needs a _key, or the list becomes uneditable. */
const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing to Sanity)" : "DRY RUN (no changes written)"}`);

  let filled = 0;
  let skipped = 0;
  let missing = 0;

  for (const e of entries) {
    const doc = await client.fetch<any>(
      `*[_type == "pageFaq" && pageSlug == $slug][0]{ _id, metaTitle, metaDescription, heading, heroSubheading, intro, sections }`,
      { slug: e.slug }
    );
    if (!doc?._id) {
      console.log(`  ! no document for "${e.slug}" — run migrate-landing-faqs.ts first.`);
      missing++;
      continue;
    }

    // Only fill what's empty, so Studio edits are never clobbered.
    const set: Record<string, any> = {};
    if (!doc.metaTitle && e.metaTitle) set.metaTitle = e.metaTitle;
    if (!doc.metaDescription && e.metaDescription) set.metaDescription = e.metaDescription;
    if (!doc.heading && e.heading) set.heading = e.heading;
    if (!doc.heroSubheading && e.heroSubheading) set.heroSubheading = e.heroSubheading;
    if (!doc.intro?.length && e.intro?.length) set.intro = e.intro;
    if (!doc.sections?.length && e.sections?.length) {
      set.sections = e.sections.map((s) => clean({ _type: "object", _key: key(), ...clean(s) }));
    }

    if (!Object.keys(set).length) {
      skipped++;
      continue;
    }

    filled++;
    console.log(`  ${e.slug.padEnd(44)} fill: ${Object.keys(set).join(", ")}`);
    if (commit) await client.patch(doc._id).set(set).commit();
  }

  console.log(
    `\nDone. ${entries.length} page(s).` +
      `\n  ${filled} ${commit ? "updated" : "would be updated"}` +
      `\n  ${skipped} already populated (left untouched — edits are never overwritten)` +
      (missing ? `\n  ${missing} missing a document` : "") +
      (commit ? "" : "\nRe-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Migration failed:", err?.message || err);
  process.exit(1);
});
