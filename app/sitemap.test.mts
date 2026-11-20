import assert from "node:assert/strict";
import test from "node:test";

import { loadEnvLocal } from "../scripts/test-env.mts";
import { readFileSync } from "node:fs";

const recordedDates: Record<string, string> = JSON.parse(
  readFileSync(new URL("../data/route-dates.json", import.meta.url), "utf8"),
);

loadEnvLocal();

const { default: sitemap, revalidate } = await import("./sitemap.ts");
const entries = await sitemap();

test("sitemap expires its route and CMS collection cache and includes every listed post", async (t) => {
  const { client } = await import("../sanity/lib/client.ts");
  const { BLOG_CACHE_TAG } = await import("../lib/blogPagination.ts");
  const { SITE_URL } = await import("../data/businessInfo.ts");
  assert.equal(revalidate, 3600, "the sitemap must not retain an indefinite build snapshot");
  const posts = Array.from({ length: 136 }, (_, i) => ({ slug: `current-post-${i}` }));
  let calls = 0;
  t.mock.method(client, "fetch", async (_query: string, _params: unknown, options: { next: { revalidate: number; tags?: string[] } }) => {
    assert.equal(options.next.revalidate, 3600);
    if (calls++ === 0) {
      assert.ok(options.next.tags?.includes(BLOG_CACHE_TAG));
      return posts;
    }
    return [];
  });
  const currentEntries = await sitemap();
  for (const post of posts) {
    assert.ok(currentEntries.some((entry) => entry.url === `${SITE_URL}/blog/${post.slug}`));
  }
  assert.ok(currentEntries.some((entry) => entry.url === `${SITE_URL}/blog/page/16`));
  assert.ok(!currentEntries.some((entry) => entry.url === `${SITE_URL}/blog/page/17`));
  assert.equal(calls, 2);
});

test("sitemap contains each public URL only once, even when CMS slugs repeat", () => {
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
});

test("sitemap dates come from recorded content, including legitimate bulk edits", async (t) => {
  const { client } = await import("../sanity/lib/client.ts");
  const { publishedAnswerPages, answerPagePath } = await import("../content/answer-pages.ts");
  // A real bulk edit may give many URLs one commit date; an arbitrary build
  // timestamp must still fail this provenance check.
  t.mock.method(client, "fetch", async () => []);
  const answerDates = new Map(publishedAnswerPages.map((page) => [answerPagePath(page.slug), page.lastReviewed]));
  const result = await sitemap();
  for (const entry of result) {
    const path = new URL(entry.url).pathname;
    const known = [recordedDates[path], answerDates.get(path)].filter((value): value is string => Boolean(value));
    if (!known.length) {
      assert.equal(entry.lastModified, undefined, path + " has no recorded content date");
      continue;
    }
    const newest = Math.max(...known.map((value) => Date.parse(value)));
    assert.equal(new Date(entry.lastModified!).getTime(), newest, path + " must use an actual content date");
  }
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

test("newer Study Club CMS updates supply the canonical page's lastmod", async (t) => {
  const { client } = await import("../sanity/lib/client.ts");
  const { STUDY_CLUB } = await import("../data/studyClub.ts");
  const { SITE_URL } = await import("../data/businessInfo.ts");
  const updatedAt = new Date(Date.parse(recordedDates[STUDY_CLUB.path]) + 86_400_000).toISOString();
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

test("older CMS content cannot hide a newer committed page change", async (t) => {
  const { client } = await import("../sanity/lib/client.ts");
  const { STUDY_CLUB } = await import("../data/studyClub.ts");
  const { SITE_URL } = await import("../data/businessInfo.ts");
  const codeDate = new Date(recordedDates[STUDY_CLUB.path]);
  const updatedAt = new Date(codeDate.getTime() - 86_400_000).toISOString();
  let calls = 0;
  t.mock.method(client, "fetch", async () => calls++ === 0
    ? [] : [{ path: STUDY_CLUB.path, updatedAt }]);
  const result = await sitemap();
  const entry = result.find((item) => item.url === `${SITE_URL}${STUDY_CLUB.path}`);
  assert.ok(entry?.lastModified);
  assert.equal(new Date(entry.lastModified).toISOString(), codeDate.toISOString());
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
  const updatedAt = new Date(Date.parse(recordedDates["/math-tutor-burnaby"]) + 86_400_000).toISOString();
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
