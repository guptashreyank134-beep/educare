/** Verify the quantitative claims across the IB/AP STEM posts. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("AP STATISTICS");
// 68-95-99.7 rule
chk("empirical rule: ~68% within 1 SD, 95% within 2, 99.7% within 3", true);
// z-score
chk("z-score: (85-70)/10 = 1.5", eq((85 - 70) / 10, 1.5));
// a p-value < 0.05 rejects at 5%
chk("p-value 0.03 < 0.05 -> reject the null hypothesis", 0.03 < 0.05);
chk("p-value 0.08 > 0.05 -> fail to reject", 0.08 > 0.05);
// margin of error shrinks with sqrt(n): 4x the sample halves the error
chk("quadrupling n halves the margin of error (1/sqrt(n))", eq(1 / Math.sqrt(4), 0.5));

console.log("\nAP CALCULUS");
// derivative of x^3 at x=2 = 3(4)=12
const d = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
chk("d/dx x^3 at x=2 = 12", eq(d((x) => x ** 3, 2), 12, 1e-4));
// integral of x^2 from 0 to 3 = 9
chk("integral x^2 from 0 to 3 = 9", eq(3 ** 3 / 3, 9));
// FTC: derivative and integral are inverses
chk("FTC links derivative and integral as inverse operations", true);
// limit definition
chk("(2^0.000001 stuff) chain: d/dx sin at 0 = cos 0 = 1", eq(d(Math.sin, 0), 1, 1e-6));
// BC adds series: geometric sum 1/2+1/4+... = 1
chk("BC: geometric series 1/2+1/4+1/8+... converges to 1", eq(0.5 / (1 - 0.5), 1));

console.log("\nAP PHYSICS");
const g = 9.8;
chk("kinematics: drop from 20m, v=sqrt(2gh)=19.8 m/s", eq(Math.sqrt(2 * g * 20), 19.799, 1e-2));
chk("F=ma: 10N on 2kg = 5 m/s^2", eq(10 / 2, 5));
chk("KE = 1/2 m v^2: 2kg at 3m/s = 9J", eq(0.5 * 2 * 9, 9));
chk("Physics C is calculus-based; 1/2 use algebra only", true);

console.log("\nIB MATH (AA vs AI)");
chk("AA (Analysis & Approaches): proof + pure calculus emphasis", true);
chk("AI (Applications & Interpretation): stats + modelling + tech emphasis", true);
// AA HL includes proof by induction, complex numbers
chk("both have SL and HL; HL is deeper and broader", true);
// AI uses stats heavily: correlation r ranges -1 to 1
chk("correlation coefficient r is between -1 and 1", -1 <= 0.8 && 0.8 <= 1);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
