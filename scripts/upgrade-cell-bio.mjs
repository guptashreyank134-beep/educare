/**
 * "Cell Biology" (655 -> 1,500+). Full rebuild from template.
 * Distinct from its biology siblings: this one is built around the surface-area-
 * to-volume law and "structure predicts function". Sibling-overlap gate enforced.
 * SA:V verified numerically (scripts/verify-cell-bio.mjs).
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "biology-cell-biology";

/* SA/V of a cube: 6, 3, 1.5 for sides 1, 2, 4. Verified. */
const savSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 460 220" role="img" aria-label="Three cubes of increasing size showing that the surface-area-to-volume ratio falls as a cell grows. A one-unit cube has a ratio of six, a two-unit cube has three, and a four-unit cube has one point five. The ratio halves each time the side doubles, because surface area grows as the square of the side while volume grows as the cube." style="width:100%;max-width:460px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    ${[[1, 34, 6], [2, 62, 3], [4, 104, 1.5]].map(([s, px, ratio], i) => {
      const x = 40 + i * 150, y = 150 - px, dp = px * 0.38;
      return `<polygon points="${x},${y + px} ${x},${y} ${x + px},${y} ${x + px},${y + px}" fill="#3A5A98" fill-opacity="0.18" stroke="#3A5A98" stroke-width="2"/>
      <polygon points="${x},${y} ${x + dp},${y - dp} ${x + px + dp},${y - dp} ${x + px},${y}" fill="#3A5A98" fill-opacity="0.30" stroke="#3A5A98" stroke-width="2"/>
      <polygon points="${x + px},${y} ${x + px + dp},${y - dp} ${x + px + dp},${y + px - dp} ${x + px},${y + px}" fill="#3A5A98" fill-opacity="0.10" stroke="#3A5A98" stroke-width="2"/>
      <text x="${x + px / 2}" y="175" font-size="12" fill="#1F2937" text-anchor="middle">side ${s}</text>
      <text x="${x + px / 2}" y="193" font-size="13" fill="#3A5A98" text-anchor="middle" font-weight="700">SA/V = ${ratio}</text>`;
    }).join("")}
    <text x="230" y="20" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="600">double the size, halve the surface per unit of interior</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Surface area grows as the square of the size; volume grows as the cube. So the bigger a cell gets,
    the less membrane it has to feed each unit of its interior. This one ratio explains why cells are
    small — and why the exceptions look the way they do.
  </figcaption>
