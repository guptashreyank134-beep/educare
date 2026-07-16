/** Verify advanced finance math: WACC, DCF, bonds, options, portfolio. */
const eq = (a, b, t = 1e-2) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("VALUATION (post 1: BCom/MBA)");
// WACC = (E/V)*re + (D/V)*rd*(1-t) ; E=600,D=400,V=1000,re=12%,rd=6%,t=25%
const wacc = (600 / 1000) * 0.12 + (400 / 1000) * 0.06 * (1 - 0.25);
chk("WACC = 0.6(12%) + 0.4(6%)(0.75) = 9.0%", eq(wacc * 100, 9.0), (wacc * 100).toFixed(2));
// Gordon growth: V = D1/(r-g) ; D1=2, r=10%, g=4%
chk("Gordon growth model: V = 2/(0.10-0.04) = 33.33", eq(2 / (0.10 - 0.04), 33.33), (2 / (0.10 - 0.04)).toFixed(2));
// DCF perpetuity: FCF=100, r=9% -> V=1111
chk("perpetuity value FCF/r = 100/0.09 = 1111", eq(100 / 0.09, 1111.11, 0.5), (100 / 0.09).toFixed(0));

console.log("\nFIXED INCOME (post 2: CFA)");
// bond price: coupon 5% on 1000, 3 yr, yield 6%
const price = 50 / 1.06 + 50 / 1.06 ** 2 + 1050 / 1.06 ** 3;
chk("bond (5% coupon, 6% yield, 3yr) = 973.27 (trades at discount)", eq(price, 973.27, 0.5), price.toFixed(2));
chk("  yield > coupon -> price BELOW par (discount bond)", price < 1000);
// inverse price-yield
chk("if yield were 4% (< coupon), price above par", (50 / 1.04 + 50 / 1.04 ** 2 + 1050 / 1.04 ** 3) > 1000);
// Sharpe ratio: (return - rf)/sigma ; (12-3)/15 = 0.6
chk("Sharpe ratio = (12%-3%)/15% = 0.6", eq((12 - 3) / 15, 0.6));

console.log("\nQUANT/DERIVATIVES (post 3: MSc/PhD)");
// call option payoff at expiry: max(S-K,0) ; S=120,K=100 -> 20
chk("call payoff max(S-K,0): S=120,K=100 -> 20", eq(Math.max(120 - 100, 0), 20));
chk("call payoff when S=80 < K=100 -> 0", eq(Math.max(80 - 100, 0), 0));
// put payoff max(K-S,0)
chk("put payoff max(K-S,0): S=80,K=100 -> 20", eq(Math.max(100 - 80, 0), 20));
// portfolio variance with correlation: two assets reduce risk
// sigma_p^2 = w1^2 s1^2 + w2^2 s2^2 + 2 w1 w2 rho s1 s2 ; equal weights, s=20%, rho=0
const vp = 0.25 * 0.04 + 0.25 * 0.04 + 0; // rho=0
chk("2 assets, equal weight, sigma 20%, rho 0 -> port sigma 14.1%", eq(Math.sqrt(vp) * 100, 14.14, 0.1), (Math.sqrt(vp) * 100).toFixed(2));
chk("  < 20% each: diversification cut risk (rho<1)", Math.sqrt(vp) < 0.20);
// with rho=1 no benefit
chk("if rho=1, port sigma = 20% (no benefit)", eq(Math.sqrt(0.25 * 0.04 + 0.25 * 0.04 + 2 * 0.5 * 0.5 * 1 * 0.2 * 0.2) * 100, 20));
console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
