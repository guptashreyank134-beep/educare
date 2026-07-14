/**
 * SEO internal-linking migration: add hyperlinks inside blog post bodies.
 *
 * For each blog post (Portable Text body), this links the FIRST occurrence of
 * high-value keyword phrases to the matching landing page, and phrases like
 * "free consultation" to /contact. It is deliberately conservative:
 *   - at most MAX_LINKS_PER_POST links per post (avoids over-optimization),
 *   - one link per distinct phrase, first occurrence only,
 *   - only inside normal paragraphs/list items (not headings),
 *   - skips spans that already carry a link.
 *
 * Usage:
 *   1. Editor token in .env.local as SANITY_API_WRITE_TOKEN (+ real project id).
 *   2. Preview:  node --env-file=.env.local scripts/add-internal-links.mjs
 *   3. Apply:    node --env-file=.env.local scripts/add-internal-links.mjs --commit
 *
 * Idempotent-ish: a phrase already linked is skipped, so re-running mainly adds
 * links to posts that gained new matches. Review the dry run before committing.
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const commit = process.argv.includes("--commit");
const MAX_LINKS_PER_POST = 4;

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
  perspective: "raw",
});

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

// Keyword phrase -> landing page. Kept focused (money terms) to avoid spammy
// over-linking. Matched case-insensitively; longest phrase wins.
const KEYWORD_LINKS = [
  ["math tutoring in Burnaby", "/math-tutoring-burnaby"],
  ["math tutoring in Vancouver", "/math-tutoring-vancouver"],
  ["math tutor in Burnaby", "/math-tutor-burnaby"],
  ["math tutor in Vancouver", "/math-tutor-vancouver"],
  ["math tutor Burnaby", "/math-tutor-burnaby"],
  ["math tutor Vancouver", "/math-tutor-vancouver"],
  ["Pre-Calculus 12", "/pre-calculus-12-tutor-burnaby"],
  ["Pre-Calculus 11", "/pre-calculus-11-tutor-burnaby"],
  ["Calculus 12", "/calculus-12-tutor-burnaby"],
  ["Chemistry 12", "/chemistry-12-tutor-burnaby"],
  ["Chemistry 11", "/chemistry-11-tutor-burnaby"],
  ["Physics 12", "/physics-12-tutor-burnaby"],
  ["Physics 11", "/physics-11-tutor-burnaby"],
  ["AP Calculus", "/ap-calculus-tutor-burnaby"],
  ["AP Chemistry", "/ap-chemistry-tutor-burnaby"],
  ["AP Physics", "/ap-physics-tutor-burnaby"],
  ["IB Math", "/ib-math-tutor-vancouver"],
  ["linear algebra", "/linear-algebra-tutor-online-canada"],
  ["university calculus", "/university-calculus-tutor-vancouver"],
  ["word problems", "/math-word-problems-tutor"],
  ["final exam review", "/final-exam-review-tutoring-burnaby"],
  ["Python", "/python-tutor-burnaby"],
];

const CONTACT_PHRASES = [
  "free consultation",
  "book a consultation",
  "contact us",
  "get in touch",
];

const TARGETS = [
  ...KEYWORD_LINKS.map(([phrase, href]) => ({ phrase, href })),
  ...CONTACT_PHRASES.map((phrase) => ({ phrase, href: "/contact" })),
].sort((a, b) => b.phrase.length - a.phrase.length);

const HEADING_STYLES = new Set(["h1", "h2", "h3", "h4", "blockquote"]);

function spanHasLink(span, markDefs) {
  return (
    Array.isArray(span.marks) &&
    span.marks.some((m) => (markDefs || []).some((d) => d._key === m && d._type === "link"))
  );
}

/** Returns { body, added:[{text, href}] } with links inserted (mutates blocks). */
function addLinks(body) {
  if (!Array.isArray(body)) return { body, added: [] };
  const added = [];
  const usedPhrases = new Set();

  for (const block of body) {
    if (added.length >= MAX_LINKS_PER_POST) break;
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    if (block.style && HEADING_STYLES.has(block.style)) continue;

    for (const target of TARGETS) {
      if (added.length >= MAX_LINKS_PER_POST) break;
      if (usedPhrases.has(target.phrase.toLowerCase())) continue;

      let placed = false;
      for (let i = 0; i < block.children.length && !placed; i++) {
        const span = block.children[i];
        if (!span || span._type !== "span" || typeof span.text !== "string") continue;
        if (spanHasLink(span, block.markDefs)) continue;

        const idx = span.text.toLowerCase().indexOf(target.phrase.toLowerCase());
        if (idx === -1) continue;

        const before = span.text.slice(0, idx);
        const match = span.text.slice(idx, idx + target.phrase.length);
        const after = span.text.slice(idx + target.phrase.length);

        const linkKey = key();
        block.markDefs = [
          ...(block.markDefs || []),
          { _key: linkKey, _type: "link", href: target.href },
        ];

        const mk = (text, marks) => ({ _type: "span", _key: key(), text, marks });
        const baseMarks = Array.isArray(span.marks) ? span.marks : [];
        const newSpans = [];
        if (before) newSpans.push(mk(before, [...baseMarks]));
        newSpans.push(mk(match, [...baseMarks, linkKey]));
        if (after) newSpans.push(mk(after, [...baseMarks]));

        block.children = [
          ...block.children.slice(0, i),
          ...newSpans,
          ...block.children.slice(i + 1),
        ];
        usedPhrases.add(target.phrase.toLowerCase());
        added.push({ text: match, href: target.href });
        placed = true;
      }
    }
  }

  return { body, added };
}

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing changes)" : "DRY RUN (no changes written)"}`);

  const posts = await client.fetch(`*[_type == "post"]{ _id, title, body }`);

  let postsChanged = 0;
  let linksAdded = 0;
  let skippedHtml = 0;

  for (const post of posts) {
    if (!Array.isArray(post.body)) {
      skippedHtml++;
      continue; // HTML-string bodies aren't Portable Text; skip.
    }

    const { body, added } = addLinks(post.body);
    if (added.length === 0) continue;

    postsChanged++;
    linksAdded += added.length;
    console.log(`\n  ${post.title || post._id}`);
    for (const a of added) console.log(`    + "${a.text}" -> ${a.href}`);

    if (commit) {
      await client.patch(post._id).set({ body }).commit();
    }
  }

  console.log(
    `\nDone. ${linksAdded} link(s) across ${postsChanged} post(s) ${
      commit ? "added." : "would be added. Re-run with --commit to apply."
    }` + (skippedHtml ? ` (${skippedHtml} HTML-body post(s) skipped.)` : "")
  );
}

run().catch((err) => {
  console.error("Migration failed:", err.message || err);
  process.exit(1);
});
