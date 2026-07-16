/**
 * Deepen "How to Prepare for Physics 12 in British Columbia" (1,064 -> 1,500+).
 *
 * Inserts into the existing body at named anchors — the post is already good and
 * carries 23 equations. It had no diagram, and never covered collisions or
 * kinetic energy, which BC Physics 12 examines.
 *
 * Maths verified first (scripts/verify-physics12-additions.mjs), including that
 * the diagram's numbers match the post's existing worked example (r=50, v=15,
 * mu=0.46) rather than contradicting it.
 *
 *   Preview:  node --env-file=.env.local scripts/enrich-physics12-guide.mjs
 *   Apply:    node --env-file=.env.local scripts/enrich-physics12-guide.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "how-to-prepare-for-physics-12-british-columbia";

/* Geometry computed, not eyeballed. Verified: car sits on the arc, v ⟂ r, f ∥ -r. */
const r1 = (n) => Math.round(n * 10) / 10;
const CX = 210, CY = 265, R = 150;
const TH = (115 * Math.PI) / 180;
const P = [r1(CX + R * Math.cos(TH)), r1(CY - R * Math.sin(TH))];
const tan = [-Math.sin(TH), -Math.cos(TH)];
const inw = [-Math.cos(TH), Math.sin(TH)];
const tip = (d, len) => [r1(P[0] + d[0] * len), r1(P[1] + d[1] * len)];
const vT = tip(tan, 62), fT = tip(inw, 74), xT = tip([-inw[0], -inw[1]], 58);
const arcEnd = [r1(CX + R * Math.cos((20 * Math.PI) / 180)), r1(CY - R * Math.sin((20 * Math.PI) / 180))];

const curveSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 420 300" role="img" aria-label="Top-down view of a car rounding a flat curve. The velocity arrow points along the road, tangent to the curve. The friction arrow points inward, toward the centre of the curve, and it is the only horizontal force. A third arrow pointing outward is crossed out and labelled: there is no outward force." style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs>
      <marker id="pa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3A5A98"/>
      </marker>
      <marker id="pg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#CBD5E1"/>
      </marker>
    </defs>
    <path d="M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${arcEnd[0]} ${arcEnd[1]}" fill="none" stroke="#E2E8F0" stroke-width="26"/>
    <path d="M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${arcEnd[0]} ${arcEnd[1]}" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="8 8"/>
    <line x1="${CX}" y1="${CY}" x2="${P[0]}" y2="${P[1]}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 4"/>
    <circle cx="${CX}" cy="${CY}" r="4" fill="#64748B"/>
    <text x="${CX + 8}" y="${CY + 16}" font-size="11" fill="#64748B">centre of the curve</text>
    <text x="${r1((CX + P[0]) / 2) - 30}" y="${r1((CY + P[1]) / 2) + 4}" font-size="11" fill="#64748B">r = 50 m</text>
    <rect x="${P[0] - 11}" y="${P[1] - 7}" width="22" height="14" rx="3" fill="#1F2937" transform="rotate(${r1(-115 + 90)} ${P[0]} ${P[1]})"/>
    <line x1="${P[0]}" y1="${P[1]}" x2="${vT[0]}" y2="${vT[1]}" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#pa)"/>
    <text x="${vT[0] - 4}" y="${vT[1] + 16}" font-size="12" fill="#3A5A98" text-anchor="middle" font-weight="600">v = 15 m/s</text>
    <line x1="${P[0]}" y1="${P[1]}" x2="${fT[0]}" y2="${fT[1]}" stroke="#3A5A98" stroke-width="2.5" marker-end="url(#pa)"/>
    <text x="${fT[0] + 30}" y="${fT[1] + 4}" font-size="12" fill="#3A5A98" text-anchor="middle" font-weight="600">friction</text>
    <line x1="${P[0]}" y1="${P[1]}" x2="${xT[0]}" y2="${xT[1]}" stroke="#CBD5E1" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#pg)"/>
    <line x1="${r1(xT[0]) - 9}" y1="${r1(xT[1]) - 9}" x2="${r1(xT[0]) + 9}" y2="${r1(xT[1]) + 9}" stroke="#B45309" stroke-width="3"/>
    <line x1="${r1(xT[0]) + 9}" y1="${r1(xT[1]) - 9}" x2="${r1(xT[0]) - 9}" y2="${r1(xT[1]) + 9}" stroke="#B45309" stroke-width="3"/>
    <text x="${r1(xT[0]) + 6}" y="${r1(xT[1]) - 16}" font-size="11" fill="#B45309" font-weight="600">no outward force</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Looking down on the curve. Only <strong>one</strong> horizontal force acts on the car, and it points
    <em>inward</em>. Nothing pushes it outward — the crossed-out arrow is the force students draw and
    the marker deletes. The car does not need a force to keep going forward, only one to stop going straight.
  </figcaption>
