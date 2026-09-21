"use server";

import { headers } from "next/headers";

import { client } from "@/sanity/lib/client";
import nodemailer from "nodemailer";
import { BUSINESS } from "@/data/businessInfo";
import {
  escapeHtml,
  isInternationalPhone,
  screenForBot,
  validateLead,
} from "@/lib/leadGuard";

// Route each vertical's lead notifications to its own inbox when configured,
// falling back to the shared inbox so nothing is ever silently dropped.
const FALLBACK_LEAD_EMAIL = "guptashreyank134@gmail.com";
// Always notify the business inbox, in addition to the routed/fallback inbox.
const ALWAYS_NOTIFY_EMAIL = BUSINESS.email;
const SENDER = { name: BUSINESS.name, email: BUSINESS.email };

const LEAD_EMAIL_BY_VERTICAL: Record<string, string | undefined> = {
  "local-k12": process.env.LEAD_EMAIL_LOCAL,
  medical: process.env.LEAD_EMAIL_MEDICAL,
  quant: process.env.LEAD_EMAIL_QUANT,
};

const VERTICAL_LABEL: Record<string, string> = {
  "local-k12": "Local (K-12)",
  medical: "Medical",
  quant: "Quant",
};

// The Sanity write token. Accept either name so the action works whether the
// environment defines SANITY_API_WRITE_TOKEN (used elsewhere in this repo) or
// SANITY_API_TOKEN. A missing token here is what silently broke the lead form.
const SANITY_WRITE_TOKEN =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

/**
 * Send the lead notification email. Prefers Brevo's HTTP API (works from
 * serverless with no SMTP IP-allowlist), and falls back to SMTP if only SMTP
 * credentials are configured. Returns true if the message was accepted.
 */
async function sendLeadEmail(opts: {
  recipients: string[];
  subject: string;
  text: string;
  html: string;
}): Promise<boolean> {
  const { recipients, subject, text, html } = opts;

  // 1) Brevo HTTP transactional API (recommended).
  if (process.env.BREVO_API_KEY) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: SENDER,
          to: recipients.map((email) => ({ email })),
          subject,
          textContent: text,
          htmlContent: html,
        }),
      });
      if (res.ok) return true;
      console.error(
        "Lead: Brevo API send failed:",
        res.status,
        await res.text().catch(() => ""),
      );
    } catch (err) {
      console.error("Lead: Brevo API error:", err);
    }
  }

  // 2) SMTP fallback (Brevo SMTP relay).
  if (process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.BREVO_SMTP_USER,
          pass: process.env.BREVO_SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: `"${SENDER.name}" <${SENDER.email}>`,
        to: recipients.join(", "),
        subject,
        text,
        html,
      });
      return true;
    } catch (err) {
      console.error("Lead: SMTP send failed:", err);
    }
  } else if (!process.env.BREVO_API_KEY) {
    console.warn("Lead: no Brevo API key or SMTP credentials — skipping email.");
  }

  return false;
}

/**
 * Recent submission times per client, newest last.
 *
 * In-memory, so it is per serverless instance rather than global: it blunts a
 * burst from one source hitting a warm instance, and is not a substitute for a
 * real limiter. It is here because it costs nothing; the honeypot and timing
 * checks are what actually stop the bot.
 */
const recentSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const recent = (recentSubmissions.get(clientKey) ?? []).filter(
    (at) => now - at < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  recentSubmissions.set(clientKey, recent);
  return recent.length > RATE_LIMIT_MAX;
}

/** Shown when a submission is discarded, so a bot learns nothing from the reply. */
const ACCEPTED_MESSAGE = "Thank you for your message! We will get back to you soon.";

