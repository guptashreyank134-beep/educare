import assert from "node:assert/strict";
import test from "node:test";

import { isConfirmedCapture, trackEvent } from "./analytics.ts";

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

/** Captures dataLayer pushes without a browser, to assert shape and PII-freeness. */
function withFakeWindow(run: () => void): Record<string, unknown>[] {
  const pushes: Record<string, unknown>[] = [];
  const globalRef = globalThis as unknown as { window?: unknown };
  const previous = globalRef.window;
  globalRef.window = {
    dataLayer: { push: (event: Record<string, unknown>) => pushes.push(event) },
    location: { pathname: "/programs/physics" },
  };
  try {
    run();
  } finally {
    if (previous === undefined) delete globalRef.window;
    else globalRef.window = previous;
  }
  return pushes;
}

test("each analytics event pushes the expected shape", () => {
  const pushes = withFakeWindow(() => {
    trackEvent("consultation_cta_click", { form_id: "physics-enquiry" });
    trackEvent("enquiry_form_start", { form_id: "physics-enquiry" });
    trackEvent("generate_lead", { form_id: "physics-enquiry", lead_subject: "Physics" });
    trackEvent("enquiry_form_error", { form_id: "physics-enquiry", reason: "validation_email" });
  });

  assert.equal(pushes.length, 4);
  assert.deepEqual(
    pushes.map((p) => p.event),
    ["consultation_cta_click", "enquiry_form_start", "generate_lead", "enquiry_form_error"],
  );
  // Every event carries the page, so GTM can segment without extra config.
  assert.ok(pushes.every((p) => p.page === "/programs/physics"));
  assert.equal(pushes[2].lead_subject, "Physics");
  assert.equal(pushes[3].reason, "validation_email");
});

test("no personal data can reach analytics", () => {
  const pushes = withFakeWindow(() => {
    // trackEvent accepts no name, email, phone or free-text field by design:
    // these would be dropped even if a caller tried.
    // A caller that tried to attach personal fields: the parameter type has no
    // slot for them, and trackEvent copies only the fields it knows about.
    const withExtras = {
      form_id: "physics-enquiry",
      lead_subject: "Physics",
      email: "priya@example.com",
      name: "Priya",
      help: "midterm help",
    } as unknown as Parameters<typeof trackEvent>[1];
    trackEvent("generate_lead", withExtras);
  });

  const serialised = JSON.stringify(pushes);
  for (const leak of ["priya@example.com", "Priya", "midterm help"]) {
    assert.ok(!serialised.includes(leak), `${leak} must never be sent to analytics`);
  }
  assert.deepEqual(Object.keys(pushes[0]).sort(), ["event", "form_id", "lead_subject", "page"]);
});

test("tracking never throws when there is no browser", () => {
  // Server render: window is absent, and the call must be a no-op.
  assert.doesNotThrow(() => trackEvent("generate_lead", { form_id: "physics-enquiry" }));
});
