/**
 * Create the flagship article: "7 Common Pre-Calculus 12 Mistakes Burnaby
 * Students Make".
 *
 * Created as a DRAFT, with reviewedByExpert = false. Dr. Shreyank corrects the
 * mistakes to match what he actually sees, then publishes and ticks "Reviewed
 * by Dr. Shreyank" — only then does his name appear on it.
 *
 * The seven mistakes are well-documented errors in this course, not invented
 * session anecdotes. Every worked example has been checked by substitution.
 *
 * Usage:
 *   Preview:  node --env-file=.env.local scripts/create-flagship-precalc.mjs
 *   Apply:    node --env-file=.env.local scripts/create-flagship-precalc.mjs --commit
 */

import { createClient } from "@sanity/client";
import katex from "katex";
import { randomUUID } from "node:crypto";

const commit = process.argv.includes("--commit");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("✗ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const blk = (style, children, markDefs = []) => ({ _type: "block", _key: key(), style, markDefs, children });
const p = (t) => blk("normal", [span(t)]);
const h2 = (t) => blk("h2", [span(t)]);
const h3 = (t) => blk("h3", [span(t)]);
const strong = (t) => blk("normal", [span(t, ["strong"])]);
const li = (t) => ({ ...blk("normal", [span(t)]), listItem: "bullet", level: 1 });
/** Display equation (KaTeX). Write plain LaTeX, no delimiters. */
const math = (latex) => ({ _type: "mathBlock", _key: key(), latex });
/** Inline equation inside a sentence. */
const im = (latex) => ({ _type: "mathInline", _key: key(), latex });
/** Paragraph mixing text and inline equations: parts are strings or im(). */
const mp = (parts) =>
  blk("normal", parts.map((x) => (typeof x === "string" ? span(x) : x)));

/** Paragraph with links: parts are strings or {text, href}. */
const linked = (parts) => {
  const markDefs = [], children = [];
  for (const part of parts) {
    if (typeof part === "string") children.push(span(part));
    else {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: part.href });
      children.push(span(part.text, [k]));
    }
  }
  return blk("normal", children, markDefs);
};

const SLUG = "common-pre-calculus-12-mistakes-burnaby";
const TITLE = "7 Common Pre-Calculus 12 Mistakes Burnaby Students Make";
const EXCERPT =
  "The seven errors that cost the most marks in Pre-Calculus 12 — each with a worked example showing exactly where the reasoning breaks, plus practice problems and solutions.";

