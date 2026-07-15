/**
 * Flagship article: "A Step-by-Step Guide to Stoichiometry for Grade 11
 * Chemistry".
 *
 * DRAFT with reviewedByExpert = false. All arithmetic verified numerically in
 * scripts/verify-flagship-math.mjs; all LaTeX KaTeX-checked before writing.
 *
 *   Preview:  node --env-file=.env.local scripts/create-flagship-stoichiometry.mjs
 *   Apply:    node --env-file=.env.local scripts/create-flagship-stoichiometry.mjs --commit
 */
import { createArticle, commit, p, h2, h3, li, num, math, im, mp, mli, linked, span } from "./flagship-lib.mjs";

const body = [
  p("Stoichiometry is where Chemistry 11 sorts itself out. Students who understand it find the rest of the year mostly follows; students who half-understand it spend the next eight months fighting every calculation and never quite knowing why."),
  p("The good news is that stoichiometry is not many ideas. It is one idea — the mole — plus a procedure you can apply almost mechanically once the idea has landed. Most of the difficulty comes from learning the procedure before the idea, which works until a question is phrased in an unfamiliar way."),
  linked(["This guide does it in the useful order: the idea first, then the method, then worked examples and practice. If you would rather work through it with someone, our ", { text: "Chemistry 11 tutoring", href: "/chemistry-11-tutor-burnaby" }, " starts in exactly this place."]),

  h2("The one idea: a mole is a counting unit"),
  p("A mole is not a mass, or a volume, or anything chemical. It is a number — the way \"dozen\" is a number. A dozen eggs is 12 eggs; a mole of atoms is 6.022 × 10²³ atoms."),
  p("So why bother? Because reactions happen between individual particles, in whole-number ratios. Two hydrogen molecules react with one oxygen molecule. But you cannot count molecules in a lab — you can only weigh things. The mole is the bridge: it lets you count particles by weighing them."),
  p("That sentence is the whole subject. Everything below is bookkeeping on top of it."),
  math(String.raw`n = \frac{m}{M} \qquad \text{moles} = \frac{\text{mass in grams}}{\text{molar mass in g/mol}}`),
  mp(["Read that as a conversion between what you can measure (", im(String.raw`m`), ", grams on a balance) and what actually reacts (", im(String.raw`n`), ", a count of particles)."]),

  h2("The method: three steps, always the same"),
  p("Every mass-to-mass stoichiometry question is the same three moves, in the same order:"),
  num("Convert what you are given into moles."),
  num("Use the balanced equation's coefficients to convert moles of one substance into moles of another."),
  num("Convert those moles into whatever the question asks for — usually grams."),
  p("Grams to moles, ratio, moles to grams. The middle step is the only chemistry; the outer two are arithmetic. If you can say which step you are on, you can always say what to do next."),
  p("This is also why an unbalanced equation makes the whole thing collapse: step 2 has nothing to work with. Balance first, every time, before anything else."),

  h2("Worked example: burning methane"),
  mp(["How many grams of ", im(String.raw`\mathrm{CO_2}`), " are produced when ", im(String.raw`32.0\ \mathrm{g}`), " of methane burns completely in excess oxygen?"]),
  h3("Balance the equation first"),
  math(String.raw`\mathrm{CH_4} + 2\,\mathrm{O_2} \rightarrow \mathrm{CO_2} + 2\,\mathrm{H_2O}`),
  h3("Step 1 — grams to moles"),
  mp(["The molar mass of ", im(String.raw`\mathrm{CH_4}`), " is ", im(String.raw`12.01 + 4(1.008) = 16.04\ \mathrm{g/mol}`), "."]),
  math(String.raw`n_{\mathrm{CH_4}} = \frac{32.0\ \mathrm{g}}{16.04\ \mathrm{g/mol}} = 1.995\ \mathrm{mol}`),
  h3("Step 2 — the mole ratio"),
  mp(["From the balanced equation, ", im(String.raw`\mathrm{CH_4}`), " and ", im(String.raw`\mathrm{CO_2}`), " are in a ", im(String.raw`1 : 1`), " ratio. So ", im(String.raw`1.995\ \mathrm{mol}`), " of methane gives ", im(String.raw`1.995\ \mathrm{mol}`), " of carbon dioxide."]),
  p("This step is where the coefficients earn their keep — and where an unbalanced equation silently ruins the answer."),
  h3("Step 3 — moles back to grams"),
  math(String.raw`m_{\mathrm{CO_2}} = 1.995\ \mathrm{mol} \times 44.01\ \mathrm{g/mol} = 87.8\ \mathrm{g}`),
  p("Worth a glance for plausibility: 32 g of methane produced 88 g of carbon dioxide. Mass appears to have grown — and it should, because the carbon has picked up two oxygen atoms from the air. Nothing came from nowhere. That sanity check catches a surprising number of errors."),

  h2("Worked example: the limiting reactant"),
  p("Real questions rarely say \"in excess\". Usually you are given both amounts and must work out which one runs out first — because that one decides how much product you get."),
  mp([im(String.raw`4.0\ \mathrm{g}`), " of hydrogen reacts with ", im(String.raw`32.0\ \mathrm{g}`), " of oxygen. How much water forms?"]),
  math(String.raw`2\,\mathrm{H_2} + \mathrm{O_2} \rightarrow 2\,\mathrm{H_2O}`),
  h3("Step 1 — moles of each"),
  math(String.raw`n_{\mathrm{H_2}} = \frac{4.0}{2.016} = 1.984\ \mathrm{mol} \qquad n_{\mathrm{O_2}} = \frac{32.0}{32.00} = 1.000\ \mathrm{mol}`),
  h3("Step 2 — which runs out?"),
  p("Do not compare the numbers directly — compare them against the ratio the equation demands. The equation needs twice as much hydrogen as oxygen."),
  math(String.raw`\text{O}_2 \text{ needed} = \frac{1.984}{2} = 0.992\ \mathrm{mol} \quad < \quad 1.000\ \mathrm{mol}\ \text{available}`),
  mp(["There is slightly more oxygen than required, so oxygen is in excess and ", span("hydrogen is limiting", ["strong"]), ". The hydrogen runs out first, and it decides the answer."]),
  h3("Step 3 — product from the limiting reactant only"),
  mp([im(String.raw`\mathrm{H_2}`), " and ", im(String.raw`\mathrm{H_2O}`), " are in a ", im(String.raw`2 : 2`), " ratio, so ", im(String.raw`1.984\ \mathrm{mol}`), " of hydrogen gives ", im(String.raw`1.984\ \mathrm{mol}`), " of water."]),
  math(String.raw`m_{\mathrm{H_2O}} = 1.984 \times 18.02 = 35.8\ \mathrm{g}`),
  p("The common error here is to notice that 32.0 g of oxygen is a bigger number than 4.0 g of hydrogen and conclude that hydrogen must be limiting because there is \"less\" of it. That reasoning gets the right answer by accident this time, and will be wrong the moment the numbers change. Grams are not what react — moles are."),

  h2("Where stoichiometry goes wrong"),
  li("Not balancing the equation first, which quietly corrupts step 2"),
  mli(["Comparing grams instead of moles when finding the limiting reactant — ", im(String.raw`32\ \mathrm{g}`), " of oxygen is fewer particles than ", im(String.raw`4\ \mathrm{g}`), " of hydrogen"]),
  li("Using the molar mass of the wrong substance, usually by working too fast"),
  li("Calculating product from the excess reactant rather than the limiting one"),
  li("Treating n = m/M as a formula to memorise rather than a conversion that means something"),

  h2("Practice problems"),
  mp([span("1. How many grams of water are produced when ", ["strong"]), im(String.raw`5.00\ \mathrm{g}`), span(" of hydrogen burns in excess oxygen? ", ["strong"]), im(String.raw`(2\,\mathrm{H_2} + \mathrm{O_2} \rightarrow 2\,\mathrm{H_2O})`)]),
  mp([span("2. ", ["strong"]), im(String.raw`10.0\ \mathrm{g}`), span(" of nitrogen reacts with ", ["strong"]), im(String.raw`5.0\ \mathrm{g}`), span(" of hydrogen. Which is limiting, and how much ammonia forms? ", ["strong"]), im(String.raw`(\mathrm{N_2} + 3\,\mathrm{H_2} \rightarrow 2\,\mathrm{NH_3})`)]),

  h2("Solutions"),
  h3("1. Water from 5.00 g of hydrogen"),
  math(String.raw`n_{\mathrm{H_2}} = \frac{5.00}{2.016} = 2.480\ \mathrm{mol}`),
  mp(["The ratio ", im(String.raw`\mathrm{H_2} : \mathrm{H_2O}`), " is ", im(String.raw`2:2`), ", so ", im(String.raw`2.480\ \mathrm{mol}`), " of water forms."]),
  math(String.raw`m_{\mathrm{H_2O}} = 2.480 \times 18.02 = 44.7\ \mathrm{g}`),
  h3("2. Ammonia, with a limiting reactant"),
  math(String.raw`n_{\mathrm{N_2}} = \frac{10.0}{28.02} = 0.357\ \mathrm{mol} \qquad n_{\mathrm{H_2}} = \frac{5.0}{2.016} = 2.480\ \mathrm{mol}`),
  p("Compare against the ratio, not the numbers. The equation needs three times as much hydrogen as nitrogen:"),
  math(String.raw`\text{H}_2 \text{ needed} = 3 \times 0.357 = 1.07\ \mathrm{mol} \quad < \quad 2.48\ \mathrm{mol}\ \text{available}`),
  mp(["Hydrogen is in excess, so ", span("nitrogen is limiting", ["strong"]), " — even though there are far fewer grams of hydrogen. This is the case where comparing masses would have given the wrong answer."]),
  mp([im(String.raw`\mathrm{N_2} : \mathrm{NH_3}`), " is ", im(String.raw`1 : 2`), ", so:"]),
  math(String.raw`n_{\mathrm{NH_3}} = 2 \times 0.357 = 0.714\ \mathrm{mol} \;\Longrightarrow\; m = 0.714 \times 17.03 = 12.2\ \mathrm{g}`),

  h2("Why this matters for Chemistry 12 and beyond"),
  linked(["Chemistry 12 does not revisit the mole — it assumes it. Equilibrium, acid-base and electrochemistry all sit directly on top of stoichiometry, and a student who is still shaky on moles meets those topics with one hand tied behind their back. That is the honest case for over-learning this now rather than passing the unit and moving on. Our ", { text: "Chemistry 12 tutoring", href: "/chemistry-12-tutor-burnaby" }, " sees the consequences of that gap constantly."]),
  p("It is also worth naming what stoichiometry is really teaching, which is not chemistry at all: track what you have, convert it into what actually matters, use the relationship, convert back. That habit is the transferable part."),

  h2("Getting help with Chemistry 11"),
  linked(["If stoichiometry is where things stopped making sense, that is a good diagnosis rather than bad news — it is a single, specific idea, and fixing it usually takes far less time than parents expect. Our ", { text: "Chemistry 11 tutoring in Burnaby", href: "/chemistry-11-tutor-burnaby" }, " rebuilds the mole conceptually rather than drilling more of the same questions."]),
  linked(["Sessions run in person at our Burnaby centre or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and we will find out where it actually broke."]),
];

createArticle({
  slug: "step-by-step-guide-stoichiometry-grade-11-chemistry",
  title: "A Step-by-Step Guide to Stoichiometry for Grade 11 Chemistry",
  excerpt:
    "Stoichiometry is one idea — the mole — plus a three-step method. Worked examples including limiting reactants, with practice problems and full solutions.",
  metaTitle: "Stoichiometry Guide for Grade 11 Chemistry | Step by Step",
  metaDescription:
    "A step-by-step stoichiometry guide for Chemistry 11: the mole explained, the three-step method, limiting reactants, and practice problems with solutions.",
  body,
})
  .then((ok) => { if (!ok && commit) process.exitCode = 1; })
  .catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
