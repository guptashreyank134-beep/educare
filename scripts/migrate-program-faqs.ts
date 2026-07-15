/**
 * Convert programPage FAQ answers from plain strings to Portable Text, so they
 * match every other FAQ on the site and support hyperlinks.
 *
 * These FAQs already existed in Sanity but were undeclared in the schema
 * ("Unknown field found") and never rendered. The schema now declares them and
 * the program pages render them; this normalises the existing answers.
 *
 * Idempotent: answers already stored as Portable Text are skipped.
 *
 * Usage:
 *   Preview:  node --experimental-strip-types --env-file=.env.local scripts/migrate-program-faqs.ts
 *   Apply:    node --experimental-strip-types --env-file=.env.local scripts/migrate-program-faqs.ts --commit
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

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing to Sanity)" : "DRY RUN (no changes written)"}`);

  const docs = await client.fetch<any[]>(
    `*[_type == "programPage" && defined(faqs)]{ _id, "slug": slug.current, faqs }`
  );

  let changed = 0;
  let converted = 0;

  for (const d of docs) {
    let touched = false;
    const faqs = (d.faqs || []).map((f: any) => {
      if (typeof f?.answer === "string") {
        touched = true;
        converted++;
        return { ...f, _key: f._key || key(), answer: toPortableText(f.answer) };
      }
      return f;
    });
    if (!touched) continue;
    changed++;
    console.log(`  ${String(d.slug).padEnd(28)} ${faqs.length} FAQ(s) -> rich text`);
    if (commit) await client.patch(d._id).set({ faqs }).commit();
  }

  console.log(
    `\nDone. ${changed} program page(s), ${converted} answer(s) ${commit ? "converted" : "would be converted"}.` +
      (commit ? "" : " Re-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Migration failed:", err?.message || err);
  process.exit(1);
});
