import assert from "node:assert/strict";
import test from "node:test";
import { resolveInternalHref, redirectSources } from "../data/redirects.ts";
import { crawlRepairPairs } from "../redirects/seobility.ts";
import { repairContentLinks, resolveContentHref } from "./contentLinks.ts";

test("verified article anchor labels lead to the corresponding subject and author", () => {
  assert.equal(resolveContentHref("https://www.drshreyankeducare.com/ap-calculus-tutor-vancouver", "AP Computer Science tutor in Vancouver"), "/ap-computer-science-tutor-vancouver");
  assert.equal(resolveContentHref("/ap-calculus-tutor-vancouver", "AP Calculus tutor in Vancouver"), "/ap-calculus-tutor-vancouver");
  assert.equal(resolveContentHref("/about", "Dr. Shreyank Gupta"), "/about/dr-shreyank-gupta");
});

test("every crawl failure resolves directly to a non-redirect destination", () => {
  // A fixed count made this fail whenever a pair was legitimately added, which
  // is the normal way this table grows. The floor still catches a truncation,
  // and the checks below are the ones that matter: no source listed twice, and
  // every destination reached in one hop.
  assert.ok(crawlRepairPairs.length >= 20, `only ${crawlRepairPairs.length} pairs`);
  const sources = crawlRepairPairs.map(([from]) => from);
  assert.equal(new Set(sources).size, sources.length, "a source is listed twice");

  for (const [from, to] of crawlRepairPairs) {
    assert.equal(resolveInternalHref(from), to);
    assert.equal(redirectSources.has(to), false, to);
    assert.equal(resolveInternalHref(`https://drshreyankeducare.com${from}/?source=blog#details`), `${to}?source=blog#details`);
  }
});

test("link repair preserves external links, fragments, unknown paths and query strings", () => {
  for (const href of ["https://example.com/programs/math", "https://drshreyankeducare.com.example.org/a", "mailto:test@example.com", "tel:+16725147587", "#section", "//example.com/a", "/not-a-real-page"]) {
    assert.equal(resolveInternalHref(href), href);
  }
  assert.equal(resolveInternalHref("/programs/mathematics/?x=1#help"), "/programs/mathematics?x=1#help");
  assert.equal(repairContentLinks(`<p><a class="x" href='https://drshreyankeducare.com/programs/math?x=1&amp;y=2#help'>Math</a></p>`), `<p><a class="x" href='/programs/mathematics?x=1&amp;y=2#help'>Math</a></p>`);
});
