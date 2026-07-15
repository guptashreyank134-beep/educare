/**
 * Weave contextual internal links into FAQ answers stored in Sanity
 * (`pageFaq` docs for the 122 landing pages, plus the homepage's FAQs).
 *
 * Rules that keep this safe and useful:
 *  - Only links a phrase that genuinely appears in the answer text — no text is
 *    ever rewritten or invented.
 *  - Never self-links (a Burnaby page's FAQ won't link to the Burnaby page).
 *  - Every target href is validated against the real route set first; an unknown
 *    href aborts the run rather than shipping a broken link.
 *  - Max 2 links per answer, and each destination is used at most once per page.
 *  - Skips answers that already contain a link, so editors' own links and
 *    re-runs are safe (idempotent).
 *
 * Usage:
 *   Preview:  node --experimental-strip-types --env-file=.env.local scripts/link-faq-answers.ts
 *   Apply:    node --experimental-strip-types --env-file=.env.local scripts/link-faq-answers.ts --commit
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { cities, cityPath } from "../data/cities.ts";
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

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

// ── Valid routes (so we can never emit a broken link) ──
const VALID = new Set<string>([
  "/",
  "/contact",
  "/about",
  "/pricing",
  "/services",
  "/programs",
  "/resources",
  "/locations",
  "/blog",
  ...cities.map((c) => cityPath(c.slug)),
  ...verticalPages.map((p) => `/${p.slug}`),
  ...seoPages.map((p) => `/${p.slug}`),
  // Static program routes that exist under app/programs/*
  "/programs/ib-ap-tutoring",
  "/programs/mcat-prep",
  "/programs/sat-prep",
  "/programs/gre-prep",
  "/programs/gmat-prep",
  "/programs/mathematics",
  "/programs/physics",
  "/programs/chemistry",
  "/programs/biology",
  "/programs/pre-calculus",
  "/programs/python",
  "/programs/computer-science",
  "/programs/french",
  "/programs/mandarin",
]);

/**
 * Phrase -> destination. Ordered longest-first at match time so "Pre-Calculus 12"
 * wins over "Calculus". Phrases are matched case-insensitively on word boundaries.
 */
const TARGETS: Array<[string, string]> = [
  ["Pre-Calculus 12", "/pre-calculus-12-tutor-burnaby"],
  ["Pre-Calculus 11", "/pre-calculus-11-tutor-burnaby"],
  ["Calculus 12", "/calculus-12-tutor-burnaby"],
  ["AP Calculus", "/ap-calculus-tutor-burnaby"],
  ["IB Math", "/ib-math-tutor-vancouver"],
  ["Chemistry 12", "/chemistry-12-tutor-burnaby"],
  ["Chemistry 11", "/chemistry-11-tutor-burnaby"],
  ["Physics 12", "/physics-12-tutor-burnaby"],
  ["Physics 11", "/physics-11-tutor-burnaby"],
  ["free consultation", "/contact"],
  ["free trial", "/contact"],
  ["actuarial exam", "/actuarial-exam-tutor-online"],
  ["linear algebra", "/linear-algebra-tutor-online-canada"],
  ["final exam", "/final-exam-review-tutoring-burnaby"],
  ["computer science", "/computer-science-tutor-vancouver"],
  ["statistics", "/online-statistics-tutor"],
  ["pricing", "/pricing"],
  ["Burnaby", "/math-tutor-burnaby"],
  ["Vancouver", "/math-tutor-vancouver"],
  ["Surrey", "/math-tutor-surrey"],
  ["Richmond", "/math-tutor-richmond"],
  ["Coquitlam", "/math-tutor-coquitlam"],
];

// Abort rather than ship a broken link.
const bad = TARGETS.filter(([, href]) => !VALID.has(href));
if (bad.length) {
  console.error("✗ These link targets are not real routes:", bad);
  process.exit(1);
}

const sorted = [...TARGETS].sort((a, b) => b[0].length - a[0].length);
const MAX_PER_ANSWER = 2;

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type Block = any;

