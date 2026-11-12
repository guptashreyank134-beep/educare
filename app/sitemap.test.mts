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

test("Study Club CMS updates supply the canonical page's lastmod", async (t) => {
  const { client } = await import("../sanity/lib/client.ts");
  const { STUDY_CLUB } = await import("../data/studyClub.ts");
  const { SITE_URL } = await import("../data/businessInfo.ts");
  const updatedAt = "2026-10-30T12:30:00.000Z";
  let calls = 0;
  t.mock.method(client, "fetch", async (query: string, params: Record<string, unknown>) => {
    if (calls++ === 0) return [];
    assert.match(query, /_type == "studyClubPage" && _id == "studyClubPage"/);
    assert.match(query, /_type == "studyClubPage" => \$studyClubPath/);
    assert.equal(params.studyClubPath, STUDY_CLUB.path);
    return [{ path: params.studyClubPath, updatedAt }];
  });

  const result = await sitemap();
  const studyClubEntries = result.filter((entry) => entry.url === `${SITE_URL}${STUDY_CLUB.path}`);
  assert.equal(calls, 2);
  assert.equal(studyClubEntries.length, 1);
  assert.equal(new Date(studyClubEntries[0].lastModified!).toISOString(), updatedAt);
});

test("CMS outages are reported and keep Study Club's recorded fallback date", async (t) => {
  const { client } = await import("../sanity/lib/client.ts");
  const { STUDY_CLUB } = await import("../data/studyClub.ts");
  const { SITE_URL } = await import("../data/businessInfo.ts");
  const { readFileSync } = await import("node:fs");
  const dates: Record<string, string> = JSON.parse(readFileSync(new URL("../data/route-dates.json", import.meta.url), "utf8"));
  const unavailable = new Error("Fixture: CMS unavailable");
  t.mock.method(client, "fetch", async () => { throw unavailable; });
  const errors = t.mock.method(console, "error", () => {});

  const first = await sitemap();
  const second = await sitemap();
  assert.deepEqual(first, second, "an outage must not replace content dates with the current time");
  assert.equal(errors.mock.callCount(), 4, "each failed CMS query must remain visible in server logs");
  assert.ok(errors.mock.calls.every((call) => call.arguments[1] === unavailable));
  const entry = first.find((item) => item.url === `${SITE_URL}${STUDY_CLUB.path}`);
  assert.ok(entry?.lastModified);
  assert.equal(new Date(entry.lastModified).toISOString(), new Date(dates[STUDY_CLUB.path]).toISOString());
});

test("city CMS dates update canonical math-tutor URLs", async (t) => {
  const { client } = await import("../sanity/lib/client.ts");
  const { SITE_URL } = await import("../data/businessInfo.ts");
  const updatedAt = "2026-10-29T10:15:00.000Z";
  let calls = 0;
  t.mock.method(client, "fetch", async (query: string) => {
    if (calls++ === 0) return [];
    const cityBranch = query.indexOf('_type == "pageFaq" && pageType == "city" => "/math-tutor-" + pageSlug');
    const genericBranch = query.indexOf('_type == "pageFaq" => "/" + pageSlug');
    assert.ok(cityBranch >= 0 && cityBranch < genericBranch, "city slugs need their canonical prefix before the generic landing-page branch");
    return [{ path: "/math-tutor-burnaby", updatedAt }];
  });

  const result = await sitemap();
  const city = result.find((entry) => entry.url === `${SITE_URL}/math-tutor-burnaby`);
  assert.equal(calls, 2);
  assert.ok(city?.lastModified);
  assert.equal(new Date(city.lastModified).toISOString(), updatedAt);
  assert.ok(!result.some((entry) => entry.url === `${SITE_URL}/burnaby`));
});
