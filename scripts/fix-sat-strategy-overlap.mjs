/**
 * FIX: sat-prep-test-taking-hacks-strategies overlapped the GMAT strategy post at
 * 21.5% because both reused the same universal test-strategy content and the
 * per-family sibling checks never compared across families. This re-authors the
 * SAT post to be genuinely SAT-specific, with the GMAT strategy post passed as a
 * sibling so the gate enforces distinctness (<3%).
 */
import { applyPost, key, p, h2, h3, mli, linked } from "./flagship-lib.mjs";

const SP = "/programs/sat-prep";

const body = [
  p("Two students can know the exact same amount of maths, grammar, and reading, sit the same SAT, and walk away with scores a hundred points apart. What separates them is not knowledge — it is how they handled the test itself: how they spent their minutes, how they treated questions they were unsure of, how they used the digital tools, and how they held their nerve. These are learnable skills, entirely separate from the content, and for the SAT specifically they are where a great many points are quietly won or lost. Mastering them is often the quickest way for a prepared student to jump a score band."),
  p("This guide is about SAT test-taking strategy — the how of the exam rather than the what. It covers the scoring quirk that should change how you guess, how to spend your time on the digital SAT, how to use the built-in tools, and how to keep test-day nerves from costing you points you have already earned."),

  h2("The scoring rule that should change how you guess"),
  p("Begin with the single most exploitable fact about SAT scoring: there is no deduction for a wrong answer. A blank and a wrong answer score identically — zero — but a guess carries a real chance of being right. It follows, ironclad, that you should answer every question, even ones you have no time to read. A bubbled guess on the last three questions as the clock runs out is free expected value that too many students simply leave on the table."),
  p("Turn that into a habit and then sharpen it. Before guessing, eliminate: on most SAT questions you can rule out one or two choices that are clearly wrong — an answer that is too extreme, that contradicts the passage, that misreads the maths — and every choice you eliminate lifts your odds on the rest. A guess between two remaining options is far better than a shot in the dark among four. The discipline of never leaving a blank, always after eliminating what you can, is the lowest-effort points on the entire SAT, and it costs nothing but remembering to do it."),

  h2("Spending your minutes on the digital SAT"),
  p("The digital SAT gives you a set number of minutes for each module, and the students who fall behind lose points not to hard questions but to the clock — rushing the back half, misreading in a hurry, or never reaching questions they could have answered. Because the early questions in a module tend to be quicker, a slow start compounds. Managing your minutes deliberately is the difference between a score that reflects your ability and one that falls short of it."),
  p("The practical skill is a sense of your own budget per question, and the willingness to cut your losses. If a question is turning into a time sink, mark it, put down your best guess, and move on — the digital SAT lets you flag questions and come back, so nothing is lost by leaving and returning. Getting to every question and giving each a fair look beats acing the first half and blindly guessing the last five. This pacing is built the same way any physical skill is: through timed practice, until the rhythm is automatic and you are no longer watching the clock in a panic."),
  linked(["If you know the material but your practice scores keep landing below it, the culprit is almost always pacing and test technique — the most overlooked and most coachable part of SAT prep. Our ", { text: "SAT and PSAT tutoring", href: SP }, " builds the timing and decision-making that turn what you know into the score you deserve."]),

  h2("The digital format is an advantage — if you use it"),
  p("The SAT is now taken on a computer, and it adapts: your performance on the first module of a section shapes the difficulty of the second. This raises the value of a strong, steady start, though every question still counts, so accuracy throughout matters more than any single question. Beyond the adapting, the digital format hands you tools that reward familiarity — and punish those who meet them for the first time on test day."),
  p("There is a built-in calculator available for the entire maths section, an on-screen annotation tool for marking up questions and passages, and the ability to flag questions to revisit. Each earns its keep when used with judgement: the calculator for genuinely messy arithmetic but not for sums you could do faster by hand, flagging to manage your pacing, annotation to keep your reasoning straight on a dense reading question. The only way these tools become second nature is to practise on the real digital interface, so that on exam day your whole attention goes to the questions and none of it to figuring out the software. Preparing for the mechanics of the digital test is a small, concrete edge that many students overlook."),

  h2("Holding your nerve when it counts"),
  p("A student can be perfectly prepared and still be undone on the day by nerves, which cause exactly the mistakes preparation was meant to prevent — misreading questions, rushing, going blank on something familiar. Test anxiety hits hardest when the real experience feels unfamiliar, which points straight at the remedy: make your practice resemble the real thing closely enough that the real thing holds no surprises."),
  p("That means taking full, timed practice tests in realistic conditions well before the exam, so the length, the on-screen format, and the pressure are all things you have felt before. It means having a small routine to settle yourself and refocus, and — crucially — a pre-decided plan for the bad moments: when a question stumps you or anxiety spikes, you already know you will flag it, guess, breathe, and move on, so a single rough patch never snowballs into a lost section. Composure built through realistic rehearsal is the last piece of SAT readiness, and it is what lets you perform on test day at the level your preparation has actually earned."),

  h2("Practice tests are a mirror, not a scoreboard"),
  p("The full-length practice test is the closest thing SAT prep has to a secret weapon, and most students blunt it by treating the number at the end as the whole point. The number barely matters. What matters is everything the test shows you about how you actually perform: where your attention slips, which passage types slow you down, whether you fade in the second module, and precisely which skills are leaking points. A practice test is a mirror held up to your test-taking, and the reflection is the value."),
  p("So the work happens after you put your pencil down. Reopen every question you got wrong, plus every one you landed but second-guessed, and name the exact reason for each — a comma rule you never learned, an algebra step you fumbled, a wrong answer whose bait you swallowed. Do that and the test has just handed you a customised study list, ranked by what is actually hurting you. This is why one carefully-dissected practice test teaches more than three taken and forgotten. Make this dissection a routine, and your weak spots shrink test by test instead of stubbornly reappearing."),

  h2("Working backward from the score you want"),
  p("Strong SAT preparation looks less like grinding and more like navigation: you fix your position, fix your destination, and chart between them. A first practice test marks your position and reveals which parts of the exam are pulling your score down hardest, so your hours go where they will actually register on the scoreboard rather than into skills that are already solid. Naming a specific target score and mapping the route to it keeps every study session purposeful instead of vague."),
  p("The route has a natural order, too. Early on you shore up the underlying content and learn the techniques; as the test date approaches you shift the weight toward timed sections and full dress rehearsals, so your sharpness crests on the right day rather than a fortnight too soon. Woven through it is constant review of your own mistakes, because nothing stalls a score faster than repeating them, and a rhythm of consistent work rather than a frantic finish, since this exam rewards trained skill and easy familiarity over facts crammed the night before. Treating your preparation as a mapped route from your diagnostic to your goal is, by itself, one of the highest-return choices you can make — and it is where a coach's experience removes the most guesswork."),

  h2("Where students leave SAT points behind"),
  mli(["Leaving questions blank when a wrong answer costs nothing more than a blank."]),
  mli(["Guessing before eliminating the choices they could rule out."]),
  mli(["Practising untimed, then losing the back half of a module to the clock."]),
  mli(["Meeting the digital tools and interface for the first time on test day."]),
  mli(["Taking practice tests but reading only the score, not the errors."]),
  mli(["Letting nerves, unrehearsed, cause avoidable mistakes on the day."]),

  h2("How to master SAT test-taking"),
  mli(["Answer every question, always eliminating before you guess."]),
  mli(["Build a per-question time sense, and flag-and-move rather than get stuck."]),
  mli(["Rehearse on the real digital format until the tools are automatic."]),
  mli(["Review every practice test rigorously and let the errors set your next focus."]),
  mli(["Simulate test-day conditions to build the composure that protects your score."]),

  h2("Turn your knowledge into your SAT score"),
  linked(["If your real SAT scores keep falling short of what you know, the missing piece is test-taking strategy — the layer of skill that converts knowledge into points, and the one most students never deliberately train. Our ", { text: "SAT and PSAT tutoring in Burnaby and online", href: SP }, " builds the guessing discipline, pacing, digital-tool fluency, and composure that close the gap between what you know and what you score."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring a recent practice test, and we will show you exactly where the points are going and how to get them back — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so honestly."]),
];

// GMAT strategy post passed as a sibling so the gate enforces distinctness across families.
await applyPost({
  slug: "sat-prep-test-taking-hacks-strategies",
  was: 1570,
  body,
  siblingSlugs: ["sat-prep-sat-mathematics", "sat-prep-evidence-based-reading-writing", "gmat-prep-ir-mini-mocks-strategies"],
});
