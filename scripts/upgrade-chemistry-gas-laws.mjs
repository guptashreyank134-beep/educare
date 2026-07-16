/**
 * Article 4 of the batch: "Stoichiometry & Gas Laws" (509 -> 1,500+).
 *
 * Deliberately angled at GAS LAWS. /blog/step-by-step-guide-stoichiometry-grade-11-chemistry
 * already owns the mole ratio and limiting reactant properly at 1,079 words, so this
 * one links to it rather than competing with it, and earns its place on the gas
 * side plus the bridge between the two (gas stoichiometry).
 *
 * Maths verified numerically first (scripts/verify-chemistry-math.mjs).
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-chemistry-gas-laws.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-chemistry-gas-laws.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, li, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "chemistry-stoichiometry-gas-laws";

/* ---- PV = 24 L·atm. Verified: every point satisfies PV = 24, and P vs 1/V
       is a straight line of slope 24. Curve is computed, not eyeballed. ---- */
const DATA = [[1, 24], [2, 12], [3, 8], [4, 6], [6, 4], [8, 3], [12, 2]];
const r1 = (n) => Math.round(n * 10) / 10;
const XA = (v) => r1(45 + v * 15);
const YA = (p) => r1(235 - p * 7.6);
const XB = (u) => r1(335 + u * 185.7);
const YB = (p) => r1(235 - p * 7.6);

let hyper = "";
for (let v = 1; v <= 12.5; v += 0.25) hyper += `${hyper ? " L" : "M"} ${XA(v)} ${YA(24 / v)}`;

const dotsA = DATA.map(([v, pr]) => `<circle cx="${XA(v)}" cy="${YA(pr)}" r="3.5" fill="#3A5A98"/>`).join("");
const dotsB = DATA.map(([v, pr]) => `<circle cx="${XB(1 / v)}" cy="${YB(pr)}" r="3.5" fill="#3A5A98"/>`).join("");

const gasSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 560 292" role="img" aria-label="Two graphs of the same Boyle's law data. On the left, pressure against volume curves downward as a hyperbola. On the right, the same pressure plotted against one over volume gives a perfectly straight line through the origin with slope 24, showing that pressure is proportional to the reciprocal of volume." style="width:100%;max-width:560px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <!-- panel A : P vs V -->
    <line x1="${XA(0)}" y1="${YA(0)}" x2="${XA(13)}" y2="${YA(0)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${XA(0)}" y1="${YA(0)}" x2="${XA(0)}" y2="${YA(25)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <path d="${hyper}" fill="none" stroke="#3A5A98" stroke-width="2.5"/>
    ${dotsA}
    <text x="${XA(6)}" y="278" font-size="12" fill="#475569" text-anchor="middle">volume V (L)</text>
    <text x="18" y="${YA(12)}" font-size="12" fill="#475569" text-anchor="middle" transform="rotate(-90 18 ${YA(12)})">pressure P (atm)</text>
    <text x="${XA(6.5)}" y="${YA(17)}" font-size="12" fill="#1F2937" font-weight="600">P vs V — a curve</text>
    <text x="${XA(6.5)}" y="${YA(14.5)}" font-size="11" fill="#64748B">hard to read, hard to extrapolate</text>
    <!-- panel B : P vs 1/V -->
    <line x1="${XB(0)}" y1="${YB(0)}" x2="${XB(1.05)}" y2="${YB(0)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${XB(0)}" y1="${YB(0)}" x2="${XB(0)}" y2="${YB(25)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${XB(0)}" y1="${YB(0)}" x2="${XB(1.0417)}" y2="${YB(25)}" stroke="#3A5A98" stroke-width="2.5"/>
    ${dotsB}
    <text x="${XB(0.5)}" y="278" font-size="12" fill="#475569" text-anchor="middle">1/V (L⁻¹)</text>
    <text x="${XB(0.06)}" y="${YB(19)}" font-size="12" fill="#1F2937" font-weight="600">P vs 1/V — a line</text>
    <text x="${XB(0.06)}" y="${YB(16.5)}" font-size="11" fill="#64748B">slope = 24 = the constant</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The same seven measurements, plotted two ways. Left: P against V curves, because P and V are
    <em>inversely</em> related. Right: P against 1/V is dead straight, and its slope is the constant
    in PV&nbsp;=&nbsp;24. Nothing about the gas changed — only the axis. This is why exams ask you to
    plot against 1/V: a straight line is something you can measure.
  </figcaption>
