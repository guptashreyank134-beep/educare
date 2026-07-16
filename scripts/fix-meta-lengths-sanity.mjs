/**
 * Shorten over-length metaTitle (>580px) / metaDescription (>1000px) on Sanity
 * page + post docs, per the Seobility 07/16 crawl. The post titles also cleared
 * the "word repetition" flag (subject named twice). Verifies current value
 * exists, new value is under budget, patches metaData, and reads back.
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

function wu(s) {
  let u = 0;
  for (const ch of s) {
    if ("iIl.,:;'|!jft".includes(ch)) u += 0.34;
    else if ("mwMW—".includes(ch)) u += 0.92;
    else if (ch === " ") u += 0.3;
    else if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) u += 0.7;
    else u += 0.55;
  }
  return u;
}
const tS = 704 / wu("Math Tutor in Burnaby | Physics, Chemistry & Coding — Dr. Shreyank Educare");
const dS = 1065 / wu("Dr. Shreyank Educare offers 1-on-1 tutoring, small group classes, online sessions & intensive exam prep in Burnaby. Flexible scheduling. Book a free 30-minute consultation.");
const tp = (s) => Math.round(wu(s) * tS);
const dp = (s) => Math.round(wu(s) * dS);

// { type, slug, t?, d? }
const R = [
  { type: "page", slug: "services", d: "Dr. Shreyank Educare: 1-on-1 tutoring, small-group classes, online sessions & intensive exam prep in Burnaby. Flexible scheduling. Free consultation." },

  // Post titles (also clears the "word repetition" flag)
  { type: "post", slug: "javascript-dom-manipulation", t: "JavaScript DOM Manipulation | Dr. Shreyank Educare" },
  { type: "post", slug: "mandarin-grammar-listening-cultural-understanding", t: "Mandarin Grammar, Listening & Cultural Understanding" },
  { type: "post", slug: "french-conversational-french-pronunciation", t: "Conversational French & Pronunciation | Dr. Shreyank" },
  { type: "post", slug: "university-mathematics-statistics-ubc-stat-200-203-241-251", t: "UBC Statistics Tutor | STAT 200/203/241/251" },
  { type: "post", slug: "ib-ap-tutoring-ap-chemistry-biology", t: "AP Chemistry & Biology Tutoring | Dr. Shreyank Educare" },
  { type: "post", slug: "university-finance-bcom-mba-finance", t: "BCom & MBA Finance Tutoring | Dr. Shreyank Educare" },
  { type: "post", slug: "physics-kinematics-dynamics", t: "Kinematics & Dynamics | Dr. Shreyank Educare" },
  { type: "post", slug: "chemistry-physical-chemistry", t: "Physical Chemistry Tutoring | Dr. Shreyank Educare" },
  { type: "post", slug: "french-reading-writing-listening-practice", t: "French Reading, Writing & Listening Practice" },
  { type: "post", slug: "university-chemistry-langara-college-chemistry-chem-1114-1118-1120", t: "Langara Chemistry Tutor | CHEM 1114/1118/1120" },
  { type: "post", slug: "chemistry-organic-chemistry", t: "Organic Chemistry Tutoring | Dr. Shreyank Educare" },
  { type: "post", slug: "web-development-database-management-mongodb-firebase", t: "Database Management: MongoDB & Firebase | Web Dev" },
  { type: "post", slug: "university-mathematics-linear-algebra-langara-math-2362", t: "Linear Algebra Tutor | Langara MATH 2362" },
  { type: "post", slug: "french-grammar-vocabulary-sentence-formation", t: "French Grammar, Vocabulary & Sentence Formation" },
  { type: "post", slug: "gre-prep-verbal-vocabulary-systems", t: "GRE Verbal & Vocabulary Systems | Dr. Shreyank Educare" },
  { type: "post", slug: "ib-ap-tutoring-ib-mathematics-applications-interpretation", t: "IB Math: Applications & Interpretation (SL & HL)" },
  { type: "post", slug: "ib-ap-tutoring-ap-calculus-ab-bc", t: "AP Calculus AB & BC Tutoring | Dr. Shreyank Educare" },

  // Post descriptions
  { type: "post", slug: "vancouver-math-tutoring-high-school-math-grades-8-12", d: "One-on-one high-school math tutoring in Vancouver & Burnaby for Grades 8–12 — Foundations, Pre-Calc 11/12, Calculus, IB & AP. Build top grades." },
  { type: "post", slug: "biology-cell-biology", d: "Cell biology as mechanism, not memorisation: structure, membranes, transport and division, plus the mistakes that cost marks. PhD-led tutoring." },
  { type: "post", slug: "web-development-frontend-development-html-css-react", d: "Frontend development with HTML, CSS and React is an in-demand skill. This guide shows how the pieces fit and how to learn them in the right order." },
  { type: "post", slug: "mcat-prep-chemistry-physics", d: "MCAT chemistry and physics prep: concepts worth mastering, ones to skim, and how to practise for a test that rewards reasoning over recall. MD-led." },
  { type: "post", slug: "chemistry-physical-chemistry", d: "Physical chemistry links chemistry with physics and math — thermodynamics, kinetics and equilibrium. A clear overview, common pitfalls, and study tips." },
  { type: "post", slug: "ib-ap-tutoring-ib-mathematics-analysis-approaches-sl-hl", d: "IB Math Analysis & Approaches (SL & HL): what it covers, the pitfalls, and how to prepare — including the IA. PhD-led tutoring." },
  { type: "post", slug: "chemistry-chemical-reactions-bonding", d: "Chemical bonding and reactions are the core of chemistry. This guide explains bond types, reaction categories, common mistakes, and how to study them." },
  { type: "post", slug: "computer-science-data-structures-algorithms", d: "Data structures and algorithms are the core of computer science. This guide covers the essentials, common mistakes, and how to build problem-solving skill." },
  { type: "post", slug: "how-much-does-math-tutoring-cost-burnaby", d: "Real tutoring rates in Burnaby: one-on-one $75–$100/hr, monthly from $185. What the market charges, what's included, and when it's not worth it." },
  { type: "post", slug: "biology-human-physiology", d: "Human physiology is detail-heavy but rewarding, especially for pre-med. This guide covers the body's systems, common mistakes, and how to study them." },
];

let fail = false;
const patches = [];
for (const r of R) {
  const doc = await c.fetch(
    `*[_type==$t && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, "t":metaData.metaTitle, "d":metaData.metaDescription}`,
    { t: r.type, s: r.slug }
  );
  if (!doc?._id) { console.error(`✗ ${r.type}/${r.slug}: not found`); fail = true; continue; }
  const set = {};
  if (r.t) {
    const px = tp(r.t);
    if (px > 580) { console.error(`✗ ${r.slug} title ${px}px still over 580`); fail = true; }
    else { set["metaData.metaTitle"] = r.t; console.log(`  ${r.slug} title: ${doc.t ? tp(doc.t) : "?"}px -> ${px}px`); }
  }
  if (r.d) {
    const px = dp(r.d);
    if (px > 1000) { console.error(`✗ ${r.slug} desc ${px}px still over 1000`); fail = true; }
    else { set["metaData.metaDescription"] = r.d; console.log(`  ${r.slug} desc: ${doc.d ? dp(doc.d) : "?"}px -> ${px}px`); }
  }
  if (Object.keys(set).length) patches.push({ id: doc._id, slug: r.slug, set });
}
if (fail) { console.error("\nRefused: fix errors above."); process.exit(1); }
console.log(`\n${patches.length} docs to patch. Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}`);
if (!COMMIT) { console.log("Re-run with --commit to apply."); process.exit(0); }

let tx = c.transaction();
for (const p of patches) tx = tx.patch(p.id, { set: p.set });
await tx.commit();

// Read back
let bad = 0;
for (const p of patches) {
  const d = await c.fetch(`*[_id==$id][0]{ "t":metaData.metaTitle, "d":metaData.metaDescription }`, { id: p.id });
  if (p.set["metaData.metaTitle"] && d.t !== p.set["metaData.metaTitle"]) { console.error(`✗ ${p.slug} title not applied`); bad++; }
  if (p.set["metaData.metaDescription"] && d.d !== p.set["metaData.metaDescription"]) { console.error(`✗ ${p.slug} desc not applied`); bad++; }
}
console.log(bad === 0 ? "✓ all patches verified live in Sanity" : `✗ ${bad} not applied`);
process.exit(bad === 0 ? 0 : 1);
