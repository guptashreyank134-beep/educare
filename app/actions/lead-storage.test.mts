import assert from "node:assert/strict";
import test, { mock } from "node:test";

/**
 * Durable-storage behaviour, verified against a stubbed Sanity client.
 *
 * ISOLATED, NOT INTEGRATION: the Sanity module is replaced with an in-memory
 * double, so nothing touches the live dataset and no mail is sent. That covers
 * the success path — which the earlier failure-branch tests could not reach —
 * including whether a retry writes twice.
 *
 * Requires --experimental-test-module-mocks (wired into the npm test script).
 */

process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??= "test";
process.env.NEXT_PUBLIC_SANITY_DATASET ??= "test";
process.env.SANITY_API_WRITE_TOKEN = "test-token";
// No mail credentials: the notification is skipped, which is itself the
// "stored but not notified" case asserted below.
delete process.env.BREVO_API_KEY;
delete process.env.BREVO_SMTP_USER;
delete process.env.BREVO_SMTP_PASS;

/** Documents the stub has accepted, keyed by _id where one was supplied. */
const written: Record<string, unknown>[] = [];
let failNextWrite = false;

const writeClient = {
  create: async (doc: Record<string, unknown>) => {
    if (failNextWrite) throw new Error("simulated Sanity outage");
    written.push(doc);
    return doc;
  },
  createIfNotExists: async (doc: Record<string, unknown>) => {
    if (failNextWrite) throw new Error("simulated Sanity outage");
    // Mirrors Sanity's semantics: an existing _id is left untouched.
    if (written.some((d) => d._id === doc._id)) return doc;
    written.push(doc);
    return doc;
  },
};

mock.module("../../sanity/lib/client.ts", {
  namedExports: { client: { withConfig: () => writeClient } },
});

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
  message: "Stuck on rotational dynamics.",
  vertical: "local-k12",
  preferredContact: "email",
};

test("a stored lead is reported as captured even when the notification fails", async () => {
  written.length = 0;
  const result = await createLead(form({ ...VALID, submissionId: "abcdefgh1234" }));

  assert.equal(result.success, true, "storage succeeded, so the visitor is told so");
  assert.equal(result.stored, true);
  assert.equal(result.notified, false, "no mail credentials in this environment");
  assert.equal(written.length, 1, "exactly one document written");
});

test("the stored document carries the cleaned values and the chosen channel", async () => {
  written.length = 0;
  await createLead(
    form({ ...VALID, email: "  PRIYA@Example.COM  ", submissionId: "cleanvalues1" }),
  );

  const doc = written[0];
  assert.equal(doc.email, "priya@example.com", "email is normalised before storage");
  assert.equal(doc.preferredContact, "email");
  assert.equal(doc.subject, "University Physics");
  assert.equal(doc._id, "lead-cleanvalues1", "submission id namespaces the document id");
});

test("retrying with the same submission id does not file a second enquiry", async () => {
  written.length = 0;
  const payload = { ...VALID, submissionId: "retryme12345" };

  await createLead(form(payload));
  await createLead(form(payload));
  await createLead(form(payload));

  assert.equal(written.length, 1, "three attempts, one stored enquiry");
});

test("a different submission is stored separately", async () => {
  written.length = 0;
  await createLead(form({ ...VALID, submissionId: "firstperson1" }));
  await createLead(form({ ...VALID, submissionId: "secondperson" }));
  assert.equal(written.length, 2);
});

test("a storage outage is reported as a failure and stores nothing", async () => {
  written.length = 0;
  failNextWrite = true;
  try {
    const result = await createLead(form({ ...VALID, submissionId: "outage123456" }));
    assert.equal(result.success, false, "nothing durable exists, so this is not success");
    assert.equal(result.stored, false);
    assert.match(result.message, /try again/i);
    assert.equal(written.length, 0);
  } finally {
    failNextWrite = false;
  }
});

test("a submission without an id still stores, without idempotency", async () => {
  written.length = 0;
  await createLead(form(VALID));
  await createLead(form(VALID));
  // The older forms send no id, so each post is a separate enquiry. Recorded so
  // the difference is deliberate rather than discovered later.
  assert.equal(written.length, 2);
});
