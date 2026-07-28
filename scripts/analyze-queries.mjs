// Programmatic Search Console analysis. Reads ./Queries.csv, classifies each
// query by intent, maps it to the best existing landing page, and scores the
// ranking opportunity. Writes docs/seo/search-query-analysis.csv.
//
// Run: node scripts/analyze-queries.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const rows = readFileSync("Queries.csv", "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((line) => {
    // last 4 comma-separated fields are numeric; the query may contain commas
    const parts = line.split(",");
    const position = parseFloat(parts.pop());
    const ctr = parts.pop();
    const impressions = parseInt(parts.pop(), 10);
    const clicks = parseInt(parts.pop(), 10);
    const query = parts.join(",").replace(/^"|"$/g, "");
    return { query, clicks, impressions, ctr, position };
  })
  .filter((r) => r.query && !Number.isNaN(r.position));

// Cities we actually serve (have a page for).
const SERVED = ["burnaby", "vancouver", "coquitlam", "port moody", "port coquitlam", "surrey", "richmond", "new westminster", "north vancouver", "west vancouver", "delta"];
const NOT_SERVED = ["abbotsford", "langley", "richmond hill", "coquitlam bc"]; // appear but no dedicated serviceable page / out of area

function classify(q) {
  const s = q.toLowerCase();
  if (/shreyank|educare|dr singh|shreya /.test(s)) return "Branded";
  if (/\bjobs?\b|salary|hourly rate|\brates?\b|\bcost\b|charges?|pricing|price|per hour|how much/.test(s)) return "Informational (pricing/jobs)";
  if (/dyslexia|adhd|orton|reading|handwriting|special needs|learning disabilit|singapore|toturing/.test(s)) return "Irrelevant / low-value";
  if (NOT_SERVED.some((c) => s.includes(c))) return "Location (not served)";
  if (/\bubc\b|\bsfu\b|langara|douglas|university|college|math 1\d\d|math \d\d\d|corporate finance|econometric|actuar|\bcfa\b|\bgmat\b|\bgre\b|mba|bcom|investment management|financial|macroeconomic|microeconomic/.test(s)) return "University / professional";
  if (/grade \d|grade\d|\d(st|nd|rd|th) grade|pre.?calc|precalc|chemistry 1[12]|physics 1[12]|biology 1[12]|foundations of math|\bib\b|\bap\b|calculus 1|calculus 2|final exam|exam prep|mock exam/.test(s)) return "Grade / course-specific";
  if (/math|chemistry|physics|biolog|coding|python|java|computer science|comp sci|\bcs\b|calculus|algebra|trig|statistics|genetics|programming|web development|science|stem|data science|machine learning/.test(s)) return "Subject tutoring";
  if (/tutor|tutoring|tuition|tutors/.test(s)) return "Broad tutoring";
  return "Other";
}

// Map a query to the best existing landing page (by keyword + city).
function city(s) {
  for (const c of SERVED) if (s.includes(c)) return c.replace(/ /g, "-");
  return null;
}
function recommendPage(q, intent) {
  const s = q.toLowerCase();
  const c = city(s);
  if (intent === "Branded") return "/ (homepage) + /about";
  if (intent.startsWith("Location (not served)")) return "— (out of service area, do not target)";
  if (intent === "Informational (pricing/jobs)") return s.includes("job") ? "— (recruiting, not target)" : "/pricing";
  if (intent === "Irrelevant / low-value") return "— (not a service we offer)";
  const subj = /chemistry/.test(s) ? "chemistry" : /physics/.test(s) ? "physics" : /biolog/.test(s) ? "biology" : /(coding|python|java|computer science|comp sci|\bcs\b|programming|web develop)/.test(s) ? "coding" : /math|calculus|algebra|pre.?calc|precalc|trig/.test(s) ? "math" : null;
  if (intent === "University / professional") {
    if (/physics/.test(s)) return "/programs/university-physics";
    if (/biolog/.test(s)) return "/programs/university-biology";
    if (/chemistry/.test(s)) return "/programs/university-chemistry";
    if (/math|calculus/.test(s)) return "/programs/university-mathematics";
    if (/finance|cfa|investment|mba|bcom/.test(s)) return "/programs/university-finance";
    if (/actuar/.test(s)) return "/actuarial-science-tutor or /actuarial-exam-tutor-online";
    if (/econometric|macroeconomic|microeconomic|economics/.test(s)) return "/online-economics-tutor";
    if (/statistic|\br programming\b|\br tutor\b/.test(s)) return "/online-statistics-tutor or /r-programming-tutor";
    if (/gmat/.test(s)) return "/programs/gmat-prep";
    if (/\bgre\b/.test(s)) return "/programs/gre-prep";
    return "/university-professional";
  }
  if (subj === "chemistry" && c) return /1[12]/.test(s) ? `/chemistry-${(s.match(/1[12]/)||[])[0]}-tutor-${c}` : `/programs/chemistry (+ city intent → ${c})`;
  if (subj === "physics" && c) return /1[12]/.test(s) ? `/physics-${(s.match(/1[12]/)||[])[0]}-tutor-${c}` : `/programs/physics (city → ${c})`;
  if (subj === "biology" && c) return /1[12]/.test(s) ? `/biology-${(s.match(/1[12]/)||[])[0]}-tutor-${c}` : `/programs/biology`;
  if (subj === "coding") return c === "burnaby" ? "/coding-tutor-burnaby" : c === "vancouver" ? "/computer-science-tutor-vancouver" : "/programs/computer-science";
  if (subj === "math") {
    if (/pre.?calc|precalc/.test(s) && c) return `/pre-calculus-${/12/.test(s)?"12":/11/.test(s)?"11":"12"}-tutor-${c}`;
    if (/grade (\d+)/.test(s) && c) return `/grade-${(s.match(/grade (\d+)/)||[])[1]}-math-tutor-${c}`;
    if (c === "burnaby") return "/math-tutor-burnaby (primary) — consolidate /math-tutoring-burnaby, /best-math-tutor-burnaby";
    if (c === "vancouver") return "/math-tutor-vancouver / /vancouver-math-tutor (consolidate to one)";
    if (c) return `/math-tutor-${c}`;
    return "/programs/mathematics";
  }
  if (subj === "chemistry") return "/programs/chemistry";
  if (subj === "physics") return "/programs/physics";
  if (subj === "biology") return "/programs/biology";
  if (intent === "Broad tutoring" && c) return `/math-tutor-${c} (city hub)`;
  if (intent === "Broad tutoring") return "/ (homepage) or /programs";
  return "/programs";
}

