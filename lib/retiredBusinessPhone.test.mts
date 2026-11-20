import assert from "node:assert/strict";
import test from "node:test";
import { BUSINESS } from "../data/businessInfo.ts";
import { containsRetiredBusinessPhone, replaceRetiredBusinessPhone } from "./retiredBusinessPhone.ts";

test("retired numbers in article text and link destinations get the appropriate format", () => {
  const html = '<a href="tel:+16725147587">672-514-7587</a> or SMS:+1 (672) 514-7587';
  const expected = `<a href="tel:${BUSINESS.phoneE164}">${BUSINESS.phone}</a> or SMS:${BUSINESS.phoneE164}`;
  assert.ok(containsRetiredBusinessPhone(html));
  assert.equal(replaceRetiredBusinessPhone(html), expected);
  assert.equal(containsRetiredBusinessPhone(expected), false);
  assert.equal(replaceRetiredBusinessPhone("https://wa.me/16725147587"), BUSINESS.whatsapp);
});

test("other contacts, the current number and longer digit strings are preserved", () => {
  const text = `604-555-0100 / ${BUSINESS.phone} / 8767251475873`;
  assert.equal(containsRetiredBusinessPhone(text), false);
  assert.equal(replaceRetiredBusinessPhone(text), text);
});
