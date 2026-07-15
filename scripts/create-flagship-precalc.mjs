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
  p("Given y = f(2x − 6), the most common answer is \"shift right 6\". It is wrong, and it is wrong in a way that looks right."),
  strong("The fix: factor the coefficient out of the bracket first."),
  p("2x − 6 = 2(x − 3), so y = f(2(x − 3)): a horizontal compression by a factor of 1/2, and a shift right 3 — not 6."),
  h3("Worked example"),
  p("Take f(x) = x², so y = f(2x − 6) = (2x − 6)²."),
  p("The vertex sits where the bracket equals zero: 2x − 6 = 0, so x = 3. The vertex has moved from (0, 0) to (3, 0) — a shift of 3, not 6."),
  p("This is worth sitting with, because the reason is not obvious: the compression happens to the shift as well. Shifting right 6 and then compressing by 1/2 lands you at 3. Both descriptions reach the same graph; only one of them gives the right number when the question asks how far the graph moved."),

  h2("2. Splitting a logarithm across addition"),
  p("log(a + b) is not log a + log b. The law is about multiplication: log(ab) = log a + log b."),
  h3("Worked example"),
  p("Test it with numbers that are easy to check:"),
  li("log₂(8 + 8) = log₂ 16 = 4"),
  li("log₂ 8 + log₂ 8 = 3 + 3 = 6"),
  p("4 ≠ 6, so the two expressions are not the same thing. Whenever a log law feels uncertain, substituting powers of 2 settles it in about ten seconds — a habit worth having in an exam."),

  h2("3. Solving a log equation without checking the domain"),
  p("Log equations produce solutions that satisfy the algebra but not the original equation. They are not optional to check; the check is part of the question."),
  h3("Worked example"),
  p("Solve log₂(x) + log₂(x − 2) = 3."),
  li("Combine: log₂(x(x − 2)) = 3"),
  li("Convert: x(x − 2) = 2³ = 8"),
  li("Rearrange: x² − 2x − 8 = 0, so (x − 4)(x + 2) = 0"),
  li("Algebraic solutions: x = 4 and x = −2"),
  p("Now the part that carries the marks. log₂(x) needs x > 0, and log₂(x − 2) needs x > 2. So the domain is x > 2, and x = −2 is rejected — you cannot take the log of a negative number."),
  p("Check x = 4: log₂ 4 + log₂ 2 = 2 + 1 = 3. ✓ The answer is x = 4 only."),

  h2("4. Dividing by a trig function — and deleting solutions"),
  p("This one is costly because the work looks clean and the answer looks finished. Dividing both sides by sin x quietly assumes sin x ≠ 0, and throws away every solution where it is."),
  h3("Worked example"),
  p("Solve 2 sin x cos x = sin x for 0 ≤ x < 2π."),
  strong("The tempting route:"),
  p("Divide both sides by sin x → 2 cos x = 1 → cos x = 1/2 → x = π/3, 5π/3. Two solutions."),
  strong("The correct route: move everything to one side and factor."),
  li("2 sin x cos x − sin x = 0"),
  li("sin x (2 cos x − 1) = 0"),
  li("sin x = 0 → x = 0, π"),
  li("cos x = 1/2 → x = π/3, 5π/3"),
  p("There are four solutions: 0, π/3, π, 5π/3. Dividing deleted x = 0 and x = π. Check x = π: the left side is 2(0)(−1) = 0 and the right side is sin π = 0, so it satisfies the equation perfectly — it was simply removed by the method."),
  p("The rule worth carrying: never divide by something that can be zero. Factor instead."),

  h2("5. Cancelling in a rational function and losing the hole"),
  p("Simplifying (x² − 4)/(x − 2) to x + 2 is algebraically correct — and it silently changes the function."),
  h3("Worked example"),
  p("(x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2) = x + 2, but only where x ≠ 2."),
  p("At x = 2 the original function is 0/0, which is undefined. The simplified version cheerfully returns 4. So the graph is the line y = x + 2 with a hole at (2, 4)."),
  p("Writing \"= x + 2\" with no restriction loses that hole, and the hole is usually exactly what the question is testing. The cancelled factor is not gone — it left a mark."),

  h2("6. Confusing the inverse with the reciprocal"),
  p("f⁻¹(x) and 1/f(x) are different objects. The notation invites the mistake, and the exam knows it."),
  h3("Worked example"),
  p("Let f(x) = 2x + 3."),
  li("Inverse: swap and solve. x = 2y + 3 → y = (x − 3)/2, so f⁻¹(x) = (x − 3)/2"),
  li("Reciprocal: 1/f(x) = 1/(2x + 3)"),
  p("These agree nowhere. The check that an inverse is right is composition: f(f⁻¹(x)) = 2·((x − 3)/2) + 3 = (x − 3) + 3 = x. ✓ An inverse undoes the function; a reciprocal divides one by it."),

  h2("7. Using the infinite geometric sum when the series doesn't converge"),
  p("S = a/(1 − r) holds only when |r| < 1. Applied outside that condition it returns a number, and the number is meaningless."),
  h3("Worked example"),
  p("Consider 2 + 6 + 18 + 54 + … , where a = 2 and r = 3."),
  p("Applying the formula anyway: S = 2/(1 − 3) = 2/(−2) = −1."),
  p("Look at what that claims: adding infinitely many positive, growing numbers gives −1. The series diverges — it has no sum. The formula did not fail quietly; it produced an answer that is visibly absurd, which is the useful part. If a sum of positive terms comes out negative, the condition was never checked."),

  h2("Practice problems"),
  p("Work these before reading the solutions. Getting one wrong is more informative than getting three right."),
  strong("1. Describe the transformations of y = f(3x + 9) relative to y = f(x)."),
  strong("2. Solve log₅(x) + log₅(x − 4) = 1."),
  strong("3. Solve 2cos²x = cos x for 0 ≤ x < 2π."),

  h2("Solutions"),
  h3("1. Transformations of y = f(3x + 9)"),
  p("Factor first: 3x + 9 = 3(x + 3), so y = f(3(x + 3))."),
  p("Horizontal compression by a factor of 1/3, then a shift LEFT 3 — not left 9. Check: the bracket is zero at 3x + 9 = 0, so x = −3. ✓"),
  h3("2. log₅(x) + log₅(x − 4) = 1"),
  li("Combine: log₅(x(x − 4)) = 1"),
  li("Convert: x(x − 4) = 5¹ = 5"),
  li("Rearrange: x² − 4x − 5 = 0, so (x − 5)(x + 1) = 0"),
  li("Algebraic solutions: x = 5 and x = −1"),
  p("Domain: x > 0 and x − 4 > 0, so x > 4. That rejects x = −1."),
  p("Check x = 5: log₅ 5 + log₅ 1 = 1 + 0 = 1. ✓ The answer is x = 5."),
  h3("3. 2cos²x = cos x"),
  p("Do not divide by cos x — that would delete solutions (mistake 4)."),
  li("2cos²x − cos x = 0"),
  li("cos x (2 cos x − 1) = 0"),
  li("cos x = 0 → x = π/2, 3π/2"),
  li("cos x = 1/2 → x = π/3, 5π/3"),
  p("Four solutions: π/3, π/2, 3π/2, 5π/3. Check x = π/2: 2(0)² = 0 and cos(π/2) = 0. ✓ Dividing by cos x would have lost both x = π/2 and x = 3π/2."),

  h2("Why these matter beyond the report card"),
  p("Pre-Calculus 12 is the prerequisite for first-year calculus at UBC and SFU, and those courses do not revisit it — they assume it. Every mistake above is one that reappears in calculus wearing different clothes: the transformation error resurfaces in curve sketching, the log domain error in solving, the trig factoring error everywhere."),
  linked(["That is the honest case for fixing them now rather than after the final. A gap here is not a Grade 12 problem; it is a first-year problem you have not met yet. The same goes for ", { text: "Calculus 12", href: "/calculus-12-tutor-burnaby" }, ", which builds on this material directly."]),
  p("A pattern worth noticing: not one of these seven is an arithmetic failure. Every one is a decision made too early — dividing before factoring, cancelling before checking, applying a formula before testing its condition. That is what makes them fixable. The mathematics is already there; the habit around it is what needs building."),

  h2("Getting help with Pre-Calculus 12"),
  linked(["If two or three of these felt uncomfortably familiar, that is useful information rather than bad news — it means the marks are being lost somewhere specific and identifiable. Our ", { text: "Pre-Calculus 12 tutoring in Burnaby", href: "/pre-calculus-12-tutor-burnaby" }, " works exactly here: watching the step where the reasoning turns, which is something no worked solution can show you."]),
  linked(["Sessions run in person at our Burnaby centre or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and we will talk through where the marks are actually going."]),
];

async function run() {
  console.log(`Mode: ${commit ? "COMMIT (creating draft)" : "DRY RUN"}`);
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
