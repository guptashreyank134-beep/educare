/**
 * "Exponential & Logarithmic Functions" (518 -> 1,500+).
 *
 * Full rebuild — at 518 words there was not enough to preserve.
 *
 * Maths verified numerically first (scripts/verify-exp-log.mjs), including every
 * plotted point on both curves.
 *
 * The SVG shows y=2^x and y=log₂x reflected in y=x, because "logs are the
 * inverse of exponentials" is a sentence students repeat and do not believe
 * until they see the fold.
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-exp-log.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-exp-log.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "pre-calculus-exponential-logarithmic-functions";

/* Verified: every point below satisfies its equation, and swapping (x,y) maps one curve to the other. */
const X = (x) => Math.round((90 + x * 30) * 10) / 10;
const Y = (y) => Math.round((270 - y * 30) * 10) / 10;
const path = (f, from, to, step) => {
  let d = "";
  for (let t = from; t <= to + 1e-9; t += step) d += `${d ? " L" : "M"} ${X(t)} ${Y(f(t))}`;
  return d;
};
const expPath = path((x) => 2 ** x, -2.5, 3.08, 0.08);
const logPath = path((x) => Math.log2(x), 0.18, 8.5, 0.08);

const dot = (x, y, fill) => `<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="${fill}"/>`;

const reflectSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 360 372" role="img" aria-label="Graphs of y equals two to the x and y equals log base two of x, drawn with the dashed line y equals x between them. The two curves are mirror images across that line. The point zero comma one on the exponential corresponds to the point one comma zero on the logarithm, and two comma four corresponds to four comma two — the coordinates simply swap." style="width:100%;max-width:360px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="${X(-2.5)}" y1="${Y(0)}" x2="${X(8.5)}" y2="${Y(0)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${X(0)}" y1="${Y(-2.5)}" x2="${X(0)}" y2="${Y(8.5)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${X(-2.5)}" y1="${Y(-2.5)}" x2="${X(8.5)}" y2="${Y(8.5)}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6 5"/>
    <text x="${X(7.4)}" y="${Y(7.9)}" font-size="12" fill="#64748B">y = x</text>
    <path d="${expPath}" fill="none" stroke="#3A5A98" stroke-width="2.5"/>
    <path d="${logPath}" fill="none" stroke="#B45309" stroke-width="2.5"/>
    <text x="${X(2.1)}" y="${Y(7.4)}" font-size="12" fill="#3A5A98" font-weight="600">y = 2ˣ</text>
    <text x="${X(6.1)}" y="${Y(3.3)}" font-size="12" fill="#B45309" font-weight="600">y = log₂x</text>
    ${dot(0, 1, "#3A5A98")}${dot(1, 0, "#B45309")}
    ${dot(2, 4, "#3A5A98")}${dot(4, 2, "#B45309")}
    <text x="${X(0) - 8}" y="${Y(1) - 7}" font-size="11" fill="#3A5A98" text-anchor="end">(0, 1)</text>
    <text x="${X(1) + 7}" y="${Y(0) + 15}" font-size="11" fill="#B45309">(1, 0)</text>
    <text x="${X(2) - 8}" y="${Y(4) - 7}" font-size="11" fill="#3A5A98" text-anchor="end">(2, 4)</text>
    <text x="${X(4) + 7}" y="${Y(2) + 14}" font-size="11" fill="#B45309">(4, 2)</text>
    <text x="180" y="360" font-size="12" fill="#64748B" text-anchor="middle">fold the page along the dashed line and the curves land on each other</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Two curves, one relationship. Every point on one has a twin on the other with the coordinates
    swapped — (2,&nbsp;4) becomes (4,&nbsp;2). That is what "inverse" means, and it is why
    <strong>log₂x is undefined for x ≤ 0</strong>: the blue curve never gets there, so the orange one has
    nothing to reflect.
  </figcaption>
