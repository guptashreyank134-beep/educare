import assert from "node:assert/strict";
import test from "node:test";

import {
  blogFamilyPattern,
  selectTopicNeighbours,
  type RelatedBlogPost,
} from "./blogRelatedPosts.ts";

const post = (slug: string): RelatedBlogPost => ({
  _id: slug,
  title: slug,
  slug,
});

test("uses the most specific subject family", () => {
  assert.equal(
    blogFamilyPattern("university-biology-molecular-biology"),
    "university-biology-*",
  );
  assert.equal(blogFamilyPattern("gmat-prep-data-insights"), "gmat-prep-*");
});

test("selects reciprocal neighbours and omits retired posts", () => {
  const candidates = [
    "biology-a",
    "biology-b",
    "biology-c",
    "biology-d",
    "biology-e",
  ].map(post);
  const selected = selectTopicNeighbours(
    candidates,
    "biology-c",
    new Set(["/blog/biology-d"]),
    3,
  );

  assert.deepEqual(
    selected.map(({ slug }) => slug),
    ["biology-e", "biology-b", "biology-a"],
  );
  assert.equal(new Set(selected.map(({ slug }) => slug)).size, selected.length);
});
