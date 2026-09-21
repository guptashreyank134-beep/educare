import assert from "node:assert/strict";
import test from "node:test";

import { isConfirmedCapture } from "./analytics.ts";

test("generate_lead counts only a confirmed durable capture", () => {
  assert.equal(isConfirmedCapture({ success: true, stored: true, notified: true }), true);
  // Stored but the notification failed: still a real lead, sitting in Studio.
  assert.equal(isConfirmedCapture({ success: true, stored: true, notified: false }), true);
});

test("generate_lead does not fire without durable storage", () => {
  // Not stored: the visitor is asked to retry, so there is no lead to count.
  assert.equal(isConfirmedCapture({ success: false, stored: false, notified: true }), false);
  // A submission discarded as automated returns success with no stored flag.
  // It must not inflate the conversion metric.
  assert.equal(isConfirmedCapture({ success: true }), false);
  assert.equal(isConfirmedCapture({ success: false }), false);
});
