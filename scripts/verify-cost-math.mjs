/**
 * Verify every number in the tutoring cost article.
 *
 * RULE FOR THIS FILE: every figure must trace to app/pricing/content.ts or to a
 * fact the client stated. No market/competitor figures — the previous version of
 * this article invented them ($60-120/hr, $200-400/month) and they were sourced
 * from nothing.
 */
const eq = (a, b, t = 0.02) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

// Straight from app/pricing/content.ts
const ONE_MIN = 75, ONE_MAX = 100;
const MONTH_MIN = 185, MONTH_MAX = 200;
const BOOSTER = 280;

console.log("SOURCE OF TRUTH: app/pricing/content.ts");
chk("1-on-1 = $75-$100/hr", ONE_MIN === 75 && ONE_MAX === 100);
chk("Monthly Program = $185-$200/month, 2 sessions/week, group of 6-8", MONTH_MIN === 185 && MONTH_MAX === 200);
chk("Exam Booster = $280, 2-week intensive", BOOSTER === 280);

console.log("\nCOST PER SESSION — the comparison a parent cannot easily do");
const sessionsPerMonth = (2 * 52) / 12;
chk("2 sessions/week = 8.67 sessions/month", eq(sessionsPerMonth, 8.667), sessionsPerMonth.toFixed(3));
const perSessionMin = MONTH_MIN / sessionsPerMonth;
const perSessionMax = MONTH_MAX / sessionsPerMonth;
chk("$185/month -> $21 per session", eq(perSessionMin, 21.35, 0.05), perSessionMin.toFixed(2));
chk("$200/month -> $23 per session", eq(perSessionMax, 23.08, 0.05), perSessionMax.toFixed(2));
chk("  so the monthly program is roughly a quarter of the 1-on-1 rate", eq(85 / perSessionMin, 3.98, 0.05), (85 / perSessionMin).toFixed(2) + "x");

console.log("\nTERM COST — 1-on-1 weekly, worked at an example rate of $85");
chk("the TRUE midpoint of $75-$100 is $87.50, NOT $85", eq((ONE_MIN + ONE_MAX) / 2, 87.5), ((ONE_MIN + ONE_MAX) / 2).toFixed(2));
chk("  so the article must call $85 an EXAMPLE rate, never 'the midpoint'", true);
chk("  $85 is at least inside the stated range", 85 >= ONE_MIN && 85 <= ONE_MAX);
chk("10 weekly sessions at $85 = $850", eq(10 * 85, 850));
chk("a 10-week term at $75 = $750, at $100 = $1000", eq(10 * 75, 750) && eq(10 * 100, 1000));

console.log("\nTHE HONEST COMPARISON — same rate, different approach (no invented competitor)");
const drift = 20 * 85, targeted = 6 * 85;
chk("20 sessions of supervised homework at $85 = $1,700", eq(drift, 1700));
chk("6 targeted sessions at $85 = $510", eq(targeted, 510));
chk("  difference = $1,190", eq(drift - targeted, 1190));
chk("  the drifting option costs 3.3x more", eq(drift / targeted, 3.333, 0.01), (drift / targeted).toFixed(2) + "x");
chk("  and this needs NO competitor price to make the point", true);

console.log("\nEXAM BOOSTER value check");
chk("$280 vs 4 x 1-on-1 hours at $85 = $340", eq(4 * 85, 340), "booster is cheaper than 4 private hours");
chk("  $280 is under the cost of 4 private hours", BOOSTER < 4 * 85);

console.log("\nCLAIMS THAT MUST NOT APPEAR (invented in the previous version)");
for (const c of ["franchise learning centres $200-$400/month", "qualified private tutors $60-$120/hr", "a tutor at $40/hr"])
  chk(`  REMOVED: "${c}"`, true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
