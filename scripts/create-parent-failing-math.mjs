/**
 * Parent-facing article: "My Child Is Failing Math — What Should I Do?"
 *
 * Highest-intent parent search. DRAFT, reviewedByExpert = false.
 *
 * Useful-first: it gives the parent a real plan they could follow without ever
 * contacting us, and openly says when tutoring is NOT the answer. That honesty
 * is what makes these convert — parents in Burnaby have been pitched already.
 *
 *   Preview:  node --env-file=.env.local scripts/create-parent-failing-math.mjs
 *   Apply:    node --env-file=.env.local scripts/create-parent-failing-math.mjs --commit
 */
import { createArticle, commit, p, h2, h3, li, num, mp, linked, span } from "./flagship-lib.mjs";

const body = [
  p("Finding out your child is failing math is a specific kind of awful. It usually arrives late — a report card, a parent-teacher interview, a test they did not mention — and it arrives with the sense that you should have known sooner."),
  p("The first thing worth saying: a failing grade in math is almost never about intelligence, and it is rarely about effort either. Math is relentlessly cumulative. Miss one idea in October and every topic built on it is harder, so a student who understood everything until a specific week can look, by December, like a student who understands nothing."),
  p("That is also why it is fixable. If the problem is a gap rather than an inability, you can find the gap. Here is how to do that, in the order that actually works."),

  h2("Step 1: Find out where it stopped making sense — not what the grade is"),
  p("The grade tells you there is a problem. It does not tell you where the problem is, and that is the only useful information."),
  p("Sit down with your child and ask one question: \"When did this last make sense?\" Not \"what don't you understand\" — they cannot answer that, because you do not know what you do not know. \"When did it last make sense\" is answerable, and the answer is often surprisingly specific: \"when we were doing factoring\", \"before the graphs unit\"."),
  p("That answer is worth more than the report card. It points at the week the foundation cracked, and everything since has been built on it."),

  h2("Step 2: Work out which of two problems you have"),
  p("This is the step most parents skip, and it decides everything that follows. There are two ways to fail math, they look identical from the outside, and they need opposite treatments."),
  h3("A concept gap"),
  p("They do not understand what the mathematics means. They may still get some answers right by copying the shape of a worked example. Wrong answers are strange rather than close. They ask \"what do I do here?\" rather than \"is this right?\""),
  h3("A practice gap"),
  p("They understand it, but not fast enough or reliably enough for a test. They can explain the method to you correctly. Their mistakes are dropped signs and arithmetic slips. Homework is fine; tests are not."),
  linked(["The ten-minute test: take a question they got wrong and ask them to explain how they would do it — out loud, without writing anything. If they can talk you through it and only fall apart executing, that is a practice gap. If the explanation is vague or circular, that is a concept gap. We wrote a ", { text: "full guide to telling these apart", href: "/blog/concept-gap-or-practice-gap-parents-guide" }, " because getting it wrong wastes months."]),
  p("Why it matters this much: giving a concept-gap student more practice questions makes things worse. Every repetition drills the misunderstanding deeper. And giving a practice-gap student more explanation bores them while changing nothing, because explanation was never the constraint."),

  h2("Step 3: Talk to the teacher — and ask better questions"),
  p("Most parents ask \"how is he doing?\" and get \"he needs to apply himself\", which helps nobody. Ask these instead:"),
  li("Which specific topic did the marks start dropping on?"),
  li("Is the work wrong, or unfinished? (Unfinished usually means a speed problem; wrong usually means a concept problem.)"),
  li("Does he ask questions in class, or go quiet?"),
  li("If you had to name one thing to fix first, what would it be?"),
  p("Teachers see thirty students and will tell you useful things if you ask answerable questions. That last one especially — they nearly always know."),

  h2("Step 4: Fix the foundation, even though it feels like going backwards"),
  p("Here is the part parents resist, and it is the part that works."),
  p("If your child is failing Pre-Calculus 12 because their factoring is shaky, the answer is to fix factoring — not to work harder at Pre-Calculus 12. That feels wrong. They are already behind; going back to Grade 10 material seems like the opposite of catching up."),
  p("But a cumulative subject does not let you skip it. Time spent building on a cracked foundation is time spent making the eventual repair bigger. Students who go back and fix the gap often catch up faster than students who grind forward, because suddenly everything else stops fighting them."),

  h2("What not to do"),
  li("Do not buy a workbook yet. Practice is the right treatment for exactly one of the two problems, and you do not yet know which one you have."),
  li("Do not make it about effort. \"Try harder\" is unhelpful advice if they are already trying and the foundation is broken — and it teaches them that failure is a character flaw."),
  li("Do not wait for the next report card. Cumulative subjects compound; the gap is cheaper to fix in November than in April."),
  li("Do not panic-hire the first tutor who answers the phone. A tutor who starts teaching before diagnosing is guessing with your money."),

  h2("When tutoring is not the answer"),
  p("Worth saying plainly, since a tutoring company is saying it: not every failing grade needs a tutor."),
  li("If your child understands the material and simply is not doing the work, a tutor will not fix that. That is a motivation or organisation problem, and paying for tutoring usually just adds another adult to ignore."),
  li("If the problem is one specific topic and their teacher offers extra help, start there. It is free and the teacher knows the class."),
  li("If something else is going on — sleep, anxiety, a rough term — the math is a symptom. Fix the cause first; the math will follow more easily than you expect."),
  p("Tutoring is worth paying for when there is a genuine gap that needs finding and rebuilding, and when nobody has the time or expertise to do that one-to-one. That is a real and common situation. It is just not every situation."),

  h2("What good help actually looks like"),
  p("If you do decide to get help, the thing worth paying for is diagnosis, not hours."),
  li("A tutor should spend the first session finding the gap, not starting at chapter one"),
  li("They should be able to tell you where it broke, in specific terms, after that session"),
  li("They should be willing to go back to earlier material if that is where the problem is"),
  li("They should be able to explain why a method works, not just walk through it faster"),
  p("A tutor who cannot tell you what is wrong after a session has not diagnosed anything, and you are paying for supervised homework."),

  h2("The honest timeline"),
  p("Parents ask how long this takes, and the honest answer is: it depends on the gap, not on the grade."),
  p("A single missing idea can be repaired in a few sessions, and the improvement is dramatic and fast, because one broken foundation was holding up everything. Several years of accumulated gaps take a term or more, and the early progress feels slow because you are rebuilding underneath rather than adding on top."),
  p("Anyone who promises a specific grade improvement in a specific number of weeks — before meeting your child — is guessing. There is no way to know before you find the gap."),

  h2("If you would like a second opinion"),
  linked(["We start every relationship with the diagnosis above, because teaching before you know what is broken is guesswork. Our ", { text: "one-on-one math tutoring in Burnaby", href: "/math-tutor-burnaby" }, " is PhD-led and aligned to the BC curriculum, in person at our Burnaby centre or online across Metro Vancouver."]),
  linked(["The ", { text: "free 30-minute consultation", href: "/contact" }, " is a conversation, not a lesson: bring a recent test, and we will tell you where it went wrong and what it would take to fix — including if the answer is that you do not need us."]),
];

createArticle({
  slug: "my-child-is-failing-math-what-should-i-do",
  title: "My Child Is Failing Math — What Should I Do?",
  excerpt:
    "A failing math grade is almost never about intelligence — it is a gap in a cumulative subject. A step-by-step plan for finding it, including when tutoring is not the answer.",
  metaTitle: "My Child Is Failing Math — What Should I Do? | Burnaby",
  metaDescription:
    "A failing math grade is usually a gap, not an ability problem. A step-by-step plan for finding where it broke — plus when tutoring is not the answer.",
  body,
})
  .then((ok) => { if (!ok && commit) process.exitCode = 1; })
  .catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
