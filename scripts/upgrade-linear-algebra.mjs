/**
 * "Linear Algebra (UBC MATH 152)" (712 -> 1,500+).
 *
 * Full rebuild. The old version was the auto-generated template — "The Big
 * Picture / Concepts That Matter Most / Study Tips That Actually Work" — with
 * 712 words and ZERO equations. A linear algebra article with no maths in it is
 * not credible to the student searching for it.
 *
 * The course code is in the existing slug and title, so it stays. No NEW
 * institutional claims are made: no syllabus, no midterm dates, no professor
 * names, no claims about what MATH 152 covers in a given term.
 *
 * Maths verified numerically first (scripts/verify-linear-algebra.mjs) — which
 * caught a draft that said det[[2,1],[1,2]] = 5. It is 3.
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-linear-algebra.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-linear-algebra.mjs --commit
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "university-mathematics-linear-algebra-ubc-math-152";

/* A = [[2,1],[1,3]] on the unit square. Verified: i->(2,1), j->(1,3), (1,1)->(3,4), area 1 -> 5 = det A. */
const U = 42, OX = 50, OY = 250;
const P = (x, y) => `${OX + x * U},${OY - y * U}`;
const transformSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 380 300" role="img" aria-label="The unit square, with corners at origin, one comma zero, one comma one, and zero comma one, is transformed by the matrix with columns two comma one and one comma three. It becomes a parallelogram with corners at origin, two comma one, three comma four, and one comma three. The square had area one; the parallelogram has area five, which is exactly the determinant of the matrix." style="width:100%;max-width:380px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="${OX - 20}" y1="${OY}" x2="${OX + 4.6 * U}" y2="${OY}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${OX}" y1="${OY + 20}" x2="${OX}" y2="${OY - 4.6 * U}" stroke="#CBD5E1" stroke-width="1.5"/>
    <polygon points="${P(0, 0)} ${P(2, 1)} ${P(3, 4)} ${P(1, 3)}" fill="#3A5A98" fill-opacity="0.16" stroke="#3A5A98" stroke-width="2.5"/>
    <polygon points="${P(0, 0)} ${P(1, 0)} ${P(1, 1)} ${P(0, 1)}" fill="#F4E98B" fill-opacity="0.9" stroke="#8a7b1f" stroke-width="2"/>
    <text x="${OX + 0.5 * U}" y="${OY - 0.42 * U}" font-size="11" fill="#6b5d0f" text-anchor="middle" font-weight="700">area 1</text>
    <text x="${OX + 1.7 * U}" y="${OY - 2.1 * U}" font-size="13" fill="#3A5A98" text-anchor="middle" font-weight="700">area 5</text>
    <text x="${OX + 1.7 * U}" y="${OY - 1.75 * U}" font-size="10.5" fill="#3A5A98" text-anchor="middle">= det A</text>
    <circle cx="${OX + 2 * U}" cy="${OY - 1 * U}" r="3.5" fill="#3A5A98"/>
    <circle cx="${OX + 1 * U}" cy="${OY - 3 * U}" r="3.5" fill="#3A5A98"/>
    <circle cx="${OX + 3 * U}" cy="${OY - 4 * U}" r="3.5" fill="#3A5A98"/>
    <text x="${OX + 2 * U + 7}" y="${OY - 1 * U + 15}" font-size="11" fill="#3A5A98">(2, 1)</text>
    <text x="${OX + 1 * U - 7}" y="${OY - 3 * U - 6}" font-size="11" fill="#3A5A98" text-anchor="end">(1, 3)</text>
    <text x="${OX + 3 * U + 6}" y="${OY - 4 * U + 4}" font-size="11" fill="#3A5A98">(3, 4)</text>
    <text x="${OX + 1 * U + 6}" y="${OY + 15}" font-size="10.5" fill="#8a7b1f">(1, 0)</text>
    <text x="190" y="288" font-size="12" fill="#64748B" text-anchor="middle">the columns of A are just where i and j land</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    A matrix is not a grid of numbers — it is an instruction for moving space. Its columns say
    exactly where the two basis vectors go: <strong>(1,&nbsp;0) → (2,&nbsp;1)</strong> and
    <strong>(0,&nbsp;1) → (1,&nbsp;3)</strong>. The yellow square becomes the blue parallelogram,
    and the area grows by a factor of 5 — which is the determinant.
  </figcaption>
