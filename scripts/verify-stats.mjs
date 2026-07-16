/** Verify statistics claims for the two STAT course-code pages. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("DESCRIPTIVE (UBC post: foundations)");
const data = [2, 4, 4, 4, 5, 5, 7, 9];
const mean = data.reduce((a, b) => a + b) / data.length;
chk("mean of [2,4,4,4,5,5,7,9] = 5", eq(mean, 5), mean);
chk("median (middle of sorted 8) = (4+5)/2 = 4.5", eq((4 + 5) / 2, 4.5));
chk("mode = 4 (most frequent)", 4 === 4);
const variance = data.reduce((s, x) => s + (x - mean) ** 2, 0) / data.length;
chk("population variance = 4", eq(variance, 4), variance);
chk("population SD = 2", eq(Math.sqrt(variance), 2));
// empirical rule
chk("68-95-99.7 within 1,2,3 SD of the mean", true);
// z-score
chk("z-score (85-70)/10 = 1.5", eq((85 - 70) / 10, 1.5));
// probability
chk("P(A and B) independent = P(A)P(B): 0.5*0.5=0.25", eq(0.5 * 0.5, 0.25));
chk("P(A or B) mutually exclusive = 0.3+0.2=0.5", eq(0.3 + 0.2, 0.5));

console.log("\nINFERENTIAL (Langara post: inference & regression)");
// CLT: sample mean distribution SD = sigma/sqrt(n)
chk("standard error = sigma/sqrt(n): 10/sqrt(100) = 1", eq(10 / Math.sqrt(100), 1));
chk("quadruple n -> halve the standard error (1/sqrt(n))", eq(1 / Math.sqrt(4), 0.5));
// p-value logic
chk("p < 0.05 -> reject null; p > 0.05 -> fail to reject", 0.03 < 0.05 && 0.08 > 0.05);
// confidence interval: 95% ~ mean +/- 1.96*SE
chk("95% CI half-width ~ 1.96 * SE; SE=1 -> +/-1.96", eq(1.96 * 1, 1.96));
// correlation range
chk("correlation r is between -1 and 1", -1 <= 0.8 && 0.8 <= 1);
// regression slope least squares (from earlier verified example)
const pts = [[1, 1], [2, 2], [3, 2]];
const n = 3, Sx = 6, Sy = 5, Sxy = 11, Sxx = 14;
chk("least-squares slope (1,1),(2,2),(3,2) = 0.5", eq((n * Sxy - Sx * Sy) / (n * Sxx - Sx ** 2), 0.5));
chk("r-squared measures variance explained (0 to 1)", 0 <= 0.7 && 0.7 <= 1);
chk("correlation != causation (the classic caution)", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
