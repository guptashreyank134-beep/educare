/**
 * "Langara College Physics (PHYS 1101/1114/1118)" (751 -> 1,500+).
 *
 * Full rebuild. DELIBERATELY a different half of the course from the UBC physics
 * post, which now owns kinematics-as-a-special-case, work-energy and F=ma as a
 * differential equation. Mirroring that article for a second institution is
 * exactly the spun-content pattern the client caught earlier, so this one takes
 * rotation and oscillation instead. Neither article is the other with the nouns
 * swapped.
 *
 * The course codes are already in the slug and title. No NEW institutional
 * claims — no syllabus, schedule, instructor or transfer-credit assertions,
 * none of which are verifiable from here.
 *
 * Maths verified first (scripts/verify-rotation.mjs).
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-langara-physics.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-langara-physics.mjs --commit
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "university-physics-langara-college-physics-phys-1101-1114-1118";

/* 30° incline: run 330, rise 190 -> tan = 0.5757 = tan(29.94°). Verified geometry. */
const TOP = [40, 50], RUN = 330, RISE = 190;
const d = [0.866, 0.499];        // down-slope unit vector
const nrm = [0.499, -0.866];     // outward normal (away from the ramp surface)
const r1 = (n) => Math.round(n * 10) / 10;
const at = (t, rad) => [
  r1(TOP[0] + t * RUN + rad * nrm[0]),
  r1(TOP[1] + t * RISE + rad * nrm[1]),
];
const R = 16;
const discC = at(0.62, R);
const hoopC = at(0.40, R);

const raceSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 420 280" role="img" aria-label="A solid disc and a hoop rolling down the same thirty degree ramp. The solid disc is further down the slope, having accelerated at 3.27 metres per second squared, while the hoop lags behind at 2.45. Neither the mass nor the radius appears in the acceleration formula, so the disc wins every time regardless of size or weight." style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <polygon points="${TOP[0]},${TOP[1]} ${TOP[0] + RUN},${TOP[1] + RISE} ${TOP[0]},${TOP[1] + RISE}" fill="#F1F5F9"/>
    <line x1="${TOP[0]}" y1="${TOP[1]}" x2="${TOP[0] + RUN}" y2="${TOP[1] + RISE}" stroke="#64748B" stroke-width="3"/>
    <text x="${TOP[0] + 30}" y="${TOP[1] + 150}" font-size="12" fill="#64748B">θ = 30°</text>
    <circle cx="${hoopC[0]}" cy="${hoopC[1]}" r="${R}" fill="none" stroke="#B45309" stroke-width="5"/>
    <text x="${hoopC[0] - 24}" y="${hoopC[1] - 24}" font-size="12" fill="#B45309" text-anchor="middle" font-weight="700">hoop</text>
    <text x="${hoopC[0] - 24}" y="${hoopC[1] - 11}" font-size="11" fill="#B45309" text-anchor="middle">2.45 m/s²</text>
    <circle cx="${discC[0]}" cy="${discC[1]}" r="${R}" fill="#3A5A98"/>
    <circle cx="${discC[0]}" cy="${discC[1]}" r="3" fill="#FFFFFF"/>
    <text x="${discC[0] + 30}" y="${discC[1] - 12}" font-size="12" fill="#3A5A98" text-anchor="middle" font-weight="700">disc</text>
    <text x="${discC[0] + 30}" y="${discC[1] + 1}" font-size="11" fill="#3A5A98" text-anchor="middle">3.27 m/s²</text>
    <text x="210" y="266" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="600">same mass, same radius, same ramp — the disc still wins</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Release them together and the disc arrives first, every time. Not because it is heavier or bigger —
    neither mass nor radius appears in the answer. It wins because its mass sits <em>closer to the axis</em>,
    so less of the energy is spent spinning and more is left for going.
  </figcaption>
