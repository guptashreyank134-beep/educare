/**
 * FIX: the two calculus posts (mathematics-calculus-limits-derivatives and
 * what-ubc-calculus-students-...) share ~28 near-identical 10-word runs (3.40%) --
 * a handful of duplicated conceptual sentences (the limit definition, the chain-rule
 * mechanics, a shared CTA phrase). They are same-subject and cross-linked by design,
 * but to leave the blog cleanly under 3% this rewords those exact phrases IN PLACE
 * in the review post, preserving every link and inline-math child.
 */
import { client, applyPost } from "./flagship-lib.mjs";

const SLUG = "what-ubc-calculus-students-should-review-before-first-midterm";
const doc = await client.fetch(`*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, body}`, { s: SLUG });
if (!doc) { console.error("✗ not found"); process.exit(1); }

// Phrase-level rewrites: replace the duplicated wording with distinct wording,
// applied only to span text so links and math children are untouched.
const SWAPS = [
  ["If you would rather work through it with someone, our ", "If you would rather not face that jump alone, our "],
  [" is aimed at precisely this transition.", " is built for exactly this school-to-university step."],
  ["A limit describes where a function is heading, not where it arrives.", "A limit captures the value a function is approaching, which need not equal the value it takes at that point — approaching and arriving are separate questions."],
  ["Say it out loud as you work: derivative of the outside, leaving the inside alone, times the derivative of the inside.", "Narrate it as you go: differentiate the outer function first with the inner part untouched, then multiply by the inner function's own derivative."],
];

let hits = 0;
const body = doc.body.map((b) => {
  if (!Array.isArray(b.children)) return b;
  const children = b.children.map((ch) => {
    if (typeof ch.text !== "string") return ch;
    let t = ch.text;
    for (const [from, to] of SWAPS) if (t.includes(from)) { t = t.split(from).join(to); hits++; }
    return t === ch.text ? ch : { ...ch, text: t };
  });
  return { ...b, children };
});
console.log(`applied ${hits} phrase rewrites`);
if (hits < SWAPS.length) { console.error(`✗ expected ${SWAPS.length} rewrites, applied ${hits} — refusing`); process.exit(1); }

await applyPost({
  slug: SLUG,
  was: 1554,
  body,
  siblingSlugs: ["mathematics-calculus-limits-derivatives", "common-pre-calculus-12-mistakes-burnaby", "pre-calculus-exponential-logarithmic-functions"],
});
