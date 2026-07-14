/**
 * Rewrite thin blog post bodies with substantive, keyword-aligned content and
 * strong internal linking.
 *
 * Reads structured articles from scripts/blog-content-data.mjs (keyed by slug),
 * assembles them into Portable Text (headings, paragraphs, bullet lists, an
 * FAQ), adds inline keyword + /contact hyperlinks, and appends a topic-based
 * "Related Tutoring" section of 5-6 relevant internal links per post so every
 * article is well linked.
 *
 * Content is real subject matter (concepts, mistakes, study tips, FAQ) — not
 * keyword-stuffed filler, which Google penalizes.
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
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const blk = (style, children, markDefs = []) => ({ _type: "block", _key: key(), style, markDefs, children });
const para = (text) => blk("normal", [span(text)]);
const heading = (text) => blk("h2", [span(text)]);
const strongPara = (text) => blk("normal", [span(text, ["strong"])]);
const bullet = (text) => ({ ...blk("normal", [span(text)]), listItem: "bullet", level: 1 });
const linkedBullet = (label, href) => {
  const lk = key();
  return {
    _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1,
    markDefs: [{ _key: lk, _type: "link", href }],
    children: [span(label, [lk])],
  };
};

// ── Topic-based "Related Tutoring" links (accurate per article) ──
const RELATED = [
  { re: /pre-calculus/i, label: "Pre-Calculus 12 Tutoring in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
  { re: /\bcalculus\b/i, label: "Calculus 12 Tutoring in Burnaby", href: "/calculus-12-tutor-burnaby" },
  { re: /university (math|calculus|linear algebra)|linear algebra|differential equations/i, label: "University Math Tutoring in Vancouver", href: "/university-math-tutor-vancouver" },
  { re: /chemistr/i, label: "Chemistry 12 Tutoring in Burnaby", href: "/chemistry-12-tutor-burnaby" },
  { re: /university physics|first-year physics/i, label: "University Physics Tutoring in Vancouver", href: "/university-physics-tutor-vancouver" },
  { re: /physics/i, label: "Physics 12 Tutoring in Burnaby", href: "/physics-12-tutor-burnaby" },
  { re: /biology|physiology|molecular|genetics|ecology/i, label: "Science Tutoring in Burnaby", href: "/science-tutor-burnaby" },
  { re: /IB Math|IB Mathematics/i, label: "IB Math Tutoring in Vancouver", href: "/ib-math-tutor-vancouver" },
  { re: /\bIB\b/i, label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
  { re: /AP Calculus/i, label: "AP Calculus Tutoring in Burnaby", href: "/ap-calculus-tutor-burnaby" },
  { re: /AP (Chemistry|Physics|Biology|Statistics)/i, label: "AP Tutoring in Vancouver", href: "/ap-tutor-vancouver" },
  { re: /statistic/i, label: "Online Statistics Tutoring", href: "/online-statistics-tutor" },
  { re: /econ|finance|CFA|MBA|business/i, label: "University & Professional Tutoring", href: "/university-professional" },
  { re: /python|javascript|programming|coding|computer science|data structures|web development|DOM|API|database/i, label: "Coding & Computer Science Tutoring", href: "/computer-science-tutor-vancouver" },
  { re: /french/i, label: "French Tutoring", href: "/programs/french" },
  { re: /mandarin|chinese/i, label: "Mandarin Tutoring", href: "/programs/mandarin" },
  { re: /SAT|GRE|GMAT|MCAT|exam prep|test prep|final exam|provincial/i, label: "Exam & Final-Review Tutoring", href: "/final-exam-review-tutoring-burnaby" },
  { re: /word problem|problem-solving|problem solving/i, label: "Problem-Solving & Word Problems Tutoring", href: "/math-word-problems-tutor" },
  { re: /algebra|functions|grade|elementary|middle school|high school math/i, label: "Math Tutoring in Burnaby", href: "/math-tutor-burnaby" },
];
const FALLBACK_LINKS = [
  { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
  { label: "Tutoring Locations Across Metro Vancouver", href: "/locations" },
];

function relatedLinks(article) {
  const text = [
    ...(article.intro || []),
    ...(article.overview || []),
    ...(article.keyConcepts || []),
    ...(article.closing || []),
  ].join(" ");
  const picked = [];
  const seen = new Set();
  for (const r of RELATED) {
    if (picked.length >= 5) break;
    if (r.re.test(text) && !seen.has(r.href)) {
      picked.push({ label: r.label, href: r.href });
      seen.add(r.href);
    }
  }
  for (const f of FALLBACK_LINKS) {
    if (picked.length >= 5) break;
    if (!seen.has(f.href)) { picked.push(f); seen.add(f.href); }
  }
  picked.push({ label: "Book a Free Consultation", href: "/contact" });
  return picked;
}

// ── Inline keyword linking within body prose ──
const KEYWORD_LINKS = [
  ["math tutoring in Burnaby", "/math-tutoring-burnaby"],
  ["math tutor in Burnaby", "/math-tutor-burnaby"],
  ["math tutor in Vancouver", "/math-tutor-vancouver"],
  ["Pre-Calculus 12", "/pre-calculus-12-tutor-burnaby"],
  ["Pre-Calculus 11", "/pre-calculus-11-tutor-burnaby"],
  ["Calculus 12", "/calculus-12-tutor-burnaby"],
  ["Chemistry 12", "/chemistry-12-tutor-burnaby"],
  ["Chemistry 11", "/chemistry-11-tutor-burnaby"],
  ["Physics 12", "/physics-12-tutor-burnaby"],
  ["Physics 11", "/physics-11-tutor-burnaby"],
  ["AP Calculus", "/ap-calculus-tutor-burnaby"],
  ["IB Math", "/ib-math-tutor-vancouver"],
  ["university calculus", "/university-calculus-tutor-vancouver"],
  ["linear algebra", "/linear-algebra-tutor-online-canada"],
  ["word problems", "/math-word-problems-tutor"],
  ["final exam review", "/final-exam-review-tutoring-burnaby"],
  ["Python", "/python-tutor-burnaby"],
  ["computer science", "/computer-science-tutor-vancouver"],
];
const CONTACT_PHRASES = ["free consultation", "book a consultation", "contact us"];
const TARGETS = [
  ...KEYWORD_LINKS.map(([phrase, href]) => ({ phrase, href })),
  ...CONTACT_PHRASES.map((phrase) => ({ phrase, href: "/contact" })),
].sort((a, b) => b.phrase.length - a.phrase.length);
const MAX_INLINE = 6;

function linkBody(body, skipHrefs) {
  const used = new Set(skipHrefs);
  let added = 0;
  for (const block of body) {
    if (added >= MAX_INLINE) break;
    if (block._type !== "block" || block.style === "h2" || block.listItem) continue;
    for (const t of TARGETS) {
      if (added >= MAX_INLINE) break;
      if (used.has(t.phrase.toLowerCase()) || used.has(t.href)) continue;
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
        ns.push(span(match, [lk]));
        if (after) ns.push(span(after));
        block.children = [...block.children.slice(0, i), ...ns, ...block.children.slice(i + 1)];
        used.add(t.phrase.toLowerCase());
        used.add(t.href);
        added++;
        break;
      }
    }
  }
  return added;
}

// ── FAQ derived from the article's real content ──
function joinPoints(points) {
  if (!points || !points.length) return "";
  const items = points.map((p) => p.charAt(0).toLowerCase() + p.slice(1));
  if (items.length === 1) return items[0] + ".";
  return items.slice(0, -1).join("; ") + "; and " + items[items.length - 1] + ".";
}

function buildBody(article) {
  const blocks = [];
  (article.intro || []).forEach((p) => blocks.push(para(p)));

  if (article.overview?.length) {
    blocks.push(heading("What This Topic Covers"));
    article.overview.forEach((p) => blocks.push(para(p)));
  }
  if (article.keyConcepts?.length) {
    blocks.push(heading("Key Concepts to Master"));
    blocks.push(para("These are the core ideas everything else builds on — make sure each one is solid:"));
    article.keyConcepts.forEach((c) => blocks.push(bullet(c)));
  }
  if (article.commonMistakes?.length) {
    blocks.push(heading("Common Mistakes to Avoid"));
    blocks.push(para("These are the pitfalls that cost students the most marks:"));
    article.commonMistakes.forEach((m) => blocks.push(bullet(m)));
  }
  if (article.studyTips?.length) {
    blocks.push(heading("Study Tips That Actually Work"));
    blocks.push(para("A few focused habits make the biggest difference:"));
    article.studyTips.forEach((t) => blocks.push(bullet(t)));
  }

  // FAQ built from the article's own content (real, not filler)
  blocks.push(heading("Frequently Asked Questions"));
  if (article.commonMistakes?.length) {
    blocks.push(strongPara("What are the most common mistakes to avoid?"));
    blocks.push(para("The pitfalls that cost the most marks are " + joinPoints(article.commonMistakes)));
  }
  if (article.studyTips?.length) {
    blocks.push(strongPara("What's the best way to study this topic?"));
    blocks.push(para("Focus on a few high-impact habits: " + joinPoints(article.studyTips)));
  }
  blocks.push(strongPara("Can a tutor really make a difference?"));
  blocks.push(
    para(
      "Yes. One-on-one, PhD-led tutoring diagnoses exactly where a student struggles, rebuilds the foundations, and builds the confidence and method to improve — far faster than studying alone."
    )
  );

  blocks.push(heading("How Dr. Shreyank Educare Can Help"));
  (article.closing || []).forEach((p) => blocks.push(para(p)));

  // Related internal links (topic-based, always present)
  const links = relatedLinks(article);
  blocks.push(heading("Related Tutoring & Resources"));
  links.forEach((l) => blocks.push(linkedBullet(l.label, l.href)));

  return { blocks, relatedHrefs: links.map((l) => l.href) };
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
  let totalLinks = 0;
  for (const slug of slugs) {
    const post = bySlug.get(slug);
    if (!post) {
      console.log(`  ! No published post found for slug "${slug}" — skipped.`);
      continue;
    }
    const article = blogContent[slug];
    const { blocks, relatedHrefs } = buildBody(article);
    const inline = linkBody(blocks, relatedHrefs);
    const linkCount = relatedHrefs.length + inline;
    totalLinks += linkCount;
    changed++;
    console.log(`\n  ${post.title || slug}`);
    console.log(`    ${blocks.length} blocks, ${linkCount} internal links (${relatedHrefs.length} related + ${inline} inline)`);
    if (commit) {
      const patch = { body: blocks };
      if (article.excerpt) patch.excerpt = article.excerpt;
      await client.patch(post._id).set(patch).commit();
    }
  }

  console.log(
    `\nDone. ${changed} post(s) ${commit ? "rewritten" : "would be rewritten"}, avg ${changed ? (totalLinks / changed).toFixed(1) : 0} internal links/post.` +
      (commit ? "" : " Re-run with --commit to apply.")
  );
}

run().catch((err) => {
  console.error("Regeneration failed:", err.message || err);
  process.exit(1);
});
