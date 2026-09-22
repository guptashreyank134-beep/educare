import assert from "node:assert/strict";
import test from "node:test";

import { loadEnvLocal } from "../scripts/test-env.mts";

loadEnvLocal();

const sitemap = (await import("./sitemap.ts")).default;
const entries = await sitemap();

test("sitemap contains each public URL only once, even when CMS slugs repeat", () => {
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
});

/** Share of entries that sit in the single largest identical-lastmod group. */
function largestIdenticalShare(items: { lastModified?: string | Date }[]) {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (!item.lastModified) continue;
    const key = new Date(item.lastModified).toISOString();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const largest = Math.max(0, ...counts.values());
  return { share: largest / items.length, largest, distinct: counts.size };
}

test("the identical-lastmod guard catches a build-time stamp", () => {
  // The regression this protects against: one `new Date()` for every URL.
  const stamped = Array.from({ length: 50 }, () => ({ lastModified: new Date("2026-09-07") }));
  assert.ok(largestIdenticalShare(stamped).share > 0.2);

  const varied = Array.from({ length: 50 }, (_, i) => ({
    lastModified: new Date(2026, 0, i + 1),
  }));
  assert.ok(largestIdenticalShare(varied).share <= 0.2);
});

test("sitemap does not stamp one build time across every URL", () => {
  const { share, largest, distinct } = largestIdenticalShare(entries);
  assert.ok(
    share <= 0.2,
    `${largest} of ${entries.length} entries (${(share * 100).toFixed(1)}%) share one lastmod ` +
      `across ${distinct} distinct values. More than 20% identical means the dates are being ` +
      `generated rather than sourced — check that route-dates.json is current.`,
  );
});

test("every lastmod is a real, past date", () => {
  const now = Date.now();
  for (const entry of entries) {
    if (!entry.lastModified) continue;
    const value = new Date(entry.lastModified);
    assert.ok(!Number.isNaN(value.getTime()), `${entry.url} has an unparseable lastmod`);
    assert.ok(value.getTime() <= now, `${entry.url} has a lastmod in the future`);
  }
});

test("sitemap lists no redirected or noindexed URL", async () => {
  const { redirectSources } = await import("../data/redirects.ts");
  const { noindexPaths } = await import("../content/page-policy.ts");
  const { SITE_URL } = await import("../data/businessInfo.ts");

  for (const entry of entries) {
    const path = entry.url.replace(SITE_URL, "").replace(/\/+$/, "") || "/";
    assert.ok(!redirectSources.has(path), `${path} is a redirect source but is in the sitemap`);
    assert.ok(!noindexPaths.has(path), `${path} is noindexed but is in the sitemap`);
  }
});
