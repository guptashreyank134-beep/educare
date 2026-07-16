/**
 * The remaining 3 biology posts (human physiology, molecular biology, ecology),
 * each rebuilt distinct from the others and from cell-bio/genetics. Uses the
 * shared applyPost gate (LaTeX, dead-links, floor, sibling-overlap, live verify).
 * Quant claims verified in scripts/verify-bio-family.mjs.
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const BIO_SIBS = ["biology-cell-biology", "biology-genetics-evolution", "biology-molecular-biology", "biology-human-physiology", "biology-ecology-biotechnology"];
const help = (label) => linked([label, { text: "biology tutoring in Burnaby and online", href: "/programs/biology" }, ", from Grade 11 and 12 through first-year university."]);
const bookLine = linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a topic you are stuck on."]);

/* ---------- 1. HUMAN PHYSIOLOGY: negative feedback ---------- */
const feedbackSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 210" role="img" aria-label="A negative feedback loop. A stimulus raises body temperature above the set point of 37 degrees. A receptor detects it, a control centre in the brain responds, and effectors like sweat glands and blood vessels bring the temperature back down toward the set point. The response opposes the change." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs><marker id="fb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3A5A98"/></marker></defs>
    ${[["Stimulus", 30, "temp rises"], ["Receptor", 145, "detects it"], ["Control", 260, "brain decides"], ["Effector", 375, "sweat, vessels"]].map(([t, x, s], i) => `<rect x="${x - 5}" y="60" width="80" height="46" rx="6" fill="${i === 3 ? "#3A5A98" : "#EEF2F7"}" stroke="#3A5A98" stroke-width="1.5"/><text x="${x + 35}" y="80" font-size="12" fill="${i === 3 ? "#fff" : "#1F2937"}" text-anchor="middle" font-weight="600">${t}</text><text x="${x + 35}" y="96" font-size="9.5" fill="${i === 3 ? "#E2E8F0" : "#64748B"}" text-anchor="middle">${s}</text>`).join("")}
    ${[105, 220, 335].map((x) => `<line x1="${x}" y1="83" x2="${x + 30}" y2="83" stroke="#3A5A98" stroke-width="2" marker-end="url(#fb)"/>`).join("")}
    <path d="M 410 106 Q 430 160 220 175 Q 40 190 40 106" fill="none" stroke="#B45309" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#fb)"/>
    <text x="225" y="188" font-size="11.5" fill="#B45309" text-anchor="middle" font-weight="600">response OPPOSES the change — back toward 37°C</text>
    <text x="220" y="30" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="700">Negative feedback keeps you at the set point</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Almost every system in the body is this one loop. Learn the loop, and thermoregulation, blood sugar,
    blood pressure and water balance become the same idea with different labels.
  </figcaption>
