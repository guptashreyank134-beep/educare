/**
 * Deepen "What UBC calculus students should review before the first midterm"
 * (952 -> 1,500+).
 *
 * Gaps found by reading the post rather than guessing: no diagram, and no
 * coverage of conjugate limits, piecewise continuity, or the sin(x)/x limit —
 * all standard first-midterm material.
 *
 * Deliberately names no course codes. The post never did, and inventing
 * UBC course numbers or midterm syllabi is exactly the kind of unsourced claim
 * that got the pricing article rewritten.
 *
 * Maths verified first (scripts/verify-ubc-calc-additions.mjs).
 *
 *   Preview:  node --env-file=.env.local scripts/enrich-ubc-calc-guide.mjs
 *   Apply:    node --env-file=.env.local scripts/enrich-ubc-calc-guide.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "what-ubc-calculus-students-should-review-before-first-midterm";

/* 3-4-5 ladder, matching the post's own worked example. 45 px per metre. */
const S = 45, OX = 90, OY = 40;
const GY = OY + 4 * S;          // ground line  (y = 0 in the problem)
const BASE = [OX + 3 * S, GY];  // x = 3
const TOP = [OX, OY];           // y = 4
const ladderSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 380 290" role="img" aria-label="A five metre ladder leaning against a wall, forming a three-four-five triangle. The base is three metres from the wall and sliding away at zero point five metres per second. The top is four metres up the wall and descending at zero point three seven five metres per second. The ladder length stays five metres, which is the relationship that is differentiated." style="width:100%;max-width:380px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs>
      <marker id="la" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#B45309"/>
      </marker>
    </defs>
    <line x1="${OX}" y1="${OY - 14}" x2="${OX}" y2="${GY}" stroke="#94A3B8" stroke-width="5"/>
    <line x1="${OX}" y1="${GY}" x2="${OX + 4.4 * S}" y2="${GY}" stroke="#94A3B8" stroke-width="5"/>
    <line x1="${OX}" y1="${GY}" x2="${BASE[0]}" y2="${GY}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 4"/>
    <line x1="${TOP[0]}" y1="${TOP[1]}" x2="${BASE[0]}" y2="${BASE[1]}" stroke="#3A5A98" stroke-width="4"/>
    <circle cx="${TOP[0]}" cy="${TOP[1]}" r="4.5" fill="#3A5A98"/>
    <circle cx="${BASE[0]}" cy="${BASE[1]}" r="4.5" fill="#3A5A98"/>
    <text x="${(TOP[0] + BASE[0]) / 2 + 16}" y="${(TOP[1] + BASE[1]) / 2 - 8}" font-size="13" fill="#3A5A98" font-weight="700">5 m</text>
    <text x="${OX - 12}" y="${OY + 2 * S}" font-size="13" fill="#1F2937" text-anchor="end">y = 4</text>
    <text x="${OX + 1.5 * S}" y="${GY + 20}" font-size="13" fill="#1F2937" text-anchor="middle">x = 3</text>
    <line x1="${BASE[0] + 12}" y1="${GY}" x2="${BASE[0] + 58}" y2="${GY}" stroke="#B45309" stroke-width="2.5" marker-end="url(#la)"/>
    <text x="${BASE[0] + 35}" y="${GY - 10}" font-size="12" fill="#B45309" text-anchor="middle" font-weight="600">0.5 m/s</text>
    <line x1="${OX}" y1="${OY + 12}" x2="${OX}" y2="${OY + 52}" stroke="#B45309" stroke-width="2.5" marker-end="url(#la)"/>
    <text x="${OX + 8}" y="${OY + 38}" font-size="12" fill="#B45309" font-weight="600">0.375 m/s</text>
    <text x="190" y="278" font-size="12" fill="#64748B" text-anchor="middle">x and y both change with time — the 5 does not. That is the whole trick.</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The 3, the 4 and the two speeds are all true at <em>one instant only</em>. The length 5 is true always,
    which is why it is the thing you differentiate. Substitute the 3 too early and you have
    differentiated a photograph instead of a film.
  </figcaption>
