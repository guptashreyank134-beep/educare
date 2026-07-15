/**
 * Rewrite blog post bodies with substantive, UNIQUE content and internal links
 * woven contextually throughout the article.
 *
 * The subject content (intro, overview, concepts, mistakes, tips, closing) is
 * unique per post (authored in blog-content-data.mjs). To avoid repeated
 * boilerplate across posts, the scaffolding sentences (section lead-ins, FAQ
 * questions/answers, headings) are chosen from several variants, deterministic
 * per slug — so each article reads differently while the internal-linking
 * logic stays identical (one distributed link per section + inline links).
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

// FNV-1a hash — deterministic, so every run produces the same choices.
function fnv(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

// Deterministic per-slug variant picker (idempotent; different salt per slot).
function pick(pool, slug, salt) {
  return pool[fnv(slug + "|" + salt) % pool.length];
}

// ── Portable Text builders ───────────────────────────────
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const blk = (style, children, markDefs = []) => ({ _type: "block", _key: key(), style, markDefs, children });
const para = (text) => blk("normal", [span(text)]);
const heading = (text) => blk("h2", [span(text)]);
const strongPara = (text) => blk("normal", [span(text, ["strong"])]);
const bullet = (text) => ({ ...blk("normal", [span(text)]), listItem: "bullet", level: 1 });
const linkedPara = (parts) => {
  const markDefs = [];
  const children = [];
  for (const p of parts) {
    if (typeof p === "string") children.push(span(p));
    else {
      const lk = key();
      markDefs.push({ _key: lk, _type: "link", href: p.href });
      children.push(span(p.text, [lk]));
    }
  }
  return blk("normal", children, markDefs);
};
const L = (a) => ({ text: a.anchor, href: a.href });

// ── Anchor-text pools ────────────────────────────────────
// Linking 77 posts to the same page with the SAME exact-match anchor reads as
// over-optimisation and cannibalises the term. Each destination therefore has a
// pool of natural variations (long-tail, partial-match, synonym), chosen
// deterministically per post so the same page is reached by varied phrasing.
const ANCHORS = {
  "/pre-calculus-12-tutor-burnaby": [
    "Pre-Calculus 12 tutoring", "our Pre-Calculus 12 programme", "one-on-one Pre-Calculus 12 help",
    "Pre-Calculus 12 support in Burnaby", "help with Pre-Calculus 12", "Pre-Calculus 12 tutors",
  ],
  "/calculus-12-tutor-burnaby": [
    "Calculus 12 tutoring", "our Calculus 12 programme", "one-on-one Calculus 12 help",
    "Calculus 12 support", "help with Calculus 12", "Calculus 12 tutors in Burnaby",
  ],
  "/university-math-tutor-vancouver": [
    "university math tutoring", "first-year university math support", "help with university-level math",
    "our university math programme", "university math tutors in Vancouver", "degree-level math support",
  ],
  "/chemistry-12-tutor-burnaby": [
    "Chemistry 12 tutoring", "our Chemistry 12 programme", "one-on-one Chemistry 12 help",
    "Chemistry 12 support", "help with Chemistry 12", "Chemistry 12 tutors in Burnaby",
  ],
  "/university-physics-tutor-vancouver": [
    "university physics tutoring", "first-year physics support", "help with university physics",
    "our university physics programme", "university physics tutors", "degree-level physics support",
  ],
  "/physics-12-tutor-burnaby": [
    "Physics 12 tutoring", "our Physics 12 programme", "one-on-one Physics 12 help",
    "Physics 12 support", "help with Physics 12", "Physics 12 tutors in Burnaby",
  ],
  "/science-tutor-burnaby": [
    "science tutoring", "our science programme", "one-on-one science help",
    "science support for Grades 6–12", "help with school science", "science tutors in Burnaby",
  ],
  "/ib-math-tutor-vancouver": [
    "IB Math tutoring", "our IB Mathematics programme", "help with IB Math",
    "IB Math AA and AI support", "one-on-one IB Math help", "IB Math tutors in Vancouver",
  ],
  "/programs/ib-ap-tutoring": [
    "IB and AP tutoring", "our IB and AP programme", "help with IB and AP courses",
    "IB and AP exam support", "one-on-one IB/AP help", "IB and AP subject tutors",
  ],
  "/ap-calculus-tutor-burnaby": [
    "AP Calculus tutoring", "our AP Calculus programme", "AP Calculus AB and BC support",
    "help with AP Calculus", "one-on-one AP Calculus help", "AP Calculus tutors",
  ],
  "/online-statistics-tutor": [
    "statistics tutoring", "our online statistics programme", "help with statistics",
    "one-on-one statistics support", "statistics tutors online", "university statistics help",
  ],
  "/university-professional": [
    "university and professional tutoring", "our university & professional programme",
    "support for university and professional courses", "degree and professional-level help",
    "university and professional tutors", "help for university and professional students",
  ],
  "/computer-science-tutor-vancouver": [
    "coding and computer science tutoring", "our computer science programme", "help with coding",
    "one-on-one programming support", "computer science tutors", "coding help for students",
  ],
  "/programs/french": [
    "French tutoring", "our French programme", "help with French", "one-on-one French support",
    "French tutors", "French language help",
  ],
  "/programs/mandarin": [
    "Mandarin tutoring", "our Mandarin programme", "help with Mandarin", "one-on-one Mandarin support",
    "Mandarin tutors", "Mandarin language help",
  ],
  "/final-exam-review-tutoring-burnaby": [
    "exam-prep tutoring", "our final-exam review programme", "help preparing for finals",
    "targeted exam preparation", "final-exam review sessions", "exam preparation support",
  ],
  "/math-word-problems-tutor": [
    "problem-solving support", "help with word problems", "our problem-solving coaching",
    "word-problem strategies", "support for tricky word problems", "problem-solving practice",
  ],
  "/math-tutor-burnaby": [
    "math tutoring in Burnaby", "Burnaby math tutors", "one-on-one math help in Burnaby",
    "our Burnaby math programme", "in-person math tutoring in Burnaby", "math support for Burnaby students",
  ],
  "/math-tutor-vancouver": [
    "math tutoring in Vancouver", "Vancouver math tutors", "one-on-one math help in Vancouver",
    "our Vancouver math programme", "math support for Vancouver students", "math help across Vancouver",
  ],
  "/best-math-tutor-burnaby": [
    "top-rated math tutors in Burnaby", "our highest-rated math help", "Burnaby's PhD-led math tutoring",
    "5-star math tutoring in Burnaby", "our best-reviewed math programme",
  ],
  "/private-math-tutor-burnaby": [
    "private math tutoring", "a private math tutor in Burnaby", "individual math tuition",
    "private one-to-one math sessions", "personal math tutoring",
  ],
  "/stem-tutor-vancouver": [
    "STEM tutoring in Vancouver", "our STEM programme", "science and math support in Vancouver",
    "STEM tutors", "help across STEM subjects",
  ],
  "/pre-calculus-11-tutor-burnaby": [
    "Pre-Calculus 11 tutoring", "our Pre-Calculus 11 programme", "help with Pre-Calculus 11",
    "Pre-Calculus 11 support", "Pre-Calculus 11 tutors",
  ],
  "/chemistry-11-tutor-burnaby": [
    "Chemistry 11 tutoring", "our Chemistry 11 programme", "help with Chemistry 11",
    "Chemistry 11 support", "Chemistry 11 tutors",
  ],
  "/physics-11-tutor-burnaby": [
    "Physics 11 tutoring", "our Physics 11 programme", "help with Physics 11",
    "Physics 11 support", "Physics 11 tutors",
  ],
  // Varied phrasing for SEO (no exact-match repetition), but every variant names
  // the SAME offer — a consultation. "trial"/"session" wording is deliberately
  // absent: it implied a different service and confused parents.
  "/contact": [
    "free consultation", "free 30-minute consultation", "no-obligation consultation",
    "complimentary consultation", "free initial consultation", "book a consultation",
  ],
};

// Pick a varied anchor for a destination; salt keeps different slots on one page distinct.
function anchorFor(href, slug, salt) {
  const pool = ANCHORS[href];
  if (!pool || !pool.length) return href;
  return pick(pool, slug, `anchor|${href}|${salt}`);
}

// ── Topic-based contextual links (accurate per article) ──
const RELATED = [
  { re: /pre-calculus/i, href: "/pre-calculus-12-tutor-burnaby" },
  { re: /\bcalculus\b/i, href: "/calculus-12-tutor-burnaby" },
  { re: /university (math|calculus|linear algebra)|linear algebra|differential equations/i, href: "/university-math-tutor-vancouver" },
  { re: /chemistr/i, href: "/chemistry-12-tutor-burnaby" },
  { re: /university physics|first-year physics/i, href: "/university-physics-tutor-vancouver" },
  { re: /physics/i, href: "/physics-12-tutor-burnaby" },
  { re: /biology|physiology|molecular|genetics|ecology/i, href: "/science-tutor-burnaby" },
  { re: /IB Math|IB Mathematics/i, href: "/ib-math-tutor-vancouver" },
  { re: /\bIB\b|\bAP\b/i, href: "/programs/ib-ap-tutoring" },
  { re: /AP Calculus/i, href: "/ap-calculus-tutor-burnaby" },
  { re: /statistic/i, href: "/online-statistics-tutor" },
  { re: /econ|finance|CFA|MBA|business/i, href: "/university-professional" },
  { re: /python|javascript|programming|coding|computer science|data structures|web development|DOM|API|database/i, href: "/computer-science-tutor-vancouver" },
  { re: /french/i, href: "/programs/french" },
  { re: /mandarin|chinese/i, href: "/programs/mandarin" },
  { re: /SAT|GRE|GMAT|MCAT|exam prep|test prep|final exam|provincial/i, href: "/final-exam-review-tutoring-burnaby" },
  { re: /word problem|problem.solving/i, href: "/math-word-problems-tutor" },
  { re: /algebra|functions|grade|elementary|middle school|high school math/i, href: "/math-tutor-burnaby" },
];

// Rotated per slug so link equity spreads across many pages instead of piling
// onto the same two hubs on every post.
const FALLBACK_POOL = [
  "/math-tutor-burnaby",
  "/math-tutor-vancouver",
  "/programs/ib-ap-tutoring",
  "/science-tutor-burnaby",
  "/final-exam-review-tutoring-burnaby",
  "/best-math-tutor-burnaby",
  "/private-math-tutor-burnaby",
  "/stem-tutor-vancouver",
  "/math-word-problems-tutor",
];

function topicAnchors(article, slug, title) {
  // The article's SUBJECT (slug + title) is the source of truth for the primary
  // links — a physics post must not lead with a "Calculus 12" link just because
  // its prose happens to mention calculus. Pass 1 matches the subject (so the
  // first/most-prominent anchors are always on-topic); pass 2 adds genuinely
  // related cross-links found only in the body; pass 3 fills from fallbacks,
  // rotated per slug so the same hubs aren't linked from every single post.
  const subject = (slug.replace(/-/g, " ") + " " + (title || "")).toLowerCase();
  const bodyText = [...(article.intro || []), ...(article.overview || []), ...(article.keyConcepts || []), ...(article.closing || [])].join(" ");
  const picked = [];
  const seen = new Set();
  const take = (href) => {
    if (picked.length >= 4 || seen.has(href)) return;
    picked.push(href);
    seen.add(href);
  };
  for (const r of RELATED) if (r.re.test(subject)) take(r.href);
  for (const r of RELATED) if (picked.length < 4 && r.re.test(bodyText)) take(r.href);

  // Rotate the fallback order by slug so link equity is distributed.
  const start = fnv(slug + "|fallback") % FALLBACK_POOL.length;
  for (let i = 0; i < FALLBACK_POOL.length && picked.length < 4; i++) {
    take(FALLBACK_POOL[(start + i) % FALLBACK_POOL.length]);
  }
  return picked;
}

// ── Variant pools (chosen per slug so posts differ) ──
const H_OVERVIEW = ["What This Topic Covers", "An Overview", "Understanding the Essentials", "The Big Picture", "What You'll Learn Here"];
const H_KEY = ["Key Concepts to Master", "The Core Ideas", "Concepts That Matter Most", "What You Need to Understand", "The Fundamentals"];
const H_MISTAKE = ["Common Mistakes to Avoid", "Pitfalls to Watch For", "Where Students Slip Up", "Mistakes That Cost Marks", "Traps to Avoid"];
const H_TIP = ["Study Tips That Actually Work", "How to Study This Effectively", "Smart Ways to Study", "Study Strategies That Help", "Getting the Most From Your Study Time"];
const H_FAQ = ["Frequently Asked Questions", "Common Questions", "Questions Students Ask", "Your Questions, Answered"];
const H_HELP = ["How Dr. Shreyank Educare Can Help", "How We Can Help", "Getting Expert Support", "How Tutoring Makes the Difference"];

const BRIDGES = [
  (a) => ["Below, we break down the essentials of this topic — the same clear, step-by-step approach our ", L(a), " uses with every student."],
  (a) => ["Here's a practical guide to mastering it, built on the methods our ", L(a), " relies on."],
  (a) => ["This guide walks through what matters most, the way our ", L(a), " teaches it one-on-one."],
  (a) => ["Let's make this topic click, using the same techniques our ", L(a), " uses with students every week."],
  (a) => ["What follows is a focused breakdown, drawn from how our ", L(a), " approaches it."],
  (a) => ["Read on for the key ideas, common traps and study strategies — exactly what our ", L(a), " covers."],
];
const KEY_LEADS = [
  (a) => ["These are the foundations everything else depends on — the first thing our ", L(a), " makes solid:"],
  (a) => ["Get these core ideas right and the rest follows; they're where our ", L(a), " starts:"],
  (a) => ["Master the concepts below — they're the backbone of this topic, and a focus of our ", L(a), ":"],
  (a) => ["The ideas that matter most are here, and our ", L(a), " makes sure each one clicks:"],
  (a) => ["Everything builds on these fundamentals, which our ", L(a), " reinforces first:"],
  (a) => ["Understand the essentials below; our ", L(a), " returns to them again and again:"],
];
const MISTAKE_LEADS = [
  (a) => ["Most lost marks trace back to these avoidable errors — the ones our ", L(a), " helps students fix:"],
  (a) => ["Watch out for these pitfalls; eliminating them is a big part of our ", L(a), ":"],
  (a) => ["These are the traps that catch students out, and where our ", L(a), " makes the difference:"],
  (a) => ["Avoid the common errors below — our ", L(a), " targets exactly these:"],
  (a) => ["Students lose the most marks to these mistakes, which our ", L(a), " helps prevent:"],
  (a) => ["Steer clear of the slip-ups below; our ", L(a), " trains students to catch them early:"],
];
const TIP_LEADS = [
  (a) => ["A handful of smart habits go a long way — the same ones our ", L(a), " builds in:"],
  (a) => ["These strategies make the biggest difference, and they're central to our ", L(a), ":"],
  (a) => ["Study smarter with the approaches below, drawn from our ", L(a), ":"],
  (a) => ["The habits that work best are here, and our ", L(a), " puts them into practice:"],
  (a) => ["Put these techniques to work — they're how our ", L(a), " gets results:"],
  (a) => ["Small changes to how you study pay off; our ", L(a), " coaches these directly:"],
];

const Q_MISTAKE = ["What mistakes should I watch out for?", "What are the most common errors students make?", "Where do students usually go wrong?", "What trips students up most?"];
const Q_STUDY = ["How should I study this effectively?", "What's the best way to prepare?", "How can I study this topic well?", "What study approach works best?"];
const Q_TUTOR = ["Can a tutor really help?", "Is tutoring worth it for this?", "How much difference does a tutor make?", "Can one-on-one help improve my grade?"];
const A_MISTAKE_LEAD = ["The most frequent slip-ups include ", "Students most often struggle with ", "Keep an eye out for ", "Common errors to avoid are "];
const A_STUDY_LEAD = ["Focus on a few high-impact habits: ", "What works best is to ", "Prioritise these habits: ", "The most effective approach is to "];
const A_TUTOR = [
  (l) => ["Yes. One-on-one, PhD-led tutoring pinpoints exactly where a student struggles and rebuilds the foundations — far faster than studying alone. Book a ", l, " to see how we can help."],
  (l) => ["Absolutely. A dedicated tutor adapts to your child in real time, closes gaps quickly and rebuilds confidence. Start with a ", l, "."],
  (l) => ["It often makes a big difference. Focused, personalised help turns confusion into understanding and lifts both grades and confidence. Book a ", l, " to begin."],
  (l) => ["Yes — for most students, one-on-one support is the fastest route to real improvement. A ", l, " is a no-obligation way to start."],
];

function joinPoints(points) {
  if (!points || !points.length) return "";
  const items = points.map((p) => p.charAt(0).toLowerCase() + p.slice(1));
  if (items.length === 1) return items[0] + ".";
  return items.slice(0, -1).join("; ") + "; and " + items[items.length - 1] + ".";
}

function buildBody(article, slug, title) {
  const t = topicAnchors(article, slug, title);
  const at = (i) => t[i % t.length];
  const blocks = [];
  const usedHrefs = new Set();
  // Resolve a destination into a link with a VARIED anchor. The salt differs per
  // slot, so neither this post nor its siblings reuse the same phrasing.
  const link = (href, salt) => {
    usedHrefs.add(href);
    return { anchor: anchorFor(href, slug, salt), href };
  };

  (article.intro || []).forEach((p) => blocks.push(para(p)));
  blocks.push(linkedPara(pick(BRIDGES, slug, "bridge")(link(at(0), "bridge"))));

  if (article.overview?.length) {
    blocks.push(heading(pick(H_OVERVIEW, slug, "ho")));
    article.overview.forEach((p) => blocks.push(para(p)));
  }
  if (article.keyConcepts?.length) {
    blocks.push(heading(pick(H_KEY, slug, "hk")));
    blocks.push(linkedPara(pick(KEY_LEADS, slug, "kl")(link(at(1), "kl"))));
    article.keyConcepts.forEach((c) => blocks.push(bullet(c)));
  }
  if (article.commonMistakes?.length) {
    blocks.push(heading(pick(H_MISTAKE, slug, "hm")));
    blocks.push(linkedPara(pick(MISTAKE_LEADS, slug, "ml")(link(at(2), "ml"))));
    article.commonMistakes.forEach((m) => blocks.push(bullet(m)));
  }
  if (article.studyTips?.length) {
    blocks.push(heading(pick(H_TIP, slug, "ht")));
    blocks.push(linkedPara(pick(TIP_LEADS, slug, "tl")(link(at(3), "tl"))));
    article.studyTips.forEach((tp) => blocks.push(bullet(tp)));
  }

  blocks.push(heading(pick(H_FAQ, slug, "hf")));
  if (article.commonMistakes?.length) {
    blocks.push(strongPara(pick(Q_MISTAKE, slug, "qm")));
    blocks.push(para(pick(A_MISTAKE_LEAD, slug, "am") + joinPoints(article.commonMistakes)));
  }
  if (article.studyTips?.length) {
    blocks.push(strongPara(pick(Q_STUDY, slug, "qs")));
    blocks.push(para(pick(A_STUDY_LEAD, slug, "as") + joinPoints(article.studyTips)));
  }
  blocks.push(strongPara(pick(Q_TUTOR, slug, "qt")));
  blocks.push(linkedPara(pick(A_TUTOR, slug, "at")(L(link("/contact", "cta")))));

  blocks.push(heading(pick(H_HELP, slug, "hh")));
  (article.closing || []).forEach((p) => blocks.push(para(p)));

  return { blocks, usedHrefs: [...usedHrefs] };
}

// ── Inline keyword linking within body prose ──
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
const TARGETS = KEYWORD_LINKS.map(([phrase, href]) => ({ phrase, href })).sort((a, b) => b.phrase.length - a.phrase.length);
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
    if (!post) { console.log(`  ! No published post found for slug "${slug}" — skipped.`); continue; }
    const article = blogContent[slug];
    const { blocks, usedHrefs } = buildBody(article, slug, post.title);
    const inline = linkBody(blocks, usedHrefs);
    const linkCount = usedHrefs.length + inline;
    totalLinks += linkCount;
    changed++;
    console.log(`\n  ${post.title || slug}\n    ${blocks.length} blocks, ${linkCount} links distributed through the article`);
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
