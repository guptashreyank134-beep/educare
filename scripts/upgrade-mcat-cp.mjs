/**
 * "Chemistry & Physics in MCAT Prep" (663 -> 1,500+).
 * Full rebuild from the 6-section template. Org-authored (reviewedByExpert stays
 * false). Keywords woven naturally: MCAT tutoring, MCAT prep, Burnaby, online,
 * Metro Vancouver, medical school — not stuffed.
 * Maths verified first (scripts/verify-mcat-cp.mjs).
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "mcat-prep-chemistry-physics";

/* pH log scale: each unit = ×10 in [H+]. Verified. */
const barSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 460 200" role="img" aria-label="A bar chart of hydrogen ion concentration against pH. At pH 3 the concentration is one thousand times higher than at pH 6. Each step of one pH unit is a tenfold change, because pH is a logarithmic scale." style="width:100%;max-width:460px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="55" y1="160" x2="440" y2="160" stroke="#CBD5E1" stroke-width="1.5"/>
    ${[[3, 150, "10⁻³"], [4, 60, "10⁻⁴"], [5, 24, "10⁻⁵"], [6, 10, "10⁻⁶"]].map(([ph, h, lbl], i) => {
      const x = 80 + i * 95;
      return `<rect x="${x}" y="${160 - h}" width="46" height="${h}" rx="3" fill="${ph === 3 ? "#3A5A98" : "#94A3B8"}"/>
      <text x="${x + 23}" y="${160 - h - 6}" font-size="11" fill="#475569" text-anchor="middle">${lbl}</text>
      <text x="${x + 23}" y="175" font-size="12" fill="#1F2937" text-anchor="middle" font-weight="600">pH ${ph}</text>`;
    }).join("")}
    <text x="230" y="24" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="600">pH 3 is 1000× more acidic than pH 6 — not 2×</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Every pH unit is a factor of ten, because pH is a log scale. The MCAT rewards students who feel
    this in their bones and punishes those who treat pH as an ordinary number.
  </figcaption>