</figure>`;

const limitBlocks = [
  h2("The other limit technique: the conjugate"),
  p("Factoring gets you most of the way through a limits section. Then a square root turns up and factoring does nothing, and this is reliably where students stall on a midterm."),
  math(String.raw`\lim_{x \to 0} \frac{\sqrt{x+4} - 2}{x}`),
  p("Substitute and you get 0/0 — the top is √4 − 2 = 0 and so is the bottom. Nothing factors. The move is to multiply top and bottom by the conjugate, which turns a difference of square roots into a plain difference:"),
  math(String.raw`\frac{\sqrt{x+4}-2}{x} \cdot \frac{\sqrt{x+4}+2}{\sqrt{x+4}+2} = \frac{(x+4)-4}{x\left(\sqrt{x+4}+2\right)}`),
  p("The numerator collapses to x, and now it cancels:"),
  math(String.raw`= \frac{x}{x\left(\sqrt{x+4}+2\right)} = \frac{1}{\sqrt{x+4}+2} \;\longrightarrow\; \frac{1}{4}`),
  p("The cancellation is legal for the same reason it was legal in the difference quotient: x is approaching zero, not sitting on it, so it is never actually zero and you may divide by it. The whole technique is one idea — multiplying by a disguised 1 to make the awkward part cancel."),
  h3("Limits at infinity are a different question"),
  p("These look like the same topic and are not. \"What happens as x approaches 2\" asks about a point. \"What happens as x approaches infinity\" asks about long-run behaviour, and infinity is not a place you can substitute."),
  math(String.raw`\lim_{x \to \infty} \frac{3x^2+2x}{5x^2-1}`),
  p("The technique: divide every term by the highest power of x in the denominator. Here that is x²:"),
  math(String.raw`\frac{3 + \frac{2}{x}}{5 - \frac{1}{x^2}} \;\longrightarrow\; \frac{3+0}{5-0} = \frac{3}{5}`),
  mp(["Everything with an x underneath dies, and what survives is the ratio of the leading coefficients. The shortcut is worth having: if the degrees match, the limit is that ratio. If the bottom wins, the limit is 0. If the top wins, it diverges. But learn the division first, because the shortcut is only safe once you know why it is true."]),
  p("This is also what a horizontal asymptote is — the same calculation, wearing a graph's clothing. Questions that ask for asymptotes are asking for this limit, and students who learned them as separate topics do twice the work."),
  h3("And the one you must simply know"),
  math(String.raw`\lim_{x \to 0} \frac{\sin x}{x} = 1`),
  p("Also 0/0, and neither factoring nor conjugates touch it. It is proved geometrically and then used constantly, so learn the result. One warning that costs marks every year: it is true in radians and false in degrees. In degrees that limit is π/180, not 1 — which is a large part of why calculus abandons degrees entirely."),
];

const continuityBlocks = [
  h2("Continuity: the definition that is actually examined"),
  p("Continuity gets described as \"you can draw it without lifting your pen\", which is a picture, not a definition, and it is useless on the question they actually ask. The real definition has three parts, and a function is continuous at a point only if all three hold:"),
  mli(["f(a) exists — the function is defined there at all."]),
  mli(["The limit as x approaches a exists — and that means the left and right limits agree."]),
  mli(["They are equal to each other."]),
  p("Three separate conditions, and the exam question is built to break exactly one of them while the other two look fine."),
  h3("The standard question"),
  mp(["Find k so that this is continuous at x = 1:"]),
  math(String.raw`f(x) = \begin{cases} \dfrac{x^2-1}{x-1} & x \neq 1 \\[6pt] k & x = 1 \end{cases}`),
  p("For every x other than 1, the top factors and cancels:"),
  math(String.raw`\frac{x^2-1}{x-1} = \frac{(x-1)(x+1)}{x-1} = x+1`),
  mp(["So the limit as x approaches 1 is 2. Condition one says f(1) must exist — it does, it is k. Condition three says they must match. Therefore ", im(String.raw`k = 2`), ", and any other value leaves a hole with a dot floating above or below it."]),
  p("Notice why the function had to be defined piecewise in the first place: at x = 1 the original formula is 0/0, genuinely undefined. The piecewise line is not decoration — it is patching a hole that the algebra cannot patch by itself. Understanding that is the difference between answering this question and pattern-matching it."),
];

async function run() {
  const doc = await client.fetch(
    `*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id, body}`, { s: SLUG },
  );
  if (!doc || !Array.isArray(doc.body)) { console.error("  ✗ post not found or body is not Portable Text"); process.exit(1); }

  const textOf = (b) => (b.children || []).map((c) => c.text || "").join("");
  const before = doc.body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;

  if (doc.body.some((b) => /other limit technique|Continuity: the definition/i.test(textOf(b)))) {
    console.log("  ! already enriched — nothing to do (idempotent)");
    return;
  }

  const idxOf = (re) => doc.body.findIndex((b) => b.style === "h2" && re.test(textOf(b)));
  const iChain = idxOf(/The chain rule: the one that decides your grade/i);
  const iReview = idxOf(/What to review, in priority order/i);
  const iLadder = doc.body.findIndex((b) => b.style === "h3" && /Worked example: the sliding ladder/i.test(textOf(b)));
  if (iChain < 0 || iReview < 0 || iLadder < 0) {
    console.error(`  ✗ anchors not found (chain=${iChain}, review=${iReview}, ladder=${iLadder}) — refusing to guess`);
    process.exit(1);
  }

  // Splice back-to-front so earlier indices stay valid.
  const body = [...doc.body];
  body.splice(iReview, 0, ...continuityBlocks);
  body.splice(iLadder + 1, 0, { _type: "htmlBlock", _key: key(), html: ladderSvg });
  body.splice(iChain, 0, ...limitBlocks);

  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const svgs = body.filter((b) => b._type === "htmlBlock").length;
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${before} -> ${words}  (+${words - before})`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (/MATH\s?\d{3}/.test(text)) { console.error("  ✗ a UBC course code appeared — not verifiable, refusing."); process.exit(1); }
  console.log("  sourcing  : names no course codes or midterm syllabi ✓");
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ enriched (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