</figure>`;

const body = [
  p("Logarithms have a reputation for being arbitrary — a button on the calculator, a set of laws to memorise, a unit to survive. Students get through the chapter by pattern-matching and quietly hope the topic does not come back."),
  p("It comes back. It is in Calculus 12, in first-year calculus, in chemistry, and in every compound-interest question anyone will ever ask you. And the reputation is undeserved, because underneath there is exactly one idea."),
  linked(["That idea takes about a minute. If this unit is going badly, it is almost always because that minute got skipped — which is what ", { text: "Pre-Calculus 12 tutoring", href: "/pre-calculus-12-tutor-burnaby" }, " tends to start with."]),

  h2("The one idea: a logarithm is an exponent"),
  p("That is the whole thing. A logarithm is not a new kind of operation. It is the answer to a question you already know how to ask."),
  math(String.raw`2^3 = 8`),
  p("Now ask the same fact backwards. \"What power do I raise 2 to, in order to get 8?\" The answer is 3, and the notation for that question is:"),
  math(String.raw`\log_2 8 = 3`),
  p("Identical fact. Same three numbers, same relationship, rearranged. So any log statement can be rewritten as an exponent statement and vice versa:"),
  math(String.raw`\log_b x = y \quad \Longleftrightarrow \quad b^y = x`),
  p("If you take one thing from this page, take that line. Written on the top of the page in an exam, it turns most of the unit into translation. Students who are stuck on a log question are almost always stuck because they are trying to think about logs; the ones who are fine have quietly converted it to an exponent and are looking at something familiar."),
  p("Two consequences drop straight out and they are worth knowing on sight:"),
  math(String.raw`b^{\log_b x} = x \qquad \text{and} \qquad \log_b(b^x) = x`),
  p("They look like rules to learn. They are just the sentence \"these two operations undo each other\", written in symbols. Raise 2 to the power that gets you 8, and you get 8. Of course you do."),

  h2("Why anyone invented them"),
  p("Logarithms exist to solve for an exponent. That is the job, and nothing else does it."),
  math(String.raw`3^x = 20`),
  p("Try to solve that with the algebra you already have and you cannot. You cannot divide by 3 — x is not a factor, it is an exponent, and division does not reach it. Every tool from earlier years fails, because the unknown is in a place none of them can touch."),
  p("So take the log of both sides, use the power law, and the exponent comes down where you can get at it:"),
  math(String.raw`x \ln 3 = \ln 20 \quad \Longrightarrow \quad x = \frac{\ln 20}{\ln 3} = 2.727`),
  mp(["Check it: ", im(String.raw`3^{2.727} = 20`), ". ✓"]),
  p("That move — bring the exponent down — is what logarithms are for. Everything else in the unit is support for that one manoeuvre."),

  h2("The picture: two curves, one relationship"),
  p("\"The logarithm is the inverse of the exponential\" is a sentence students repeat and mostly do not believe. Here is the version you can see."),
  { _type: "htmlBlock", _key: key(), html: reflectSvg },
  p("The two curves are mirror images across the dashed line. Fold the page along y = x and they land on each other exactly. Every point has a twin with its coordinates swapped: (0, 1) becomes (1, 0); (2, 4) becomes (4, 2)."),
  h3("And this explains the domain"),
  mp(["Students are told ", im(String.raw`\log_2 x`), " is undefined for ", im(String.raw`x \leq 0`), " and dutifully accept it. The picture explains why, in one glance."]),
  mp(["Look at the blue curve. ", im(String.raw`2^x`), " is never zero and never negative — it gets small, it flattens toward the axis, it never touches it. Ask for ", im(String.raw`2^x = -8`), " and there is no answer, because no power of 2 is negative. So when you reflect that curve, the orange one has nothing to reflect at ", im(String.raw`x \leq 0`), ". The hole in the log's domain is the exponential's range, mirrored."]),
  p("This is not a rule that had to be memorised. It is a fact about the picture, and it is why the domain check at the end of a log question is not bureaucracy — it is the only thing standing between you and an answer that does not exist."),

  h2("The laws, and the one that is not a law"),
  p("Three laws, and each is an exponent rule wearing a disguise."),
  math(String.raw`\log(ab) = \log a + \log b`),
  math(String.raw`\log\!\left(\frac{a}{b}\right) = \log a - \log b`),
  math(String.raw`\log(a^n) = n \log a`),
  p("Check the first: log(4 × 25) = log 100 = 2, and log 4 + log 25 = 0.602 + 1.398 = 2. ✓ And notice what it is really saying — multiplying the numbers adds their logs. That is the entire reason logarithms were invented in the seventeenth century: they turn multiplication into addition, which before calculators was the difference between an afternoon and a minute."),
  p("Now the one that ends more Pre-Calculus 12 questions than any other:"),
  math(String.raw`\log(a+b) \neq \log a + \log b`),
  mp(["Test it. ", im(String.raw`\log 20 = 1.301`), ", while ", im(String.raw`\log 10 + \log 10 = 2`), ". Not close. The real law is about products; there is no law at all for sums, and log(a+b) simply does not break apart. If you find yourself splitting a log across a plus sign, stop — you are not doing algebra, you are inventing it."]),
  linked(["This belongs to a bigger family of errors worth knowing by name. We catalogued them in ", { text: "the ten mistakes that cost the most marks in Pre-Calculus 12", href: "/blog/common-pre-calculus-12-mistakes-burnaby" }, "."]),

  h3("What is e, anyway?"),
  mp(["We have been writing ", im(String.raw`\ln`), " without saying what it is. ", im(String.raw`\ln x`), " is just ", im(String.raw`\log_e x`), " — a logarithm like any other, with an odd-looking base of 2.71828…"]),
  p("Which raises the fair question students rarely get answered: where does that number come from, and why would anyone choose it? It is not arbitrary, and the answer is sitting in the compound interest we were just doing."),
  p("Put $1 in an account paying 100% a year. Compounded once, you end with $2. Now compound it more often — the rate is split, but it is applied more times:"),
  mli(["Quarterly: (1 + 1/4)⁴ = $2.4414"]),
  mli(["Monthly: (1 + 1/12)¹² = $2.6130"]),
  mli(["Daily: (1 + 1/365)³⁶⁵ = $2.7146"]),
  mli(["Hourly: (1 + 1/8760)⁸⁷⁶⁰ = $2.7181"]),
  p("Compounding faster earns more — but look at the numbers. They are slowing down. They are closing on something rather than running away, and no matter how often you compound, you never reach $2.72:"),
  math(String.raw`\lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n = e = 2.71828\ldots`),
  p("That is e. It is what continuous growth converges to — the answer to \"what if the compounding never stops?\" And the striking part is that it is finite. Infinitely frequent compounding does not give infinite money; it gives $2.72. Nature has a speed limit on that kind of growth, and e is the number at it."),
  p("Which is why e is the natural base rather than a mathematician's affectation. Anything growing in proportion to its own size — money, bacteria, a decaying isotope, a cooling cup of coffee — is doing this, and e is the constant that falls out of it."),
  h3("Change of base"),
  p("Your calculator offers log (base 10) and ln (base e), and the question wants base 2. So convert:"),
  math(String.raw`\log_b x = \frac{\ln x}{\ln b}`),
  mp(["So ", im(String.raw`\log_2 10 = \ln 10 / \ln 2 = 3.322`), ", and checking, ", im(String.raw`2^{3.322} = 10`), ". ✓ The base on the bottom is the base you want. Get that upside down and every answer is a plausible-looking reciprocal."]),

  h2("Where this is actually used"),
  p("Two examples, because this is one of the rare Pre-Calculus topics where the applications are not contrived."),
  h3("How long to double your money"),
  mp(["At 5% a year, ", im(String.raw`1.05^t = 2`), ". Solve for the exponent:"]),
  math(String.raw`t = \frac{\ln 2}{\ln 1.05} = 14.2 \ \text{years}`),
  p("Notice what is not in that calculation: the amount of money. It cancels. $1,000 and $100,000 both take 14.2 years to double at 5%, which is the sort of fact that sounds wrong and is not. (Bankers use \"70 divided by the rate\" as a shortcut — 70/5 = 14, and now you know where their 70 comes from.)"),
  h3("Carbon dating"),
  mp(["Carbon-14 has a half-life of 5,730 years, so the fraction left after t years is ", im(String.raw`(1/2)^{t/5730}`), ". A sample with 25% remaining:"]),
  math(String.raw`t = 5730 \cdot \frac{\ln 0.25}{\ln 0.5} = 11{,}460 \ \text{years}`),
  p("Which is two half-lives, as it must be — a good sign the algebra is right. But the method handles the awkward numbers too: 70% remaining gives about 2,950 years, and no amount of halving-in-your-head gets you that. That is the point of having the equation."),

  h2("Two to try"),
  h3("1. The domain trap"),
  math(String.raw`\log_2 x + \log_2(x-2) = 3`),
  p("Combine using the product law, then convert to exponent form:"),
  math(String.raw`\log_2\left(x(x-2)\right) = 3 \quad \Longrightarrow \quad x^2 - 2x = 2^3 = 8`),
  math(String.raw`x^2 - 2x - 8 = 0 \quad \Longrightarrow \quad (x-4)(x+2) = 0`),
  mp(["So x = 4 or x = −2. Check them in the ", im(String.raw`\textbf{original}`), ". x = 4: ", im(String.raw`\log_2 4 + \log_2 2 = 2 + 1 = 3`), " ✓. x = −2: that needs ", im(String.raw`\log_2(-2)`), ", which does not exist. ✗"]),
  p("Answer: x = 4 only. This question exists to check whether you discard the second root, and roughly half of students do not. The algebra was never the test."),
  h3("2. Solve for the exponent"),
  mp(["A population of 500 grows 8% a year. When does it pass 1,200? Set ", im(String.raw`500(1.08)^t = 1200`), ", so ", im(String.raw`1.08^t = 2.4`), ", and ", im(String.raw`t = \ln 2.4 / \ln 1.08 = 11.4`), " years. Same move every time: isolate the power, then log both sides."]),

  h2("Where marks actually go"),
  mli(["Splitting a log across a plus sign. Costs the question."]),
  mli(["Keeping a root that the domain forbids."]),
  mli(["Change of base upside down."]),
  mli(["Forgetting that the base must be positive and not 1 — a fact that looks pedantic until a question tests it."]),
  mli(["Trying to solve for an exponent with ordinary algebra, getting stuck, and assuming the question is broken. It is not; you just have not reached for the one tool that works."]),

  h2("Where it goes next"),
  linked(["Exponentials do not stop at Pre-Calculus 12 — they get more important. In calculus, ", { text: "the derivative", href: "/blog/mathematics-calculus-limits-derivatives" }, " of eˣ is eˣ, the only function that is its own rate of change, and that single property is why e turns up in every growth and decay model there is. Students who leave Grade 12 treating logs as a button struggle there, and it looks like a calculus problem."]),

  h2("Getting help with Pre-Calculus 12"),
  linked(["If this unit is not landing, the fix is usually smaller than it feels — most students are missing the one translation line at the top of this page, and everything downstream is a consequence. Our ", { text: "one-on-one Pre-Calculus 12 help", href: "/pre-calculus-12-tutor-burnaby" }, " starts by finding which line is missing rather than re-teaching the chapter."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 518)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }
  if (words < 1500) console.log(`  ! under the 1,500-word floor by ${1500 - words}`);

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
