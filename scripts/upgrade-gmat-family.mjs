/**
 * GMAT family: verbal-quantitative-focus, data-insights, ir-mini-mocks-strategies.
 * Lead-gen, distinct CTAs. Quant verified in scripts/verify-gmatgre.mjs.
 * Format claims kept accurate-but-general (GMAT Focus Edition).
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["gmat-prep-verbal-quantitative-focus", "gmat-prep-data-insights", "gmat-prep-ir-mini-mocks-strategies"];
const P = "/programs/gmat-prep";

/* ============ 1. VERBAL & QUANTITATIVE ============ */
const vq = [
  p("You are smart, you did well in university, and yet the GMAT is humbling you — questions you feel you should get right, a clock that never gives you enough time, a score that will not move no matter how much content you review. This is the experience of almost every GMAT taker, and it reveals the test's central secret: the GMAT is not a knowledge test. It is a reasoning test dressed up in maths and grammar, and preparing for it as though it were a content exam is exactly why smart people plateau. Understanding what it actually measures is the key to breaking through."),
  p("The Quantitative and Verbal sections are the core of the GMAT, and both reward reasoning and efficiency over raw knowledge. This guide covers what these sections truly test, why bright people get stuck, and the approach that actually raises scores — so you prepare for the exam the GMAT really is."),

  h2("Why the GMAT humbles intelligent people"),
  p("The GMAT deliberately tests skills that a lifetime of academic success does not guarantee: reasoning under severe time pressure, avoiding cleverly-laid traps, and choosing efficient methods over thorough ones. The maths rarely goes beyond high school, and the grammar is not obscure — but the questions are engineered so that the obvious approach is slow and the tempting answer is wrong. This is why content review alone fails, and why re-learning algebra does not move the needle for someone who already knows algebra."),
  p("The shift that unlocks progress is recognising that you are being tested on how you think, not what you know. The test rewards the person who spots the shortcut, sidesteps the trap, and manages the clock — not the person who grinds through every problem the long way. Once you stop trying to know more and start learning to reason better and faster, the score begins to move. This reframing is the single most important step in effective GMAT preparation, and it is where good coaching makes the fastest difference, because it targets the real skill the test measures."),

  h2("Quant: the shortcuts the test is built around"),
  p("The Quantitative section covers arithmetic, algebra and word problems — content most test-takers already know — but rewards efficient reasoning under a tight clock. The test is designed so that the straightforward, textbook method often takes too long, and the high scorers are those who use strategic shortcuts."),
  mp(["Two techniques carry enormous weight. Backsolving — plugging the answer choices into the problem rather than solving it algebraically — turns many hard questions into quick checks; to solve ", im(String.raw`2x + 5 = 17`), ", testing the choice x = 6 confirms it instantly. Number-picking — choosing easy concrete numbers like 100 for percentage problems — turns abstract questions into simple arithmetic. These are not tricks; they are the efficient methods the test is secretly built to reward, and mastering them is often worth more than any amount of content review."]),
  p("The deeper skill is choosing the right approach for each question — knowing when to solve directly, when to backsolve, when to pick numbers, and when to estimate. Estimation in particular is underused: many questions can be answered approximately far faster than exactly. Developing the judgement to pick the fastest path, and the discipline to abandon a slow one, is what separates a strong quant score from a frustrated one."),

  h2("Verbal: reading for logic, not detail"),
  p("The Verbal section tests critical reasoning and reading comprehension — and above all, the ability to reason logically about arguments. Critical Reasoning questions present a short argument and ask you to strengthen it, weaken it, or identify an assumption, and they reward precise logical thinking, not general reading ability. The trap answers are designed to be tempting to someone reading loosely."),
  p("Reading Comprehension, similarly, rewards grasping the structure and logic of a passage — its main point, how the argument is built, the author's stance — rather than memorising details. Test-takers who read every word closely and try to absorb everything run out of time and miss the point; those who read for structure and logic answer faster and more accurately. Learning to read actively for argument and structure, and to reason rigorously about what an argument does and does not establish, is the core verbal skill, and it is very trainable with the right practice on real question types."),
  linked(["If you are bright but the GMAT is not reflecting it in your score, the gap is almost never knowledge — it is the reasoning-under-pressure and shortcut skills the test is built around, which are exactly what focused coaching develops fast. Our ", { text: "GMAT tutoring", href: P }, " targets the strategic thinking that moves scores, working from real questions and your specific traps."]),

  h2("Data Sufficiency: the uniquely GMAT question"),
  p("The Quant section includes a question type found nowhere else, and it deserves special attention because it confuses nearly everyone at first: Data Sufficiency. Instead of asking you to solve a problem, it gives you a question and two pieces of information, and asks whether that information is enough to answer it — without necessarily doing the full calculation. This is a genuinely different skill, and it catches out even strong mathematicians."),
  p("The insight is that you are testing sufficiency, not finding the answer: a statement is sufficient if it pins down exactly one answer, insufficient if it leaves more than one possible. Learning to evaluate this efficiently — often without fully solving — is a distinct skill that must be practised deliberately, and it is a common place where scores are lost early and gained quickly once the logic clicks. Mastering Data Sufficiency is frequently one of the highest-return areas of GMAT preparation, precisely because it is so unfamiliar and so learnable."),

  h2("The quant topics you actually need"),
  p("One relief for test-takers is that the GMAT's quantitative content is finite and well-defined — it does not test advanced mathematics. The core is arithmetic, basic algebra, and word problems, with recurring themes like percentages, ratios, averages, rates, and simple probability. A percentage problem, a ratio split, a weighted average: these patterns come up again and again, and recognising them quickly is a large part of quant efficiency."),
  mp(["Because the content is bounded, targeted review of these specific topics pays off directly. Knowing that ", im(String.raw`+20\%`), " then ", im(String.raw`-20\%`), " leaves you at 96%, not back where you started; that a 3:5 ratio of 40 splits into 15 and 25; that a weighted average of 90 and 80 in a 40:60 mix is 84 — these are the bread-and-butter calculations the test rewards you for doing fast. Mastering the handful of recurring quant themes, rather than trying to prepare for every conceivable maths topic, is the efficient path, and it lets you focus your energy on the reasoning and speed that actually distinguish scores."]),

  h2("Answer elimination: your most reliable tool"),
  p("A skill that applies across the whole test, and that high scorers use constantly, is strategic elimination. On a multiple-choice exam, you do not always need to find the answer directly — you can often reach it by ruling out the ones that cannot be right. In quant, estimation and logic can eliminate implausible choices; in verbal, trap answers often reveal themselves as too extreme, off-topic, or subtly illogical once you know what to look for."),
  p("This matters because elimination is frequently faster and more reliable than solving, and because when you must guess — which the adaptive, timed format sometimes requires — an educated guess among two remaining choices is far better than a blind one among five. Developing the habit of actively eliminating wrong answers, and learning the common shapes of trap answers the GMAT favours, sharpens both your accuracy and your speed. It is a skill that turns the multiple-choice format from a constraint into a tool, and it is one of the most transferable techniques across every section of the exam."),

  h2("Where GMAT test-takers actually lose points"),
  mli(["Preparing as though it is a content test rather than a reasoning test."]),
  mli(["Solving quant questions the long way instead of using backsolving and number-picking."]),
  mli(["Reading passages for detail rather than for argument and structure."]),
  mli(["Falling for the tempting trap answers in Critical Reasoning."]),
  mli(["Misunderstanding Data Sufficiency as solving rather than testing sufficiency."]),

  h2("How to prepare for GMAT Quant and Verbal"),
  mli(["Shift your mindset: train reasoning and efficiency, not more content."]),
  mli(["Master backsolving, number-picking and estimation as core quant tools."]),
  mli(["Read for logic and structure, and reason precisely about arguments."]),
  mli(["Practise Data Sufficiency until testing sufficiency becomes second nature."]),
  mli(["Work real questions under time pressure, analysing why traps are traps."]),

  h2("Break through your GMAT plateau"),
  linked(["If your GMAT score has stalled despite hard work, more content review will not fix it — the strategic reasoning the test rewards is a different skill, and it is exactly what targeted coaching builds. Our ", { text: "GMAT tutoring in Burnaby and online", href: P }, " works from real questions and your own error patterns, developing the efficient reasoning that finally moves the number."]),
  linked(["The first step is a free conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where your GMAT prep is stuck, and we will show you what is really holding the score back — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so honestly."]),
];

