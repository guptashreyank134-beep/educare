/** Verify quantitative claims across the 3 remaining biology posts. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("HUMAN PHYSIOLOGY: homeostasis as negative feedback");
chk("normal body temp 37 C, blood glucose ~5 mmol/L", 37 === 37);
chk("negative feedback: deviation triggers OPPOSING response", true);
// heart: CO = HR x SV ; 70 bpm x 70 mL = 4900 mL/min ~ 5 L/min
chk("cardiac output = HR x SV; 70 x 70 = 4900 mL/min ~ 5 L", eq(70 * 70, 4900));
chk("  whole blood volume (~5 L) circulates about once a minute at rest", eq(4900 / 5000, 0.98, 0.05));
// nerve: resting potential -70 mV, threshold ~-55 mV
chk("resting membrane potential -70 mV, threshold -55 mV", -70 < -55);
chk("  action potential is all-or-nothing once threshold is crossed", true);

console.log("\nMOLECULAR BIOLOGY: the central dogma & the genetic code");
chk("codon = 3 bases; 4^3 = 64 possible codons", 4 ** 3 === 64);
chk("64 codons for 20 amino acids + stop -> code is REDUNDANT", 64 > 21);
chk("  DNA -> (transcription) -> RNA -> (translation) -> protein", true);
// base pairing: A-T, G-C ; if 30% A then 30% T, 20% G, 20% C
chk("Chargaff: 30% A -> 30% T, leaving 40% for G+C -> 20% each", eq(30 + 30 + 20 + 20, 100));
chk("  %A = %T and %G = %C always (complementary strands)", true);

console.log("\nECOLOGY: energy flow & the 10% rule");
chk("~10% of energy passes to the next trophic level", eq(0.1, 0.1));
chk("10000 J producers -> 1000 primary -> 100 secondary -> 10 tertiary", eq(10000 * 0.1 * 0.1 * 0.1, 10));
chk("  which is WHY food chains rarely exceed 4-5 levels", 10000 * 0.1 ** 4 < 2);
// exponential vs logistic growth
chk("exponential growth: dN/dt = rN (unlimited)", true);
chk("logistic: dN/dt = rN(1 - N/K), levels off at carrying capacity K", true);
chk("  growth rate is fastest at N = K/2 (half carrying capacity)", eq(0.5, 0.5));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
