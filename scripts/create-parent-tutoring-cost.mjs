/**
 * Parent-facing article: "How Much Does Math Tutoring Cost in Burnaby?"
 *
 * Price searches are the highest-intent searches parents make, and most
 * tutoring sites answer them with "contact us for pricing". Answering honestly
 * — with our real numbers — is the differentiator.
 *
 * PRICING SOURCE OF TRUTH: app/pricing/content.ts
 *   one-on-one  $75–$100/hr (varies by subject and level)
 *   monthly     $185–$200/month
 *   exam boost  $280 per intensive course
 * Confirmed by the client. If pricing changes, this article must change too.
 *
 * DRAFT, reviewedByExpert = false.
 *
 *   Preview:  node --env-file=.env.local scripts/create-parent-tutoring-cost.mjs
 *   Apply:    node --env-file=.env.local scripts/create-parent-tutoring-cost.mjs --commit
 */
import { createArticle, commit, p, h2, h3, li, num, mp, linked, span } from "./flagship-lib.mjs";

const body = [
  p("Most tutoring websites will not tell you what they charge. You fill in a form, someone calls you, and the number arrives after a sales conversation designed to make it feel reasonable."),
  p("We would rather just tell you, so here are our actual rates and — more usefully — what drives the price, what you should expect to pay anywhere in Burnaby, and how to work out whether it is worth it."),

  h2("What we charge"),
  li("One-on-one tutoring: $75–$100 per hour, depending on the subject and level"),
  li("Monthly programme: $185–$200 per month"),
  li("Exam Booster: $280 for an intensive course"),
  linked(["Full details are on our ", { text: "pricing page", href: "/pricing" }, ". No registration fee, no assessment fee, no minimum contract."]),

  h2("Why one-on-one is a range, not one number"),
  p("The $75–$100 spread is about the level, not about how much we think you will pay."),
  p("Grade 8 math and first-year university calculus are not the same job. The higher end reflects senior and university-level work — Calculus 12, university physics, IB Higher Level — where the tutor needs genuine subject depth rather than a good grasp of the textbook. Lower grades sit at the lower end."),
  p("A useful thing to ask any tutoring service: does the price change with level? If it does not, ask who is teaching the senior courses — because the person who can teach Grade 8 fractions and the person who can teach university calculus are usually not the same person, and one of them costs more."),

  h2("What tutoring costs in Burnaby generally"),
  p("For context, and without naming competitors, the market broadly looks like this:"),
  li("University or high-school students tutoring privately: roughly $25–$40/hr. Cheapest, and quality varies enormously — they may be excellent, or may be one chapter ahead of your child."),
  li("Franchise learning centres: often $200–$400/month for a few sessions weekly, usually in small groups, frequently worksheet-driven."),
  li("Qualified private tutors: roughly $60–$120/hr depending on qualifications and level."),
  p("We sit in that third band. We are not the cheapest option in Burnaby and do not try to be — the sessions are one-to-one and PhD-led, which is a different product from supervised worksheets."),

  h2("The question that actually matters"),
  p("\"How much per hour\" is the wrong question, and it is the one everyone asks. The right one is: how many hours will this take?"),
  p("A tutor at $40/hr who does not find the underlying gap can run for a whole term without changing much. That is roughly $600 for supervised homework. A tutor at $85/hr who identifies the real problem in session one and fixes it in six sessions costs about $500 and ends."),
  p("Cheaper per hour is not cheaper. It is only cheaper per hour."),
  p("So when you compare, ask what happens in the first session. If the answer is \"we start the curriculum\", you are buying hours. If the answer is \"we find out what is actually broken\", you are buying a diagnosis — and a diagnosis has an end date."),

  h2("What should be included"),
  p("Before you pay anyone in Burnaby, check what is and is not extra:"),
  li("Is there a registration or assessment fee? (Ours: no.)"),
  li("Is the first consultation free, and is it a lesson or a sales call?"),
  li("Are you locked into a term or a package, or can you stop?"),
  li("Is it genuinely one-to-one, or one tutor across three students at a table?"),
  li("Who actually teaches — the qualified person you met, or an assistant?"),
  p("That last one catches people out. Ask directly, and ask again at the first session."),

  h2("When it is not worth the money"),
  p("Plainly, because we would rather not take money that will not help:"),
  li("If your child understands the material but is not doing the work, tutoring will not fix that. That is a motivation problem, and you would be paying for another adult to be ignored."),
  li("If one topic is the issue and their teacher offers extra help, start there. It is free and the teacher knows the class and the test."),
  li("If they are coping fine and you want an edge \"just in case\", the honest answer is that the money is usually better spent when there is a real need."),
  p("Tutoring earns its cost when there is a genuine gap that needs finding and rebuilding, and nobody has the time or subject depth to do that one-to-one. That is common. It is not universal."),

  h2("How to make it cost less"),
  p("Since we have started being honest about money:"),
  num("Start earlier. A gap found in October takes a fraction of the sessions it takes in April, because less has been built on top of it."),
  num("Do the work between sessions. Tutoring is the diagnosis and the teaching; the consolidation is homework. Students who practise between sessions need fewer of them."),
  num("Be specific about the goal. \"Help with math\" is open-ended. \"Fix trigonometry before the December test\" ends."),
  num("Stop when it is done. A good tutor tells you when you no longer need them. If nobody has ever suggested finishing, ask why."),

  h2("What you get for the rate"),
  p("So the number means something, here is what it buys:"),
  li("A PhD-qualified tutor, not a student one chapter ahead"),
  li("Genuinely one-to-one sessions — the whole hour, on your child"),
  li("A diagnosis in the first session: where the gap is and what fixing it involves"),
  li("Work aligned to the BC curriculum, IB and AP"),
  li("In person at our Burnaby centre, or online across Metro Vancouver"),

  h2("Find out what it would take"),
  linked(["The ", { text: "free 30-minute consultation", href: "/contact" }, " is a conversation, not a lesson and not a sales call. Bring a recent test. We will tell you where the marks are going, roughly how many sessions it would take, and what that would cost — before you commit to anything."]),
  linked(["If it turns out you do not need us, we will say so. See our ", { text: "pricing page", href: "/pricing" }, " for the full breakdown, or our ", { text: "math tutoring in Burnaby", href: "/math-tutor-burnaby" }, " for what the sessions actually involve."]),
];

createArticle({
  slug: "how-much-does-math-tutoring-cost-burnaby",
  title: "How Much Does Math Tutoring Cost in Burnaby?",
  excerpt:
    "Our actual rates, what the Burnaby market charges, and why \"how much per hour\" is the wrong question — including when tutoring is not worth the money.",
  metaTitle: "How Much Does Math Tutoring Cost in Burnaby? | Real Rates",
  metaDescription:
    "Real tutoring rates in Burnaby: one-on-one $75–$100/hr, monthly from $185. What the market charges, what should be included, and when it is not worth the money.",
  body,
})
  .then((ok) => { if (!ok && commit) process.exitCode = 1; })
  .catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
