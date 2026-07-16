/**
 * Mixed batch: 2 SAT posts (verbal, strategy) + 2 university science singles
 * (chem kinetics/equilibrium, physics E&M/thermo). Distinct CTAs, broad sibling
 * checks. Science verified in scripts/verify-unisci.mjs.
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

/* ================= SAT: EVIDENCE-BASED READING & WRITING ================= */
const SP = "/programs/sat-prep";
const satRW = [
  p("The Reading and Writing portion of the SAT trips up strong students in a specific, frustrating way: you understand the passage, you speak English fluently, and yet you keep choosing wrong answers on questions that feel like they should be easy. This is not a reading-ability problem — it is that the SAT's Reading and Writing section tests a precise, evidence-based kind of reasoning that is different from ordinary reading, and it is full of carefully-designed trap answers. Learning how the section actually works, rather than just reading more, is what raises the score."),
  p("The SAT Reading and Writing section rewards evidence-based reasoning and specific grammar knowledge, not general literacy. This guide covers how the questions really work, the writing rules that are actually tested, and the strategies that lift scores — so you prepare for the section as it is designed."),

  h2("Everything must be supported by the text"),
  p("The single most important principle of SAT Reading is that every correct answer is directly supported by the passage — nothing more, nothing less. The SAT is not asking what is true in general, what is reasonable, or what you happen to know; it is asking what the text actually says or implies. This is why intelligent students choose wrong answers: they pick options that are true or sensible but not supported by the specific words on the page."),
  p("Training yourself to answer strictly from the text, and to demand evidence for every choice, is the core skill. The trap answers are engineered to be tempting precisely because they are plausible, or partly right, or true in the real world — but they fail the test of being supported by the passage. Learning to ask 'where exactly does the text support this?' for every answer, and to reject anything you cannot point to, is what turns the section from a guessing game into a reliable method. This evidence-based discipline is the foundation of a strong Reading score."),

  h2("How the trap answers are built"),
  p("Because the wrong answers are deliberately tempting, learning their common shapes is one of the highest-value SAT skills. Trap answers tend to fall into recognisable patterns: they are too extreme (using absolute words the passage does not justify), they are off-topic (true but not what the question asks), they distort the passage (twisting its meaning subtly), or they are half-right (correct in one part, wrong in another). Recognising these patterns lets you eliminate wrong answers confidently."),
  p("This is why strategic elimination is often more reliable than trying to find the right answer directly. On a hard question, ruling out the three answers you can prove are unsupported leaves the correct one, even when it did not initially jump out. Developing the habit of scrutinising each option against the passage, and learning the trap patterns the SAT favours, sharpens both your accuracy and your confidence. The wrong answers are not random; they are designed, and understanding their design is a genuine advantage."),
  linked(["If you understand the passages but keep picking wrong answers, the issue is the evidence-based reasoning and trap-answer patterns the SAT is built around — exactly what focused coaching makes clear fast. Our ", { text: "SAT tutoring", href: SP }, " teaches you to read the questions the way the test intends and to eliminate the traps with confidence."]),

  h2("The Writing rules that are actually tested"),
  p("The Writing and Language questions test a specific, finite set of grammar and rhetoric rules, which is good news: unlike reading, this content can be directly learned and mastered. The SAT repeatedly tests the same concepts — punctuation (especially commas, semicolons, and colons), sentence structure (avoiding fragments and run-ons), subject-verb and pronoun agreement, verb tense, and concise, clear expression. Knowing these rules cold turns a large share of questions into quick, certain points."),
  p("Because the tested rules are limited and predictable, targeted study of them is highly efficient. Many students lose Writing points not because English grammar is hard but because they never learned the specific rules the SAT checks, relying instead on what 'sounds right' — which the trap answers exploit. Learning the actual rules, particularly the punctuation and sentence-structure conventions the SAT loves, converts guesswork into knowledge. The Writing section also rewards concision: when two answers are both grammatically correct, the SAT usually prefers the shorter, clearer one. Mastering the finite rule set is one of the most reliable ways to raise your Reading and Writing score."),

  h2("Reading efficiently under time pressure"),
  p("The section is time-pressured, so how you read matters. Trying to absorb and memorise every detail of a passage wastes time and is unnecessary, because the questions are specific and you can return to the text for what you need. The efficient approach is to understand the passage's main idea and structure, then answer each question by locating and reading the relevant part closely, rather than relying on memory of a first careful read."),
  p("This targeted reading — grasp the whole, then zoom in for each question — is faster and more accurate than exhaustive reading, and it fits the digital SAT's shorter passages well. It keeps your evidence-based reasoning anchored to the actual text for each question, which is exactly what the section rewards. Practising this approach, so that you read purposefully rather than exhaustively, helps you finish comfortably while maintaining the precision the questions demand. Combining evidence-based reasoning, knowledge of the grammar rules, and efficient reading is the complete preparation for this section."),

  h2("Vocabulary in context: meaning from the sentence"),
  p("The SAT tests vocabulary, but not the way old vocabulary lists suggest — it tests words in context, asking what a word means as it is used in a specific sentence. Many of these words are common words with multiple meanings, and the question is which meaning fits here. This rewards reading the sentence carefully to determine the intended sense, rather than recalling a single dictionary definition, and it catches students who match a word to its most familiar meaning without checking the context."),
  p("The reliable method is to read the sentence, predict what the word must mean from the surrounding logic, and then find the answer choice that matches your prediction — the same evidence-based, context-driven approach that governs the whole section. A word that usually means one thing may be used in a less common sense, and the sentence tells you which. Building the habit of determining meaning from context, rather than from memory, is what these questions reward, and it connects vocabulary directly to the reading-comprehension skills the section is really testing. It also means vocabulary study is most useful when it focuses on the range of meanings common words can take, not on memorising obscure terms."),

  h2("Command of evidence: connecting claims to support"),
  p("A distinctive SAT question type asks you to identify the evidence that supports a particular answer, or to find data in a graph or passage that backs up a claim. These 'command of evidence' questions test the very heart of the section's philosophy: that conclusions must be grounded in specific support. Some present a claim and ask which part of the text or which data point supports it; others integrate a chart with a passage and ask you to draw or verify a conclusion from both."),
  p("Succeeding at these requires reading precisely and connecting claims to their actual support, whether textual or quantitative. With graphs and data, the skill is reading the visual accurately and matching it to the passage's argument, being careful not to overstate what the data shows. These questions reward exactly the disciplined, evidence-based reasoning that the whole section is built on, now made explicit. Practising the habit of always tying a conclusion to its specific support — and of reading data carefully rather than loosely — is what turns these questions from tricky into reliable, and it reinforces the core skill that lifts the entire Reading and Writing score."),

  h2("Where students lose Reading and Writing points"),
  mli(["Choosing answers that are true or sensible but not supported by the passage."]),
  mli(["Falling for trap answers that are too extreme, off-topic, or subtly distorted."]),
  mli(["Relying on what 'sounds right' instead of the specific grammar rules tested."]),
  mli(["Not knowing the finite set of punctuation and sentence-structure rules."]),
  mli(["Over-reading passages instead of answering from targeted evidence."]),

  h2("How to master SAT Reading and Writing"),
  mli(["Answer strictly from the text, demanding evidence for every choice."]),
  mli(["Learn the trap-answer patterns and eliminate confidently."]),
  mli(["Study the specific, finite grammar rules the Writing questions test."]),
  mli(["Prefer the concise, clear answer when grammar alone does not decide."]),
  mli(["Read for main idea and structure, then locate evidence per question."]),

  h2("Raise your Reading and Writing score"),
  linked(["If your Reading and Writing score is stuck despite strong English, the fix is the evidence-based method and the specific grammar rules the SAT tests — both very learnable. Our ", { text: "SAT and PSAT tutoring in Burnaby and online", href: SP }, " builds exactly these, working from real questions and the traps that are costing you points."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring a recent practice section, and we will show you where the points are going and how to get them back — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so honestly."]),
];

const satStrat = [
  p("Two students with the same knowledge can walk out of the SAT with very different scores, and the difference is usually not what they know — it is how they took the test. The SAT rewards specific test-taking strategy: pacing, smart guessing, using the digital format well, and managing the pressure. Most students prepare only the content and neglect these skills, then underperform on test day relative to their ability. Mastering the strategy is often the fastest way to raise a score that has plateaued, because it converts the knowledge you already have into points you were leaving behind."),
  p("This guide covers the test-taking strategies that actually move SAT scores — pacing, guessing, using the digital SAT's tools and adaptive format, and handling test-day pressure — so your score reflects what you truly know."),

  h2("There is no penalty for guessing — so never leave a blank"),
  p("The most fundamental SAT strategy is also the simplest: there is no penalty for wrong answers, so you should never leave a question blank. Every question you do not answer is a guaranteed zero, while every guess has a chance of being right. This means that even when time is running out, filling in an answer for every remaining question is strictly better than leaving them empty — a free expected gain that students who run out of time routinely forfeit."),
  p("Better still is the educated guess. On most questions, you can eliminate at least one or two answer choices as clearly wrong, which sharply improves your odds on the remaining ones. Combining the no-blank rule with active elimination — always ruling out what you can before guessing — turns guessing from a last resort into a genuine scoring tool. Building the habit of never leaving a blank, and always eliminating before you guess, is one of the easiest ways to protect and add points, and it costs nothing but the discipline to apply it."),

  h2("Pacing: the skill that quietly caps scores"),
  p("More SAT points are lost to poor time management than almost anything else. Each section gives you a fixed time for a fixed number of questions, and falling behind creates a cascade of rushed errors on questions you could have answered correctly with a moment more. Yet many students prepare untimed, mastering the content in comfort and then falling apart against the clock on test day."),
  p("Good pacing is a trainable skill. It means knowing roughly how long you can spend per question, recognising quickly when a question is a time-sink and moving on (with a guess and a mark to return if time allows), and not sacrificing several easy questions for one hard one. The goal is to give every question a fair chance rather than acing the first half and rushing the rest. Practising under realistic time limits from early in your preparation, so that pacing becomes automatic, is one of the highest-impact things you can do — it ensures your score reflects your ability rather than your speed under panic."),
  linked(["If your practice scores fall short of your ability, the gap is usually strategy — pacing, guessing, and using the test well — which is the most overlooked and most coachable part of SAT prep. Our ", { text: "SAT tutoring", href: SP }, " builds the test-taking approach that turns your knowledge into the score you deserve."]),

  h2("Using the digital SAT's format and tools"),
  p("The SAT is now digital and adaptive, and understanding what that means is part of preparing well. The test adjusts the difficulty of the second module in each section based on your performance on the first, which raises the stakes on doing well early — though every question still counts, so steady accuracy throughout matters. Being comfortable with the digital interface, so that navigating and answering is second nature, removes friction that would otherwise cost you time and focus."),
  p("The digital format also provides useful tools: a built-in calculator for the whole maths section, an annotation feature for marking up questions, and the ability to flag questions to return to. Knowing how and when to use these — the calculator where it genuinely saves time, flagging to manage your pacing, annotation to track your reasoning — is a real if modest advantage. Practising with the actual digital format, so that nothing about the interface or the tools is a surprise on test day, lets you direct all your attention to the questions. Preparing for the how of the digital test, not just the what, is part of a complete strategy."),

  h2("Managing test-day pressure"),
  p("All the preparation in the world matters little if nerves undo you on the day, and managing test-day performance is a legitimate part of readiness. Anxiety causes rushed decisions, careless mistakes, and blanking on things you know — and it is worst for students who have not simulated real conditions. The antidote is familiarity: the more your practice resembles the real experience, the less the real experience can rattle you."),
  p("Practical preparation for test day includes taking full, timed practice tests under realistic conditions, so that the length, the format, and the pressure hold no surprises. It also helps to have simple routines to stay calm and focused, and a plan for the moments when a question stumps you or nerves spike — knowing in advance that you will guess, mark it, and move on keeps one hard question from derailing a whole section. Building this composure through realistic practice, so that test day feels familiar rather than threatening, is the final piece of SAT preparation, and it ensures you perform at the level your work has earned."),

  h2("Using practice tests the right way"),
  p("Full-length practice tests are the single most valuable tool in SAT preparation, but only if you use them properly — and most students do not. A practice test is not just a score check; it is a diagnostic and a rehearsal. Taken under realistic, timed conditions, it builds the stamina and pacing the real exam demands, and — most importantly — it reveals exactly which question types and topics are costing you points, turning a vague sense of weakness into a specific list to work on."),
  p("The real value comes after the test, in the review. Going through every question you got wrong, and every one you got right but were unsure about, to understand precisely why, is where the improvement happens. This turns each practice test into a targeted study plan: the patterns in your errors tell you what to focus on next, whether it is a grammar rule, a math concept, or a trap-answer type you keep falling for. Students who take practice tests and only glance at the score waste their most powerful resource, while those who analyse them rigorously improve fastest. Taking realistic tests and mining them for insight, on a regular schedule, is the engine of effective SAT preparation."),

  h2("A study plan matched to your score goal"),
  p("Effective SAT preparation is structured, not just diligent, and a plan matched to your starting point and target makes the difference. It begins with a diagnostic test to see where you actually stand, then directs your effort toward your weakest areas and the question types costing you the most — because time spent on what you are already good at yields little, while time on your specific gaps moves the score. Setting a realistic target and working backward to a plan keeps your preparation focused."),
  p("A good plan also sequences the work sensibly: building content and technique first, then shifting toward timed sections and full practice tests as the exam approaches, so you peak at the right moment. It builds in regular review, because repeated mistakes are the surest way to stall. And it is sustainable — consistent, focused study over weeks beats last-minute cramming, especially for a test that rewards developed skills and familiarity rather than memorised facts. Approaching your SAT preparation strategically, with a plan built around your own diagnostic and goal, is itself one of the highest-leverage decisions you make, and it is an area where experienced guidance saves considerable wasted effort."),

  h2("Where students underperform on the SAT"),
  mli(["Leaving questions blank when there is no penalty for guessing."]),
  mli(["Guessing without first eliminating the answers they can rule out."]),
  mli(["Preparing untimed, then falling apart against the clock."]),
  mli(["Not practising with the digital format and its tools."]),
  mli(["Neglecting test-day nerves until they cause avoidable mistakes."]),

  h2("How to master SAT strategy"),
  mli(["Never leave a blank, and always eliminate before you guess."]),
  mli(["Train pacing under strict time limits from the start of your prep."]),
  mli(["Practise with the digital format until the interface and tools are automatic."]),
  mli(["Do well early on the adaptive sections, but keep steady accuracy throughout."]),
  mli(["Simulate test-day conditions to build composure and a clear plan."]),

  h2("Turn your knowledge into your SAT score"),
  linked(["If your real SAT scores fall short of your ability, the missing piece is strategy — the part of prep that turns knowledge into points, and the part most students neglect. Our ", { text: "SAT and PSAT tutoring in Burnaby and online", href: SP }, " builds the pacing, guessing, and digital-test approach that close the gap between what you know and what you score."]),
  linked(["A free conversation is the easiest first step. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us about your practice scores, and we will show you the strategy that lifts them — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

/* ================= UNIVERSITY CHEMISTRY: KINETICS & EQUILIBRIUM ================= */
const UC = "/programs/university-chemistry";
const UC_SIBS = ["university-chemistry-ubc-chemistry-chem-111-121-123", "university-chemistry-langara-college-chemistry-chem-1114-1118-1120", "chemistry-chemical-reactions-bonding", "chemistry-organic-chemistry", "chemistry-physical-chemistry", "chemistry-stoichiometry-gas-laws"];
/* Reaction coordinate: reactants -> transition state (Ea) -> products, with catalyst path. */
const rxnSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 240" role="img" aria-label="A reaction energy diagram. Reactants start at a certain energy, rise to a peak called the activation energy barrier at the transition state, then fall to the products' lower energy. A dashed lower curve shows how a catalyst reduces the activation energy without changing the start or end energies." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="45" y1="200" x2="420" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="45" y1="30" x2="45" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
    <path d="M 60 130 C 130 130, 150 45, 210 45 C 270 45, 290 165, 380 165" fill="none" stroke="#3A5A98" stroke-width="2.5"/>
    <path d="M 60 130 C 140 130, 165 90, 210 90 C 255 90, 300 165, 380 165" fill="none" stroke="#B45309" stroke-width="2" stroke-dasharray="6 4"/>
    <line x1="210" y1="45" x2="210" y2="130" stroke="#64748B" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="230" y="70" font-size="11" fill="#3A5A98">Ea (no catalyst)</text>
    <text x="230" y="112" font-size="11" fill="#B45309">Ea (catalyst)</text>
    <text x="60" y="122" font-size="11" fill="#1F2937">reactants</text>
    <text x="340" y="180" font-size="11" fill="#1F2937">products</text>
    <text x="232" y="24" font-size="12" fill="#1F2937" text-anchor="middle" font-weight="700">A catalyst lowers the barrier, not the destination</text>
    <text x="30" y="115" font-size="11" fill="#64748B" text-anchor="middle" transform="rotate(-90 30 115)">energy</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Kinetics is about the barrier (how fast); thermodynamics is about the start and end points (whether
    and how far). A catalyst speeds the reaction by lowering the barrier — but it never changes the
    equilibrium, because it leaves the reactant and product energies untouched.
  </figcaption>
</figure>`;
const kinetics = [
  p("Chemical kinetics and equilibrium are where many university chemistry students hit a wall, and it is usually for one specific reason: they conflate two questions that are actually separate. Kinetics asks how fast a reaction goes; equilibrium and thermodynamics ask how far it goes and whether it happens at all. These are genuinely different questions with different answers, and confusing them is the root of most of the difficulty in this crucial part of general and physical chemistry. Once you keep them distinct, a great deal that seemed contradictory suddenly makes sense."),
  p("This guide covers the real distinction between kinetics and equilibrium, the concepts that university exams actually test, and how to reason about them clearly — so this challenging, high-stakes topic becomes navigable."),

  h2("Speed versus destination: two different questions"),
  p("The foundational insight is that how fast a reaction proceeds and how far it proceeds are independent. A reaction can be thermodynamically favourable — it 'wants' to happen and would release energy — yet be so slow that nothing visibly occurs, because the kinetic barrier is high. Diamond turning to graphite is the classic example: favourable, but so slow it takes geological time. Conversely, a fast reaction is not necessarily one that goes to completion."),
  { _type: "htmlBlock", _key: key(), html: rxnSvg },
  p("Keeping these two questions separate — speed is kinetics, extent and spontaneity are thermodynamics and equilibrium — resolves most of the confusion students bring to the topic. When you analyse a reaction, ask both questions independently: is it favourable (thermodynamics), and is it fast (kinetics)? The answers need not agree. This clear separation is the single most valuable mental habit for mastering this material, and it is where good teaching most quickly clears the fog."),

  h2("Kinetics: what controls the rate"),
  mp(["Kinetics studies reaction rates and what affects them. The rate depends on concentration through the rate law, and the order of a reaction tells you how: for a first-order reaction, doubling the concentration doubles the rate; for a second-order reaction, doubling it quadruples the rate, because the rate depends on concentration squared. Temperature also matters enormously — higher temperature means faster reactions, captured by the Arrhenius relationship, because more molecules have the energy to cross the barrier."]),
  p("The central concept is activation energy, the barrier a reaction must overcome — the peak in the energy diagram above. Anything that lowers this barrier speeds the reaction, which is exactly what a catalyst does. Crucially, a catalyst provides an alternative pathway with a lower activation energy but does not change the reaction's start or end energies, so it speeds the reaction without being consumed and without changing where equilibrium lies. Understanding activation energy, and how concentration, temperature and catalysts affect the rate, is the core of kinetics, and it is heavily tested."),

  h2("Equilibrium: the dynamic balance"),
  p("Equilibrium is where the topic's second question lives. A reversible reaction reaches equilibrium when the forward and reverse rates become equal, so the concentrations stop changing — but the reaction has not stopped; it is dynamic, proceeding in both directions at the same rate. This dynamic nature is a concept students often miss, picturing equilibrium as a static endpoint rather than a balance of ongoing processes."),
  mp(["The equilibrium constant, ", im(String.raw`K`), ", quantifies the balance as the ratio of products to reactants at equilibrium; a large K means the reaction favours products, a small K favours reactants. Comparing the reaction quotient Q with K tells you which way a reaction will shift to reach equilibrium: if ", im(String.raw`Q < K`), " it proceeds forward, if ", im(String.raw`Q > K`), " it proceeds in reverse. Understanding equilibrium as a dynamic balance described by K, and being able to predict the direction of change from Q versus K, is the heart of the equilibrium half of the topic."]),

  h2("Le Chatelier: predicting the response to change"),
  p("The most practically useful equilibrium concept is Le Chatelier's principle: when a system at equilibrium is disturbed, it shifts to counteract the disturbance and restore balance. Add more reactant, and the equilibrium shifts toward products to consume it; remove product, and it shifts forward to replace it; change the temperature or pressure, and it responds accordingly. This lets you predict, qualitatively, how a reaction responds to almost any change without calculation."),
  p("A subtle but important point that exams love to test: a catalyst does not shift equilibrium. Because it lowers the activation energy for both the forward and reverse reactions equally, it helps the system reach equilibrium faster but does not change where that equilibrium lies — the value of K is unchanged. Distinguishing what shifts an equilibrium (concentration, temperature, pressure) from what merely changes the rate of reaching it (a catalyst) is exactly the kind of precise understanding this topic demands. Mastering Le Chatelier, and the distinction between shifting equilibrium and speeding kinetics, ties the whole topic together."),
  p("Temperature deserves special care, because it is the one change that actually alters the value of K rather than just shifting the position of a fixed equilibrium. Whether raising the temperature shifts a reaction toward products or reactants depends on whether the reaction releases or absorbs heat, so you must consider the reaction's energetics — treating heat as if it were a reactant or product in the Le Chatelier reasoning. This is a common source of errors, because students apply the principle mechanically without accounting for the direction of the heat flow. Getting temperature right, and understanding why it is different from the other changes, is a mark of genuine mastery of equilibrium and a frequent exam discriminator."),

  h2("Reaction mechanisms and the rate-determining step"),
  p("A deeper part of kinetics that university courses emphasise is that most reactions do not happen in a single step but through a mechanism — a sequence of elementary steps. Understanding this explains something that puzzles students: why the rate law often cannot be predicted from the overall balanced equation. The rate is controlled by the slowest step in the sequence, the rate-determining step, just as the slowest stage of an assembly line sets the pace of the whole thing."),
  p("This is why the experimentally-measured rate law reveals information about the mechanism, and why the two must be consistent. A proposed mechanism is only valid if its rate-determining step produces the observed rate law, which is exactly the kind of reasoning exams test. Understanding that reactions proceed through steps, that the slowest step governs the rate, and that the rate law is a window into the mechanism, is a significant conceptual step up from simple kinetics. It rewards genuine understanding over memorisation, because you must reason about how a sequence of steps produces an observed behaviour, and it is a common place where students need guidance to see the logic clearly."),

  h2("Beyond gas-phase: the equilibria that matter"),
  p("The equilibrium principles extend to several specific systems that university chemistry tests heavily, and recognising them as the same core idea in different contexts makes them far more manageable. Acid-base equilibria describe how acids and bases dissociate in water, governed by their own equilibrium constants, and underpin the whole concept of pH and buffers — solutions that resist changes in acidity precisely because of an equilibrium that shifts to counteract added acid or base, a direct application of Le Chatelier."),
  p("Solubility equilibria describe how sparingly-soluble salts dissolve, again governed by an equilibrium constant, and explain why adding a common ion reduces solubility — once more, Le Chatelier at work. The powerful realisation is that these are not separate topics to learn from scratch; they are the same equilibrium reasoning applied to acids, bases, and dissolving salts. A student who understands the core principles of K, Q, and Le Chatelier can reason through acid-base and solubility problems as variations on a familiar theme, rather than as new material. Seeing the unity across these equilibrium systems is one of the most efficient ways to master a large and heavily-tested part of the course."),

  h2("Where students struggle with kinetics and equilibrium"),
  mli(["Confusing how fast a reaction goes (kinetics) with how far (thermodynamics)."]),
  mli(["Thinking a catalyst changes the equilibrium position, when it only changes the rate."]),
  mli(["Picturing equilibrium as static rather than a dynamic balance."]),
  mli(["Misreading the order of a reaction and how concentration affects rate."]),
  mli(["Applying Le Chatelier carelessly, especially with temperature and pressure."]),

  h2("How to master kinetics and equilibrium"),
  mli(["Always separate the two questions: how fast, and how far."]),
  mli(["Understand activation energy and how concentration, temperature and catalysts affect rate."]),
  mli(["Treat equilibrium as dynamic, described by K, with direction set by Q versus K."]),
  mli(["Use Le Chatelier to predict responses, and know a catalyst does not shift equilibrium."]),
  mli(["Practise problems that combine kinetics and equilibrium reasoning."]),

  h2("Get help with university chemistry"),
  linked(["If kinetics and equilibrium are where your university chemistry is faltering, the fix is usually the clear separation of speed from extent — a distinction that a good tutor can make click quickly. Our ", { text: "university chemistry tutoring in Burnaby and online", href: UC }, " builds the precise reasoning these topics demand, working from your actual course material and past exams."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where the chemistry is hard, and we will show you the reasoning that clarifies it — online across Metro Vancouver and beyond, or in person in Burnaby. If tutoring is not what you need, we will tell you honestly."]),
];

/* ================= UNIVERSITY PHYSICS: E&M & THERMODYNAMICS ================= */
const UP = "/programs/university-physics";
const UP_SIBS = ["university-physics-ubc-physics-phys-100-101-107-108", "university-physics-langara-college-physics-phys-1101-1114-1118", "physics-kinematics-dynamics", "physics-physics-the-underlying-math"];
const emThermo = [
  p("Electromagnetism and thermodynamics are the two pillars of university physics beyond mechanics, and they defeat students for opposite reasons. Electromagnetism is abstract — you are reasoning about invisible fields and forces that require real mathematics to handle. Thermodynamics seems intuitive but hides deep subtlety in its laws and their consequences. Both reward the same thing that mechanics does: understanding the core principles and reasoning with them, rather than memorising formulas. Grasping how each field is organised around a few powerful ideas is the key to mastering material that otherwise feels overwhelming."),
  p("This guide covers the core ideas of university electromagnetism and thermodynamics, why they challenge students, and how to reason about them clearly — so these demanding but foundational topics become approachable rather than a wall you dread on the way to your degree."),

  h2("Electromagnetism: fields are the key idea"),
  p("The concept that unlocks electromagnetism is the field — the idea that a charge creates an electric field in the space around it, and that this field exerts forces on other charges. Instead of thinking about action at a distance, you think about a charge creating a field, and the field acting on things within it. This field picture, abstract as it is at first, is the framework that makes all of electromagnetism coherent, and students who build genuine intuition for fields handle the subject far better than those manipulating formulas blindly."),
  mp(["The basic force law is Coulomb's law, and it shares the inverse-square form of gravity: the force between charges weakens with the square of the distance, so doubling the separation cuts the force to a quarter. From this foundation, the subject builds to electric potential, circuits, magnetism, and the beautiful unification of electricity and magnetism into a single electromagnetic theory. But it all rests on the field idea, and time invested in truly understanding fields pays off across the entire topic."]),

  h2("Circuits: where E&M becomes concrete"),
  mp(["Circuits are where abstract electromagnetism becomes tangible and calculable, and they are heavily tested. The workhorse relationships are Ohm's law, ", im(String.raw`V = IR`), ", and electrical power, ", im(String.raw`P = IV`), ": a 12-volt source across a 4-ohm resistance drives a 3-amp current and dissipates 36 watts. These simple laws, applied carefully, handle a huge range of circuit problems."]),
  p("The reasoning that trips students up is how components combine. Resistors in series add directly — a 4-ohm and an 8-ohm in series give 12 ohms — while resistors in parallel combine as reciprocals, so two 4-ohm resistors in parallel give just 2 ohms. Understanding why current splits the way it does through a network, rather than memorising formulas, is what lets you handle the unfamiliar circuit configurations exams present. Circuits reward genuine understanding of how charge and energy flow, and they connect the abstract field theory to devices you can actually build and measure, which makes them both concrete and satisfying once they click."),

  h2("Thermodynamics: energy and its limits"),
  p("Thermodynamics governs energy, heat, and work, and its deceptive difficulty is that its everyday familiarity hides real conceptual depth. The first law is essentially energy conservation applied to thermal systems: the change in a system's internal energy equals the heat added minus the work it does. This is intuitive enough, but applying it correctly — tracking what counts as heat, work, and internal energy in a given process — requires care that catches students out."),
  p("The subtlety deepens with the second law, which introduces entropy and the direction of natural processes: the entropy of an isolated system tends to increase, which is why heat flows from hot to cold and not the reverse, and why some processes are irreversible. This law explains why no heat engine can be perfectly efficient — a Carnot engine operating between 400 K and 300 K has a maximum efficiency of just 25%, and no real engine does better. Understanding thermodynamics as the study of energy and the fundamental limits on transforming it, governed by these two laws, is what turns a set of formulas into a coherent and profound framework."),
  linked(["If electromagnetism's abstraction or thermodynamics' subtlety is challenging you, understanding the core ideas — fields, and the two laws — is the key, and it is exactly what focused tutoring builds. Our ", { text: "university physics tutoring in Burnaby and online", href: UP }, " develops the conceptual reasoning these demanding topics reward, from your own problem sets and past exams."]),

  h2("Magnetism and the great unification"),
  p("Magnetism is the other half of electromagnetism, and its deep lesson is that electricity and magnetism are not separate phenomena but two aspects of one thing. Moving charges create magnetic fields, and changing magnetic fields create electric fields — a reciprocal relationship that is one of the most profound ideas in physics. This connection, worked out in the nineteenth century, unified two seemingly distinct forces into a single electromagnetic theory and revealed that light itself is an electromagnetic wave."),
  p("For a student, the practical content includes the forces that magnetic fields exert on moving charges and currents, how currents produce magnetic fields, and electromagnetic induction — how a changing magnetic field drives a current, which is the principle behind electric generators and much of modern technology. The reasoning can be challenging because the geometry is three-dimensional and the relationships involve directions as well as magnitudes. But the unifying insight — that electricity and magnetism are one interconnected phenomenon — is what makes the subject coherent rather than a collection of separate rules, and grasping it is deeply rewarding as well as essential for the exams."),

  h2("Thermodynamic processes and how to analyse them"),
  p("Applying thermodynamics well means understanding the specific processes a system can undergo and how the laws apply to each. Physics courses examine processes at constant temperature, constant pressure, constant volume, and those with no heat exchange, and each has particular consequences for how heat, work, and internal energy relate. The skill is recognising which kind of process a problem describes and applying the first law appropriately, tracking each quantity correctly."),
  p("This is where careful reasoning matters, because a small misidentification — treating a constant-pressure process as constant-volume, say — leads to a wrong analysis even when the concepts are understood. Problems often involve cycles, where a system returns to its starting state, and analysing the heat and work over a complete cycle connects directly to how engines and refrigerators work. Learning to identify the process, apply the first law, and reason about the energy flows is the practical core of thermodynamics problem-solving. It rewards methodical, careful analysis over memorised formulas, and it is exactly the kind of structured reasoning that becomes reliable with guided practice on varied problems."),

  h2("The mathematics you cannot avoid"),
  p("Both topics, but especially electromagnetism, lean heavily on mathematics, and this is where many otherwise-capable students struggle — not with the physics itself, but with the calculus and vector analysis it is expressed in. University electromagnetism uses vectors throughout and, in calculus-based courses, integrals and derivatives to handle fields and potentials. A student shaky on this mathematics will struggle with the physics even when they understand the concepts, because the two are inseparable at this level."),
  p("The practical implication is that shoring up the relevant mathematics — vectors, calculus, and how they represent physical quantities — is often the most efficient way to improve in these subjects. Keeping the physical meaning attached to every mathematical step, so that an integral represents adding up contributions and a derivative represents a rate of change, prevents the mathematics from becoming empty symbol-manipulation. Understanding that the maths is the language the physics is written in, and building fluency in it alongside the concepts, is essential to success. This connection between the mathematics and the physical ideas is exactly where good guidance adds the most value."),

  h2("Where students struggle with E&M and thermodynamics"),
  mli(["Manipulating formulas without building intuition for fields."]),
  mli(["Mishandling how resistors combine in series versus parallel."]),
  mli(["Applying the first law carelessly, mistracking heat, work, and internal energy."]),
  mli(["Missing the depth of the second law and entropy."]),
  mli(["Weak vector and calculus skills undermining the physics."]),

  h2("How to master E&M and thermodynamics"),
  mli(["Build genuine intuition for fields as the core idea of electromagnetism."]),
  mli(["Understand circuits by how charge and energy flow, not by memorised rules."]),
  mli(["Learn thermodynamics through its two laws and what they fundamentally mean."]),
  mli(["Shore up the vectors and calculus the physics is expressed in."]),
  mli(["Keep the physical meaning attached to every mathematical step."]),

  h2("Get help with university physics"),
  linked(["If electromagnetism and thermodynamics are the courses standing between you and your degree, understanding their core ideas and the mathematics behind them turns overwhelming material into something you can reason through. Our ", { text: "university physics tutoring in Burnaby and online", href: UP }, " builds both, working from your actual course and past exams, for engineering and science students."]),
  linked(["Start with a free conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us which topic is hard and why, and we will show you the reasoning that unlocks it — online across Metro Vancouver and beyond, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

await applyPost({ slug: "sat-prep-evidence-based-reading-writing", was: 408, body: satRW, siblingSlugs: ["sat-prep-sat-mathematics", "sat-prep-test-taking-hacks-strategies"] });
await applyPost({ slug: "sat-prep-test-taking-hacks-strategies", was: 424, body: satStrat, siblingSlugs: ["sat-prep-sat-mathematics", "sat-prep-evidence-based-reading-writing"] });
await applyPost({ slug: "university-chemistry-chemical-kinetics-equilibrium", was: 400, body: kinetics, siblingSlugs: UC_SIBS });
await applyPost({ slug: "university-physics-electromagnetism-thermodynamics", was: 425, body: emThermo, siblingSlugs: UP_SIBS });
