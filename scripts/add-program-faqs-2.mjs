/**
 * Batch 2: add subject-specific FAQs to the remaining zero-FAQ program pages
 * (gmat-prep, gre-prep, ib-ap-tutoring, pre-calculus, python, finance) for
 * consistency + FAQPage schema. Guard checks new answers against EACH OTHER and
 * against every existing programPage FAQ already in Sanity, so we never create a
 * shared block (no two answers may share a 7-word run).
 */
import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-12",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});
const COMMIT = process.argv.includes("--commit");

const FAQS = {
  "gmat-prep": [
    ["Which GMAT sections do you tutor?", "All of them — Quantitative, Verbal, Data Insights and Analytical Writing — with most candidates needing the heaviest work on Quant reasoning and Data Insights, where the exam rewards logic over raw calculation."],
    ["How is the GMAT different from university math?", "It tests reasoning under time pressure far more than advanced content. Much of the Quant section yields to clever logic and estimation, so we train the shortcuts and common traps rather than grinding textbook problems."],
    ["How long should I prepare for the GMAT?", "Most candidates give it two to four months of steady work. We plan backwards from your test date and target score, front-loading the concepts and shifting to timed practice as the exam approaches."],
    ["Can you help me hit a specific score for MBA admissions?", "Yes — we begin from a diagnostic, fix the score your target programs expect, and concentrate study on the exact question types standing between you and it."],
    ["Is GMAT coaching done online?", "Yes — GMAT coaching is delivered online, so we work with candidates nationwide and overseas, with scheduling that flexes around the business schools you are targeting."],
  ],
  "gre-prep": [
    ["What does GRE tutoring cover?", "Quantitative Reasoning, Verbal Reasoning and Analytical Writing — with particular attention to GRE vocabulary and the unusual question formats that catch out strong students who never trained specifically for them."],
    ["How do I improve GRE Verbal and vocabulary?", "Vocabulary is learnable through a system rather than last-minute cramming. We build it steadily and pair it with the reading and text-completion technique the Verbal section actually rewards."],
    ["Is the GRE math section difficult?", "The content is high-school level, but the pressure and deliberate traps make it tricky. We concentrate on pacing, estimation and spotting the intended shortcut instead of heavy computation."],
    ["How long should I study for the GRE?", "Typically one to three months of consistent effort. We open with a diagnostic, set a target aligned to your programs, and structure practice tightly around your weak areas."],
    ["Do you offer online GRE coaching?", "Yes, the GRE coaching runs online, reaching students in Canada and internationally, with each plan paced to your target score and application deadlines."],
  ],
  "ib-ap-tutoring": [
    ["Which IB and AP subjects do you tutor?", "IB Mathematics — Analysis & Approaches and Applications & Interpretation, at SL and HL — IB sciences, and AP Calculus, Physics, Chemistry, Biology and Statistics, the higher-stakes courses where technique matters as much as content."],
    ["How is IB Math different from the BC curriculum?", "It is more rigorous and organised differently, with its own command terms and an Internal Assessment. We teach to how the IB actually marks work, not just the topics, so results follow real understanding."],
    ["Do you help with the IB Internal Assessment?", "Yes — from choosing a workable research question through the analysis and the write-up, so the IA becomes a reliable source of marks rather than a source of stress."],
    ["What is the difference between AP Calculus AB and BC?", "BC covers everything AB does plus series and extra techniques at a quicker pace. We map to your specific course and prepare for that exam's particular style and scoring."],
    ["Are IB and AP sessions online or in person?", "Both — you can meet in person in Burnaby or study online from anywhere in the wider Vancouver region, matched to the exact IB or AP course you take."],
  ],
  "pre-calculus": [
    ["What do Pre-Calculus 11 and 12 tutoring cover?", "Functions and transformations, trigonometry and identities, exponents and logarithms, and the algebra fluency that Calculus later assumes — the topics where a shaky foundation quietly causes trouble down the line."],
    ["My child was fine until Pre-Calculus 11 — why the sudden struggle?", "The pace and level of abstraction jump sharply here, and gaps from earlier grades tend to surface. We locate the exact missing pieces and rebuild them so the new material stops feeling impossible."],
    ["Is Pre-Calculus 12 important for university?", "Very — it is the direct on-ramp to Calculus and most STEM programs. A solid grasp of Pre-Calculus 12 is often what separates coping from struggling in first-year university math."],
    ["Can you help before a Pre-Calculus final or provincial?", "Yes — targeted review of the highest-weight topics with timed practice, so the exam holds no surprises and the mark reflects what your student genuinely knows."],
    ["Where do Pre-Calculus sessions take place?", "In person in Burnaby, or online for students throughout the region, delivered one-to-one and kept aligned to the BC Pre-Calculus curriculum."],
  ],
  python: [
    ["Is Python a good first programming language?", "Yes — its clean, readable syntax lets a beginner focus on problem-solving instead of fighting punctuation, which is why it is the usual starting point for students and career-changers alike."],
    ["What can Python be used for?", "A great deal — data analysis, automation, web backends, scripting and machine learning — so the skills you build carry straight into university courses and the job market."],
    ["Do you teach Python for data science?", "Yes — once the basics are solid we move into NumPy, pandas and the applied workflow behind analysing real datasets and drawing conclusions from them."],
    ["Can you help with university Python coursework?", "Yes — we support UBC, SFU and college assignments and projects, going through your actual program together so the ideas stick and the grade improves."],
    ["How are Python lessons delivered?", "Remotely for learners anywhere in the region, or face to face in Burnaby, and you spend the time writing real programs rather than sitting through a lecture."],
  ],
  finance: [
    ["What level of finance do you tutor?", "High-school and introductory business through university corporate finance, investments and financial accounting, up to professional exams — matched to whether you need the concepts or the exam technique."],
    ["Do you help with CFA or CSC preparation?", "Yes — structured, problem-focused preparation for the CFA levels and the CSC, tied firmly back to the underlying ideas so the material is understood rather than merely memorised."],
    ["I understand the theory but freeze on the calculations — can you help?", "Yes. Finance rewards knowing which formula a situation calls for and executing it cleanly under time pressure, and we rehearse exactly that until it becomes second nature."],
    ["Can you help BCom or MBA students with coursework?", "Yes — we support BCom, MBA and other university finance courses and assignments, breaking valuation, corporate finance and risk into steps a student can actually follow."],
    ["Are finance sessions available online?", "Yes — online for students across the Vancouver area and beyond, or in person in Burnaby, with each plan built around your specific course or exam."],
  ],
};

