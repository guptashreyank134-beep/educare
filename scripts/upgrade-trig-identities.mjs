/**
 * Upgrade "Trigonometric Identities & Equations in Pre-Calculus" (566 words)
 * to a full guide with LaTeX, a real SVG unit circle, worked examples and
 * practice problems.
 *
 * First of the Pre-Calculus / Physics 12 batch.
 *
 * All maths verified numerically first (scripts/verify-trig-math.mjs) and every
 * equation is KaTeX-checked here — the script refuses to write broken maths.
 *
 * KEYWORDS: linked contextually to the pages built from the client's keyword
 * list (/pre-calculus-12-tutor-burnaby, /pre-calculus-12-final-exam-review,
 * /calculus-12-tutor-burnaby), with varied anchors — never stuffed.
 *
 * The diagram is inline SVG in an htmlBlock (a type the post schema already
 * supports and the blog already renders), so it needs no schema change, scales
 * without pixelation and carries no image weight.
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-trig-identities.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-trig-identities.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, li, math, im, mp, mli, linked, span } from "./flagship-lib.mjs";

const SLUG = "pre-calculus-trigonometric-identities-equations";

/** Verified coordinates: cos(π/6)=√3/2, sin(π/6)=1/2, etc. */
const unitCircleSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 340 340" role="img" aria-label="Unit circle showing the angles pi/6, pi/4 and pi/3 with their cosine and sine coordinates" style="width:100%;max-width:340px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="20" y1="170" x2="320" y2="170" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="170" y1="320" x2="170" y2="20" stroke="#CBD5E1" stroke-width="1.5"/>
    <text x="325" y="175" font-size="12" fill="#64748B">x</text>
    <text x="164" y="18" font-size="12" fill="#64748B">y</text>
    <circle cx="170" cy="170" r="130" fill="none" stroke="#3A5A98" stroke-width="2"/>
    <!-- pi/6 : (0.866, 0.5) -->
    <line x1="170" y1="170" x2="282.6" y2="105" stroke="#F4E98B" stroke-width="2.5"/>
    <circle cx="282.6" cy="105" r="4" fill="#3A5A98"/>
    <text x="288" y="100" font-size="11" fill="#1F2937">π/6 (√3/2, 1/2)</text>
    <!-- pi/4 : (0.707, 0.707) -->
    <line x1="170" y1="170" x2="261.9" y2="78.1" stroke="#F4E98B" stroke-width="2.5"/>
    <circle cx="261.9" cy="78.1" r="4" fill="#3A5A98"/>
    <text x="266" y="72" font-size="11" fill="#1F2937">π/4 (√2/2, √2/2)</text>
    <!-- pi/3 : (0.5, 0.866) -->
    <line x1="170" y1="170" x2="235" y2="57.4" stroke="#F4E98B" stroke-width="2.5"/>
    <circle cx="235" cy="57.4" r="4" fill="#3A5A98"/>
    <text x="200" y="45" font-size="11" fill="#1F2937">π/3 (1/2, √3/2)</text>
    <!-- the right triangle that explains everything -->
    <line x1="235" y1="57.4" x2="235" y2="170" stroke="#3A5A98" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="240" y="120" font-size="11" fill="#3A5A98">sin θ</text>
    <text x="192" y="185" font-size="11" fill="#3A5A98">cos θ</text>
    <text x="120" y="205" font-size="11" fill="#64748B">radius = 1</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Every point on the unit circle is (cos θ, sin θ). The dashed line is sin θ, the base is cos θ,
    and the radius is 1 — which is why sin²θ + cos²θ = 1 is just Pythagoras.
  </figcaption>