</figure>`;

const body = [
  p("Cell biology is the topic students most often try to survive by memorisation, and it is the one where memorisation fails hardest. There are hundreds of structures with unfamiliar names, and a fortnight before the exam the whole thing turns to fog."),
  p("There is a better way in, and it is a single principle: in the cell, structure predicts function. Almost nothing is arbitrary. An organelle's job is written in its shape, and once you can read that, you are reasoning rather than reciting — which is the difference between a grade that holds under pressure and one that evaporates."),
  linked(["This guide teaches cell biology the way we teach it in ", { text: "one-on-one biology tutoring", href: "/programs/biology" }, ": start from why the cell is built the way it is, and the details follow."]),

  h2("Why cells are small: one ratio explains almost everything"),
  p("Begin with a question that unlocks a surprising amount of the syllabus: why are cells microscopic? Why not one big cell instead of trillions of tiny ones?"),
  p("The answer is a ratio, and it is worth genuinely understanding rather than accepting. A cell takes in nutrients and expels waste across its surface — its membrane. Everything it has to feed and clean sits in its volume. So what matters is how much surface there is per unit of volume."),
  { _type: "htmlBlock", _key: key(), html: savSvg },
  mp(["Model a cell as a cube of side ", im(String.raw`s`), ". Its surface area is ", im(String.raw`6s^2`), " and its volume is ", im(String.raw`s^3`), ", so:"]),
  math(String.raw`\frac{\text{surface area}}{\text{volume}} = \frac{6s^2}{s^3} = \frac{6}{s}`),
  p("As the cell grows, that ratio falls — from 6, to 3, to 1.5 as the side doubles and doubles again. Surface area grows as the square of the size; volume grows as the cube, and the cube always wins. So a large cell simply cannot move enough material across its membrane to service its interior. It would starve at the centre before nutrients diffused in — and diffusion time scales with the square of distance, which makes the problem worse the bigger you get."),
  p("This is not a piece of trivia. It is the reason cells stay small, the reason they divide instead of just growing, and — read the other way — the explanation for a whole set of structures that would otherwise be memorised blind."),

  h2("Structure predicts function: reading the organelles"),
  p("Now the payoff. Every organelle whose shape looks strange is usually solving the surface-area problem or a close relative of it."),
  mli(["Mitochondria are folded into cristae because folding multiplies membrane area inside a fixed volume — and the energy reactions of respiration happen on that membrane. More folds, more surface, more ATP. The shape is the function."]),
  mli(["The small intestine is lined with villi and microvilli for the identical reason at a larger scale: maximum absorbing surface in minimum space. The same geometry, one organism up."]),
  mli(["The rough endoplasmic reticulum is studded with ribosomes and sheeted into layers — surface for protein synthesis. Smooth ER, doing lipid work rather than protein assembly, has no ribosomes and a tubular shape."]),
  mli(["The nucleus is wrapped in a double membrane pierced by pores, because it must protect DNA while still exporting the messenger RNA that carries its instructions out. Protection plus controlled traffic, expressed as structure."]),
  p("Learn to ask \"what is this shape for?\" and the organelles stop being a list to memorise and become a set of engineering solutions you can almost predict. That is a far smaller cognitive load, and it survives exam stress."),

  h2("The membrane is a decision-maker, not a wall"),
  p("The plasma membrane is the most tested structure in cell biology, and it is routinely misunderstood as a simple boundary. It is closer to a border crossing with a permissions system."),
  p("Its fluid mosaic structure — a phospholipid bilayer with proteins floating in it — is built to be selectively permeable. Small non-polar molecules slip through freely; ions and large polar molecules cannot, and must use protein channels and pumps. That single fact drives a huge fraction of the course:"),
  mli(["Passive transport (diffusion, osmosis, facilitated diffusion) moves things down their concentration gradient, for free."]),
  mli(["Active transport moves things against the gradient and therefore costs ATP — the sodium-potassium pump being the example every exam wants."]),
  mli(["Osmosis, the diffusion of water, decides whether a cell swells, shrinks or holds steady in a given solution — and hypotonic, hypertonic and isotonic are just three answers to that one question."]),
  p("Understand that the membrane chooses what crosses and why it costs energy to go uphill, and transport stops being vocabulary and becomes logic."),

  h2("The cell cycle: why division is controlled, not casual"),
  p("Cells grow, copy their DNA, and divide — but the exam interest is in the control, not the choreography. The cycle has checkpoints that verify the DNA is undamaged and fully copied before the cell is allowed to proceed, and understanding those checkpoints is the bridge to a topic that comes up constantly: cancer is the cell cycle with its brakes removed."),
  mp(["Mitosis produces two genetically identical daughter cells, each keeping the full chromosome count — in humans, 46 chromosomes, 23 pairs. This is how you grow and repair: every new cell is a faithful copy. Meiosis is the other kind of division, and it does something different on purpose. It halves the count to 23, producing gametes, so that when two gametes fuse at fertilisation, ", im(String.raw`23 + 23 = 46`), " restores the full set. Mitosis for growth, meiosis for reproduction — and the exam wants you to know why each produces the number of cells and chromosomes it does."]),
  p("Frame mitosis as \"make an identical copy\" and meiosis as \"make a half-set to be combined later\", and the phases stop being a sequence to memorise and become steps that obviously serve those two different goals."),

  h2("Energy: the cell's economy in one exchange"),
  p("Cellular respiration and photosynthesis are the highest-yield processes in the course, and students drown in their intermediate steps. Step back first."),
  mp(["Respiration takes glucose and oxygen and releases carbon dioxide, water and energy captured as ATP. Aerobic respiration — using oxygen — nets around 30 to 32 ATP per glucose molecule. Glycolysis alone, without oxygen, nets only 2. That roughly fifteenfold difference is the entire reason oxygen matters to you, and it is the kind of comparison an exam rewards understanding over memorised numbers."]),
  p("Photosynthesis is respiration run backwards: it takes carbon dioxide and water, adds light energy, and builds glucose and oxygen. Seeing the two as inverses — one storing energy in a sugar, the other spending it — turns two intimidating pathways into a single loop, and makes the flow of energy through living systems something you can reason about rather than recite."),

  h2("Prokaryote versus eukaryote: complexity is compartments"),
  p("The other high-frequency comparison. The headline is usually \"eukaryotes have a nucleus\", but the deeper idea is compartmentalisation. Eukaryotic cells wall off incompatible chemistry into separate membrane-bound rooms — the acidic digestion of the lysosome kept apart from the delicate synthesis elsewhere — which lets them run far more sophisticated processes at once."),
  p("Prokaryotes, without those internal walls, keep it simple and stay small and fast. Framing it as \"membranes create rooms, and rooms allow specialisation\" makes every organelle difference fall into place, rather than being a table of features to recite."),

  h2("The nucleus runs the cell without leaving the room"),
  p("One more structural idea that ties the others together. The nucleus holds the DNA, but DNA never leaves — it is too valuable to risk in the cell's traffic. Instead the cell copies the relevant instructions into messenger RNA, which passes out through the nuclear pores to the ribosomes, where proteins are built. The master copy stays protected; only working copies travel."),
  p("This explains the nuclear envelope's double membrane and its pores in one stroke: a barrier strong enough to protect the genome, perforated enough to export instructions on demand. It also connects cell biology to genetics and to protein synthesis, which is why examiners like it — a single well-understood structure lets them ask questions that span three topics at once."),

  h2("Where biology marks are actually lost"),
  mli(["Memorising structures without their function. The exam asks \"why\", and a name with no reason attached earns nothing."]),
  mli(["Treating the membrane as a passive wall rather than a selective, energy-spending gatekeeper."]),
  mli(["Confusing active and passive transport — the pivot is simply whether the molecule moves down its gradient (free) or up it (costs ATP)."]),
  mli(["Reciting organelles in isolation instead of seeing the cell as an integrated system where the parts cooperate."]),
  mli(["Getting osmosis directions backwards — water moves toward the higher solute concentration, and a diagram beats a memorised rule every time."]),

  h2("How to study cell biology"),
  mli(["For every structure, write its function in one line. If you cannot, you have memorised a label, not learned a cell."]),
  mli(["Draw the cell repeatedly from memory, then explain what each part does out loud. Recall plus reasoning beats rereading."]),
  mli(["Group by theme — everything involving membranes, everything involving energy — rather than by alphabetical list."]),
  mli(["Always ask \"what is this shape for?\" The surface-area logic above answers a startling number of these questions on its own."]),

  h2("Getting help with cell biology"),
  linked(["If cell biology feels like an ocean of terms to memorise, the fix is a change of approach rather than more flashcards — reasoning from structure to function turns hundreds of facts into a handful of principles. Our ", { text: "biology tutoring in Burnaby and online", href: "/programs/biology" }, " teaches exactly that shift, from Grade 11 and 12 through first-year university."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum and to university course expectations. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test or a topic you are stuck on."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))].filter(Boolean);
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}\n  /blog/${SLUG}\n  words     : ${words}  (was 655)\n  equations : ${total} (${bad} invalid)\n  diagrams  : ${body.filter((b) => b._type === "htmlBlock").length}\n  links     : ${links.join(", ")}`);
  if (bad) { console.error("  ✗ LaTeX"); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ dead: ${dead.join(", ")}`); process.exit(1); }
  console.log(`  links ok  : all ${links.length} resolve ✓`);
  if (words < 1500) { console.error(`  ✗ under floor by ${1500 - words}`); process.exit(1); }
  // sibling overlap vs the other biology posts
  const sibs = await client.fetch(`*[_type=="post" && slug.current in ["biology-molecular-biology","biology-genetics-evolution","biology-human-physiology"]].body[].children[].text`);
  const sh = (s) => { const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/); const o = new Set(); for (let i = 0; i + 7 <= w.length; i++) o.add(w.slice(i, i + 7).join(" ")); return o; };
  const a = sh(text), b = sh((sibs || []).join(" "));
  const shared = [...a].filter((x) => b.has(x)).length;
  console.log(`  vs siblings: ${((shared / Math.min(a.size, b.size || 1)) * 100).toFixed(2)}% overlap`);
  if (shared / Math.min(a.size, b.size || 1) > 0.03) { console.error("  ✗ too similar to sibling biology posts"); process.exit(1); }
  const doc = await client.fetch(`*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ not found"); process.exit(1); }
  if (commit) { await client.patch(doc._id).set({ body }).commit(); console.log("  ✓ upgraded (live)"); }
  else console.log("\nRe-run with --commit to apply.");
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
