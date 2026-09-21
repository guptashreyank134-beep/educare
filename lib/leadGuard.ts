/** @format */

// Validation and spam screening for the lead form.
//
// Everything here runs on the server. Client-side `required` and `type="email"`
// attributes only shape the browser UI — a bot posts the server action directly
// and never executes that code, which is how fields like "UkVbzYdSfOSXpLDAK"
// reached the inbox.
//
// Two different jobs, deliberately separated:
//   - `validateLead` rejects input a person could not have meant, and returns a
//     message the visitor sees. It must never reject a real enquiry.
//   - `screenForBot` looks for evidence the submitter was automated. Its
//     verdicts are discarded silently, so a bot learns nothing from the reply.

/**
 * Which channel the visitor asked to be contacted on.
 *
 * "both" is the default so the older forms, which require an email and a phone
 * number, keep validating exactly as before.
 */
export type PreferredContact = "email" | "phone" | "both";

export interface LeadInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** Defaults to "both" for forms that collect and require each field. */
  preferredContact?: PreferredContact;
  /** Hidden field no human fills in; bots complete every input they find. */
  honeypot?: string;
  /** Milliseconds the form was on screen before submission. */
  elapsedMs?: number;
}

export interface CleanLead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Digits only, for storage and de-duplication. */
  phoneDigits: string;
  subject: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; lead: CleanLead }
  | { ok: false; field: "email" | "phone" | "name"; message: string };

/** Escapes text before it is interpolated into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Deliberately not the full RFC grammar. This rejects what is actually wrong —
// missing parts, whitespace, a bare or malformed domain — without turning away
// valid addresses over exotic but legal syntax.
const EMAIL_PATTERN = /^[^\s@,;:<>()[\]\\]+@[^\s@.,;:<>()[\]\\]+(\.[^\s@.,;:<>()[\]\\]+)+$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(raw: string): boolean {
  const email = normalizeEmail(raw);
  if (email.length < 6 || email.length > 254) return false;
  if (!EMAIL_PATTERN.test(email)) return false;

  const [local, ...domainParts] = email.split("@");
  const domain = domainParts.join("@");
  if (local.length > 64) return false;
  if (email.includes("..")) return false;
  if (domain.startsWith("-") || domain.endsWith("-")) return false;

  // The final label is the TLD: letters only, at least two of them.
  const tld = domain.split(".").pop() ?? "";
  return /^[a-z]{2,}$/.test(tld);
}

/** Digits only, dropping a leading international "00" prefix. */
export function phoneDigits(raw: string): string {
  return raw.replace(/\D/g, "").replace(/^00/, "");
}

/**
 * A plausible phone number anywhere in the world.
 *
 * Length is checked against the E.164 range rather than the North American
 * pattern: this business tutors students online internationally, so rejecting
 * non-NANP numbers would discard real enquiries. Structure is validated; origin
 * is reported, not blocked.
 */
export function isValidPhone(raw: string): boolean {
  const digits = phoneDigits(raw);
  if (digits.length < 7 || digits.length > 15) return false;
  // A single repeated digit, or a straight run, is filler rather than a number.
  if (/^(\d)\1+$/.test(digits)) return false;
  if ("01234567890123456789".includes(digits)) return false;
  if ("98765432109876543210".includes(digits)) return false;
  return true;
}

/** True when the number is not a North American (NANP) number. */
export function isInternationalPhone(raw: string): boolean {
  const digits = phoneDigits(raw);
  if (digits.length === 10) return false;
  if (digits.length === 11 && digits.startsWith("1")) return false;
  return true;
}

/**
 * Heuristic for machine-generated strings such as "UkVbzYdSfOSXpLDAK".
 *
 * Tuned to stay quiet on real names. Latin script only: a name in another script
 * has no vowel/consonant structure to measure, so it is never judged here.
 */