</figure>`;

const body = [
  p("There are five gas laws in Chemistry 11, and that is four more than there needs to be."),
  p("Boyle's law, Charles's law, Gay-Lussac's law, Avogadro's law, the combined law — students dutifully memorise all five, mix them up under exam pressure, and pick the wrong one. But they are not five laws. They are one law, looked at from five angles, and once you see that, there is nothing left to mix up."),
  linked(["This guide covers the gas side of Chemistry 11 and the point where it meets stoichiometry. If the mole ratios themselves are the shaky part, start with our ", { text: "step-by-step guide to stoichiometry", href: "/blog/step-by-step-guide-stoichiometry-grade-11-chemistry" }, " first and come back — this builds directly on it."]),

  h2("Kelvin is not a unit conversion"),
  p("Before anything else, because it invalidates everything downstream if you get it wrong."),
  p("Gas law temperatures are always in Kelvin. Always. Not sometimes, not when the question says so — always. And the reason is not convention, it is arithmetic."),
  mp(["The gas laws contain ratios like ", im(String.raw`T_2/T_1`), ". A ratio only means something if zero on the scale means zero of the thing. Kelvin has that property: 0 K is genuinely no thermal energy. Celsius does not — 0°C is just a Tuesday in Vancouver. So the ratio 100°C / 25°C is not 4. It is meaningless."]),
  math(String.raw`T(\text{K}) = T(^\circ\text{C}) + 273.15`),
  p("Here is what it costs. Heat 500 mL of gas from 25°C to 100°C and ask for the new volume."),
  mli(["Done properly: 298.15 K → 373.15 K, and the volume goes to 626 mL."]),
  mli(["Done in Celsius: 25 → 100 looks like a factor of four, giving 2000 mL."]),
  p("That is not a rounding error. It is off by more than a factor of three, and it is the single most common way to lose full marks on a question you actually understood. Convert to Kelvin as the very first line of working, before you even decide which law you need."),

  h2("Boyle's law, and why the graph curves"),
  p("Squeeze a gas into half the space and the pressure doubles. Pressure and volume are inversely related, at fixed temperature and amount:"),
  math(String.raw`P_1V_1 = P_2V_2 \qquad \text{or} \qquad PV = \text{constant}`),
  mp(["So 2.0 L at 1.5 atm, compressed to 3.0 atm, becomes ", im(String.raw`V_2 = (1.5)(2.0)/3.0 = 1.0`), " L. Double the pressure, halve the volume."]),
  p("But the part worth actually understanding is the graph — because exams ask about it, and because it explains what \"inversely proportional\" really means."),
  { _type: "htmlBlock", _key: key(), html: gasSvg },
  p("Both panels show identical data. The left curves; the right is straight. Nothing changed except what we plotted along the bottom."),
  mp(["That is the whole point of the 1/V axis. ", im(String.raw`P = k/V`), " is a curve, and eyeballing a curve tells you very little. But rewrite it as ", im(String.raw`P = k \cdot (1/V)`), " and it is just ", im(String.raw`y = mx`), " — a straight line through the origin whose slope is the constant itself. A straight line is something you can draw with a ruler, measure, and extrapolate. This is why lab write-ups ask for P against 1/V rather than P against V, and \"why is the second graph linear?\" is a question that appears every single year."]),

  h2("Charles's law, and the rest of the family"),
  p("Heat a gas at constant pressure and it expands. Volume and temperature are directly proportional:"),
  math(String.raw`\frac{V_1}{T_1} = \frac{V_2}{T_2}`),
  p("Gay-Lussac's law says the same for pressure and temperature at fixed volume — which is why an aerosol can carries a warning about heat, and why a car's tyre pressure reads higher after a motorway run. Avogadro's law says equal volumes of any gas at the same temperature and pressure contain equal numbers of particles, regardless of what the gas is."),
  p("Notice the shape of all of them. Each holds two things constant and relates the other two. They are not independent discoveries you must memorise separately — they are what is left of a bigger equation once you nail two variables down."),

  h2("The one law they all came from"),
  p("Here is the equation the whole family collapses into:"),
  math(String.raw`PV = nRT`),
  mp(["Pressure times volume equals moles times the gas constant times temperature. With ", im(String.raw`R = 0.08206`), " L·atm/(mol·K) when pressure is in atmospheres and volume in litres — and matching R to your units is worth one careful look before you start."]),
  p("Now watch the five laws fall out of it. Hold n and T constant, and the right side is a constant, so PV is a constant — that is Boyle. Hold n and P constant, and V/T is constant — that is Charles. Hold n and V constant, and P/T is constant — that is Gay-Lussac. Hold P and T constant, and V/n is constant — that is Avogadro."),
  p("So there is one thing to remember, not five. And when a question changes conditions on a fixed sample of gas, you do not need to identify which named law applies at all — just cancel whatever does not change:"),
  math(String.raw`\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}`),
  mp(["Take 2.0 L at 1.0 atm and 273 K, then double both the pressure and the temperature. The pressure would halve the volume; the temperature would double it. They cancel exactly, and the volume comes back to 2.0 L. That is a two-line answer with the combined law and a maze of substitutions without it."]),

  h2("Where the two halves meet"),
  p("This is the reason the two topics share a unit, and it is the idea that makes both of them worth having."),
  p("Stoichiometry counts particles. Gas laws let you count particles without counting them — by measuring pressure, volume and temperature instead. Rearranged, the ideal gas law is a particle counter:"),
  math(String.raw`n = \frac{PV}{RT}`),
  p("You cannot weigh a gas conveniently. But you can measure the volume it fills, the pressure it pushes with, and how warm it is — and that gets you the number of moles, which drops straight into a mole ratio."),

  h3("Worked example"),
  p("Zinc reacts with hydrochloric acid to give hydrogen gas. What volume of hydrogen comes from 5.00 g of zinc at 25°C and 1.00 atm?"),
  math(String.raw`\text{Zn} + 2\text{HCl} \rightarrow \text{ZnCl}_2 + \text{H}_2`),
  p("Balance first — always. Zinc 1 and 1, hydrogen 2 and 2, chlorine 2 and 2. It balances."),
  mp(["Grams to moles: ", im(String.raw`n(\text{Zn}) = 5.00 / 65.38 = 0.0765`), " mol."]),
  p("Mole ratio: the balanced equation says one zinc gives one hydrogen molecule, so n(H₂) = 0.0765 mol as well."),
  mp(["Now the gas law does the last step. Convert 25°C to 298.15 K, then:"]),
  math(String.raw`V = \frac{nRT}{P} = \frac{(0.0765)(0.08206)(298.15)}{1.00} = 1.87 \ \text{L}`),
  p("And sanity-check it: less than a tenth of a mole, so it must be well under 22.4 L. It is. That check takes three seconds and catches an entire class of arithmetic slips."),

  h2("22.4 L/mol, and when you are allowed to use it"),
  p("One mole of any ideal gas at STP occupies 22.4 L. It falls straight out of the ideal gas law with n = 1, T = 273.15 K and P = 1 atm:"),
  math(String.raw`V = \frac{(1)(0.08206)(273.15)}{1} = 22.4 \ \text{L}`),
  p("It is a genuine shortcut and it saves real time. But it is only true at STP, and students reach for it constantly at 25°C, where it is simply wrong. If the question does not say STP, use PV = nRT and do the work. The shortcut is a special case, not a fact about gases."),

  h2("Dalton's law, and the water you forgot about"),
  p("One more, and it is the one that turns a textbook answer into a laboratory answer."),
  p("In a mixture of gases, each gas pushes with its own pressure as though the others were not there, and the total is simply the sum:"),
  math(String.raw`P_{total} = P_1 + P_2 + P_3 + \cdots`),
  p("Which sounds abstract until you actually run the zinc experiment. Hydrogen is collected by bubbling it up into an inverted tube of water — and the gas you collect is not pure hydrogen. It is hydrogen plus water vapour, because the water is quietly evaporating into it the whole time."),
  mp(["At 25°C water vapour contributes 23.8 mmHg, which is 0.0313 atm. So if the total in the tube reads 1.00 atm, the hydrogen itself is only responsible for:"]),
  math(String.raw`P_{\text{H}_2} = 1.00 - 0.0313 = 0.969 \ \text{atm}`),
  mp(["Redo the zinc calculation with 0.969 atm instead of 1.00 and the volume comes out at 1.93 L rather than 1.87 L — about 3% larger. Small, but it is the difference between a right answer and a nearly-right one, and \"collected over water\" is the phrase in the question that tells you it applies. Miss those three words and you lose the mark without ever knowing why."]),

  h2("Three to try"),
  h3("1. Boyle"),
  mp(["A weather balloon holds 4.0 L at 1.0 atm at ground level. It rises until the pressure is 0.50 atm. Ignoring temperature, what is the volume? ", im(String.raw`V_2 = (1.0)(4.0)/0.50 = 8.0`), " L — halve the pressure, double the volume."]),
  h3("2. Charles, with the trap"),
  mp(["1.50 L at 20.0°C is cooled to −10.0°C. Convert first: 293.15 K and 263.15 K. Then ", im(String.raw`V_2 = 1.50 \times 263.15/293.15 = 1.35`), " L. Cooling shrinks it, so an answer above 1.50 L means a flipped ratio. And note the minus sign never appears in the working once you are in Kelvin — which is the point."]),
  h3("3. Gas stoichiometry"),
  mp(["Heating limestone drives off carbon dioxide: ", im(String.raw`\text{CaCO}_3 \rightarrow \text{CaO} + \text{CO}_2`), ". What volume of CO₂ comes from 10.0 g of CaCO₃ at STP?"]),
  mp(["M(CaCO₃) = 40.08 + 12.01 + 3(16.00) = 100.09 g/mol, so n = 0.0999 mol. The ratio is 1:1. At STP you may use the shortcut: ", im(String.raw`V = 0.0999 \times 22.4 = 2.24`), " L."]),

  h2("Where marks actually go"),
  mli(["Celsius left in a ratio. Costs the whole question, every time."]),
  mli(["An unbalanced equation. The mole ratio comes from the coefficients, so a wrong balance makes every later step wrong while looking perfectly tidy."]),
  mli(["Using 22.4 L/mol away from STP."]),
  mli(["R mismatched to the units — kPa with the atm value of R."]),
  mli(["Ratios flipped. A gas that was heated must expand. Check the direction against common sense before writing the answer down."]),

  h2("Getting help with Chemistry 11"),
  linked(["Gas laws are one of the few Chemistry 11 topics where the concept is easier than the bookkeeping — most students who struggle here understand the physics fine and are losing marks to units, conversions and ratio direction. That is very fixable, and quickly. Our ", { text: "one-on-one Chemistry 11 help", href: "/chemistry-11-tutor-burnaby" }, " starts by finding out which of the two it actually is."]),
  linked(["Everything here reappears in ", { text: "Chemistry 12", href: "/chemistry-12-tutor-burnaby" }, " under equilibrium and kinetics, where partial pressures assume you already own PV = nRT. Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 509)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

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
