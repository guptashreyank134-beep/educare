/** Verify the university physics article. The thesis: the kinematics equations are
    a SPECIAL CASE, and university problems break the case. */
const eq = (a, b, t = 1e-9) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("THE SETUP: a(t) = 6t, starting from rest at the origin");
// v = integral 6t dt = 3t^2 ; x = integral 3t^2 dt = t^3
const v = (t) => 3 * t * t;
const x = (t) => t ** 3;
chk("v(t) = 3t²  (integral of 6t)", eq(v(2), 12), `v(2) = ${v(2)}`);
chk("x(t) = t³   (integral of 3t²)", eq(x(2), 8), `x(2) = ${x(2)}`);
chk("  differentiating back: dx/dt at t=2 = 3(2²) = 12 = v(2) ✓", eq(3 * 4, v(2)));
chk("  and dv/dt at t=2 = 6(2) = 12 = a(2) ✓", eq(6 * 2, 12));

console.log("\nNOW BREAK THE HIGH-SCHOOL EQUATIONS ON IT (true answer: x(2) = 8)");
const kinAtFinalA = 0.5 * (6 * 2) * 2 ** 2;      // using a = a(2) = 12
chk("using a = a(2) = 12 in x = ½at²  ->  24", eq(kinAtFinalA, 24), `${kinAtFinalA} vs true 8`);
chk("  wrong by a factor of 3", eq(kinAtFinalA / 8, 3));
const kinAtAvgA = 0.5 * 6 * 2 ** 2;               // using the average of a over [0,2] = 6
chk("using average a = 6 in x = ½at²   ->  12", eq(kinAtAvgA, 12), `${kinAtAvgA} vs true 8`);
chk("  still wrong — the equations assume CONSTANT a, and no average rescues them", !eq(kinAtAvgA, 8));
chk("  the ONLY correct route is integration", eq(x(2), 8));

console.log("\nWHY: the kinematics equations ARE the integral, for constant a only");
// x = v0 t + 1/2 a t^2 is the integral of v = v0 + a t
const a0 = 4, v0 = 3;
const xConst = (t) => v0 * t + 0.5 * a0 * t * t;
chk("with a = 4 (constant), x(3) = 3(3) + ½(4)(9) = 27", eq(xConst(3), 27), String(xConst(3)));
chk("  numeric integral of v = 3 + 4t from 0 to 3 gives the same", (() => {
  let s = 0, n = 200000, dt = 3 / n;
  for (let i = 0; i < n; i++) s += (v0 + a0 * (i + 0.5) * dt) * dt;
  return eq(s, 27, 1e-6);
})(), "27");
chk("  so they are not a separate law — they are one integration, done in advance", true);

console.log("\nTHE SVG: area under the v-t curve IS displacement.  v = 3t² from 0 to 2");
let area = 0; const n = 400000, dt = 2 / n;
for (let i = 0; i < n; i++) area += v((i + 0.5) * dt) * dt;
chk("numeric area under v = 3t² from 0 to 2  ->  8", eq(area, 8, 1e-6), area.toFixed(8));
chk("  which equals x(2) = 8 exactly", eq(x(2), 8));
chk("  a triangle would give ½(2)(12) = 12 — the curve is not a line", !eq(0.5 * 2 * 12, 8), "12 != 8");
console.log("  plotted points on v = 3t²:");
for (const t of [0, 0.5, 1, 1.5, 2]) chk(`   (${t}, ${v(t)})`, eq(v(t), 3 * t * t), String(v(t)));

console.log("\nENERGY: a spring, where force is NOT constant.  F = -kx, k = 200 N/m, x = 0.1 m");
const k = 200, xs = 0.1;
chk("F at full compression = kx = 20 N", eq(k * xs, 20));
chk("F at zero compression = 0 N — the force VARIES", eq(k * 0, 0));
chk("so W = Fd is illegal here: 20 x 0.1 = 2 J would be WRONG", eq(20 * 0.1, 2), "2 J is the wrong answer");
const U = 0.5 * k * xs ** 2;
chk("correct: W = ½kx² = ½(200)(0.01) = 1 J", eq(U, 1), String(U));
chk("  exactly half the naive answer, because force ramps linearly from 0 to 20", eq(U, 2 / 2));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- terminal velocity ---- */
console.log("\nF = ma AS A DIFFERENTIAL EQUATION: falling with drag, m dv/dt = mg - bv");
let b6 = 0;
const c6 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) b6++; };
const e6 = (a, b, t = 1e-6) => Math.abs(a - b) < t;
const m = 80, g = 9.8, bb = 13;
c6("at t=0, v=0, so drag = 0 and a = g = 9.8 m/s²", e6((m * g - bb * 0) / m, 9.8));
const vt = (m * g) / bb;
c6("terminal velocity when a = 0: v_t = mg/b = 60.3 m/s", e6(vt, 60.3077, 1e-3), vt.toFixed(4));
c6("  check: at v = v_t, drag = b·v_t = mg = 784 N, so net force = 0", e6(bb * vt, m * g), `${(bb * vt).toFixed(1)} N`);
c6("  = 217 km/h", e6(vt * 3.6, 217.108, 1e-2), (vt * 3.6).toFixed(1));
c6("  acceleration is NOT constant: 9.8 at the start, 0 at the end", !e6(9.8, 0));
c6("  so no kinematics equation can touch this problem", true);
// exact solution v(t) = v_t (1 - e^{-bt/m})
const vExact = (t) => vt * (1 - Math.exp((-bb * t) / m));
c6("exact solution v(t) = v_t(1 − e^(−bt/m)); v(0) = 0", e6(vExact(0), 0));
c6("  v(5) = 33.5 m/s", e6(vExact(5), 33.5463, 1e-3), vExact(5).toFixed(4));
c6("  v(100) -> 60.3, approaching but never reaching v_t", vExact(100) < vt && vExact(100) > 60.29, vExact(100).toFixed(4));
console.log(b6 === 0 ? "  ALL VERIFIED" : `  *** ${b6} WRONG ***`);
if (b6) process.exit(1);
