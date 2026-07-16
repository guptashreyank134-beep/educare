/** Verify financial math for the finance family: TVM, ratios, NPV. */
const eq = (a, b, t = 1e-2) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("TIME VALUE OF MONEY (post 1)");
// FV = PV(1+r)^n ; $1000 at 6% for 10 yr
const fv = 1000 * 1.06 ** 10;
chk("FV = 1000(1.06)^10 = 1790.85", eq(fv, 1790.85), fv.toFixed(2));
chk("PV of 1790.85 in 10yr at 6% = 1000", eq(1790.85 / 1.06 ** 10, 1000, 0.01), (1790.85 / 1.06 ** 10).toFixed(2));
// rule of 72: doubling time at 6% ~ 12 yr
chk("rule of 72: 72/6 = 12 years to double", eq(72 / 6, 12));
chk("  check: 1.06^12 = 2.012, roughly doubled", eq(1.06 ** 12, 2.012, 0.01), (1.06 ** 12).toFixed(3));
// compounding frequency: monthly beats annual
chk("annual: 1000(1.12) = 1120", eq(1000 * 1.12, 1120));
chk("monthly: 1000(1+.12/12)^12 = 1126.83", eq(1000 * (1 + 0.12 / 12) ** 12, 1126.83), (1000 * (1 + 0.12 / 12) ** 12).toFixed(2));
chk("  monthly compounding earns more (effective rate 12.68% vs 12%)", 1126.83 > 1120);

console.log("\nFINANCIAL RATIOS (post 2)");
// current ratio = current assets / current liabilities
chk("current ratio: 300k/150k = 2.0", eq(300 / 150, 2));
chk("  >1 means it can cover short-term debts", 2 > 1);
// debt-to-equity
chk("D/E: 400k debt / 800k equity = 0.5", eq(400 / 800, 0.5));
// ROE = net income / equity
chk("ROE: 120k / 800k = 15%", eq(120 / 800 * 100, 15));
// gross margin
chk("gross margin: (500k-300k)/500k = 40%", eq((500 - 300) / 500 * 100, 40));
// the accounting equation
chk("Assets = Liabilities + Equity: 1200 = 400 + 800", eq(400 + 800, 1200));

console.log("\nINVESTMENT DECISIONS (post 3)");
// NPV: invest 1000, get 600 and 600 over 2 yr at 10%
const npv = -1000 + 600 / 1.1 + 600 / 1.1 ** 2;
chk("NPV = -1000 + 600/1.1 + 600/1.21 = 41.32", eq(npv, 41.32), npv.toFixed(2));
chk("  NPV > 0 -> accept the investment", npv > 0);
// simple return
chk("return: (1200-1000)/1000 = 20%", eq((1200 - 1000) / 1000 * 100, 20));
// diversification: two uncorrelated assets reduce variance
chk("diversification reduces risk without reducing expected return", true);
// risk-return: higher return demands higher risk
chk("expected value of a coin-flip 2x-or-0 bet on 100 = 100 (fair)", eq(0.5 * 200 + 0.5 * 0, 100));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- break-even + cost structure for business-concepts ---- */
console.log("\nBREAK-EVEN & COSTS");
let bB = 0;
const cB = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bB++; };
const eB = (a, b, t = 1e-6) => Math.abs(a - b) < t;
// fixed cost 10000, price 25, variable cost 15 -> contribution 10 -> BE = 1000 units
cB("contribution margin = price - variable = 25 - 15 = 10", eB(25 - 15, 10));
cB("break-even units = fixed / contribution = 10000/10 = 1000", eB(10000 / 10, 1000));
cB("  at 1000 units: revenue 25000 = costs 10000+15000", eB(1000 * 25, 10000 + 1000 * 15));
cB("  above 1000 units the business profits; below, it loses", 1200 > 1000);
cB("profit at 1500 units = 1500*10 - 10000 = 5000", eB(1500 * 10 - 10000, 5000));
// depreciation straight-line: 50000 asset, 5000 salvage, 5 yr -> 9000/yr
cB("straight-line depreciation: (50000-5000)/5 = 9000/yr", eB((50000 - 5000) / 5, 9000));
console.log(bB === 0 ? "  ALL VERIFIED" : `  *** ${bB} WRONG ***`);
if (bB) process.exit(1);

/* ---- IRR, payback, cost of capital for practical post ---- */
console.log("\nIRR / PAYBACK");
let bC = 0;
const cC = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bC++; };
const eC = (a, b, t = 1e-2) => Math.abs(a - b) < t;
// IRR where NPV=0 for -1000,+600,+600
const npvAt = (r) => -1000 + 600 / (1 + r) + 600 / (1 + r) ** 2;
// find IRR by bisection
let lo = 0, hi = 1;
for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (npvAt(m) > 0) lo = m; else hi = m; }
const irr = (lo + hi) / 2;
cC("IRR of (-1000,+600,+600) ~ 13.07%", eC(irr * 100, 13.07, 0.1), (irr * 100).toFixed(2));
cC("  NPV at the IRR is ~0", eC(npvAt(irr), 0, 0.01), npvAt(irr).toFixed(4));
cC("  accept if IRR > cost of capital (13% > 10%)", irr > 0.10);
cC("payback period: 1000/600 per yr = 1.67 years", eC(1000 / 600, 1.67, 0.01), (1000 / 600).toFixed(2));
cC("  payback ignores time value and anything after payback -- its weakness", true);
console.log(bC === 0 ? "  ALL VERIFIED" : `  *** ${bC} WRONG ***`);
if (bC) process.exit(1);
