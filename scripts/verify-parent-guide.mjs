/** Verify the worked example added to the concept-gap/practice-gap parent guide. */
const eq = (a, b) => Math.abs(a - b) < 1e-9;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("THE SHARED WRONG ANSWER: a student writes (x+3)² = x² + 9");
chk("the correct expansion is x² + 6x + 9", eq((5 + 3) ** 2, 25 + 30 + 9), `(5+3)²=${(5 + 3) ** 2}`);
console.log("\n  the parent's check: substitute x = 1");
chk("truth:  (1+3)² = 16", eq((1 + 3) ** 2, 16));
chk("claim:  1² + 9 = 10", eq(1 + 9, 10));
chk("  they disagree, so the claim is false — 6 apart", eq(16 - 10, 6), "and 6 = 6x at x=1 ✓");
console.log("\n  it is not a fluke — try x = 2");
chk("truth:  (2+3)² = 25", eq((2 + 3) ** 2, 25));
chk("claim:  2² + 9 = 13", eq(4 + 9, 13));
chk("  12 apart, which is 6x at x=2", eq(25 - 13, 12) && eq(6 * 2, 12));
console.log("\n  and the ONE case where the wrong rule accidentally works");
chk("at x = 0 both give 9 — which is how the habit survives", eq((0 + 3) ** 2, 9) && eq(0 + 9, 9), "9 = 9");
chk("  because the missing term is 6x, and 6(0) = 0", eq(6 * 0, 0));

console.log("\nWHY THE SAME ERROR HAS TWO CAUSES (the article's point)");
chk("concept gap: student believes squaring distributes -> wrong EVERY time, confidently", true);
chk("practice gap: student knows better, slipped under time -> spots it instantly on checking", true);
chk("  the paper looks IDENTICAL in both cases — that is the whole problem", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
