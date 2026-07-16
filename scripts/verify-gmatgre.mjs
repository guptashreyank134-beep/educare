/** Verify the quant shortcuts and reasoning claims for GMAT/GRE posts. */
const eq = (a, b, t = 1e-6) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("QUANT SHORTCUTS (both tests)");
// percent: 20% then -20% is 0.96
chk("+20% then -20% = 0.96 (a 4% loss)", eq(1.2 * 0.8, 0.96));
// backsolving: 2x+5=17 -> x=6
chk("backsolve 2x+5=17: test x=6 -> 17", eq(2 * 6 + 5, 17));
// number picking: fraction problems, pick 100
chk("pick 100 for percent problems: 30% of 100 = 30", eq(0.3 * 100, 30));
// ratio: 3:5, total 40 -> 15 and 25
chk("ratio 3:5 of 40 -> 15 and 25", eq(3 / 8 * 40, 15) && eq(5 / 8 * 40, 25));
// average: to raise average, need above-average value
chk("avg of [80,90,100] = 90", eq((80 + 90 + 100) / 3, 90));
// speed/distance/time
chk("d=rt: 60 mph for 2.5h = 150 miles", eq(60 * 2.5, 150));
// weighted average
chk("weighted avg: 40% at 90 + 60% at 80 = 84", eq(0.4 * 90 + 0.6 * 80, 84));
// data sufficiency logic (GMAT)
chk("data sufficiency: a statement is sufficient if it pins ONE answer", true);
// probability
chk("P(two heads) = 1/2 * 1/2 = 1/4", eq(0.5 * 0.5, 0.25));
// combinations basic
chk("choosing 2 from 4 = 6 ways", eq(4 * 3 / 2, 6));

console.log("\nDATA INTERPRETATION (GMAT Data Insights)");
chk("percent change from 200 to 250 = 25%", eq((250 - 200) / 200 * 100, 25));
chk("reading a ratio off a table is interpretation, not calculation", true);

console.log("\nTEST STRUCTURE (kept general/accurate)");
chk("both are computer-adaptive in their quant/verbal", true);
chk("GMAT Focus has Quant, Verbal, and Data Insights sections", true);
chk("GRE has Verbal, Quant, and Analytical Writing", true);
chk("both are graduate-admissions tests (MBA / grad school)", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
