/** Verify every calculation in the gas laws article before writing. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const R = 0.08206;  // L·atm/(mol·K)

console.log("KELVIN — the conversion everything depends on");
chk("25°C = 298 K", eq(25 + 273.15, 298.15), (25 + 273.15).toFixed(2));
chk("0°C = 273.15 K (STP)", eq(0 + 273.15, 273.15));
chk("−273.15°C = 0 K, absolute zero", eq(-273.15 + 273.15, 0));

console.log("\nBOYLE: P1V1 = P2V2 — 2.0 L at 1.5 atm compressed to 3.0 atm");
const V2b = (1.5 * 2.0) / 3.0;
chk("V2 = 1.0 L", eq(V2b, 1.0), V2b.toFixed(4));
chk("  doubling the pressure halves the volume", eq(V2b, 2.0 / 2));

console.log("\nCHARLES: V1/T1 = V2/T2 — 500 mL at 25°C heated to 100°C");
const T1 = 25 + 273.15, T2 = 100 + 273.15;
const V2c = (500 * T2) / T1;
chk("T1 = 298.15 K, T2 = 373.15 K", eq(T1, 298.15) && eq(T2, 373.15));
chk("V2 = 626 mL", eq(V2c, 625.84, 0.5), V2c.toFixed(2));
const wrong = (500 * 100) / 25;
chk("  the Celsius trap gives 2000 mL — the classic wrong answer", eq(wrong, 2000), wrong.toFixed(0));
chk("  so Celsius overstates it by a factor of ~3.2", eq(wrong / V2c, 3.196, 0.01), (wrong / V2c).toFixed(3));

console.log("\nIDEAL GAS LAW: n = PV/RT — 5.00 L at 2.00 atm and 300 K");
const n1 = (2.0 * 5.0) / (R * 300);
chk("n = 0.406 mol", eq(n1, 0.4062, 1e-3), n1.toFixed(5));

console.log("\nMOLAR VOLUME AT STP (0°C, 1 atm)");
const Vm = (1 * R * 273.15) / 1.0;
chk("V = 22.4 L/mol", eq(Vm, 22.414, 0.01), Vm.toFixed(4));

console.log("\nGAS STOICHIOMETRY: Zn + 2HCl -> ZnCl2 + H2, from 5.00 g Zn at 25°C, 1.00 atm");
const nZn = 5.0 / 65.38;
chk("moles Zn = 5.00/65.38 = 0.0765 mol", eq(nZn, 0.07647, 1e-4), nZn.toFixed(5));
chk("  mole ratio Zn:H2 is 1:1, so n(H2) = 0.0765 mol", true);
const VH2 = (nZn * R * 298.15) / 1.0;
chk("V(H2) = nRT/P = 1.87 L", eq(VH2, 1.8712, 0.01), VH2.toFixed(4));
chk("  sanity: less than 22.4 L, as it must be for < 1 mol", VH2 < 22.414);
chk("  equation is balanced: Zn 1=1, H 2=2, Cl 2=2", true);

console.log("\nCOMBINED LAW: 2.0 L at 1.0 atm, 273 K  ->  2.0 atm, 546 K");
const V2comb = 2.0 * (1.0 / 2.0) * (546 / 273);
chk("V2 = 2.0 L — pressure and temperature cancel out", eq(V2comb, 2.0), V2comb.toFixed(4));

console.log("\nPRACTICE 1: balloon 4.0 L at 1.0 atm rises to 0.50 atm");
chk("V2 = 8.0 L", eq((1.0 * 4.0) / 0.5, 8.0));

console.log("\nPRACTICE 2: 1.50 L at 20.0°C cooled to −10.0°C");
const V2p = (1.5 * (-10 + 273.15)) / (20 + 273.15);
chk("V2 = 1.35 L", eq(V2p, 1.3466, 1e-3), V2p.toFixed(4));
chk("  cooling shrinks it, so V2 < V1", V2p < 1.5);

console.log("\nPRACTICE 3: CaCO3 -> CaO + CO2, from 10.0 g CaCO3 at STP");
const nCa = 10.0 / 100.09;
chk("M(CaCO3) = 40.08 + 12.01 + 3(16.00) = 100.09 g/mol", eq(40.08 + 12.01 + 3 * 16.0, 100.09));
chk("moles CaCO3 = 0.0999 mol", eq(nCa, 0.09991, 1e-4), nCa.toFixed(5));
const VCO2 = nCa * 22.414;
chk("V(CO2) at STP = 0.0999 x 22.4 = 2.24 L", eq(VCO2, 2.2394, 0.01), VCO2.toFixed(4));

console.log("\nSVG DATA: PV = 24 L·atm at fixed n and T");
const pts = [[1, 24], [2, 12], [3, 8], [4, 6], [6, 4], [8, 3], [12, 2]];
for (const [V, P] of pts) chk(`  V=${V} L, P=${P} atm  ->  PV = 24`, eq(P * V, 24), (P * V).toFixed(1));
console.log("  and P vs 1/V must be a straight line of slope 24:");
for (const [V, P] of pts) chk(`  1/V=${(1 / V).toFixed(4)}  ->  P/(1/V) = 24`, eq(P / (1 / V), 24));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- Dalton's law addition ---- */
console.log("\nDALTON: H2 collected over water at 25°C, total pressure 1.00 atm");
const R2 = 0.08206;
const eq2 = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad2 = 0;
const chk2 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad2++; };
const pH2O = 23.8 / 760;
chk2("water vapour pressure at 25°C = 23.8 mmHg = 0.0313 atm", eq2(pH2O, 0.031316, 1e-5), pH2O.toFixed(5));
const pH2 = 1.0 - pH2O;
chk2("P(H2) = 1.00 − 0.0313 = 0.969 atm", eq2(pH2, 0.96868, 1e-4), pH2.toFixed(5));
const nZn2 = 5.0 / 65.38;
const Vwet = (nZn2 * R2 * 298.15) / pH2;
chk2("redoing the Zn example at 0.969 atm gives V = 1.93 L", eq2(Vwet, 1.9316, 0.01), Vwet.toFixed(4));
chk2("  which is LARGER than the 1.87 L dry answer", Vwet > 1.8711, `+${(((Vwet / 1.8711) - 1) * 100).toFixed(1)}%`);
console.log(bad2 === 0 ? "  ALL VERIFIED" : `  *** ${bad2} WRONG ***`);
if (bad2) process.exit(1);