export function looksRandom(value: string): boolean {
  const token = value.trim();
  if (token.length < 8) return false;
  if (/\s/.test(token)) return false;
  if (!/^[A-Za-z]+$/.test(token)) return false;

  const vowels = (token.match(/[aeiouAEIOU]/g) ?? []).length;
  const vowelRatio = vowels / token.length;

  // Case flips inside a word: "UkVbzYdSf" flips repeatedly, "McDonald" twice.
  let caseFlips = 0;
  for (let i = 1; i < token.length; i++) {
    const prevUpper = token[i - 1] === token[i - 1].toUpperCase();
    const currUpper = token[i] === token[i].toUpperCase();
    if (prevUpper !== currUpper) caseFlips++;
  }

  const longestConsonantRun = Math.max(
    0,
    ...(token.toLowerCase().match(/[^aeiou]+/g) ?? []).map((run) => run.length),
  );

  // Two independent signals must agree before a string is called random, so an
  // unusual real name trips at most one of them.
  const signals = [vowelRatio < 0.2, caseFlips >= 5, longestConsonantRun >= 5];
  return signals.filter(Boolean).length >= 2;
}

export function validateLead(input: LeadInput): ValidationResult {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const name = `${firstName} ${lastName}`.trim();
  const preferred: PreferredContact = input.preferredContact ?? "both";

  if (name.length < 2 || name.length > 100) {
    return { ok: false, field: "name", message: "Please enter your name." };
  }

  // Only the channel the visitor chose is required. Asking someone who wants a
  // phone call to supply an email as well is a reason to abandon the form, and
  // the field they did not choose is not shown to them at all.
  const needsEmail = preferred === "email" || preferred === "both";
  const needsPhone = preferred === "phone" || preferred === "both";

  if (needsEmail && !isValidEmail(input.email)) {
    return {
      ok: false,
      field: "email",
      message: "That email address doesn't look right — please check it and try again.",
    };
  }

  if (needsPhone && !isValidPhone(input.phone)) {
    return {
      ok: false,
      field: "phone",
      message: "That phone number doesn't look right — please check it and try again.",
    };
  }

  // A value supplied in the channel they did not pick still has to be sane, so
  // a stray malformed entry never reaches the notification.
  if (!needsEmail && input.email.trim() && !isValidEmail(input.email)) {
    return {
      ok: false,
      field: "email",
      message: "That email address doesn't look right — please check it and try again.",
    };
  }
  if (!needsPhone && input.phone.trim() && !isValidPhone(input.phone)) {
    return {
      ok: false,
      field: "phone",
      message: "That phone number doesn't look right — please check it and try again.",
    };
  }

  return {
    ok: true,
    lead: {
      firstName,
      lastName,
      email: normalizeEmail(input.email),
      phone: input.phone.trim(),
      phoneDigits: phoneDigits(input.phone),
      subject: input.subject.trim() || "Website Contact Form",
      message: input.message.trim(),
    },
  };
}

export interface BotVerdict {
  isBot: boolean;
  reasons: string[];
}

/**
 * Evidence that a submission was automated.
 *
 * The honeypot and the timing check are near-zero-false-positive signals and
 * each condemn on their own. The text heuristic is weaker, so it only condemns
 * when two separate fields look generated — a person does not type random
 * strings into their name and their subject at once.
 */
export function screenForBot(input: LeadInput): BotVerdict {
  const reasons: string[] = [];

  if (input.honeypot && input.honeypot.trim() !== "") {
    reasons.push("honeypot field was filled");
  }

  // A person cannot read the form, type a name, an email, a phone number and a
  // message in under two seconds.
  if (typeof input.elapsedMs === "number" && input.elapsedMs >= 0 && input.elapsedMs < 2000) {
    reasons.push(`submitted ${input.elapsedMs}ms after the form loaded`);
  }

  const randomFields = [
    ["name", `${input.firstName} ${input.lastName}`.trim()],
    ["subject", input.subject],
    ["message", input.message],
  ].filter(([, value]) => looksRandom(String(value)));

  if (randomFields.length >= 2) {
    reasons.push(`random-looking text in ${randomFields.map(([f]) => f).join(" and ")}`);
  }

  return { isBot: reasons.length > 0, reasons };
}