</figure>`;

const humanPhysiology = [
  p("Human physiology looks like the most memorisation-heavy topic in biology — organ after organ, system after system, each with its own vocabulary. Students try to hold it all in their heads and it collapses. There is a better organising idea, and almost the entire subject hangs from it: the body's overriding goal is to keep its internal conditions constant, and it does so with one repeating mechanism."),
  p("That constancy is homeostasis, and the mechanism is negative feedback. Grasp the loop once and thermoregulation, blood-sugar control, blood pressure and water balance stop being four topics to memorise and become four instances of the same pattern."),
  help("This is how we teach physiology in "),

  h2("Negative feedback: the loop behind everything"),
  p("The body holds dozens of variables near fixed set points — temperature near 37°C, blood glucose around 5 mmol/L, blood pH in a razor-thin band. Negative feedback is how it does it, and the word negative is the whole point: the response opposes the change that triggered it."),
  { _type: "htmlBlock", _key: key(), html: feedbackSvg },
  p("Every loop has the same four parts. A stimulus pushes a variable off its set point; a receptor detects the deviation; a control centre — usually in the brain — decides on a response; and effectors carry it out, pushing the variable back. Get too hot and you sweat and your skin vessels widen to shed heat; get too cold and you shiver and those vessels narrow. Same loop, opposite directions, one goal: return to the set point."),
  p("Once you can name those four parts in one scenario, you can name them in any of them. Blood sugar rises after a meal, the pancreas detects it, insulin is the response, and cells taking up glucose are the effect. It is thermoregulation with different nouns, and examiners deliberately test whether you see that."),

  h2("The systems are pumps, pipes and exchange surfaces"),
  p("With the loop in hand, the organ systems become easier because most of them are solving a transport or exchange problem — and you have already met the geometry that governs exchange."),
  mp(["The heart is a pump, and its output is simple arithmetic: cardiac output equals heart rate times stroke volume. At rest, roughly ", im(String.raw`70 \times 70 = 4900`), " mL per minute — about five litres, which happens to be your entire blood volume. Your whole blood supply completes a lap roughly once a minute at rest, and far faster during exercise, when both terms rise."]),
  p("The lungs and the small intestine are exchange surfaces, and both are folded — alveoli, villi — to maximise area, exactly the surface-area logic that governs the cell. The kidneys are filters that also run on feedback, adjusting water reabsorption to hold blood concentration steady. Seeing each organ as a pump, a pipe, a filter or an exchange surface turns a wall of detail into a short list of engineering jobs."),

  h2("Enzymes: why body temperature is not negotiable"),
  p("Underneath every physiological process are enzymes — protein catalysts that make the body's chemistry run fast enough to sustain life. This is also where homeostasis earns its urgency, because enzymes are fussy about their conditions in a way that explains why the set points matter so much."),
  p("An enzyme works by fitting its specific substrate into an active site, and that fit depends on the enzyme's precise three-dimensional shape. Raise the temperature too far and the protein denatures — its shape unravels, the active site deforms, and the enzyme stops working, permanently. The same happens if pH drifts outside a narrow band. This is why a fever of just a few degrees is dangerous, and why the body defends 37°C and its blood pH so aggressively: homeostasis is not tidiness, it is keeping the entire enzyme workforce inside the conditions where it functions at all. Seeing that connection — feedback loops exist to protect enzymes — ties the whole topic together and answers questions that span physiology and biochemistry at once."),

  h2("The immune system: recognition, then response"),
  p("Defence is a high-frequency topic, and it becomes manageable when framed as a two-part problem: recognise what does not belong, then destroy it. The body distinguishes self from non-self by molecular markers, and anything foreign — a bacterium, a virus — carries antigens that flag it as an intruder."),
  p("The response comes in two tiers. Innate immunity is fast, general and always ready: barriers like skin, and cells that engulf anything foreign without needing to identify it specifically. Adaptive immunity is slower but precise: it builds antibodies tailored to a particular antigen, and — crucially for the exam — it remembers. The memory cells left behind after an infection are why you rarely catch the same disease twice, and they are the entire principle behind vaccination, which trains that memory using a harmless version of the threat. Framing immunity as recognise-then-respond, with a fast general tier and a slow specific one, organises a topic that otherwise dissolves into cell names."),

  h2("Nerves and the all-or-nothing signal"),
  mp(["The nervous system is where physiology meets a little physics, and it rewards understanding over memorisation. A neuron sits at a resting potential of about ", im(String.raw`-70`), " mV, held there by ion pumps. A stimulus that pushes it past a threshold of roughly ", im(String.raw`-55`), " mV triggers an action potential — and here is the key idea: it is all-or-nothing. Cross the threshold and you get a full, identical spike; fall short and you get nothing at all. There is no partial signal."]),
  p("This explains something students often find puzzling: how does a nerve encode a strong stimulus if every spike is the same size? Not by bigger spikes, but by more of them, more often. Intensity is frequency. That single reframing answers a whole class of exam questions, and it is invisible to anyone memorising the stages of an action potential without grasping what they are for."),

  h2("Two control systems, fast and slow"),
  p("The body regulates itself with two communication networks, and a great deal of physiology is understanding the division of labour between them. The nervous system is the fast one: electrical signals travelling along neurons deliver a message in milliseconds, act briefly, and stop — pull your hand off a hot stove before you have consciously registered the heat. The endocrine system is the slow one: hormones released into the blood travel everywhere, take seconds to minutes to act, and can keep acting for hours or days — growth, the menstrual cycle, the long arc of blood-sugar control between meals."),
  p("The exam repeatedly asks you to distinguish them, and the reliable rule is duration and reach. If a response is instant, targeted and brief, it is nervous. If it is gradual, widespread and sustained, it is hormonal. Many real responses use both — a fright triggers an instant nervous jump and a slower flood of adrenaline that keeps you keyed up afterwards — and recognising the two-speed design is what turns a confusing scenario into a clear one."),

  h2("Gas exchange: a surface problem, solved by folding"),
  p("Breathing is where physiology and the geometry of the cell meet most clearly. Every cell needs oxygen delivered and carbon dioxide removed, and both cross a surface by diffusion — which, as the cell chapter shows, is only fast over tiny distances. A human body is far too large to supply its interior by diffusion from the skin, so it evolved a dedicated exchange organ built to defeat that limit."),
  p("The lungs solve it with area and thinness. Hundreds of millions of alveoli give a gas-exchange surface the size of a tennis court folded into your chest, each one wrapped in capillaries and just one cell thick, so oxygen has almost no distance to travel. Steep concentration gradients — kept steep by breathing in fresh air and by blood constantly carrying oxygen away — drive diffusion in the right direction. Every feature of the lung is an answer to the surface-area-to-volume problem, and framing it that way connects respiration straight back to why cells are small in the first place."),

  h2("Where physiology marks are actually lost"),
  mli(["Memorising systems in isolation instead of seeing homeostasis as the shared goal."]),
  mli(["Confusing negative feedback (opposes change, stabilising) with positive feedback (amplifies it, as in childbirth or blood clotting) — the exam contrasts them deliberately."]),
  mli(["Forgetting that the same four-part loop underlies every regulated variable."]),
  mli(["Treating the action potential as a set of steps rather than an all-or-nothing signal whose strength is coded by frequency."]),
  mli(["Ignoring the geometry — exchange surfaces are folded for area, and that is testable."]),

  h2("How to study human physiology"),
  mli(["Draw the negative-feedback loop blank, then fill it in for temperature, glucose, and water balance in turn. Same diagram, three labels."]),
  mli(["For each organ, write its one-line job: pump, pipe, filter, or exchange surface."]),
  mli(["Contrast negative and positive feedback with a concrete example of each, so you never mix them up."]),
  mli(["Explain the all-or-nothing principle out loud — if you can say why frequency codes intensity, you own it."]),

  h2("Getting help with human physiology"),
  help("If physiology feels like endless memorisation, the fix is the organising idea — homeostasis and the feedback loop turn dozens of facts into one pattern. Our "),
  bookLine,
];

/* ---------- 2. MOLECULAR BIOLOGY: central dogma ---------- */
const dogmaSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 170" role="img" aria-label="The central dogma of molecular biology. DNA is transcribed into RNA, which is translated into protein. DNA holds the master instructions, RNA is the working copy, and protein does the job. An arrow shows DNA also replicates itself." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs><marker id="cd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3A5A98"/></marker></defs>
    ${[["DNA", 40, "master copy", "#3A5A98"], ["RNA", 195, "working copy", "#94A3B8"], ["PROTEIN", 340, "does the job", "#B45309"]].map(([t, x, s, col]) => `<rect x="${x}" y="60" width="90" height="50" rx="8" fill="${col}"/><text x="${x + 45}" y="82" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">${t}</text><text x="${x + 45}" y="99" font-size="10" fill="#E2E8F0" text-anchor="middle">${s}</text>`).join("")}
    <line x1="132" y1="85" x2="193" y2="85" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#cd)"/>
    <text x="162" y="76" font-size="10.5" fill="#3A5A98" text-anchor="middle" font-weight="600">transcription</text>
    <line x1="287" y1="85" x2="338" y2="85" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#cd)"/>
    <text x="312" y="76" font-size="10.5" fill="#3A5A98" text-anchor="middle" font-weight="600">translation</text>
    <path d="M 55 60 Q 55 30 85 30 Q 115 30 115 58" fill="none" stroke="#64748B" stroke-width="2" marker-end="url(#cd)"/>
    <text x="85" y="24" font-size="10" fill="#64748B" text-anchor="middle">replication</text>
    <text x="220" y="145" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="600">one direction, three molecules, one flow of information</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The whole of molecular biology is this arrow. DNA is the vault copy that never leaves; RNA is the
    disposable working copy; protein is the finished product that actually does something.
  </figcaption>
