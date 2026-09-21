import assert from "node:assert/strict";
import test from "node:test";

import { screenForBot, validateLead } from "../../lib/leadGuard.ts";

/**
 * End-to-end shape of what createLead receives from the three forms, exercised
 * through the same guards the action calls. The action itself is not imported
 * here because it writes to Sanity and sends mail; these assert the decision it
 * makes before either happens.
 */
function decide(fields: Record<string, string>) {
  const input = {
    firstName: fields.firstName ?? "",
    lastName: fields.lastName ?? "",
    email: fields.email ?? "",
    phone: fields.phone ?? "",
    subject: fields.subject ?? "",
    message: fields.message ?? "",
    honeypot: fields.company ?? "",
    elapsedMs: fields.formStartedAt ? Date.now() - Number(fields.formStartedAt) : undefined,
  };
  if (screenForBot(input).isBot) return "discarded" as const;
  return validateLead(input).ok ? ("accepted" as const) : ("rejected" as const);
}

test("the submission from the reported email is discarded", () => {
  assert.equal(
    decide({
      firstName: "Btwrksle",
      email: "r.upel.o.x.a314@gmail.com",
      phone: "6337166447",
      subject: "UkVbzYdSfOSXpLDAK",
      message: "Name: Btwrksle\nInterest: UkVbzYdSfOSXpLDAK\nLevel: POlHbIjHHmmYqCSEVZ",
    }),
    "discarded",
  );
});

test("a bot that fills every field, honeypot included, is discarded", () => {
  assert.equal(
    decide({
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "6041234567",
      subject: "Tutoring enquiry",
      message: "I would like to book a consultation for my son.",
      company: "https://buy-cheap-things.example",
    }),
    "discarded",
  );
});

test("an instant post is discarded even when every field looks human", () => {
  assert.equal(
    decide({
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "6041234567",
      subject: "Tutoring enquiry",
      message: "I would like to book a consultation for my son.",
      formStartedAt: String(Date.now() - 200),
    }),
    "discarded",
  );
});

test("a real enquiry is accepted", () => {
  assert.equal(
    decide({
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@example.com",
      phone: "(604) 123-4567",
      subject: "Chemistry 12 tutoring",
      message: "My daughter needs help with equilibrium before her final in June.",
      formStartedAt: String(Date.now() - 40_000),
    }),
    "accepted",
  );
});

test("a real enquiry from an older cached page, with no anti-spam fields, is accepted", () => {
  assert.equal(
    decide({
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@example.com",
      phone: "(604) 123-4567",
      subject: "Chemistry 12 tutoring",
      message: "My daughter needs help with equilibrium before her final.",
    }),
    "accepted",
  );
});

test("a mistyped email or phone is reported back, not silently dropped", () => {
  const common = {
    firstName: "Priya",
    lastName: "Sharma",
    subject: "Tutoring",
    message: "Please call me about Grade 11 maths.",
  };
  assert.equal(decide({ ...common, email: "priya@", phone: "6041234567" }), "rejected");
  assert.equal(decide({ ...common, email: "priya@example.com", phone: "12" }), "rejected");
});

test("an international enquiry is accepted", () => {
  assert.equal(
    decide({
      firstName: "Ahmed",
      lastName: "Hassan",
      email: "ahmed.hassan@example.co.uk",
      phone: "+44 20 7946 0958",
      subject: "MCAT preparation",
      message: "I am studying medicine abroad and need online MCAT support.",
    }),
    "accepted",
  );
});
