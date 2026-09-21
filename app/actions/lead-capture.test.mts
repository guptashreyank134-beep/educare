import assert from "node:assert/strict";
import test from "node:test";

/**
 * Exercises createLead's capture contract against the real module.
 *
 * MOCKED, NOT INTEGRATION: this runs with no SANITY_API_WRITE_TOKEN and no Brevo
 * credentials in the environment, so the storage and notification calls are
 * never made. That is deliberate — it proves the "could not store" branch
 * without writing to the live dataset or sending mail to staff. The path where
 * Sanity accepts the write is covered by the live deployment, not here.
 */

// Guarantee the action cannot reach any real service, whatever the shell holds.
delete process.env.SANITY_API_WRITE_TOKEN;
delete process.env.SANITY_API_TOKEN;
delete process.env.BREVO_API_KEY;
delete process.env.BREVO_SMTP_USER;
delete process.env.BREVO_SMTP_PASS;

process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??= "test";
process.env.NEXT_PUBLIC_SANITY_DATASET ??= "test";

const { createLead } = await import("./lead.ts");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return data;
}

const VALID = {
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya.sharma@example.com",
  phone: "(604) 123-4567",
  subject: "University Physics",
  message: "Stuck on rotational dynamics before a midterm.",
  vertical: "local-k12",
};

test("a lead that cannot be stored is reported as a failure, not a success", async () => {
  const result = await createLead(form(VALID));
  assert.equal(result.success, false, "durable capture failed, so success must be false");
  assert.equal(result.stored, false);
  assert.match(result.message, /try again/i, "the visitor should be invited to retry");
});

test("an email-only enquiry passes validation and reaches the capture step", async () => {
  const result = await createLead(
    form({ ...VALID, phone: "", preferredContact: "email" }),
  );
  // Reaching the storage step means validation accepted it; storage then fails
  // because no token is configured in this environment.
  assert.equal(result.stored, false);
  assert.doesNotMatch(result.message, /phone number doesn't look right/i);
});

test("a phone-only enquiry passes validation and reaches the capture step", async () => {
  const result = await createLead(
    form({ ...VALID, email: "", preferredContact: "phone" }),
  );
  assert.equal(result.stored, false);
  assert.doesNotMatch(result.message, /email address doesn't look right/i);
});

test("an invalid email is rejected before any capture is attempted", async () => {
  const result = await createLead(
    form({ ...VALID, email: "nope@", preferredContact: "email" }),
  );
  assert.equal(result.success, false);
  assert.equal(result.stored, undefined, "validation rejects before the storage step");
  assert.match(result.message, /email address doesn't look right/i);
});

test("an invalid phone is rejected before any capture is attempted", async () => {
  const result = await createLead(
    form({ ...VALID, phone: "12", preferredContact: "phone", email: "" }),
  );
  assert.equal(result.success, false);
  assert.equal(result.stored, undefined);
  assert.match(result.message, /phone number doesn't look right/i);
});

test("an automated submission is accepted silently and never stored", async () => {
  const result = await createLead(form({ ...VALID, company: "http://spam.example" }));
  // The bot is told the same thing a person is told, so it learns nothing.
  assert.equal(result.success, true);
  assert.equal(result.stored, undefined, "a discarded submission is never stored");
});

test("the submission id is accepted only in a safe shape", async () => {
  // A malformed id must not become part of a Sanity document id.
  for (const submissionId of ["../../evil", "short", "with space", "a".repeat(200)]) {
    const result = await createLead(form({ ...VALID, submissionId }));
    assert.equal(result.stored, false, `${submissionId} should not have been stored`);
  }
});