</figure>`;

const molecularBiology = [
  p("Molecular biology is the layer beneath everything else in the subject — the chemistry of the molecules that carry and express genetic information. Students often meet it as a blur of DNA, RNA, enzymes and three-letter codes, and try to memorise the machinery step by step. That is the hard way in."),
  p("The easy way is one sentence, the central dogma: information flows from DNA to RNA to protein. Almost every process in the topic is a step along that arrow, and once you can see where a given detail sits on it, the machinery organises itself."),
  help("This is the approach we take in "),

  h2("The central dogma: one arrow, three molecules"),
  p("Hold the roles in a single analogy and you will never confuse them. DNA is the master copy locked in the vault — the library's reference book that must not leave. RNA is a cheap working photocopy you can carry out and use. Protein is the thing the instructions were for, the finished product that does the actual work of the cell."),
  { _type: "htmlBlock", _key: key(), html: dogmaSvg },
  p("Transcription is copying a gene from DNA into messenger RNA — making the working copy. Translation is reading that RNA to build a protein — following the instructions. DNA also replicates, copying itself before a cell divides so each daughter gets a full set. Three processes, and each is just one labelled step of the arrow. When an exam question describes an unfamiliar detail, your first move is to place it: is this transcription, translation, or replication? Half the answer follows from that alone."),

  h2("The genetic code: three letters, and deliberately redundant"),
  mp(["Proteins are chains of amino acids, and the code that specifies them reads three RNA bases at a time — a codon. With four possible bases, that gives ", im(String.raw`4^3 = 64`), " codons. But there are only about 20 amino acids to specify, plus a stop signal. So the code is redundant: several codons can mean the same amino acid."]),
  p("That redundancy is not a flaw, and understanding why is worth marks. It is a safety margin. If a codon needed a unique meaning there would be no slack, and every mutation would change the protein. Because the code has spare capacity, many single-base changes are silent — they land on a different codon for the same amino acid and nothing changes. The redundancy makes life robust against small copying errors, and questions about mutation types lean directly on this."),

  h2("Three RNAs, three jobs, one assembly line"),
  p("Students often treat RNA as a single thing, but translation runs on three kinds working together, and knowing their division of labour makes protein synthesis click. Messenger RNA (mRNA) is the working copy carried out of the nucleus — it holds the codons, the actual sequence to be read. Transfer RNA (tRNA) is the delivery service: each tRNA carries one specific amino acid and has an anticodon that matches a codon, so it drops its cargo at exactly the right spot. Ribosomal RNA (rRNA) builds the ribosome itself, the machine that clamps onto the mRNA and runs the whole process."),
  p("Put them together and translation is an assembly line you can picture: the ribosome moves along the mRNA one codon at a time; for each codon, the matching tRNA arrives carrying the correct amino acid; the ribosome links that amino acid to the growing chain and moves on. A stop codon signals the end, the finished protein is released, and it folds into its working shape. Seeing the three RNAs as reader, courier and machine turns a heavily-tested process from a memorised sequence into a mechanism you can narrate — which is exactly what the higher-mark questions ask you to do."),

  h2("Base pairing is why heredity works at all"),
  mp(["The elegance of DNA is in its pairing rules: adenine always bonds with thymine, guanine always with cytosine. This has an immediate consequence you can calculate. If a strand is 30% adenine, it must be 30% thymine, and the remaining 40% splits evenly into 20% guanine and 20% cytosine — because ", im(String.raw`\%A = \%T`), " and ", im(String.raw`\%G = \%C`), " always. This is Chargaff's rule, and it is a favourite quick calculation."]),
  p("More importantly, complementary pairing is the mechanism of inheritance itself. Because each base dictates its partner, either strand carries all the information needed to rebuild the other — which is exactly how DNA copies itself faithfully before a cell divides. Heredity is not a mysterious property; it is a direct consequence of A pairing with T and G with C. Students who see that stop treating replication as something to memorise."),

  h2("Replication is semiconservative, and that word is the answer"),
  p("When DNA copies itself, the two strands of the double helix unzip, and each old strand serves as a template for building a new partner. The result is two double helices, each made of one original strand and one freshly built one. That is what semiconservative means — half of every new molecule is conserved from the old — and it is a favourite exam term precisely because the word contains its own explanation once you see it."),
  p("The mechanism matters because it is why copying is accurate. Each existing strand dictates its new partner base by base through the pairing rules, so errors have to fight against a template that specifies the correct answer. Enzymes do the work — one unwinds the helix, another builds the new strand, others proofread — but the reliability comes from the template itself. Framing replication as 'each old strand is a mould for a new one' turns a page of enzyme names into a single idea you can reconstruct under pressure."),

  h2("Why every cell has the same DNA but does different jobs"),
  p("Here is a question that unlocks a surprising amount of modern molecular biology: if every cell in your body carries the identical genome, why is a nerve cell nothing like a muscle cell? They have the same instructions and behave completely differently."),
  p("The answer is gene regulation — cells switch genes on and off, expressing only the ones they need. A muscle cell runs its muscle genes and silences the rest; a nerve cell does the opposite. The DNA is the same everywhere; what differs is which parts are being read. This is why the same central-dogma machinery produces hundreds of cell types from one genome, and it is the foundation of how organisms develop from a single fertilised egg. Exam questions about cell specialisation, development, and even cancer trace back to this: control is not in the genes you have, but in the genes you switch on. Understanding that regulation, not gene content, drives the differences between cells is one of the highest-leverage ideas in the topic."),

  h2("Mutations: small changes, ranked by consequence"),
  p("Because the whole system is information, a mutation is simply a copying error, and the exam wants you to rank them by effect. A silent mutation lands on a synonymous codon and changes nothing — the redundancy above at work. A missense mutation swaps one amino acid for another, with effects ranging from harmless to severe. A nonsense mutation creates a premature stop codon and truncates the protein, usually breaking it. And a frameshift — inserting or deleting a base — shifts the entire reading frame downstream, garbling everything after it, which is why frameshifts are typically the most damaging. Knowing this ranking, and why it follows from how the code is read, answers a whole cluster of molecular-genetics questions."),

  h2("Why this is the layer everything else rests on"),
  p("Molecular biology is worth the effort because it is the foundation the rest of biology is built on. Genetics is molecular biology seen from the outside — inheritance is just DNA being copied and passed on. Evolution is changes in these molecular sequences accumulating over time. Cell biology's organelles are machines for running these molecular processes. And modern medicine is increasingly molecular: cancer is understood as mutations in growth-control genes, genetic diseases as specific base changes, and new therapies as ways to correct or silence particular sequences. Students who own the central dogma find that half of the rest of biology stops being separate subjects and starts being the same story at different scales."),

  h2("Where molecular biology marks are actually lost"),
  mli(["Confusing DNA, RNA and protein roles — vault copy, working copy, finished product keeps them straight."]),
  mli(["Mixing up transcription and translation. Transcription writes RNA; translation reads it to build protein."]),
  mli(["Forgetting the code is redundant, and therefore why some mutations are silent."]),
  mli(["Botching Chargaff calculations by forgetting %A=%T and %G=%C."]),
  mli(["Treating mutation types as a list rather than a ranking that follows from how codons are read."]),

  h2("How to study molecular biology"),
  mli(["Draw the DNA → RNA → protein arrow and place every new fact on it before learning the detail."]),
  mli(["Use the vault-copy / working-copy / product analogy until the three molecules never blur."]),
  mli(["Practise Chargaff percentages until they are instant."]),
  mli(["For each mutation type, say in one line what it does to the protein and why."]),

  h2("Getting help with molecular biology"),
  help("If molecular biology feels like machinery to memorise, the central dogma turns it into one flow you can reason along. Our "),
  bookLine,
];

/* ---------- 3. ECOLOGY & BIOTECHNOLOGY: energy pyramid ---------- */
const pyramidSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 400 230" role="img" aria-label="An energy pyramid. Producers hold ten thousand joules, primary consumers one thousand, secondary consumers one hundred, tertiary consumers ten. Only about ten percent of energy passes to each next level, which is why food chains rarely exceed four or five links." style="width:100%;max-width:400px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    ${[["Producers", 10000, 340, 175, "#3A5A98"], ["Primary", 1000, 250, 135, "#5578b8"], ["Secondary", 100, 160, 95, "#94A3B8"], ["Tertiary", 10, 70, 55, "#CBD5E1"]].map(([t, j, w, y], i) => `<rect x="${200 - w / 2}" y="${y}" width="${w}" height="34" fill="${["#3A5A98", "#5578b8", "#94A3B8", "#B45309"][i]}"/><text x="200" y="${y + 22}" font-size="12" fill="#fff" text-anchor="middle" font-weight="600">${t}: ${j} J</text>`).join("")}
    <text x="200" y="30" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="700">Only ~10% moves up each level</text>
    <text x="365" y="120" font-size="10.5" fill="#B45309" text-anchor="middle">90% lost as</text>
    <text x="365" y="133" font-size="10.5" fill="#B45309" text-anchor="middle">heat each step</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Roughly nine-tenths of the energy at each level is lost as heat, so only a tenth reaches the next.
    Four steps down, 10,000 J has become 10 — which is why top predators are rare and food chains are short.
  </figcaption>
