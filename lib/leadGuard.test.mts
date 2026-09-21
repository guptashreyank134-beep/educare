import assert from "node:assert/strict";
import test from "node:test";

import {
  escapeHtml,
  isInternationalPhone,
  isValidEmail,
  isValidPhone,
  looksRandom,
  phoneDigits,
  screenForBot,
  validateLead,
} from "./leadGuard.ts";

/** The submission that prompted this work, copied from the notification email. */
const REAL_SPAM = {
  firstName: "Btwrksle",
  lastName: "",
  email: "r.upel.o.x.a314@gmail.com",
  phone: "6337166447",
  subject: "UkVbzYdSfOSXpLDAK",
  message: "Name: Btwrksle\nInterest: UkVbzYdSfOSXpLDAK\nLevel: POlHbIjHHmmYqCSEVZ",
};

test("the real spam submission is caught", () => {
  const verdict = screenForBot(REAL_SPAM);
  assert.equal(verdict.isBot, true, `expected a bot verdict, got: ${verdict.reasons.join("; ")}`);
});

test("a normal enquiry is not caught", () => {
  const verdict = screenForBot({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    phone: "(604) 123-4567",
    subject: "Chemistry 12 tutoring",
    message: "Hi, my daughter is in Grade 12 and needs help with equilibrium before her final.",
  });
  assert.equal(verdict.isBot, false, verdict.reasons.join("; "));
});

test("awkward real names are never rejected on their own", () => {
  // Some of these do trip the text heuristic, which is why a single random
  // field is never enough to condemn a submission.
  const names: [string, string][] = [
    ["Krzysztof", "Nowak"],
    ["Nguyen", "Pham"],
    ["Schmidt", "Braun"],
    ["Wojciech", "Szczepanski"],
    ["Dvorak", "Novak"],
    ["Shreyank", "Gupta"],
    ["Xiuying", "Zhang"],
    ["Ng", "Wai"],
  ];
  for (const [firstName, lastName] of names) {
    const verdict = screenForBot({
      firstName,
      lastName,
      email: "parent@example.com",
      phone: "6041234567",
      subject: "Maths tutoring for Grade 11",
      message: "Could we book a consultation for my son this term?",
    });
    assert.equal(
      verdict.isBot,
      false,
      `${firstName} ${lastName} was wrongly flagged: ${verdict.reasons.join("; ")}`,
    );
  }
});

test("honeypot alone condemns", () => {
  const verdict = screenForBot({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@example.com",
    phone: "6041234567",
    subject: "Tutoring",
    message: "Hello, I would like to book a consultation.",
    honeypot: "http://spam.example",
  });
  assert.equal(verdict.isBot, true);
});

test("an instant submission condemns, a considered one does not", () => {
  const base = {
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@example.com",
    phone: "6041234567",
    subject: "Tutoring",
    message: "Hello, I would like to book a consultation.",
  };
  assert.equal(screenForBot({ ...base, elapsedMs: 300 }).isBot, true);
  assert.equal(screenForBot({ ...base, elapsedMs: 45_000 }).isBot, false);
  // A missing timestamp must not condemn: older cached pages will not send one.
  assert.equal(screenForBot(base).isBot, false);
});

test("looksRandom separates generated strings from words", () => {
  for (const token of ["UkVbzYdSfOSXpLDAK", "POlHbIjHHmmYqCSEVZ", "Btwrksle"]) {
    assert.equal(looksRandom(token), true, `${token} should read as generated`);
  }
  for (const token of ["Chemistry", "Vancouver", "Consultation", "Mathematics", "Shreyank"]) {
    assert.equal(looksRandom(token), false, `${token} should read as a word`);
  }
});

test("email validation accepts real addresses and rejects malformed ones", () => {
  for (const email of [
    "priya.sharma@example.com",
    "r.upel.o.x.a314@gmail.com", // structurally valid; caught by other signals
    "first+tag@sub.domain.co.uk",
    "STUDENT@UBC.CA",
  ]) {
    assert.equal(isValidEmail(email), true, `${email} should be accepted`);
  }
  for (const email of [
    "",
    "abc",
    "a@b",
    "a@b.c",
    "no space@example.com",
    "double..dot@example.com",
    "@example.com",
    "trailing@example.",
    "comma,@example.com",
  ]) {
    assert.equal(isValidEmail(email), false, `${email} should be rejected`);
  }
});

test("phone validation accepts real formats and rejects filler", () => {
  for (const phone of ["(604) 123-4567", "+1 672-514-7587", "6337166447", "+44 20 7946 0958"]) {
    assert.equal(isValidPhone(phone), true, `${phone} should be accepted`);
  }
  for (const phone of ["", "123", "1111111111", "1234567890", "0987654321", "abcdefghij"]) {
    assert.equal(isValidPhone(phone), false, `${phone} should be rejected`);
  }
});

test("phone origin is reported, not blocked", () => {
  assert.equal(isInternationalPhone("(604) 123-4567"), false);
  assert.equal(isInternationalPhone("+1 672-514-7587"), false);
  assert.equal(isInternationalPhone("6337166447"), false); // 10 digits reads as NANP
  assert.equal(isInternationalPhone("+44 20 7946 0958"), true);
  assert.equal(phoneDigits("+1 (604) 123-4567"), "16041234567");
});

test("validateLead returns a usable lead or a field-specific message", () => {
  const good = validateLead({
    firstName: "Priya",
    lastName: "Sharma",
    email: "  PRIYA@Example.COM ",
    phone: " (604) 123-4567 ",
    subject: "",
    message: "Hello",
  });
  assert.equal(good.ok, true);
  if (good.ok) {
    assert.equal(good.lead.email, "priya@example.com");
    assert.equal(good.lead.phoneDigits, "6041234567");
    assert.equal(good.lead.subject, "Website Contact Form");
  }

  const badEmail = validateLead({ ...REAL_SPAM, email: "not-an-email" });
  assert.equal(badEmail.ok, false);
  if (!badEmail.ok) assert.equal(badEmail.field, "email");

  const badPhone = validateLead({ ...REAL_SPAM, phone: "111" });
  assert.equal(badPhone.ok, false);
  if (!badPhone.ok) assert.equal(badPhone.field, "phone");
});

test("html is escaped before it reaches the notification email", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)">'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
  );
  assert.equal(escapeHtml("Tom & Jerry's"), "Tom &amp; Jerry&#39;s");
});
