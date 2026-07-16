/**
 * "Common Pre-Calculus 12 mistakes" (1,159 -> 1,500+).
 *
 * Maths verified numerically first (scripts/verify-precalc-mistakes.mjs) — every
 * counterexample in the article is a real evaluated counterexample, not an
 * assertion.
 *
 * The SVG is the (a+b)² square, because it does not just say the cross term
 * exists — it shows you the two rectangles you forgot.
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-precalc-mistakes.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-precalc-mistakes.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, li, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "common-pre-calculus-12-mistakes-burnaby";

/* a=3, b=4. Verified: 9 + 12 + 12 + 16 = 49 = (3+4)². 30px per unit. */
const U = 30, A = 3, B = 4, OX = 70, OY = 34;
const aPx = A * U, bPx = B * U;
const squareSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 340 300" role="img" aria-label="A square of side a plus b, divided into four pieces: a square of area a squared in the top left, a square of area b squared in the bottom right, and two identical rectangles each of area a times b. The two rectangles are the cross term 2ab that students forget when they write that a plus b squared equals a squared plus b squared." style="width:100%;max-width:340px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <rect x="${OX}" y="${OY}" width="${aPx}" height="${aPx}" fill="#3A5A98" fill-opacity="0.75" stroke="#FFFFFF" stroke-width="2"/>
    <rect x="${OX + aPx}" y="${OY}" width="${bPx}" height="${aPx}" fill="#F4E98B" stroke="#FFFFFF" stroke-width="2"/>
    <rect x="${OX}" y="${OY + aPx}" width="${aPx}" height="${bPx}" fill="#F4E98B" stroke="#FFFFFF" stroke-width="2"/>
    <rect x="${OX + aPx}" y="${OY + aPx}" width="${bPx}" height="${bPx}" fill="#3A5A98" fill-opacity="0.35" stroke="#FFFFFF" stroke-width="2"/>
    <text x="${OX + aPx / 2}" y="${OY + aPx / 2 + 6}" font-size="17" fill="#FFFFFF" text-anchor="middle" font-weight="700">a²</text>
    <text x="${OX + aPx + bPx / 2}" y="${OY + aPx / 2 + 6}" font-size="17" fill="#6b5d0f" text-anchor="middle" font-weight="700">ab</text>
    <text x="${OX + aPx / 2}" y="${OY + aPx + bPx / 2 + 6}" font-size="17" fill="#6b5d0f" text-anchor="middle" font-weight="700">ab</text>
    <text x="${OX + aPx + bPx / 2}" y="${OY + aPx + bPx / 2 + 6}" font-size="17" fill="#1F2937" text-anchor="middle" font-weight="700">b²</text>
    <line x1="${OX}" y1="${OY - 12}" x2="${OX + aPx}" y2="${OY - 12}" stroke="#64748B" stroke-width="1.5"/>
    <line x1="${OX + aPx}" y1="${OY - 12}" x2="${OX + aPx + bPx}" y2="${OY - 12}" stroke="#64748B" stroke-width="1.5"/>
    <text x="${OX + aPx / 2}" y="${OY - 18}" font-size="13" fill="#1F2937" text-anchor="middle">a</text>
    <text x="${OX + aPx + bPx / 2}" y="${OY - 18}" font-size="13" fill="#1F2937" text-anchor="middle">b</text>
    <text x="${OX - 16}" y="${OY + aPx / 2 + 5}" font-size="13" fill="#1F2937" text-anchor="middle">a</text>
    <text x="${OX - 16}" y="${OY + aPx + bPx / 2 + 5}" font-size="13" fill="#1F2937" text-anchor="middle">b</text>
    <text x="${OX + (aPx + bPx) / 2}" y="285" font-size="13" fill="#8a7b1f" text-anchor="middle" font-weight="600">the two yellow rectangles are the 2ab you forgot</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The whole square has side a+b, so its area is (a+b)². It is built from four pieces: a², b², and
    <em>two</em> ab rectangles. Writing (a+b)² = a² + b² is claiming the yellow strips do not exist.
    With a=3 and b=4: 9 + 16 + 24 = 49, and 3+4 squared is 49. The 24 is not optional.
  </figcaption>