/** Returns true if this answer already has any link annotation. */
function hasLink(blocks: Block[]): boolean {
  return blocks.some((b) => (b?.markDefs || []).some((m: any) => m?._type === "link"));
}

/**
 * Adds link marks to the first matching phrase(s) in an answer.
 * Returns the number of links added (mutates blocks).
 */
function linkAnswer(blocks: Block[], ownPath: string, usedHrefs: Set<string>): number {
  if (!Array.isArray(blocks) || hasLink(blocks)) return 0;
  let added = 0;

  for (const block of blocks) {
    if (added >= MAX_PER_ANSWER) break;
    if (!block || block._type !== "block" || !Array.isArray(block.children)) continue;

    for (const [phrase, href] of sorted) {
      if (added >= MAX_PER_ANSWER) break;
      if (href === ownPath || usedHrefs.has(href)) continue;

      for (let i = 0; i < block.children.length; i++) {
        const span = block.children[i];
        if (!span || span._type !== "span" || (span.marks && span.marks.length)) continue;

        const re = new RegExp(`\\b${esc(phrase)}\\b`, "i");
        const m = re.exec(span.text || "");
        if (!m) continue;

        const idx = m.index;
        const lk = key();
        block.markDefs = [...(block.markDefs || []), { _key: lk, _type: "link", href }];

        const before = span.text.slice(0, idx);
        const match = span.text.slice(idx, idx + m[0].length);
        const after = span.text.slice(idx + m[0].length);
        const next = [];
        if (before) next.push({ _type: "span", _key: key(), text: before, marks: [] });
        next.push({ _type: "span", _key: key(), text: match, marks: [lk] });
        if (after) next.push({ _type: "span", _key: key(), text: after, marks: [] });

        block.children = [...block.children.slice(0, i), ...next, ...block.children.slice(i + 1)];
        usedHrefs.add(href);
        added++;
        break;
      }
    }
  }
  return added;
}

function ownPathFor(pageType: string, slug: string): string {
  if (pageType === "city") return cityPath(slug);
  return `/${slug}`;
}

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing to Sanity)" : "DRY RUN (no changes written)"}`);

  const docs = await client.fetch<any[]>(
    `*[_type == "pageFaq"]{ _id, title, pageSlug, pageType, faqs }`
  );
  const homepages = await client.fetch<any[]>(`*[_type == "vancouverPage"]{ _id, title, faqs }`);

  let pagesChanged = 0;
  let linksAdded = 0;

  const process = async (id: string, label: string, faqs: any[], ownPath: string) => {
    if (!Array.isArray(faqs) || !faqs.length) return;
    // Seed with links ALREADY present on this page (from a previous run or an
    // editor), so re-running can never add a second link to the same
    // destination — without this the run is not idempotent.
    const usedHrefs = new Set<string>();
    for (const faq of faqs) {
      if (!Array.isArray(faq?.answer)) continue;
      for (const block of faq.answer) {
        for (const md of block?.markDefs || []) {
          if (md?._type === "link" && md.href) usedHrefs.add(md.href);
        }
      }
    }
    let n = 0;
    for (const faq of faqs) {
      if (!Array.isArray(faq?.answer)) continue;
      n += linkAnswer(faq.answer, ownPath, usedHrefs);
    }
    if (!n) return;
    pagesChanged++;
    linksAdded += n;
    console.log(`  ${label.padEnd(46)} +${n} link(s)  [${[...usedHrefs].join(", ")}]`);
    if (commit) await client.patch(id).set({ faqs }).commit();
  };

  for (const d of docs) {
    await process(d._id, d.pageSlug, d.faqs, ownPathFor(d.pageType, d.pageSlug));
  }
  for (const h of homepages) {
    await process(h._id, "HOMEPAGE", h.faqs, "/");
  }

  console.log(
    `\nDone. ${linksAdded} link(s) added across ${pagesChanged} page(s).` +
      (commit ? "" : " Re-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Linking failed:", err?.message || err);
  process.exit(1);
});