</figure>`;

const body = [
  p("Linear algebra is where good calculus students fall over, and the reason is not that it is harder. It is that it is not calculus."),
  p("Calculus rewarded a specific skill: follow the procedure carefully and you get the mark. Linear algebra looks like it works the same way — there are certainly procedures — but the exam questions are about what the procedures mean. A student can row-reduce flawlessly and still not answer \"is this set of vectors a basis?\", because that question is not asking for a computation."),
  linked(["So the failure is usually not effort. It is studying it like calculus. If that is the term you are having, our ", { text: "linear algebra tutoring", href: "/linear-algebra-tutor-online-canada" }, " starts by rebuilding the picture underneath the procedures."]),

  h2("A matrix is a function, not a grid of numbers"),
  p("This is the reframe the whole course rests on, and almost nobody is handed it explicitly."),
  p("A matrix does not sit there being a table. It does something: it takes a vector in, and gives a different vector out. It is a function whose input and output happen to be arrows rather than numbers."),
  mp(["And its columns are not arbitrary — they tell you exactly where the basis vectors land. Take:"]),
  math(String.raw`A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}`),
  mp(["Feed it ", im(String.raw`\mathbf{i} = (1,0)`), " and you get ", im(String.raw`(2,1)`), " — the first column. Feed it ", im(String.raw`\mathbf{j} = (0,1)`), " and you get ", im(String.raw`(1,3)`), " — the second. That is not a coincidence, it is what matrix multiplication is."]),
  p("Once you see that, matrix multiplication stops being a rule about rows and columns and becomes obvious: to find where any vector goes, you only need to know where i and j went, because every vector is built from them."),
  { _type: "htmlBlock", _key: key(), html: transformSvg },

  h2("The determinant is an area, and that explains everything about it"),
  p("The determinant gets taught as an arithmetic recipe — ad minus bc, and for 3×3 an unpleasant expansion. Students learn to compute it and never learn what it is."),
  math(String.raw`\det A = (2)(3) - (1)(1) = 5`),
  p("It is the factor by which the transformation scales area. Look at the picture: the unit square had area 1, and its image has area 5. Feed in any region at all and its area comes out multiplied by 5."),
  h3("Which is why det = 0 is the most important number in the course"),
  mp(["Now take a different matrix:"]),
  math(String.raw`B = \begin{bmatrix} 2 & 1 \\ 4 & 2 \end{bmatrix}, \qquad \det B = (2)(2) - (1)(4) = 0`),
  mp(["Where do the basis vectors go? ", im(String.raw`\mathbf{i} \to (2,4)`), " and ", im(String.raw`\mathbf{j} \to (1,2)`), ". But those two are parallel — ", im(String.raw`(2,4) = 2(1,2)`), ". Both basis vectors land on the same line, so everything lands on that line. The whole plane gets flattened."]),
  p("Area 1 becomes area 0. Hence a determinant of zero. And now every fact you were asked to memorise about singular matrices stops being a list:"),
  mli(["Not invertible — because you cannot undo a collapse. Once the plane is squashed onto a line, the information about which point came from where is gone. B sends (1,−2) to the origin, and it sends the origin to the origin: two different inputs, same output. No function can reverse that."]),
  mli(["Columns are linearly dependent — that is just \"the columns are parallel\", said formally."]),
  mli(["Ax = 0 has non-zero solutions — because (1,−2) is one, and it is exactly the direction that got crushed."]),
  mli(["The system may have no solution or infinitely many, never exactly one."]),
  p("Those are not four facts. They are one fact, described from four angles, and the fact is: it collapsed. This is the single highest-value idea in first-year linear algebra, and it converts an entire chapter of memorisation into a picture."),

  h2("Row reduction is elimination with the letters removed"),
  p("Gaussian elimination looks like a new algorithm and is not. It is the method you used in Grade 10 to solve two equations in two unknowns, with the bookkeeping stripped out."),
  math(String.raw`2x + y = 5, \qquad x + 3y = 10`),
  p("You would eliminate a variable, back-substitute, and get x = 1, y = 3. Row reduction does exactly that, but writes only the numbers, because the x and the y were never doing any work:"),
  math(String.raw`\begin{bmatrix} 2 & 1 & | & 5 \\ 1 & 3 & | & 10 \end{bmatrix}`),
  p("The three legal row operations — swap two rows, scale a row, add a multiple of one row to another — are just the three things you were always allowed to do to equations. Nothing new is being claimed."),
  mp(["What is new is the vocabulary that comes after, and this is where the course actually tests you. The system above has ", im(String.raw`\det A = 5 \neq 0`), ", so it has exactly one solution — and indeed ", im(String.raw`A(1,3) = (5,10)`), " ✓. Had the determinant been zero, the two lines would have been parallel: either the same line (infinitely many solutions) or never meeting (none). The determinant tells you which situation you are in before you compute anything."]),
  p("So the practical advice is unglamorous and it works: after row-reducing, substitute your answer back into the original equations. Row reduction has no partial credit downstream — one bad fraction in row two and every line after it is wasted, and you will not notice. Thirty seconds of checking saves the question."),

  h2("Eigenvectors: the directions that survive"),
  p("Eigenvectors have a reputation for being where the course turns abstract. The definition is actually concrete, and it is easier to see than to say."),
  p("Most vectors, when you apply a matrix, get rotated as well as stretched — they come out pointing somewhere new. Eigenvectors are the exceptional directions that do not turn. They get longer or shorter, possibly flipped, but they stay on their own line."),
  math(String.raw`A\mathbf{v} = \lambda \mathbf{v}`),
  mp(["That equation says it exactly: applying the matrix does the same thing to v as simply scaling it by a number. Take:"]),
  math(String.raw`C = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}`),
  mp(["Try ", im(String.raw`(1,1)`), ": you get ", im(String.raw`(3,3)`), ", which is ", im(String.raw`3(1,1)`), ". Same direction, three times as long — an eigenvector with eigenvalue 3. Try ", im(String.raw`(1,-1)`), ": you get ", im(String.raw`(1,-1)`), " back unchanged — an eigenvector with eigenvalue 1."]),
  mp(["Now try a vector that is not special, say ", im(String.raw`(1,0)`), ": you get ", im(String.raw`(2,1)`), ", which points somewhere else entirely. It rotated. That is what ordinary vectors do, and it is what makes the eigenvectors worth naming."]),
  h3("Two free checks you should always use"),
  mp(["The eigenvalues must multiply to the determinant and add to the trace. For C: ", im(String.raw`\det C = (2)(2)-(1)(1) = 3`), " and ", im(String.raw`3 \times 1 = 3`), " ✓. The trace is ", im(String.raw`2 + 2 = 4`), " and ", im(String.raw`3 + 1 = 4`), " ✓."]),
  p("Both take five seconds and catch most arithmetic errors in an eigenvalue question. Use them every time — the characteristic polynomial is where sign errors breed."),

  h2("Span and basis, in one paragraph"),
  p("Two words that sound abstract and describe something you can see. The span of a set of vectors is everywhere you can reach by scaling and adding them. One vector spans a line — its own line, and nothing else. Two vectors that point in different directions span the whole plane, because any point can be reached by taking some of each. But two parallel vectors still span only a line, because adding more of something you already have gets you nowhere new."),
  p("A basis is the efficient version: enough vectors to reach everything, with none spare. The columns of A span the plane and neither is redundant, so they are a basis. The columns of B are parallel, so they reach only a line and one of them is dead weight — not a basis. That is the same collapse from the previous section, asked with different words, which is exactly what the exam does."),

  h2("Where the marks actually go"),
  mli(["Computing perfectly, then failing the conceptual half. \"Is this a basis?\", \"what is the rank?\", \"is this transformation onto?\" — these want reasons, not arithmetic. Most of the lost marks live here."]),
  mli(["Treating a matrix as a table. Every time you are stuck, ask what it does to space. It usually answers the question."]),
  mli(["Arithmetic slips in row reduction. There is no partial credit downstream of a wrong row — one bad fraction and the rest of the page is wasted. Check by substituting your answer back; it costs thirty seconds."]),
  mli(["Memorising the invertibility list instead of understanding the collapse. If you have to recall which of six statements are equivalent, you have already lost the time."]),

  h2("How to study it, given all that"),
  mli(["Draw everything in 2D. Every idea in the course — span, basis, rank, null space, eigenvectors — is visible with two arrows on paper. The 2×2 case is not a toy; it is the same theorem you will be examined on in higher dimensions, where you cannot see it any more."]),
  mli(["After every computation, say what it means in one sentence. \"The determinant is 0, so this transformation flattens space, so it is not invertible.\" If you cannot say the sentence, you have done arithmetic rather than linear algebra."]),
  mli(["Do the proofs, even briefly. Unlike first-year calculus, this course examines reasoning, and the only way to practise reasoning is to reason."]),
  mli(["Check with the trace and determinant, always."]),

  h2("Why it matters more than it looks"),
  p("Linear algebra is quietly the most applied mathematics you will meet. Every graphics engine is matrices moving space. Every regression is a projection. Every structural analysis is a linear system. Machine learning is essentially linear algebra with an optimiser attached — an eigenvector is what a principal component is."),
  linked(["It also pairs with calculus rather than replacing it: gradients, Jacobians and multivariable optimisation all assume you own this material. If calculus is the other course going badly this term, we wrote about ", { text: "what to review before a first calculus midterm", href: "/blog/what-ubc-calculus-students-should-review-before-first-midterm" }, "."]),

  h2("Getting help with linear algebra"),
  linked(["If the computations are fine and the concept questions are not, that is a specific, fixable problem — and it is the most common one in this course. Our ", { text: "one-on-one linear algebra help", href: "/linear-algebra-tutor-online-canada" }, " works from your actual problem sets and past midterms, at the pace the course actually moves."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, and online suits this material well — the working stays on screen and you can re-read it afterwards. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 712)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${body.filter((b) => b._type === "htmlBlock").length} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ link(s) point at routes that do not exist: ${dead.join(", ")}`); process.exit(1); }
  console.log(`  links ok  : all ${links.length} resolve to real routes ✓`);
  // The slug/title already carry MATH 152. Do not invent syllabus or schedule claims.
  if (/(midterm|exam) (is|will be) on|syllabus (says|states)|Professor [A-Z]|covers chapters/i.test(text)) {
    console.error("  ✗ unverifiable institutional claim — refusing."); process.exit(1);
  }
  console.log("  sourcing  : no syllabus/schedule/instructor claims ✓");
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

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
