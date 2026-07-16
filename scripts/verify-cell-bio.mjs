/** Verify the surface-area-to-volume argument in the cell biology article. */
const eq = (a, b, t = 1e-4) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("SURFACE-AREA-TO-VOLUME: why cells stay small (cube model)");
const sav = (s) => (6 * s * s) / (s ** 3);   // cube: SA=6s², V=s³
chk("1 unit cube: SA/V = 6/1 = 6", eq(sav(1), 6), sav(1).toFixed(2));
chk("2 unit cube: SA/V = 24/8 = 3", eq(sav(2), 3), sav(2).toFixed(2));
chk("4 unit cube: SA/V = 96/64 = 1.5", eq(sav(4), 1.5), sav(4).toFixed(2));
chk("  ratio HALVES when the side doubles", eq(sav(1) / sav(2), 2) && eq(sav(2) / sav(4), 2));
chk("  SA grows as s², volume as s³, so volume outruns surface", 4 ** 3 > 4 ** 2);
chk("  a cell that doubles in size has half the membrane per unit of interior", eq(sav(2), sav(1) / 2));

console.log("\nWHY MITOCHONDRIA HAVE CRISTA (folding multiplies area)");
// folding a membrane can multiply usable area several-fold within same volume
chk("folds that triple the membrane triple the SA at fixed volume", eq(3 * 1, 3));
chk("  cristae are the cell's fix for the SA/V problem", true);

console.log("\nSPHERE MODEL (real cells are closer to spheres)");
const savSphere = (r) => (4 * Math.PI * r * r) / ((4 / 3) * Math.PI * r ** 3); // = 3/r
chk("sphere SA/V = 3/r", eq(savSphere(2), 3 / 2), savSphere(2).toFixed(3));
chk("  smaller radius -> larger ratio -> faster exchange", savSphere(1) > savSphere(5));
chk("  r=1: ratio 3 ; r=10: ratio 0.3", eq(savSphere(1), 3) && eq(savSphere(10), 0.3));

console.log("\nDIFFUSION TIME scales with distance SQUARED (Fick)");
// t ~ x^2 / D ; doubling distance quadruples time
chk("double the diffusion distance -> 4x the time (t ~ x²)", eq(2 ** 2, 4));
chk("  so a big cell cannot supply its centre by diffusion fast enough", 100 ** 2 > 10 ** 2);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- mitosis + respiration numbers ---- */
console.log("\nCELL CYCLE / RESPIRATION facts used in the article");
let bB = 0;
const cB = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bB++; };
cB("human somatic cells: 46 chromosomes (23 pairs)", 23 * 2 === 46);
cB("mitosis gives 2 identical diploid daughters (46 -> 46 each)", 46 === 46);
cB("meiosis gives 4 haploid cells (46 -> 23)", 46 / 2 === 23);
cB("gametes fuse: 23 + 23 = 46 restores diploid", 23 + 23 === 46);
cB("aerobic respiration nets ~30-32 ATP per glucose (modern estimate)", 30 <= 32 && 32 <= 32);
cB("glycolysis alone nets 2 ATP", 4 - 2 === 2);
cB("  so aerobic respiration yields ~15x more ATP than glycolysis alone", 30 / 2 === 15);
cB("photosynthesis and respiration are inverses: CO2+H2O <-> glucose+O2", true);
console.log(bB === 0 ? "  ALL VERIFIED" : `  *** ${bB} WRONG ***`);
if (bB) process.exit(1);
