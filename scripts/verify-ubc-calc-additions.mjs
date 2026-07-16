/** Verify additions to the UBC calculus midterm guide. */
const eq = (a, b, t = 1e-6) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("THE EXISTING LADDER (the diagram must match it)");
chk("3-4-5: 3² + 4² = 25 = 5²", eq(9 + 16, 25));
const dydt = -(3 / 4) * 0.5;
chk("dy/dt = -(x/y)(dx/dt) = -(3/4)(0.5) = -0.375 m/s", eq(dydt, -0.375), dydt.toFixed(4));
chk("  post says 0.375 descending — consistent", eq(Math.abs(dydt), 0.375));
chk("  top descends SLOWER than the base slides (0.375 < 0.5) at this instant", Math.abs(dydt) < 0.5);
// and the speeds are equal only at x = y
const at45 = -(1 / 1) * 0.5;
chk("  they are equal only when x = y (the 45° instant): dy/dt = -0.5", eq(at45, -0.5), at45.toFixed(3));

console.log("\nCONJUGATE LIMIT: lim x->0 (sqrt(x+4) - 2)/x");
const f = (x) => (Math.sqrt(x + 4) - 2) / x;
chk("numerically at x=1e-6 -> 0.25", eq(f(1e-6), 0.25, 1e-6), f(1e-6).toFixed(8));
chk("numerically at x=-1e-6 -> 0.25 (both sides agree)", eq(f(-1e-6), 0.25, 1e-6), f(-1e-6).toFixed(8));
chk("algebraic form 1/(sqrt(x+4)+2) at x=0 = 1/4", eq(1 / (Math.sqrt(4) + 2), 0.25));
chk("  direct substitution gives 0/0 — that is why the trick is needed", eq(Math.sqrt(0 + 4) - 2, 0) && eq(0, 0));
chk("  the conjugate identity: (sqrt(a)-b)(sqrt(a)+b) = a - b²", eq((Math.sqrt(4.5) - 2) * (Math.sqrt(4.5) + 2), 4.5 - 4));

console.log("\nPIECEWISE CONTINUITY: f(x) = (x²-1)/(x-1) for x != 1, f(1) = k");
const g = (x) => (x * x - 1) / (x - 1);
chk("for x != 1 this simplifies to x + 1", eq(g(1.001), 2.001, 1e-9) && eq(g(0.999), 1.999, 1e-9));
chk("limit as x->1 is 2", eq(g(1 + 1e-9), 2, 1e-6) && eq(g(1 - 1e-9), 2, 1e-6));
chk("so f is continuous at x=1 only if k = 2", eq(2, 2));
chk("  at x=1 the ORIGINAL formula is 0/0 — undefined, hence the piecewise definition", eq(1 * 1 - 1, 0) && eq(1 - 1, 0));
chk("  k=3 would make it discontinuous (jump of 1)", !eq(3, 2));

console.log("\nTRIG LIMIT: lim x->0 sin(x)/x = 1");
for (const x of [1e-3, 1e-4, -1e-4]) chk(`  sin(${x})/${x} -> 1`, eq(Math.sin(x) / x, 1, 1e-6), (Math.sin(x) / x).toFixed(9));
chk("  again 0/0 by direct substitution", eq(Math.sin(0), 0));
chk("  and it is FALSE in degrees: sin(1°)/1 is not ~1", !eq(Math.sin(1 * Math.PI / 180) / 1, 1, 1e-2), (Math.sin(Math.PI / 180)).toFixed(6));

console.log("\nSVG GEOMETRY (ladder 3-4-5)");
chk("base at x=3, top at y=4, length 5", eq(Math.hypot(3, 4), 5));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- limits at infinity ---- */
console.log("\nLIMITS AT INFINITY: lim x->inf (3x²+2x)/(5x²-1) = 3/5");
let b4 = 0;
const c4 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) b4++; };
const e4 = (a, b, t = 1e-5) => Math.abs(a - b) < t;
const h = (x) => (3 * x * x + 2 * x) / (5 * x * x - 1);
c4("at x=1e3  -> 0.6004", e4(h(1e3), 0.6, 1e-3), h(1e3).toFixed(7));
c4("at x=1e6  -> 0.6", e4(h(1e6), 0.6, 1e-5), h(1e6).toFixed(9));
c4("limit is exactly 3/5 = 0.6 (ratio of leading coefficients)", e4(3 / 5, 0.6));
c4("  dividing through by x² : (3 + 2/x)/(5 - 1/x²) -> 3/5", e4((3 + 0) / (5 - 0), 0.6));
// degree matters
const lower = (x) => (3 * x + 2) / (5 * x * x - 1);
const higher = (x) => (3 * x ** 3) / (5 * x * x - 1);
c4("if the TOP degree is smaller, the limit is 0", e4(lower(1e6), 0, 1e-5), lower(1e6).toExponential(2));
c4("if the TOP degree is bigger, it diverges", higher(1e6) > 1e5, higher(1e6).toExponential(2));
console.log(b4 === 0 ? "  ALL VERIFIED" : `  *** ${b4} WRONG ***`);
if (b4) process.exit(1);
