/**
 * Chemistry HS family (3): chemical-reactions-bonding (reaction TYPES + bond
 * rearrangement), physical-chemistry (states/energy/matter), organic-chemistry
 * (carbon). Distinct angles vs the large chemistry sibling set. Broad overlap check.
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const CH_PROG = "/programs/chemistry";
const CH_SIBS = [
  "chemistry-chemical-reactions-bonding", "chemistry-physical-chemistry", "chemistry-organic-chemistry",
  "chemistry-stoichiometry-gas-laws", "step-by-step-guide-stoichiometry-grade-11-chemistry",
  "university-chemistry-chemical-kinetics-equilibrium",
  "university-chemistry-ubc-chemistry-chem-111-121-123",
  "university-chemistry-langara-college-chemistry-chem-1114-1118-1120",
];
const sibs = (self) => CH_SIBS.filter((s) => s !== self);

/* ===== 1. CHEMICAL REACTIONS & BONDING ===== */
const reactions = [
  p("Chemistry can feel like an endless list of reactions to memorise — this substance plus that one makes something else, on and on — and students who try to memorise them all quickly drown. There is a far better way to think about it: a chemical reaction is simply a rearrangement of bonds, where existing bonds break and new ones form, and the reactions themselves fall into a small number of recognisable types. Understanding reactions as bond rearrangements that follow patterns, rather than isolated facts, is what turns chemistry from memorisation into something you can predict and reason about."),
  p("Chemical reactions and bonding are the heart of chemistry — how substances combine and transform. This guide covers what a reaction really is, the main types you need to recognise, what actually drives a reaction to happen, and how bonding underlies it all, so you can predict and understand reactions rather than memorise them one by one."),

  h2("A reaction is a rearrangement of bonds"),
  p("The foundational idea is that in a chemical reaction, atoms are not created or destroyed — they are rearranged. The bonds holding the starting substances together break, and new bonds form to create the products, using the very same atoms. This is why balancing equations matters and works: the law of conservation of mass means the atoms you start with must all appear among the products, just connected differently."),
  p("Seeing reactions this way demystifies a great deal. Energy is involved because breaking bonds requires energy and forming bonds releases it, and the balance between the two determines whether a reaction absorbs or releases energy overall. And because a reaction is a rearrangement of specific atoms, you can track exactly where each atom goes. Understanding that chemistry is fundamentally about atoms rearranging their bonds — not about substances magically becoming other substances — is the conceptual key that makes reactions predictable rather than mysterious, and it underlies everything else in the subject."),

  h2("The main types of reaction"),
  p("Rather than memorising individual reactions, you can recognise a handful of general types, and knowing them lets you predict products for reactions you have never seen. Synthesis (or combination) reactions join two or more substances into one. Decomposition reactions do the reverse, breaking one substance into simpler ones. Combustion reactions involve a substance reacting rapidly with oxygen, releasing energy — burning a hydrocarbon fuel produces carbon dioxide and water, a pattern you can rely on."),
  p("Two more types involve substances swapping partners. In a single replacement reaction, one element displaces another from a compound; in a double replacement, two compounds exchange partners, often forming a precipitate, a gas, or water. Recognising which type a reaction is lets you predict its products, because each type follows a consistent pattern. Learning to classify a reaction into one of these types, rather than treating every reaction as unique, is one of the most powerful organising skills in chemistry, and it transforms prediction from guesswork into pattern recognition."),

  h2("Bonding: why atoms combine at all"),
  p("Underlying every reaction is bonding — the forces that hold atoms together — and understanding bonding explains why reactions happen and what products form. Atoms bond to achieve stable arrangements of electrons, typically a full outer shell, and the drive toward this stability is what powers chemistry. There are a few main types of bond, each with different consequences for how the resulting substance behaves."),
  p("In ionic bonding, one atom transfers electrons to another, and the resulting oppositely-charged ions attract — typical of metal-and-non-metal combinations. In covalent bonding, atoms share electrons to complete their shells together, which is how most molecules are held together. Metallic bonding, in metals, involves a shared 'sea' of electrons that explains metals' conductivity and malleability. The type of bonding determines a substance's properties — melting point, conductivity, solubility — and influences how it reacts. Understanding that bonding is atoms seeking electron stability, and that the bond type shapes behaviour, connects the structure of matter directly to the reactions it undergoes."),
  linked(["If chemistry feels like endless reactions to memorise, the shift to seeing them as bond rearrangements that follow patterns is what makes it click — and it is exactly what a good tutor can build. Our ", { text: "chemistry tutoring", href: CH_PROG }, " teaches the reasoning that lets you predict reactions rather than memorise them."]),

  h2("Balancing equations: the bookkeeping of atoms"),
  p("A practical skill that follows directly from the conservation of atoms is balancing chemical equations, and understanding why you balance them makes the how far easier. Because atoms are only rearranged, never created or destroyed, the number of each type of atom must be the same on both sides of the equation. Balancing is simply adjusting the quantities of each substance until the atoms account for exactly, like balancing a budget."),
  p("Students who see balancing as an arbitrary puzzle struggle with it; those who understand it as ensuring every atom is accounted for approach it logically. The coefficients you add represent how many of each substance take part, and getting them right is essential because they underlie all the quantitative chemistry — the stoichiometry — that follows. A correctly balanced equation is the foundation for calculating how much of each substance reacts and forms. Mastering balancing as the logical consequence of conserving atoms, rather than as trial-and-error, is a core skill that supports much of the rest of chemistry, and it rewards understanding over memorisation."),

  h2("What actually drives a reaction to happen"),
  p("A question students rarely get answered is why some combinations react while others just sit there mixed together. In many reactions, especially those in solution, the answer is that a reaction proceeds when it produces something that leaves the mix — a solid precipitate that drops out, a gas that bubbles away, or water that forms from an acid and a base. These 'driving forces' pull the reaction forward by removing products from the solution."),
  p("Recognising these driving forces lets you predict whether two substances will actually react when mixed, not just what they would form in principle. If mixing two solutions would produce an insoluble solid, a reaction happens and the solid appears; if everything stays dissolved and unchanged, no net reaction occurs. Learning the patterns — which combinations form precipitates, which release gases, which neutralise — turns 'will these react?' from a guess into a prediction. Understanding that reactions in solution are often driven by the formation of a precipitate, gas, or water is a genuinely useful and predictive piece of chemistry, and it explains a large class of reactions students otherwise find arbitrary."),

  h2("Net ionic equations: showing what really changes"),
  p("When reactions happen in solution, a powerful way to see what is actually going on is the net ionic equation, which strips away the parts that do not change and shows only the species that actually react. Many ionic compounds, when dissolved, separate into their individual ions, and in a reaction some of these ions combine while others simply remain dissolved throughout, unchanged — these unchanged ions are called spectator ions, because they watch without taking part."),
  p("Writing a net ionic equation means removing the spectator ions and showing only the ions that actually combine to form the product. This reveals the true chemical change at its core, without the clutter of ions that were just along for the ride. Understanding net ionic equations deepens your grasp of what a reaction in solution really is — a specific combination of certain ions — and it is a skill that separates students who understand solution chemistry from those who only balance whole-formula equations mechanically. Learning to identify spectator ions and write the net ionic equation is a valuable step toward genuinely understanding reactions in water, where a great deal of chemistry actually happens."),

  h2("Where students struggle with reactions and bonding"),
  mli(["Trying to memorise individual reactions instead of recognising types."]),
  mli(["Not seeing reactions as rearrangements of the same atoms."]),
  mli(["Treating balancing as a puzzle rather than conserving atoms."]),
  mli(["Confusing the bond types and their consequences for properties."]),
  mli(["Missing how bonding drives whether and how substances react."]),

  h2("How to master reactions and bonding"),
  mli(["Think of every reaction as bonds breaking and re-forming with the same atoms."]),
  mli(["Learn the main reaction types so you can predict products."]),
  mli(["Balance equations logically, by conserving every kind of atom."]),
  mli(["Understand ionic, covalent and metallic bonding and their effects on properties."]),
  mli(["Connect bonding to reactivity — why atoms combine as they do."]),

  h2("Understand chemistry, don't memorise it"),
  linked(["If chemical reactions and bonding are where your chemistry is faltering, the pattern-based, bond-rearrangement approach turns memorisation into understanding, and that is what we teach. Our ", { text: "chemistry tutoring in Burnaby and online", href: CH_PROG }, " builds the reasoning that lets you predict and understand reactions, from Grade 11 and 12 through introductory university chemistry."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where chemistry is hard, and we will show you the approach that makes it click — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so honestly."]),
];

/* ===== 2. PHYSICAL CHEMISTRY (states, energy, matter) ===== */
const physical = [
  p("Physical chemistry is where chemistry meets physics — the study of the physical principles behind chemical behaviour, from why matter exists in different states to how energy flows through chemical changes. Students often find it the most abstract and mathematical part of chemistry, and it can feel disconnected from the reactions and substances they are used to. But physical chemistry is really about the fundamental 'why' behind everything else in the subject: why substances melt and boil where they do, why some processes release energy and others absorb it, why matter behaves as it does. Understanding these physical principles makes the rest of chemistry deeper and more coherent."),
  p("Physical chemistry explains the behaviour of matter and energy that underlies all of chemistry. This guide covers the states of matter and the changes between them, the role of energy in chemical and physical processes, and how these ideas connect, so this abstract-seeming subject becomes intuitive."),

  h2("The states of matter and what holds them apart"),
  p("A foundational topic is the states of matter — solid, liquid, and gas — and understanding them as consequences of how strongly particles are held together and how much energy they have. In a solid, particles are locked in place with strong forces between them; in a liquid, they are close but able to move past one another; in a gas, they are far apart and move freely. The difference between the states is really a difference in the balance between the forces holding particles together and the energy driving them apart."),
  p("This framing explains why substances have the states they do at a given temperature, and it connects to the intermolecular forces between particles: stronger forces mean higher melting and boiling points, because more energy is needed to overcome them. Understanding states of matter as a competition between attractive forces and thermal energy — rather than as three separate, unrelated conditions — is what makes the behaviour of matter predictable. It explains everyday observations, from why water boils at the temperature it does to why some substances are gases and others solids at room temperature, and it is a genuinely satisfying piece of understanding to acquire."),

  h2("Phase changes: energy in disguise"),
  p("The changes between states — melting, freezing, boiling, condensing — are where energy reveals its central role in physical chemistry, and they contain a subtlety that surprises students. Changing state requires energy: melting and boiling absorb energy to overcome the forces holding particles together, while freezing and condensing release it. This is why you must keep adding heat to boil water and why sweat cools you as it evaporates."),
  p("The surprising part is that during a phase change, the temperature does not rise even as energy is added, because that energy goes into breaking the forces between particles rather than into raising their temperature. This 'hidden' energy of a phase change is a concept students often find counterintuitive, but it explains a great deal — why ice water stays at zero until all the ice melts, why steam burns are so severe. Understanding that phase changes absorb or release energy without changing temperature, because the energy is doing the work of separating particles, is a key insight of physical chemistry and a frequent source of exam questions that reward genuine understanding over memorisation."),

  h2("Energy in chemical processes"),
  p("Beyond phase changes, energy is central to chemical reactions themselves, and physical chemistry provides the framework for understanding it. Every chemical change involves an energy change, because breaking bonds absorbs energy and forming bonds releases it. When forming bonds releases more than breaking bonds absorbs, the reaction releases energy overall — it is exothermic; when the reverse is true, it absorbs energy and is endothermic. This energy accounting explains why reactions release or require heat."),
  p("This connects to broader principles about energy and spontaneity — why some processes happen on their own and others do not — which involve not just energy but the tendency of systems toward disorder. Understanding the energy changes in chemical processes lets you predict whether a reaction will release or absorb heat, and begins to explain why reactions happen at all. Physical chemistry's treatment of energy is what turns the qualitative observation that 'some reactions get hot' into a quantitative, predictive understanding, and it underlies applications from fuels to biological processes. Grasping the role of energy is central to genuinely understanding chemistry rather than just describing it."),
  linked(["If physical chemistry feels abstract or disconnected, understanding it as the 'why' behind matter and energy makes it concrete and even intuitive — and that is exactly what focused tutoring builds. Our ", { text: "chemistry tutoring", href: CH_PROG }, " connects these physical principles to the chemistry you already know, so they make sense."]),

  h2("The behaviour of gases and solutions"),
  p("Physical chemistry also examines the behaviour of gases and solutions, systems where the physical principles become quantitative and predictive. Gases follow consistent relationships between pressure, volume, temperature, and amount, which can be understood through the picture of particles moving freely and colliding — the more they are compressed or heated, the more they push outward. This particle-level understanding explains the gas relationships rather than leaving them as formulas to memorise."),
  p("Solutions — substances dissolved in others — introduce the physical chemistry of mixing, dissolving, and concentration, which affects everything from reaction rates to the properties of the resulting mixtures. Understanding why substances dissolve, how concentration is measured, and how dissolved substances change a solution's properties connects physical principles to practical chemistry. These topics show physical chemistry at work in tangible systems, bridging the abstract principles and the real behaviour of matter. Understanding gases and solutions through their underlying physical behaviour, rather than as separate sets of rules, exemplifies the way physical chemistry makes the whole subject more coherent and predictable."),

  h2("Temperature is really about motion"),
  p("A concept that ties much of physical chemistry together, and that students often hold only vaguely, is that temperature is a measure of the average kinetic energy of particles — how fast, on average, they are moving. This kinetic theory of matter is the microscopic reality behind the macroscopic thing we call temperature. When you heat a substance, you are making its particles move faster; when you cool it, they slow down. Everything from states of matter to reaction rates follows from this."),
  p("This picture explains a remarkable amount. It is why heating a solid eventually melts it — the particles move vigorously enough to break free of their fixed positions — and why gases expand when heated. It also underlies the idea that in any sample, particles have a range of energies, not all the same, which matters for understanding which particles have enough energy to react. Understanding temperature as particle motion, rather than as an abstract number on a scale, connects the everyday experience of hot and cold to the microscopic behaviour of matter, and it is one of the most unifying ideas in physical chemistry, quietly underlying states, phase changes, gas behaviour, and reactions alike."),

  h2("Reaction rates: how fast, and what changes it"),
  p("Physical chemistry also examines how fast reactions happen, which is a distinct question from whether they happen or how much energy they involve. The rate of a reaction depends on how often particles collide with enough energy to react, which is why several factors have predictable effects. Higher temperature speeds reactions up, because particles move faster and collide harder and more often. Higher concentration speeds them up too, because there are more particles to collide."),
  p("A catalyst is a substance that speeds a reaction without being consumed, by providing an easier path that requires less energy for the particles to react — which is why even small amounts of a catalyst can have large effects. Understanding reaction rates through this collision picture — reactions happen when particles collide with enough energy, and anything that increases the frequency or energy of collisions speeds them up — turns a set of rules about temperature and concentration into a single, intuitive idea. It is a good example of how physical chemistry's particle-level thinking makes the behaviour of chemical systems predictable rather than something to memorise."),

  h2("Where students struggle with physical chemistry"),
  mli(["Treating states of matter as separate conditions, not a force-energy balance."]),
  mli(["Being surprised that temperature holds steady during a phase change."]),
  mli(["Not connecting energy changes to bonds breaking and forming."]),
  mli(["Memorising gas relationships instead of understanding the particle picture."]),
  mli(["Finding the subject abstract for lack of connection to real behaviour."]),

  h2("How to master physical chemistry"),
  mli(["Understand states as a balance between attractive forces and thermal energy."]),
  mli(["Grasp that phase changes absorb or release energy without changing temperature."]),
  mli(["Connect reaction energy to bonds breaking (absorb) and forming (release)."]),
  mli(["Understand gas behaviour through moving, colliding particles."]),
  mli(["Link the physical principles to the real behaviour of matter you observe."]),

  h2("Grasp the physics behind chemistry"),
  linked(["If physical chemistry is the abstract wall in your chemistry course, understanding it as the reasoning behind matter and energy turns it into the most illuminating part of the subject. Our ", { text: "chemistry tutoring in Burnaby and online", href: CH_PROG }, " builds this understanding clearly, connecting the physical principles to the chemistry you know."]),
  linked(["Start with a free conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us which part of physical chemistry is hard, and we will show you the reasoning that clarifies it — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

/* ===== 3. ORGANIC CHEMISTRY ===== */
const organic = [
  p("Organic chemistry has a reputation as the course that breaks pre-med dreams — an ocean of reactions and mechanisms and structures that seems to demand impossible feats of memorisation. That reputation is only half deserved. Organic chemistry is challenging, but the students who struggle most are usually the ones trying to memorise their way through it, when the subject actually rewards understanding a relatively small set of principles and applying them. Organic chemistry is the chemistry of carbon, and once you understand why carbon behaves as it does and how a handful of ideas organise the whole field, it becomes far more manageable — even elegant."),
  p("Organic chemistry is the vast and vital chemistry of carbon compounds, the basis of all life and much of modern industry. This guide covers why carbon is special, how functional groups organise the subject, and how to approach it through understanding rather than memorisation, so this feared course becomes navigable."),

  h2("Why carbon builds a whole branch of chemistry"),
  p("The reason carbon deserves an entire field of chemistry comes down to its unique bonding versatility. Carbon forms four bonds, and — crucially — it bonds readily to itself, forming chains, rings, and branched structures of essentially unlimited size and complexity. This ability to build vast, varied molecular skeletons is why carbon is the basis of all known life and of millions of compounds, far more than all other elements combined."),
  p("Understanding this is the foundation of organic chemistry: the endless variety of organic molecules all rests on carbon's capacity to form stable, complex structures. The shapes these structures take — chains, branches, rings — and the way carbon bonds to other elements like hydrogen, oxygen, and nitrogen, generate the diversity of organic compounds. Rather than being intimidated by that diversity, you can see it as arising from a single, comprehensible source: carbon's bonding. Grasping why carbon is uniquely suited to building complex molecules is the conceptual starting point that makes the whole subject coherent, and it reframes the apparent chaos as ordered variety built on one principle."),

  h2("Functional groups: the key to organisation"),
  p("The single most important organising idea in organic chemistry is the functional group — a specific arrangement of atoms within a molecule that gives it characteristic properties and reactions. Because a molecule's behaviour is largely determined by its functional groups, you do not have to learn each of the millions of organic compounds individually; you learn the behaviour of a manageable set of functional groups, and apply it."),
  p("An alcohol group behaves like an alcohol whether it is on a small molecule or a large one; a carboxylic acid group behaves like an acid regardless of the rest of the molecule. This means the reactions of organic chemistry are really the reactions of functional groups, and learning them by functional group rather than by individual compound is dramatically more efficient. Recognising the functional groups in a molecule tells you how it will behave and react. Understanding that functional groups are the organising principle of the entire subject — the key that turns an impossible amount of memorisation into a manageable set of patterns — is the most important insight for succeeding in organic chemistry."),

  h2("Naming and structure: the language of organic chemistry"),
  p("Organic chemistry has a systematic naming system that, once learned, lets you determine a compound's structure from its name and vice versa — it is a logical language rather than arbitrary labels. Simple molecules follow clear patterns: the alkanes methane, ethane, and propane build up by adding carbon atoms in a regular sequence, and the naming reflects the structure directly. Learning this system is like learning to read, and it makes the subject far less bewildering."),
  p("Equally important is understanding structure, because in organic chemistry, structure determines everything. The same atoms arranged differently — isomers, molecules with the same formula but different structures — can have completely different properties, which is why organic chemists care so much about the precise arrangement of atoms in three dimensions. Being able to draw and interpret organic structures, and to name compounds systematically, is a foundational skill that everything else builds on. Treating the nomenclature and structural representation as a logical language to learn, rather than a set of rules to memorise, is what makes organic chemistry readable and its molecules comprehensible."),
  linked(["If organic chemistry feels like impossible memorisation, the functional-group approach and a real understanding of structure turn it into a manageable, pattern-based subject — and that is exactly what good tutoring provides. Our ", { text: "chemistry tutoring", href: CH_PROG }, " teaches organic chemistry through understanding, so you can reason rather than memorise."]),

  h2("Reactions and mechanisms: understanding the how"),
  p("The part of organic chemistry students most fear is the reactions and their mechanisms — the step-by-step accounts of how bonds break and form during a reaction. But mechanisms are where understanding pays off most, because they are not arbitrary: they follow logical principles about how electrons move, and once you grasp those principles, you can reason through mechanisms rather than memorising them. Electrons move from electron-rich to electron-poor sites, and this simple idea underlies a great deal."),
  p("Learning to think about reactions in terms of electron movement — where the electrons are, where they go, and why — transforms mechanisms from lists to be memorised into logical sequences you can predict and explain. This is the single biggest shift between students who struggle with organic chemistry and those who thrive: the strugglers memorise reactions, while the successful ones understand the underlying electron behaviour and reason from it. Building this mechanistic, electron-pushing understanding is challenging but immensely powerful, because it lets you handle reactions you have never seen. It is exactly the kind of deep understanding that good instruction develops and that turns the feared organic chemistry course into a genuinely logical subject."),

  h2("The families of organic compounds"),
  p("Organic chemistry organises its millions of compounds into families based on their structures and functional groups, and knowing the main families gives you a map of the territory. The hydrocarbons — compounds of just carbon and hydrogen — form the simplest families: alkanes with only single bonds, alkenes with double bonds, and alkynes with triple bonds, each with characteristic properties arising from those bonds. Building outward, adding functional groups containing oxygen or nitrogen creates families like alcohols, acids, and amines."),
  p("Each family behaves in characteristic ways because of its defining structural feature, so learning the families is another way the subject rewards pattern-recognition over memorisation. The alkanes build up in a regular series — methane, ethane, propane — following a simple formula, and understanding one member helps you understand the rest. Recognising which family a compound belongs to immediately tells you a great deal about how it will behave and react. Learning organic chemistry family by family, seeing how each is defined by its structure and how its members relate, is a powerful way to bring order to what first appears to be overwhelming variety, and it complements the functional-group approach beautifully."),

  h2("Why organic chemistry is worth the effort"),
  p("For all its difficulty, organic chemistry is one of the most consequential subjects a student can learn, and understanding its importance provides real motivation. It is the chemistry of life itself — proteins, DNA, carbohydrates, and fats are all organic molecules, so understanding organic chemistry is understanding the molecular basis of biology. This is why it is required for medicine, biochemistry, and the life sciences, and why doing well in it opens doors in those fields."),
  p("Organic chemistry is also the foundation of vast areas of industry and technology: pharmaceuticals, plastics, fuels, dyes, and countless materials are organic compounds designed and made by organic chemists. The reasoning skills the subject builds — thinking about structure, predicting reactions, understanding mechanisms — are exactly those needed in these fields and in research. Approaching organic chemistry not as a hurdle to clear but as the gateway to understanding life and to a wide range of careers gives the effort genuine meaning. Students who engage with it as a logical, consequential subject, rather than a memorisation ordeal, tend to find it both more manageable and more rewarding, and the understanding they build serves them well beyond the exam."),

  h2("Where students struggle with organic chemistry"),
  mli(["Trying to memorise millions of compounds instead of learning functional groups."]),
  mli(["Not grasping why carbon's bonding creates the whole field's diversity."]),
  mli(["Treating nomenclature as arbitrary rather than a logical language."]),
  mli(["Ignoring structure, when isomers show structure determines properties."]),
  mli(["Memorising mechanisms instead of understanding electron movement."]),

  h2("How to master organic chemistry"),
  mli(["Understand carbon's bonding as the source of organic diversity."]),
  mli(["Learn reactions by functional group, not by individual compound."]),
  mli(["Treat nomenclature as a logical language linking name and structure."]),
  mli(["Master drawing and interpreting structures, including isomers."]),
  mli(["Reason through mechanisms via electron movement rather than memorising them."]),

  h2("Survive and master organic chemistry"),
  linked(["If organic chemistry is the course you are dreading or struggling through, the understanding-based approach — functional groups, structure, and electron-pushing — turns feared memorisation into logical reasoning. Our ", { text: "chemistry tutoring in Burnaby and online", href: CH_PROG }, " teaches organic chemistry the way that actually works, for high-school, university, and pre-med students."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us how organic chemistry is going, and we will show you the approach that makes it manageable — online across Metro Vancouver and beyond, or in person in Burnaby. If tutoring is not what you need, we will tell you honestly."]),
];

await applyPost({ slug: "chemistry-chemical-reactions-bonding", was: 435, body: reactions, siblingSlugs: sibs("chemistry-chemical-reactions-bonding") });
await applyPost({ slug: "chemistry-physical-chemistry", was: 437, body: physical, siblingSlugs: sibs("chemistry-physical-chemistry") });
await applyPost({ slug: "chemistry-organic-chemistry", was: 440, body: organic, siblingSlugs: sibs("chemistry-organic-chemistry") });
