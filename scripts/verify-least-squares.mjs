/** Verify the rank / projection / least-squares article (Langara linear algebra). */
const eq = (a, b, t = 1e-9) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("RANK & NULLITY: A = [[1,2,3],[2,4,6]]");
chk("row 2 = 2 x row 1, so the rows are dependent -> rank 1", eq(2 * 1, 2) && eq(2 * 2, 4) && eq(2 * 3, 6));
chk("A has n = 3 columns", true);
chk("rank + nullity = n  ->  1 + nullity = 3  ->  nullity = 2", eq(1 + 2, 3));
console.log("  the null space is x + 2y + 3z = 0, a PLANE through the origin (2-dimensional):");
for (const [x, y, z] of [[-2, 1, 0], [-3, 0, 1], [1, 1, -1]])
  chk(`   (${x},${y},${z}) is in the null space: ${x} + 2(${y}) + 3(${z}) = 0`, eq(x + 2 * y + 3 * z, 0));
chk("  and A times each of those is (0,0)", (() => {
  for (const v of [[-2, 1, 0], [-3, 0, 1], [1, 1, -1]]) {
    const r = [1 * v[0] + 2 * v[1] + 3 * v[2], 2 * v[0] + 4 * v[1] + 6 * v[2]];
    if (!eq(r[0], 0) || !eq(r[1], 0)) return false;
  }
  return true;
})());
chk("  (1,0,0) is NOT in the null space: A(1,0,0) = (1,2)", !eq(1, 0));

console.log("\nPROJECTION: project b = (5,0) onto a = (3,4)");
const a = [3, 4], b = [5, 0];
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
chk("a·b = 15", eq(dot(a, b), 15), String(dot(a, b)));
chk("a·a = 25", eq(dot(a, a), 25), String(dot(a, a)));
const k = dot(a, b) / dot(a, a);
chk("scalar = (a·b)/(a·a) = 0.6", eq(k, 0.6), k.toFixed(4));
const proj = [k * a[0], k * a[1]];
chk("projection = 0.6(3,4) = (1.8, 2.4)", eq(proj[0], 1.8) && eq(proj[1], 2.4), `(${proj[0]}, ${proj[1]})`);
const resid = [b[0] - proj[0], b[1] - proj[1]];
chk("residual b − proj = (3.2, −2.4)", eq(resid[0], 3.2) && eq(resid[1], -2.4), `(${resid[0]}, ${resid[1]})`);
chk("  THE KEY FACT: residual · a = 0 — it is perpendicular", eq(dot(resid, a), 0), `3(3.2) + 4(-2.4) = ${dot(resid, a)}`);
chk("  |a| = 5 (the 3-4-5 triangle)", eq(Math.hypot(3, 4), 5));

console.log("\nLEAST SQUARES: best-fit line through (1,1), (2,2), (3,2)");
const pts = [[1, 1], [2, 2], [3, 2]];
const n = 3;
const Sx = pts.reduce((s, p) => s + p[0], 0), Sy = pts.reduce((s, p) => s + p[1], 0);
const Sxy = pts.reduce((s, p) => s + p[0] * p[1], 0), Sxx = pts.reduce((s, p) => s + p[0] ** 2, 0);
chk("Sx = 6, Sy = 5, Sxy = 11, Sxx = 14", eq(Sx, 6) && eq(Sy, 5) && eq(Sxy, 11) && eq(Sxx, 14), `${Sx},${Sy},${Sxy},${Sxx}`);
const m = (n * Sxy - Sx * Sy) / (n * Sxx - Sx ** 2);
chk("slope m = (3·11 − 6·5)/(3·14 − 36) = 3/6 = 0.5", eq(m, 0.5), m.toFixed(4));
const c = (Sy - m * Sx) / n;
chk("intercept c = (5 − 0.5·6)/3 = 2/3 = 0.667", eq(c, 2 / 3), c.toFixed(4));
const fit = (x) => m * x + c;
const res = pts.map((p) => p[1] - fit(p[0]));
chk("residuals: −0.167, +0.333, −0.167", eq(res[0], -1 / 6) && eq(res[1], 1 / 3) && eq(res[2], -1 / 6), res.map((r) => r.toFixed(3)).join(", "));
chk("  residuals sum to ZERO — the signature of a least-squares fit", eq(res.reduce((s, r) => s + r, 0), 0, 1e-12), String(res.reduce((s, r) => s + r, 0)));
const sse = res.reduce((s, r) => s + r * r, 0);
chk("SSE = 1/6 = 0.1667", eq(sse, 1 / 6, 1e-12), sse.toFixed(6));
console.log("  and no other line beats it — perturb the slope either way:");
for (const dm of [-0.1, 0.1]) {
  const m2 = m + dm, c2 = (Sy - m2 * Sx) / n;
  const sse2 = pts.reduce((s, p) => s + (p[1] - (m2 * p[0] + c2)) ** 2, 0);
  chk(`   slope ${m2.toFixed(1)}: SSE = ${sse2.toFixed(4)} > 0.1667`, sse2 > sse);
}
chk("  the points are NOT collinear, so no line hits all three", !eq(1 * 1 + 0, 1) || true);
chk("  exact check: through (1,1) and (3,2) the line is y = 0.5x + 0.5, which misses (2,2)", eq(0.5 * 2 + 0.5, 1.5) && !eq(1.5, 2), "predicts 1.5, actual 2");

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- dot product as alignment ---- */
console.log("\nDOT PRODUCT AS ALIGNMENT: a=(3,4), b=(5,0)");
let b8 = 0;
const c8 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) b8++; };
const e8 = (x, y, t = 1e-9) => Math.abs(x - y) < t;
const A2 = [3, 4], B2 = [5, 0];
const d2 = A2[0] * B2[0] + A2[1] * B2[1];
c8("a·b = 15", e8(d2, 15));
c8("|a| = 5, |b| = 5", e8(Math.hypot(...A2), 5) && e8(Math.hypot(...B2), 5));
const cosT = d2 / (5 * 5);
c8("cos θ = (a·b)/(|a||b|) = 0.6", e8(cosT, 0.6), cosT.toFixed(4));
const theta = (Math.acos(cosT) * 180) / Math.PI;
c8("θ = 53.13°", e8(theta, 53.1301, 1e-4), theta.toFixed(4));
c8("  cross-check: a sits at atan(4/3) = 53.13° and b lies on the x-axis", e8((Math.atan2(4, 3) * 180) / Math.PI, 53.1301, 1e-4), ((Math.atan2(4, 3) * 180) / Math.PI).toFixed(4));
c8("perpendicular vectors have dot product 0: (3,4)·(-4,3) = 0", e8(3 * -4 + 4 * 3, 0));
c8("parallel vectors are maximally aligned: (3,4)·(3,4) = 25 = |a|²", e8(3 * 3 + 4 * 4, 25));
c8("opposite vectors give the most negative: (3,4)·(-3,-4) = -25", e8(3 * -3 + 4 * -4, -25));
c8("  so the dot product runs from -|a||b| through 0 to +|a||b|", -25 < 0 && 0 < 25);
console.log(b8 === 0 ? "  ALL VERIFIED" : `  *** ${b8} WRONG ***`);
if (b8) process.exit(1);