/* ============ 2. DATA INSIGHTS ============ */
const di = [
  p("If you are preparing for the current GMAT and the Data Insights section is throwing you — tables, graphs, multi-part questions that combine several sources — you are not alone, and you are facing what may be the most business-relevant and least familiar part of the whole exam. Data Insights is where the GMAT most directly tests the skill business schools actually care about: making sense of data to reach a decision. It rewards a specific kind of thinking that pure quant or verbal practice does not build, which is exactly why it deserves dedicated preparation."),
  p("This guide covers what the Data Insights section tests, why it is genuinely different from traditional quant, and how to build the data-reasoning skills it demands — so this modern, decision-focused section becomes a strength rather than a stumbling block."),

  h2("Why Data Insights exists, and what it measures"),
  p("Data Insights reflects a deliberate shift in what the GMAT measures: away from abstract mathematics and toward the practical ability to interpret and reason with data, which is what managers actually do. The questions present information in the forms real business decisions use — tables, graphs, dashboards, several sources at once — and ask you to analyse it, draw conclusions, and judge what the data does and does not support. This is data literacy, and it is increasingly central to business."),
  p("Understanding this purpose helps you prepare correctly. The section is not testing whether you can do hard calculations; it is testing whether you can extract meaning from data presented realistically and messily, often under time pressure. The skill is interpretation and judgement — reading a chart accurately, combining information from multiple places, spotting what is relevant, and reasoning to a sound conclusion. Recognising that Data Insights rewards clear data reasoning rather than computational firepower is the foundation of preparing for it well, and it is why it needs its own focused practice rather than more traditional quant drilling."),

  h2("The question types, and the skills behind them"),
  p("Data Insights blends several question formats, each testing a facet of data reasoning. Some present a table you must sort and analyse; some give a graph or chart to interpret; some combine multiple sources — a report, an email, a dataset — that you must synthesise. Others resemble the logical data-sufficiency reasoning from the quant tradition, applied to data. The common thread is working with realistic, multi-part information rather than a single clean equation."),
  mp(["The underlying skills are consistent: reading data accurately, calculating simple but crucial quantities like percentage change (from 200 to 250 is a 25% increase, ", im(String.raw`(250-200)/200 = 25\%`), "), comparing and combining figures, and reasoning to a conclusion the data actually supports. The maths itself is rarely hard; the challenge is the interpretation and the synthesis. Practising each question format until you are comfortable moving through realistic data quickly and accurately is the path to a strong Data Insights score, and it is a distinct skill set worth building deliberately."]),
  linked(["If Data Insights is where your GMAT preparation feels shakiest, that is common — it is the newest and least familiar section — and its data-reasoning skills are very coachable with focused practice. Our ", { text: "GMAT tutoring", href: P }, " builds exactly the interpretation and synthesis skills this section rewards, working through realistic data problems until they feel routine."]),

  h2("The specific formats, one by one"),
  p("It helps to know the recognisable formats Data Insights uses, because each rewards a slightly different approach. Table analysis presents a sortable table and asks you to evaluate statements about it — the skill is sorting and filtering efficiently to check each claim. Graphics interpretation gives you a chart and asks you to complete statements based on it — the skill is reading the graph accurately and not misjudging scales or trends."),
  p("Two-part analysis presents a problem with a two-column answer, testing your ability to handle two related quantities or conditions at once. Multi-source reasoning gives you several tabs of information — a memo, a table, a chart — and asks questions that require pulling from more than one, testing synthesis above all. Recognising which format you are facing, and knowing the efficient way to handle each, removes a layer of difficulty on test day. Rather than meeting each question cold, you approach it with a plan suited to its type, which saves time and reduces errors. Familiarity with the formats is a straightforward, high-value part of preparation that many test-takers skip."),

  h2("Why business schools weight this so heavily"),
  p("It is worth understanding why the GMAT emphasises Data Insights, because it shapes how seriously to take it. Modern business runs on data — managers are constantly presented with dashboards, reports, and analytics, and are expected to extract insight and make decisions from them. Business schools want students who can do this, and admissions increasingly value the Data Insights score as a signal of exactly the data literacy that MBA programs and employers demand."),
  p("This means strong performance here is not just about the total score; it speaks directly to a skill that matters for your intended career. The reasoning the section builds — interpreting data honestly, combining sources, judging what evidence supports — is genuinely useful beyond the test, in the classroom and the boardroom. Approaching Data Insights as the development of a real professional capability, rather than a hurdle to clear, tends to make the preparation both more effective and more motivating. It is one of the places where what the test measures and what your future actually requires line up most closely."),

  h2("The data-interpretation errors that cost points"),
  p("Certain mistakes recur across Data Insights, and knowing them helps you avoid them. Misreading a graph's axes or scale leads to confidently wrong answers. Confusing correlation with causation — assuming that because two things move together, one causes the other — is a classic trap the section deliberately sets. Drawing a conclusion the data merely suggests but does not establish, or overlooking a crucial figure hidden in a second source, are others that catch careful people."),
  p("The common thread is that these are errors of interpretation and reasoning, not calculation, which is why traditional maths practice does not prevent them. Guarding against them means reading data carefully and sceptically: checking exactly what a chart shows, being precise about what a conclusion requires, and resisting the tempting-but-unsupported inference. Developing this disciplined, critical reading of data is the heart of Data Insights success, and it is a skill that improves markedly with practice on realistic problems and feedback on where your reasoning went wrong. Learning to spot these traps before they catch you is one of the most reliable ways to lift your score on this section."),

  h2("Time pressure and the multi-source trap"),
  p("A defining challenge of Data Insights is that its questions can be information-dense and time-consuming, and managing that is part of the skill. Multi-source questions in particular tempt you to read everything thoroughly before answering, which burns time you do not have. The efficient approach is to understand the question first, then go to the data for exactly what you need, rather than absorbing every detail upfront."),
  p("This targeted, question-first strategy is essential across the section: know what you are looking for, extract it efficiently, and resist the pull to over-read. Learning to navigate tables and graphs quickly, to find the relevant figure without getting lost, and to judge when you have enough information to answer, are practical skills that timed practice builds. Because the section is unfamiliar and time-pressured, students who practise these strategies deliberately gain a real edge over those who simply hope to muddle through. Combining sound data reasoning with efficient, question-first navigation is what turns Data Insights from a scramble into a controlled, confident performance."),

  h2("Where test-takers actually struggle with Data Insights"),
  mli(["Treating it like traditional quant instead of a data-interpretation section."]),
  mli(["Over-reading dense, multi-source information before knowing the question."]),
  mli(["Losing time navigating tables and graphs inefficiently."]),
  mli(["Drawing conclusions the data does not actually support."]),
  mli(["Neglecting the section in prep because it is newer and less familiar."]),

  h2("How to prepare for Data Insights"),
  mli(["Build data-reasoning skills — interpreting charts, tables and multiple sources."]),
  mli(["Read the question first, then extract only the data you need."]),
  mli(["Practise each question format until moving through data is quick and accurate."]),
  mli(["Master the simple but crucial calculations, like percentage change."]),
  mli(["Give the section dedicated practice rather than assuming quant prep covers it."]),

  h2("Make Data Insights a strength"),
  linked(["If the Data Insights section is holding your GMAT score back, its data-reasoning skills are learnable and very coachable — and mastering them plays directly to what business schools value. Our ", { text: "GMAT tutoring in Burnaby and online", href: P }, " builds the interpretation, synthesis and timing this modern section rewards, working from realistic problems until it becomes routine."]),
  linked(["Start with a free, no-pressure conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us how Data Insights is going, and we will show you how to turn it into a strong section — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

/* ============ 3. STRATEGY & MOCKS ============ */
const strategy = [
  p("You have learned the content, you can do the questions when you are relaxed at home, and then you sit a practice test and your score is nowhere near what you expected. If this is you, the problem is not your knowledge — it is everything around it: pacing, the adaptive algorithm, test-day nerves, and the strategic decisions that a real GMAT demands. These test-taking skills are as important as the content, and they are the ones most self-preppers neglect. Mastering them is often the fastest way to raise a score that has stalled."),
  p("Strategy, pacing and realistic practice are what turn content knowledge into an actual GMAT score. This guide covers how the adaptive test really works, how to manage the clock, and how to use practice tests properly — so you perform on test day as well as you do in study."),

  h2("How the adaptive test changes everything"),
  p("The GMAT's computer-adaptive format fundamentally shapes how you should approach it, and misunderstanding it costs points. As you answer, the test adjusts the difficulty to your performance, which has crucial consequences: you cannot skip a question and return to it the way you might on a paper test, and every answer influences what comes next. This means the decisions you make in the moment — how long to spend, when to guess and move on — matter enormously."),
  p("The key strategic implication is that you cannot afford to get stuck. Spending five minutes on one hard question to get it right, at the cost of rushing several later ones, is a losing trade, because leaving questions unanswered or rushed at the end hurts your score badly. Understanding that the adaptive test rewards steady, complete progress over occasional brilliance changes how you allocate your effort. Learning to make quick, disciplined decisions about each question — solve it, shortcut it, or make your best guess and move on — is a core skill the format demands, and one that only develops through realistic, timed practice."),

  h2("Pacing: the skill that quietly caps scores"),
  p("More GMAT points are lost to poor time management than almost anything else. Each section gives you a fixed time for a fixed number of questions, which works out to roughly two minutes each, and falling behind creates a cascade of rushed errors. Yet many test-takers prepare untimed, mastering the content in comfort and then falling apart against the clock on test day."),
  p("Good pacing is a trainable skill with concrete techniques: knowing your average time per question, recognising quickly when a question is going to be a time-sink and cutting your losses, and having the discipline to guess and move rather than chase a single hard problem. The goal is to finish every section, giving every question a fair chance, rather than acing the first half and guessing blindly through the last. Practising under strict time limits from early in your preparation, so that pacing becomes automatic, is one of the highest-impact things you can do — and it is exactly the discipline that separates a score that reflects your ability from one that falls short of it."),
  linked(["If you know the material but your practice-test scores do not show it, the gap is pacing and test strategy — the most overlooked and most coachable part of GMAT prep. Our ", { text: "GMAT tutoring", href: P }, " builds the timing, decision-making and test-day approach that turn your knowledge into the score it deserves."]),

  h2("Using practice tests the right way"),
  p("Full-length practice tests are the single most valuable tool in GMAT preparation, but only if you use them properly — and most people do not. A practice test is not just a score check; it is a diagnostic and a rehearsal. Taken under realistic conditions, it builds the stamina the real exam demands, reveals your pacing problems, and — most importantly — shows you exactly which question types and topics are costing you points."),
  p("The real value comes after the test, in the review. Going through every question you got wrong, and every one you got right but struggled with, to understand precisely why, is where the learning happens. This turns each practice test into a targeted study plan: the patterns in your errors tell you what to work on next. Test-takers who take practice tests and only glance at the score waste their most powerful resource, while those who analyse them rigorously improve fastest. Taking realistic mocks and mining them for insight, on a regular schedule, is the engine of effective GMAT preparation."),

  h2("Test-day performance and nerves"),
  p("All the preparation in the world matters little if nerves undo you on the day, and managing test-day performance is a legitimate part of readiness. Anxiety causes rushed decisions, misread questions, and blanking on things you know — and it is worst for people who have not simulated real conditions. The antidote is familiarity: the more your practice resembles the real experience, the less the real experience can rattle you."),
  p("Practical preparation for test day includes taking full mocks under realistic conditions so nothing is a surprise, developing a routine to stay calm and focused, and having a plan for the moments when a question stumps you or nerves spike. Knowing in advance how you will handle a hard question, a wave of anxiety, or falling behind on time keeps a single bad moment from derailing the whole section. Building this composure and having a clear test-day strategy is the final piece of GMAT preparation, and it ensures that on the day that counts, you perform at the level your preparation has earned."),

  h2("Building a study plan that works"),
  p("Effective GMAT preparation is not just hard work; it is well-structured work, and a good plan makes the difference between months of frustration and steady improvement. The foundation is a realistic timeline built around a diagnostic — take a full practice test early to see where you actually stand, then target your weakest areas rather than spreading effort evenly. Time spent on what you are already good at is largely wasted; time on your specific weaknesses moves the score."),
  p("A sound plan also balances the phases of preparation: building content and technique first, then shifting toward timed practice and full mocks as the test approaches, so you peak at the right moment. It builds in regular review of your errors, because the same mistakes repeated are the surest way to plateau. And it is sustainable — consistent, focused study over weeks beats frantic cramming, because the reasoning skills the GMAT tests develop with time and repetition, not overnight. Approaching your preparation strategically, with a plan matched to your starting point and your target, is itself one of the highest-leverage decisions you make, and it is an area where experienced guidance saves both time and wasted effort."),

  h2("Making the most of the on-screen tools"),
  p("The GMAT provides certain tools on test day, and using them well is a small but real edge. Data Insights offers an on-screen calculator, and knowing when it genuinely saves time versus when a mental estimate is faster prevents the common error of over-relying on it and slowing yourself down. The quant section, notably, does not offer a calculator, which is precisely why the mental-maths shortcuts and estimation skills discussed elsewhere matter so much — you must be fluent without one."),
  p("Beyond the calculator, familiarity with the test interface itself — how questions are presented, how to navigate within a section, how the timer displays — removes friction on the day. Every second spent figuring out the mechanics is a second not spent thinking. Practising with materials that mirror the real interface, so that the format holds no surprises, lets you direct all your attention to the questions themselves. These are small optimisations individually, but together they ensure that nothing about the test's mechanics stands between your ability and your score. Preparing for the how of the test, not just the what, is part of a complete, professional approach to the exam."),

  h2("Where test-takers actually underperform"),
  mli(["Preparing untimed, then falling apart against the clock."]),
  mli(["Getting stuck on hard questions on an adaptive test that punishes it."]),
  mli(["Leaving questions rushed or unanswered at the end of a section."]),
  mli(["Taking practice tests but only checking the score, not analysing errors."]),
  mli(["Neglecting test-day nerves and simulated conditions until it is too late."]),

  h2("How to master GMAT strategy"),
  mli(["Understand the adaptive format and never get stuck on one question."]),
  mli(["Train pacing under strict time limits from the start of your prep."]),
  mli(["Take realistic full-length mocks, then review every error rigorously."]),
  mli(["Turn each mock's error patterns into your next study focus."]),
  mli(["Simulate test-day conditions to build composure and a clear plan."]),

  h2("Turn your knowledge into your score"),
  linked(["If your real scores fall short of your ability, the fix is strategy and practice-test technique — the part of GMAT prep that turns knowledge into points, and the part most people neglect. Our ", { text: "GMAT tutoring in Burnaby and online", href: P }, " builds the pacing, adaptive-test approach and mock-review discipline that close the gap between what you know and what you score."]),
  linked(["A free conversation is the easiest first step. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us about your practice scores and where they fall short, and we will show you the strategy that lifts them — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will tell you honestly."]),
];

await applyPost({ slug: "gmat-prep-verbal-quantitative-focus", was: 384, body: vq, siblingSlugs: SIBS.filter((s) => s !== "gmat-prep-verbal-quantitative-focus") });
await applyPost({ slug: "gmat-prep-data-insights", was: 376, body: di, siblingSlugs: SIBS.filter((s) => s !== "gmat-prep-data-insights") });
await applyPost({ slug: "gmat-prep-ir-mini-mocks-strategies", was: 381, body: strategy, siblingSlugs: SIBS.filter((s) => s !== "gmat-prep-ir-mini-mocks-strategies") });