const body = [
  p("Pre-Calculus 12 is not a harder version of Pre-Calculus 11. It is the course where the marks stop coming from doing the algebra correctly and start coming from deciding what the algebra means — and that shift catches out students who have never had to think about it before."),
  p("What follows are seven errors that reliably cost marks in this course. None of them are signs of a weak student. Almost all of them are the result of a rule being learned as a procedure rather than as an idea, which works right up until the question is phrased in an unfamiliar way."),
  linked(["Each one comes with a worked example showing exactly where the reasoning breaks. If any of them look familiar, they are the fastest things to fix — and they are the kind of thing ", { text: "one-on-one Pre-Calculus 12 help", href: "/pre-calculus-12-tutor-burnaby" }, " is well suited to, because a tutor can see the wrong step as it happens rather than in red pen a week later."]),

  h2("1. Reading a horizontal transformation without factoring first"),
  mp(["Given ", im(String.raw`y = f(2x - 6)`), ", the most common answer is \"shift right 6\". It is wrong, and it is wrong in a way that looks right."]),
  strong("The fix: factor the coefficient out of the bracket first."),
  math(String.raw`y = f(2x - 6) = f\bigl(2(x - 3)\bigr)`),
  mp(["That is a horizontal compression by a factor of ", im(String.raw`\tfrac{1}{2}`), " and a shift right ", im(String.raw`3`), " — not ", im(String.raw`6`), "."]),
  h3("Worked example"),
  mp(["Take ", im(String.raw`f(x) = x^2`), ", so ", im(String.raw`y = (2x-6)^2`), ". The vertex sits where the bracket is zero:"]),
  math(String.raw`2x - 6 = 0 \;\Longrightarrow\; x = 3`),
  mp(["The vertex has moved from ", im(String.raw`(0,0)`), " to ", im(String.raw`(3,0)`), " — a shift of 3, not 6."]),
  p("This is worth sitting with, because the reason is not obvious: the compression happens to the shift as well. Shifting right 6 and then compressing by 1/2 lands you at 3. Both descriptions reach the same graph; only one of them gives the right number when the question asks how far the graph moved."),

  h2("2. Splitting a logarithm across addition"),
  mp([im(String.raw`\log(a+b)`), " is not ", im(String.raw`\log a + \log b`), ". The law is about multiplication:"]),
  math(String.raw`\log(ab) = \log a + \log b`),
  h3("Worked example"),
  p("Test it with numbers that are easy to check:"),
  math(String.raw`\log_2(8 + 8) = \log_2 16 = 4`),
  math(String.raw`\log_2 8 + \log_2 8 = 3 + 3 = 6`),
  mp(["Since ", im(String.raw`4 \neq 6`), ", the two expressions are not the same thing. Whenever a log law feels uncertain, substituting powers of 2 settles it in about ten seconds — a habit worth having in an exam."]),

  h2("3. Solving a log equation without checking the domain"),
  p("Log equations produce solutions that satisfy the algebra but not the original equation. They are not optional to check; the check is part of the question."),
  h3("Worked example"),
  mp(["Solve ", im(String.raw`\log_2(x) + \log_2(x-2) = 3`), "."]),
  math(String.raw`\log_2\bigl(x(x-2)\bigr) = 3 \;\Longrightarrow\; x(x-2) = 2^3 = 8`),
  math(String.raw`x^2 - 2x - 8 = 0 \;\Longrightarrow\; (x-4)(x+2) = 0`),
  mp(["The algebra gives ", im(String.raw`x = 4`), " and ", im(String.raw`x = -2`), ". Now the part that carries the marks: ", im(String.raw`\log_2(x)`), " needs ", im(String.raw`x > 0`), ", and ", im(String.raw`\log_2(x-2)`), " needs ", im(String.raw`x > 2`), ". So the domain is ", im(String.raw`x > 2`), ", and ", im(String.raw`x = -2`), " is rejected — you cannot take the log of a negative number."]),
  math(String.raw`\text{Check } x=4:\quad \log_2 4 + \log_2 2 = 2 + 1 = 3 \quad \checkmark`),
  mp(["The answer is ", im(String.raw`x = 4`), " only."]),

  h2("4. Dividing by a trig function — and deleting solutions"),
  p("This one is costly because the work looks clean and the answer looks finished. Dividing both sides by sin x quietly assumes sin x ≠ 0, and throws away every solution where it is."),
  h3("Worked example"),
  mp(["Solve ", im(String.raw`2\sin x \cos x = \sin x`), " for ", im(String.raw`0 \le x < 2\pi`), "."]),
  strong("The tempting route — divide by sin x:"),
  math(String.raw`2\cos x = 1 \;\Longrightarrow\; \cos x = \tfrac{1}{2} \;\Longrightarrow\; x = \tfrac{\pi}{3},\ \tfrac{5\pi}{3}`),
  strong("The correct route — move everything to one side and factor:"),
  math(String.raw`2\sin x \cos x - \sin x = 0 \;\Longrightarrow\; \sin x\,(2\cos x - 1) = 0`),
  math(String.raw`\sin x = 0 \;\Longrightarrow\; x = 0,\ \pi \qquad \cos x = \tfrac{1}{2} \;\Longrightarrow\; x = \tfrac{\pi}{3},\ \tfrac{5\pi}{3}`),
  mp(["There are four solutions: ", im(String.raw`0,\ \tfrac{\pi}{3},\ \pi,\ \tfrac{5\pi}{3}`), ". Dividing deleted ", im(String.raw`x = 0`), " and ", im(String.raw`x = \pi`), ". Check ", im(String.raw`x = \pi`), ": the left side is ", im(String.raw`2(0)(-1) = 0`), " and the right side is ", im(String.raw`\sin \pi = 0`), ", so it satisfies the equation perfectly — it was simply removed by the method."]),
  p("The rule worth carrying: never divide by something that can be zero. Factor instead."),

  h2("5. Cancelling in a rational function and losing the hole"),
  mp(["Simplifying ", im(String.raw`\frac{x^2-4}{x-2}`), " to ", im(String.raw`x+2`), " is algebraically correct — and it silently changes the function."]),
  h3("Worked example"),
  math(String.raw`\frac{x^2 - 4}{x - 2} = \frac{(x-2)(x+2)}{x-2} = x + 2, \quad x \neq 2`),
  mp(["At ", im(String.raw`x = 2`), " the original function is ", im(String.raw`\tfrac{0}{0}`), ", which is undefined. The simplified version cheerfully returns 4. So the graph is the line ", im(String.raw`y = x+2`), " with a hole at ", im(String.raw`(2, 4)`), "."]),
  p("Writing \"= x + 2\" with no restriction loses that hole, and the hole is usually exactly what the question is testing. The cancelled factor is not gone — it left a mark."),

  h2("6. Confusing the inverse with the reciprocal"),
  p("f⁻¹(x) and 1/f(x) are different objects. The notation invites the mistake, and the exam knows it."),
  h3("Worked example"),
  mp(["Let ", im(String.raw`f(x) = 2x + 3`), ". Swap and solve for the inverse:"]),
  math(String.raw`x = 2y + 3 \;\Longrightarrow\; f^{-1}(x) = \frac{x-3}{2}`),
  p("The reciprocal is a completely different object:"),
  math(String.raw`f^{-1}(x) = \frac{x-3}{2} \neq \frac{1}{f(x)} = \frac{1}{2x+3}`),
  p("These agree nowhere. The check that an inverse is right is composition:"),
  math(String.raw`f\bigl(f^{-1}(x)\bigr) = 2\left(\frac{x-3}{2}\right) + 3 = x \quad \checkmark`),
  p("An inverse undoes the function; a reciprocal divides one by it."),

  h2("7. Using the infinite geometric sum when the series doesn't converge"),
  p("The infinite sum formula carries a condition, and the condition is the whole point:"),
  math(String.raw`S_\infty = \frac{a}{1-r}, \quad \text{valid only when } |r| < 1`),
  h3("Worked example"),
  mp(["Consider ", im(String.raw`2 + 6 + 18 + 54 + \cdots`), ", where ", im(String.raw`a = 2`), " and ", im(String.raw`r = 3`), ". Applying the formula anyway:"]),
  math(String.raw`S = \frac{2}{1-3} = \frac{2}{-2} = -1`),
  p("Look at what that claims: adding infinitely many positive, growing numbers gives −1. The series diverges — it has no sum. The formula did not fail quietly; it produced an answer that is visibly absurd, which is the useful part. If a sum of positive terms comes out negative, the condition was never checked."),

  h2("Practice problems"),
  p("Work these before reading the solutions. Getting one wrong is more informative than getting three right."),
  mp([span("1. Describe the transformations of ", ["strong"]), im(String.raw`y = f(3x + 9)`), span(" relative to ", ["strong"]), im(String.raw`y = f(x)`), span(".", ["strong"])]),
  mp([span("2. Solve ", ["strong"]), im(String.raw`\log_5(x) + \log_5(x-4) = 1`), span(".", ["strong"])]),
  mp([span("3. Solve ", ["strong"]), im(String.raw`2\cos^2 x = \cos x`), span(" for ", ["strong"]), im(String.raw`0 \le x < 2\pi`), span(".", ["strong"])]),

  h2("Solutions"),
  h3("1. Transformations"),
  p("Factor first:"),
  math(String.raw`y = f(3x + 9) = f\bigl(3(x + 3)\bigr)`),
  mp(["Horizontal compression by a factor of ", im(String.raw`\tfrac{1}{3}`), ", then a shift LEFT 3 — not left 9. Check: the bracket is zero at ", im(String.raw`3x + 9 = 0`), ", so ", im(String.raw`x = -3`), ". ✓"]),
  h3("2. The log equation"),
  math(String.raw`\log_5\bigl(x(x-4)\bigr) = 1 \;\Longrightarrow\; x(x-4) = 5`),
  math(String.raw`x^2 - 4x - 5 = 0 \;\Longrightarrow\; (x-5)(x+1) = 0`),
  mp(["The algebra gives ", im(String.raw`x = 5`), " and ", im(String.raw`x = -1`), ". The domain needs ", im(String.raw`x > 0`), " and ", im(String.raw`x - 4 > 0`), ", so ", im(String.raw`x > 4`), " — which rejects ", im(String.raw`x = -1`), "."]),
  math(String.raw`\text{Check } x=5:\quad \log_5 5 + \log_5 1 = 1 + 0 = 1 \quad \checkmark`),
  h3("3. The trig equation"),
  mp(["Do not divide by ", im(String.raw`\cos x`), " — that would delete solutions (mistake 4). Factor instead:"]),
  math(String.raw`2\cos^2 x - \cos x = 0 \;\Longrightarrow\; \cos x\,(2\cos x - 1) = 0`),
  math(String.raw`\cos x = 0 \;\Longrightarrow\; x = \tfrac{\pi}{2},\ \tfrac{3\pi}{2} \qquad \cos x = \tfrac{1}{2} \;\Longrightarrow\; x = \tfrac{\pi}{3},\ \tfrac{5\pi}{3}`),
  mp(["Four solutions: ", im(String.raw`\tfrac{\pi}{3},\ \tfrac{\pi}{2},\ \tfrac{3\pi}{2},\ \tfrac{5\pi}{3}`), ". Check ", im(String.raw`x = \tfrac{\pi}{2}`), ": ", im(String.raw`2(0)^2 = 0`), " and ", im(String.raw`\cos\tfrac{\pi}{2} = 0`), ". ✓ Dividing by ", im(String.raw`\cos x`), " would have lost both ", im(String.raw`x = \tfrac{\pi}{2}`), " and ", im(String.raw`x = \tfrac{3\pi}{2}`), "."]),

  h2("Why these matter beyond the report card"),
  p("Pre-Calculus 12 is the prerequisite for first-year calculus at UBC and SFU, and those courses do not revisit it — they assume it. Every mistake above is one that reappears in calculus wearing different clothes: the transformation error resurfaces in curve sketching, the log domain error in solving, the trig factoring error everywhere."),
  linked(["That is the honest case for fixing them now rather than after the final. A gap here is not a Grade 12 problem; it is a first-year problem you have not met yet. The same goes for ", { text: "Calculus 12", href: "/calculus-12-tutor-burnaby" }, ", which builds on this material directly."]),
  p("A pattern worth noticing: not one of these seven is an arithmetic failure. Every one is a decision made too early — dividing before factoring, cancelling before checking, applying a formula before testing its condition. That is what makes them fixable. The mathematics is already there; the habit around it is what needs building."),

  h2("Getting help with Pre-Calculus 12"),
  linked(["If two or three of these felt uncomfortably familiar, that is useful information rather than bad news — it means the marks are being lost somewhere specific and identifiable. Our ", { text: "Pre-Calculus 12 tutoring in Burnaby", href: "/pre-calculus-12-tutor-burnaby" }, " works exactly here: watching the step where the reasoning turns, which is something no worked solution can show you."]),
  linked(["Sessions run in person at our Burnaby centre or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and we will talk through where the marks are actually going."]),
];

