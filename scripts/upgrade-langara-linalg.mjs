/**
 * "Linear Algebra (Langara MATH 2362)" (725 -> 1,500+).
 *
 * Full rebuild, DELIBERATELY the complementary half of the UBC linear algebra
 * post. That one owns the geometry of a single matrix — matrix as function,
 * determinant as area, the singular collapse, eigenvectors. This one takes what
 * it skipped: rank, the shape of a solution set, projection, and least squares.
 * The script measures overlap against the sibling and refuses above 3%.
 *
 * Course code is already in the slug/title. No NEW institutional claims.
 *
 * Maths verified first (scripts/verify-least-squares.mjs).
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-langara-linalg.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-langara-linalg.mjs --commit
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "university-mathematics-linear-algebra-langara-math-2362";

/* Verified: proj of (5,0) onto (3,4) is (1.8,2.4); residual (3.2,-2.4) is perpendicular to a. */
const U = 40, OX = 50, OY = 230;
const X = (x) => Math.round((OX + x * U) * 10) / 10;
const Y = (y) => Math.round((OY - y * U) * 10) / 10;

const projSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 360 280" role="img" aria-label="Vector b equals five comma zero is projected onto vector a equals three comma four. The projection lands at one point eight comma two point four, on the line through a. The residual, drawn dashed from the projection to b, meets that line at a right angle. This perpendicularity is what makes the projection the closest point." style="width:100%;max-width:360px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs>
      <marker id="pv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3A5A98"/>
      </marker>
      <marker id="pk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1F2937"/>
      </marker>
    </defs>
    <line x1="${X(-0.2)}" y1="${Y(0)}" x2="${X(6.4)}" y2="${Y(0)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${X(0)}" y1="${Y(-0.3)}" x2="${X(0)}" y2="${Y(5)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(3.6)}" y2="${Y(4.8)}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="5 5"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(3)}" y2="${Y(4)}" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#pv)"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(5)}" y2="${Y(0)}" stroke="#1F2937" stroke-width="2.5" marker-end="url(#pk)"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(1.8)}" y2="${Y(2.4)}" stroke="#F4E98B" stroke-width="6" stroke-linecap="round"/>
    <line x1="${X(1.8)}" y1="${Y(2.4)}" x2="${X(5)}" y2="${Y(0)}" stroke="#B45309" stroke-width="2" stroke-dasharray="6 4"/>
    <polyline points="${X(1.8) + 11},${Y(2.4) + 8} ${X(1.8) + 17},${Y(2.4) + 12.5} ${X(1.8) + 12.5},${Y(2.4) + 18.5}" fill="none" stroke="#B45309" stroke-width="1.6"/>
    <circle cx="${X(1.8)}" cy="${Y(2.4)}" r="4" fill="#8a7b1f"/>
    <text x="${X(3) - 6}" y="${Y(4) - 8}" font-size="12" fill="#3A5A98" text-anchor="end" font-weight="700">a = (3, 4)</text>
    <text x="${X(5) - 4}" y="${Y(0) + 18}" font-size="12" fill="#1F2937" text-anchor="middle" font-weight="700">b = (5, 0)</text>
    <text x="${X(1.8) - 12}" y="${Y(2.4) + 2}" font-size="11.5" fill="#6b5d0f" text-anchor="end" font-weight="700">(1.8, 2.4)</text>
    <text x="${X(3.7)}" y="${Y(1.6)}" font-size="11.5" fill="#B45309" font-weight="600">residual</text>
    <text x="180" y="270" font-size="12" fill="#64748B" text-anchor="middle">the right angle is not a coincidence — it is the definition of "closest"</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The projection of <strong>b</strong> onto <strong>a</strong> is the point on a's line that sits nearest
    to b. What makes it nearest is the right angle: the dashed error meets the line perpendicularly.
    Slide the yellow point anywhere else and the error gets longer.
  </figcaption>
