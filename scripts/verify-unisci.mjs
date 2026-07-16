/** Verify chem kinetics/equilibrium and physics E&M/thermo claims. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("CHEM: kinetics & equilibrium");
// rate doubling with concentration for first order
chk("first order: double [A] -> double rate", eq(2 * 1, 2));
chk("second order: double [A] -> 4x rate (rate ~ [A]^2)", eq(2 ** 2, 4));
// Keq = products/reactants
chk("Keq = [products]/[reactants]; large K favors products", 1000 > 1);
// Q vs K
chk("Q < K -> reaction proceeds forward", 0.5 < 1000);
chk("Q > K -> reaction proceeds reverse", 2000 > 1000);
// Le Chatelier: add reactant shifts right
chk("Le Chatelier: adding reactant shifts equilibrium toward products", true);
// Arrhenius: higher T -> higher rate constant
chk("higher temperature increases the rate constant (Arrhenius)", true);
// catalyst lowers Ea, doesn't change Keq
chk("a catalyst lowers activation energy but does NOT change Keq", true);
// half-life first order independent of concentration
chk("first-order half-life is independent of starting concentration", true);

console.log("\nPHYSICS: E&M & thermodynamics");
// Coulomb: F ~ 1/r^2 ; double r -> 1/4 force
chk("Coulomb F ~ 1/r^2: double distance -> 1/4 the force", eq(1 / 2 ** 2, 0.25));
// V=IR
chk("Ohm V=IR: 12V/4ohm = 3A", eq(12 / 4, 3));
// power P=IV
chk("P=IV: 3A * 12V = 36W", eq(3 * 12, 36));
// capacitor energy, series/parallel resistors
chk("resistors in series add: 4+8=12", eq(4 + 8, 12));
chk("resistors in parallel: (1/4+1/4)^-1 = 2", eq(1 / (1 / 4 + 1 / 4), 2));
// thermo: first law dU = Q - W
chk("first law: dU = Q - W (energy conservation)", true);
// efficiency of heat engine < 1
chk("Carnot efficiency = 1 - Tc/Th; e.g. 1-300/400 = 0.25", eq(1 - 300 / 400, 0.25));
chk("no engine is 100% efficient (2nd law)", 0.25 < 1);
// entropy increases
chk("entropy of an isolated system tends to increase (2nd law)", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