</figure>`;

const body = [
  p("The Chemistry and Physics section of the MCAT — \"C/P\" — frightens students for the wrong reason. They assume it demands the depth of a university physics degree and try to relearn everything. It does not, and that strategy is why so many people plateau."),
  p("The section rewards a small set of high-yield relationships applied quickly to unfamiliar situations, usually wrapped in a research passage you have never seen. You get 59 questions in 95 minutes — under a hundred seconds each, most of that spent reading — so the winning skill is not recall of every equation. It is recognising which of a dozen core ideas a passage is really about, and moving. That is a trainable skill, and it is what good MCAT prep actually builds."),
  linked(["This guide is the high-yield core of C/P, the way we teach it in ", { text: "one-on-one MCAT tutoring", href: "/programs/mcat-prep" }, ". If you are aiming for a US or Caribbean medical program, the same reasoning underpins our ", { text: "online medical tutoring", href: "/online-medical-tutoring" }, "."]),

  h2("pH is a logarithm, and treating it as a number costs points"),
  p("Acid-base chemistry is among the highest-yield C/P topics, and it collapses if you forget one thing: pH is a log scale."),
  math(String.raw`\text{pH} = -\log[\text{H}^+]`),
  { _type: "htmlBlock", _key: key(), html: barSvg },
  p("So a solution at pH 3 is not \"twice as acidic\" as one at pH 6. It has a thousand times the hydrogen-ion concentration, because three pH units is three factors of ten. The MCAT builds questions specifically to catch students who reason linearly here — a passage will drop the pH by 2 and ask about the concentration change, and the answer is ×100, not ÷2."),
  mp(["Two companions worth automating: ", im(String.raw`\text{pOH} = 14 - \text{pH}`), ", and for a weak acid, pH near the pKa means the buffer is near its strongest. On MCAT day you will not have time to derive these — they need to be reflexes."]),

  h2("The ideal gas law, and Dalton for the passages"),
  mp(["Gas questions are frequent and fast if you know the one equation: ", im(String.raw`PV = nRT`), ". One mole of an ideal gas at STP fills 22.4 L, which is worth knowing cold for a quick sanity check."]),
  p("The MCAT twist is usually a mixture of gases, which is Dalton's law: the total pressure is the sum of the partial pressures, and each gas behaves as though the others are not there. Respiratory physiology passages lean on this constantly — partial pressures of oxygen and carbon dioxide are gas-law problems wearing a biology costume, and recognising that is half the battle."),

  h2("Physics you thought you left behind"),
  p("The MCAT quietly tests first-year physics, and the same relationships from a good high-school course reappear. Three clusters cover most of it."),
  h3("Kinematics and force"),
  mp(["Free fall and projectile motion still show up. An object dropped from 20 m hits the ground in ", im(String.raw`t = \sqrt{2h/g} = 2.0`), " s at ", im(String.raw`v = \sqrt{2gh} = 19.8`), " m/s. Nothing here is beyond Grade 11 — the difficulty is spotting the physics inside a passage about, say, a falling ion in a mass spectrometer."]),
  h3("Circuits"),
  mp(["Ohm's law ", im(String.raw`V = IR`), " and power ", im(String.raw`P = IV = I^2R`), " cover most electricity questions. A 12 V source across 4 Ω drives 3 A and dissipates 36 W. Remember that resistors in series add (", im(String.raw`4 + 8 = 12\,\Omega`), ") while in parallel they combine as reciprocals (two 4 Ω in parallel give 2 Ω). Neurons and membranes are circuit problems on the MCAT, so this is higher-yield than it looks."]),
  h3("Optics"),
  mp(["The thin-lens equation ", im(String.raw`\tfrac{1}{f} = \tfrac{1}{d_o} + \tfrac{1}{d_i}`), " handles the eye and the microscope. An object 15 cm from a 10 cm lens forms an image at ", im(String.raw`d_i = 30`), " cm, magnified ", im(String.raw`m = -d_i/d_o = -2`), " — inverted and twice the size. The negative sign is information, not decoration: it tells you the image flips."]),

  h2("Equilibrium and Le Chatelier: direction beats calculation"),
  p("Chemical equilibrium questions rarely want a full calculation. They want a direction: which way does the reaction shift?"),
  mp(["Compare the reaction quotient Q with the equilibrium constant K. If ", im(String.raw`Q < K`), ", there are too few products, so the reaction runs forward. Add reactant, remove product, raise the temperature of an endothermic reaction — Le Chatelier tells you the shift, and the MCAT almost always asks for that shift rather than a number. Learning to answer these qualitatively and instantly is worth more than any amount of ICE-table drilling."]),

  h2("Thermodynamics: one equation decides spontaneity"),
  p("Whether a reaction happens on its own is one of the most tested ideas in C/P, and it comes down to a single relationship — Gibbs free energy:"),
  math(String.raw`\Delta G = \Delta H - T\Delta S`),
  mp(["A reaction is spontaneous when ", im(String.raw`\Delta G < 0`), ". The MCAT's favourite trap lives in the ", im(String.raw`-T\Delta S`), " term. Take an exothermic reaction with ", im(String.raw`\Delta H = -40`), " kJ but a negative entropy change, ", im(String.raw`\Delta S = -0.1`), " kJ/K. At body-ish temperature (298 K):"]),
  math(String.raw`\Delta G = -40 - (298)(-0.1) = -10.2 \ \text{kJ} \;\Rightarrow\; \text{spontaneous}`),
  mp(["But heat the same reaction to 500 K and ", im(String.raw`\Delta G = -40 + 50 = +10`), " kJ — no longer spontaneous. Temperature flipped the sign. The crossover is at ", im(String.raw`T = \Delta H/\Delta S = 400`), " K, and questions that ask \"at what temperature does this reaction stop being favourable?\" are asking for exactly that ratio. Knowing that a favourable enthalpy can be overruled by entropy at high temperature is worth a cluster of points."]),

  h2("Periodic trends, in two directions"),
  p("Passages about reactivity, bonding and acidity lean on the periodic table, and two trends carry most of the weight. Electronegativity increases up and to the right, peaking at fluorine. Atomic radius does the opposite — it increases down and to the left. Almost every trend question is one of these two, or a consequence of them: a smaller, more electronegative atom holds its electrons tighter, which drives acidity, bond polarity and ionisation energy in turn. Learn the two directions and you can reconstruct the rest on the spot rather than memorising a table."),

  h2("A worked example, the MCAT way"),
  mp(["A proton (", im(String.raw`q = 1.6\times10^{-19}`), " C) accelerates through a 200 V/m field over 0.5 m. How much kinetic energy does it gain? The work done by the field is ", im(String.raw`W = qEd`), ":"]),
  math(String.raw`W = (1.6\times10^{-19})(200)(0.5) = 1.6\times10^{-17} \ \text{J}`),
  p("By the work-energy theorem, that is the kinetic energy gained — no kinematics needed. Notice the shape of the reasoning: identify the relationship (work equals force times distance, and force is qE), substitute, and check the units land on joules. That three-step rhythm, not memorisation, is what the section rewards, and it is what timed practice trains."),

  h2("The habit that saves the section: dimensional analysis"),
  p("When a formula slips your mind under pressure — and it will — units rebuild it. Energy must come out in joules, which are kg·m²/s². If your working does not produce those units, you have the wrong equation, and you know it before you have wasted a minute on arithmetic."),
  mp(["This is also the fastest way to eliminate wrong answer choices. If a question asks for a force and three of the four options do not reduce to kg·m/s², they are gone without any physics at all. On a timed section, dimensional analysis is not a check you do at the end — it is a weapon you use throughout."]),

  h2("Fluids, because circulation is a plumbing problem"),
  p("Fluid dynamics is disproportionately high-yield on the MCAT, for one reason: the cardiovascular and respiratory systems are fluids in motion, so the physics of pipes is really the physiology of blood."),
  mp(["The continuity equation ", im(String.raw`A_1v_1 = A_2v_2`), " says that when a vessel narrows, the fluid speeds up — halve the cross-section and the flow doubles. That is why blood accelerates through a constricted artery, and the MCAT asks it in exactly those terms. Hydrostatic pressure ", im(String.raw`P = \rho g h`), " adds about one atmosphere for every 10 m of water, which explains blood-pressure differences between your head and feet. And buoyancy — the buoyant force equals ", im(String.raw`\rho_{\text{fluid}} V g`), " — decides what floats: an object sinks only if it is denser than the fluid around it."]),
  p("None of this is hard physics. The skill, again, is seeing the pipe inside the passage about a capillary bed, and reaching for the right one of three short equations."),

  h2("Where MCAT points are actually lost in C/P"),
  mli(["Trying to memorise everything. The section is reasoning under time, not recall. Depth in a dozen core relationships beats shallow coverage of a hundred."]),
  mli(["Reading pH, decibels or any log scale as a linear number."]),
  mli(["Getting lost in the passage. The physics is usually simpler than the biology story wrapped around it — find the relationship and ignore the ornamentation."]),
  mli(["Skipping the units check and committing to a wrong equation."]),
  mli(["Practising untimed. C/P is a speed test; comfortable practice trains the wrong muscle."]),

  h2("How to prepare for C/P efficiently"),
  mli(["Build a one-page sheet of the high-yield equations above and know them as reflexes, not references."]),
  mli(["Do passage-based practice from the start — isolated questions do not train the reading-under-pressure skill the real section demands."]),
  mli(["Keep an error log by concept. Three misses on equilibrium direction is one fix, not three."]),
  mli(["Practise dimensional analysis until eliminating choices by units is automatic."]),

  h2("Getting help with MCAT Chemistry and Physics"),
  linked(["If content review has stalled your score, the issue is usually reasoning speed and passage strategy rather than knowledge — the most trainable part of the exam, because the high-yield core is finite. Our ", { text: "MCAT prep in Burnaby and online", href: "/programs/mcat-prep" }, " works from real timed passages and a log of the specific setups costing you points."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver and beyond, which suits pre-med students juggling heavy course loads. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent practice section."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))].filter(Boolean);
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}\n  /blog/${SLUG}\n  words     : ${words}  (was 663)\n  equations : ${total} (${bad} invalid)\n  diagrams  : ${body.filter((b) => b._type === "htmlBlock").length}\n  links     : ${links.join(", ")}`);
  if (bad) { console.error("  ✗ LaTeX"); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ dead: ${dead.join(", ")}`); process.exit(1); }
  console.log(`  links ok  : all ${links.length} resolve ✓`);
  if (words < 1500) { console.error(`  ✗ under floor by ${1500 - words}`); process.exit(1); }
  const doc = await client.fetch(`*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ not found"); process.exit(1); }
  if (commit) { await client.patch(doc._id).set({ body }).commit(); console.log("  ✓ upgraded (live)"); }
  else console.log("\nRe-run with --commit to apply.");
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
