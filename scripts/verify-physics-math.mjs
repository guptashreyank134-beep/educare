/** Verify every calculation in the kinematics & dynamics article before writing. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const g = 9.8;
const rad = (d) => (d * Math.PI) / 180;
const { sin, cos, sqrt } = Math;

console.log("KINEMATICS: car decelerating 25 m/s -> 0 over 40 m");
const a1 = (0 - 25 ** 2) / (2 * 40);
chk("v² = v₀² + 2aΔx  ->  a = -7.8 m/s²", eq(a1, -7.8125), a1.toFixed(4));
const t1 = (0 - 25) / a1;
chk("v = v₀ + at  ->  t = 3.2 s", eq(t1, 3.2, 0.05), t1.toFixed(4));
chk("cross-check with Δx = v₀t + ½at² = 40 m", eq(25 * t1 + 0.5 * a1 * t1 ** 2, 40, 0.01), (25 * t1 + 0.5 * a1 * t1 ** 2).toFixed(4));
chk("cross-check with Δx = ½(v₀+v)t = 40 m", eq(0.5 * (25 + 0) * t1, 40, 0.01));

console.log("\nINCLINE (the SVG): m = 4.0 kg, θ = 30°, frictionless");
const m2 = 4.0, th = rad(30);
chk("mg = 39.2 N", eq(m2 * g, 39.2), (m2 * g).toFixed(2));
chk("N = mg·cosθ = 33.9 N   (NOT mg — that is the whole point)", eq(m2 * g * cos(th), 33.949, 0.01), (m2 * g * cos(th)).toFixed(3));
chk("  and N ≠ mg", !eq(m2 * g * cos(th), m2 * g, 0.5));
chk("mg·sinθ = 19.6 N", eq(m2 * g * sin(th), 19.6), (m2 * g * sin(th)).toFixed(3));
chk("a = g·sinθ = 4.9 m/s²  (mass cancels)", eq(g * sin(th), 4.9), (g * sin(th)).toFixed(3));
chk("  components recombine: √((mg·sinθ)² + (mg·cosθ)²) = mg", eq(sqrt((m2 * g * sin(th)) ** 2 + (m2 * g * cos(th)) ** 2), m2 * g));

console.log("\nINCLINE WITH FRICTION: same block, μk = 0.20");
const muk = 0.2;
const a3 = g * (sin(th) - muk * cos(th));
chk("a = g(sinθ − μk·cosθ) = 3.2 m/s²", eq(a3, 3.2, 0.02), a3.toFixed(4));
chk("  friction force f = μk·N = 6.79 N", eq(muk * m2 * g * cos(th), 6.79, 0.01), (muk * m2 * g * cos(th)).toFixed(3));
chk("  net force = mg·sinθ − f = 12.8 N", eq(m2 * g * sin(th) - muk * m2 * g * cos(th), 12.81, 0.01));
chk("  and F_net = ma is consistent", eq(m2 * a3, m2 * g * sin(th) - muk * m2 * g * cos(th)));
const muStatic = Math.tan(th);
chk("block would NOT slide if μs > tan30° = 0.577", eq(muStatic, 0.5774, 1e-3), muStatic.toFixed(4));

console.log("\nPRACTICE 1: projectile, v₀ = 20 m/s at 35°");
const v0 = 20, ang = rad(35);
const vx = v0 * cos(ang), vy = v0 * sin(ang);
chk("vx = 16.4 m/s", eq(vx, 16.383, 0.01), vx.toFixed(3));
chk("vy = 11.5 m/s", eq(vy, 11.472, 0.01), vy.toFixed(3));
const tf = (2 * vy) / g;
chk("time of flight t = 2vy/g = 2.34 s", eq(tf, 2.341, 0.01), tf.toFixed(4));
chk("range = vx·t = 38.4 m", eq(vx * tf, 38.35, 0.05), (vx * tf).toFixed(3));
const hmax = vy ** 2 / (2 * g);
chk("max height = vy²/2g = 6.7 m", eq(hmax, 6.715, 0.01), hmax.toFixed(4));
chk("  at the top vy = 0 but vx is UNCHANGED at 16.4 m/s", eq(vx, 16.383, 0.01));

console.log("\nPRACTICE 2: box m = 12 kg, push F = 60 N horizontal, μk = 0.30");
const m4 = 12, F = 60, muk4 = 0.3;
chk("N = mg = 117.6 N  (horizontal push, so here N DOES equal mg)", eq(m4 * g, 117.6));
const f4 = muk4 * m4 * g;
chk("friction f = μk·mg = 35.28 N", eq(f4, 35.28), f4.toFixed(3));
const a4 = (F - f4) / m4;
chk("a = (F − f)/m = 2.06 m/s²", eq(a4, 2.06, 0.01), a4.toFixed(4));

console.log("\nPRACTICE 3: elevator, m = 60 kg, a = 2.0 m/s² upward");
const N5 = 60 * (g + 2);
chk("N = m(g + a) = 708 N", eq(N5, 708), N5.toFixed(1));
chk("  which is MORE than mg = 588 N", N5 > 60 * g, `mg = ${(60 * g).toFixed(0)} N`);
chk("  accelerating DOWN at 2.0 gives N = m(g − a) = 468 N", eq(60 * (g - 2), 468));

console.log("\nSVG INCLINE GEOMETRY (θ = 30°)");
chk("sin30° = 0.5", eq(sin(th), 0.5));
chk("cos30° = 0.866", eq(cos(th), 0.86603, 1e-4));
chk("angle between mg and the normal direction is also θ = 30°", eq(rad(30), th));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
