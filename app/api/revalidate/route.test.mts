import assert from "node:assert/strict";
import { after, beforeEach, mock, test } from "node:test";
import { NextRequest } from "next/server";
import { BLOG_CACHE_TAG } from "../../../lib/blogPagination.ts";

const pathCalls: [string, string?][] = [];
const tagCalls: [string, unknown][] = [];
mock.module("next/cache", {
  namedExports: {
    revalidatePath: (path: string, type?: string) => pathCalls.push([path, type]),
    revalidateTag: (tag: string, options: unknown) => tagCalls.push([tag, options]),
  },
});

const { POST } = await import("./route.ts");
const previousSecret = process.env.SANITY_REVALIDATE_SECRET;
process.env.SANITY_REVALIDATE_SECRET = "test-webhook-secret";
after(() => {
  if (previousSecret === undefined) delete process.env.SANITY_REVALIDATE_SECRET;
  else process.env.SANITY_REVALIDATE_SECRET = previousSecret;
});
beforeEach(() => {
  pathCalls.length = 0;
  tagCalls.length = 0;
});

function request(body: Record<string, string>, authorized = true) {
  return new NextRequest("https://example.test/api/revalidate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(authorized ? { authorization: "Bearer test-webhook-secret" } : {}),
    },
    body: JSON.stringify(body),
  });
}

test("post publication invalidates all archive pages and their shared sitemap data", async () => {
  const response = await POST(request({ _type: "post", slug: "new-post" }));
  assert.equal(response.status, 200);
  assert.deepEqual(pathCalls, [
    ["/blog/new-post", undefined],
    ["/blog", undefined],
    ["/blog/page/[page]", "page"],
    ["/sitemap.xml", undefined],
  ]);
  assert.deepEqual(tagCalls, [[BLOG_CACHE_TAG, { expire: 0 }]]);
});

test("post removal without a slug also refreshes matching detail pages", async () => {
  await POST(request({ _type: "post" }));
  assert.deepEqual(pathCalls[0], ["/blog/[slug]", "page"]);
  assert.ok(pathCalls.some(([path, type]) => path === "/blog/page/[page]" && type === "page"));
  assert.deepEqual(tagCalls, [[BLOG_CACHE_TAG, { expire: 0 }]]);
});

test("other CMS updates do not invalidate the blog collection", async () => {
  await POST(request({ _type: "studyClubPage" }));
  assert.ok(pathCalls.some(([path]) => path === "/homework-help-burnaby"));
  assert.deepEqual(tagCalls, []);
});

test("unauthorized requests cannot expire public page caches", async () => {
  const response = await POST(request({ _type: "post", slug: "new-post" }, false));
  assert.equal(response.status, 401);
  assert.deepEqual(pathCalls, []);
  assert.deepEqual(tagCalls, []);
});
