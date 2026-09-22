import assert from "node:assert/strict";
import test from "node:test";
import { blogPageCount, REDIRECTED_POST_SLUGS, LISTED_POSTS } from "./blogPagination.ts";

test("redirected posts must not create an empty fifteenth archive page", () => {
  const slugs = Array.from({ length: 126 }, (_, i) => `published-${i}`);
  slugs.push("how-to-study-effectively-for-ib-exams");
  const listed = slugs.filter((slug) => !REDIRECTED_POST_SLUGS.includes(slug));
  assert.equal(blogPageCount(slugs.length), 15);
  assert.equal(blogPageCount(listed.length), 14);
  assert.ok(LISTED_POSTS.includes("defined(slug.current)"));
  assert.ok(LISTED_POSTS.includes("!(slug.current in $excluded)"));
  assert.equal(blogPageCount(0), 1);
  assert.equal(blogPageCount(127), 15);
});
