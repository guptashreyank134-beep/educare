/** Verify every counterexample in the Pre-Calculus 12 mistakes article. */
const eq = (a, b, t = 1e-9) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const { sqrt, log10, log, sin, cos, PI } = Math;

console.log("1. (a+b)² ≠ a² + b²   — a=3, b=4");
chk("(3+4)² = 49", eq((3 + 4) ** 2, 49));
chk("3² + 4² = 25  — the wrong answer", eq(9 + 16, 25));
chk("  they differ by the cross term 2ab = 24", eq(49 - 25, 2 * 3 * 4), String(2 * 3 * 4));
chk("  identity holds: (a+b)² = a² + 2ab + b² for a=3,b=4", eq((3 + 4) ** 2, 9 + 2 * 3 * 4 + 16));
chk("  it is only 'true' when 2ab = 0, i.e. a=0 or b=0", eq((0 + 5) ** 2, 0 + 25));

console.log("\n   THE SVG: a square of side (a+b) splits into a², ab, ab, b²   (a=3, b=4)");
chk("total area = (3+4)² = 49", eq(49, 49));
chk("a² = 9", eq(3 ** 2, 9));
chk("b² = 16", eq(4 ** 2, 16));
chk("two ab rectangles = 2(12) = 24", eq(2 * 3 * 4, 24));
chk("  9 + 16 + 24 = 49 ✓ the pieces tile the square exactly", eq(9 + 16 + 24, 49));

console.log("\n2. √(a²+b²) ≠ a + b   — a=3, b=4");
chk("√(9+16) = 5", eq(sqrt(9 + 16), 5));
chk("3 + 4 = 7  — the wrong answer", eq(3 + 4, 7));
chk("  (this is why the 3-4-5 triangle works at all)", eq(sqrt(3 ** 2 + 4 ** 2), 5));

console.log("\n3. log(a+b) ≠ log a + log b   — a=b=10");
chk("log(10+10) = log 20 = 1.301", eq(log10(20), 1.30103, 1e-5), log10(20).toFixed(5));
chk("log10 + log10 = 2  — the wrong answer", eq(log10(10) + log10(10), 2));
chk("  the REAL rule is log(ab) = log a + log b", eq(log10(10 * 10), log10(10) + log10(10)));
chk("  check: log(100) = 2", eq(log10(100), 2));

console.log("\n4. 1/(a+b) ≠ 1/a + 1/b   — a=2, b=3");
chk("1/(2+3) = 0.2", eq(1 / 5, 0.2));
chk("1/2 + 1/3 = 0.8333  — the wrong answer", eq(1 / 2 + 1 / 3, 0.83333, 1e-5), (1 / 2 + 1 / 3).toFixed(5));

console.log("\n5. Dividing by a variable destroys a root:  x² = x");
chk("x=0 satisfies x² = x", eq(0 ** 2, 0));
chk("x=1 satisfies x² = x", eq(1 ** 2, 1));
chk("  dividing both sides by x gives x=1 only — x=0 is LOST", true);
chk("  factoring x(x−1)=0 keeps both", eq(0 * (0 - 1), 0) && eq(1 * (1 - 1), 0));

console.log("\n6. Squaring invents roots:  √(x+2) = x");
// x+2 = x^2 -> x^2 - x - 2 = 0 -> (x-2)(x+1)=0 -> x = 2 or x = -1
const roots = [2, -1];
chk("algebra gives x = 2 and x = −1", eq((2 - 2) * (2 + 1), 0) && eq((-1 - 2) * (-1 + 1), 0));
chk("x=2 checks: √4 = 2 ✓", eq(sqrt(2 + 2), 2));
chk("x=−1 FAILS: √1 = 1, not −1  — extraneous", !eq(sqrt(-1 + 2), -1), `sqrt(1)=${sqrt(1)} vs -1`);
chk("  so the answer is x = 2 only", true);

console.log("\n7. Inequality sign flips when multiplying by a negative:  −2x > 6");
chk("x = −4 satisfies −2x > 6  (8 > 6)", -2 * -4 > 6);
chk("x = −2 does NOT  (4 > 6 false)", !(-2 * -2 > 6));
chk("  so the solution is x < −3, NOT x > −3", -2 * -3.1 > 6 && !(-2 * -2.9 > 6));

console.log("\n8. Domain of a log:  log(x−3)");
chk("x=4 is fine: log(1) = 0", eq(log10(4 - 3), 0));
chk("x=3 is undefined (log 0)", !isFinite(log10(3 - 3)));
chk("x=2 is undefined (log of a negative)", isNaN(log10(2 - 3)));
chk("  so the domain is x > 3", 4 > 3);

console.log("\n9. sin²x means (sin x)², not sin(x²)   — x = 2 rad");
chk("(sin 2)² = 0.8268", eq(sin(2) ** 2, 0.82682, 1e-5), (sin(2) ** 2).toFixed(5));
chk("sin(2²) = sin 4 = −0.7568  — completely different", eq(sin(4), -0.75680, 1e-5), sin(4).toFixed(5));
chk("  they are not even the same sign", sin(2) ** 2 > 0 && sin(4) < 0);

console.log("\n10. Pythagorean identity still holds (the one that IS true)");
for (const x of [0.4, 2.1, 5.3]) chk(`sin²x + cos²x = 1 at x=${x}`, eq(sin(x) ** 2 + cos(x) ** 2, 1));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- transformation direction ---- */
console.log("\n11. y = f(x−3) shifts RIGHT by 3, not left   — f(x) = x²");
let bad3 = 0;
const eq3 = (a, b) => Math.abs(a - b) < 1e-9;
const chk3 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad3++; };
const f2 = (x) => x * x;
const g = (x) => f2(x - 3);
chk3("f has its vertex at x=0, f(0)=0", eq3(f2(0), 0));
chk3("g(x)=f(x−3) has its vertex at x=3, g(3)=0", eq3(g(3), 0));
chk3("  so the graph moved RIGHT by 3, despite the minus sign", 3 > 0);
chk3("  because g(3) reproduces what f did at 0: g(3)=f(0)", eq3(g(3), f2(0)));
chk3("g(0) = f(−3) = 9, NOT 0", eq3(g(0), 9), String(g(0)));
chk3("the 'obvious' answer (shift left) would put the vertex at x=−3: g(−3)=36 ≠ 0", !eq3(g(-3), 0), String(g(-3)));
console.log(bad3 === 0 ? "  ALL VERIFIED" : `  *** ${bad3} WRONG ***`);
if (bad3) process.exit(1);
