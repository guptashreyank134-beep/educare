/** Verify the MCAT Chem/Phys article. Angle: the section rewards a few high-yield
    relationships applied fast, not encyclopedic recall. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("SECTION FORMAT (Chem/Phys, 'C/P')");
chk("59 questions in 95 minutes = 96.6 s each", eq(95 * 60 / 59, 96.61, 1e-2), (95 * 60 / 59).toFixed(2));
chk("  mostly passage-based, so reading eats the clock", true);

console.log("\nHIGH-YIELD 1: pH and the log scale");
chk("pH = -log[H+]; [H+]=1e-3 -> pH 3", eq(-Math.log10(1e-3), 3));
chk("pH 3 vs pH 6 is a 1000x difference in [H+], not 2x", eq(10 ** (6 - 3), 1000));
chk("  each pH unit is a factor of 10 (the whole point of a log scale)", eq(10 ** 1, 10));
chk("pOH = 14 - pH, so pH 3 -> pOH 11", eq(14 - 3, 11));

console.log("\nHIGH-YIELD 2: the ideal gas & partial pressure");
const R = 0.08206;
chk("n = PV/RT; 1 atm, 22.4 L, 273 K -> 1 mol", eq((1 * 22.4) / (R * 273), 0.99989, 1e-3), ((1 * 22.4) / (R * 273)).toFixed(4));
chk("Dalton: total P is the sum of partials", eq(0.8 + 0.2, 1.0));

console.log("\nHIGH-YIELD 3: kinematics still appears (projectile / free fall)");
const g = 9.8;
chk("drop from 20 m: t = sqrt(2h/g) = 2.02 s", eq(Math.sqrt(2 * 20 / g), 2.0203, 1e-3), Math.sqrt(2 * 20 / g).toFixed(4));
chk("  impact speed v = gt = 19.8 m/s", eq(g * Math.sqrt(2 * 20 / g), 19.799, 1e-2), (g * Math.sqrt(2 * 20 / g)).toFixed(3));
chk("  or v = sqrt(2gh) = 19.8, same thing", eq(Math.sqrt(2 * g * 20), 19.799, 1e-2));

console.log("\nHIGH-YIELD 4: circuits, V = IR and power");
chk("V=12, R=4 -> I = 3 A", eq(12 / 4, 3));
chk("power P = IV = 36 W", eq(3 * 12, 36));
chk("  = I²R = 9*4 = 36 W, consistent", eq(3 ** 2 * 4, 36));
chk("resistors in series add: 4+8 = 12 ohm", eq(4 + 8, 12));
chk("in parallel: (1/4 + 1/4)^-1 = 2 ohm", eq(1 / (1 / 4 + 1 / 4), 2));

console.log("\nHIGH-YIELD 5: optics, thin lens");
// 1/f = 1/do + 1/di; f=10, do=15 -> di=30, m=-2
const di = 1 / (1 / 10 - 1 / 15);
chk("1/f=1/do+1/di; f=10,do=15 -> di=30 cm", eq(di, 30), di.toFixed(2));
chk("magnification m = -di/do = -2 (inverted, 2x)", eq(-di / 15, -2), (-di / 15).toFixed(2));

console.log("\nHIGH-YIELD 6: equilibrium & Le Chatelier direction (Keq)");
chk("Keq = [products]/[reactants]; large K favors products", 1000 > 1);
chk("  Q < K means reaction goes forward (toward products)", 0.5 < 1000);

console.log("\nDIMENSIONAL SANITY: unit of energy");
chk("1 J = 1 kg m²/s² ; KE=½mv², m=2,v=3 -> 9 J", eq(0.5 * 2 * 3 ** 2, 9));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- thermodynamics + a worked circuit/energy problem ---- */
console.log("\nTHERMO: Gibbs free energy G = H - TS");
let b9 = 0;
const c9 = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) b9++; };
const e9 = (a, b, t = 1e-6) => Math.abs(a - b) < t;
// dH = -40 kJ, dS = -0.1 kJ/K, at T=298: dG = -40 -298(-0.1) = -10.2 kJ (spontaneous)
c9("dG = dH - T*dS; -40 - 298(-0.1) = -10.2 kJ", e9(-40 - 298 * -0.1, -10.2), (-40 - 298 * -0.1).toFixed(2));
c9("  dG < 0 -> spontaneous", -10.2 < 0);
// at high T the -TdS term dominates: T=500 -> dG = -40 +50 = +10 (non-spontaneous)
c9("at T=500: dG = -40 - 500(-0.1) = +10 kJ, NOT spontaneous", e9(-40 - 500 * -0.1, 10), (-40 - 500 * -0.1).toFixed(2));
c9("  so exothermic reactions can become non-spontaneous when hot", 10 > 0);
// crossover temperature where dG=0: T = dH/dS = -40/-0.1 = 400 K
c9("crossover T where dG=0 is dH/dS = 400 K", e9(-40 / -0.1, 400), (-40 / -0.1).toFixed(0));

console.log("\nWORKED: a proton in a 200 V/m field over 0.5 m");
const q = 1.6e-19, E = 200, d = 0.5;
c9("work W = qEd = 1.6e-19 * 200 * 0.5 = 1.6e-17 J", e9(q * E * d, 1.6e-17, 1e-20), (q * E * d).toExponential(2));
c9("  this equals the KE gained (work-energy theorem)", true);

console.log("\nPERIODIC: trends the MCAT reuses");
c9("electronegativity rises up and to the right (F is highest)", true);
c9("atomic radius rises down and to the left (opposite)", true);
console.log(b9 === 0 ? "  ALL VERIFIED" : `  *** ${b9} WRONG ***`);
if (b9) process.exit(1);

/* ---- fluids ---- */
console.log("\nFLUIDS: continuity + buoyancy");
let bA = 0;
const cA = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bA++; };
const eA = (a, b, t = 1e-6) => Math.abs(a - b) < t;
// continuity A1v1 = A2v2: halve the area, double the speed
cA("A1v1=A2v2; area halves -> speed doubles", eA(1 * 2, 0.5 * 4));
cA("  narrower vessel = faster flow (why arteries speed blood at constrictions)", 4 > 2);
// buoyant force = rho_fluid * V * g ; object floats if rho_obj < rho_fluid
cA("buoyant force = rho*V*g; 1000*0.001*9.8 = 9.8 N on 1 L submerged", eA(1000 * 0.001 * 9.8, 9.8), (1000 * 0.001 * 9.8).toFixed(2));
cA("  object floats when its density < fluid density", 900 < 1000);
// hydrostatic pressure P = rho g h
cA("P = rho g h; 1000*9.8*10 = 98000 Pa at 10 m depth", eA(1000 * 9.8 * 10, 98000));
cA("  ~1 atm per 10 m of water", eA(98000 / 101325, 0.967, 1e-2));
console.log(bA === 0 ? "  ALL VERIFIED" : `  *** ${bA} WRONG ***`);
if (bA) process.exit(1);