export async function createLead(formData: FormData) {
  const firstName = (formData.get("firstName") as string) || "";
  const lastName = (formData.get("lastName") as string) || "";
  const email = (formData.get("email") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const subject = (formData.get("subject") as string) || "Website Contact Form";
  const message = (formData.get("message") as string) || "";
  const vertical = (formData.get("vertical") as string) || "local-k12";

  // Anti-spam fields. Both are absent on an older cached page, and neither
  // absence may condemn a submission.
  const honeypot = (formData.get("company") as string) || "";
  const startedAtRaw = (formData.get("formStartedAt") as string) || "";
  const startedAt = Number(startedAtRaw);
  const elapsedMs =
    Number.isFinite(startedAt) && startedAt > 0 ? Date.now() - startedAt : undefined;

  const submission = {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
    honeypot,
    elapsedMs,
  };

  // 1) Discard automated submissions silently. Returning the success message
  //    means a bot cannot tell a filtered post from an accepted one and has
  //    nothing to tune against.
  const verdict = screenForBot(submission);
  if (verdict.isBot) {
    console.warn(`Lead: discarded automated submission (${verdict.reasons.join("; ")})`);
    return { success: true, message: ACCEPTED_MESSAGE };
  }

  let clientKey = "unknown";
  try {
    const headerList = await headers();
    clientKey =
      headerList.get("x-forwarded-for")?.split(",")[0].trim() ||
      headerList.get("x-real-ip") ||
      "unknown";
  } catch {
    // Headers are unavailable outside a request scope; rate limiting is skipped.
  }
  if (clientKey !== "unknown" && isRateLimited(clientKey)) {
    console.warn("Lead: rate limit exceeded, discarding submission");
    return { success: true, message: ACCEPTED_MESSAGE };
  }

  // 2) Validate what a person could plausibly have typed. Unlike the bot
  //    screen, these failures are reported so a visitor can correct them.
  const validation = validateLead(submission);
  if (!validation.ok) {
    return { success: false, message: validation.message };
  }
  const lead = validation.lead;

  const verticalLabel = VERTICAL_LABEL[vertical] || VERTICAL_LABEL["local-k12"];
  const routedInbox = LEAD_EMAIL_BY_VERTICAL[vertical] || FALLBACK_LEAD_EMAIL;
  // Deduplicated recipient list: the routed inbox + the always-notify business inbox.
  const recipients = [...new Set([routedInbox, ALWAYS_NOTIFY_EMAIL])];

  // Capture the lead through two independent channels (Sanity + email) and
  // report success if EITHER one lands, so a single-channel outage never shows
  // the visitor an error or loses the enquiry.
  let sanityOk = false;

  // Store the lead in Sanity (visible in Studio).
  if (SANITY_WRITE_TOKEN) {
    try {
      const writeClient = client.withConfig({
        token: SANITY_WRITE_TOKEN,
        useCdn: false,
      });
      await writeClient.create({
        _type: "lead",
        vertical,
        name: `${firstName} ${lastName}`.trim(),
        subject,
        email,
        phone,
        message: `Subject: ${subject}\n\n${message}`,
        submittedAt: new Date().toISOString(),
      });
      sanityOk = true;
    } catch (err) {
      console.error("Lead: Sanity write failed:", err);
    }
  } else {
    console.error(
      "Lead: no Sanity write token (set SANITY_API_WRITE_TOKEN). Skipping CMS write.",
    );
  }

  // 3) Email the notification (Brevo API, SMTP fallback).
  //
  // Every interpolated value is escaped. These fields are attacker-controlled,
  // and an unescaped one lets a submitter place arbitrary markup — a plausible
  // link, say — inside a notification that looks like it came from our own site.
  const originNote = isInternationalPhone(lead.phone) ? " (international number)" : "";
  const safe = {
    name: escapeHtml(`${lead.firstName} ${lead.lastName}`.trim()),
    email: escapeHtml(lead.email),
    phone: escapeHtml(lead.phone) + originNote,
    subject: escapeHtml(lead.subject),
    message: escapeHtml(lead.message).replace(/\n/g, "<br>"),
  };

  const emailOk = await sendLeadEmail({
    recipients,
    subject: `New ${verticalLabel} Lead: ${lead.subject}`,
    text: `You have received a new ${verticalLabel} lead from the website.

Vertical: ${verticalLabel}
Name: ${lead.firstName} ${lead.lastName}
Email: ${lead.email}
Phone: ${lead.phone}${originNote}
Subject: ${lead.subject}

Message:
${lead.message}`,
    html: `
      <h2>New ${verticalLabel} Lead</h2>
      <p><strong>Vertical:</strong> ${verticalLabel}</p>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Phone:</strong> ${safe.phone}</p>
      <p><strong>Subject:</strong> ${safe.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${safe.message}</p>
    `,
  });

  if (sanityOk || emailOk) {
    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  }

  console.error(
    "Lead: BOTH channels failed (Sanity + email). Check SANITY_API_WRITE_TOKEN and BREVO_API_KEY / BREVO_SMTP_* env vars.",
  );
  return {
    success: false,
    message:
      `Sorry — we couldn't submit your request. Please call or WhatsApp us at ${BUSINESS.phone} and we'll help right away.`,
  };
}