function opportunity(r) {
  const { position: p, impressions: i, clicks: c } = r;
  if (c > 0) return "Converting (defend)";
  if (p <= 3) return "Top-3 no clicks (snippet/relevance)";
  if (p <= 10 && i >= 20) return "STRIKING DISTANCE (pos 4-10, high impressions)";
  if (p <= 10) return "Striking distance (pos 4-10)";
  if (p <= 20) return "Page-2 (build authority)";
  return "Low (long-term)";
}
function action(r, intent, page) {
  if (intent.startsWith("Location (not served)") || intent === "Irrelevant / low-value") return "Ignore / mark not-relevant";
  if (intent === "Informational (pricing/jobs)") return r.query.includes("job") ? "Ignore (recruiting query)" : "Ensure /pricing answers this";
  if (r.clicks > 0) return "Keep; protect ranking";
  const op = opportunity(r);
  if (op.startsWith("STRIKING")) return "PRIORITIZE: rewrite title+description, strengthen page & internal links";
  if (op.startsWith("Top-3")) return "Rewrite snippet to earn the click";
  if (op.startsWith("Striking")) return "Improve snippet + on-page relevance";
  if (op.startsWith("Page-2")) return "Add depth + internal links to lift to page 1";
  return "Monitor; low priority";
}
function priority(r, intent) {
  if (intent.startsWith("Location (not served)") || intent === "Irrelevant / low-value") return "P4";
  const op = opportunity(r);
  if (op.startsWith("STRIKING")) return "P1";
  if (r.clicks > 0 || op.startsWith("Top-3")) return "P1";
  if (op.startsWith("Striking") || (r.impressions >= 20)) return "P2";
  if (op.startsWith("Page-2")) return "P3";
  return "P4";
}

const esc = (v) => { const s = String(v ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const header = ["Query", "Clicks", "Impressions", "CTR", "Avg position", "Search intent", "Recommended landing page", "Ranking opportunity", "Recommended action", "Priority"];
const out = [header.join(",")];
const byIntent = {};
let strikingImpr = 0;
for (const r of rows.sort((a, b) => b.impressions - a.impressions)) {
  const intent = classify(r.query);
  const page = recommendPage(r.query, intent);
  const op = opportunity(r);
  const pr = priority(r, intent);
  if (op.startsWith("STRIKING")) strikingImpr += r.impressions;
  byIntent[intent] = (byIntent[intent] || 0) + 1;
  out.push([r.query, r.clicks, r.impressions, r.ctr, r.position, intent, page, op, action(r, intent, page), pr].map(esc).join(","));
}
writeFileSync("docs/seo/search-query-analysis.csv", out.join("\n"));

// Summary to stdout
const total = rows.reduce((a, r) => ({ c: a.c + r.clicks, i: a.i + r.impressions }), { c: 0, i: 0 });
console.log(`Queries: ${rows.length} | clicks ${total.c} | impressions ${total.i} | CTR ${(100 * total.c / total.i).toFixed(2)}%`);
console.log("Intent breakdown:", JSON.stringify(byIntent, null, 1));
console.log(`Striking-distance (pos 4-10, >=20 impr, 0 clicks) impressions at stake: ${strikingImpr}`);
const p1 = rows.filter((r) => priority(r, classify(r.query)) === "P1" && r.clicks === 0).sort((a,b)=>b.impressions-a.impressions).slice(0, 12);
console.log("\nTop P1 zero-click opportunities:");
for (const r of p1) console.log(`  ${String(r.impressions).padStart(3)} impr  pos ${r.position}  ${r.query}  ->  ${recommendPage(r.query, classify(r.query))}`);
