import assert from "node:assert/strict";
import test, { beforeEach, mock } from "node:test";

// Entirely isolated: every CMS write and email HTTP request is intercepted.
// Never load real environment credentials or contact an external service.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test";
process.env.NEXT_PUBLIC_SANITY_DATASET = "test";
process.env.SANITY_API_WRITE_TOKEN = "test-token";
process.env.BREVO_API_KEY = "test-email-key";
delete process.env.SANITY_API_TOKEN;
delete process.env.BREVO_SMTP_USER;
delete process.env.BREVO_SMTP_PASS;

const written: Record<string, unknown>[] = [];
const notifications: { textContent: string; htmlContent: string }[] = [];
const write = async (document: Record<string, unknown>) => {
  written.push(document);
  return document;
};
mock.module("../../sanity/lib/client.ts", {
  namedExports: { client: { withConfig: () => ({ create: write, createIfNotExists: write }) } },
});
mock.method(globalThis, "fetch", async (input: string | URL | Request, init?: RequestInit) => {
  assert.equal(String(input), "https://api.brevo.com/v3/smtp/email");
  assert.equal(init?.method, "POST");
  notifications.push(JSON.parse(String(init?.body)));
  return new Response("{}", { status: 201 });
});

const { createLead, createStudyClubInterest } = await import("./lead.ts");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = {
  firstName: "Test Parent",
  lastName: "",
  email: "parent@example.com",
  phone: "+44 20 7946 0958",
  subject: "Mathematics",
  message: "Help with <calculus> & exam preparation.",
  preferredContact: "email",
};

beforeEach(() => {
  written.length = 0;
  notifications.length = 0;
});

test("international phone is preserved in storage and both notification bodies", async () => {
  for (const phone of ["+44 20 7946 0958", "0044 20 7946 0958", "+45 32 12 34 56"]) {
    const result = await createLead(form({ ...valid, phone: `  ${phone}  ` }));
    assert.equal(result.stored, true);
    assert.equal(result.notified, true);
    assert.equal(written.at(-1)?.phone, phone, "preserve the submitted format after trimming");
    assert.equal(written.at(-1)?.preferredContact, "email");
    const notification = notifications.at(-1)!;
    assert.ok(notification.textContent.includes(`Phone: ${phone} (international number)`));
    assert.ok(notification.htmlContent.includes(`<strong>Phone:</strong> ${phone} (international number)`));
    assert.ok(notification.htmlContent.includes("&lt;calculus&gt; &amp; exam preparation."));
    assert.ok(notification.textContent.includes("<calculus> & exam preparation."));
  }
  assert.equal(written.length, 3);
  assert.equal(notifications.length, 3);
});

test("missing and malformed phones never write a lead or notify any inbox", async () => {
  for (const preferredContact of ["email", "phone", "both", "fax"]) {
    for (const phone of ["", "   ", "5550123", "Call +44 20 7946 0958", "+999 12345678", `+44${" ".repeat(41)}20 7946 0958`]) {
      const result = await createLead(form({ ...valid, preferredContact, phone }));
      assert.equal(result.success, false);
      assert.equal(result.stored, undefined);
      assert.match(result.message, /phone number/i);
    }
  }
  assert.equal(written.length, 0);
  assert.equal(notifications.length, 0);
});

test("an unrecognized preference falls back to both instead of bypassing email validation", async () => {
  const result = await createLead(form({ ...valid, email: "", preferredContact: "fax" }));
  assert.equal(result.success, false);
  assert.match(result.message, /email address/i);
  assert.equal(written.length, 0);
  assert.equal(notifications.length, 0);
});

test("Study Club requires a phone before capture and preserves a supplied international number", async () => {
  const fields = {
    parentName: "Test Parent",
    email: "parent@example.com",
    phone: "",
    grade: "Grade 9",
    subjectNeed: "Both",
    preferredWeekdays: "Monday",
    timeWindow: "Flexible",
    learningGoal: "Work through school assignments.",
    consent: "on",
  };
  const missing = await createStudyClubInterest(form(fields));
  assert.equal(missing.success, false);
  assert.match(missing.message, /phone number/i);
  assert.equal(written.length, 0);
  assert.equal(notifications.length, 0);

  const phone = "+44 20 7946 0958";
  const accepted = await createStudyClubInterest(form({ ...fields, phone }));
  assert.equal(accepted.stored, true);
  assert.equal(accepted.notified, true);
  assert.equal(written[0].phone, phone);
  assert.ok(notifications[0].textContent.includes(`Phone: ${phone}`));
  assert.ok(notifications[0].htmlContent.includes(`<strong>Phone:</strong> ${phone}`));
});
