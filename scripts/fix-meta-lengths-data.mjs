/**
 * Shorten over-length page titles (>580px) and meta descriptions (>1000px) in
 * the three data files, per the Seobility 07/16 crawl. Loads the live value for
 * each slug (so the find is exact), swaps in the shortened copy, and refuses to
 * write if any replacement is missing or still over budget.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

function wu(s) {
  let u = 0;
  for (const c of s) {
    if ("iIl.,:;'|!jft".includes(c)) u += 0.34;
    else if ("mwMW—".includes(c)) u += 0.92;
    else if (c === " ") u += 0.3;
    else if (c === c.toUpperCase() && c !== c.toLowerCase()) u += 0.7;
    else u += 0.55;
  }
  return u;
}
const tS = 704 / wu("Math Tutor in Burnaby | Physics, Chemistry & Coding — Dr. Shreyank Educare");
const dS = 1065 / wu("Dr. Shreyank Educare offers 1-on-1 tutoring, small group classes, online sessions & intensive exam prep in Burnaby. Flexible scheduling. Book a free 30-minute consultation.");
const titlePx = (s) => Math.round(wu(s) * tS);
const descPx = (s) => Math.round(wu(s) * dS);

// slug -> { t?: newTitle, d?: newDescription }
const REWRITES = {
  "./data/cities.ts": {
    burnaby: { t: "Math Tutor in Burnaby | Physics, Chemistry & Coding" },
    vancouver: { t: "Math Tutor in Vancouver | Physics, Chemistry & Coding" },
    "north-vancouver": { t: "Math Tutor in North Vancouver | Physics & Chemistry" },
    "west-vancouver": { t: "Math Tutor in West Vancouver | Physics & Chemistry" },
    coquitlam: { t: "Math Tutor in Coquitlam | Physics, Chemistry & Coding" },
    "port-moody": { t: "Math Tutor in Port Moody | Physics & Chemistry" },
    "port-coquitlam": { t: "Math Tutor in Port Coquitlam | Physics & Chemistry" },
    surrey: { t: "Math Tutor in Surrey | Physics, Chemistry & Coding" },
    richmond: { t: "Math Tutor in Richmond | Physics, Chemistry & Coding" },
    "new-westminster": { t: "Math Tutor in New Westminster | Physics & Chemistry" },
    delta: { t: "Math Tutor in Delta | Physics, Chemistry & Coding" },
  },
  "./data/verticalPages.ts": {
    "online-medical-tutoring": {
      t: "Online Medical Tutoring | USA & Caribbean | MD-Led",
      d: "MD-led online medical tutoring for USA & Caribbean students — physiology, pathology, pharmacology and USMLE prep. Book a free consultation.",
    },
    "university-professional": {
      t: "University & Professional Tutoring | Economics & Stats",
      d: "Expert online tutoring in Economics, Statistics, Actuarial Science and R for university and professional learners worldwide. Free consultation.",
    },
    "medical-sciences-tutor": {
      t: "Medical Sciences Tutor | USA & Caribbean | MD-Led",
      d: "MD-led online medical sciences tutoring for USA & Caribbean students — physiology, pathology, pharmacology, anatomy and more. Free consultation.",
    },
    "online-physiology-tutor": { t: "Online Physiology Tutor | USA & Caribbean | MD-Led" },
    "online-pathology-tutor": { t: "Online Pathology Tutor | USA & Caribbean | MD-Led" },
    "online-pharmacology-tutor": { t: "Online Pharmacology Tutor | USA & Caribbean | MD-Led" },
    "medical-exam-prep-tutor-online": { t: "Medical Exam Prep Tutor | USA & Caribbean | MD-Led" },
    "online-statistics-tutor": {
      t: "Online Statistics Tutor | University & Professional",
      d: "Expert online statistics tutoring worldwide — probability, inference, regression and more for university students and professionals. Free consultation.",
    },
    "online-economics-tutor": {
      t: "Online Economics Tutor | University & Professional",
      d: "Expert online economics tutoring for university students worldwide — micro, macro and econometrics. One-on-one, exam-focused. Free consultation.",
    },
    "r-programming-tutor": { t: "R Programming Tutor | University & Professional" },
    "actuarial-science-tutor": { t: "Actuarial Science Tutor | University & Professional" },
    "statistics-with-r-tutor": { t: "Statistics with R Tutor | University & Professional" },
    "actuarial-exam-tutor-online": {
      t: "Actuarial Exam Tutor | University & Professional",
      d: "Expert online actuarial exam tutoring worldwide — structured, problem-focused preparation for professional actuarial exams. Free consultation.",
    },
  },
  "./data/seoPages.ts": {
    "dr-shreyank-educare": {
      t: "Dr. Shreyank Educare | PhD Tutoring, Burnaby & Vancouver",
      d: "PhD-led Math, Physics, Chemistry & Coding tutoring in Burnaby & Vancouver for Grades 6–12 and university. 5★ rated. Free consultation.",
    },
    "dr-shreyank-educare-reviews": {
      d: "See why parents rate Dr. Shreyank Educare 5★ for Math, Physics & Chemistry tutoring in Burnaby & Vancouver. Book a free consultation.",
    },
    "dr-shreyank-educare-burnaby": {
      d: "Dr. Shreyank Educare in Burnaby: PhD-led Math, Physics & Chemistry tutoring for Grades 6–12 and university, in person or online. Free consultation.",
    },
    "dr-shreyank-gupta-tutor": {
      d: "Meet Dr. Shreyank Gupta — PhD-qualified Math, Physics & Chemistry tutor with 10+ years' experience in Burnaby & Vancouver. Free consultation.",
    },
    "dr-shreyank-math-tutor": { t: "Dr. Shreyank Math Tutor | Burnaby & Vancouver" },
    "exam-prep-tutor-vancouver": {
      d: "Exam prep tutoring in Vancouver for Math, Physics and Chemistry — high-yield review and timed practice. Online or in Burnaby. Free consultation.",
    },
    "summer-pre-calculus-course-burnaby": {
      d: "Summer Pre-Calculus course in Burnaby — build a strong foundation for Pre-Calculus 11/12 before the school year. PhD-led. Free consultation.",
    },
    "ap-tutor-vancouver": {
      d: "AP tutoring in Vancouver across Calculus, Physics, Chemistry, Biology & Statistics — exam prep for top scores. Online or in Burnaby. Free consultation.",
    },
    "university-calculus-tutor-vancouver": {
      d: "University calculus tutoring in Vancouver — limits, derivatives, integrals and series for UBC, SFU & Langara students. Free consultation.",
    },
    "university-physics-tutor-vancouver": {
      d: "University physics tutoring in Vancouver — mechanics, E&M and thermodynamics for UBC, SFU & Langara students. Free consultation.",
    },
    "computer-science-tutor-vancouver": {
      d: "Computer science tutoring in Vancouver — programming, data structures and algorithms for high school and university. Free consultation.",
    },
    "math-word-problems-tutor": {
      d: "Struggle with math word problems? Learn a reliable method to translate words into math and solve with confidence. PhD-led. Free consultation.",
    },
    "math-word-problem-help": {
      d: "Get help with math word problems — step-by-step strategies to translate, set up and solve any word problem. PhD-led tutoring. Free consultation.",
    },
  },
};

const arrKey = {
  "./data/cities.ts": "cities",
  "./data/verticalPages.ts": "verticalPages",
  "./data/seoPages.ts": "seoPages",
};

let hardFail = false;
for (const [file, map] of Object.entries(REWRITES)) {
  const mod = await import(pathToFileURL(process.cwd() + "/" + file.slice(2)).href);
  const arr = mod[arrKey[file]];
  const bySlug = Object.fromEntries(arr.map((e) => [e.slug, e]));
  let text = readFileSync(file, "utf8");
  const results = [];
  for (const [slug, rw] of Object.entries(map)) {
    const cur = bySlug[slug];
    if (!cur) { console.error(`✗ ${file} ${slug}: not found`); hardFail = true; continue; }
    for (const [field, key, px, cap] of [["t", "metaTitle", titlePx, 580], ["d", "metaDescription", descPx, 1000]]) {
      if (!rw[field]) continue;
      const oldVal = cur[key];
      const newVal = rw[field];
      const newPx = px(newVal);
      if (newPx > cap) { console.error(`✗ ${slug} ${key}: new value ${newPx}px still over ${cap}`); hardFail = true; continue; }
      if (!text.includes(oldVal)) { console.error(`✗ ${slug} ${key}: current value not found verbatim in file`); hardFail = true; continue; }
      if (text.split(oldVal).length - 1 > 1) { console.error(`✗ ${slug} ${key}: current value appears >1x, ambiguous`); hardFail = true; continue; }
      text = text.replace(oldVal, newVal);
      results.push(`  ${slug} ${key}: ${px(oldVal)}px -> ${newPx}px`);
    }
  }
  if (!hardFail) {
    writeFileSync(file, text);
    console.log(`\n✓ ${file}`);
    results.forEach((r) => console.log(r));
  }
}
if (hardFail) { console.error("\nRefused: fix the errors above."); process.exit(1); }
console.log("\nAll data-file meta lengths within budget.");
