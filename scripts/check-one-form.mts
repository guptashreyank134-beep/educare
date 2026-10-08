/**
 * Asserts every page serves exactly one way to enquire, and that no page serves
 * a second one the visitor can still see.
 *
 * Counts the `data-enquiry-form` markers rather than `<form>` elements: a
 * booking surface may be a Calendly timeslot card with no form in it, and
 * counting tags missed those entirely.
 *
 * Two forms on a page split one submission between them: the visitor has to
 * pick, and whichever they skip is the one the page was built around. The
 * footer decides whether to stand down from the current route, so this is the
 * kind of defect that appears on one route only, after a deploy, and goes
 * unnoticed — it did exactly that on the homepage.
 *
 * Run against a server already serving the site:
 *   tsx scripts/check-one-form.mts http://localhost:3000
 *   tsx scripts/check-one-form.mts https://www.drshreyankeducare.com
 *
 * Without a URL it defaults to the production site, so it doubles as a
 * post-deploy check.
 */

import { readFileSync } from "node:fs";

const base = (process.argv[2] ?? "https://www.drshreyankeducare.com").replace(/\/+$/, "");

/** Routes to check: whatever the sitemap lists, so new pages are covered. */
async function routes(): Promise<string[]> {
  const sitemaps = [`${base}/sitemap.xml`];
  const seen = new Set<string>();
  const paths: string[] = [];

  while (sitemaps.length > 0) {
    const url = sitemaps.shift()!;
    if (seen.has(url)) continue;
    seen.add(url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    const xml = await res.text();

    const isIndex = /<sitemapindex/.test(xml);
    for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (isIndex) {
        sitemaps.push(loc.replace(/^https?:\/\/[^/]+/, base));
        continue;
      }
      const path = loc.replace(/^https?:\/\/[^/]+/, "") || "/";
      paths.push(path);
    }
  }
  return [...new Set(paths)].sort();
}

/**
 * Counts forms, and separately counts the ones a visitor would actually see.
 *
 * The stylesheet hides the shared footer section whenever the page owns a form,
 * so a second form in the markup is only a defect when nothing hides it. This
 * reads the rule from the stylesheet rather than assuming it is there.
 */
const cssHidesSharedForm = readFileSync("app/globals.css", "utf8").includes(
  'body:has([data-enquiry-form="page"]) [data-enquiry-section="shared"]',
);

type Row = { path: string; total: number; page: number; shared: number; visible: number };

function inspect(path: string, html: string): Row {
  const page = (html.match(/data-enquiry-form="page"/g) ?? []).length;
  const shared = (html.match(/data-enquiry-form="shared"/g) ?? []).length;
  const total = page + shared;
  const hidden = cssHidesSharedForm && page > 0 ? shared : 0;
  return { path, total, page, shared, visible: total - hidden };
}

const paths = await routes();
console.log(`${base} — ${paths.length} routes from the sitemap\n`);

const rows: Row[] = [];
const failures: string[] = [];
let checked = 0;

// Sequential on purpose: a burst of 290 requests reads as an attack and the
// numbers it returns cannot be trusted anyway.
for (const path of paths) {
  const res = await fetch(`${base}${path}`, { headers: { "user-agent": "one-form-check" } });
  if (!res.ok) {
    failures.push(`${path} -> HTTP ${res.status}`);
    continue;
  }
  const row = inspect(path, await res.text());
  rows.push(row);
  if (row.visible > 1) {
    failures.push(
      `${path} — ${row.visible} enquiry surfaces a visitor can see ` +
        `(${row.total} in the markup: ${row.page} page, ${row.shared} shared)`,
    );
  }
  if (row.total === 0) failures.push(`${path} — no way to enquire at all`);

  checked++;
  if (checked % 50 === 0) console.log(`  …${checked}/${paths.length}`);
}

console.log(`\nroutes checked:        ${rows.length}`);
console.log(`one visible surface:   ${rows.filter((r) => r.visible === 1).length}`);
console.log(`more than one visible: ${rows.filter((r) => r.visible > 1).length}`);
console.log(`markup has 2+:         ${rows.filter((r) => r.total > 1).length} (hidden by CSS where the page owns one)`);

if (failures.length > 0) {
  console.log(`\n${failures.length} problem(s):`);
  for (const f of failures) console.log(`  ${f}`);
  process.exit(1);
}
console.log("\nevery route serves exactly one visible way to enquire.");
