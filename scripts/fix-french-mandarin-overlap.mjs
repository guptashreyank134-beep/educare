/**
 * FIX: french-conversational and mandarin-conversational shared ~52 near-identical
 * 10-word runs (5.66%) -- concentrated in the "build conversational ability" section
 * (blocks 14, 16) and the near-identical closing CTA (block 38, noun-swapped). This
 * rewords all three to be genuinely French-specific, preserving the CTA's links, and
 * re-applies with the Mandarin post as a sibling so the gate enforces distinctness.
 */
import { client, applyPost, commit, verifyLatex, deadLinks, key } from "./flagship-lib.mjs";

const SLUG = "french-conversational-french-pronunciation";
const link = (parts) => {
  const markDefs = [], children = [];
  for (const part of parts) {
    if (typeof part === "string") children.push({ _type: "span", _key: key(), text: part, marks: [] });
    else { const k = key(); markDefs.push({ _key: k, _type: "link", href: part.href }); children.push({ _type: "span", _key: key(), text: part.text, marks: [k] }); }
  }
  return { _type: "block", _key: key(), style: "normal", markDefs, children };
};
const plain = (text) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });

const doc = await client.fetch(`*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, body}`, { s: SLUG });
if (!doc) { console.error("✗ not found"); process.exit(1); }

const RULES = [
  { match: /^Becoming conversational follows a learnable progression/, block: () => plain("Becoming able to converse in French happens in stages, and it helps to know what they are so you can aim your practice. You begin with the phrases that get any interaction off the ground — greetings, courtesies, a few simple questions — said with enough correct pronunciation to be understood. Next comes talking about yourself and your world: what you do, what you like, where you are from, the small talk that fills most real conversations.") },
  { match: /^The key is that each stage is practised through actual use/, block: () => plain("From there the range keeps widening — asking and answering questions, then coping with the unscripted turns a genuine conversation takes, where you cannot predict what comes next. What makes this progression work is that every stage is built by using French, not just studying it: you learn to converse by conversing. And the tactics for when you are momentarily stuck — asking someone to slow down or repeat, talking around a word you cannot recall, holding a pause without panic — are what keep an exchange alive when your French is imperfect. This in-the-moment competence, sitting on top of solid pronunciation, is exactly what separates someone who has studied French from someone who can actually speak it, and it grows fastest through real, guided practice.") },
  { match: /^The first step is a free, relaxed conversation/, block: () => link(["Curious whether it could work for you? A ", { text: "free 30-minute consultation", href: "/contact" }, " costs nothing and commits you to nothing — tell us what happens when you try to speak French, and we will pinpoint what is getting in the way and how to move past it. We meet students online right across Metro Vancouver, or in person in Burnaby, and if we think tutoring is not the right fit for you, we will tell you so plainly."]) },
];

let patched = 0;
const body = doc.body.map((b) => {
  const txt = (b.children || []).map((c) => c.text || "").join("");
  const rule = RULES.find((r) => r.match.test(txt));
  if (rule) { patched++; return rule.block(); }
  return b;
});
console.log(`patched ${patched} of ${RULES.length} target blocks`);
if (patched < 3) { console.error("✗ expected 3 matches — refusing"); process.exit(1); }

await applyPost({
  slug: SLUG,
  was: 1510,
  body,
  siblingSlugs: ["french-reading-writing-listening-practice", "french-grammar-vocabulary-sentence-formation", "mandarin-conversational-mandarin-pronunciation"],
});
