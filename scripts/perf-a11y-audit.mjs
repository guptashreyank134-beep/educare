#!/usr/bin/env node
// Static performance + accessibility heuristics (Phase 9). This is NOT a lab
// Core Web Vitals run (that needs Lighthouse against an accessible deploy) — it
// flags the structural risks that drive CLS/LCP/INP and the common a11y gaps,
// from HTML alone, so they can be fixed before the Lighthouse pass.
//
// Usage: SEO_AUDIT_BASE=https://www.drshreyankeducare.com node scripts/perf-a11y-audit.mjs
const BASE = (process.env.SEO_AUDIT_BASE || "http://localhost:3000").replace(/\/$/, "");
const PAGES = ["/", "/math-tutor-burnaby", "/programs/chemistry", "/programs/physics", "/coding-tutor-burnaby", "/contact", "/book", "/blog"];

const findings = [];
const add = (page, sev, msg) => findings.push({ page, sev, msg });

async function check(path) {
  const url = `${BASE}${path}`;
  const html = await (await fetch(url, { cache: "no-store" })).text();
  const bytes = Buffer.byteLength(html);

  // Perf: HTML payload
  if (bytes > 300_000) add(path, "PERF", `large HTML payload ${(bytes / 1024).toFixed(0)} KB (framework hydration — consider streaming/less client JS)`);

  // Perf: <img> without width/height (CLS) and lazy loading
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noDims = imgs.filter((t) => !/\bwidth=/.test(t) || !/\bheight=/.test(t));
  const eagerBelow = imgs.filter((t) => !/loading=/.test(t) && !/priority/.test(t));
  if (noDims.length) add(path, "PERF/CLS", `${noDims.length}/${imgs.length} <img> without explicit width+height (layout shift risk)`);
  if (eagerBelow.length > 3) add(path, "PERF", `${eagerBelow.length}/${imgs.length} <img> without loading="lazy" (only the LCP/hero image should be eager)`);

  // Perf: script count
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=/gi)].length;
  if (scripts > 25) add(path, "PERF", `${scripts} external <script> tags (audit third-party/render-blocking JS)`);

  // A11y: html lang
  if (!/<html[^>]+\blang=/.test(html)) add(path, "A11Y", "missing <html lang>");
  // A11y: viewport
  if (!/<meta[^>]+name=["']viewport["']/.test(html)) add(path, "A11Y", "missing viewport meta");
  // A11y: heading order skips (h1->h3 etc.)
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  let prev = 0, skip = false;
  for (const l of levels) { if (prev && l > prev + 1) skip = true; prev = l; }
  if (skip) add(path, "A11Y", "heading hierarchy skips a level (e.g. H2 -> H4)");
  // A11y: links with no accessible text (icon-only <a> with no aria-label)
  const emptyLinks = [...html.matchAll(/<a\b[^>]*>\s*<\/a>/gi)].length;
  if (emptyLinks) add(path, "A11Y", `${emptyLinks} empty <a> (need aria-label if icon-only)`);
  // A11y: images missing alt
  const noAlt = imgs.filter((t) => !/\balt\s*=\s*["'][^"']*\S/i.test(t)).length;
  if (noAlt) add(path, "A11Y", `${noAlt}/${imgs.length} <img> missing alt text`);
}

(async () => {
  console.log(`Static perf/a11y heuristics at ${BASE}\n(NOT lab CWV — see note in the script)\n`);
  for (const p of PAGES) { try { await check(p); } catch (e) { add(p, "ERR", String(e)); } }
  if (!findings.length) { console.log("No structural perf/a11y risks flagged on the sampled pages."); return; }
  const byPage = {};
  for (const f of findings) (byPage[f.page] = byPage[f.page] || []).push(f);
  for (const [page, list] of Object.entries(byPage)) {
    console.log(page);
    for (const f of list) console.log(`  [${f.sev}] ${f.msg}`);
    console.log("");
  }
  console.log(`Sampled ${PAGES.length} pages, ${findings.length} findings. Run Lighthouse on an accessible deploy for lab CWV (LCP/CLS/INP).`);
})();