</figure>`;

const svgBlock = { _type: "htmlBlock", _key: key(), html: unitCircleSvg };

const body = [
  p("Trigonometric identities are where Pre-Calculus 12 stops rewarding memory. There are dozens of them, students try to learn the list, and then an exam question asks for something that isn't on it."),
  p("The way out is smaller than the list: almost every identity you need comes from one picture and one equation. Learn where they come from and you can rebuild any of them under exam pressure — which is a very different feeling from hoping you memorised the right one."),
  linked(["This guide starts with the picture, derives the identities you actually need, then works through solving equations with them. If you would rather work through it with someone, our ", { text: "Pre-Calculus 12 tutoring", href: "/pre-calculus-12-tutor-burnaby" }, " spends most of its trig time on exactly this."]),

  h2("Start with the picture, not the list"),
  mp(["Everything begins with the unit circle: a circle of radius ", im(String.raw`1`), " centred at the origin. Any point on it has coordinates ", im(String.raw`(\cos\theta,\ \sin\theta)`), ", where ", im(String.raw`\theta`), " is the angle from the positive x-axis."]),
  svgBlock,
  p("Look at the dashed triangle. Its height is sin θ, its base is cos θ, and its hypotenuse is the radius — which is 1. Pythagoras gives you, with no memorisation at all:"),
  math(String.raw`\cos^2\theta + \sin^2\theta = 1^2 \;\Longrightarrow\; \sin^2\theta + \cos^2\theta = 1`),
  p("That is the Pythagorean identity, and it is not a fact to learn — it is a triangle. Once you see that, the other two come free."),

  h2("Deriving the other two, rather than memorising them"),
  mp(["Take the identity above and divide every term by ", im(String.raw`\cos^2\theta`), ":"]),
  math(String.raw`\frac{\sin^2\theta}{\cos^2\theta} + \frac{\cos^2\theta}{\cos^2\theta} = \frac{1}{\cos^2\theta} \;\Longrightarrow\; \tan^2\theta + 1 = \sec^2\theta`),
  mp(["Now divide the original by ", im(String.raw`\sin^2\theta`), " instead:"]),
  math(String.raw`1 + \cot^2\theta = \csc^2\theta`),
  p("Three identities, one triangle, two divisions. If you forget them in an exam you can recover both in about fifteen seconds — which is the entire point. A student who memorised all three and forgets one has nothing; a student who derives them cannot lose them."),

  h2("The reciprocal and quotient identities"),
  p("Before the harder ones, four definitions do more work than any identity on the list:"),
  math(String.raw`\tan\theta = \frac{\sin\theta}{\cos\theta} \qquad \cot\theta = \frac{\cos\theta}{\sin\theta} \qquad \sec\theta = \frac{1}{\cos\theta} \qquad \csc\theta = \frac{1}{\sin\theta}`),
  p("These are not identities to prove — they are what those functions mean. But they are the most useful move in the unit, because almost every \"prove this identity\" question opens the same way: rewrite everything in terms of sine and cosine, then simplify. If you are ever stuck on a proof, that is the move. It works far more often than it has any right to."),

  h2("Sum and difference identities"),
  p("These handle angles that are not on the unit circle, by building them out of two that are:"),
  math(String.raw`\sin(A \pm B) = \sin A\cos B \pm \cos A \sin B`),
  math(String.raw`\cos(A \pm B) = \cos A\cos B \mp \sin A \sin B`),
  mp(["Watch the signs on the cosine one — they are ", span("opposite", ["strong"]), " to the sign in the bracket, so ", im(String.raw`\cos(A+B)`), " uses a minus. That inversion is the most common slip in the whole unit, and it is worth saying out loud every time you write it."]),
  h3("Worked example: an exact value, without a calculator"),
  mp(["Find the exact value of ", im(String.raw`\sin 75^\circ`), "."]),
  mp([im(String.raw`75^\circ`), " is not on the unit circle — but ", im(String.raw`45^\circ`), " and ", im(String.raw`30^\circ`), " are, and they add to it:"]),
  math(String.raw`\sin 75^\circ = \sin(45^\circ + 30^\circ) = \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ`),
  math(String.raw`= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2}\cdot\frac{1}{2} = \frac{\sqrt{6} + \sqrt{2}}{4}`),
  p("That equals 0.965926…, which a calculator confirms — but the calculator was never the point. The exam wants the exact form, and the exact form exists only because you decomposed 75° into two angles you already knew. The skill being tested is the decomposition, not the arithmetic."),

  h2("The double-angle identities — and where they come from"),
  mp(["Here is the part worth noticing: you do not need to memorise these either. Put ", im(String.raw`B = A`), " into the sum identity and watch what falls out."]),
  math(String.raw`\sin 2\theta = \sin(\theta + \theta) = \sin\theta\cos\theta + \cos\theta\sin\theta = 2\sin\theta\cos\theta`),
  math(String.raw`\cos 2\theta = \cos(\theta + \theta) = \cos\theta\cos\theta - \sin\theta\sin\theta = \cos^2\theta - \sin^2\theta`),
  p("The double-angle identities are not new facts — they are the sum identities with both angles the same. That derivation takes ten seconds, which means forgetting them costs you nothing."),
  p("The cosine version has three forms, and that is where students most often come unstuck:"),
  math(String.raw`\cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta`),
  mp(["Those three cosine forms are the same statement — swap ", im(String.raw`\sin^2\theta`), " for ", im(String.raw`1 - \cos^2\theta`), " and watch one become the next. You do not memorise three; you memorise one and know you can convert."]),
  p("Which form to use is decided by the question, not by preference: if the rest of the problem is in cosines, use the cosine-only version so everything matches. Choosing the form that removes the mismatch is most of the skill."),

  h2("Worked example: simplifying"),
  mp(["Simplify ", im(String.raw`\dfrac{1 - \cos^2\theta}{\sin\theta}`), "."]),
  p("The instinct is to start cancelling. Resist it — look for the identity first."),
  math(String.raw`1 - \cos^2\theta = \sin^2\theta \quad \text{(rearranged Pythagorean identity)}`),
  math(String.raw`\frac{1 - \cos^2\theta}{\sin\theta} = \frac{\sin^2\theta}{\sin\theta} = \sin\theta`),
  p("One substitution and the problem collapses. That is what these questions test: not algebra, but whether you recognised that 1 − cos²θ was sin²θ wearing a disguise. Every simplification question in this unit is that same move."),

  h2("Worked example: solving a trig equation"),
  mp(["Solve ", im(String.raw`2\sin^2 x + \sin x - 1 = 0`), " for ", im(String.raw`0 \le x < 2\pi`), "."]),
  h3("Step 1 — notice it is a quadratic in disguise"),
  mp(["Substituting ", im(String.raw`u = \sin x`), " makes the shape obvious:"]),
  math(String.raw`2u^2 + u - 1 = 0 \;\Longrightarrow\; (2u - 1)(u + 1) = 0`),
  math(String.raw`u = \tfrac{1}{2} \quad\text{or}\quad u = -1`),
  h3("Step 2 — go back to x, and find EVERY solution"),
  mp([im(String.raw`\sin x = \tfrac{1}{2}`), " has two solutions in range — the unit circle shows why: sine is positive in the first and second quadrants."]),
  math(String.raw`\sin x = \tfrac{1}{2} \;\Longrightarrow\; x = \tfrac{\pi}{6},\ \tfrac{5\pi}{6}`),
  mp([im(String.raw`\sin x = -1`), " happens at only one place — the bottom of the circle."]),
  math(String.raw`\sin x = -1 \;\Longrightarrow\; x = \tfrac{3\pi}{2}`),
  mp(["Three solutions: ", im(String.raw`x = \tfrac{\pi}{6},\ \tfrac{5\pi}{6},\ \tfrac{3\pi}{2}`), "."]),
  p("The marks here are lost at step 2, not step 1. Students solve the quadratic perfectly, write x = π/6, and stop — losing two-thirds of the answer. The unit circle is what stops that: it shows you at a glance how many places a given sine value occurs."),

  h2("How to prove an identity (the part nobody explains)"),
  p("\"Prove that this equals that\" is the question type students find most unnerving, because there is no number at the end to check yourself against. It feels like you either see it or you don't. You don't — there is a procedure, and it is short."),
  h3("The rules of the game"),
  li("Work on ONE side only. Do not do the same operation to both sides — that assumes the thing you are trying to prove, and loses marks even when the algebra is right."),
  li("Start from the messier side. It has more to cancel, and you cannot simplify your way INTO complexity."),
  li("Rewrite tan, cot, sec and csc in terms of sin and cos. This alone finishes a surprising number of them."),
  mli(["Look for ", im(String.raw`\sin^2\theta + \cos^2\theta`), " hiding in any form — ", im(String.raw`1 - \cos^2\theta`), " and ", im(String.raw`1 - \sin^2\theta`), " are the same identity in disguise."]),
  li("Stop when the side you are working on looks like the other one. You do not need to meet in the middle."),
  h3("Worked example: prove sec θ − cos θ = sin θ · tan θ"),
  p("The left side is messier, so start there. Rewrite sec in terms of cos:"),
  math(String.raw`\sec\theta - \cos\theta = \frac{1}{\cos\theta} - \cos\theta = \frac{1 - \cos^2\theta}{\cos\theta}`),
  mp(["Now the Pythagorean identity appears — ", im(String.raw`1 - \cos^2\theta = \sin^2\theta`), ":"]),
  math(String.raw`= \frac{\sin^2\theta}{\cos\theta} = \sin\theta \cdot \frac{\sin\theta}{\cos\theta} = \sin\theta\tan\theta \quad \checkmark`),
  p("Three moves: rewrite the reciprocal function, combine over a common denominator, spot the Pythagorean identity. That is the same three moves as almost every proof in this unit — which is why it is a procedure rather than an inspiration."),

  h2("Restricted domains, and why the question always states one"),
  mp(["Every solving question gives you a domain — usually ", im(String.raw`0 \le x < 2\pi`), " — and it is not decoration. Trig functions repeat forever, so without a domain almost every equation has infinitely many solutions."]),
  math(String.raw`\sin x = \tfrac{1}{2} \;\Longrightarrow\; x = \tfrac{\pi}{6} + 2\pi n \quad\text{or}\quad x = \tfrac{5\pi}{6} + 2\pi n, \quad n \in \mathbb{Z}`),
  mp(["That is the general solution. The domain is what cuts it down to the two answers the question wants. So two habits are worth building: write the domain at the top of your working, and check every solution against it before you write your final line. Students lose marks in both directions here — keeping an answer outside the range, and missing one inside it."]),

  h2("Where marks actually go"),
  mli(["Giving one solution when the circle has two — the most expensive habit in this unit, and ", im(String.raw`\sin x = \tfrac{1}{2}`), " is where it shows"]),
  li("Memorising the three cos 2θ forms as separate facts instead of one convertible identity"),
  mli(["Cancelling before substituting — ", im(String.raw`1 - \cos^2\theta`), " is a target, not an obstacle"]),
  li("Ignoring the stated domain, then keeping solutions outside it"),
  li("Forgetting the identities are only recoverable if you know they come from a triangle"),

  h2("Practice problems"),
  mp([span("1. Solve ", ["strong"]), im(String.raw`2\cos^2 x - 3\cos x + 1 = 0`), span(" for ", ["strong"]), im(String.raw`0 \le x < 2\pi`), span(".", ["strong"])]),
  mp([span("2. Prove that ", ["strong"]), im(String.raw`\tan\theta \cdot \cos\theta = \sin\theta`), span(".", ["strong"])]),
  mp([span("3. Simplify ", ["strong"]), im(String.raw`\dfrac{\sin 2\theta}{2\sin\theta}`), span(".", ["strong"])]),

  h2("Solutions"),
  h3("1. The quadratic-in-disguise again"),
  math(String.raw`2u^2 - 3u + 1 = 0 \;\Longrightarrow\; (2u - 1)(u - 1) = 0 \;\Longrightarrow\; u = \tfrac{1}{2},\ 1`),
  mp([im(String.raw`\cos x = \tfrac{1}{2}`), " gives two solutions (cosine is positive in quadrants one and four); ", im(String.raw`\cos x = 1`), " gives one, at the far right of the circle."]),
  math(String.raw`x = \tfrac{\pi}{3},\ \tfrac{5\pi}{3} \qquad x = 0`),
  mp(["Three solutions: ", im(String.raw`x = 0,\ \tfrac{\pi}{3},\ \tfrac{5\pi}{3}`), ". Check ", im(String.raw`x = 0`), ": ", im(String.raw`2(1)^2 - 3(1) + 1 = 0`), ". ✓"]),
  h3("2. Start from the definition"),
  math(String.raw`\tan\theta = \frac{\sin\theta}{\cos\theta} \;\Longrightarrow\; \tan\theta \cdot \cos\theta = \frac{\sin\theta}{\cos\theta} \cdot \cos\theta = \sin\theta`),
  p("Nearly every 'prove this identity' question opens the same way: rewrite tan, sec, csc and cot in terms of sin and cos, then simplify. It is not a trick — it is the only move, and it works almost every time."),
  h3("3. Use the double angle"),
  math(String.raw`\frac{\sin 2\theta}{2\sin\theta} = \frac{2\sin\theta\cos\theta}{2\sin\theta} = \cos\theta`),

  h2("Why this unit matters later"),
  linked(["Trig identities are not a Pre-Calculus 12 hurdle you clear and forget. They reappear immediately in ", { text: "Calculus 12", href: "/calculus-12-tutor-burnaby" }, ", where half the integration techniques depend on rewriting an expression with one, and again in first-year physics wherever a wave or an oscillation shows up. Time spent understanding them now is repaid twice."]),
  linked(["If the final is close and this unit is shaky, that is a fixable and specific problem — our ", { text: "Pre-Calculus 12 final exam review", href: "/pre-calculus-12-final-exam-review" }, " targets the units that cost the most marks."]),

  h2("Getting help with Pre-Calculus 12 trigonometry"),
  linked(["If you are memorising identities and still losing marks, the issue is almost never effort — it is that nobody showed you the triangle underneath. That is a quick thing to fix in person and hard to fix from a textbook. Our ", { text: "one-on-one Pre-Calculus 12 help in Burnaby", href: "/pre-calculus-12-tutor-burnaby" }, " works exactly here."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test — we will show you where the marks are going."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 566)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.includes("#")) { console.error("  ✗ placeholder '#' link found — fix it."); process.exit(1); }

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ post not found"); process.exit(1); }
  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ upgraded (live — this post was already published)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
