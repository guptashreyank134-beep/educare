/**
 * Rewrite thin blog post bodies with substantive, keyword-aligned content.
 *
 * Reads structured articles from scripts/blog-content-data.mjs (keyed by slug),
 * assembles them into Portable Text (headings, paragraphs, bullet lists), adds
 * internal keyword + /contact hyperlinks automatically, and updates each post's
 * `body` (and `excerpt`). Only posts present in the data file are touched.
 *
 * Content is real subject matter (concepts, common mistakes, study tips) so it
 * is genuinely useful — not keyword-stuffed filler, which Google penalizes.
 *
 * Usage:
 *   1. Editor token in .env.local as SANITY_API_WRITE_TOKEN (+ real project id).
 *   2. Preview:  node --env-file=.env.local scripts/regenerate-blog-content.mjs
 *   3. Apply:    node --env-file=.env.local scripts/regenerate-blog-content.mjs --commit
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { blogContent } from "./blog-content-data.mjs";

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
  console.error("✗ SANITY_API_WRITE_TOKEN is not set. Create an Editor token and add it to .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

// ── Portable Text builders ───────────────────────────────
const span = (text) => ({ _type: "span", _key: key(), text, marks: [] });
const para = (text) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [span(text)] });
const heading = (text) => ({ _type: "block", _key: key(), style: "h2", markDefs: [], children: [span(text)] });
const bullet = (text) => ({
  _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1,
  markDefs: [], children: [span(text)],
});

function buildBody(article) {
  const blocks = [];
  (article.intro || []).forEach((p) => blocks.push(para(p)));
  if (article.overview?.length) {
    blocks.push(heading("What This Topic Covers"));
    article.overview.forEach((p) => blocks.push(para(p)));
  }
  if (article.keyConcepts?.length) {
    blocks.push(heading("Key Concepts to Master"));
    article.keyConcepts.forEach((c) => blocks.push(bullet(c)));
  }
  if (article.commonMistakes?.length) {
    blocks.push(heading("Common Mistakes to Avoid"));
    article.commonMistakes.forEach((m) => blocks.push(bullet(m)));
  }
  if (article.studyTips?.length) {
    blocks.push(heading("Study Tips That Actually Work"));
    article.studyTips.forEach((t) => blocks.push(bullet(t)));
  }
  blocks.push(heading("How Dr. Shreyank Educare Can Help"));
  (article.closing || []).forEach((p) => blocks.push(para(p)));
  return blocks;
}

// ── Internal keyword + contact linking (same rules as add-internal-links) ──
const KEYWORD_LINKS = [
  ["math tutoring in Burnaby", "/math-tutoring-burnaby"],
  ["math tutor in Burnaby", "/math-tutor-burnaby"],
  ["math tutor in Vancouver", "/math-tutor-vancouver"],
  ["Pre-Calculus 12", "/pre-calculus-12-tutor-burnaby"],
  ["Pre-Calculus 11", "/pre-calculus-11-tutor-burnaby"],
  ["Calculus 12", "/calculus-12-tutor-burnaby"],
  ["Chemistry 12", "/chemistry-12-tutor-burnaby"],
  ["Physics 12", "/physics-12-tutor-burnaby"],
  ["AP Calculus", "/ap-calculus-tutor-burnaby"],
  ["IB Math", "/ib-math-tutor-vancouver"],
  ["university calculus", "/university-calculus-tutor-vancouver"],
  ["word problems", "/math-word-problems-tutor"],
  ["final exam review", "/final-exam-review-tutoring-burnaby"],
];
const CONTACT_PHRASES = ["free consultation", "book a consultation", "contact us"];
const TARGETS = [
  ...KEYWORD_LINKS.map(([phrase, href]) => ({ phrase, href })),
  ...CONTACT_PHRASES.map((phrase) => ({ phrase, href: "/contact" })),
].sort((a, b) => b.phrase.length - a.phrase.length);
const MAX_LINKS = 5;

function linkBody(body) {
  const used = new Set();
  let added = 0;
  for (const block of body) {
    if (added >= MAX_LINKS) break;
    if (block._type !== "block" || block.style === "h2") continue;
    for (const t of TARGETS) {
      if (added >= MAX_LINKS) break;
      if (used.has(t.phrase.toLowerCase())) continue;
      for (let i = 0; i < block.children.length; i++) {
        const s = block.children[i];
        if (s._type !== "span" || (s.marks && s.marks.length)) continue;
        const idx = s.text.toLowerCase().indexOf(t.phrase.toLowerCase());
        if (idx === -1) continue;
        const lk = key();
        block.markDefs = [...(block.markDefs || []), { _key: lk, _type: "link", href: t.href }];
        const before = s.text.slice(0, idx);
        const match = s.text.slice(idx, idx + t.phrase.length);
        const after = s.text.slice(idx + t.phrase.length);
        const ns = [];
        if (before) ns.push(span(before));
        ns.push({ _type: "span", _key: key(), text: match, marks: [lk] });
        if (after) ns.push(span(after));
        block.children = [...block.children.slice(0, i), ...ns, ...block.children.slice(i + 1)];
        used.add(t.phrase.toLowerCase());
        added++;
        break;
      }
    }
  }
  return added;
}

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (writing changes)" : "DRY RUN (no changes written)"}`);
  const slugs = Object.keys(blogContent);

  const posts = await client.fetch(
    `*[_type == "post" && slug.current in $slugs]{ _id, title, "slug": slug.current }`,
    { slugs }
  );
  const bySlug = new Map(posts.map((p) => [p.slug, p]));

  let changed = 0;
  for (const slug of slugs) {
    const post = bySlug.get(slug);
    if (!post) {
      console.log(`  ! No published post found for slug "${slug}" — skipped.`);
      continue;
    }
    const article = blogContent[slug];
    const body = buildBody(article);
    const links = linkBody(body);
    changed++;
    console.log(`\n  ${post.title || slug}`);
    console.log(`    ${body.length} blocks, ${links} internal link(s)`);
    if (commit) {
      const patch = { body };
      if (article.excerpt) patch.excerpt = article.excerpt;
      await client.patch(post._id).set(patch).commit();
    }
  }

  console.log(
    `\nDone. ${changed} post(s) ${commit ? "rewritten." : "would be rewritten. Re-run with --commit to apply."}`
  );
}

run().catch((err) => {
  console.error("Regeneration failed:", err.message || err);
  process.exit(1);
});
