/**
 * Flagship article: "What UBC Calculus Students Should Review Before Their
 * First Midterm".
 *
 * DRAFT with reviewedByExpert = false. All derivatives/limits verified
 * numerically in scripts/verify-flagship-math.mjs; LaTeX KaTeX-checked here.
 *
 * Deliberately avoids claiming specifics about UBC course structure (exam
 * weightings, section numbers) that would be invented.
 *
 *   Preview:  node --env-file=.env.local scripts/create-flagship-ubc-calculus.mjs
 *   Apply:    node --env-file=.env.local scripts/create-flagship-ubc-calculus.mjs --commit
 */
import { createArticle, commit, p, h2, h3, li, num, math, im, mp, mli, linked, span } from "./flagship-lib.mjs";

const body = [
  p("Most students who struggle with their first university calculus midterm do not struggle with calculus. They struggle with the algebra underneath it, at a speed that never allowed for hesitation."),
  p("That is an uncomfortable thing to hear a few weeks into first year, and it is also good news, because it points at something fixable. The chain rule is not the problem. Simplifying the expression the chain rule produced, quickly and without error, usually is."),
  linked(["Here is what is worth reviewing before the first midterm, why each item matters, and worked examples with the reasoning shown. If you would rather work through it with someone, our ", { text: "university math tutoring", href: "/university-math-tutor-vancouver" }, " is aimed at precisely this transition."]),

  h2("What first-year calculus actually assumes"),
  p("The course teaches limits, derivatives and their applications. It assumes — without ever saying so — that you can already:"),
  li("Manipulate exponents and radicals without stopping to think"),
  li("Factor quickly, including differences of squares and cubes"),
  li("Handle trigonometric identities and exact values from memory"),
  li("Rearrange an equation with several symbols and no numbers in it"),
  li("Work fluently with logarithms and exponentials"),
  p("None of that is calculus. All of it is Pre-Calculus 12, and it is the layer where midterm marks are actually lost. The calculus step is often a single line; the four lines of algebra afterwards are where the answer dies."),

  h2("Limits: know why, not just how"),
  p("Early limit questions look trivial and are not, because they are testing whether you know what a limit means."),
  math(String.raw`\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = \lim_{x \to 2} \frac{(x-2)(x+2)}{x-2} = \lim_{x \to 2} (x + 2) = 4`),
  mp(["The cancellation is legal precisely because ", im(String.raw`x \to 2`), " means ", im(String.raw`x`), " approaches 2 without ever equalling it — so ", im(String.raw`x - 2 \neq 0`), " and dividing is allowed."]),
  mp(["Note that the function is undefined at ", im(String.raw`x = 2`), " and the limit still exists and equals 4. A limit describes where a function is heading, not where it arrives. Students who never internalise that distinction find continuity, and later the definition of the derivative, permanently mysterious."]),

  h2("The chain rule: the one that decides your grade"),
  p("More marks turn on the chain rule than on anything else in the first half of the course, because it appears inside almost every other rule."),
  math(String.raw`\frac{d}{dx}\sin(x^2) = \cos(x^2) \cdot 2x = 2x\cos(x^2)`),
  p("Say it out loud as you work: derivative of the outside, leaving the inside alone, times the derivative of the inside. The common failure is stopping halfway — writing cos(x²) and forgetting the 2x."),
  h3("Combined with the product rule"),
  math(String.raw`\frac{d}{dx}\left[x^2 e^{3x}\right] = 2x\,e^{3x} + x^2 \cdot 3e^{3x} = e^{3x}\left(2x + 3x^2\right)`),
  p("Two things happened there. The product rule ran, the chain rule ran inside its second term, and then — the step students skip — the result was factored. On a midterm, an unsimplified answer costs marks and makes the next part of the question harder than it needs to be."),

  h2("Related rates: a modelling problem in disguise"),
  p("Related rates questions are where students who have been coping by pattern-matching stop coping, because no two look alike. The calculus is easy; setting it up is not."),
  h3("Worked example: the sliding ladder"),
  mp(["A 5 m ladder leans against a wall. The bottom slides away at ", im(String.raw`0.5\ \mathrm{m/s}`), ". How fast is the top descending when the bottom is 3 m from the wall?"]),
  p("Start with the relationship that is always true — not at one instant, but at every instant. That is the whole trick:"),
  math(String.raw`x^2 + y^2 = 25`),
  p("Differentiate both sides with respect to time. Every variable gets a chain-rule factor, because everything is moving:"),
  math(String.raw`2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0`),
  mp(["Only now substitute the instant you care about. When ", im(String.raw`x = 3`), ", the 3–4–5 triangle gives ", im(String.raw`y = 4`), ":"]),
  math(String.raw`\frac{dy}{dt} = -\frac{x}{y}\cdot\frac{dx}{dt} = -\frac{3}{4}(0.5) = -0.375\ \mathrm{m/s}`),
  p("The top descends at 0.375 m/s. The negative sign is not decoration — it is the physics, saying y decreases as x grows."),
  p("The mistake that ruins these: substituting x = 3 before differentiating. Do that and x becomes a constant, its derivative is zero, and the equation collapses into nonsense. Differentiate the general relationship first; substitute the instant last."),

  h2("What to review, in priority order"),
  num("Algebra speed — factoring, exponents, radicals. Not because it is hard, but because slow algebra is what runs you out of time."),
  num("The chain rule until it is automatic, including nested inside the product and quotient rules."),
  num("Exact trig values and the identities. Looking them up mid-question breaks your train of thought."),
  num("Logarithm and exponential rules, especially for implicit and logarithmic differentiation."),
  num("Related rates setup — practise writing the relationship before touching the numbers."),

  h2("A note on how to practise"),
  p("Reading worked solutions feels productive and mostly is not. It builds recognition, which vanishes under exam conditions, rather than recall, which does not."),
  p("The more useful test: do a problem, then close the book and do it again from scratch. If the second attempt stalls, you had recognised the solution rather than learned it. That distinction is worth more than another twenty problems skimmed."),

  h2("Why first year feels so much faster"),
  p("It is not an illusion. A high-school course spreads a topic over a week with practice built in; a university course may spend one lecture on it and expect fluency by the problem set. Nothing is retaught, and the pace does not pause for anyone."),
  linked(["That is why gaps compound so quietly here. A shaky week in September does not announce itself — it surfaces in October on a question that assumed you had closed it. The same pattern shows up in ", { text: "first-year physics", href: "/university-physics-tutor-vancouver" }, ", for the same structural reason."]),

  h2("Getting help before the midterm"),
  linked(["If the calculus makes sense in lecture but falls apart on the problem set, the gap is almost always in the algebra layer underneath — and that is quick to diagnose and quick to fix, which is exactly what ", { text: "one-on-one university math support", href: "/university-math-tutor-vancouver" }, " is good for."]),
  linked(["We work with UBC and SFU students online and in person at our Burnaby centre. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and we will find out whether it is the calculus or the algebra — it is usually the algebra."]),
];

createArticle({
  slug: "what-ubc-calculus-students-should-review-before-first-midterm",
  title: "What UBC Calculus Students Should Review Before Their First Midterm",
  excerpt:
    "Most first-midterm trouble is not calculus — it is the algebra underneath it, at speed. What to review, why it matters, and worked examples with the reasoning shown.",
  metaTitle: "UBC Calculus: What to Review Before Your First Midterm",
  metaDescription:
    "First-year calculus at UBC: why the algebra underneath costs more marks than the calculus, with worked examples on limits, the chain rule and related rates.",
  body,
})
  .then((ok) => { if (!ok && commit) process.exitCode = 1; })
  .catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
