/**
 * Article 2 of the batch: "Calculus, Limits & Derivatives" (557 -> 1,500+).
 *
 * Maths verified numerically first (scripts/verify-calculus-math.mjs) and every
 * equation KaTeX-checked here — the script refuses to write broken maths or a
 * placeholder link.
 *
 * The SVG shows secants collapsing onto the tangent, which is the one idea the
 * whole course rests on and the one a static textbook diagram cannot convey.
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-calculus-limits.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-calculus-limits.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, li, math, im, mp, mli, linked, span } from "./flagship-lib.mjs";

const SLUG = "mathematics-calculus-limits-derivatives";

/* Verified points on y = x^2 : (1,1) (2,4) (3,9) (4,16).
   Plot maps x in [0,4.4] and y in [0,17] onto a 360x300 box. */
const X = (x) => 40 + x * 72;
const Y = (y) => 270 - y * 14.5;
const tangentSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 380 300" role="img" aria-label="Graph of y equals x squared showing three secant lines through the point (3,9) becoming closer to the tangent line as the second point approaches x equals 3" style="width:100%;max-width:380px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(4.4)}" y2="${Y(0)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(17)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <text x="${X(4.3)}" y="${Y(0) + 16}" font-size="11" fill="#64748B">x</text>
    <text x="${X(0) - 16}" y="${Y(16.6)}" font-size="11" fill="#64748B">y</text>
    <!-- the parabola y = x^2 -->
    <path d="M ${X(0)} ${Y(0)} Q ${X(2)} ${Y(0)}, ${X(4)} ${Y(16)}" fill="none" stroke="#3A5A98" stroke-width="2.5"/>
    <text x="${X(3.5)}" y="${Y(14)}" font-size="12" fill="#3A5A98">y = x²</text>
    <!-- secant P(3,9) -> (4,16): slope 7 -->
    <line x1="${X(2.2)}" y1="${Y(3.4)}" x2="${X(4.3)}" y2="${Y(18.1)}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="5 4"/>
    <circle cx="${X(4)}" cy="${Y(16)}" r="4" fill="#94A3B8"/>
    <text x="${X(4) + 6}" y="${Y(16) + 4}" font-size="10" fill="#64748B">h=1 · slope 7</text>
    <!-- secant P(3,9) -> (3.5,12.25): slope 6.5 -->
    <line x1="${X(2.2)}" y1="${Y(3.8)}" x2="${X(4.2)}" y2="${Y(16.8)}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="5 4"/>
    <circle cx="${X(3.5)}" cy="${Y(12.25)}" r="4" fill="#94A3B8"/>
    <!-- the tangent at x=3 : y = 6x - 9 -->
    <line x1="${X(1.6)}" y1="${Y(0.6)}" x2="${X(4.2)}" y2="${Y(16.2)}" stroke="#F4E98B" stroke-width="3"/>
    <circle cx="${X(3)}" cy="${Y(9)}" r="5" fill="#3A5A98"/>
    <text x="${X(3) - 52}" y="${Y(9) - 8}" font-size="11" fill="#1F2937" font-weight="600">P(3, 9)</text>
    <text x="${X(1.1)}" y="${Y(2.4)}" font-size="11" fill="#8a7b1f" font-weight="600">tangent</text>
    <text x="${X(1.1)}" y="${Y(1.2)}" font-size="11" fill="#8a7b1f">slope 6</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Each dashed secant joins P(3,9) to a second point on the curve. As that point slides toward P,
    the secant slopes fall 7 → 6.5 → 6.1 → 6.01 … and settle on the tangent's slope of 6.
    That settling <em>is</em> the derivative.
  </figcaption>
</figure>`;

const body = [
  p("Calculus has a reputation for being the hard one, and it is the wrong reputation. The mechanics of differentiating are easier than most of Pre-Calculus 12 — the power rule takes about a minute to learn."),
  p("What is genuinely hard is the first idea: the limit. Everything in the course is built on it, most students never quite get it, and they compensate by memorising rules. That works for a term, right up until a question asks what a derivative means rather than what it equals."),
  linked(["This guide does the idea first and the rules second, which is the order that makes them stick. If you would rather work through it with someone, our ", { text: "Calculus 12 tutoring", href: "/calculus-12-tutor-burnaby" }, " starts in exactly this place."]),

  h2("A limit is about approaching, not arriving"),
  p("Here is the question that unlocks the course. Consider:"),
  math(String.raw`\lim_{x \to 2} \frac{x^2 - 4}{x - 2}`),
  mp(["Substitute ", im(String.raw`x = 2`), " and you get ", im(String.raw`\tfrac{0}{0}`), " — undefined. The function does not exist at ", im(String.raw`x = 2`), ". And yet the limit exists, and equals 4."]),
  math(String.raw`\lim_{x \to 2} \frac{(x-2)(x+2)}{x-2} = \lim_{x \to 2} (x + 2) = 4`),
  mp(["The cancellation is legal for one reason worth stating precisely: ", im(String.raw`x \to 2`), " means ", im(String.raw`x`), " gets arbitrarily close to 2 ", span("without ever equalling it", ["strong"]), ". So ", im(String.raw`x - 2 \neq 0`), ", and dividing by it is allowed."]),
  p("Sit with what that says. The function has a hole at x = 2 — it genuinely has no value there. But everywhere nearby it behaves exactly like x + 2, so as you close in on 2 from either side, the outputs close in on 4. A limit describes where a function is heading, not where it arrives, and those are different questions."),
  p("Students who never separate those two questions find continuity mysterious, then the derivative impossible — because the derivative is a limit at a point where substitution gives 0/0, every single time."),

  h2("The derivative is one picture"),
  p("Forget the formula for a moment. The problem the derivative solves is this: how steep is a curve at a single point?"),
  p("That question is awkward. Slope needs two points — rise over run. One point gives you nothing to divide. So we cheat: take a second point nearby, find the slope of the line through both (a secant), then slide the second point closer and closer and watch what the slope does."),
  tangentSvgBlock(),
  p("The dashed lines are secants through P(3, 9). Watch their slopes as the second point approaches P:"),
  mli([im(String.raw`h = 1`), " — second point (4, 16), slope ", im(String.raw`\tfrac{16-9}{1} = 7`)]),
  mli([im(String.raw`h = 0.5`), " — slope ", im(String.raw`6.5`)]),
  mli([im(String.raw`h = 0.1`), " — slope ", im(String.raw`6.1`)]),
  mli([im(String.raw`h = 0.01`), " — slope ", im(String.raw`6.01`)]),
  p("The slopes are not wandering. They are settling on 6 — and 6 is the slope of the tangent at P. That settling is the derivative, and the limit is the machinery that makes \"settling\" precise:"),
  math(String.raw`f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}`),
  mp(["Read it as the picture, not as symbols: ", im(String.raw`f(x+h) - f(x)`), " is the rise, ", im(String.raw`h`), " is the run, and ", im(String.raw`h \to 0`), " is the second point sliding into the first."]),
  p("And notice why this needs a limit at all: at h = 0 exactly, the fraction is 0/0. The one value you actually want is the one value you cannot substitute. That is not a technicality — it is the reason limits exist."),

  h2("Worked example: the derivative from first principles"),
  mp(["Find ", im(String.raw`f'(x)`), " for ", im(String.raw`f(x) = x^2`), " using the definition."]),
  math(String.raw`f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h}`),
  h3("Expand the top"),
  math(String.raw`(x+h)^2 - x^2 = x^2 + 2xh + h^2 - x^2 = 2xh + h^2`),
  h3("Divide — and here is why it works"),
  math(String.raw`\frac{2xh + h^2}{h} = \frac{h(2x + h)}{h} = 2x + h`),
  mp(["That cancellation is only legal because ", im(String.raw`h \neq 0`), " — we are approaching zero, not sitting on it. It is the same move as the first example, and it is the move the whole technique depends on."]),
  h3("Now take the limit"),
  math(String.raw`f'(x) = \lim_{h \to 0} (2x + h) = 2x`),
  mp(["At ", im(String.raw`x = 3`), ": ", im(String.raw`f'(3) = 6`), " — exactly the number the secants were settling on. The picture and the algebra agree, which is the point of doing it once by hand."]),
  p("You will use the power rule from here on and never do this again. Do it once anyway. The rule is a shortcut for this process, and a student who has seen the process knows what the shortcut is short for."),

  h2("The tangent line, and what the question is really asking"),
  mp(["\"Find the equation of the tangent to ", im(String.raw`y = x^2`), " at ", im(String.raw`x = 3`), "\" is two questions wearing one coat."]),
  li("A slope question — which is calculus, and takes one line"),
  li("A straight-line question — which is Grade 9, and is where the marks are lost"),
  math(String.raw`\text{slope} = f'(3) = 2(3) = 6 \qquad \text{point} = (3,\ f(3)) = (3,\ 9)`),
  math(String.raw`y - 9 = 6(x - 3) \;\Longrightarrow\; y = 6x - 9`),
  mp(["Check it: at ", im(String.raw`x = 3`), ", ", im(String.raw`y = 6(3) - 9 = 9`), ". ✓ The line touches the curve at P, as it must."]),
  p("The classic error is giving 6 as the answer. The question asked for an equation; 6 is a slope. Read what was asked."),

  h2("The rules, and what each is for"),
  p("Once the idea is in place, the rules are quick — but knowing which to reach for is the skill:"),
  math(String.raw`\frac{d}{dx}x^n = nx^{n-1} \qquad \text{(power rule)}`),
  math(String.raw`\frac{d}{dx}\bigl[u \cdot v\bigr] = u'v + uv' \qquad \text{(product rule)}`),
  math(String.raw`\frac{d}{dx}\left[\frac{u}{v}\right] = \frac{u'v - uv'}{v^2} \qquad \text{(quotient rule)}`),
  math(String.raw`\frac{d}{dx}f\bigl(g(x)\bigr) = f'\bigl(g(x)\bigr)\cdot g'(x) \qquad \text{(chain rule)}`),
  h3("The chain rule decides your grade"),
  p("More marks turn on the chain rule than on anything else, because it hides inside every other rule."),
  math(String.raw`\frac{d}{dx}\sin(x^2) = \cos(x^2)\cdot 2x = 2x\cos(x^2)`),
  p("Say it as you write: derivative of the outside, leaving the inside alone, times the derivative of the inside. The universal failure is stopping halfway — writing cos(x²) and forgetting the 2x."),
  h3("Rules inside rules"),
  math(String.raw`\frac{d}{dx}\left[x^2 e^{3x}\right] = 2x\,e^{3x} + x^2\cdot 3e^{3x} = e^{3x}\left(2x + 3x^2\right)`),
  p("The product rule ran, the chain rule ran inside its second term, and then — the step students skip — the answer was factored. On an exam an unsimplified answer costs marks and makes the next part harder than it needs to be."),

  h2("What a derivative means when it isn't a graph"),
  p("The tangent picture is how the derivative is taught, and it quietly limits students — because exam questions rarely mention tangents. They ask about rates."),
  mp(["A derivative is a rate of change: how fast one quantity changes as another does. The tangent slope is that idea drawn for the special case where the two quantities are ", im(String.raw`y`), " and ", im(String.raw`x`), ". Change the letters and the same derivative answers a different question."]),
  mli(["If ", im(String.raw`s(t)`), " is position at time ", im(String.raw`t`), ", then ", im(String.raw`s'(t)`), " is velocity — how fast position changes"]),
  mli(["Differentiate again and ", im(String.raw`s''(t)`), " is acceleration — how fast velocity changes"]),
  mli(["If ", im(String.raw`C(x)`), " is the cost of making ", im(String.raw`x`), " items, ", im(String.raw`C'(x)`), " is the cost of making one more"]),
  mli(["If ", im(String.raw`V(t)`), " is the volume of a balloon, ", im(String.raw`V'(t)`), " is how fast it is inflating"]),
  p("This is why calculus escaped mathematics and took over physics, economics and engineering. It is not a technique for finding tangents — it is the mathematics of things changing, and the tangent is simply the easiest instance to draw."),
  p("It also explains a question type that ambushes students: \"what does f'(3) = 6 mean in this context?\" There is no algebra to do. The answer is a sentence — at x = 3, the quantity is increasing at 6 units per unit of x — and students who only ever saw slopes have nothing to write."),

  h2("Notation, and why there are two of them"),
  p("Two notations appear for the same thing, and nobody explains why:"),
  math(String.raw`f'(x) \qquad \text{and} \qquad \frac{dy}{dx}`),
  mp(["They mean the same derivative. ", im(String.raw`f'(x)`), " is compact and reads well when you are differentiating a named function. ", im(String.raw`\tfrac{dy}{dx}`), " keeps both variables visible, which matters the moment there are more than two things changing."]),
  mp(["That second form earns its keep in related rates, where you will write ", im(String.raw`\tfrac{dV}{dt}`), " and ", im(String.raw`\tfrac{dr}{dt}`), " in the same line and need to see at a glance what is changing with respect to what. It is worth being fluent in both now, because the course switches between them without warning."]),
  mp(["Read ", im(String.raw`\tfrac{dy}{dx}`), " as \"the rate at which y changes as x changes\" rather than as a fraction. It is not a fraction — though it behaves enough like one that the chain rule looks like cancelling, which is a useful coincidence and a dangerous habit."]),

  h2("Where marks actually go"),
  li("Treating a limit as \"substitute and see\" — it works until 0/0, which is exactly when it matters"),
  mli(["Stopping the chain rule halfway: ", im(String.raw`\cos(x^2)`), " instead of ", im(String.raw`2x\cos(x^2)`)]),
  li("Answering a tangent-line question with a slope"),
  li("Leaving the answer unsimplified, then fighting it in part (b)"),
  li("Memorising the rules without once doing a derivative from the definition — so when a question asks what f'(3) means, there is nothing to say"),

  h2("Practice problems"),
  mp([span("1. Differentiate ", ["strong"]), im(String.raw`f(x) = (3x^2 + 1)^5`), span(".", ["strong"])]),
  mp([span("2. Evaluate ", ["strong"]), im(String.raw`\lim_{x \to 3} \dfrac{x^2 - 9}{x - 3}`), span(".", ["strong"])]),
  mp([span("3. Find the equation of the tangent to ", ["strong"]), im(String.raw`y = x^2`), span(" at ", ["strong"]), im(String.raw`x = -1`), span(".", ["strong"])]),

  h2("Solutions"),
  h3("1. Chain rule"),
  mp(["Outside is ", im(String.raw`(\;\cdot\;)^5`), ", inside is ", im(String.raw`3x^2 + 1`), "."]),
  math(String.raw`f'(x) = 5(3x^2+1)^4 \cdot 6x = 30x(3x^2+1)^4`),
  p("The 6x is the whole question. Leave it out and you have written the outside derivative and stopped."),
  h3("2. Factor, then cancel"),
  math(String.raw`\lim_{x \to 3} \frac{(x-3)(x+3)}{x-3} = \lim_{x \to 3} (x+3) = 6`),
  mp(["Same shape as the opening example: ", im(String.raw`\tfrac{0}{0}`), " on substitution, a factor that cancels because ", im(String.raw`x \neq 3`), ", and a limit that exists even though the function does not."]),
  h3("3. Slope, point, line"),
  math(String.raw`f'(-1) = 2(-1) = -2 \qquad f(-1) = 1 \;\Longrightarrow\; \text{point } (-1,\ 1)`),
  math(String.raw`y - 1 = -2(x + 1) \;\Longrightarrow\; y = -2x - 1`),
  mp(["Check: at ", im(String.raw`x = -1`), ", ", im(String.raw`y = -2(-1) - 1 = 1`), ". ✓ The negative slope is worth a glance — the parabola is falling at ", im(String.raw`x = -1`), ", so it should be."]),

  h2("Why this matters beyond the grade"),
  linked(["Calculus 12 is the prerequisite for first-year calculus at UBC and SFU, and those courses do not revisit it — they assume it and move faster. Every idea above reappears there within weeks, and the students who struggle are almost never struggling with calculus: they are struggling with the algebra underneath it, at speed. We wrote about that in ", { text: "what UBC calculus students should review before their first midterm", href: "/blog/what-ubc-calculus-students-should-review-before-first-midterm" }, "."]),
  linked(["It also runs straight back into ", { text: "Pre-Calculus 12", href: "/pre-calculus-12-tutor-burnaby" }, " — factoring, trig identities and function notation are the tools every derivative question is actually testing."]),

  h2("Getting help with Calculus 12"),
  linked(["If the rules make sense but the questions do not, the gap is usually the first idea rather than the mechanics — and that is a fast thing to fix in person and a slow thing to fix from a textbook. Our ", { text: "one-on-one Calculus 12 help", href: "/calculus-12-tutor-burnaby" }, " starts by finding out which of the two it is."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test."]),
];

function tangentSvgBlock() { return { _type: "htmlBlock", _key: key(), html: tangentSvg }; }

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 557)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }
  if (words < 1500) console.log(`  ! under the 1,500-word floor by ${1500 - words}`);

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ post not found"); process.exit(1); }
  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ upgraded (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
