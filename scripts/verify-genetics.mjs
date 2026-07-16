/** Verify the genetics & evolution article: Punnett ratios and Hardy-Weinberg. */
const eq = (a, b, t = 1e-9) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("MONOHYBRID CROSS Aa x Aa");
// genotypes: 1 AA : 2 Aa : 1 aa ; phenotypes 3 dominant : 1 recessive
chk("genotype ratio 1:2:1 sums to 4", 1 + 2 + 1 === 4);
chk("phenotype ratio 3:1 (dominant:recessive)", (1 + 2) === 3 && 1 === 1);
chk("probability of recessive phenotype = 1/4 = 0.25", eq(1 / 4, 0.25));
chk("probability of carrier (Aa) = 1/2", eq(2 / 4, 0.5));

console.log("\nDIHYBRID CROSS AaBb x AaBb");
// classic 9:3:3:1
chk("9:3:3:1 sums to 16", 9 + 3 + 3 + 1 === 16);
chk("both dominant = 9/16", eq(9 / 16, 0.5625), (9 / 16).toFixed(4));
chk("both recessive = 1/16", eq(1 / 16, 0.0625));
chk("  = product of two independent 3:1 crosses: (3/4)(3/4)=9/16", eq((3 / 4) * (3 / 4), 9 / 16));
chk("  independent assortment is just multiplying probabilities", eq((1 / 4) * (1 / 4), 1 / 16));

console.log("\nHARDY-WEINBERG: p² + 2pq + q² = 1");
// if q^2 = 0.16 (recessive phenotype freq), q=0.4, p=0.6
const q2 = 0.16, q = Math.sqrt(q2), p = 1 - q;
chk("q = sqrt(0.16) = 0.4", eq(q, 0.4), q.toFixed(2));
chk("p = 1 - q = 0.6", eq(p, 0.6), p.toFixed(2));
chk("p + q = 1 (allele frequencies sum to 1)", eq(p + q, 1));
chk("p² (homozygous dominant) = 0.36", eq(p * p, 0.36), (p * p).toFixed(4));
chk("2pq (heterozygous carriers) = 0.48", eq(2 * p * q, 0.48), (2 * p * q).toFixed(4));
chk("q² (recessive) = 0.16", eq(q * q, 0.16));
chk("  all three genotype freqs sum to 1", eq(p * p + 2 * p * q + q * q, 1));
chk("  carriers (0.48) OUTNUMBER affected (0.16) 3:1 — the key public-health point", eq(0.48 / 0.16, 3));

console.log("\nSEX-LINKED: colour blindness, carrier mother x normal father");
// X^A X^a  x  X^A Y  ->  sons: 1/2 affected ; daughters: 1/2 carriers, 0 affected
chk("half of SONS affected (get the X^a)", eq(1 / 2, 0.5));
chk("zero daughters affected (father gives X^A)", 0 === 0);
chk("  explains why X-linked recessive traits appear mostly in males", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);

/* ---- codominance (ABO blood) + incomplete dominance ---- */
console.log("\nABO BLOOD TYPE: codominance, cross I^A i x I^B i");
let bC = 0;
const cC = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bC++; };
const eC = (a, b) => Math.abs(a - b) < 1e-9;
// offspring: I^A I^B (AB), I^A i (A), I^B i (B), ii (O) -> 1:1:1:1
cC("four offspring genotypes equally likely -> 1:1:1:1", eC(1 / 4, 0.25));
cC("  produces all four blood types A, B, AB, O from two heterozygous parents", 4 === 4);
cC("  AB is codominant: BOTH alleles expressed, not blended", true);
// incomplete dominance: red x white snapdragon -> all pink, then pink x pink -> 1 red:2 pink:1 white
cC("incomplete dominance Rr x Rr -> 1:2:1 red:pink:white (genotype = phenotype)", 1 + 2 + 1 === 4);
cC("  1/2 of offspring are the intermediate (pink)", eC(2 / 4, 0.5));
cC("  differs from Mendelian: here you CAN read genotype from phenotype", true);
console.log(bC === 0 ? "  ALL VERIFIED" : `  *** ${bC} WRONG ***`);
if (bC) process.exit(1);
