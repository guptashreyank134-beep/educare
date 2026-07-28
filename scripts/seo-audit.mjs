#!/usr/bin/env node
// Build-time SEO validator. Crawls the sitemap of a running site and flags the
// on-page problems that quietly sink rankings/CTR: duplicate or missing titles
// and descriptions, multiple/zero H1s, missing/foreign canonicals, accidental
// noindex, images without alt text, sitemap URLs that redirect or 404, invalid
// JSON-LD structured data, and broken internal links / links to redirects.
//
// Usage:
//   1. npm run build && npm start        (serve the production build)
//   2. npm run seo:audit                 (defaults to http://localhost:3000)
//   SEO_AUDIT_BASE=https://www.drshreyankeducare.com npm run seo:audit
//
// Exits non-zero if any ERROR-level problem is found, so it can gate CI.

const BASE = (process.env.SEO_AUDIT_BASE || "http://localhost:3000").replace(/\/$/, "");
const CONCURRENCY = 8;

const pick = (re, html) => { const m = html.match(re); return m ? m[1].trim() : null; };
const norm = (s) => (s || "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim().toLowerCase();
// URL comparison ignores a trailing slash (the homepage canonical omits it).
const urlNorm = (u) => norm(u).replace(/\/$/, "");

async function getSitemapUrls() {
  try {
    const xml = await (await fetch(`${BASE}/sitemap.xml`, { cache: "no-store" })).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    // rewrite to BASE host so we hit the server under test
    return [...new Set(locs.map((u) => u.replace(/^https?:\/\/[^/]+/, BASE)))];
  } catch {
    return [];
  }
}

async function audit(url) {
  const res = await fetch(url, { redirect: "manual", cache: "no-store" });
  const status = res.status;
  if (status >= 300 && status < 400) return { url, status, redirectedTo: res.headers.get("location") };
  const html = await res.text();
  const title = pick(/<title[^>]*>([^<]*)<\/title>/i, html);
  const desc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i, html)
    || pick(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i, html);
  const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i, html);
  const robots = pick(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i, html);
  const h1s = [...html.matchAll(/<h1[\b >][\s\S]*?<\/h1>/gi)].length;
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  const imgsNoAlt = imgs.filter((m) => !/\balt\s*=\s*["'][^"']*\S[^"']*["']/i.test(m[0])).length;

  // Internal links (same-host <a href>), normalised to path only.
  const host = new URL(BASE).host;
  const links = new Set();
  for (const m of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const raw = m[1];
    if (/^(#|mailto:|tel:|javascript:|https?:\/\/(?!)|data:)/i.test(raw)) continue;
    let abs;
    try { abs = new URL(raw, url); } catch { continue; }
    if (abs.host !== host) continue;
    links.add(abs.pathname.replace(/\/+$/, "") || "/");
  }

  // JSON-LD blocks: validity.
  const jsonld = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  let badJsonLd = 0;
  for (const block of jsonld) { try { JSON.parse(block.trim()); } catch { badJsonLd++; } }

  return { url, status, title, desc, canonical, robots, h1s, imgCount: imgs.length, imgsNoAlt, links: [...links], jsonldCount: jsonld.length, badJsonLd };
}

async function pool(items, n, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx]).catch((e) => ({ url: items[idx], error: String(e) })); }
  }));
  return out;
}

const errors = [], warnings = [];
const E = (u, m) => errors.push(`${u}\n     ${m}`);
const W = (u, m) => warnings.push(`${u}\n     ${m}`);

(async () => {
  const urls = await getSitemapUrls();
  if (!urls.length) { console.error(`No sitemap URLs from ${BASE}/sitemap.xml — is the server running?`); process.exit(2); }
  console.log(`SEO audit of ${urls.length} sitemap URLs at ${BASE}\n`);

  const pages = await pool(urls, CONCURRENCY, audit);
  const titles = new Map(), descs = new Map();

  for (const p of pages) {
    if (p.error) { E(p.url, `fetch failed: ${p.error}`); continue; }
    if (p.redirectedTo) { E(p.url, `sitemap URL redirects (${p.status}) -> ${p.redirectedTo}`); continue; }
    if (p.status >= 400) { E(p.url, `returns HTTP ${p.status}`); continue; }
    if (!p.title) E(p.url, "missing <title>");
    else { const k = norm(p.title); titles.set(k, [...(titles.get(k) || []), p.url]); }
    if (!p.desc) W(p.url, "missing meta description");
    else { const k = norm(p.desc); descs.set(k, [...(descs.get(k) || []), p.url]); }
    if (!p.canonical) E(p.url, "missing canonical");
    else if (urlNorm(p.canonical) !== urlNorm(p.url)) W(p.url, `canonical points elsewhere: ${p.canonical}`);
    if (p.robots && /noindex/i.test(p.robots)) E(p.url, `noindex on an indexable page (robots="${p.robots}")`);
    if (p.h1s === 0) E(p.url, "no <h1>");
    else if (p.h1s > 1) W(p.url, `${p.h1s} <h1> tags`);
    if (p.imgsNoAlt > 0) W(p.url, `${p.imgsNoAlt} of ${p.imgCount} images missing alt text`);
    if (p.badJsonLd > 0) E(p.url, `${p.badJsonLd} of ${p.jsonldCount} JSON-LD block(s) do not parse`);
  }

  // Broken internal links: gather every internal link target, resolve any that
  // wasn't already crawled with a 200, and flag 3xx (link-to-redirect) / 4xx.
  const okPaths = new Set(pages.filter((p) => p.status === 200).map((p) => new URL(p.url).pathname.replace(/\/+$/, "") || "/"));
  const linkTargets = new Set();
  const linkSource = new Map();
  for (const p of pages) for (const t of (p.links || [])) { linkTargets.add(t); if (!linkSource.has(t)) linkSource.set(t, p.url); }
  const unknown = [...linkTargets].filter((t) => !okPaths.has(t));
  const linkStatuses = await pool(unknown, CONCURRENCY, async (path) => {
    const r = await fetch(`${BASE}${path}`, { method: "GET", redirect: "manual", cache: "no-store" });
    return { path, status: r.status, to: r.headers.get("location") };
  });
  for (const ls of linkStatuses) {
    if (ls.error) continue;
    const from = linkSource.get(ls.path);
    if (ls.status >= 400 || ls.status === 0) E(from, `broken internal link -> ${ls.path} (HTTP ${ls.status})`);
    else if (ls.status >= 300 && ls.status < 400) W(from, `internal link to a redirect -> ${ls.path} (${ls.status} -> ${ls.to})`);
  }
  for (const [k, list] of titles) if (list.length > 1) E(list[0], `duplicate <title> "${k}" on ${list.length} pages:\n     - ${list.join("\n     - ")}`);
  for (const [k, list] of descs) if (list.length > 1) W(list[0], `duplicate meta description on ${list.length} pages:\n     - ${list.join("\n     - ")}`);

  if (errors.length) { console.log(`ERRORS (${errors.length}):`); for (const e of errors) console.log("  ✗ " + e); console.log(""); }
  if (warnings.length) { console.log(`WARNINGS (${warnings.length}):`); for (const w of warnings) console.log("  ! " + w); console.log(""); }
  if (!errors.length && !warnings.length) console.log("Clean — no SEO issues found.");
  console.log(`\nSummary: ${pages.length} pages, ${errors.length} errors, ${warnings.length} warnings.`);
  process.exit(errors.length ? 1 : 0);
})();
