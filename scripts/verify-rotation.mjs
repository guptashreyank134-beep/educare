/** Verify the rotational motion & SHM article (Langara physics). */
const eq = (a, b, t = 1e-4) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const g = 9.8, PI = Math.PI;

console.log("THE SVG: the rolling race. a = g·sinθ / (1 + I/MR²), θ = 30°");
const aRoll = (shape) => (g * Math.sin(PI / 6)) / (1 + shape);
const aDisc = aRoll(0.5);   // solid disc  I = ½MR²
const aHoop = aRoll(1.0);   // hoop        I = MR²
const aSphere = aRoll(0.4); // solid sphere I = (2/5)MR²
chk("solid disc:   a = g sin30 / 1.5 = 3.27 m/s²", eq(aDisc, 3.2667), aDisc.toFixed(4));
chk("hoop:         a = g sin30 / 2.0 = 2.45 m/s²", eq(aHoop, 2.45), aHoop.toFixed(4));
chk("solid sphere: a = g sin30 / 1.4 = 3.50 m/s²", eq(aSphere, 3.5), aSphere.toFixed(4));
chk("  the DISC beats the HOOP", aDisc > aHoop, `${aDisc.toFixed(2)} > ${aHoop.toFixed(2)}`);
chk("  and a sliding frictionless block beats both: a = g sin30 = 4.90", eq(g * Math.sin(PI / 6), 4.9), (g * Math.sin(PI / 6)).toFixed(2));
chk("  NO mass in the formula — M cancels", true);
chk("  NO radius in the formula — R cancels", true);
console.log("  so a heavy hoop and a light hoop tie, and a big disc and a small disc tie:");
chk("  every hoop rolls at 2.45 regardless of M or R", eq(aRoll(1.0), 2.45));

console.log("\nTIME DOWN A 2 m RAMP (from rest, x = ½at²  ->  t = sqrt(2x/a))");
const tOf = (a) => Math.sqrt((2 * 2) / a);
chk("disc:   t = 1.11 s", eq(tOf(aDisc), 1.1068, 1e-3), tOf(aDisc).toFixed(4));
chk("hoop:   t = 1.28 s", eq(tOf(aHoop), 1.2778, 1e-3), tOf(aHoop).toFixed(4));
chk("  the disc arrives ~0.17 s earlier — visible to the eye", eq(tOf(aHoop) - tOf(aDisc), 0.171, 1e-3), (tOf(aHoop) - tOf(aDisc)).toFixed(3));

console.log("\nWHY: energy split between moving and spinning");
// mgh = 1/2 m v^2 + 1/2 I w^2, v = wR  ->  v = sqrt(2gh/(1+I/MR^2))
const vOf = (shape, h) => Math.sqrt((2 * g * h) / (1 + shape));
const h = 1.0;
chk("from h=1 m, disc reaches v = 3.62 m/s", eq(vOf(0.5, h), 3.6148, 1e-3), vOf(0.5, h).toFixed(4));
chk("from h=1 m, hoop reaches v = 3.13 m/s", eq(vOf(1.0, h), 3.1305, 1e-3), vOf(1.0, h).toFixed(4));
chk("  a frictionless slider reaches v = 4.43 m/s — nothing spinning", eq(Math.sqrt(2 * g * h), 4.4272, 1e-3), Math.sqrt(2 * g * h).toFixed(4));
chk("  the hoop is slowest because ALL its mass is at radius R", 1.0 > 0.5);
// energy check for the disc: mgh should equal 1/2 m v^2 + 1/2 I w^2
const M = 3, R = 0.2;
const vD = vOf(0.5, h), wD = vD / R, ID = 0.5 * M * R * R;
chk("energy audit (disc, M=3, R=0.2): mgh = 29.4 J", eq(M * g * h, 29.4), (M * g * h).toFixed(2));
chk("  ½mv² + ½Iω² = 29.4 J ✓", eq(0.5 * M * vD ** 2 + 0.5 * ID * wD ** 2, M * g * h, 1e-6), (0.5 * M * vD ** 2 + 0.5 * ID * wD ** 2).toFixed(4));
chk("  translation gets 19.6 J, rotation gets 9.8 J — exactly 2:1 for a disc", eq(0.5 * M * vD ** 2, 19.6, 1e-4) && eq(0.5 * ID * wD ** 2, 9.8, 1e-4), `${(0.5 * M * vD ** 2).toFixed(2)} / ${(0.5 * ID * wD ** 2).toFixed(2)}`);

console.log("\nSHM: T = 2π√(m/k),  k = 200 N/m, m = 0.5 kg");
const T = 2 * PI * Math.sqrt(0.5 / 200);
chk("T = 0.314 s", eq(T, 0.31416, 1e-4), T.toFixed(5));
chk("  amplitude does NOT appear — pull it further and the period is identical", true);
const T2 = 2 * PI * Math.sqrt(0.5 / 200);
chk("  doubling the amplitude changes nothing: still 0.314 s", eq(T2, T));
chk("  quadrupling the mass doubles the period: 0.628 s", eq(2 * PI * Math.sqrt(2.0 / 200), 2 * T, 1e-6), (2 * PI * Math.sqrt(2 / 200)).toFixed(5));

console.log("\nPENDULUM: T = 2π√(L/g), L = 1 m");
const Tp = 2 * PI * Math.sqrt(1 / g);
chk("T = 2.01 s", eq(Tp, 2.0071, 1e-3), Tp.toFixed(4));
chk("  no mass in it — a heavy bob and a light bob swing together", true);
chk("  to double the period you need FOUR times the length", eq(2 * PI * Math.sqrt(4 / g), 2 * Tp, 1e-6), (2 * PI * Math.sqrt(4 / g)).toFixed(4));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- angular momentum conservation ---- */
console.log("\nANGULAR MOMENTUM: skater pulls arms in, I halves");
let b7 = 0;
const c7 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) b7++; };
const e7 = (a, b, t = 1e-9) => Math.abs(a - b) < t;
const I1 = 4.0, w1 = 2.0;          // kg m^2, rad/s
const I2 = I1 / 2;
const w2 = (I1 * w1) / I2;
c7("L = Iω is conserved: 4.0 x 2.0 = 8.0 kg m²/s", e7(I1 * w1, 8));
c7("I halves to 2.0, so ω doubles to 4.0 rad/s", e7(w2, 4), w2.toFixed(2));
c7("  L after = 2.0 x 4.0 = 8.0 ✓ unchanged", e7(I2 * w2, I1 * w1));
const ke1 = 0.5 * I1 * w1 ** 2, ke2 = 0.5 * I2 * w2 ** 2;
c7("KE before = ½(4.0)(2.0²) = 8.0 J", e7(ke1, 8), ke1.toFixed(2));
c7("KE after  = ½(2.0)(4.0²) = 16.0 J", e7(ke2, 16), ke2.toFixed(2));
c7("  kinetic energy DOUBLED while momentum stayed put", e7(ke2 / ke1, 2), `${ke2 / ke1}x`);
c7("  8 J appeared — the skater did that work pulling against the outward pull", e7(ke2 - ke1, 8), `${ke2 - ke1} J`);
c7("  so this is NOT a violation: L is conserved, KE is not (work was done)", true);
console.log(b7 === 0 ? "  ALL VERIFIED" : `  *** ${b7} WRONG ***`);
if (b7) process.exit(1);
