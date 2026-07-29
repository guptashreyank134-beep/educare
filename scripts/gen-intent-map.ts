// Enumerates EVERY indexable page (cities + verticals + seoPages + static +
// programs) and emits a per-page intent table. Satisfies Phase 2 at scale.
// Run: npx tsx scripts/gen-intent-map.ts  ->  docs/seo/page-intent-map-full.csv
import { writeFileSync } from "node:fs";
import { cities, cityPath } from "../data/cities";
import { verticalPages, verticalPath } from "../data/verticalPages";
import { seoPages, seoPagePath } from "../data/seoPages";
import { redirectSources } from "../data/redirects";

const BASE = "https://www.drshreyankeducare.com";
const esc = (v: unknown) => { const s = String(v ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

type Row = { url: string; source: string; intent: string; title: string; h1: string; canonical: string; decision: string };
const rows: Row[] = [];
const add = (path: string, source: string, intent: string, title?: string, h1?: string, decision = "Keep") =>
  rows.push({ url: path, source, intent, title: title || "(CMS/route default)", h1: h1 || "", canonical: `${BASE}${path}`, decision });

for (const c of cities) add(cityPath(c.slug), "city", `Local broad tutoring — ${c.name}`, c.metaTitle, c.heroHeading, "Keep (distinct city intent)");
for (const p of verticalPages) add(verticalPath(p.slug), "vertical", (p as { cluster?: string }).cluster || "University/professional subject", p.metaTitle, p.h1, "Keep");
for (const p of seoPages) {
  const redir = redirectSources.has(`/${p.slug}`);
  add(seoPagePath(p.slug), "seoPage", p.cluster, p.metaTitle, p.h1, redir ? "REDIRECTS -> excluded from sitemap & sibling links" : "Keep");
}
const staticPages: [string, string, string][] = [
  ["/", "Homepage / brand", "Keep"], ["/about", "Brand/trust", "Keep"], ["/contact", "Conversion", "Keep"],
  ["/pricing", "Informational (pricing)", "Keep"], ["/locations", "Local hub", "Keep"], ["/services", "Services hub", "Keep"],
  ["/resources", "Informational hub", "Keep"], ["/blog", "Content hub", "Keep"], ["/book", "Conversion", "Keep"],
  ["/programs", "Programs hub", "Keep"],
  ["/programs/mathematics", "Subject hub — math", "Keep"], ["/programs/chemistry", "Subject hub — chemistry", "Keep"],
  ["/programs/physics", "Subject hub — physics", "Keep (primary)"], ["/programs/physics-tutoring", "Subject — physics", "REVIEW: merge -> /programs/physics"],
  ["/programs/computer-science", "Subject hub — CS", "Keep"], ["/programs/biology", "Subject hub — biology", "Keep"],
  ["/programs/pre-calculus", "Course — pre-calculus", "Keep"], ["/programs/university-physics", "University physics", "Keep"],
  ["/programs/university-biology", "University biology", "Keep"], ["/programs/university-chemistry", "University chemistry", "Keep"],
  ["/programs/university-mathematics", "University math", "Keep"], ["/programs/university-finance", "University finance", "Keep"],
  ["/programs/vancouver-math-tutoring", "Local — Vancouver math", "REVIEW vs /math-tutor-vancouver"],
  ["/programs/burnaby-stem-tutoring", "Local — Burnaby STEM", "Keep"],
  ["/programs/python", "Coding — Python", "Keep"], ["/programs/javascript", "Coding — JS", "Keep"], ["/programs/web-development", "Coding — web", "Keep"],
  ["/programs/french", "Language — French", "Keep"], ["/programs/mandarin", "Language — Mandarin", "Keep"],
  ["/programs/sat-prep", "Test prep — SAT", "Keep"], ["/programs/gmat-prep", "Test prep — GMAT", "Keep"], ["/programs/gre-prep", "Test prep — GRE", "Keep"],
  ["/programs/mcat-prep", "Test prep — MCAT", "Keep"], ["/programs/ib-ap-tutoring", "IB/AP hub", "Keep"], ["/programs/finance", "Subject — finance", "Keep"],
];
for (const [path, intent, decision] of staticPages) add(path, "static/program", intent, "", "", decision);

const header = ["URL", "Source", "Primary intent", "Title (code default)", "H1", "Canonical", "Decision"];
const out = [header.join(",")];
for (const r of rows) out.push([r.url, r.source, r.intent, r.title, r.h1, r.canonical, r.decision].map(esc).join(","));
writeFileSync("docs/seo/page-intent-map-full.csv", out.join("\n"));
console.log(`Wrote ${rows.length} pages to docs/seo/page-intent-map-full.csv`);
console.log(`  ${rows.filter((r) => r.decision.startsWith("REDIRECTS")).length} redirecting (excluded), ${rows.filter((r) => r.decision.startsWith("REVIEW")).length} flagged for merge review`);
