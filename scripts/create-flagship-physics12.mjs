/**
 * Flagship article: "How to Prepare for Physics 12 in British Columbia".
 *
 * Created as a DRAFT with reviewedByExpert = false — Dr. Shreyank reviews
 * before his name appears on it. Every calculation was verified numerically
 * (scripts/verify-flagship-math.mjs) and every equation is KaTeX-checked here.
 *
 *   Preview:  node --env-file=.env.local scripts/create-flagship-physics12.mjs
 *   Apply:    node --env-file=.env.local scripts/create-flagship-physics12.mjs --commit
 */
import { createArticle, commit, p, h2, h3, strong, li, num, math, im, mp, mli, linked, span } from "./flagship-lib.mjs";

const body = [
  p("Physics 12 has a reputation for being the course where hard-working students suddenly stop getting the marks they are used to. That reputation is earned, but the reason is usually misunderstood: it is almost never the mathematics."),
  p("The algebra in Physics 12 is easier than the algebra in Pre-Calculus 12. What changes is that nobody tells you which equation to use. A question describes a situation — a car on a curve, a ball thrown at an angle, a charge in a field — and the entire difficulty is deciding what is going on before you write anything down."),
  linked(["This guide covers what the course actually demands, the one method that reliably works, and what to review before you start. If you would rather work through it with someone, our ", { text: "Physics 12 tutoring", href: "/physics-12-tutor-burnaby" }, " is built around exactly this problem."]),

  h2("What Physics 12 covers in BC"),
  p("The course builds on Physics 11 and assumes it. The units are broadly:"),
  li("Vector kinematics — motion in two dimensions, including projectiles"),
  li("Dynamics — forces, Newton's laws, friction, inclines"),
  li("Circular motion and gravitation"),
  li("Momentum and energy conservation"),
  li("Electrostatics, electric fields and circuits"),
  li("Magnetism and electromagnetic induction"),
  p("Notice what is missing from that list: no new mathematics. Everything is Pre-Calculus 11 algebra and basic trigonometry. The difficulty lives entirely in the modelling."),

  h2("The method that actually works"),
  p("There is one procedure worth internalising, and it applies to nearly every problem in the course:"),
  num("Draw the situation. Not a sketch of the object — a diagram of the forces or vectors acting on it."),
  num("Choose and label your axes and sign conventions, and commit to them."),
  num("Name the physical principle. Newton's second law? Conservation of energy? Not \"which formula\" — which principle."),
  num("Only now write an equation, and solve it."),
  p("Students who skip to step 4 are the ones who lose marks, and they lose them consistently. The algebra then executes flawlessly on a wrong model, producing a confident wrong answer that is very hard to spot afterwards."),

  h2("Worked example: a car on a flat curve"),
  mp(["A car rounds a flat (unbanked) curve of radius ", im(String.raw`r = 50\ \mathrm{m}`), " at ", im(String.raw`v = 15\ \mathrm{m/s}`), ". What is the minimum coefficient of static friction needed to keep it on the road?"]),
  h3("Step 1–3: model it"),
  p("Draw the car from behind. Vertically: gravity down, normal force up — these balance, so there is no vertical acceleration. Horizontally: the only force pointing toward the centre of the curve is friction. That is the whole insight."),
  p("The principle is Newton's second law applied to circular motion: the net centre-pointing force provides the centripetal force."),
  h3("Step 4: now the algebra"),
  math(String.raw`F_c = \frac{mv^2}{r} \qquad f_{s,\max} = \mu N = \mu m g`),
  p("Setting friction equal to the required centripetal force:"),
  math(String.raw`\mu m g = \frac{mv^2}{r} \;\Longrightarrow\; \mu = \frac{v^2}{rg}`),
  math(String.raw`\mu = \frac{(15\ \mathrm{m/s})^2}{(50\ \mathrm{m})(9.8\ \mathrm{m/s^2})} = \frac{225}{490} = 0.46`),
  h3("The part worth noticing"),
  mp(["The mass cancelled. A loaded truck and a small hatchback need the ", span("same", ["strong"]), " coefficient of friction to take that curve at that speed."]),
  mp(["That result is genuinely surprising, and it is the kind of thing the exam likes to ask about conceptually. If you had been given ", im(String.raw`m = 1200\ \mathrm{kg}`), " you would have computed ", im(String.raw`F_c = 5400\ \mathrm{N}`), " and still divided it away. A student who models the problem sees the cancellation coming; a student hunting for a formula never notices."]),

  h2("Worked example: projectile range"),
  mp(["A ball is launched at ", im(String.raw`v_0 = 20\ \mathrm{m/s}`), " at ", im(String.raw`30^\circ`), " above the horizontal, over level ground. How far does it land?"]),
  p("The modelling step is the same insight every time: horizontal and vertical motion are independent. Horizontally there is no acceleration; vertically there is gravity. They share only the time."),
  math(String.raw`v_x = v_0\cos\theta \qquad v_y = v_0\sin\theta`),
  p("Time in the air is set by the vertical motion; range is set by the horizontal. Combining them gives the standard result:"),
  math(String.raw`R = \frac{v_0^2 \sin(2\theta)}{g} = \frac{(20)^2 \sin 60^\circ}{9.8} = 35.4\ \mathrm{m}`),
  p("Worth checking against the long route: the ball is in the air about 2.04 s, travelling horizontally at 17.3 m/s, which gives 35.4 m. Same answer — a good habit, because a formula you cannot derive is a formula you will misapply."),

  h2("Where marks are actually lost"),
  li("Treating vectors as numbers — adding magnitudes instead of components"),
  mli(["Assuming ", im(String.raw`N = mg`), " on an incline. It is not — on a slope, ", im(String.raw`N = mg\cos\theta`), ", and this single error propagates through the whole question."]),
  li("Changing sign convention halfway through, usually without noticing"),
  li("Using constant-acceleration kinematics when the acceleration is not constant"),
  li("Skipping the free-body diagram to save two minutes, then losing ten"),

  h2("Practice problems"),
  mp([span("1. A car takes a flat curve of radius ", ["strong"]), im(String.raw`80\ \mathrm{m}`), span(" at ", ["strong"]), im(String.raw`20\ \mathrm{m/s}`), span(". What minimum coefficient of static friction is required?", ["strong"])]),
  mp([span("2. A projectile is launched at ", ["strong"]), im(String.raw`25\ \mathrm{m/s}`), span(" at ", ["strong"]), im(String.raw`40^\circ`), span(" over level ground. Find its range.", ["strong"])]),
  mp([span("3. A block slides down a frictionless incline at ", ["strong"]), im(String.raw`30^\circ`), span(". Find its acceleration.", ["strong"])]),

  h2("Solutions"),
  h3("1. Flat curve"),
  math(String.raw`\mu = \frac{v^2}{rg} = \frac{(20)^2}{(80)(9.8)} = \frac{400}{784} = 0.51`),
  p("Again the mass never appears. If you found yourself needing it, the model was wrong rather than the arithmetic."),
  h3("2. Projectile range"),
  math(String.raw`R = \frac{v_0^2\sin(2\theta)}{g} = \frac{(25)^2 \sin 80^\circ}{9.8} = 62.8\ \mathrm{m}`),
  h3("3. Frictionless incline"),
  p("Resolve gravity along the slope. The component down the incline is the only unbalanced force:"),
  math(String.raw`ma = mg\sin\theta \;\Longrightarrow\; a = g\sin\theta = 9.8\sin 30^\circ = 4.9\ \mathrm{m/s^2}`),
  mp(["The mass cancels once more — and note that ", im(String.raw`N = mg\cos\theta`), ", not ", im(String.raw`mg`), ". That is the error from the list above, met in the wild."]),

  h2("What to review before the course starts"),
  p("Physics 12 does not revisit these, so a fortnight spent here is worth more than a fortnight spent reading ahead:"),
  li("Resolving vectors into components, and recombining them"),
  li("Right-angle trigonometry until it is automatic — sin, cos and tan of a triangle you drew yourself"),
  li("Rearranging equations before substituting numbers, not after"),
  li("Unit conversion and significant figures, which quietly cost marks all year"),

  h2("Why Physics 12 matters beyond the grade"),
  linked(["Physics 12 is a prerequisite for engineering and most physical-science programs at UBC and SFU, and it is assumed knowledge in first-year physics — those courses do not reteach it. The modelling habit you build here is the thing first year tests, only faster and with calculus attached. The same is true of ", { text: "university-level physics", href: "/university-physics-tutor-vancouver" }, ", which starts where this course stops."]),
  p("The encouraging part: none of the failure modes above are about ability. They are about a step being skipped under time pressure. Skipped steps are fixable."),

  h2("Getting help with Physics 12"),
  linked(["If the pattern here is familiar — understanding the lesson but losing marks on tests — that is almost always a modelling problem rather than a physics problem, and it is one of the fastest things to fix with ", { text: "one-on-one Physics 12 help", href: "/physics-12-tutor-burnaby" }, ", because a tutor watches the step where the model goes wrong."]),
  linked(["Sessions run in person at our Burnaby centre or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and we will look at where the marks are going."]),
];

createArticle({
  slug: "how-to-prepare-for-physics-12-british-columbia",
  title: "How to Prepare for Physics 12 in British Columbia",
  excerpt:
    "Physics 12 is rarely lost on the mathematics — it is lost on deciding what the question is about. The method that works, with worked examples, practice problems and solutions.",
  metaTitle: "How to Prepare for Physics 12 in BC | Study Guide",
  metaDescription:
    "Physics 12 in BC: the modelling method that actually works, worked examples on circular motion and projectiles, plus practice problems with full solutions.",
  body,
})
  .then((ok) => { if (!ok && commit) process.exitCode = 1; })
  .catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
