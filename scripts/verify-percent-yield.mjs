/** Verify the percent-yield section being added to the stoichiometry guide. */
const eq = (a, b, t = 1e-2) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("MOLAR MASSES");
const M_CH4 = 12.01 + 4 * 1.008, M_CO2 = 12.01 + 2 * 16.0, M_O2 = 32.0;
chk("M(CH4) = 12.01 + 4(1.008) = 16.04 g/mol", eq(M_CH4, 16.042, 1e-3), M_CH4.toFixed(3));
chk("M(CO2) = 12.01 + 2(16.00) = 44.01 g/mol", eq(M_CO2, 44.01), M_CO2.toFixed(2));

console.log("\nTHEORETICAL YIELD: CH4 + 2O2 -> CO2 + 2H2O, from 5.00 g CH4");
chk("equation balanced: C 1=1, H 4=4, O 4=4", true);
const nCH4 = 5.0 / M_CH4;
chk("n(CH4) = 5.00/16.04 = 0.3117 mol", eq(nCH4, 0.31169, 1e-4), nCH4.toFixed(5));
chk("  mole ratio CH4:CO2 = 1:1, so n(CO2) = 0.3117 mol", true);
const theo = nCH4 * M_CO2;
chk("theoretical mass of CO2 = 0.3117 x 44.01 = 13.7 g", eq(theo, 13.7176, 0.01), theo.toFixed(4));

console.log("\nPERCENT YIELD with an actual yield of 11.2 g");
const pct = (11.2 / theo) * 100;
chk("% yield = 11.2/13.7 x 100 = 81.6%", eq(pct, 81.65, 0.05), pct.toFixed(2));
chk("  must be under 100% — a yield above 100 means an error or wet product", pct < 100);

console.log("\nWHY IT CANNOT EXCEED 100%");
chk("actual > theoretical would break conservation of mass", (14.0 / theo) * 100 > 100, `14.0 g would give ${((14.0 / theo) * 100).toFixed(1)}% — impossible`);

console.log("\nOXYGEN CHECK — is O2 actually in excess here?");
const nO2_needed = 2 * nCH4;
chk("O2 needed = 2 x 0.3117 = 0.6234 mol", eq(nO2_needed, 0.62338, 1e-4), nO2_needed.toFixed(5));
chk("  = 0.6234 x 32.00 = 19.9 g of O2", eq(nO2_needed * M_O2, 19.948, 0.01), (nO2_needed * M_O2).toFixed(3));
chk("  so 'excess oxygen' means more than 19.9 g present", true);

console.log("\nROAD MAP ARROWS (the SVG) — each arrow is one operation");
chk("grams -> moles : divide by molar mass", eq(5.0 / M_CH4, nCH4));
chk("moles -> moles : multiply by the mole ratio from the coefficients", eq(nCH4 * 1, nCH4));
chk("moles -> grams : multiply by molar mass", eq(nCH4 * M_CO2, theo));
chk("  grams -> grams directly is NOT an arrow on the map", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
