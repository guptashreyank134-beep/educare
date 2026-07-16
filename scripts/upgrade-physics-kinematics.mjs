/**
 * Article 3 of the batch: "Kinematics & Dynamics" (471 -> 1,500+).
 *
 * Maths verified numerically first (scripts/verify-physics-math.mjs) and every
 * equation KaTeX-checked here — the script refuses to write broken maths or a
 * placeholder link.
 *
 * The SVG is a free-body diagram of a block on an incline with mg resolved into
 * components, because that decomposition is where Physics 12 marks are actually
 * lost — not in the algebra that follows it.
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-physics-kinematics.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-physics-kinematics.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, li, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "physics-kinematics-dynamics";

/* ---- free-body diagram, geometry computed rather than eyeballed ---- */
const TH = (30 * Math.PI) / 180;
const r2 = (n) => Math.round(n * 10) / 10;
const A = [40, 265];                                   // bottom-left corner of the incline
const APEX = [340, r2(265 - 300 * Math.tan(TH))];      // top of the 30° slope
const upSlope = [Math.cos(TH), -Math.sin(TH)];         // unit vector up the surface
const nrm = [-Math.sin(TH), -Math.cos(TH)];            // outward normal (away from the surface)
const P = [r2(A[0] + 0.52 * 300), r2(A[1] - 0.52 * 300 * Math.tan(TH))];  // block's contact point
const C = [r2(P[0] + 19 * nrm[0]), r2(P[1] + 19 * nrm[1])];               // block's centre
const vec = (from, dir, len) => [r2(from[0] + dir[0] * len), r2(from[1] + dir[1] * len)];
const MG = 78;                                         // px representing mg = 39.2 N
const tipMg = vec(C, [0, 1], MG);
const tipN = vec(C, nrm, 72);
const tipF = vec(C, upSlope, 50);
const tipSin = vec(C, [-upSlope[0], -upSlope[1]], MG * Math.sin(TH));   // mg·sinθ, down-slope
const tipCos = vec(C, [-nrm[0], -nrm[1]], MG * Math.cos(TH));           // mg·cosθ, into the surface
const arcStart = [A[0] + 45, A[1]];
const arcEnd = [r2(A[0] + 45 * Math.cos(TH)), r2(A[1] - 45 * Math.sin(TH))];

const fbdSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 400 292" role="img" aria-label="Free-body diagram of a block resting on a thirty degree incline. The weight mg points straight down and is resolved into two dashed components: mg times sine theta acting down the slope, and mg times cosine theta pressing into the surface. The normal force N points away from the surface and equals mg times cosine theta, not mg. Friction f acts up the slope." style="width:100%;max-width:400px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3A5A98"/>
      </marker>
      <marker id="ahg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8"/>
      </marker>
    </defs>
    <polygon points="${A[0]},${A[1]} ${APEX[0]},${A[1]} ${APEX[0]},${APEX[1]}" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="${A[0]}" y1="${A[1]}" x2="${APEX[0]}" y2="${APEX[1]}" stroke="#64748B" stroke-width="2.5"/>
    <path d="M ${arcStart[0]} ${arcStart[1]} A 45 45 0 0 0 ${arcEnd[0]} ${arcEnd[1]}" fill="none" stroke="#64748B" stroke-width="1.5"/>
    <text x="${A[0] + 52}" y="${A[1] - 10}" font-size="13" fill="#1F2937">θ = 30°</text>
    <rect x="${P[0] - 26}" y="${P[1] - 38}" width="52" height="38" rx="3" fill="#3A5A98" fill-opacity="0.18" stroke="#3A5A98" stroke-width="2" transform="rotate(-30 ${P[0]} ${P[1]})"/>
    <!-- dashed components of mg, which recombine to mg exactly -->
    <line x1="${C[0]}" y1="${C[1]}" x2="${tipSin[0]}" y2="${tipSin[1]}" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ahg)"/>
    <line x1="${C[0]}" y1="${C[1]}" x2="${tipCos[0]}" y2="${tipCos[1]}" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ahg)"/>
    <line x1="${tipSin[0]}" y1="${tipSin[1]}" x2="${tipMg[0]}" y2="${tipMg[1]}" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="${tipCos[0]}" y1="${tipCos[1]}" x2="${tipMg[0]}" y2="${tipMg[1]}" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="3 3"/>
    <!-- the three real forces -->
    <line x1="${C[0]}" y1="${C[1]}" x2="${tipMg[0]}" y2="${tipMg[1]}" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#ah)"/>
    <line x1="${C[0]}" y1="${C[1]}" x2="${tipN[0]}" y2="${tipN[1]}" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#ah)"/>
    <line x1="${C[0]}" y1="${C[1]}" x2="${tipF[0]}" y2="${tipF[1]}" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#ah)"/>
    <circle cx="${C[0]}" cy="${C[1]}" r="3.5" fill="#1F2937"/>
    <text x="${tipMg[0] - 12}" y="${tipMg[1] + 16}" font-size="12" fill="#1F2937" font-weight="600">mg</text>
    <text x="${tipN[0] - 14}" y="${tipN[1] - 7}" font-size="12" fill="#1F2937" font-weight="600">N</text>
    <text x="${tipF[0] + 5}" y="${tipF[1] - 2}" font-size="12" fill="#1F2937" font-weight="600">f</text>
    <text x="${tipSin[0] - 76}" y="${tipSin[1] + 14}" font-size="11" fill="#475569">mg sin θ</text>
    <text x="${tipCos[0] + 6}" y="${tipCos[1] + 4}" font-size="11" fill="#475569">mg cos θ</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The whole of Physics 12 dynamics, in one picture. Only three real forces act on the block —
    <strong>mg</strong>, <strong>N</strong> and <strong>f</strong>. The two dashed arrows are not extra forces:
    they are <strong>mg</strong> rewritten along the slope and into it, and they add back to
    <strong>mg</strong> exactly. Note that <strong>N</strong> matches mg&nbsp;cos&nbsp;θ, not mg.
  </figcaption>
