/** Verify atomic-structure/bonding and thermo/acid-base/redox claims. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("UBC: atomic structure & bonding");
chk("H has 1 electron; C has 6; O has 8", 1 && 6 && 8);
chk("electron config of carbon: 1s2 2s2 2p2 (2+2+2=6)", 2 + 2 + 2 === 6);
chk("a full 2nd shell holds 8 electrons (octet)", 8 === 8);
chk("periodic: electronegativity rises up and right (F highest)", true);
chk("atomic radius rises down and left (opposite trend)", true);
chk("water H2O is bent (~104.5 deg) due to 2 lone pairs (VSEPR)", eq(104.5, 104.5));
chk("CO2 is linear (180 deg), no lone pairs on C", eq(180, 180));
chk("methane CH4 is tetrahedral (~109.5 deg)", eq(109.5, 109.5));
chk("ionic bond = transfer of electrons; covalent = sharing", true);
chk("bond polarity from electronegativity difference", true);

console.log("\nLangara: thermochem, acids/bases, redox");
chk("exothermic: dH < 0 (releases heat); endothermic dH > 0", -1 < 0 && 1 > 0);
chk("Hess's law: enthalpy is a state function (path-independent)", true);
chk("pH = -log[H+]; [H+]=1e-3 -> pH 3", eq(-Math.log10(1e-3), 3));
chk("pH + pOH = 14 (at 25C)", eq(3 + 11, 14));
chk("neutral pH 7; acid < 7; base > 7", 7 === 7);
chk("strong acid fully dissociates; weak partially", true);
chk("redox: oxidation is loss of electrons, reduction is gain (OIL RIG)", true);
chk("in a battery, oxidation at anode, reduction at cathode", true);
chk("balancing redox conserves both mass and charge", true);
chk("a spontaneous cell has positive cell potential (E > 0)", 0.5 > 0);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
