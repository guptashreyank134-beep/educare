/**
 * "Genetics & Evolution" (418 -> 1,500+). Full rebuild from template.
 * Distinct from biology siblings: this one is probability made biological —
 * Punnett squares are multiplication, Hardy-Weinberg is bookkeeping.
 * Verified: scripts/verify-genetics.mjs. Sibling-overlap gate enforced.
 */
import { client, commit, verifyLatex, deadLinks, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "biology-genetics-evolution";

/* 9:3:3:1 dihybrid grid. Verified sums to 16. */
const cell = (x, y, txt, fill) => `<rect x="${x}" y="${y}" width="46" height="46" fill="${fill}" stroke="#FFFFFF" stroke-width="2"/><text x="${x + 23}" y="${y + 29}" font-size="13" fill="#1F2937" text-anchor="middle" font-weight="600">${txt}</text>`;
const gametes = ["AB", "Ab", "aB", "ab"];
// phenotype of combining two gametes -> colour by dominant/recessive pattern
const phen = (g1, g2) => {
  const A = g1[0] === "A" || g2[0] === "A";
  const B = g1[1] === "B" || g2[1] === "B";
  return A && B ? "#3A5A98" : A || B ? "#94A3B8" : "#F4E98B";
};
let grid = "";
gametes.forEach((g1, i) => gametes.forEach((g2, j) => {
  const geno = [g1[0], g2[0]].sort().join("") + [g1[1], g2[1]].sort().join("");
  grid += cell(70 + j * 46, 44 + i * 46, geno, phen(g1, g2) + "");
}));
gametes.forEach((g, j) => { grid += `<text x="${93 + j * 46}" y="38" font-size="12" fill="#3A5A98" text-anchor="middle" font-weight="700">${g}</text>`; });
gametes.forEach((g, i) => { grid += `<text x="60" y="${73 + i * 46}" font-size="12" fill="#3A5A98" text-anchor="middle" font-weight="700">${g}</text>`; });
const punnettSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 300 250" role="img" aria-label="A four by four Punnett square for a dihybrid cross A a B b by A a B b. Nine of the sixteen boxes show both dominant traits, three show the first dominant only, three show the second dominant only, and one shows both recessive — the classic nine to three to three to one ratio." style="width:100%;max-width:300px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    ${grid}
    <text x="150" y="242" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="600">9 : 3 : 3 : 1</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Every dihybrid cross gives the same 9:3:3:1 phenotype ratio, and you never need the grid to get it —
    it is just two independent 3:1 crosses multiplied: (3/4)(3/4) = 9/16 for both dominant.
  </figcaption>
</figure>`;

const body = [
  p("Genetics is where biology stops being descriptive and starts being mathematical, and that catches students off guard. It is not a topic to memorise. It is probability wearing a lab coat, and once you see the probability underneath, the Punnett squares and ratios stop being rules to recall and become arithmetic you can do."),
  p("Evolution then sits on top of genetics as its long-term consequence — change the frequencies of alleles in a population over generations and you have evolution, by definition. Treated together the way they actually connect, the two topics reinforce each other instead of doubling the memory load."),
  linked(["This is how we teach it in ", { text: "one-on-one biology tutoring", href: "/programs/biology" }, ": find the probability rule, and the biology follows."]),

  h2("A Punnett square is just multiplication"),
  p("Start with the monohybrid cross, the foundation everything else builds on. Cross two carriers of a trait, Aa × Aa, and the offspring come out in fixed proportions."),
  math(String.raw`\text{genotypes } 1\,AA : 2\,Aa : 1\,aa \qquad \text{phenotypes } 3 : 1`),
  p("A quarter show the recessive trait, three quarters the dominant. But the square is training wheels. What is really happening is that each parent contributes one allele at random — a coin flip — and the offspring is the combination of two independent flips. The 3:1 ratio is just the probability of getting at least one dominant allele from two tosses."),
  p("Once you hold that, the dihybrid cross — two traits at once — needs no giant grid at all."),
  { _type: "htmlBlock", _key: key(), html: punnettSvg },
  mp(["The famous 9:3:3:1 ratio is not a fact to memorise. It is two independent 3:1 crosses multiplied together. The probability of showing both dominant traits is ", im(String.raw`\tfrac{3}{4} \times \tfrac{3}{4} = \tfrac{9}{16}`), "; of both recessive, ", im(String.raw`\tfrac{1}{4} \times \tfrac{1}{4} = \tfrac{1}{16}`), ". Independent assortment — Mendel's second law — is precisely the statement that the two traits are independent events, so their probabilities multiply. A student who understands that can answer a three-trait question that no Punnett square on the page could hold."]),

  h2("Dominant does not mean common, and other traps"),
  p("The single most common misconception in genetics is that a dominant allele is more frequent or somehow stronger. It is neither. Dominant describes only which allele is expressed when both are present — it says nothing about how common the allele is in the population. Plenty of dominant alleles are rare; plenty of recessive ones are widespread. Keeping \"dominant\" as a rule about expression, not abundance, prevents a whole family of wrong answers."),
  p("Two more worth naming, because exams target them directly: heterozygous (Aa) is not a blend — the dominant trait shows fully, the recessive allele is simply carried silently. And genotype is the genes an organism has; phenotype is the trait you can see. Confusing the two turns an easy question into a lost one."),

  h2("Sex-linked traits, and why colour blindness runs in males"),
  p("Genes on the X chromosome follow their own pattern, and it produces one of the most satisfying results in the course. Because males have only one X, a single recessive allele on it is expressed — there is no second X to mask it. Females, with two X chromosomes, would need the recessive allele on both."),
  p("Cross a carrier mother with an unaffected father and the maths is stark: half the sons are affected, while no daughters are — they can only be carriers, because their father hands them his single healthy X. This is exactly why colour blindness, haemophilia and similar X-linked recessive conditions appear far more often in males, and the exam loves asking you to predict those proportions. It is the same probability reasoning as before, with one chromosome doing the deciding."),

  h2("When Mendel's rules bend: codominance and blending"),
  p("Simple dominant-recessive genetics is only the starting case, and the exam always tests the exceptions. Two matter most, and both are easy once you know what to look for."),
  mp(["Codominance means both alleles are fully expressed at once, neither masking the other. Human blood type is the classic example: cross an A-type carrier with a B-type carrier (", im(String.raw`I^A i \times I^B i`), ") and the four offspring genotypes are equally likely, producing all four blood types — A, B, AB and O — in a 1:1:1:1 ratio. The AB individual expresses both proteins together; that is codominance, not a blend."]),
  p("Incomplete dominance is the blend. A red snapdragon crossed with a white one gives all pink offspring, and crossing two pinks yields red, pink and white in a 1:2:1 ratio. The useful twist: here the phenotype reveals the genotype directly, because the heterozygote looks different from both homozygotes. Whenever a cross produces an intermediate, or three phenotypes in a 1:2:1 ratio, you are looking at incomplete dominance rather than the usual 3:1."),

  h2("Pedigrees: reading inheritance backwards"),
  p("A pedigree gives you a family tree with the traits marked and asks you to deduce the pattern of inheritance — it is genetics run in reverse, from outcomes to rules. The trick is a short checklist rather than guesswork. If two unaffected parents have an affected child, the trait must be recessive, because they were both silent carriers. If the trait appears in every generation, it is likely dominant. And if it strikes far more males than females, suspect X-linked recessive — the same single-X logic from earlier. Working through those three questions in order resolves most pedigree problems on an exam without any calculation at all."),

  h2("Hardy-Weinberg: bookkeeping for a whole population"),
  p("Here genetics scales up from a family to a population, and it looks intimidating until you see it is just accounting. If there are two alleles with frequencies p and q, then every individual is one of three genotypes, and the frequencies must add up:"),
  math(String.raw`p^2 + 2pq + q^2 = 1`),
  p("That is not a law of nature so much as a certainty of arithmetic — the three genotype frequencies are the only possibilities, so they sum to one. The power of it is that a single observable number unlocks all the rest."),
  mp(["Suppose 16% of a population shows a recessive condition. That is ", im(String.raw`q^2 = 0.16`), ", so ", im(String.raw`q = 0.4`), " and ", im(String.raw`p = 0.6`), ". Now everything follows: homozygous dominant ", im(String.raw`p^2 = 0.36`), ", and heterozygous carriers ", im(String.raw`2pq = 0.48`), "."]),
  p("And there is the insight the whole method exists to deliver: 48% of the population carries the allele while only 16% shows the condition. Carriers outnumber affected individuals three to one. That is why a recessive disease persists even when the affected are rare — most copies of the allele are hiding in healthy carriers, invisible to selection. A single percentage, run through one equation, produces a genuine piece of public-health reasoning."),

  h2("Evolution is genetics over time"),
  p("With allele frequencies in hand, evolution becomes almost obvious. Evolution is defined as a change in allele frequencies in a population across generations — nothing more mystical than that. The Hardy-Weinberg equation describes a population that is not evolving; the moment its assumptions break, frequencies shift, and that shift is evolution."),
  mli(["Natural selection: some genotypes survive and reproduce better, so their alleles become more common. This is the one everyone knows, but it is only one of several."]),
  mli(["Genetic drift: in a small population, allele frequencies wander by pure chance, the way a short run of coin flips can stray from 50:50. Small populations evolve partly at random."]),
  mli(["Gene flow: migration moves alleles between populations, blending them."]),
  mli(["Mutation: the ultimate source of every new allele, and therefore of all the variation the other forces act on."]),
  p("Framed this way, evolution is not a separate subject to learn after genetics — it is what genetics does when you let a population run for many generations. The exam rewards students who can name which of these forces a scenario describes, and they are distinguishable once you see them as different reasons allele frequencies change."),

  h2("Where genetics marks are actually lost"),
  mli(["Believing dominant means common or stronger. It means expressed, nothing else."]),
  mli(["Drawing giant Punnett squares instead of multiplying probabilities. The grid does not scale; the arithmetic does."]),
  mli(["Confusing genotype with phenotype, or heterozygous with a blend."]),
  mli(["Misreading Hardy-Weinberg — forgetting that q² is the recessive phenotype frequency, not q."]),
  mli(["Treating evolution as vague 'change over time' rather than the precise shifting of allele frequencies by nameable forces."]),

  h2("How to study genetics and evolution"),
  mli(["Do the probability, not the picture. For anything past one trait, multiply the separate probabilities rather than drawing squares."]),
  mli(["Write out what each symbol means before solving a Hardy-Weinberg problem — p, q, p², 2pq, q² — so you never mix up an allele frequency with a genotype frequency."]),
  mli(["Practise translating between genotype and phenotype in both directions until it is automatic."]),
  mli(["Learn the four forces of evolution by the kind of scenario that signals each, not as definitions to recite."]),

  h2("Getting help with genetics and evolution"),
  linked(["If genetics feels like a maze of ratios, the fix is to see the probability underneath — and that is a fast shift with the right guidance, because the same few rules generate every question. Our ", { text: "biology tutoring in Burnaby and online", href: "/programs/biology" }, " covers genetics and evolution from Grade 11 and 12 through first-year university."]),
  linked(["Sessions run in person in Burnaby or online across Metro Vancouver, aligned to the BC curriculum. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a problem set you are stuck on."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))].filter(Boolean);
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}\n  /blog/${SLUG}\n  words     : ${words}  (was 418)\n  equations : ${total} (${bad} invalid)\n  diagrams  : ${body.filter((b) => b._type === "htmlBlock").length}\n  links     : ${links.join(", ")}`);
  if (bad) { console.error("  ✗ LaTeX"); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ dead: ${dead.join(", ")}`); process.exit(1); }
  console.log(`  links ok  : all ${links.length} resolve ✓`);
  if (words < 1500) { console.error(`  ✗ under floor by ${1500 - words}`); process.exit(1); }
  const sibs = await client.fetch(`*[_type=="post" && slug.current in ["biology-cell-biology","biology-molecular-biology","biology-human-physiology","biology-ecology-biotechnology"]].body[].children[].text`);
  const sh = (s) => { const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/); const o = new Set(); for (let i = 0; i + 7 <= w.length; i++) o.add(w.slice(i, i + 7).join(" ")); return o; };
  const a = sh(text), b = sh((sibs || []).join(" "));
  const shared = [...a].filter((x) => b.has(x)).length;
  console.log(`  vs siblings: ${((shared / Math.min(a.size, b.size || 1)) * 100).toFixed(2)}% overlap`);
  if (shared / Math.min(a.size, b.size || 1) > 0.03) { console.error("  ✗ too similar to siblings"); process.exit(1); }
  const doc = await client.fetch(`*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ not found"); process.exit(1); }
  if (commit) { await client.patch(doc._id).set({ body }).commit(); console.log("  ✓ upgraded (live)"); }
  else console.log("\nRe-run with --commit to apply.");
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
