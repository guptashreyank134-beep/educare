/**
 * "SAT Mathematics" (657 -> 1,500+).
 *
 * Full rebuild — the old version was the 6-section template with 0 equations.
 * An SAT MATH article with no maths in it does not deserve to rank.
 *
 * Angle: the SAT does not test hard mathematics. It tests a small, knowable set
 * of recurring setups under brutal time pressure. The maths is Grade 10; the
 * skill is recognition and speed. Maths verified first (scripts/verify-sat-math.mjs).
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-sat-math.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-sat-math.mjs --commit
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "sat-prep-sat-mathematics";

/* y = x^2 - 6x + 5 = (x-3)^2 - 4. Verified: vertex (3,-4), roots x=1,5. */
const VX = (x) => Math.round((45 + x * 42) * 10) / 10;
const VY = (y) => Math.round((150 - y * 20) * 10) / 10;
let para = "";
for (let x = 0.2; x <= 5.8; x += 0.1) para += `${para ? " L" : "M"} ${VX(x)} ${VY(x * x - 6 * x + 5)}`;
const parabolaSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 300 260" role="img" aria-label="The parabola y equals x squared minus six x plus five. It crosses the x-axis at x equals one and x equals five, and its lowest point, the vertex, is at three comma minus four. Rewriting the equation as x minus three squared minus four reveals the vertex directly, with no calculus." style="width:100%;max-width:300px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="${VX(0)}" y1="${VY(0)}" x2="${VX(6)}" y2="${VY(0)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${VX(0)}" y1="${VY(6)}" x2="${VX(0)}" y2="${VY(-5)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <path d="${para}" fill="none" stroke="#3A5A98" stroke-width="2.5"/>
    <circle cx="${VX(1)}" cy="${VY(0)}" r="3.5" fill="#B45309"/>
    <circle cx="${VX(5)}" cy="${VY(0)}" r="3.5" fill="#B45309"/>
    <circle cx="${VX(3)}" cy="${VY(-4)}" r="4" fill="#3A5A98"/>
    <text x="${VX(1)}" y="${VY(0) - 8}" font-size="11" fill="#B45309" text-anchor="middle">x=1</text>
    <text x="${VX(5)}" y="${VY(0) - 8}" font-size="11" fill="#B45309" text-anchor="middle">x=5</text>
    <text x="${VX(3)}" y="${VY(-4) + 18}" font-size="11.5" fill="#3A5A98" text-anchor="middle" font-weight="700">(3, −4)</text>
    <text x="${VX(3)}" y="${VY(6.2)}" font-size="11.5" fill="#1F2937" text-anchor="middle">y = (x−3)² − 4</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The same parabola, three ways. Standard form x²−6x+5 hides everything; factored form (x−1)(x−5)
    hands you the roots; vertex form (x−3)²−4 hands you the lowest point. The SAT question tells you
    which form it wants by what it asks — and rewriting is faster than calculus.
  </figcaption>
