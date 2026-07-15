/**
 * Flagship article: "How Parents Can Tell Whether a Student Has a Concept Gap
 * or a Practice Gap".
 *
 * DRAFT with reviewedByExpert = false.
 *
 * No worked maths in this one — it is written for parents, and its value is the
 * diagnostic, not the algebra. Claims are kept to what is defensible: how the
 * two failure modes present, and what each responds to.
 *
 *   Preview:  node --env-file=.env.local scripts/create-flagship-concept-vs-practice.mjs
 *   Apply:    node --env-file=.env.local scripts/create-flagship-concept-vs-practice.mjs --commit
 */
import { createArticle, commit, p, h2, h3, li, num, mp, linked, span } from "./flagship-lib.mjs";

const body = [
  p("\"He understands it when we go through it, but then he gets them wrong on the test.\" Almost every parent who contacts a tutor says some version of this, and it is the single most useful sentence to unpack — because it describes two completely different problems that need opposite treatments."),
  p("Get the diagnosis wrong and months disappear. A student with a concept gap given more practice questions simply practises the misunderstanding until it is permanent. A student with a practice gap given more explanation sits through lessons they already understand, gets bored, and still runs out of time in the exam."),
  p("The distinction is not subtle once you know what to look for, and you can test it at the kitchen table in about ten minutes."),

  h2("The two failure modes"),
  h3("A concept gap"),
  p("The student does not understand what the mathematics means. They may still get answers right — by mimicking a worked example closely enough — which is exactly what makes this hard to spot from a report card."),
  p("It looks like:"),
  li("They can do a question that matches an example, but stall completely when the wording changes"),
  li("They cannot say why a step is done, only that it comes next"),
  li("Wrong answers are wrong in strange ways — not close, but structurally off"),
  li("They ask \"what do I do here?\" rather than \"did I do this right?\""),
  li("Progress collapses whenever a topic builds on the shaky one"),
  h3("A practice gap"),
  p("The student understands the material. The knowledge is simply not fast or automatic enough to survive a timed test."),
  p("It looks like:"),
  li("They can explain the method correctly, out loud, without notes"),
  li("Mistakes are arithmetic slips, dropped signs, copying errors — \"silly mistakes\""),
  li("They run out of time, or rush the last questions"),
  li("Homework is fine; tests are not"),
  li("Shown the mistake, they immediately see it — no explanation needed"),

  h2("The ten-minute test"),
  p("Here is the diagnostic, and it works because it separates knowing from doing."),
  p("Take a question they got wrong. Do not ask them to solve it. Ask them to explain how they would solve it — out loud, without writing anything and without touching the numbers."),
  num("If they can talk you through the method confidently and only fall apart when executing it — that is a practice gap."),
  num("If the explanation is vague, circular, or reaches for the textbook — that is a concept gap, regardless of what their homework marks look like."),
  p("The reason this works: explaining requires understanding, while doing can be faked by pattern-matching. Most school assessment rewards doing, so a concept gap can stay hidden for a long time — often until the course builds on it and everything appears to collapse at once."),
  p("A second, blunter version: ask \"why does that step work?\" A practice-gap student answers, sometimes impatiently. A concept-gap student explains what the step is again, more slowly. Watch for that substitution — it is the tell."),

  h2("Why they need opposite treatments"),
  h3("A concept gap needs rebuilding, not repetition"),
  p("More questions will not help, and can actively harm. Every repetition of a misunderstood method makes it more automatic and harder to dislodge. The fix is to go back — often further back than feels reasonable — find the idea that never landed, and rebuild from there."),
  p("This feels like losing ground. Parents often resist it, because the student is behind and going backwards seems like the opposite of catching up. But a concept gap is load-bearing: everything stacked on it is unstable, and time spent stacking higher is time wasted."),
  h3("A practice gap needs volume and timing"),
  p("Explanation is not the constraint — the student already understands. What they need is enough repetition that the method becomes automatic, and enough timed practice that exam conditions stop being a separate skill."),
  p("Re-teaching a practice-gap student is a common and expensive mistake. They already know it. What they cannot yet do is retrieve it in ninety seconds with a clock running, and no amount of further explanation builds that."),

  h2("The trap: \"silly mistakes\""),
  p("This phrase hides both problems, which is why it is worth interrogating."),
  p("Sometimes a silly mistake really is one: a dropped minus sign, a misread digit. That is a practice gap, and repetition fixes it."),
  p("But often \"silly mistake\" is what a student calls an error they cannot explain. If they consistently make the same silly mistake in the same place, it is not carelessness — it is a misunderstanding wearing a friendlier name. The test is whether they can tell you why it was wrong. If they can only tell you that it was wrong, look closer."),

  h2("Both at once"),
  p("The honest complication: it is often both. A concept gap in one topic, and a practice gap everywhere else. The order matters — fix the concept first, then build the speed, because drilling an idea that is not yet understood cements the wrong version."),
  p("It also changes over a term. A student who started with a concept gap and has had it repaired will look, for a few weeks, exactly like a student with a practice gap — because that is now what they are. The diagnosis is not permanent, and it is worth re-running."),

  h2("What this means for choosing help"),
  p("It is worth knowing which problem you are buying help for, because they look identical from the outside and cost the same."),
  li("A homework club or worksheet service is practice. Useful for a practice gap; nearly useless for a concept gap"),
  li("A group class re-explains the curriculum. Useful if the explanation is the constraint; not if the student needs volume"),
  li("One-on-one tutoring can do either — but only if the tutor diagnoses first rather than starting from page one"),
  linked(["This is the reason our ", { text: "free 30-minute consultation", href: "/contact" }, " is a conversation rather than a lesson: the diagnosis genuinely determines what we would do, and getting it wrong wastes your money as well as your child's term."]),

  h2("What to do this week"),
  num("Take one wrong answer from a recent test — not a homework question."),
  num("Ask them to explain the method out loud, without writing or touching the numbers."),
  num("Listen for whether they explain WHY, or only re-describe WHAT."),
  num("If they can explain it: practice gap. Give them volume and a timer."),
  num("If they cannot: concept gap. Stop the practice, go back, and rebuild."),
  p("That is a real diagnosis, and it costs ten minutes. It is worth considerably more than another purchased workbook — because the workbook is only the right treatment for one of the two problems, and you now know which."),

  h2("If you would like a second opinion"),
  linked(["We do this diagnosis at the start of every relationship, because starting to teach before you know which problem you are solving is guesswork. Our ", { text: "one-on-one math tutoring in Burnaby", href: "/math-tutor-burnaby" }, " and science support work the same way, whether the answer turns out to be a concept gap, a practice gap, or the usual mix of both."]),
  linked(["Sessions run in person at our Burnaby centre or online across Metro Vancouver. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " — we will work through a recent test together and tell you honestly which of the two you are dealing with, even if the answer is that no tutoring is needed yet."]),
];

createArticle({
  slug: "concept-gap-or-practice-gap-parents-guide",
  title: "How Parents Can Tell Whether a Student Has a Concept Gap or a Practice Gap",
  excerpt:
    "\"He understands it, then gets it wrong on the test\" describes two opposite problems needing opposite fixes. A ten-minute diagnostic any parent can run at home.",
  metaTitle: "Concept Gap or Practice Gap? A Parent's 10-Minute Test",
  metaDescription:
    "Your child understands it but fails the test — is it a concept gap or a practice gap? They need opposite fixes. A ten-minute diagnostic parents can run at home.",
  body,
})
  .then((ok) => { if (!ok && commit) process.exitCode = 1; })
  .catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