</figure>`;

const body = [
  p("First-year physics splits into two halves, and students consistently find the second one harder for a reason nobody names: it is not harder. It is the same mechanics applied to things that turn instead of things that travel, and almost every equation has a twin you already know."),
  p("The trouble is that nobody points at the twins. So students learn a second, apparently unrelated pile of formulas, when they could have learned a translation table."),
  linked(["This guide covers rotation and oscillation — the back half of first-year mechanics. If it is the front half going wrong, our ", { text: "university physics tutoring", href: "/university-physics-tutor-vancouver" }, " covers both, and usually starts by working out which."]),

  h2("Rotation is the mechanics you already know, renamed"),
  p("Here is the table that should be handed out on day one of the chapter and generally is not:"),
  mli(["Position x becomes angle θ."]),
  mli(["Velocity v becomes angular velocity ω."]),
  mli(["Acceleration a becomes angular acceleration α."]),
  mli(["Force F becomes torque τ."]),
  mli(["Mass m becomes moment of inertia I."]),
  mp(["And with that, the central equation is not new at all. ", im(String.raw`F = ma`), " becomes:"]),
  math(String.raw`\tau = I\alpha`),
  mp(["Kinetic energy ", im(String.raw`\tfrac{1}{2}mv^2`), " becomes ", im(String.raw`\tfrac{1}{2}I\omega^2`), ". Momentum ", im(String.raw`mv`), " becomes ", im(String.raw`I\omega`), ". Even the kinematics equations survive the translation intact, with the same condition attached — constant angular acceleration, or they are worthless."]),
  p("So there is one genuinely new idea in the chapter, and it is I."),

  h2("Moment of inertia: mass is not enough any more"),
  p("In straight-line motion, an object's resistance to being pushed is its mass. That is the whole story — a 5 kg brick resists the same way whatever shape it is."),
  p("For rotation, that stops being true, and the reason is intuitive once you have felt it. Hold a hammer by the handle and swing it; now hold it by the head and swing it. Same hammer, same mass, wildly different difficulty. What changed is where the mass sits relative to the axis you are turning about."),
  math(String.raw`I = \sum m_i r_i^2`),
  mp(["That ", im(String.raw`r^2`), " is doing all the work. Mass far from the axis counts enormously more than mass near it — twice the distance is four times the contribution. Which is why the same object has different moments of inertia about different axes, and why the question always tells you the axis."]),
  mli(["Solid disc about its centre: ", im(String.raw`I = \tfrac{1}{2}MR^2`)]),
  mli(["Hoop about its centre: ", im(String.raw`I = MR^2`)]),
  mli(["Solid sphere: ", im(String.raw`I = \tfrac{2}{5}MR^2`)]),
  p("The hoop has the largest value of the three, and it is not a coincidence: all of a hoop's mass is at the maximum possible distance. The sphere has the smallest, because most of its mass is bunched near the middle. You can rank these by looking at them, which is worth more than memorising the table."),

  h2("The race that makes it click"),
  p("Roll a solid disc and a hoop down the same ramp, released together. Which arrives first?"),
  { _type: "htmlBlock", _key: key(), html: raceSvg },
  p("The disc, always. And the reason is an energy argument, which is the most valuable thing in the chapter."),
  p("Gravity supplies a fixed amount of energy — mgh, the same for both. But a rolling object has to spend that energy two ways: on moving, and on spinning."),
  math(String.raw`mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2`),
  p("Every joule that goes into spinning is a joule not available for going. The hoop, with all its mass out at the rim, has to spend more on spinning — so it arrives with less speed. The disc keeps more for travel."),
  mp(["Working it through with ", im(String.raw`v = \omega R`), " gives a formula worth staring at:"]),
  math(String.raw`a = \frac{g\sin\theta}{1 + I/MR^2}`),
  mp(["On a 30° ramp: the disc gets ", im(String.raw`3.27`), " m/s², the hoop gets ", im(String.raw`2.45`), " m/s², a solid sphere gets ", im(String.raw`3.50`), " m/s², and a frictionless block that does not rotate at all gets the full ", im(String.raw`g\sin 30^\circ = 4.90`), " m/s². Over a 2 m ramp the disc beats the hoop by about 0.17 s — small, and easily visible."]),
  h3("Now look at what is missing"),
  p("There is no M in that formula. There is no R either. Both cancel."),
  p("So a heavy hoop and a light hoop tie exactly. A bicycle wheel and a wedding ring tie. A cannonball and a marble tie. What decides the race is not how much mass there is or how big the object is, but only how the mass is distributed — the shape, and nothing else. This result reliably surprises people, it falls out of the algebra in two lines, and it is exactly the kind of thing an exam asks conceptually rather than numerically."),
  h3("The energy audit"),
  mp(["Take a 3 kg disc of radius 0.2 m from a height of 1 m. It starts with ", im(String.raw`mgh = 29.4`), " J. At the bottom it is travelling at 3.61 m/s, and the books balance:"]),
  math(String.raw`\underbrace{19.6\ \text{J}}_{\text{moving}} + \underbrace{9.8\ \text{J}}_{\text{spinning}} = 29.4\ \text{J}`),
  p("Exactly 2:1 — and that ratio is fixed for any solid disc, whatever its mass, radius, or the height it fell from. A hoop splits it 1:1. That split is the whole race, quantified."),

  h2("Angular momentum, and the energy that appears from nowhere"),
  mp(["Momentum has a rotational twin too, and it is conserved for the same reason: ", im(String.raw`L = I\omega`), ", constant unless an outside torque acts."]),
  p("Everyone has seen the demonstration. A skater spins with arms out, pulls them in, and speeds up dramatically. Nothing pushed her — she just changed shape. But pulling her arms in moved mass closer to the axis, so I dropped, and since Iω cannot change, ω had to rise to compensate."),
  mp(["Put numbers on it. Start at ", im(String.raw`I = 4.0`), " kg·m² and ", im(String.raw`\omega = 2.0`), " rad/s, so ", im(String.raw`L = 8.0`), ". Halve the moment of inertia and the angular velocity must double to 4.0 rad/s, keeping L at 8.0. So far, tidy."]),
  h3("Now check the energy"),
  math(String.raw`E_k = \tfrac{1}{2}I\omega^2: \quad \tfrac{1}{2}(4.0)(2.0)^2 = 8 \ \text{J} \quad \longrightarrow \quad \tfrac{1}{2}(2.0)(4.0)^2 = 16 \ \text{J}`),
  p("The kinetic energy doubled. Eight joules appeared out of nowhere while momentum sat perfectly still — and this is the point in the lecture where a good student stops and objects."),
  mp(["They are right to. And the resolution is the best question in the chapter: the energy came from the skater. Pulling your arms inward against a spin is genuinely hard work — the arms are trying to fly outward, and dragging them in takes force over a distance, which is the definition of work. She put 8 J in with her muscles, and the maths says exactly how much."]),
  p("So no law was bent. Angular momentum is conserved because no external torque acted; kinetic energy is not conserved because work was done. Two different conservation questions with two different answers, and the exam asks about the second one precisely because everyone assumes it follows from the first."),

  h2("Simple harmonic motion: the same equation everywhere"),
  p("The other half of the back half, and it looks like a new topic. It is one equation in disguise, and it is worth recognising because it turns up for the rest of your degree."),
  p("Whenever a restoring force is proportional to the displacement — pull it further, it pulls back harder in exact proportion — you get SHM. That is the entire condition:"),
  math(String.raw`F = -kx \quad \Longrightarrow \quad T = 2\pi\sqrt{\frac{m}{k}}`),
  mp(["A 0.5 kg mass on a 200 N/m spring oscillates with ", im(String.raw`T = 0.314`), " s."]),
  h3("The result students refuse to believe"),
  p("Look at that period formula and notice what is not in it: the amplitude."),
  p("Pull the mass out 1 cm or 10 cm and it takes exactly the same time to complete a cycle. Pulled further, it has more distance to cover — but the force is proportionally larger, so it moves proportionally faster, and the two effects cancel perfectly. That cancellation is why clocks work at all, and why a pendulum was the world's timekeeper for three hundred years."),
  mp(["The pendulum says the same thing: ", im(String.raw`T = 2\pi\sqrt{L/g}`), ". No mass, no amplitude — a 1 m pendulum takes 2.01 s per swing whether the bob is lead or cork, whether you release it from 2° or 8°. And to double the period you need four times the length, not twice, because of the square root. That square root is why grandfather clocks are the height they are."]),
  p("One honest caveat the textbook prints and students skip: this is only true for small angles, where sin θ ≈ θ. Swing a pendulum out to 60° and the period genuinely does depend on amplitude. The formula is an approximation that happens to be superb for the range clocks use."),

  h2("Where the marks actually go"),
  mli(["Using I from the table for the wrong axis. The value depends entirely on the axis, and the question always specifies it."]),
  mli(["Forgetting rotational kinetic energy in an energy problem. If it rolls, it spins, and the ½Iω² term is not optional — leaving it out gives the frictionless-slider answer, which is confidently and visibly too fast."]),
  mli(["Mixing degrees into rotational formulas. Radians throughout; v = ωR is false in degrees."]),
  mli(["Trying to memorise the rotational formulas as new. Every one of them is a linear formula with the substitutions above. Learn the table, not the list."]),
  mli(["Assuming amplitude affects the period. It does not, and it is examined precisely because everyone assumes it does."]),

  h2("Why this half matters"),
  linked(["SHM is not a mechanics topic that ends with mechanics. The same equation governs AC circuits, waves, the vibration of a molecule, and every resonance in an engineering course — which is why it gets so much attention for something that looks like a mass on a spring. And it rests on the calculus underneath: the equation of motion is a differential equation, and the sine that solves it is not a guess. We wrote about the calculus foundations in ", { text: "our guide to limits and derivatives", href: "/blog/mathematics-calculus-limits-derivatives" }, "."]),

  h2("Getting help with first-year physics"),
  linked(["If rotation feels like a second course rather than a translation of the first, that is a specific and quickly fixable problem — and it is the most common one in this half. Our ", { text: "one-on-one university physics help", href: "/university-physics-tutor-vancouver" }, " works from your actual problem sets and past midterms, at the pace the course really moves."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent problem set."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 751)`);
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

  // Must not duplicate the UBC physics article's territory.
  const sibling = await client.fetch(`*[_type=="post" && slug.current=="university-physics-ubc-physics-phys-100-101-107-108"][0].body[].children[].text`);
  const sibText = (sibling || []).join(" ");
  const shingles = (s) => { const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/); const out = new Set(); for (let i = 0; i + 7 <= w.length; i++) out.add(w.slice(i, i + 7).join(" ")); return out; };
  const a = shingles(text), b = shingles(sibText);
  const shared = [...a].filter((x) => b.has(x)).length;
  const overlap = (shared / Math.min(a.size, b.size)) * 100;
  console.log(`  vs UBC post: ${shared} shared 7-word runs (${overlap.toFixed(2)}% overlap)`);
  if (overlap > 3) { console.error("  ✗ too similar to the sibling article — that is the spun-content pattern."); process.exit(1); }

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