/** Every equation must compile, or it renders as red error text on the page. */
function verifyLatex(blocks) {
  const found = [];
  for (const b of blocks) {
    if (b._type === "mathBlock") found.push([b.latex, true]);
    for (const c of b.children || []) if (c._type === "mathInline") found.push([c.latex, false]);
  }
  let bad = 0;
  for (const [latex, display] of found) {
    try {
      const html = katex.renderToString(latex, { displayMode: display, throwOnError: true, output: "html", strict: false });
      if (/katex-error/.test(html)) throw new Error("rendered as error");
    } catch (e) {
      bad++;
      console.error(`  ✗ BAD LATEX: ${latex}
      ${(e.message || e).slice(0, 80)}`);
    }
  }
  return { total: found.length, bad };
}

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (creating draft)" : "DRY RUN"}`);
  const { total, bad } = verifyLatex(body);
  console.log(`  LaTeX  : ${total} equation(s), ${bad} invalid`);
  if (bad) {
    console.error("\n✗ Refusing to continue — fix the LaTeX first.");
    process.exit(1);
  }
  const wordCount = body
    .flatMap((b) => (b.children || []).map((c) => c.text || ""))
    .join(" ")
    .trim()
    .split(/\s+/).length;
  console.log(`  slug   : ${SLUG}`);
  console.log(`  title  : ${TITLE} (${TITLE.length} chars)`);
  console.log(`  blocks : ${body.length}`);
  console.log(`  words  : ${wordCount}  (site average is 445)`);
  const links = body.flatMap((b) => (b.markDefs || []).map((m) => m.href));
  console.log(`  internal links: ${links.length} -> ${[...new Set(links)].join(", ")}`);

  const existing = await client.fetch(`*[_type == "post" && slug.current == $s][0]{_id}`, { s: SLUG });
  if (existing) {
    console.log("\n  ! a post with this slug already exists — not overwriting.");
    return;
  }

  if (commit) {
    // drafts. prefix => created as a draft for review, not published.
    await client.create({
      _id: `drafts.${SLUG}`,
      _type: "post",
      title: TITLE,
      slug: { _type: "slug", current: SLUG },
      publishedAt: new Date().toISOString(),
      excerpt: EXCERPT,
      reviewedByExpert: false,
      metaData: {
        _type: "metaData",
        metaTitle: "7 Common Pre-Calculus 12 Mistakes | Burnaby Tutoring",
        metaDescription:
          "The seven errors that cost the most marks in Pre-Calculus 12, each with a worked example, plus practice problems and solutions. PhD-led tutoring in Burnaby.",
        canonical: `https://www.drshreyankeducare.com/blog/${SLUG}`,
      },
      body,
    });
    console.log("\n  ✓ created as a DRAFT (Studio > Blog Posts). Not live yet.");
  } else {
    console.log("\nRe-run with --commit to create the draft.");
  }
}

run().catch((e) => {
  console.error("Failed:", e?.message || e);
  process.exit(1);
});