</figure>`;

const body = [
  p("Here is the most useful sentence anyone will tell you about the SAT maths section, and it is not what students expect: the mathematics is easy. The test is hard for an entirely different reason."),
  p("Almost nothing on it is beyond Grade 10. There is no calculus, no proof, nothing exotic. What makes it punishing is time — you get about ninety-five seconds per question, and the questions are written so that the slow, correct, school method runs you out of clock before the section ends. The SAT is not testing whether you can do the maths. It is testing whether you can do it fast, and whether you recognise which of a small set of familiar traps you are looking at."),
  linked(["So preparation is not about learning new mathematics. It is about pattern recognition and speed, which is exactly what focused practice builds. Our ", { text: "SAT and PSAT prep", href: "/programs/sat-prep" }, " is built around the recurring setups rather than the syllabus."]),

  h2("The clock is the real exam"),
  mp(["The digital SAT gives you 44 maths questions in 70 minutes. That is ", im(String.raw`70 \times 60 \div 44 \approx 95`), " seconds each — and the early questions are quick, so the hard ones leave you under a minute."]),
  p("This single fact should reshape how you prepare. A method that reliably gets the right answer in three minutes is a wrong method for this test. The whole game is finding the ninety-second route, and the ninety-second route is almost always a shortcut the school classroom never had time to teach you. The rest of this guide is those shortcuts."),

  h2("Systems: add the equations, do not substitute"),
  p("Substitution is what school teaches and it is usually the slow road. When the coefficients line up, adding or subtracting the two equations is faster."),
  math(String.raw`3x + 2y = 16 \qquad 5x - 2y = 8`),
  mp(["The y-terms are ", im(String.raw`+2y`), " and ", im(String.raw`-2y`), ". Add the equations and y vanishes on the spot:"]),
  math(String.raw`8x = 24 \quad \Longrightarrow \quad x = 3, \quad \text{then } y = 3.5`),
  p("No rearranging, no fractions, no substituting an expression into another equation. On the SAT, always glance at whether elimination is set up for you before you reach for substitution — the test writers frequently arrange the coefficients so that it is."),

  h2("Percent change does not add up"),
  p("The single most reliable trap on the test. A price rises 20%, then falls 20%. Back to the start? No."),
  math(String.raw`100 \times 1.20 \times 0.80 = 96`),
  p("A 4% loss, because you took 20% of the larger number and gave back 20% of it, then subtracted 20% of a bigger figure. Percentages multiply, they do not add — up 20% then down 20% is ×1.2 then ×0.8, which is ×0.96. The SAT asks this in a dozen costumes (a population, a salary, a share price), and the answer is never zero. Treat every chained percent as a multiplication and the trap disappears."),

  h2("Quadratics: the form is the answer"),
  p("A quadratic can be written three ways, and the SAT chooses its question to match one of them. Recognising which form you need is most of the speed."),
  { _type: "htmlBlock", _key: key(), html: parabolaSvg },
  mp(["Standard form ", im(String.raw`x^2 - 6x + 5`), " is what you are usually handed, and it hides both the roots and the vertex."]),
  mp(["Factored form ", im(String.raw`(x-1)(x-5)`), " hands you the roots: the graph crosses the axis at x = 1 and x = 5. If the question asks where y = 0, factor."]),
  mp(["Vertex form ", im(String.raw`(x-3)^2 - 4`), " hands you the turning point: the minimum is −4, at x = 3. If the question asks for the maximum, minimum, or the line of symmetry, complete the square — and note you just found the minimum of a quadratic with no calculus at all."]),
  p("A student who tries to answer a vertex question from standard form, or hunts for roots by formula when the thing factors in one line, is spending two minutes on a thirty-second question. The form is not busywork — it is the shortcut."),

  h2("Exponential growth wants a formula, not a number"),
  p("A population of 500 grows 8% each year. The SAT rarely asks for the value after 3 years (which is 630); it asks which expression models the population after t years."),
  math(String.raw`P(t) = 500(1.08)^t`),
  p("The whole question is recognising that repeated percentage growth is an exponent, not a multiplication by 3. \"Grows 8% per year\" means ×1.08 every year, so t years means 1.08 to the power t. Linear growth adds the same amount each step; exponential growth multiplies by the same factor. Mixing them up is one of the most common wrong answers on the section, and the test always offers the linear trap — 500 + 40t — as a choice."),

  h2("When solving is slow, plug in the answers"),
  p("The SAT is multiple choice, and that is a tool, not just a format. When an equation looks like a slog, testing the answer choices is often faster than solving."),
  math(String.raw`2x^2 - 5x - 3 = 0`),
  p("Rather than reach for the quadratic formula, try the choices. If x = 3 is offered: 2(9) − 15 − 3 = 0. Done — and it took ten seconds. The answer is on the page; you only have to recognise it, not derive it. This works on any question where the choices are values and the algebra is ugly, and it turns some of the hardest-looking questions into the fastest."),

  h2("When the question has no numbers, make some"),
  p("Some SAT questions are deliberately abstract — all variables, no values — and they look far harder than they are. The move is to invent numbers that fit."),
  p("\"If a is 30% of b, and b is 40% of c, then a is what percent of c?\" You can chase this symbolically, or you can let c = 100:"),
  math(String.raw`c = 100 \;\Rightarrow\; b = 40 \;\Rightarrow\; a = 12 \;\Rightarrow\; a = 12\% \text{ of } c`),
  p("Concrete numbers turn an abstract question into arithmetic a twelve-year-old can do, and 100 is almost always the number to pick for a percentage problem. This works whenever the answer choices are also in terms of the variables — plug your numbers into those too, and take the choice that matches. It is the single most powerful technique on the hardest questions, precisely because those are the ones written to look unapproachable."),

  h2("Circles: complete the square, twice"),
  p("A circle question gives you a scrambled equation and wants the centre or radius. The method is completing the square — the same move as the vertex form above, done on both variables."),
  math(String.raw`x^2 + y^2 - 6x + 8y = 0`),
  mp(["Complete the square in x and in y separately: ", im(String.raw`x^2 - 6x`), " becomes ", im(String.raw`(x-3)^2 - 9`), ", and ", im(String.raw`y^2 + 8y`), " becomes ", im(String.raw`(y+4)^2 - 16`), ". So:"]),
  math(String.raw`(x-3)^2 + (y+4)^2 = 25`),
  p("Centre (3, −4), radius 5 — read straight off, because that is what the standard form of a circle is built to show. The scrambled version was the same circle with the structure hidden, exactly like the quadratic. On the SAT, \"messy equation, wants a geometric feature\" almost always means complete the square."),

  h2("Memorise these, and stop deriving them"),
  p("A handful of facts appear again and again. Knowing them cold saves the time other students spend rebuilding them mid-question."),
  mli(["The special right triangles: 45-45-90 has sides in ratio 1 : 1 : √2, and 30-60-90 has 1 : √3 : 2. These are printed on the reference sheet, but reading the sheet costs seconds you do not have."]),
  mli(["The integer Pythagorean triples the test reuses: 3-4-5 and 5-12-13, plus their multiples. Spot a 6-8-? and you know it is 10 without touching a calculator."]),
  mli(["Mean is dragged by outliers; median is not. For {2, 3, 3, 4, 88} the mean is 20 and the median is 3 — and the SAT loves asking which measure a single large value changes."]),
  mli(["A line from a table: the slope is the constant difference. From (1, 7), (3, 13), (5, 19), y rises 3 for every 1, so y = 3x + 4. Check the intercept once and you are done."]),

  h2("Where the points are actually lost"),
  mli(["Running out of time. Almost every low score is a timing score — students who could do every question but not in seventy minutes. Practice against the clock, not in comfort."]),
  mli(["Using the school method when a shortcut exists. Correct but slow is still wrong here."]),
  mli(["Percentages added instead of multiplied."]),
  mli(["Calculator dependence on the no-calculator instincts — reaching for it on 6 × 7 costs more time than the multiplication."]),
  mli(["Not reading what is asked. \"Which expression\" wants a formula; \"what is the value\" wants a number. Answering the wrong one is a fully-worked zero."]),

  h2("How to prepare, specifically"),
  mli(["Do timed sections from the start. Untimed practice trains the wrong skill — the test is a speed test wearing a maths costume."]),
  mli(["Keep an error log by TYPE, not by question. If three misses this week were all percent-change, that is one fix, not three."]),
  mli(["Learn the shortcuts above until they are automatic, then drill until recognition is instant. The goal is to see the trap before you have finished reading the question."]),
  mli(["Master the calculator you will actually use, including the built-in graphing tool on the digital test — it turns some algebra questions into reading a graph."]),

  h2("Getting help with SAT maths"),
  linked(["If the maths itself is fine but the score is not, the problem is almost always speed and recognition rather than knowledge — and that is a very trainable thing, because there is a finite list of setups to learn. Our ", { text: "SAT and PSAT prep", href: "/programs/sat-prep" }, " works from real timed sections and a log of the specific traps that are costing you points."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent practice test — the timed one, with the mistakes on it."]),
];

async function run() {
  // Guard: the mli/slice experiment above must not leave a malformed block in.
  const flat = body.filter((b) => b && b._type);
  const { total, bad } = verifyLatex(flat);
  const words = flat.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(flat.flatMap((b) => (b.markDefs || []).map((m) => m.href)))].filter((h) => h);

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 657)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${flat.filter((b) => b._type === "htmlBlock").length} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => l === "#" || l === "")) { console.error("  ✗ placeholder/empty link found."); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ dead link(s): ${dead.join(", ")}`); process.exit(1); }
  console.log(`  links ok  : all ${links.length} resolve ✓`);
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing.`); process.exit(1); }

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ published post not found"); process.exit(1); }
  if (commit) {
    await client.patch(doc._id).set({ body: flat }).commit();
    console.log("  ✓ upgraded (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
