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

test("all twenty crawl failures resolve directly to a non-redirect destination", () => {
  assert.equal(crawlRepairPairs.length, 20);
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