</figure>`;

const curveBlocks = [
  h2("The picture that fixes circular motion"),
  p("Before the worked example, one diagram — because circular motion is where Physics 12 loses the most students, and it is almost always the same misconception."),
  { _type: "htmlBlock", _key: key(), html: curveSvg },
  p("Ask a class what forces act on a car going round a bend and most will draw an arrow pointing outward. It feels undeniable: you are thrown against the door, so something must be pushing you out."),
  p("Nothing is. There is no outward force, and drawing one is the fastest way to lose the question."),
  p("What you feel is the door pushing you inward. Your body was travelling in a straight line, as bodies do, and the car turned into you. The push you feel on your shoulder is the car making you turn — it points toward the centre, not away from it. The sensation of being flung outward is your straight-line motion continuing while the car deviates from it."),
  mp(["So the only horizontal force on that car is friction, and it points inward. That is worth stating plainly: ", im(String.raw`F_c = mv^2/r`), " is not a new force to add to the diagram. It is what the net inward force has to equal. Students who write centripetal force as a separate arrow alongside friction are counting the same force twice."]),
  mp(["It also explains why the car needs any grip at all. It is not moving forward that requires force — Newton's first law gives you that for nothing. It is ", im(String.raw`\textbf{not going straight}`), " that costs. On this curve the car needs ", im(String.raw`a = v^2/r = 4.5`), " m/s² of inward acceleration, and friction is the only thing available to supply it. Take the grip away — ice, gravel, standing water — and the car does not fly outward. It goes straight on, which from inside feels the same and is not."]),
];

const collisionBlocks = [
  h2("Collisions: when to stop using forces"),
  p("Kinematics and dynamics can solve almost anything in the course, and for collisions they are the wrong tool entirely. The forces during a crash are enormous, vary wildly, and last a few milliseconds. Nobody can write them down."),
  p("Conservation laws are the way out. They let you compare before and after while ignoring the middle completely — which is the whole point, because the middle is unknowable."),
  math(String.raw`m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2`),
  h3("Worked example"),
  p("A 1200 kg car doing 20 m/s runs into a stationary 800 kg car. They lock together. How fast does the wreckage move?"),
  math(String.raw`(1200)(20) + (800)(0) = (2000)v`),
  math(String.raw`v = \frac{24{,}000}{2000} = 12 \ \text{m/s}`),
  p("No forces, no time interval, no details of the crumpling. Two lines."),
  h3("The part that is examined"),
  p("Now check the kinetic energy, because this is the trap."),
  math(String.raw`E_k = \tfrac{1}{2}(1200)(20)^2 = 240{,}000 \ \text{J}`),
  math(String.raw`E_k' = \tfrac{1}{2}(2000)(12)^2 = 144{,}000 \ \text{J}`),
  p("96,000 joules — 40% of it — have vanished. Momentum was conserved exactly; kinetic energy was not, and it is not close."),
  p("That is not an error. Momentum is always conserved in a collision. Kinetic energy is only conserved in an elastic one, and a crash where the cars stick together is as inelastic as it gets. The missing 96,000 J went into deforming metal, heat, and noise — and that is precisely what a crumple zone is designed to do. A car that bounced off elastically would conserve kinetic energy and kill you."),
  mli(["Momentum: conserved in every collision. Always. It is a vector, so direction and sign matter."]),
  mli(["Kinetic energy: conserved only if the question says elastic. If they stick together, expect to lose a large fraction of it."]),
  p("The exam question here is nearly always conceptual: \"is kinetic energy conserved?\" A student who assumes both are conserved will get a plausible number and no marks."),
];

async function run() {
  const doc = await client.fetch(
    `*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id, body}`, { s: SLUG },
  );
  if (!doc || !Array.isArray(doc.body)) { console.error("  ✗ post not found or body is not Portable Text"); process.exit(1); }

  const textOf = (b) => (b.children || []).map((c) => c.text || "").join("");
  const before = doc.body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;

  if (doc.body.some((b) => /picture that fixes circular motion|Collisions: when to stop/i.test(textOf(b)))) {
    console.log("  ! already enriched — nothing to do (idempotent)");
    return;
  }

  const idxOf = (re) => doc.body.findIndex((b) => b.style === "h2" && re.test(textOf(b)));
  const iCurve = idxOf(/Worked example: a car on a flat curve/i);
  const iMarks = idxOf(/Where marks are actually lost/i);
  if (iCurve < 0 || iMarks < 0) {
    console.error(`  ✗ anchor headings not found (curve=${iCurve}, marks=${iMarks}) — refusing to guess placement`);
    process.exit(1);
  }

  const body = [...doc.body];
  body.splice(iMarks, 0, ...collisionBlocks);
  body.splice(iCurve, 0, ...curveBlocks);

  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  inserted  : diagram before block ${iCurve}, collisions before block ${iMarks}`);
  console.log(`  words     : ${before} -> ${words}  (+${words - before})`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ enriched (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