</figure>`;

const body = [
  p("Physics 12 is not a maths problem. That is the single most useful thing to know about it, and almost nobody says it out loud."),
  p("Students arrive able to rearrange equations perfectly well, and they still lose marks — because the question is a paragraph about a toboggan, and the marks are for turning that paragraph into a diagram. Once the diagram is right, the algebra is Grade 10 work. Once the diagram is wrong, no amount of algebra saves it."),
  linked(["So this guide spends its time where the marks are. If you would rather work through it with someone, our ", { text: "Physics 12 tutoring", href: "/physics-12-tutor-burnaby" }, " starts in exactly this place — with the picture, not the formula sheet."]),

  h2("Kinematics describes. Dynamics explains."),
  p("The course splits in two, and the split is worth naming because students blur it constantly."),
  mli(["Kinematics describes motion — where, how fast, how quickly that speed changes. It never asks why. A kinematics question can be answered without knowing whether the object is a car, a comet or a cat."]),
  mli(["Dynamics explains motion — it brings in forces and mass, and answers why the acceleration has the value it has."]),
  p("They meet at one quantity: acceleration. Dynamics works out what the acceleration is, using forces. Kinematics takes that acceleration and works out what happens over time. When a long problem seems to have two unrelated halves, that is what it is doing — find the acceleration with Newton, then feed it into kinematics."),

  h2("The five equations, and how to actually choose one"),
  p("There are five kinematics equations for constant acceleration. Between them they involve five quantities:"),
  mp([im(String.raw`v_0`), " (initial velocity), ", im(String.raw`v`), " (final velocity), ", im(String.raw`a`), " (acceleration), ", im(String.raw`\Delta x`), " (displacement) and ", im(String.raw`t`), " (time)."]),
  p("Each equation is missing exactly one of the five. That is not a coincidence — it is the whole selection method."),
  math(String.raw`v = v_0 + at \qquad \text{(no } \Delta x\text{)}`),
  math(String.raw`\Delta x = v_0 t + \tfrac{1}{2}at^2 \qquad \text{(no } v\text{)}`),
  math(String.raw`v^2 = v_0^2 + 2a\Delta x \qquad \text{(no } t\text{)}`),
  math(String.raw`\Delta x = \tfrac{1}{2}(v_0 + v)t \qquad \text{(no } a\text{)}`),
  math(String.raw`\Delta x = vt - \tfrac{1}{2}at^2 \qquad \text{(no } v_0\text{)}`),
  p("So the method is: list what you have, list what you want, and find the quantity you neither have nor want. Take the equation that is missing it. This turns equation choice from a guess into a lookup, and it is worth practising until it is automatic."),

  h3("Worked example"),
  p("A car braking from 25 m/s comes to rest in 40 m. Find the acceleration."),
  mp(["We have ", im(String.raw`v_0 = 25`), ", ", im(String.raw`v = 0`), ", ", im(String.raw`\Delta x = 40`), ". We want ", im(String.raw`a`), ". We neither have nor want ", im(String.raw`t`), " — so use the equation with no ", im(String.raw`t`), " in it."]),
  math(String.raw`v^2 = v_0^2 + 2a\Delta x`),
  math(String.raw`0 = (25)^2 + 2a(40)`),
  math(String.raw`a = \frac{-625}{80} = -7.8 \ \text{m/s}^2`),
  p("The minus sign is not decoration. It says the acceleration points opposite to the motion, which is what braking means. A student who writes 7.8 has not made a small error — they have described a car speeding up."),
  mp(["And if the question then wants the time, kinematics hands it over: ", im(String.raw`v = v_0 + at`), " gives ", im(String.raw`t = 25 / 7.8 = 3.2`), " s."]),

  h2("Signs are a decision, not a fact"),
  p("Half of all lost kinematics marks are sign errors, and they come from treating direction as something the universe decides. It isn't. You decide."),
  p("Pick a positive direction at the start, write it down at the top of your work, and then commit to it for the entire question. Everything pointing that way is positive, everything pointing the other way is negative, and that includes gravity."),
  mp(["If you call up positive, then ", im(String.raw`a = -9.8`), " m/s². Not sometimes. Always, for that question. The most common disaster is a student who calls up positive at the start, then silently flips to down-positive halfway through because the object started falling. The object does not care which way you called positive. The equations do."]),

  h2("The free-body diagram is the actual work"),
  p("Here is where dynamics is won or lost. A free-body diagram strips away the ramp, the rope, the toboggan and the snow, and leaves one object and the arrows pushing on it. Draw it correctly and the question is nearly finished."),
  { _type: "htmlBlock", _key: key(), html: fbdSvg },
  p("Three rules make free-body diagrams reliable:"),
  mli(["Only forces ON the object, never forces the object exerts on something else. This kills the phantom \"forward force\" students draw on a moving car."]),
  mli(["Only real forces. If you cannot name the thing touching the object — or say the word gravity — it is not a force. There is no such thing as a leftover \"force of motion\"."]),
  mli(["Choose axes along the motion. On an incline, tilt the axes to match the slope. Nothing forces you to use horizontal and vertical, and on a ramp those axes make the work three times harder."]),

  h3("The normal force is not mg"),
  p("This is the misconception that costs the most marks in the course, because it is right often enough to feel like a rule."),
  mp(["On a flat floor with nothing pressing down, yes: ", im(String.raw`N = mg`), ". But the normal force is not a formula — it is the surface pushing back just hard enough to stop the object sinking into it. Tilt the surface and it pushes back less, because part of the weight is now sliding the object along rather than into the ramp."]),
  mp(["Take the block in the diagram: ", im(String.raw`m = 4.0`), " kg on a 30° slope. Its weight is ", im(String.raw`mg = 39.2`), " N. But perpendicular to the slope:"]),
  math(String.raw`N = mg\cos\theta = (4.0)(9.8)\cos 30^\circ = 33.9 \ \text{N}`),
  p("Not 39.2 N. And this matters immediately, because friction is calculated from N — so an incorrect normal force poisons every line after it."),

  h3("Resolving the weight"),
  p("The dashed arrows in the diagram are the move that makes inclines work. The weight points straight down, which is along neither axis, so it gets rewritten as two pieces:"),
  mli(["Down the slope: ", im(String.raw`mg\sin\theta = 19.6`), " N — this is what accelerates the block."]),
  mli(["Into the slope: ", im(String.raw`mg\cos\theta = 33.9`), " N — this is what the normal force balances."]),
  p("Those two pieces are not extra forces. They are the same weight, written in a more convenient pair of directions, and they recombine to exactly 39.2 N. Adding mg AND its components to the same diagram is double-counting, and it is a common way to lose a mark for free."),
  mp(["Applying Newton's second law along the slope, with no friction:"]),
  math(String.raw`ma = mg\sin\theta \quad \Longrightarrow \quad a = g\sin\theta = 4.9 \ \text{m/s}^2`),
  p("Notice the mass cancels. A heavy block and a light block slide down a frictionless ramp identically — which is Galileo's result, hiding in one line of algebra."),

  h3("Now add friction"),
  mp(["With a coefficient of kinetic friction ", im(String.raw`\mu_k = 0.20`), ", friction opposes the sliding, so it acts up the slope:"]),
  math(String.raw`f = \mu_k N = \mu_k mg\cos\theta = (0.20)(33.9) = 6.79 \ \text{N}`),
  math(String.raw`ma = mg\sin\theta - \mu_k mg\cos\theta`),
  math(String.raw`a = g(\sin\theta - \mu_k\cos\theta) = 3.2 \ \text{m/s}^2`),
  mp(["Slower than 4.9 m/s², as it must be. And this form quietly answers a favourite exam question — when does the block not slide at all? When the friction available exceeds ", im(String.raw`mg\sin\theta`), ", which happens when ", im(String.raw`\mu_s > \tan\theta`), ". At 30°, that is ", im(String.raw`\mu_s > 0.577`), ". The angle alone decides it; the mass is irrelevant."]),

  h2("Newton's laws, minus the slogans"),
  p("Everyone can recite them. Fewer can say what they claim."),
  mli(["First law — objects keep doing what they are doing unless a net force acts. The real content is that motion needs no cause. Only a change in motion does. This is the opposite of everyday intuition, which is why it took humanity two thousand years."]),
  mli(["Second law — ", im(String.raw`F_{net} = ma`), ". The word that carries the weight is net. It is never one force; it is the sum of every arrow on the diagram. If your answer is wrong, the sum is where to look first."]),
  mli(["Third law — forces come in equal and opposite pairs. The catch: the two forces act on different objects, so they never cancel. If they did, nothing could ever accelerate. The horse still pulls the cart."]),

  h2("Projectiles are two stories at once"),
  p("Projectile motion looks like new material and is not. It is the kinematics you already have, run twice — because the horizontal and vertical motions are completely independent and share only a clock."),
  mp(["Horizontally there is no force (ignoring air), so ", im(String.raw`a_x = 0`), " and the horizontal velocity never changes. Vertically, ", im(String.raw`a_y = -9.8`), " m/s² the whole time — on the way up, at the top, on the way down."]),
  mp(["Throw a ball at 20 m/s at 35°. Split it once at the start:"]),
  math(String.raw`v_x = 20\cos 35^\circ = 16.4 \ \text{m/s} \qquad v_y = 20\sin 35^\circ = 11.5 \ \text{m/s}`),
  mp(["The time in the air comes from the vertical story alone: ", im(String.raw`t = 2v_y/g = 2.34`), " s. The range comes from the horizontal story alone: ", im(String.raw`\Delta x = v_x t = 38.4`), " m. Maximum height, again vertical only: ", im(String.raw`v_y^2/2g = 6.7`), " m."]),
  p("The idea worth carrying: at the very top of the arc the ball is not stopped. Its vertical velocity is zero, but it is still moving sideways at 16.4 m/s, and it is still accelerating downwards at 9.8 m/s². \"Velocity is zero\" and \"acceleration is zero\" are unrelated statements, and an exam will check that you know it."),

  h2("Three to try"),
  h3("1. Pushing a box"),
  mp(["A 12 kg box is pushed across level ground with a horizontal 60 N force. ", im(String.raw`\mu_k = 0.30`), ". Find the acceleration."]),
  mp(["Here the push is horizontal, so nothing changes the vertical balance: ", im(String.raw`N = mg = 117.6`), " N. Then ", im(String.raw`f = \mu_k N = 35.28`), " N, and:"]),
  math(String.raw`a = \frac{F - f}{m} = \frac{60 - 35.28}{12} = 2.06 \ \text{m/s}^2`),
  p("Worth noticing why N = mg was legal here but not on the ramp: the surface is flat and the push has no vertical component. Push downwards at an angle instead and N grows, friction grows with it, and the box gets harder to move — which is exactly why you pull a sled rather than push it."),

  h3("2. The elevator"),
  mp(["You stand on a bathroom scale in a lift, mass 60 kg, accelerating upward at 2.0 m/s². What does the scale read?"]),
  p("The scale reads the normal force, not your weight — that is what a scale physically measures."),
  math(String.raw`N - mg = ma \quad \Longrightarrow \quad N = m(g + a) = 60(11.8) = 708 \ \text{N}`),
  mp(["Against ", im(String.raw`mg = 588`), " N standing still. Your mass has not changed by a gram; the surface is simply pushing harder. Accelerate downward at 2.0 m/s² instead and it reads 468 N — the lurch in your stomach as a lift sets off, quantified."]),

  h3("3. Sign discipline"),
  p("A ball is thrown straight up at 15 m/s from a 2.0 m height. Taking up as positive, write down the values of v₀, a, and Δx when it lands — before solving anything."),
  mp([im(String.raw`v_0 = +15`), ", ", im(String.raw`a = -9.8`), " (still negative on the way up), and ", im(String.raw`\Delta x = -2.0`), " — because it finishes 2.0 m below where it started. Most students who get this question wrong get the sign of ", im(String.raw`\Delta x`), " wrong, not the physics."]),

  h2("Where marks actually go"),
  p("From marking a lot of these papers, the pattern barely changes:"),
  mli(["No free-body diagram, or one drawn after the algebra as decoration. The diagram is worth marks on its own and it prevents the errors below."]),
  mli(["Using mg where mg cos θ belongs, then propagating it through friction into every subsequent line."]),
  mli(["Sign flips mid-question."]),
  mli(["Skipping units, or mixing cm with m. Physics 12 gives marks for units and takes them away for missing ones."]),
  mli(["Never asking whether the answer is sensible. A toboggan at 340 m/s is a mistake, not an answer, and a two-second sanity check catches it."]),

  h2("The maths underneath"),
  linked(["When a student struggles in Physics 12, it is genuinely often not physics. It is trigonometry — resolving vectors is nothing but sine and cosine — or it is rearranging an equation with three symbols in it. That is why ", { text: "Pre-Calculus 12", href: "/pre-calculus-12-tutor-burnaby" }, " and Physics 12 tend to rise and fall together, and why we usually check the maths first when the physics looks broken."]),
  linked(["If you are planning the year rather than fixing a specific topic, we have a fuller walkthrough of ", { text: "how to prepare for Physics 12 in British Columbia", href: "/blog/how-to-prepare-for-physics-12-british-columbia" }, ", including how the provincial course is structured and what first-year university expects you to already own."]),

  h2("Getting help with Physics 12"),
  linked(["If the formulas make sense but the questions do not, the gap is almost always the translation step — paragraph to diagram — and that is a fast thing to fix with someone watching you do it, and a slow thing to fix alone. Our ", { text: "one-on-one Physics 12 help", href: "/physics-12-tutor-burnaby" }, " starts by watching you set a problem up, because that is where the information is."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a recent test."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 471)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ post not found"); process.exit(1); }
  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ upgraded (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