const shingles = (s, n = 7) => {
  const w = s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const out = new Set();
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(" "));
  return out;
};

// Flatten existing programPage FAQ answers (already in Sanity) to plain text.
const plain = (ans) => Array.isArray(ans)
  ? ans.map((b) => (b?.children || []).map((sp) => sp.text || "").join("")).join(" ")
  : typeof ans === "string" ? ans : "";
const existing = await c.fetch(`*[_type=="programPage" && count(faqs)>0]{ "a": faqs[].answer }`);
const existingTexts = existing.flatMap((d) => (d.a || []).map(plain)).filter(Boolean);
console.log(`Guarding against ${existingTexts.length} existing FAQ answers already in Sanity.`);

const neu = Object.entries(FAQS).flatMap(([slug, arr]) => arr.map(([q, a], i) => ({ slug, i, q, a })));
let clash = 0;
// new vs new
for (let x = 0; x < neu.length; x++) for (let y = x + 1; y < neu.length; y++) {
  const sa = shingles(neu[x].a), sb = shingles(neu[y].a);
  for (const sh of sa) if (sb.has(sh)) { console.error(`✗ NEW/NEW overlap "${sh}" — ${neu[x].slug}#${neu[x].i} vs ${neu[y].slug}#${neu[y].i}`); clash++; break; }
}
// new vs existing
const existShingles = existingTexts.map((t) => shingles(t));
for (const item of neu) {
  const sa = shingles(item.a);
  for (let e = 0; e < existShingles.length; e++) for (const sh of sa) if (existShingles[e].has(sh)) { console.error(`✗ NEW/EXISTING overlap "${sh}" — ${item.slug}#${item.i} vs existing answer`); clash++; break; }
}
if (clash) { console.error(`\n${clash} overlaps — reword before committing.`); process.exit(1); }
console.log(`✓ ${neu.length} new answers, 0 shared 7-word runs (new or existing)`);

const block = (slug, i, text) => ({ _key: `${slug}faq${i}b`, _type: "block", style: "normal", markDefs: [], children: [{ _key: `${slug}faq${i}s`, _type: "span", marks: [], text }] });
const toFaq = (slug, i, q, a) => ({ _key: `${slug}faq${i}`, question: q, answer: [block(slug, i, a)] });

console.log(`Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}`);
for (const [slug, arr] of Object.entries(FAQS)) {
  const doc = await c.fetch(`*[_type=="programPage" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, "n":count(faqs)}`, { s: slug });
  if (!doc?._id) { console.error(`✗ ${slug} not found`); process.exit(1); }
  if (doc.n) { console.log(`  ~ ${slug} already has ${doc.n} FAQs — skipping`); continue; }
  const faqs = arr.map(([q, a], i) => toFaq(slug, i, q, a));
  console.log(`  ${slug}: +${faqs.length} FAQs (~${arr.reduce((n, [, a]) => n + a.split(/\s+/).length, 0)} words)`);
  if (COMMIT) await c.patch(doc._id).set({ faqs }).commit();
}
if (COMMIT) {
  let bad = 0;
  for (const slug of Object.keys(FAQS)) { const n = await c.fetch(`count(*[_type=="programPage" && slug.current==$s][0].faqs)`, { s: slug }); if (!n) { console.error(`✗ ${slug} still 0`); bad++; } }
  console.log(bad ? `✗ ${bad} failed` : "✓ all live");
  process.exit(bad ? 1 : 0);
}
