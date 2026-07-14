/**
 * Structured, substantive blog content keyed by post slug. Consumed by
 * scripts/regenerate-blog-content.mjs, which assembles it into Portable Text
 * with internal links. Real subject matter — not keyword-stuffed filler.
 *
 * This is BATCH 1 (high-value topics). Add more slugs to extend coverage.
 */

export const blogContent = {
  "mathematics-calculus-limits-derivatives": {
    excerpt:
      "A clear guide to Calculus 12 limits and derivatives — what they mean, the concepts that matter, common mistakes, and how to study them effectively.",
    intro: [
      "Limits and derivatives are the heart of Calculus 12, and they're where many students either fall in love with calculus or lose confidence. The good news: once the core ideas click, most of the course becomes far more intuitive.",
    ],
    overview: [
      "A limit describes the value a function approaches as the input gets closer to some point — even if the function isn't defined exactly there. Derivatives build directly on limits: the derivative is the limit of a rate of change, telling you how fast a quantity is changing at an instant.",
      "This single idea — instantaneous rate of change — underpins everything from finding the slope of a curve to solving optimization and related-rates problems later in the course.",
    ],
    keyConcepts: [
      "The intuitive meaning of a limit: what a function approaches, not necessarily what it equals",
      "Evaluating limits algebraically (factoring, rationalising, and handling 0/0 forms)",
      "One-sided limits and where limits fail to exist",
      "The derivative as the limit of the difference quotient",
      "Differentiation rules: power, product, quotient and chain rules",
      "Interpreting the derivative as a slope and as a rate of change",
    ],
    commonMistakes: [
      "Trying to 'plug in' a value that gives 0/0 without simplifying first",
      "Forgetting the chain rule on composite functions like sin(3x²)",
      "Confusing the function's value with its limit at a point",
      "Mixing up the product and quotient rules under time pressure",
    ],
    studyTips: [
      "Master limits before derivatives — derivatives are literally built on them",
      "Say out loud what each derivative represents (a rate, a slope) to build intuition",
      "Practise mixed problem sets so you learn to choose the right rule, not just apply one",
      "Redo mistakes from scratch a day later, not just once when they're marked",
    ],
    closing: [
      "If limits and derivatives feel slippery, targeted one-on-one help closes the gap fast. Our Calculus 12 tutoring builds the intuition first, then drills the techniques, and we prepare students thoroughly for the final exam review. Book a free consultation to get started.",
    ],
  },

  "pre-calculus-trigonometric-identities-equations": {
    excerpt:
      "Trig identities and equations are among the hardest Pre-Calculus 12 topics. Here's how to actually understand them, the mistakes to avoid, and how to study them.",
    intro: [
      "Trigonometric identities and equations are where many Pre-Calculus 12 students get stuck — not because the ideas are impossible, but because they're rarely taught as a system. Once you see the structure, proofs and solving become far more approachable.",
    ],
    overview: [
      "An identity is an equation that's true for every valid angle, and proving one means transforming one side until it matches the other using known identities. Solving a trig equation is different: you're finding the specific angles that make the equation true within a given interval.",
      "The key is a small toolkit of fundamental identities (Pythagorean, reciprocal, quotient, double-angle) that you combine deliberately, rather than guessing.",
    ],
    keyConcepts: [
      "The Pythagorean identities and their rearrangements",
      "Reciprocal and quotient identities (sec, csc, cot, tan in terms of sin/cos)",
      "Sum, difference and double-angle formulas",
      "Proving identities by transforming one side only",
      "Solving trig equations over a restricted domain (e.g. 0 ≤ x < 2π)",
      "Using the unit circle to find all solutions and reference angles",
    ],
    commonMistakes: [
      "Working on both sides of an identity at once (you can only transform one side)",
      "Losing solutions by dividing both sides by a trig term instead of factoring",
      "Forgetting to find all angles in the interval, not just the first one",
      "Mixing up which double-angle form to use for a given problem",
    ],
    studyTips: [
      "Memorise the core identities cold — proofs are far easier when recall is automatic",
      "For proofs, always start from the more complicated side and simplify toward the other",
      "For equations, factor rather than divide, and sketch the unit circle every time",
      "Build a personal 'identity map' showing how each identity connects to the others",
    ],
    closing: [
      "Trig identities reward a clear method, and that's exactly what tutoring provides. Our Pre-Calculus 12 tutoring turns identity proofs and trig equations from guesswork into a reliable process, with plenty of exam-style practice. Book a free consultation to see the difference.",
    ],
  },

  "pre-calculus-exponential-logarithmic-functions": {
    excerpt:
      "Exponential and logarithmic functions confuse many Pre-Calculus 12 students. This guide explains the ideas clearly, with common pitfalls and study strategies.",
    intro: [
      "Exponentials and logarithms are two sides of the same coin, and understanding that relationship is the key to the whole unit in Pre-Calculus 12. Students who see logs as 'the inverse of exponentials' find everything that follows much easier.",
    ],
    overview: [
      "An exponential function models repeated multiplication — growth or decay — while a logarithm answers the question 'what exponent produces this value?'. Because they're inverses, every exponential equation can be rewritten as a logarithmic one and vice versa.",
      "This unit also introduces the laws of logarithms, which let you expand, condense and solve equations that would otherwise be impossible to isolate.",
    ],
    keyConcepts: [
      "Exponential growth and decay and the meaning of the base",
      "Logarithms as inverses of exponentials",
      "The laws of logarithms (product, quotient, power)",
      "Converting between exponential and logarithmic form",
      "Solving exponential equations by taking logs of both sides",
      "Applications: compound growth, pH, and half-life problems",
    ],
    commonMistakes: [
      "Applying log laws incorrectly, e.g. writing log(a + b) as log a + log b",
      "Forgetting that logs are only defined for positive arguments (rejecting invalid solutions)",
      "Confusing natural log (ln) with log base 10",
      "Dropping the base when converting between forms",
    ],
    studyTips: [
      "Always read a logarithm as a question about an exponent — it demystifies everything",
      "Check every solution against the domain and reject logs of negatives or zero",
      "Practise word problems (growth, decay, pH) since they're heavily tested",
      "Keep the log laws on a single reference card until they're automatic",
    ],
    closing: [
      "Once the exponential–log connection clicks, this unit becomes one of the most rewarding in the course. Our Pre-Calculus 12 tutoring makes that connection clear and prepares students for application questions and the final exam review. Book a free consultation to get started.",
    ],
  },

  "chemistry-stoichiometry-gas-laws": {
    excerpt:
      "Stoichiometry and gas laws are foundational Chemistry topics that trip up many students. Here's a clear explanation, common mistakes, and how to study them.",
    intro: [
      "Stoichiometry is the accounting system of chemistry, and gas laws describe how gases respond to pressure, volume and temperature. Together they form a foundation that Chemistry 11 and 12 build on repeatedly — so getting them solid pays off all year.",
    ],
    overview: [
      "Stoichiometry uses the mole to connect masses, particles and volumes through balanced chemical equations. The mole ratio from a balanced equation is the bridge that lets you predict how much product a reaction yields, or how much reactant you need.",
      "Gas laws (Boyle's, Charles's, and the combined and ideal gas laws) then let you relate the physical conditions of a gas, which matters for reactions involving gaseous reactants or products.",
    ],
    keyConcepts: [
      "The mole concept and Avogadro's number",
      "Balancing chemical equations and reading mole ratios",
      "Mass–mole–particle conversions",
      "Limiting reactant and percent yield",
      "Boyle's, Charles's, and the combined gas law",
      "The ideal gas law (PV = nRT) and its applications",
    ],
    commonMistakes: [
      "Skipping the balanced equation, so the mole ratio is wrong from the start",
      "Forgetting to convert temperatures to Kelvin in gas-law problems",
      "Not identifying the limiting reactant before calculating yield",
      "Mismatching units for pressure and volume in PV = nRT",
    ],
    studyTips: [
      "Always balance the equation first — every stoichiometry problem depends on it",
      "Write units at every step and cancel them; correct units usually mean a correct method",
      "Convert to Kelvin automatically for any gas-law calculation",
      "Practise limiting-reactant problems until identifying the limiter is second nature",
    ],
    closing: [
      "Stoichiometry rewards a careful, repeatable method, which is exactly what tutoring builds. Our Chemistry 12 tutoring makes the mole concept intuitive and turns multi-step calculations into routine. Book a free consultation to strengthen these foundations.",
    ],
  },

  "physics-kinematics-dynamics": {
    excerpt:
      "Kinematics and dynamics are the foundation of high-school physics. This guide explains motion and forces clearly, with the mistakes and study habits that matter.",
    intro: [
      "Kinematics describes how things move; dynamics explains why. Together they form the backbone of Physics 11 and 12, and the problem-solving habits you build here carry through the entire course.",
    ],
    overview: [
      "Kinematics deals with motion — position, velocity and acceleration — without worrying about the causes. Dynamics then brings in forces and Newton's laws to explain and predict that motion.",
      "The single most important skill in both is translating a written problem into a clear diagram and the right equations. Most lost marks come from setup errors, not from the physics itself.",
    ],
    keyConcepts: [
      "Displacement, velocity and acceleration (and the difference between them)",
      "The kinematics equations and when each applies",
      "Free-body diagrams and identifying every force",
      "Newton's three laws of motion",
      "Resolving forces into components on inclines",
      "Distinguishing mass from weight and handling friction",
    ],
    commonMistakes: [
      "Mixing up distance and displacement, or speed and velocity",
      "Drawing an incomplete free-body diagram and missing a force",
      "Choosing a kinematics equation that doesn't match the given information",
      "Forgetting to resolve forces into components on an inclined plane",
    ],
    studyTips: [
      "Draw a diagram for every problem before touching an equation",
      "List knowns and unknowns first, then pick the equation that fits",
      "Solve algebraically and plug in numbers only at the end",
      "Always check that units and the direction of your answer make sense",
    ],
    closing: [
      "A reliable problem-solving method is what separates students who understand physics from those who lose marks in the setup. Our Physics 12 tutoring builds that method and drills it with exam-style problems. Book a free consultation to get started.",
    ],
  },

  "ib-ap-tutoring-ap-calculus-ab-bc": {
    excerpt:
      "AP Calculus AB and BC reward deep understanding plus exam technique. Here's what each course covers, the pitfalls to avoid, and how to prepare for a top score.",
    intro: [
      "AP Calculus AB and BC are among the most respected high-school courses for university admissions — and among the most demanding. Success comes from combining genuine conceptual understanding with disciplined exam technique.",
    ],
    overview: [
      "AP Calculus AB covers limits, derivatives, integrals and the Fundamental Theorem of Calculus. BC includes everything in AB plus additional topics such as advanced integration techniques, parametric and polar functions, and infinite series.",
      "Both exams blend multiple-choice and free-response questions, and the free-response section rewards clear, well-justified work — not just a correct final answer.",
    ],
    keyConcepts: [
      "Limits, continuity and the definition of the derivative",
      "Differentiation rules and applications (optimization, related rates)",
      "Integration and the Fundamental Theorem of Calculus",
      "Differential equations and slope fields",
      "Series and convergence tests (BC)",
      "Parametric, polar and vector functions (BC)",
    ],
    commonMistakes: [
      "Writing a correct answer without the justification the free-response rubric requires",
      "Neglecting units and interpretation in applied problems",
      "Rushing the multiple-choice section and mismanaging time",
      "Underestimating BC series topics, which carry significant weight",
    ],
    studyTips: [
      "Practise full, timed past papers under real exam conditions",
      "Study the scoring rubrics so you know exactly how marks are awarded",
      "Explain each concept out loud — if you can teach it, you understand it",
      "Build a formula and technique sheet, then practise without it",
    ],
    closing: [
      "A strong AP Calculus score can shape university options, and focused preparation makes a real difference. Our AP Calculus tutoring combines concept mastery with AP-format practice for both AB and BC. Book a free consultation to build your plan.",
    ],
  },

  // ─────────────────────────── BATCH 2 ───────────────────────────
  "chemistry-organic-chemistry": {
    excerpt:
      "Organic chemistry has a reputation for being hard, but it's really about patterns. This guide explains the core ideas, common mistakes, and how to study it.",
    intro: [
      "Organic chemistry earns its tough reputation because students try to memorise it — when it's actually a subject built on a handful of repeating patterns. Once you learn to think in terms of functional groups and mechanisms, it becomes far more manageable.",
    ],
    overview: [
      "Organic chemistry is the study of carbon-based compounds. Carbon's ability to form four bonds and long chains gives rise to millions of molecules, organised into families called functional groups that each behave predictably.",
      "The real skill isn't memorising every reaction — it's understanding why electrons move the way they do, so you can predict how molecules react rather than recall it.",
    ],
    keyConcepts: [
      "Functional groups and how they determine reactivity",
      "Nomenclature (IUPAC naming) of organic compounds",
      "Isomers: structural and stereoisomers",
      "Reaction mechanisms and the movement of electrons",
      "Substitution, addition and elimination reactions",
      "Intermolecular forces and physical properties",
    ],
    commonMistakes: [
      "Memorising reactions instead of understanding the underlying mechanism",
      "Overlooking stereochemistry and the 3D shape of molecules",
      "Confusing similar functional groups (e.g. aldehydes vs ketones)",
      "Skipping practice drawing structures by hand",
    ],
    studyTips: [
      "Learn functional groups first — everything else builds on them",
      "Practise reaction mechanisms with arrows to show electron movement",
      "Draw structures constantly; organic chemistry is a visual subject",
      "Group reactions by type rather than memorising them in isolation",
    ],
    closing: [
      "Organic chemistry rewards pattern-based thinking, which is exactly what good tutoring develops. Our Chemistry 12 tutoring replaces rote memorisation with genuine understanding of mechanisms. Book a free consultation to make organic chemistry click.",
    ],
  },

  "mathematics-algebra-functions": {
    excerpt:
      "Algebra and functions are the foundation of all higher math. This guide covers the essential ideas, the mistakes that hold students back, and how to master them.",
    intro: [
      "Almost every difficulty students face in Pre-Calculus, Calculus and physics traces back to shaky algebra. Strengthening your algebra and understanding of functions is the single highest-leverage thing you can do in high-school math.",
    ],
    overview: [
      "Algebra is the language of mathematics — a system for representing and manipulating relationships between quantities. Functions build on it, describing how one quantity depends on another, and they're the central object of study from Grade 10 onward.",
      "Fluency here means being able to factor, rearrange and interpret expressions without conscious effort, which frees up mental space for the harder ideas built on top.",
    ],
    keyConcepts: [
      "Simplifying expressions and the order of operations",
      "Factoring techniques and expanding",
      "Solving linear, quadratic and rational equations",
      "Function notation, domain and range",
      "Transformations of functions (shifts, stretches, reflections)",
      "Composite and inverse functions",
    ],
    commonMistakes: [
      "Sign errors when distributing or moving terms across the equals sign",
      "Cancelling terms incorrectly in fractions",
      "Confusing function notation f(x) with multiplication",
      "Forgetting to state or restrict the domain",
    ],
    studyTips: [
      "Build algebra fluency to the point it's automatic — speed comes from practice",
      "Always check solutions by substituting them back in",
      "Sketch functions to connect the equation with its graph",
      "Master factoring cold; it unlocks most of the topics that follow",
    ],
    closing: [
      "Strong algebra makes every later math course easier, so it's worth getting right. Our math tutoring in Burnaby builds rock-solid foundations and connects algebra to the courses ahead. Book a free consultation to strengthen the fundamentals.",
    ],
  },

  "physics-university-level-physics": {
    excerpt:
      "University physics moves fast and combines demanding concepts with heavy math. Here's what to expect, the pitfalls, and how to keep pace and excel.",
    intro: [
      "First-year university physics is a step up from high school in both pace and mathematical rigour. Students who thrive treat it as a problem-solving discipline, not a set of facts to memorise.",
    ],
    overview: [
      "University physics typically covers mechanics, electricity and magnetism, thermodynamics and waves, often using calculus throughout. The concepts are deeper than in high school, and problems demand a confident command of the underlying math.",
      "The most common reason capable students struggle isn't the physics itself — it's gaps in calculus and algebra that surface under exam pressure.",
    ],
    keyConcepts: [
      "Newtonian mechanics with calculus (kinematics, dynamics, energy)",
      "Electric fields, potential and circuits",
      "Magnetism and electromagnetic induction",
      "Thermodynamics and the gas laws",
      "Oscillations and waves",
      "Vector calculus fundamentals as used in physics",
    ],
    commonMistakes: [
      "Falling behind because of weak calculus, not weak physics",
      "Plugging numbers in early instead of solving algebraically first",
      "Ignoring units and dimensional analysis",
      "Underestimating the volume of practice the course requires",
    ],
    studyTips: [
      "Shore up calculus and algebra alongside the physics",
      "Do many problems — physics is learned by solving, not reading",
      "Keep a clean method: diagram, knowns/unknowns, equations, solve, check",
      "Review lecture problems before attempting the assignment set",
    ],
    closing: [
      "Keeping pace with university physics is far easier with expert support that strengthens both the physics and the math. Our university physics tutoring helps students at UBC, SFU and beyond stay ahead. Book a free consultation to get started.",
    ],
  },

  "ib-ap-tutoring-ib-mathematics-analysis-approaches-sl-hl": {
    excerpt:
      "IB Math Analysis & Approaches (SL & HL) is rigorous and distinct from the BC curriculum. Here's what it covers, the pitfalls, and how to prepare — including the IA.",
    intro: [
      "IB Mathematics: Analysis & Approaches (AA) is one of the most rigorous high-school math courses in the world, especially at HL. It rewards genuine mathematical understanding and clear communication — and it has its own assessment style, including the Internal Assessment.",
    ],
    overview: [
      "AA emphasises algebraic methods, calculus and mathematical reasoning, with HL going considerably deeper than SL into proof, calculus and topics like complex numbers. Assessment blends exam papers (some calculator, some not) with the Internal Assessment, a mathematical exploration.",
      "Success comes from mastering content, learning to write mathematics the way IB examiners expect, and choosing a strong, focused IA topic.",
    ],
    keyConcepts: [
      "Functions, sequences and series",
      "Differential and integral calculus",
      "Trigonometry and identities",
      "Probability and statistics",
      "Proof and reasoning (especially HL)",
      "The Internal Assessment (mathematical exploration)",
    ],
    commonMistakes: [
      "Treating IB like the BC curriculum and missing the different emphasis",
      "Losing marks by not showing reasoning the way IB rubrics require",
      "Choosing an IA topic that's too broad or too simple",
      "Neglecting the non-calculator paper's mental-math demands",
    ],
    studyTips: [
      "Study past IB papers and mark schemes to learn the assessment style",
      "Practise communicating solutions clearly, not just getting answers",
      "Start the IA early and pick a focused, personally interesting topic",
      "Balance calculator and non-calculator practice",
    ],
    closing: [
      "IB Math AA rewards a tutor who knows the programme, not just the math. Our IB Math tutoring covers SL and HL and guides the Internal Assessment from topic to finished exploration. Book a free consultation to build your plan.",
    ],
  },

  "python-basic-syntax-and-structure": {
    excerpt:
      "Python is the ideal first programming language. This beginner's guide covers the core syntax and structure, common mistakes, and how to learn it effectively.",
    intro: [
      "Python is the best first language for a reason: its clean syntax lets beginners focus on how to think like a programmer rather than fighting the language. Getting the basics right sets you up for everything from web development to data science.",
    ],
    overview: [
      "Python programs are built from a few core building blocks: variables that store data, data types like numbers, strings and lists, and control flow that decides what runs when. Indentation — not braces — defines structure, which keeps Python code readable.",
      "The goal at this stage isn't to memorise syntax but to understand how these pieces fit together to solve problems.",
    ],
    keyConcepts: [
      "Variables and assignment",
      "Core data types: int, float, string, list, dict",
      "Conditionals (if / elif / else)",
      "Loops (for and while)",
      "Functions and parameters",
      "Indentation and code structure",
    ],
    commonMistakes: [
      "Inconsistent indentation causing errors",
      "Confusing '=' (assignment) with '==' (comparison)",
      "Off-by-one errors in loops and list indices",
      "Copying code without understanding what each line does",
    ],
    studyTips: [
      "Type out every example yourself — never just read code",
      "Build tiny projects (a calculator, a quiz) to apply what you learn",
      "Read error messages carefully; they usually tell you exactly what's wrong",
      "Learn to break problems into small, testable steps",
    ],
    closing: [
      "Learning to code is far faster with a mentor who explains the 'why' behind each concept. Our coding tutoring teaches Python through hands-on projects, from first steps to real programs. Book a free consultation to get started.",
    ],
  },

  "web-development-frontend-development-html-css-react": {
    excerpt:
      "Frontend development with HTML, CSS and React is a valuable, in-demand skill. This guide explains how the pieces fit together and how to learn them in the right order.",
    intro: [
      "Frontend development is how everything you see on the web gets built. Learning HTML, CSS and React in the right order — structure, then style, then interactivity — turns an overwhelming field into a clear learning path.",
    ],
    overview: [
      "HTML provides the structure of a page, CSS controls how it looks, and JavaScript (via a library like React) makes it interactive. React organises interfaces into reusable components, which is why it powers so much of the modern web.",
      "Beginners succeed by mastering HTML and CSS first, getting comfortable with JavaScript, and only then adding React — building real projects at every step.",
    ],
    keyConcepts: [
      "HTML structure and semantic elements",
      "CSS layout with flexbox and grid",
      "Responsive design for all screen sizes",
      "JavaScript fundamentals (the foundation of React)",
      "React components, props and state",
      "Building and deploying a real project",
    ],
    commonMistakes: [
      "Jumping to React before understanding HTML, CSS and JavaScript",
      "Neglecting responsive design until the end",
      "Copying components without understanding state and props",
      "Learning passively instead of building projects",
    ],
    studyTips: [
      "Learn in order: HTML → CSS → JavaScript → React",
      "Build a portfolio project as you go, not just tutorials",
      "Recreate real websites to practise layout and styling",
      "Understand state and props deeply — they're the heart of React",
    ],
    closing: [
      "Frontend development is best learned by building with guidance. Our web development tutoring takes students from HTML basics to real React projects, step by step. Book a free consultation to start building.",
    ],
  },

  "pre-calculus-polynomial-rational-functions": {
    excerpt:
      "Polynomial and rational functions are a key Pre-Calculus 12 unit. This guide explains graphs, asymptotes and behaviour, plus common mistakes and study tips.",
    intro: [
      "Polynomial and rational functions bring together factoring, graphing and analysis, and they're a major part of Pre-Calculus 12. Understanding how a function's equation reveals the shape of its graph is the key skill here.",
    ],
    overview: [
      "Polynomial functions are smooth curves whose behaviour is governed by their degree and factors, while rational functions are ratios of polynomials that introduce asymptotes and discontinuities. Reading these features straight from the equation is what the unit is really about.",
      "Once you can connect factors to x-intercepts, degree to end behaviour, and denominators to asymptotes, graphing becomes a logical process rather than guesswork.",
    ],
    keyConcepts: [
      "Degree, leading coefficient and end behaviour",
      "Finding zeros by factoring and the factor theorem",
      "Multiplicity and how graphs behave at intercepts",
      "Vertical, horizontal and slant asymptotes",
      "Points of discontinuity (holes) in rational functions",
      "Sketching functions from their equations",
    ],
    commonMistakes: [
      "Confusing a hole (removable discontinuity) with a vertical asymptote",
      "Ignoring multiplicity, so the graph's behaviour at intercepts is wrong",
      "Getting end behaviour backwards for odd vs even degree",
      "Forgetting to fully factor before analysing a rational function",
    ],
    studyTips: [
      "Always factor completely first — everything else follows from the factors",
      "Connect each algebraic feature to a visual one on the graph",
      "Practise sketching by hand before relying on a calculator",
      "Learn the asymptote rules by comparing numerator and denominator degrees",
    ],
    closing: [
      "This unit rewards linking algebra to graphs, which is exactly what focused tutoring builds. Our Pre-Calculus 12 tutoring makes polynomial and rational functions intuitive and prepares students for the final exam review. Book a free consultation to get started.",
    ],
  },

  // ─────────────────────────── BATCH 3 ───────────────────────────
  "chemistry-physical-chemistry": {
    excerpt:
      "Physical chemistry connects chemistry with physics and math — thermodynamics, kinetics and equilibrium. Here's a clear overview, common pitfalls, and study tips.",
    intro: [
      "Physical chemistry is where chemistry meets physics and mathematics, explaining not just what happens in a reaction but why and how fast. It's conceptually rich, and students who build strong math skills alongside it tend to do best.",
    ],
    overview: [
      "Physical chemistry covers thermodynamics (energy and spontaneity), kinetics (reaction rates) and equilibrium (the balance point of reversible reactions). These ideas explain the driving forces behind chemical change.",
      "Because the subject is quantitative, comfort with algebra, logarithms and graphs is essential — the chemistry concepts become much clearer when the math isn't a barrier.",
    ],
    keyConcepts: [
      "Enthalpy, entropy and Gibbs free energy",
      "Spontaneity and the direction of reactions",
      "Reaction rates and rate laws",
      "Activation energy and catalysts",
      "Dynamic equilibrium and Le Chatelier's principle",
      "Equilibrium constants and calculations",
    ],
    commonMistakes: [
      "Confusing thermodynamic favourability with reaction speed (they're different)",
      "Misapplying Le Chatelier's principle to changes it doesn't affect",
      "Struggling with the logarithms in equilibrium and pH calculations",
      "Memorising equations without understanding what they describe",
    ],
    studyTips: [
      "Strengthen the underlying math (logs, algebra) alongside the chemistry",
      "Keep thermodynamics and kinetics mentally separate — they answer different questions",
      "Use ICE tables systematically for equilibrium problems",
      "Draw energy diagrams to visualise activation energy and catalysis",
    ],
    closing: [
      "Physical chemistry becomes far more approachable with expert help that bridges the chemistry and the math. Our Chemistry 12 tutoring builds both together, so the concepts and calculations click. Book a free consultation to get started.",
    ],
  },

  "chemistry-chemical-reactions-bonding": {
    excerpt:
      "Chemical bonding and reactions are the core of chemistry. This guide explains bond types, reaction categories, common mistakes, and how to study them effectively.",
    intro: [
      "Bonding explains why atoms join together, and reactions describe how those bonds rearrange. These two ideas sit at the centre of all chemistry, so understanding them well pays off across every other topic.",
    ],
    overview: [
      "Chemical bonds — ionic, covalent and metallic — form because atoms are more stable together than apart. Reactions then break and form bonds, and recognising reaction types lets you predict products rather than memorise them.",
      "The key insight is that both bonding and reactivity come down to electrons and the drive toward stability.",
    ],
    keyConcepts: [
      "Ionic, covalent and metallic bonding",
      "Lewis structures and electron sharing",
      "Molecular shapes and polarity (VSEPR)",
      "Types of reactions: synthesis, decomposition, displacement, combustion",
      "Balancing chemical equations",
      "Predicting products of common reactions",
    ],
    commonMistakes: [
      "Confusing ionic and covalent bonding and their properties",
      "Drawing incorrect Lewis structures (miscounting valence electrons)",
      "Forgetting to balance equations before using them",
      "Not recognising reaction types, so products are guessed",
    ],
    studyTips: [
      "Master valence electrons and the octet rule first",
      "Practise Lewis structures until they're automatic",
      "Learn to classify reactions by type to predict products",
      "Always balance equations and check with conservation of mass",
    ],
    closing: [
      "Bonding and reactions are the foundation everything else builds on, so getting them solid early matters. Our science tutor in Burnaby makes these core ideas clear and connected. Book a free consultation to strengthen the fundamentals.",
    ],
  },

  "mathematics-trigonometry-coordinate-geometry": {
    excerpt:
      "Trigonometry and coordinate geometry link algebra to shapes and angles. This guide covers the essential ideas, common mistakes, and how to master them.",
    intro: [
      "Trigonometry and coordinate geometry connect algebra with the geometry of angles, triangles and the plane. They appear throughout Pre-Calculus, Calculus and physics, so a strong grasp here has a long payoff.",
    ],
    overview: [
      "Trigonometry relates the angles and sides of triangles and extends to the unit circle, where sine and cosine describe circular and wave-like behaviour. Coordinate geometry places shapes on the plane so they can be described with equations.",
      "Together they let you move fluidly between pictures and equations — a skill that unlocks much of higher math.",
    ],
    keyConcepts: [
      "Right-triangle trigonometry (SOH-CAH-TOA)",
      "The unit circle and radian measure",
      "Sine and cosine laws for non-right triangles",
      "Distance, midpoint and slope formulas",
      "Equations of lines and circles",
      "Connecting graphs to their equations",
    ],
    commonMistakes: [
      "Mixing up degrees and radians",
      "Forgetting when to use the sine law versus the cosine law",
      "Sign errors from the wrong quadrant on the unit circle",
      "Misremembering the distance or slope formula under pressure",
    ],
    studyTips: [
      "Learn the unit circle thoroughly — it underpins all of trigonometry",
      "Always note whether a problem uses degrees or radians",
      "Sketch the triangle or coordinate setup before calculating",
      "Practise moving between a graph and its equation both ways",
    ],
    closing: [
      "These topics reward connecting pictures to equations, which is exactly what good tutoring develops. Our math tutor in Vancouver makes trigonometry and coordinate geometry intuitive and exam-ready. Book a free consultation to get started.",
    ],
  },

  "physics-physics-the-underlying-math": {
    excerpt:
      "Most physics struggles are really math struggles. This guide explains the math you need for physics and how strengthening it transforms your results.",
    intro: [
      "Here's a truth many students discover too late: most difficulty in physics isn't about the physics — it's about the math underneath it. Strengthening that math is often the fastest way to better physics grades.",
    ],
    overview: [
      "Physics uses algebra to rearrange formulas, trigonometry to resolve vectors, and (at higher levels) calculus to describe change. When these skills are shaky, students who understand the physics conceptually still lose marks in the working.",
      "Building the underlying math alongside the physics removes that bottleneck and lets your understanding show on the page.",
    ],
    keyConcepts: [
      "Rearranging and solving equations for any variable",
      "Trigonometry for resolving vectors into components",
      "Working with units and dimensional analysis",
      "Graphs: slope and area as physical quantities",
      "Proportional reasoning and scaling",
      "Calculus basics for rates and accumulation (senior levels)",
    ],
    commonMistakes: [
      "Understanding the physics but losing marks in the algebra",
      "Errors resolving vectors because of weak trigonometry",
      "Ignoring units, leading to wrong answers",
      "Plugging in numbers too early instead of solving symbolically",
    ],
    studyTips: [
      "Treat the math as a core physics skill, not a side issue",
      "Solve every problem algebraically first, then substitute numbers",
      "Drill vector resolution until it's automatic",
      "Always carry and check units through your working",
    ],
    closing: [
      "Because physics and math are so intertwined, tutoring that strengthens both together produces the biggest gains. Our Physics 12 tutoring builds the underlying math right alongside the concepts. Book a free consultation to get started.",
    ],
  },

  "biology-genetics-evolution": {
    excerpt:
      "Genetics and evolution explain how traits are inherited and how life changes over time. This guide covers the core ideas, pitfalls, and how to study them.",
    intro: [
      "Genetics and evolution are two of biology's biggest ideas — how traits pass from one generation to the next, and how populations change over time. They're deeply connected, and understanding that link makes both far clearer.",
    ],
    overview: [
      "Genetics explains inheritance through DNA, genes and the rules first described by Mendel. Evolution then operates on that genetic variation: natural selection favours traits that improve survival and reproduction, gradually shaping populations.",
      "Seeing genetics as the source of variation and evolution as the process acting on it ties the whole topic together.",
    ],
    keyConcepts: [
      "DNA, genes and chromosomes",
      "Mendelian inheritance and Punnett squares",
      "Dominant, recessive and codominant traits",
      "Mutations as a source of variation",
      "Natural selection and adaptation",
      "Evidence for evolution",
    ],
    commonMistakes: [
      "Confusing genotype (genes) with phenotype (observable traits)",
      "Setting up Punnett squares incorrectly",
      "Thinking individuals evolve — populations do, over generations",
      "Assuming evolution has a goal or direction",
    ],
    studyTips: [
      "Practise Punnett squares until inheritance patterns are automatic",
      "Keep genotype and phenotype clearly distinct",
      "Explain natural selection in your own words with real examples",
      "Connect genetic variation to how evolution acts on it",
    ],
    closing: [
      "Genetics and evolution reward understanding the connections, not memorising facts. Our science tutor in Burnaby helps students see the big picture and the detail. Book a free consultation to get started.",
    ],
  },

  "biology-human-physiology": {
    excerpt:
      "Human physiology is detail-heavy but rewarding, especially for pre-med students. This guide covers the body's systems, common mistakes, and how to study them.",
    intro: [
      "Human physiology explains how the body's systems work and work together. It's content-dense — a favourite of Biology 12 and a cornerstone for anyone heading toward health sciences — but it becomes manageable when you learn systems rather than isolated facts.",
    ],
    overview: [
      "Physiology examines how organ systems — circulatory, respiratory, digestive, nervous and more — carry out the functions that keep us alive, and how they coordinate through feedback and regulation.",
      "The most effective approach is to understand how each system works as a whole and how they connect, so the many details hang on a coherent framework.",
    ],
    keyConcepts: [
      "The circulatory and respiratory systems",
      "The digestive and excretory systems",
      "The nervous and endocrine systems",
      "Homeostasis and feedback regulation",
      "How systems interact and coordinate",
      "Cell and tissue structure underlying function",
    ],
    commonMistakes: [
      "Memorising isolated facts instead of understanding whole systems",
      "Overlooking how systems interact (e.g. circulatory and respiratory)",
      "Confusing the nervous and endocrine control mechanisms",
      "Underestimating the volume of detail and cramming late",
    ],
    studyTips: [
      "Learn each system as a connected whole, then the details",
      "Draw flow diagrams (e.g. blood flow, feedback loops)",
      "Use analogies to make mechanisms memorable",
      "Space your revision — physiology has too much detail to cram",
    ],
    closing: [
      "Physiology rewards a systems-level understanding, which is exactly what good tutoring builds. Our science tutor in Burnaby helps students organise the detail into a clear picture — ideal preparation for health-science pathways. Book a free consultation to get started.",
    ],
  },

  "computer-science-data-structures-algorithms": {
    excerpt:
      "Data structures and algorithms are the core of computer science. This guide explains the essentials, common mistakes, and how to build real problem-solving skill.",
    intro: [
      "Data structures and algorithms (DSA) are the heart of computer science — how we organise data and solve problems efficiently. They're what interviews test and what separates people who can code from people who can engineer solutions.",
    ],
    overview: [
      "Data structures are ways of organising data (arrays, lists, stacks, trees, graphs), and algorithms are step-by-step methods for solving problems (searching, sorting, traversing). The skill is choosing the right structure and algorithm for a given problem.",
      "Understanding efficiency — how running time grows with input size (Big-O) — is what turns working code into good code.",
    ],
    keyConcepts: [
      "Arrays, linked lists, stacks and queues",
      "Trees and graphs",
      "Searching and sorting algorithms",
      "Recursion and problem decomposition",
      "Big-O time and space complexity",
      "Choosing the right structure for a problem",
    ],
    commonMistakes: [
      "Memorising algorithms without understanding why they work",
      "Ignoring time and space complexity",
      "Struggling with recursion by not trusting the recursive step",
      "Jumping to code before thinking through the approach",
    ],
    studyTips: [
      "Implement each data structure yourself, from scratch",
      "Always analyse the Big-O of your solution",
      "Practise problems by category (sorting, trees, graphs)",
      "Plan the approach on paper before writing any code",
    ],
    closing: [
      "DSA is learned by solving problems with guidance, not by memorising. Our computer science tutoring builds genuine problem-solving skill from the fundamentals up. Book a free consultation to get started.",
    ],
  },
};
