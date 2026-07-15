/**
 * Numerically verify every calculation used in the remaining flagship articles,
 * before any of it is written. A tutoring article with wrong maths is worse
 * than no article.
 *
 * Usage: node scripts/verify-flagship-math.mjs
 */
const g = 9.8;
let bad = 0;
const eq = (a, b, t = 0.01) => Math.abs(a - b) < t;
const chk = (name, cond, val) => {
  console.log((cond ? "  PASS  " : "  FAIL  ") + name + (val !== undefined ? `  => ${val}` : ""));
  if (!cond) bad++;
};

console.log("PHYSICS 12");
// Worked: flat curve, mass cancels
const mu = (v, r) => (v * v) / (r * g);
chk("worked: v=15, r=50 -> mu = v^2/(rg)", eq(mu(15, 50), 0.459), mu(15, 50).toFixed(3));
chk("  mass cancels: (mv^2/r)/(mg) identical for m=1200", eq((1200 * 225 / 50) / (1200 * g), mu(15, 50)));
// Worked: projectile range
const range = (v0, deg) => (v0 * v0 * Math.sin(2 * deg * Math.PI / 180)) / g;
chk("worked: 20 m/s @ 30deg range", eq(range(20, 30), 35.35), range(20, 30).toFixed(2) + " m");
// Practice
chk("P1: v=20, r=80 -> mu", eq(mu(20, 80), 0.510), mu(20, 80).toFixed(3));
chk("P2: 25 m/s @ 40deg range", eq(range(25, 40), 62.81), range(25, 40).toFixed(2) + " m");
chk("P3: frictionless incline 30deg -> a = g sin(theta)", eq(g * Math.sin(30 * Math.PI / 180), 4.9), (g * Math.sin(Math.PI / 6)).toFixed(2) + " m/s^2");

console.log("\nCHEMISTRY 11 — STOICHIOMETRY");
const M = { CH4: 16.04, CO2: 44.01, H2: 2.016, O2: 32.00, H2O: 18.02, N2: 28.02, NH3: 17.03 };
// Worked: 32.0 g CH4 -> CO2 (1:1)
const nCH4 = 32.0 / M.CH4;
chk("worked: 32.0 g CH4 -> mol", eq(nCH4, 1.995), nCH4.toFixed(3));
chk("  -> g CO2 (1:1)", eq(nCH4 * M.CO2, 87.8, 0.1), (nCH4 * M.CO2).toFixed(1) + " g");
// Worked: limiting reactant 4.0 g H2 + 32.0 g O2
const nH2 = 4.0 / M.H2, nO2 = 32.0 / M.O2;
chk("worked: H2 limiting (needs " + (nH2 / 2).toFixed(3) + " mol O2, have " + nO2.toFixed(3) + ")", nH2 / 2 < nO2);
chk("  -> g H2O (2:2)", eq(nH2 * M.H2O, 35.75, 0.1), (nH2 * M.H2O).toFixed(2) + " g");
// Practice
const nH2b = 5.0 / M.H2;
chk("P1: 5.00 g H2 -> g H2O (2:2, excess O2)", eq(nH2b * M.H2O, 44.70, 0.05), (nH2b * M.H2O).toFixed(2) + " g");
const nN2 = 10.0 / M.N2, nH2c = 5.0 / M.H2;
chk("P2: N2 + 3H2 -> 2NH3; N2 limiting? needs " + (3 * nN2).toFixed(2) + " mol H2, have " + nH2c.toFixed(2), 3 * nN2 < nH2c);
chk("  -> g NH3 (1 N2 : 2 NH3)", eq(2 * nN2 * M.NH3, 12.16, 0.05), (2 * nN2 * M.NH3).toFixed(2) + " g");

console.log("\nUBC CALCULUS");
const d = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
chk("worked: d/dx sin(x^2) = 2x cos(x^2)", eq(d(x => Math.sin(x * x), 1.3), 2 * 1.3 * Math.cos(1.69), 1e-4));
chk("worked: d/dx x^2 e^{3x} = e^{3x}(2x+3x^2)", eq(d(x => x * x * Math.exp(3 * x), 0.7), Math.exp(2.1) * (1.4 + 3 * 0.49), 1e-3));
chk("worked: lim x->2 (x^2-4)/(x-2) = 4", eq((2.000001 ** 2 - 4) / (2.000001 - 2), 4, 1e-3));
chk("worked: ladder x=3,y=4, dx/dt=0.5 -> dy/dt = -0.375", eq(-(3 / 4) * 0.5, -0.375), "-0.375 m/s");
// Practice
chk("P1: d/dx sin(3x^2) = 6x cos(3x^2)", eq(d(x => Math.sin(3 * x * x), 0.9), 6 * 0.9 * Math.cos(3 * 0.81), 1e-4));
chk("P2: lim x->3 (x^2-9)/(x-3) = 6", eq((3.000001 ** 2 - 9) / (3.000001 - 3), 6, 1e-3));
const dVdt = 4 * Math.PI * 25 * 2;
chk("P3: balloon dV/dt = 4*pi*r^2*dr/dt at r=5, dr/dt=2", eq(dVdt, 200 * Math.PI), dVdt.toFixed(1) + " cm^3/s (=200pi)");

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG — DO NOT PUBLISH ***`));
if (bad) process.exit(1);