</figure>`;

const body = [
  p("After enough years of marking Pre-Calculus 12, you stop seeing individual mistakes and start seeing the same ten, over and over, in different costumes."),
  p("They are not careless errors, and telling a student to \"be more careful\" does nothing about them — because carelessness is not what is happening. Each one is a rule that is true somewhere else, applied where it does not hold. The student is not being sloppy. They are being consistent with a rule that was never real."),
  linked(["Here they are, with the counterexample that kills each. If you recognise your own work in several of these, that is normal and it is fixable — it is what ", { text: "Pre-Calculus 12 tutoring", href: "/pre-calculus-12-tutor-burnaby" }, " spends most of its time on."]),

  h2("1. The big one: (a+b)² is not a² + b²"),
  p("This single mistake costs more marks in Pre-Calculus 12 than any other, and it survives all the way into university."),
  mp(["Test it. Let ", im(String.raw`a = 3`), " and ", im(String.raw`b = 4`), ":"]),
  math(String.raw`(3+4)^2 = 7^2 = 49 \qquad \text{but} \qquad 3^2 + 4^2 = 9 + 16 = 25`),
  p("Not close. Off by 24. And that 24 is not random — it is exactly 2ab = 2(3)(4). Here is where it lives:"),
  { _type: "htmlBlock", _key: key(), html: squareSvg },
  math(String.raw`(a+b)^2 = a^2 + 2ab + b^2`),
  p("Once you have seen the square, the mistake becomes hard to make. You are not forgetting a term from a formula sheet; you are claiming two rectangles of the picture do not exist. And notice when the wrong version accidentally works: only when 2ab = 0, which means a or b is zero. That is why it occasionally \"checks out\" and the habit survives."),

  h2("2. The family it belongs to"),
  p("The (a+b)² error is not one mistake. It is one instance of the deepest misconception in high-school mathematics: the belief that operations distribute across addition. Squaring does not. Neither do most things."),
  h3("Square roots"),
  math(String.raw`\sqrt{a^2+b^2} \neq a + b`),
  mp(["With 3 and 4: ", im(String.raw`\sqrt{9+16} = \sqrt{25} = 5`), ", not 7. If square roots did split across a sum, the 3-4-5 triangle would be a 3-4-7 triangle, and Pythagoras would never have got anywhere."]),
  h3("Logarithms"),
  math(String.raw`\log(a+b) \neq \log a + \log b`),
  mp(["With a = b = 10: ", im(String.raw`\log 20 = 1.301`), ", but ", im(String.raw`\log 10 + \log 10 = 2`), ". The rule students are half-remembering is real, but it is about products, not sums:"]),
  math(String.raw`\log(ab) = \log a + \log b`),
  p("That is the actual law, and it checks: log(100) = 2. Logarithms turn multiplication into addition — that is their entire purpose, and it is why they were invented. They do nothing for addition, and this confusion accounts for most lost marks in the logarithms unit."),
  h3("Reciprocals"),
  math(String.raw`\frac{1}{a+b} \neq \frac{1}{a} + \frac{1}{b}`),
  mp(["With 2 and 3: ", im(String.raw`1/5 = 0.2`), ", against ", im(String.raw`1/2 + 1/3 = 0.833`), "."]),
  p("So the rule worth carrying is a negative one: unless you can name the law that permits it, do not move an operation through a plus sign. Multiplication distributes over addition. Almost nothing else does."),

  h2("3. Dividing by a variable, and quietly deleting a solution"),
  p("Solve x² = x. The tempting move is to divide both sides by x:"),
  math(String.raw`x^2 = x \quad \Longrightarrow \quad x = 1`),
  p("One answer. But x = 0 also works — 0² = 0 — and it has just been thrown away, because dividing by x assumed x ≠ 0 without saying so. Factor instead:"),
  math(String.raw`x^2 - x = 0 \quad \Longrightarrow \quad x(x-1) = 0 \quad \Longrightarrow \quad x = 0 \ \text{or} \ x = 1`),
  p("Both survive. The rule: never divide by something that might be zero. Move everything to one side and factor. This costs half a mark in Pre-Calculus 12 and entire questions later, because the root you delete is often the interesting one."),

  h2("4. Squaring, and quietly inventing one"),
  p("The mirror image. Solve √(x+2) = x. Squaring both sides:"),
  math(String.raw`x + 2 = x^2 \quad \Longrightarrow \quad x^2 - x - 2 = 0 \quad \Longrightarrow \quad (x-2)(x+1) = 0`),
  mp(["So x = 2 or x = −1. But check them in the original, which is the step everyone skips. x = 2: ", im(String.raw`\sqrt{4} = 2`), " ✓. x = −1: ", im(String.raw`\sqrt{1} = 1`), ", and 1 ≠ −1. ✗"]),
  p("So the answer is x = 2 alone. The −1 is extraneous — squaring created it, because squaring destroys sign information: both 1 and −1 square to 1. Any time you square both sides, you have possibly manufactured a solution, and checking is not optional tidiness. It is part of the method."),
  p("Notice the symmetry with the previous one. Dividing loses roots; squaring invents them. Both happen because an operation that is not reversible was applied as though it were."),

  h2("5. The inequality sign that should have flipped"),
  math(String.raw`-2x > 6`),
  p("Divide by −2 and the sign must turn: x < −3. Test it. x = −4 gives −2(−4) = 8 > 6 ✓. x = −2 gives 4 > 6 ✗. So the solutions really are below −3."),
  p("Students know this rule and still miss it, because they apply it when they see a negative sign rather than when they multiply or divide by a negative. Those are different triggers. And it gets far worse with variables: you cannot multiply an inequality by x at all without knowing x's sign, which is why rational inequalities want a sign chart, not algebra."),

  h2("6. Answers that were never allowed"),
  mp(["Solve and you get x = 2 for something involving ", im(String.raw`\log(x-3)`), ". But log of a negative number does not exist, and log 0 does not either — so the domain here is x > 3, and 2 was never a candidate. It has to be discarded regardless of how clean the algebra was."]),
  p("Domains are not a formality at the start of the chapter. They are a filter on the answer at the end. Logs need positive arguments, even roots need non-negative ones, denominators cannot vanish — and a solution that violates any of these is not a solution, however tidy the working that produced it."),

  h2("7. Notation that means something else"),
  mp([im(String.raw`\sin^2 x`), " means ", im(String.raw`(\sin x)^2`), ". It does not mean ", im(String.raw`\sin(x^2)`), ". At x = 2 radians the first is 0.827 and the second is −0.757 — not merely different values, different signs."]),
  linked(["It is an unfortunate notation and everyone trips on it once. The reason it matters is that the Pythagorean identity is written this way, and it is the most-used identity in the course. If you want that unit properly, we wrote a full guide to ", { text: "trigonometric identities and equations", href: "/blog/pre-calculus-trigonometric-identities-equations" }, "."]),

  h2("8. The transformation that goes the wrong way"),
  mp([im(String.raw`y = f(x-3)`), " shifts the graph three units to the ", im(String.raw`\textbf{right}`), ". Almost everyone's instinct says left, because there is a minus sign, and the instinct is wrong."]),
  mp(["Do not memorise it — derive it in five seconds. Take ", im(String.raw`f(x) = x^2`), ", whose vertex sits at x = 0. Now ", im(String.raw`g(x) = f(x-3) = (x-3)^2`), ". Where is g's vertex? Wherever the bracket becomes zero, which is x = 3. So the feature that was at 0 is now at 3: it moved right."]),
  p("The reason is worth having, because it generalises to every transformation in the unit. The bracket does not describe where the graph goes. It describes what x has to be for the function to receive its old input. To feed f a 0, you now have to supply x = 3 — so everything happens 3 later, which is to say further right."),
  p("Get this backwards and you lose the transformations unit wholesale, since every question builds on it. Get the reason and you never need the rule: horizontal changes are always opposite to what they look like, and vertical ones are always exactly what they look like, because vertical changes happen outside the function where nothing is being undone."),

  h2("Why these cost so much more than they look like they should"),
  p("Read that list and each item seems minor — half a mark here, a sign there. But that badly understates the damage, for a reason worth understanding."),
  p("None of these are topics. They are sub-steps. Expanding a bracket is not a Pre-Calculus 12 question; it is a line inside a question about transformations, or logarithms, or rational functions. So an error in it does not cost you the mark for expanding brackets — it costs the question. A student who owns every idea in the course but expands (a+b)² wrongly will still lose marks across every unit, and their report will say they are struggling with Pre-Calculus 12 when they are actually struggling with Grade 9 algebra, at speed, under time pressure."),
  p("This is also why the marks are stubborn. More practice on the current unit does not help, because the current unit is not the problem. That mismatch — working harder on the wrong thing and seeing nothing move — is what makes students conclude they are bad at maths."),
  linked(["It also does not stop at Grade 12. Every one of these reappears in first-year calculus within about three weeks, where the pace is roughly double. We wrote about that in our guide to ", { text: "limits and derivatives", href: "/blog/mathematics-calculus-limits-derivatives" }, " — the students who struggle there are almost never struggling with calculus."]),

  h2("What actually fixes them"),
  mli(["Test the rule on numbers. Every mistake above dies to one substitution. If you are unsure whether a step is legal, try a = 3 and b = 4 and see. Ten seconds, complete certainty."]),
  mli(["Check your answers in the original equation, not the rearranged one. Extraneous roots are invisible anywhere else."]),
  mli(["Write the domain before you solve, not after."]),
  mli(["Learn one picture per rule. The square above is worth more than the formula it encodes, because you cannot misremember a picture the way you can misremember a line of symbols."]),
  mli(["Look at your own past tests. The ten mistakes above are common, but you personally probably make two or three of them, repeatedly. Finding which two is worth more than any amount of general revision."]),

  h2("Getting help with Pre-Calculus 12"),
  linked(["If marks are dropping and nobody can say why, it is very often one of these rather than the topic on the page. That is genuinely good news: a foundation error is a quick fix once it has been found, and finding it is what we do in the first session. Our ", { text: "one-on-one Pre-Calculus 12 help", href: "/pre-calculus-12-tutor-burnaby" }, " starts by reading your actual tests and finding the pattern in them."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test — the marked one, mistakes and all. That is the useful one."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 1159)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ published post not found"); process.exit(1); }
  console.log(`  target    : ${doc._id}`);
  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ upgraded (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
