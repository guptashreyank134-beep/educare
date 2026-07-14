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
};