</figure>`;

const ecology = [
  p("Ecology can feel like the softest topic in biology — a lot of terms about who eats whom and where things live — and students under-prepare for it as a result. That is a mistake, because underneath the vocabulary sits some genuinely quantitative reasoning about energy and populations, and that is exactly what the harder exam questions target."),
  p("The organising idea is that ecology is the study of energy and matter moving through living systems. Follow the energy, and most of the topic — food chains, population limits, the shape of ecosystems — falls into place as consequence rather than fact."),
  help("This is how we frame it in "),

  h2("The 10% rule: why big predators are rare"),
  p("Energy enters an ecosystem from the sun, is captured by producers, and passes up the food chain as one organism eats another. The single most important quantitative fact in ecology is how little survives each transfer: only about 10% of the energy at one level reaches the next."),
  { _type: "htmlBlock", _key: key(), html: pyramidSvg },
  mp(["The other 90% is lost, mostly as heat from the organisms' own living — the second law of thermodynamics, showing up in a rainforest. Trace it: ", im(String.raw`10{,}000`), " J in the producers becomes 1,000 in the herbivores, 100 in their predators, and just 10 two steps further up. Four transfers turn ten thousand joules into ten."]),
  p("That single number explains a startling amount. It is why food chains rarely exceed four or five links — there is simply not enough energy left to support another level. It is why top predators are always rare and need enormous territories. And it is why, pound for pound, eating plants feeds more people than eating meat: every trophic step throws away nine-tenths of what came before. A question that looks like ecology is often this thermodynamic fact in disguise."),

  h2("Population growth: two curves, one limit"),
  p("Populations grow, but not forever, and the exam wants you to know the two shapes and what separates them."),
  mp(["With unlimited resources, growth is exponential — the more individuals there are, the faster the population adds more, giving the classic J-shaped curve. But resources are never unlimited. As a population approaches the carrying capacity of its environment — the maximum the habitat can sustain — growth slows and levels off into an S-shaped logistic curve. The bend happens because competition for food, space and other limits rises with crowding."]),
  p("The useful detail for exams: growth is fastest not when the population is largest, but at about half the carrying capacity, where there are enough individuals to reproduce quickly but not yet enough to be strangled by competition. Recognising whether a scenario describes exponential or logistic growth — and knowing that limiting factors are what bend one into the other — answers most population questions."),

  h2("Cycles: matter goes round even as energy runs out"),
  p("Here is a distinction worth getting right, because it is a favourite exam trap: energy flows through an ecosystem and is lost, but matter cycles and is reused. The carbon, nitrogen and water in your body have been through countless organisms before you and will pass through countless more."),
  p("The carbon cycle links photosynthesis (pulling carbon dioxide from the air into sugar) with respiration and combustion (returning it) — which is precisely why burning fossil fuels, releasing carbon locked away for millions of years, disrupts the balance. The nitrogen cycle depends on bacteria to convert atmospheric nitrogen into forms plants can use. Framing these as loops that must balance makes both the biology and the environmental questions about human disruption far easier to reason about."),

  h2("How species interact: five relationships to name"),
  p("A large share of ecology questions describe two species living together and ask what kind of relationship it is. There are only a handful, and naming them comes down to who benefits and who is harmed. Predation and herbivory: one gains, one loses — the obvious case. Competition: both are harmed, because they are fighting over the same limited resource, and the exam likes to point out that competition can be between different species or within one. Then the three kinds of symbiosis, where species live in close partnership: mutualism, where both benefit (bees and flowers); commensalism, where one benefits and the other is unaffected; and parasitism, where one benefits at the other's expense, like predation in slow motion."),
  p("The reliable method is a two-column tally: mark a plus, minus or zero for each species, and the relationship names itself. Plus-plus is mutualism, plus-minus is predation or parasitism, minus-minus is competition. Turning a wordy scenario into two symbols is faster and more accurate than trying to remember definitions, and it is exactly the kind of question that rewards a method over memory."),

  h2("Succession and biodiversity: ecosystems change and it matters"),
  p("Ecosystems are not static. Ecological succession is the predictable way a community develops over time — bare rock or a cleared field is colonised first by hardy pioneer species, which change the environment enough for others to move in, until the community settles into a stable, diverse climax state. Understanding succession explains how ecosystems recover after a fire or a flood, and why that recovery follows stages rather than happening all at once."),
  p("Biodiversity — the variety of life in an ecosystem — is the other big idea, and its importance is practical, not sentimental. A diverse ecosystem is more resilient: if one species fails, others can fill its role, so the whole system is buffered against collapse. A monoculture, by contrast, is fragile — a single pest can devastate it. This is why biodiversity loss is treated as a serious threat rather than an aesthetic one, and why exam questions about conservation want you to argue from resilience. It also links back to energy and matter: more diverse ecosystems tend to cycle nutrients and capture energy more completely."),

  h2("Biotechnology: ecology's applied edge"),
  p("Modern biology courses pair ecology with biotechnology, and the link is natural: both are about intervening in living systems. The techniques rest on the molecular biology from earlier — because we understand DNA, we can read it, copy it, and edit it. PCR amplifies tiny amounts of DNA for analysis; genetic modification inserts a useful gene into an organism; CRISPR edits sequences with precision. You do not need the fine mechanics for most exams, but you do need to grasp that each tool is an application of the central dogma, and to be able to weigh the benefits — disease-resistant crops, new medicines — against the ecological and ethical risks. That balanced reasoning is what the essay-style questions reward."),

  h2("Human impact: the disruptions the exam expects you to explain"),
  p("Modern biology courses expect students to connect ecological principles to the ways humans disrupt them, and the strongest answers reason from the principles rather than reciting problems. Climate change is the carbon cycle knocked out of balance — releasing carbon stored underground for millions of years faster than the cycle can reabsorb it. Eutrophication is the nitrogen and phosphorus cycles overloaded — fertiliser runoff feeds an algal bloom, which dies, and the bacteria decomposing it strip the oxygen from the water, suffocating the fish. Deforestation is the removal of producers, cutting the base of the energy pyramid and the carbon sink at once."),
  p("Invasive species are a favourite because they test the interaction concepts directly: a species introduced without its usual predators or competitors can multiply unchecked, outcompeting natives and collapsing the local food web. Notice that every one of these is an ecological principle running in reverse — a cycle overloaded, a pyramid undermined, an interaction unbalanced. A student who has understood energy flow, matter cycling and species interactions can reason out the consequences of a novel disruption they have never seen before, which is precisely what the essay questions reward over memorised case studies."),

  h2("Where ecology marks are actually lost"),
  mli(["Under-preparing because it 'feels' descriptive — the quantitative energy and population questions are where marks go."]),
  mli(["Confusing energy flow (lost at each step) with matter cycling (reused) — the classic trap."]),
  mli(["Forgetting the 10% rule and why it caps food-chain length."]),
  mli(["Mixing up exponential and logistic growth, or missing that limiting factors bend one into the other."]),
  mli(["Giving one-sided biotechnology answers when the question wants benefits weighed against risks."]),

  h2("How to study ecology and biotechnology"),
  mli(["Trace energy through a food chain with real numbers using the 10% rule until it is automatic."]),
  mli(["Draw both growth curves and label what causes the logistic curve to level off."]),
  mli(["Keep 'energy flows, matter cycles' as a one-line anchor."]),
  mli(["For each biotech tool, write one benefit and one risk, so balanced answers come naturally."]),

  h2("Getting help with ecology and biotechnology"),
  help("If ecology feels vague, the quantitative core — energy transfer and population limits — is where the marks and the understanding both live. Our "),
  bookLine,
];

await applyPost({ slug: "biology-human-physiology", was: 447, body: humanPhysiology, siblingSlugs: BIO_SIBS.filter((s) => s !== "biology-human-physiology") });
await applyPost({ slug: "biology-molecular-biology", was: 427, body: molecularBiology, siblingSlugs: BIO_SIBS.filter((s) => s !== "biology-molecular-biology") });
await applyPost({ slug: "biology-ecology-biotechnology", was: 395, body: ecology, siblingSlugs: BIO_SIBS.filter((s) => s !== "biology-ecology-biotechnology") });
