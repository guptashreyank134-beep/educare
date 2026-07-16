/**
 * "UBC Physics (PHYS 100/101/107/108)" (750 -> 1,500+).
 *
 * Full rebuild — the old version was the 6-section template with no equations.
 *
 * The course codes are already in the slug and title, so they stay. No NEW
 * institutional claims: no syllabus, no schedule, no instructor names, no claim
 * about what any specific course covers in a given term.
 *
 * Maths verified first (scripts/verify-uni-physics.mjs).
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-uni-physics.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-uni-physics.mjs --commit
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "university-physics-ubc-physics-phys-100-101-107-108";

/* v = 3t² on [0,2]. Verified: area = 8 = x(2); a straight line would give 12. */
const VX = (t) => Math.round((60 + t * 130) * 10) / 10;
const VY = (v) => Math.round((240 - v * 16) * 10) / 10;
let curve = "", fill = `M ${VX(0)} ${VY(0)}`;
for (let t = 0; t <= 2.001; t += 0.05) {
  curve += `${curve ? " L" : "M"} ${VX(t)} ${VY(3 * t * t)}`;
  fill += ` L ${VX(t)} ${VY(3 * t * t)}`;
}
fill += ` L ${VX(2)} ${VY(0)} Z`;

const areaSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 380 300" role="img" aria-label="A velocity-time graph of v equals three t squared from t equals zero to two seconds. The area under the curve is shaded and equals eight metres, which is the displacement. The dashed straight line from the origin to the final point shows what a constant-acceleration assumption would look like; the area under that line would be twelve metres, which is wrong." style="width:100%;max-width:380px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <path d="${fill}" fill="#3A5A98" fill-opacity="0.18"/>
    <line x1="${VX(0)}" y1="${VY(0)}" x2="${VX(2.3)}" y2="${VY(0)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${VX(0)}" y1="${VY(0)}" x2="${VX(0)}" y2="${VY(14)}" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${VX(0)}" y1="${VY(0)}" x2="${VX(2)}" y2="${VY(12)}" stroke="#B45309" stroke-width="2" stroke-dasharray="6 5"/>
    <path d="${curve}" fill="none" stroke="#3A5A98" stroke-width="2.5"/>
    <circle cx="${VX(2)}" cy="${VY(12)}" r="4" fill="#3A5A98"/>
    <text x="${VX(1.15)}" y="${VY(2.2)}" font-size="13" fill="#1F2937" text-anchor="middle" font-weight="700">area = 8 m</text>
    <text x="${VX(1.15)}" y="${VY(0.85)}" font-size="11" fill="#475569" text-anchor="middle">= the displacement</text>
    <text x="${VX(1.62)}" y="${VY(10.6)}" font-size="11.5" fill="#3A5A98" font-weight="600">v = 3t²</text>
    <text x="${VX(0.42)}" y="${VY(4.6)}" font-size="11" fill="#B45309" font-weight="600">constant-a</text>
    <text x="${VX(0.42)}" y="${VY(3.5)}" font-size="11" fill="#B45309">guess: 12 m ✗</text>
    <text x="${VX(2.05)}" y="${VY(0) + 17}" font-size="11" fill="#64748B">t (s)</text>
    <text x="${VX(0) - 34}" y="${VY(12) + 4}" font-size="11" fill="#64748B">12 m/s</text>
    <text x="190" y="288" font-size="12" fill="#64748B" text-anchor="middle">the area is an integral, and only sometimes a triangle</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Displacement is the area under the velocity curve — always. When v is a straight line, that area
    is a triangle and the old formulas work. When it curves, the triangle is a lie: it gives 12&nbsp;m
    where the truth is 8&nbsp;m. University physics is mostly the curved case.
  </figcaption>
