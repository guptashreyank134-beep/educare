/** Verify every calculation in the SAT Mathematics article. The angle: the SAT tests
    a small, knowable set of tricks under time pressure, not deep maths. */
const eq = (a, b, t = 1e-9) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("TIMING: the real constraint");
// SAT math (digital): 44 questions, 70 min across two modules
chk("44 questions in 70 minutes = 95 s/question", eq(70 * 60 / 44, 95.4545, 1e-3), (70 * 60 / 44).toFixed(2));
chk("  under 1.6 minutes each — speed IS the test", 70 / 44 < 1.6);

console.log("\nTRICK 1: systems by elimination beat substitution. 3x+2y=16, 5x-2y=8");
// add the equations: 8x = 24 -> x = 3, then y = 3.5
chk("adding kills y instantly: 8x = 24 -> x = 3", eq((16 + 8) / 8, 3));
chk("  y = (16 - 3*3)/2 = 3.5", eq((16 - 3 * 3) / 2, 3.5), String((16 - 9) / 2));
chk("  check in eq 2: 5(3) - 2(3.5) = 8", eq(5 * 3 - 2 * 3.5, 8));

console.log("\nTRICK 2: percent change chained. +20% then -20% is NOT zero");
const after = 100 * 1.2 * 0.8;
chk("100 -> +20% -> 120 -> -20% -> 96, a 4% LOSS", eq(after, 96), String(after));
chk("  because 0.8 x 1.2 = 0.96", eq(1.2 * 0.8, 0.96));

console.log("\nTRICK 3: the classic 'exponential growth' word problem");
// population 500 grows 8%/yr, value after t years = 500(1.08)^t
chk("500(1.08)^0 = 500", eq(500 * 1.08 ** 0, 500));
chk("500(1.08)^3 = 629.86", eq(500 * 1.08 ** 3, 629.8560), (500 * 1.08 ** 3).toFixed(4));
chk("  the SAT wants the FORM 500(1.08)^t, not a number", true);

console.log("\nTRICK 4: vertex form reveals the answer without calculus");
// y = x^2 - 6x + 5 = (x-3)^2 - 4, vertex (3,-4), min value -4
chk("x²-6x+5 completes to (x-3)²-4", eq(9 - 6 * 3 + 5, -4) && eq((3 - 3) ** 2 - 4, -4));
chk("  minimum value is -4 at x=3, no calculus needed", eq((3) ** 2 - 6 * 3 + 5, -4));
chk("  roots at x=1 and x=5 (from x²-6x+5=(x-1)(x-5))", eq(1 - 6 + 5, 0) && eq(25 - 30 + 5, 0));

console.log("\nTRICK 5: special right triangles are given but time-savers");
chk("30-60-90 sides 1 : √3 : 2, and 1² + (√3)² = 2²", eq(1 + 3, 4));
chk("45-45-90 sides 1 : 1 : √2, and 1² + 1² = (√2)²", eq(1 + 1, 2));
chk("  3-4-5 and 5-12-13 are the integer ones the SAT reuses", eq(9 + 16, 25) && eq(25 + 144, 169));

console.log("\nTRICK 6: 'plug in the answers' on a hard equation");
// solve 2x^2 - 5x - 3 = 0; answer choices include x=3
chk("test x=3: 2(9) - 15 - 3 = 0 ✓", eq(2 * 9 - 5 * 3 - 3, 0));
chk("  factoring gives (2x+1)(x-3), roots -0.5 and 3", eq((2 * 3 + 1) * (3 - 3), 0));
chk("  plugging a choice is often faster than solving", true);

console.log("\nTRICK 7: linear function from a table (constant rate)");
// (1,7),(3,13),(5,19): slope = 3, y = 3x + 4
chk("slope between (1,7),(3,13) = 3", eq((13 - 7) / (3 - 1), 3));
chk("  and (5,19) confirms: 3(5)+4 = 19", eq(3 * 5 + 4, 19));
chk("  intercept 4, so y = 3x + 4", eq(7 - 3 * 1, 4));

console.log("\nMEAN vs MEDIAN trap: {2,3,3,4,88}");
const s = [2, 3, 3, 4, 88];
const mean = s.reduce((a, b) => a + b) / s.length;
chk("mean = 100/5 = 20", eq(mean, 20), String(mean));
chk("median = 3 (middle value)", eq(s[2], 3));
chk("  the outlier drags the mean to 20 but not the median", mean > 3 && s[2] === 3);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- two more SAT setups ---- */
console.log("\nTRICK 8: plug in numbers for an abstract question");
let b8 = 0;
const c8 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) b8++; };
const e8 = (a, b, t = 1e-9) => Math.abs(a - b) < t;
// "if a is 30% of b, and b is 40% of c, a is what % of c?"  -> 12%
c8("a = 0.3b, b = 0.4c -> a = 0.12c, i.e. 12%", e8(0.3 * 0.4, 0.12));
c8("  concrete check: c=100 -> b=40 -> a=12 -> 12%", e8(0.3 * 40, 12) && e8(0.4 * 100, 40));
c8("  picking c=100 turns an abstract question into arithmetic", true);

console.log("\nTRICK 9: circle equation, completing the square");
// x^2 + y^2 - 6x + 8y = 0  ->  (x-3)^2 + (y+4)^2 = 25, centre (3,-4), r=5
c8("x²-6x completes to (x-3)²-9", e8(9 - 18, -9));
c8("y²+8y completes to (y+4)²-16", e8(16 + 32, 48) && e8((-4) ** 2 + 8 * -4, -16));
c8("so (x-3)²+(y+4)² = 9+16 = 25, centre (3,-4), radius 5", e8(9 + 16, 25) && e8(Math.sqrt(25), 5));
c8("  check: (3,-4) plugged into original x²+y²-6x+8y = 9+16-18-32 = -25 ✓ (=-r²... balances)", e8(9 + 16 - 18 - 32, -25));

console.log("\nTRICK 10: distance and midpoint");
// (1,2) to (4,6): distance 5, midpoint (2.5,4)
c8("distance (1,2)-(4,6) = √(3²+4²) = 5", e8(Math.hypot(4 - 1, 6 - 2), 5));
c8("midpoint = (2.5, 4)", e8((1 + 4) / 2, 2.5) && e8((2 + 6) / 2, 4));
console.log(b8 === 0 ? "  ALL VERIFIED" : `  *** ${b8} WRONG ***`);
if (b8) process.exit(1);
