/**
 * Rewrite thin blog post bodies with substantive, keyword-aligned content and
 * internal links woven CONTEXTUALLY THROUGHOUT the article (distributed across
 * the intro and each section's lead-in, not bunched at the end).
 *
 * Reads structured articles from scripts/blog-content-data.mjs (keyed by slug),
 * assembles them into Portable Text (headings, paragraphs, bullet lists, an
 * FAQ), and places one topic-relevant internal link in the intro bridge and in
 * each section lead-in, plus inline links on subject terms in the prose.
 *
 * Content is real subject matter — not keyword-stuffed filler, which Google
 * penalizes.
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

// A paragraph built from mixed plain-text and {text, href} link parts.
const linkedPara = (parts) => {
  const markDefs = [];
  const children = [];
  for (const p of parts) {
    if (typeof p === "string") {
      children.push(span(p));
    } else {
      const lk = key();
      markDefs.push({ _key: lk, _type: "link", href: p.href });
      children.push(span(p.text, [lk]));
    }
  }
  return blk("normal", children, markDefs);
};

// ── Topic-based contextual links (accurate per article; full-phrase anchors) ──
const RELATED = [
  { re: /pre-calculus/i, anchor: "Pre-Calculus 12 tutoring", href: "/pre-calculus-12-tutor-burnaby" },
  { re: /\bcalculus\b/i, anchor: "Calculus 12 tutoring", href: "/calculus-12-tutor-burnaby" },
  { re: /university (math|calculus|linear algebra)|linear algebra|differential equations/i, anchor: "university math tutoring", href: "/university-math-tutor-vancouver" },
  { re: /chemistr/i, anchor: "Chemistry 12 tutoring", href: "/chemistry-12-tutor-burnaby" },
  { re: /university physics|first-year physics/i, anchor: "university physics tutoring", href: "/university-physics-tutor-vancouver" },
  { re: /physics/i, anchor: "Physics 12 tutoring", href: "/physics-12-tutor-burnaby" },
  { re: /biology|physiology|molecular|genetics|ecology/i, anchor: "science tutoring", href: "/science-tutor-burnaby" },
  { re: /IB Math|IB Mathematics/i, anchor: "IB Math tutoring", href: "/ib-math-tutor-vancouver" },
  { re: /\bIB\b|\bAP\b/i, anchor: "IB and AP tutoring", href: "/programs/ib-ap-tutoring" },
  { re: /AP Calculus/i, anchor: "AP Calculus tutoring", href: "/ap-calculus-tutor-burnaby" },
  { re: /statistic/i, anchor: "statistics tutoring", href: "/online-statistics-tutor" },
  { re: /econ|finance|CFA|MBA|business/i, anchor: "university and professional tutoring", href: "/university-professional" },
  { re: /python|javascript|programming|coding|computer science|data structures|web development|DOM|API|database/i, anchor: "coding and computer science tutoring", href: "/computer-science-tutor-vancouver" },
  { re: /french/i, anchor: "French tutoring", href: "/programs/french" },
  { re: /mandarin|chinese/i, anchor: "Mandarin tutoring", href: "/programs/mandarin" },
  { re: /SAT|GRE|GMAT|MCAT|exam prep|test prep|final exam|provincial/i, anchor: "exam-prep tutoring", href: "/final-exam-review-tutoring-burnaby" },
  { re: /word problem|problem.solving/i, anchor: "problem-solving support", href: "/math-word-problems-tutor" },
  { re: /algebra|functions|grade|elementary|middle school|high school math/i, anchor: "math tutoring in Burnaby", href: "/math-tutor-burnaby" },
];
const FALLBACKS = [
  { anchor: "math tutoring in Burnaby", href: "/math-tutor-burnaby" },
  { anchor: "math tutoring in Vancouver", href: "/math-tutor-vancouver" },
  { anchor: "IB and AP tutoring", href: "/programs/ib-ap-tutoring" },
  { anchor: "science tutoring", href: "/science-tutor-burnaby" },
];

function topicAnchors(article) {
  const text = [
    ...(article.intro || []),
    ...(article.overview || []),
    ...(article.keyConcepts || []),
    ...(article.closing || []),
  ].join(" ");
  const picked = [];
  const seen = new Set();
  for (const r of RELATED) {
    if (picked.length >= 4) break;
    if (r.re.test(text) && !seen.has(r.href)) {
      picked.push({ anchor: r.anchor, href: r.href });
      seen.add(r.href);
    }
  }
  for (const f of FALLBACKS) {
    if (picked.length >= 4) break;
    if (!seen.has(f.href)) { picked.push(f); seen.add(f.href); }
  }
  return picked;
}

// Section lead-in sentences, each embedding one distributed topic link.
const BRIDGE = (a) => [
  "Below we break down the key concepts, common mistakes and study tips for this topic — the same clear, step-by-step method our ",
  { text: a.anchor, href: a.href },
  " uses with every student.",
];
const KEY_LEAD = (a) => [
  "These core ideas are the foundation everything else builds on, and where our ",
  { text: a.anchor, href: a.href },
  " focuses first — make sure each one is solid:",
];
const MISTAKE_LEAD = (a) => [
  "These are the pitfalls that cost students the most marks — exactly the ones our ",
  { text: a.anchor, href: a.href },
  " helps eliminate:",
];
const TIP_LEAD = (a) => [
  "A few focused habits make the biggest difference, and they are built into our ",
  { text: a.anchor, href: a.href },
  ":",
];

function joinPoints(points) {
  if (!points || !points.length) return "";
  const items = points.map((p) => p.charAt(0).toLowerCase() + p.slice(1));
  if (items.length === 1) return items[0] + ".";
  return items.slice(0, -1).join("; ") + "; and " + items[items.length - 1] + ".";
}

function buildBody(article) {
  const t = topicAnchors(article);
  const at = (i) => t[i % t.length];
  const blocks = [];
  const usedHrefs = new Set();
  const use = (a) => { usedHrefs.add(a.href); return a; };

  // Intro + a bridging sentence with the first distributed link
  (article.intro || []).forEach((p) => blocks.push(para(p)));
  blocks.push(linkedPara(BRIDGE(use(at(0)))));

  if (article.overview?.length) {
    blocks.push(heading("What This Topic Covers"));
    article.overview.forEach((p) => blocks.push(para(p)));
  }
  if (article.keyConcepts?.length) {
    blocks.push(heading("Key Concepts to Master"));
    blocks.push(linkedPara(KEY_LEAD(use(at(1)))));
    article.keyConcepts.forEach((c) => blocks.push(bullet(c)));
  }
  if (article.commonMistakes?.length) {
    blocks.push(heading("Common Mistakes to Avoid"));
    blocks.push(linkedPara(MISTAKE_LEAD(use(at(2)))));
    article.commonMistakes.forEach((m) => blocks.push(bullet(m)));
  }
  if (article.studyTips?.length) {
    blocks.push(heading("Study Tips That Actually Work"));
    blocks.push(linkedPara(TIP_LEAD(use(at(3)))));
    article.studyTips.forEach((tp) => blocks.push(bullet(tp)));
  }

  // FAQ built from the article's real content
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
    linkedPara([
      "Yes. One-on-one, PhD-led tutoring diagnoses exactly where a student struggles, rebuilds the foundations, and builds the confidence and method to improve — far faster than studying alone. Book a ",
      { text: "free consultation", href: "/contact" },
      " to see how we can help.",
    ])
  );
  usedHrefs.add("/contact");

  blocks.push(heading("How Dr. Shreyank Educare Can Help"));
  (article.closing || []).forEach((p) => blocks.push(para(p)));

  return { blocks, usedHrefs: [...usedHrefs] };
}

// ── Inline keyword linking within body prose (adds a few more, distributed) ──
const KEYWORD_LINKS = [
  ["math tutoring in Burnaby", "/math-tutoring-burnaby"],
  ["Pre-Calculus 12", "/pre-calculus-12-tutor-burnaby"],
  ["Pre-Calculus 11", "/pre-calculus-11-tutor-burnaby"],
  ["Pre-Calculus", "/pre-calculus-12-tutor-burnaby"],
  ["Calculus 12", "/calculus-12-tutor-burnaby"],
  ["Calculus", "/calculus-12-tutor-burnaby"],
  ["Chemistry 12", "/chemistry-12-tutor-burnaby"],
  ["Chemistry", "/chemistry-12-tutor-burnaby"],
  ["Physics 12", "/physics-12-tutor-burnaby"],
  ["Physics", "/physics-12-tutor-burnaby"],
  ["Biology", "/science-tutor-burnaby"],
  ["AP Calculus", "/ap-calculus-tutor-burnaby"],
  ["IB Math", "/ib-math-tutor-vancouver"],
  ["linear algebra", "/linear-algebra-tutor-online-canada"],
  ["statistics", "/online-statistics-tutor"],
  ["word problems", "/math-word-problems-tutor"],
  ["final exam", "/final-exam-review-tutoring-burnaby"],
  ["Python", "/python-tutor-burnaby"],
  ["computer science", "/computer-science-tutor-vancouver"],
];
const TARGETS = KEYWORD_LINKS.map(([phrase, href]) => ({ phrase, href })).sort(
  (a, b) => b.phrase.length - a.phrase.length
);
const MAX_INLINE = 4;

function linkBody(body, skipHrefs) {
  const used = new Set(skipHrefs);
  let added = 0;
  for (const block of body) {
    if (added >= MAX_INLINE) break;
    if (block._type !== "block" || block.style === "h2" || block.listItem) continue;
    for (const t of TARGETS) {
      if (added >= MAX_INLINE) break;
      if (used.has(t.href)) continue;
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
        used.add(t.href);
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
  let totalLinks = 0;
  for (const slug of slugs) {
    const post = bySlug.get(slug);
    if (!post) {
      console.log(`  ! No published post found for slug "${slug}" — skipped.`);
      continue;
    }
    const article = blogContent[slug];
    const { blocks, usedHrefs } = buildBody(article);
    const inline = linkBody(blocks, usedHrefs);
    const linkCount = usedHrefs.length + inline;
    totalLinks += linkCount;
    changed++;
    console.log(`\n  ${post.title || slug}`);
    console.log(`    ${blocks.length} blocks, ${linkCount} links distributed through the article`);
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