</figure>`;

const body = [
  p("First-year university physics has a reputation for brutality, and students arriving from a good Physics 12 grade are often the most blindsided by it. They knew this material. That is precisely the problem."),
  p("It is the same physics with the training wheels off. In Grade 12 you were handed formulas and asked to use them. Here the formulas are derived, and the derivation is the exam — because the formulas you memorised are special cases, and this course spends its time outside the special case."),
  linked(["If a strong high-school student is suddenly underwater, that is not a talent problem and it is the most common story we see. Our ", { text: "university physics tutoring", href: "/university-physics-tutor-vancouver" }, " starts by fixing the assumption underneath, rather than drilling more problems."]),

  h2("Your kinematics equations were a special case"),
  p("This is the single most valuable thing to understand in the first month, so it is worth doing properly."),
  p("You memorised five equations. Nobody told you they come with a condition attached, printed in small type at the top of the chapter: constant acceleration. Not sometimes. Always. That condition is the only reason they exist."),
  mp(["Watch what happens when it fails. Suppose ", im(String.raw`a(t) = 6t`), " — acceleration that grows with time, which is what any realistic force gives you. Start from rest at the origin. How far have you gone at ", im(String.raw`t = 2`), "?"]),
  p("Reach for the old equation and pick an acceleration. Use the value at t = 2, which is 12:"),
  math(String.raw`\Delta x = \tfrac{1}{2}at^2 = \tfrac{1}{2}(12)(4) = 24 \ \text{m}`),
  p("Wrong. Try being cleverer and use the average acceleration over the interval, which is 6:"),
  math(String.raw`\Delta x = \tfrac{1}{2}(6)(4) = 12 \ \text{m}`),
  p("Still wrong. The true answer is 8 m, and no choice of a single acceleration value will produce it, because the equation is not slightly off — it is answering a different question. It describes motion that never happened."),
  h3("The actual method"),
  p("Acceleration is the derivative of velocity, and velocity is the derivative of position. So go the other way — integrate:"),
  math(String.raw`v(t) = \int 6t \, dt = 3t^2`),
  math(String.raw`x(t) = \int 3t^2 \, dt = t^3`),
  mp(["At ", im(String.raw`t = 2`), ": ", im(String.raw`x = 8`), " m. That is the answer, and it is the only route to it."]),
  p("Now look back at your five equations with this in mind. They are not laws. They are what you get when you integrate a constant acceleration once, and then again — the integration already done for you, and handed over with the condition quietly dropped. That is why they break: not because physics changed, but because you were only ever given the easy case."),

  h2("Which is why the graph matters"),
  p("Here is the same idea as a picture, and it is the one to keep."),
  { _type: "htmlBlock", _key: key(), html: areaSvg },
  p("Displacement is the area under the velocity-time graph. That is true always, for every motion, with no conditions on it whatsoever."),
  p("When velocity is a straight line — constant acceleration — the area is a triangle, and ½ × base × height is exactly the formula you memorised. The old equation was never a law; it was the area of a triangle. But when velocity curves, the triangle overshoots: 12 m where the truth is 8 m. Same picture, different shape, and only integration handles both."),
  linked(["This is also why calculus is a co-requisite rather than a nice extra, and why students who treat it as a separate subject struggle here. If the calculus itself is shaky, that is worth fixing first — we wrote about ", { text: "what to review before a first calculus midterm", href: "/blog/what-ubc-calculus-students-should-review-before-first-midterm" }, "."]),

  h2("Energy, and the other formula that has a condition"),
  p("The same trap, one chapter later. You learned:"),
  math(String.raw`W = Fd`),
  p("Also conditional. It requires the force to be constant, and most interesting forces are not."),
  mp(["Compress a spring with stiffness ", im(String.raw`k = 200`), " N/m by 10 cm. At full compression the force is ", im(String.raw`F = kx = 20`), " N. So the work is 20 × 0.1 = 2 J?"]),
  p("No. At the start the force was zero — the spring pushes back harder the more you squash it. The force ramped from 0 N to 20 N, and multiplying by the final value assumes it was 20 N the whole way. Integrate instead:"),
  math(String.raw`W = \int_0^{0.1} kx \, dx = \tfrac{1}{2}kx^2 = \tfrac{1}{2}(200)(0.01) = 1 \ \text{J}`),
  p("Exactly half the naive answer, because the force rose linearly and its average was 10 N rather than 20 N. Every \"½\" in the energy chapter — ½kx², ½mv² — is the fingerprint of an integral you did not do by hand."),
  p("So the pattern across the whole course: a formula from school, a hidden condition, and a university problem built specifically to violate it. Once you are looking for it, the course becomes far more predictable."),

  h2("F = ma is a differential equation"),
  p("This is the reframe that makes the rest of the course coherent, and it is rarely said out loud in a lecture."),
  mp(["You read ", im(String.raw`F = ma`), " as an equation to solve for one of three numbers. It is not. Acceleration is ", im(String.raw`dv/dt`), ", so what Newton actually wrote is:"]),
  math(String.raw`F = m\frac{dv}{dt}`),
  p("That is a differential equation — a statement about how velocity changes, not what it is. Whenever the force is constant, integrating it twice hands back your school formulas, which is why they worked. The moment the force depends on where you are, or how fast you are going, they stop, and the differential equation is all you have."),
  h3("Falling, with air"),
  p("Drop something and include air resistance, which grows with speed. Then the force on the way down is not constant — gravity pulls, drag pushes back harder the faster you go:"),
  math(String.raw`m\frac{dv}{dt} = mg - bv`),
  mp(["Watch what this predicts without solving anything. At the start ", im(String.raw`v = 0`), ", so there is no drag and the acceleration is a full ", im(String.raw`g = 9.8`), " m/s². As speed builds, drag grows, and the acceleration shrinks. Eventually drag exactly cancels gravity, the acceleration reaches zero, and the speed stops changing:"]),
  math(String.raw`v_{\text{terminal}} = \frac{mg}{b}`),
  mp(["For an 80 kg skydiver with ", im(String.raw`b = 13`), " kg/s, that is 60 m/s — about 217 km/h, and it is why a parachute is survivable rather than merely slower."]),
  p("Notice what just happened. The acceleration went from 9.8 to 0 during the fall, so there is no single value to put into a kinematics equation — not the initial one, not the final one, not the average. The entire toolkit from Grade 12 has nothing to say about the most ordinary event imaginable: something falling through air."),
  p("And you got the most useful number — terminal velocity — without solving the equation at all, just by asking what happens when the acceleration stops. That habit of interrogating an equation before solving it is most of what separates a physicist from a calculator, and it is what the harder exam questions are testing."),

  h2("Vectors get taken seriously"),
  p("In Grade 12 vectors mostly meant \"remember the minus sign\". Here they are the language."),
  mli(["Components are not optional. Nearly every problem starts by resolving along sensible axes, and choosing bad axes turns three lines of algebra into a page."]),
  mli(["The dot and cross products arrive with physical meaning rather than as arithmetic. Work is a dot product — it asks how much of the force points along the motion, which is why a force perpendicular to motion does no work at all. Circular motion is the cleanest example: the centre-pointing force does no work, so speed is constant while velocity changes constantly."]),
  mli(["Torque is a cross product, and the direction is not a convention to memorise but the axis the thing turns about."]),

  h2("Where the marks actually go"),
  mli(["Using a school formula outside its condition. This is the big one, and it produces a confident, tidy, wrong answer — the worst kind, because nothing feels off."]),
  mli(["Starting with algebra instead of a diagram. First-year problems are longer, so a wrong setup costs a whole page rather than a line."]),
  mli(["Substituting numbers too early. Do the algebra symbolically and the units check themselves, terms cancel, and you can see whether the answer is sensible. Substitute at line one and you are pushing decimals around blind."]),
  mli(["Not checking limits. Set a variable to zero or infinity and ask whether the answer still makes sense. It catches errors instantly and it is what a physicist actually does."]),

  h2("How to study it"),
  mli(["Derive the formulas once, by hand, rather than collecting them. The exam asks you to do it again in an unfamiliar case, and there is no way to fake that."]),
  mli(["For every equation you use, be able to say what breaks it. If you cannot name the condition, you do not own the equation."]),
  mli(["Do problems without numbers. Get to the symbolic answer, then substitute last."]),
  mli(["Treat the calculus as part of the physics. dx/dt is not notation to survive — it is what velocity means."]),

  h2("Getting help with first-year physics"),
  linked(["The students who struggle here are rarely struggling with physics. They are applying Grade 12 methods to problems designed to defeat them, working hard, and getting nowhere — which is demoralising in a specific way, because effort is not the missing ingredient. Our ", { text: "one-on-one university physics help", href: "/university-physics-tutor-vancouver" }, " works from your actual problem sets and past midterms."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, and online suits this material well — the working stays on screen and you can re-read the derivation afterwards. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent problem set."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 750)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${body.filter((b) => b._type === "htmlBlock").length} inline SVG`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ link(s) point at routes that do not exist: ${dead.join(", ")}`); process.exit(1); }
  console.log(`  links ok  : all ${links.length} resolve to real routes ✓`);
  if (/(midterm|exam) (is|will be) on|syllabus (says|states)|Professor [A-Z]|covers chapters/i.test(text)) {
    console.error("  ✗ unverifiable institutional claim — refusing."); process.exit(1);
  }
  console.log("  sourcing  : no syllabus/schedule/instructor claims ✓");
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ published post not found"); process.exit(1); }
  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ upgraded (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