</figure>`;

const body = [
  p("There is a moment in first-year linear algebra where the course quietly changes the question, and students who miss the change spend the rest of the term confused."),
  p("Early on, a system of equations has an answer, and you find it. Then one day the answer is a plane, or a line, or a description rather than a point — and the exam is no longer asking what x is. It is asking what the set of all solutions looks like. That is a different kind of question, and no amount of extra row-reducing prepares you for it."),
  linked(["This guide is about that half of the course: rank, solution sets, and the projections that turn out to be what regression really is. If it is the geometry of matrices that is not landing — determinants, eigenvectors — we cover that in our ", { text: "guide to linear algebra fundamentals", href: "/blog/university-mathematics-linear-algebra-ubc-math-152" }, ", and it is worth reading first."]),

  h2("Rank counts how much information a matrix really carries"),
  p("The rank of a matrix is the number of genuinely independent rows it has — how many of them are telling you something new."),
  math(String.raw`A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{bmatrix}`),
  p("Two rows. But the second is just twice the first — it contains no information the first did not already give you. Written as equations, \"x + 2y + 3z = 0\" and \"2x + 4y + 6z = 0\" are the same constraint said twice, at different volumes. So the rank is 1, not 2."),
  p("This matters because rank is what actually determines whether a system is solvable and how many solutions it has. Counting equations tells you nothing: you can write down a hundred equations that are all the same equation, and you have still only constrained one thing."),

  h2("Rank-nullity: the course's tidiest idea"),
  p("The null space is everything the matrix sends to zero — the directions it destroys. Its dimension is called the nullity, and it is tied to the rank by an equation that is exactly as neat as it looks:"),
  math(String.raw`\text{rank} + \text{nullity} = n`),
  mp(["where n is the number of columns — the dimension you started in. And it says something almost obvious once you hear it plainly: every dimension you feed in either survives or dies. The rank counts the survivors, the nullity counts the casualties, and together they must account for all of them. Nothing goes missing."]),
  mp(["For A above: three columns, rank 1, so the nullity is 2. And indeed the null space is the set of ", im(String.raw`(x,y,z)`), " with ", im(String.raw`x + 2y + 3z = 0`), " — a plane through the origin, which is 2-dimensional. Two whole dimensions get crushed to a point, and one survives."]),
  p("Once you have that, a family of exam questions collapses into arithmetic. \"Can this transformation be one-to-one?\" Only if nothing dies — nullity 0, so rank must equal n. \"Can it be onto?\" Only if the survivors fill the target space. Students memorise those as separate conditions; they are one sentence with the numbers moved around."),

  h2("What a solution set actually looks like"),
  p("Here is where the change of question happens, and it has a shape worth carrying."),
  p("Solve Ax = b and you do not get a point — you get a point plus everything the matrix ignores:"),
  math(String.raw`\mathbf{x} = \mathbf{x}_p + \mathbf{x}_h`),
  mp(["One particular solution ", im(String.raw`\mathbf{x}_p`), " that works, plus anything in the null space ", im(String.raw`\mathbf{x}_h`), ", because adding something the matrix sends to zero cannot change the output. Add nothing to b, and you land in the same place."]),
  p("So the geometry of the answer is decided entirely by the null space. Nullity 0 means exactly one solution. Nullity 1 means a line of them. Nullity 2 means a plane. There is never \"a few\" — it is one, none, or infinitely many, and the null space tells you which before you have finished solving."),
  p("This is also why \"free variables\" in a row-reduced matrix are not an accident of the method. Each free variable is a dimension the matrix could not see, and it is a basis vector for the null space. The algorithm was showing you the null space all along."),

  h2("Projection: finding the closest thing to an answer"),
  p("Now the part that makes the course worth taking, and it starts with a problem that sounds like failure."),
  p("What do you do when Ax = b has no solution at all? In school you would write \"no solution\" and stop. In practice — and this is nearly always the practical case, because real data does not sit exactly on a line — you find the closest thing to a solution instead."),
  h3("First, what the dot product is really for"),
  p("The projection formula looks arbitrary until you know what the dot product measures, and most students only ever learn it as \"multiply the matching components and add\"."),
  p("It measures alignment. That is the whole meaning:"),
  math(String.raw`\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta`),
  mp(["Pointing the same way gives the biggest value. Perpendicular gives exactly zero — which is why \"dot product is zero\" and \"at right angles\" are the same statement, and why you can test perpendicularity without ever finding an angle. Pointing opposite ways gives the most negative value."]),
  mp(["Check it on our vectors: ", im(String.raw`\mathbf{a}\cdot\mathbf{b} = 15`), ", and both have length 5, so ", im(String.raw`\cos\theta = 15/25 = 0.6`), ", giving ", im(String.raw`\theta = 53.13^\circ`), ". And independently, (3,4) sits at ", im(String.raw`\arctan(4/3) = 53.13^\circ`), " from the x-axis, where b lies. The same angle, two ways."]),
  p("So when the projection formula divides by a·a, it is dividing by a's length squared — normalising, so the answer does not change if you write a as (6, 8) instead. It is not an arbitrary denominator; it is the formula refusing to care how long you drew the arrow."),
  p("Now project b onto a:"),
  math(String.raw`\text{proj}_{\mathbf{a}}\mathbf{b} = \frac{\mathbf{a} \cdot \mathbf{b}}{\mathbf{a} \cdot \mathbf{a}}\,\mathbf{a}`),
  mp(["With ", im(String.raw`\mathbf{a} = (3,4)`), " and ", im(String.raw`\mathbf{b} = (5,0)`), ": ", im(String.raw`\mathbf{a}\cdot\mathbf{b} = 15`), ", ", im(String.raw`\mathbf{a}\cdot\mathbf{a} = 25`), ", so the projection is ", im(String.raw`0.6(3,4) = (1.8, 2.4)`), "."]),
  { _type: "htmlBlock", _key: key(), html: projSvg },
  mp(["The residual — what is left over — is ", im(String.raw`(5,0) - (1.8,2.4) = (3.2,-2.4)`), ". And now check the one thing that matters:"]),
  math(String.raw`(3.2)(3) + (-2.4)(4) = 9.6 - 9.6 = 0`),
  p("Perpendicular. That right angle is not a decorative feature of the diagram — it is the entire reason the projection is the closest point. If the error were not perpendicular, it would have some component along the line, and you could slide along the line and do better. Being unable to improve is exactly what \"perpendicular error\" means, and it is why the ugly-looking formula is the right one."),

  h2("Least squares is a projection, and so is every regression you will ever run"),
  p("Now scale that idea up, and a whole applied field falls out of it."),
  p("Fit a straight line through (1, 1), (2, 2) and (3, 2). No line passes through all three — the points are not collinear, and the line through the first and last predicts 1.5 at x = 2 where the actual value is 2. As a system of equations, this has no solution."),
  p("So do not solve it. Project instead — find the line whose errors are perpendicular to everything you could adjust:"),
  math(String.raw`m = \frac{n\sum xy - \sum x \sum y}{n\sum x^2 - (\sum x)^2} = \frac{3(11) - (6)(5)}{3(14) - 36} = \frac{3}{6} = 0.5`),
  math(String.raw`c = \frac{\sum y - m\sum x}{n} = \frac{5 - 3}{3} = 0.667`),
  mp(["The best line is ", im(String.raw`y = 0.5x + 0.667`), ", with residuals ", im(String.raw`-0.167, +0.333, -0.167`), ". Two checks confirm it. First, those residuals sum to exactly zero — the signature of a least-squares fit with an intercept, and a free error check on any regression you ever do. Second, nudge the slope in either direction and the sum of squared errors rises from 0.167. It is a genuine minimum, not merely a formula that produced a number."]),
  p("And here is the thing worth taking away from the whole course: that is linear regression. The formula in your statistics textbook, the trendline in a spreadsheet, the fit in every lab report, the machine-learning model — all of it is this projection, done in more dimensions. Linear algebra did not borrow the idea from statistics. Statistics is standing on it."),

  h2("Where the marks actually go"),
  mli(["Counting equations instead of computing rank. Ten copies of one equation constrain one thing."]),
  mli(["Giving a single solution when the answer is a set. If there are free variables, the answer has a parameter in it, and a bare point is not the answer."]),
  mli(["Treating the null space as an abstraction. It is the reason the solution set has the shape it has, and it is where the free variables live."]),
  mli(["Memorising the projection formula without the right angle. The formula is forgettable; \"the error must be perpendicular or you could do better\" is not, and it reconstructs the formula."]),
  mli(["Answering \"how many solutions?\" by solving. Rank and nullity answer it faster and more reliably than the arithmetic does."]),

  h2("How to study this half"),
  mli(["For every computation, say what shape the answer is. Point, line, plane. If you cannot, you have not answered the question that will be asked."]),
  mli(["Do everything in 2D or 3D first, where you can draw it. Every idea here is visible with two or three arrows, and the theorem you are examined on is the same one."]),
  mli(["Connect it to something real. Least squares is the bridge — once you see that regression is a projection, the abstraction stops feeling arbitrary and starts feeling like the point."]),
  mli(["Check the residual sum on any fit. Zero, or you have made an arithmetic error."]),

  h2("Getting help with linear algebra"),
  linked(["If you can row-reduce faultlessly and still lose marks on \"describe the solution set\", that is a specific problem with a specific fix, and it is the most common one in this course. Our ", { text: "one-on-one linear algebra help", href: "/linear-algebra-tutor-online-canada" }, " works from your actual assignments and past midterms."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, and online suits this material particularly well — the working stays on screen to re-read. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent problem set."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 725)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${body.filter((b) => b._type === "htmlBlock").length} inline SVG`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ dead link(s): ${dead.join(", ")}`); process.exit(1); }
  console.log(`  links ok  : all ${links.length} resolve ✓`);
  if (/(midterm|exam) (is|will be) on|syllabus (says|states)|Professor [A-Z]|covers chapters|transfer(s)? to UBC/i.test(text)) {
    console.error("  ✗ unverifiable institutional claim — refusing."); process.exit(1);
  }
  console.log("  sourcing  : no syllabus/schedule/transfer claims ✓");
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  const sibling = await client.fetch(`*[_type=="post" && slug.current=="university-mathematics-linear-algebra-ubc-math-152"][0].body[].children[].text`);
  const sibText = (sibling || []).join(" ");
  const shingles = (s) => { const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/); const out = new Set(); for (let i = 0; i + 7 <= w.length; i++) out.add(w.slice(i, i + 7).join(" ")); return out; };
  const a = shingles(text), b = shingles(sibText);
  const shared = [...a].filter((x) => b.has(x)).length;
  const overlap = (shared / Math.min(a.size, b.size)) * 100;
  console.log(`  vs UBC post: ${shared} shared 7-word runs (${overlap.toFixed(2)}% overlap)`);
  if (overlap > 3) { console.error("  ✗ too similar to the sibling article."); process.exit(1); }

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ published post not found"); process.exit(1); }
  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ upgraded (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
