/**
 * Chemistry course-code pages (UBC CHEM / Langara CHEM), deliberately split:
 * UBC = atomic structure & bonding (structure of matter); Langara = thermochem,
 * acids/bases, electrochemistry (energy & reactions). Overlap gated against the
 * FULL chemistry sibling set (HS family + stoichiometry flagships + kinetics).
 * Verified in scripts/verify-chem-cc.mjs.
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const UC = "/programs/university-chemistry";
const CHEM_SIBS = [
  "university-chemistry-ubc-chemistry-chem-111-121-123",
  "university-chemistry-langara-college-chemistry-chem-1114-1118-1120",
  "university-chemistry-chemical-kinetics-equilibrium",
  "chemistry-chemical-reactions-bonding", "chemistry-organic-chemistry",
  "chemistry-physical-chemistry", "chemistry-stoichiometry-gas-laws",
  "step-by-step-guide-stoichiometry-grade-11-chemistry",
];
const sibs = (self) => CHEM_SIBS.filter((s) => s !== self);

/* ===== UBC CHEM: ATOMIC STRUCTURE & BONDING ===== */
const ubc = [
  p("First-year university chemistry begins where high school left the story unfinished: with the structure of the atom and how atoms bond, explained not by rules to memorise but by a genuinely different model of how matter is built. Students who breezed through high-school chemistry by memorising often struggle here, because the course demands you understand why atoms behave as they do — why the periodic table has the shape it does, why molecules have the geometries they have. Grasping the structure of matter, from the electron up, is the foundation everything else in chemistry rests on."),
  p("This guide covers the structure-of-matter foundations of university chemistry — atomic structure, the periodic trends that follow from it, and chemical bonding and molecular geometry — so you understand the 'why' the course is built around."),

  h2("The atom is mostly electrons, arranged in a pattern"),
  p("Chemistry is, at bottom, the behaviour of electrons, and university chemistry starts by giving you a proper model of how they are arranged. Electrons occupy orbitals in a specific, patterned way described by electron configuration — carbon's six electrons, for instance, fill as 1s² 2s² 2p². This is not arbitrary bookkeeping; the arrangement of an atom's outermost electrons determines almost everything about how it behaves chemically, which is why the configuration matters so much."),
  p("The key idea is that atoms are most stable with a full outer shell — often eight electrons, the octet — and that the drive toward this stability explains why atoms bond at all. An atom with a nearly-full shell tends to gain electrons; one with just a few outer electrons tends to lose them. Understanding electron configuration, and the stability that a full shell confers, is the conceptual key that unlocks bonding, reactivity, and the periodic table alike. Students who learn configurations as a pattern to understand rather than a list to memorise find that the rest of the course follows from it."),

  h2("The quantum ideas behind the model"),
  p("What makes university atomic theory genuinely different from the high-school version is that it introduces the quantum mechanical picture of the atom, and this is where some students feel the ground shift. Electrons do not orbit the nucleus like tiny planets; they occupy orbitals, which are regions of space describing where an electron is likely to be found, with shapes and energies dictated by quantum rules. This probabilistic, fuzzy picture replaces the neat planetary model, and accepting it is a conceptual leap."),
  p("You do not need to master the full mathematics to grasp what matters chemically: that electrons occupy discrete energy levels and specific orbital shapes, that these fill in a defined order, and that the arrangement of the outermost ones governs an element's chemistry. The quantum model explains why electron configurations are what they are, why the periodic table has the structure it has, and why energy is absorbed and emitted in discrete amounts. Getting comfortable with the idea that the atom is governed by quantum rules — strange but consistent — is part of the intellectual transition first-year chemistry asks you to make, and it is a common place where a clear explanation prevents lasting confusion."),

  h2("The periodic table is a map of atomic structure"),
  p("The periodic table looks like something to memorise, but it is better understood as a map that organises elements by their atomic structure — and once you see the logic, its patterns become predictive rather than arbitrary. Elements in the same column have similar outer-electron arrangements, which is why they behave similarly. And several properties change smoothly across the table in trends you can reason about rather than recall."),
  p("Electronegativity — an atom's pull on shared electrons — increases up and to the right, peaking at fluorine, while atomic radius does the opposite, increasing down and to the left. These trends are not separate facts; they both follow from how tightly the nucleus holds the outer electrons, which depends on the atomic structure. A smaller, more electronegative atom holds its electrons tightly, and that single idea drives reactivity, bonding, and much else. Learning to read the periodic table as a consequence of atomic structure, and to predict properties from an element's position, replaces a huge amount of memorisation with understanding, and it is one of the most powerful shifts a first-year student can make."),

  h2("Bonding: why atoms stick together"),
  p("Chemical bonding is where atomic structure produces the substances of the world, and understanding it as a consequence of electrons seeking stability makes it coherent rather than a set of rules. There are two main pictures. In an ionic bond, one atom transfers electrons to another — typically a metal giving to a non-metal — and the resulting oppositely-charged ions attract. In a covalent bond, atoms share electrons to complete their outer shells together, which is how most molecules are held together."),
  p("The nature of a bond depends on the electronegativity difference between the atoms: a large difference gives ionic bonding, a small difference gives covalent, and an intermediate difference gives a polar covalent bond, where electrons are shared unequally, giving the molecule partial charges. This bond polarity has huge consequences for how substances behave. Understanding bonding as atoms achieving stable electron arrangements — by transferring or sharing — and reasoning about bond type from electronegativity, rather than memorising which compounds are ionic, is exactly the conceptual approach university chemistry rewards."),
  linked(["If first-year chemistry's shift from memorisation to understanding — atomic structure, periodic trends, bonding — is where you are struggling, that conceptual foundation is exactly what a good tutor can build quickly. Our ", { text: "university chemistry tutoring", href: UC }, " teaches the 'why' the course is built on, working from your actual material and past exams."]),

  h2("Molecular geometry: shape determines behaviour"),
  p("Once atoms bond into molecules, their three-dimensional shape becomes crucial, because a molecule's geometry determines its properties and how it reacts. University chemistry uses a simple, powerful idea — that electron pairs around a central atom arrange themselves to be as far apart as possible — to predict these shapes, a model known as VSEPR. From this one principle, the geometries of countless molecules follow."),
  mp(["The results are concrete and predictable. Carbon dioxide, with no lone pairs on the central carbon, is linear at 180°. Methane, with four bonding pairs, is tetrahedral at about 109.5°. Water, with two bonding pairs and two lone pairs, is bent at about 104.5°, because the lone pairs push the bonds closer together. This bent shape is why water is polar, which in turn explains its remarkable properties as a solvent. Understanding that molecular shape follows from electron-pair repulsion, and that shape drives properties, connects the abstract structure of matter to the tangible behaviour of substances, and it is a genuinely satisfying part of the course to master."]),

  h2("Intermolecular forces: the reason matter has states"),
  p("A final piece of the structure-of-matter foundation explains why substances are solids, liquids, or gases, and why they have the melting and boiling points they do: the forces between molecules. These intermolecular forces are weaker than the bonds within molecules, but they determine the physical properties that structure produces. Their strength depends on the polarity and structure of the molecules — which brings the whole story full circle, back to bonding and geometry."),
  p("Polar molecules attract each other more strongly than non-polar ones, and a particularly strong type of attraction, hydrogen bonding, occurs in molecules like water and explains its unusually high boiling point. Understanding that physical properties like boiling point arise from intermolecular forces, which in turn arise from molecular polarity and shape, ties atomic structure, bonding, and geometry together into a coherent explanation of why matter behaves as it does. This chain of reasoning — from electrons to bonds to shape to forces to properties — is the intellectual spine of first-year chemistry, and grasping it is what turns the course from memorisation into understanding."),

  h2("Where students struggle with atomic structure and bonding"),
  mli(["Memorising electron configurations instead of understanding what they determine."]),
  mli(["Treating the periodic table as a list rather than a map of atomic structure."]),
  mli(["Memorising which compounds are ionic instead of reasoning from electronegativity."]),
  mli(["Not connecting molecular shape (VSEPR) to a molecule's properties."]),
  mli(["Missing how intermolecular forces explain physical states and properties."]),

  h2("How to master the structure of matter"),
  mli(["Understand electron configuration and the stability of a full outer shell."]),
  mli(["Read the periodic table as a consequence of atomic structure, and predict trends."]),
  mli(["Reason about bond type from electronegativity, not memorisation."]),
  mli(["Use VSEPR to predict shape, and connect shape to properties."]),
  mli(["Trace properties back through intermolecular forces to structure."]),

  h2("Build your chemistry foundation"),
  linked(["If university chemistry's demand for understanding over memorisation is catching you out, the structure-of-matter foundations are where to start, and they make everything downstream easier. Our ", { text: "university chemistry tutoring in Burnaby and online", href: UC }, " builds this conceptual base clearly, from your own course and past exams, for science and engineering students."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where chemistry is hard, and we will show you the reasoning that clarifies it — online across Metro Vancouver and beyond, or in person in Burnaby. If tutoring is not what you need, we will tell you honestly."]),
];

/* ===== LANGARA CHEM: THERMOCHEMISTRY, ACIDS/BASES, ELECTROCHEMISTRY ===== */
const langara = [
  p("A large part of first-year university chemistry is about energy and reactions — how much heat a reaction releases or absorbs, why acids and bases behave as they do, and how chemistry generates and responds to electricity. These topics feel more concrete than atomic theory, but they carry their own conceptual challenges and a good deal of calculation, and they are where a significant share of exam marks live. Understanding the principles behind thermochemistry, acid-base chemistry, and electrochemistry — rather than memorising equations — is what turns this substantial part of the course from daunting into manageable."),
  p("This guide covers the energy-and-reactions half of university chemistry — thermochemistry, spontaneity, acids and bases, solutions, and electrochemistry — so these heavily-tested, calculation-rich topics become something you can reason through clearly rather than dread on exam day."),

  h2("Thermochemistry: the energy of reactions"),
  p("Every chemical reaction involves a change in energy, and thermochemistry is the study of that energy — primarily heat. The central quantity is enthalpy change, and its sign tells the essential story: an exothermic reaction releases heat and has a negative enthalpy change, while an endothermic reaction absorbs heat and has a positive one. Combustion is exothermic; melting ice is endothermic. This simple sign convention underlies a large body of calculation and reasoning."),
  p("A powerful principle that university chemistry emphasises is that enthalpy is a state function — the total energy change of a reaction depends only on the starting and ending states, not the path taken between them. This is Hess's law, and it is enormously useful: it means you can calculate the enthalpy change of a reaction you cannot easily measure by adding up the enthalpy changes of reactions you can, as long as they combine to give the overall reaction. Understanding enthalpy, the exothermic-endothermic distinction, and the path-independence that makes Hess's law work is the core of thermochemistry, and it rewards conceptual understanding as much as calculation."),

  h2("Acids and bases: the chemistry of pH"),
  p("Acid-base chemistry is one of the most important and most tested topics in first-year chemistry, and it centres on the concept of pH — a measure of how acidic or basic a solution is. The crucial thing to understand is that pH is a logarithmic scale: it is the negative logarithm of the hydrogen-ion concentration, so each unit of pH represents a tenfold change in acidity, not a small linear step."),
  mp(["This has real consequences. A hydrogen-ion concentration of ", im(String.raw`10^{-3}`), " gives a pH of 3, and a solution at pH 3 is a thousand times more acidic than one at pH 6 — three factors of ten, not twice as acidic. The companion relationship, ", im(String.raw`\text{pH} + \text{pOH} = 14`), ", ties acidity and basicity together, with pH 7 as neutral, below 7 acidic, and above 7 basic. Reasoning correctly about this logarithmic scale, rather than treating pH as an ordinary number, is where many students lose marks, and getting it right is foundational to the whole topic."]),

  h2("Strong versus weak, and why it matters"),
  p("A distinction that university chemistry treats carefully is between strong and weak acids and bases. A strong acid dissociates completely in water — every molecule gives up its hydrogen ion — while a weak acid only partially dissociates, existing in equilibrium with its undissociated form. This is not a matter of concentration but of the intrinsic tendency to dissociate, and confusing the two is a common error."),
  p("The distinction matters because it changes how you calculate pH and how a solution behaves. Weak acids and bases, existing in equilibrium, give rise to buffers — solutions that resist changes in pH — which are crucial in chemistry and biology alike, and which connect acid-base chemistry to the equilibrium principles elsewhere in the course. Understanding that strength refers to the degree of dissociation, and reasoning about the equilibrium that weak acids and bases establish, is what lets you handle the more sophisticated acid-base problems the course sets. It is a place where genuine understanding of the underlying chemistry clearly outperforms memorised procedures."),
  linked(["If the energy-and-reactions topics — thermochemistry, pH and acids, electrochemistry — are where your chemistry course is challenging you, understanding the principles behind the calculations is what makes them click. Our ", { text: "university chemistry tutoring", href: UC }, " builds exactly this reasoning, working from your real problems and past exams."]),

  h2("Spontaneity: what makes a reaction go"),
  p("Thermochemistry leads naturally to one of the deepest questions in chemistry: what determines whether a reaction happens on its own? It is tempting to think exothermic reactions are always spontaneous, but that is not quite right — the full answer involves both energy and disorder. Entropy, a measure of the disorder or number of ways a system can be arranged, matters alongside enthalpy, and nature tends toward states of both lower energy and higher entropy."),
  p("The two factors combine in the concept of free energy, which determines spontaneity: a reaction proceeds on its own when it decreases free energy, which balances the enthalpy change against the entropy change at a given temperature. This is why some endothermic reactions still happen spontaneously — because they increase entropy enough to compensate — and why temperature can change whether a reaction is spontaneous. Understanding that spontaneity depends on both energy and disorder, not energy alone, is a genuine conceptual step and one that connects thermochemistry to equilibrium and to the direction of chemical change. It is exactly the kind of principle that rewards understanding over memorised rules."),

  h2("Solutions and concentration"),
  p("Much of university chemistry, and nearly all of acid-base and electrochemistry, happens in solution, so understanding solutions is foundational. A solution is a homogeneous mixture, and its concentration — how much solute is dissolved in how much solvent — is expressed most often as molarity, the number of moles of solute per litre of solution. Being fluent with concentration and able to convert between the ways it is expressed is assumed throughout the course."),
  p("Concentration matters because it directly affects chemical behaviour: reaction rates, the position of equilibria, pH, and the properties of solutions all depend on it. Calculations involving preparing solutions, diluting them, and relating concentration to the amounts reacting are pervasive, and they build on the stoichiometry from earlier chemistry. Understanding solutions and concentration well, and being comfortable with the calculations, removes a source of friction that otherwise slows students down across acid-base, equilibrium, and electrochemistry problems alike. It is a practical foundation that pays off continuously, and one worth making genuinely automatic."),

  h2("Electrochemistry: chemistry and electricity"),
  p("Electrochemistry connects chemical reactions to electricity, and it rests on the concept of oxidation and reduction — redox reactions — in which electrons are transferred between substances. Oxidation is the loss of electrons and reduction is the gain, a pairing students remember with the mnemonic 'OIL RIG': oxidation is loss, reduction is gain. Because electrons are transferred, these reactions can drive or be driven by an electric current, which is the basis of batteries and of processes like electroplating."),
  p("In an electrochemical cell, oxidation happens at the anode and reduction at the cathode, and the flow of electrons between them constitutes the current. A spontaneous reaction — one that proceeds on its own, as in a battery — corresponds to a positive cell potential, which measures the driving force of the reaction. Balancing redox reactions requires conserving both mass and charge, which is more involved than balancing ordinary equations and is a frequent exam challenge. Understanding electrochemistry as electron transfer that can be harnessed as electricity, and reasoning carefully about oxidation, reduction, and cell potential, ties the topic together and connects the chemistry you study to the batteries and technologies that run on it."),

  h2("Where students struggle with energy and reactions"),
  mli(["Confusing the sign convention for exothermic and endothermic reactions."]),
  mli(["Treating pH as a linear scale rather than a logarithmic one."]),
  mli(["Confusing acid strength (dissociation) with concentration."]),
  mli(["Mixing up oxidation and reduction, or which happens at which electrode."]),
  mli(["Struggling to balance redox reactions by conserving mass and charge."]),

  h2("How to master energy and reactions"),
  mli(["Learn the enthalpy sign convention and use Hess's law's path-independence."]),
  mli(["Reason about pH as a logarithmic scale, and use pH + pOH = 14."]),
  mli(["Understand acid strength as degree of dissociation, and the equilibria of weak acids."]),
  mli(["Master oxidation and reduction, and the anode-cathode roles in a cell."]),
  mli(["Practise balancing redox reactions by conserving both mass and charge."]),
  mli(["Remember spontaneity depends on both energy and entropy, not enthalpy alone."]),

  h2("Master the energy side of chemistry"),
  linked(["If thermochemistry, acids and bases, or electrochemistry are the topics standing between you and a strong chemistry grade, understanding their principles turns the calculations from daunting into routine. Our ", { text: "university chemistry tutoring in Burnaby and online", href: UC }, " builds that understanding from your own course and past exams, for science and engineering students."]),
  linked(["Start with a free conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us which topic is hard and why, and we will show you the reasoning that unlocks it — online across Metro Vancouver and beyond, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

await applyPost({ slug: "university-chemistry-ubc-chemistry-chem-111-121-123", was: 687, body: ubc, siblingSlugs: sibs("university-chemistry-ubc-chemistry-chem-111-121-123") });
await applyPost({ slug: "university-chemistry-langara-college-chemistry-chem-1114-1118-1120", was: 702, body: langara, siblingSlugs: sibs("university-chemistry-langara-college-chemistry-chem-1114-1118-1120") });
