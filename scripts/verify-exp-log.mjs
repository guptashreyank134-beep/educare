/** Verify every calculation in the exponentials & logarithms article. */
const eq = (a, b, t = 1e-4) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const { log, log2, log10, pow, LN2 } = Math;

console.log("THE ONE IDEA: a log IS an exponent");
chk("2³ = 8", eq(2 ** 3, 8));
chk("log₂8 = 3 — the same fact, asked backwards", eq(log2(8), 3));
chk("b^(log_b x) = x  : 2^(log₂ 8) = 8", eq(2 ** log2(8), 8));
chk("log_b(b^x) = x   : log₂(2³) = 3", eq(log2(2 ** 3), 3));

console.log("\nTHE SVG: y = 2^x and y = log₂x are reflections in y = x");
const expPts = [[-2, 0.25], [-1, 0.5], [0, 1], [1, 2], [2, 4], [3, 8]];
for (const [x, y] of expPts) chk(`  (${x}, ${y}) on y = 2^x`, eq(2 ** x, y), String(2 ** x));
console.log("  each point swaps to give the log curve:");
for (const [x, y] of expPts) chk(`  (${y}, ${x}) on y = log₂x`, eq(log2(y), x), log2(y).toFixed(4));
chk("  y=2^x passes through (0,1); y=log₂x through (1,0)", eq(2 ** 0, 1) && eq(log2(1), 0));
chk("  2^x is NEVER zero or negative — hence log's domain is x > 0", 2 ** -50 > 0);

console.log("\nTHE LAWS (and the one that is NOT a law)");
chk("log(ab) = log a + log b   [a=4,b=25]", eq(log10(100), log10(4) + log10(25)), log10(100).toFixed(4));
chk("log(a/b) = log a − log b  [a=100,b=4]", eq(log10(25), log10(100) - log10(4)));
chk("log(aⁿ) = n·log a         [a=3,n=5]", eq(log10(3 ** 5), 5 * log10(3)), log10(243).toFixed(4));
chk("NOT A LAW: log(a+b) ≠ log a + log b", !eq(log10(10 + 10), log10(10) + log10(10)), `log20=${log10(20).toFixed(3)} vs 2`);

console.log("\nCHANGE OF BASE");
chk("log₂10 = ln10/ln2 = 3.3219", eq(log(10) / log(2), 3.32193, 1e-5), (log(10) / log(2)).toFixed(5));
chk("  cross-check: 2^3.3219 = 10", eq(2 ** (log(10) / log(2)), 10, 1e-6), (2 ** 3.32193).toFixed(4));
chk("  and log10/log2 in base 10 gives the same", eq(log10(10) / log10(2), log(10) / log(2)));

console.log("\nSOLVING 3^x = 20");
const x1 = log(20) / log(3);
chk("x = ln20/ln3 = 2.7268", eq(x1, 2.72683, 1e-5), x1.toFixed(5));
chk("  check: 3^2.7268 = 20", eq(3 ** x1, 20, 1e-6), (3 ** x1).toFixed(4));
chk("  you cannot 'divide by 3' — x is an EXPONENT, not a factor", !eq(20 / 3, x1));

console.log("\nCOMPOUND INTEREST: how long for money to double at 5%/yr?");
const t = log(2) / log(1.05);
chk("t = ln2/ln1.05 = 14.2 years", eq(t, 14.2067, 1e-3), t.toFixed(4));
chk("  check: 1.05^14.2067 = 2.000", eq(1.05 ** t, 2, 1e-6), (1.05 ** t).toFixed(5));
chk("  the 'rule of 70': 70/5 = 14 — close to 14.2", eq(70 / 5, 14) && Math.abs(14 - t) < 0.25);
chk("  and the starting amount is IRRELEVANT — it cancels", eq(log(2) / log(1.05), log((2 * 5000) / 5000) / log(1.05)));

console.log("\nHALF-LIFE: carbon-14, T = 5730 years");
const frac = (t2) => 0.5 ** (t2 / 5730);
chk("after 5730 yr, 50% remains", eq(frac(5730), 0.5));
chk("after 11460 yr, 25% remains", eq(frac(11460), 0.25));
const age = 5730 * (log(0.25) / log(0.5));
chk("solving back: 25% remaining -> 11,460 years", eq(age, 11460, 1e-6), age.toFixed(1));
const age2 = 5730 * (log(0.7) / log(0.5));
chk("70% remaining -> 2,948 years", eq(age2, 2948.05, 0.5), age2.toFixed(1));

console.log("\nPRACTICE: solve log₂(x) + log₂(x−2) = 3");
// log2(x(x-2)) = 3 -> x²-2x = 8 -> x²-2x-8=0 -> (x-4)(x+2)=0 -> x=4 or x=-2
chk("combines to log₂(x²−2x) = 3, so x²−2x = 8", eq(2 ** 3, 8));
chk("factors: (x−4)(x+2) = 0 -> x = 4 or x = −2", eq((4 - 4) * (4 + 2), 0) && eq((-2 - 4) * (-2 + 2), 0));
chk("x=4 works: log₂4 + log₂2 = 2 + 1 = 3", eq(log2(4) + log2(2), 3));
chk("x=−2 is REJECTED — log₂(−2) does not exist", isNaN(log2(-2)));
chk("  so the domain check is not optional here", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- where e comes from ---- */
console.log("\nWHERE e COMES FROM: compounding $1 at 100% for a year, ever more often");
let b5 = 0;
const c5 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) b5++; };
const e5 = (a, b, t) => Math.abs(a - b) < t;
const comp = (n) => (1 + 1 / n) ** n;
c5("yearly    (n=1)      -> 2.00", e5(comp(1), 2, 1e-9), comp(1).toFixed(6));
c5("quarterly (n=4)      -> 2.4414", e5(comp(4), 2.44141, 1e-5), comp(4).toFixed(6));
c5("monthly   (n=12)     -> 2.6130", e5(comp(12), 2.61304, 1e-5), comp(12).toFixed(6));
c5("daily     (n=365)    -> 2.7146", e5(comp(365), 2.71457, 1e-5), comp(365).toFixed(6));
c5("hourly    (n=8760)   -> 2.7181", e5(comp(8760), 2.71813, 1e-5), comp(8760).toFixed(6));
c5("n = 1,000,000        -> 2.718280", e5(comp(1e6), 2.718280, 1e-5), comp(1e6).toFixed(6));
c5("  the limit is e = 2.718281828...", e5(Math.E, 2.718281828, 1e-9), Math.E.toFixed(9));
c5("  it CONVERGES — infinite compounding does not give infinite money", comp(1e6) < 2.72);
c5("ln(e) = 1", e5(Math.log(Math.E), 1, 1e-12));
c5("e^0 = 1", e5(Math.E ** 0, 1, 1e-12));
console.log(b5 === 0 ? "  ALL VERIFIED" : `  *** ${b5} WRONG ***`);
if (b5) process.exit(1);
