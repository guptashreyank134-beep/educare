"use server";

import { client } from "@/sanity/lib/client";
import nodemailer from "nodemailer";

// Route each vertical's lead notifications to its own inbox when configured,
// falling back to the shared inbox so nothing is ever silently dropped.
const FALLBACK_LEAD_EMAIL = "guptashreyank134@gmail.com";
// Always notify the business inbox, in addition to the routed/fallback inbox.
const ALWAYS_NOTIFY_EMAIL = "info@drshreyankeducare.com";
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

export async function createLead(formData: FormData) {
  const firstName = (formData.get("firstName") as string) || "";
  const lastName = (formData.get("lastName") as string) || "";
  const email = (formData.get("email") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const subject = (formData.get("subject") as string) || "Website Contact Form";
  const message = (formData.get("message") as string) || "";
  const vertical = (formData.get("vertical") as string) || "local-k12";
  const verticalLabel = VERTICAL_LABEL[vertical] || VERTICAL_LABEL["local-k12"];
  const routedInbox = LEAD_EMAIL_BY_VERTICAL[vertical] || FALLBACK_LEAD_EMAIL;
  // Deduplicated recipient list: the routed inbox + the always-notify business inbox.
  const recipient = [...new Set([routedInbox, ALWAYS_NOTIFY_EMAIL])].join(", ");

  // Capture the lead through two independent channels (Sanity + email) and
  // report success if EITHER one lands, so a single-channel outage never shows
  // the visitor an error or loses the enquiry.
  let sanityOk = false;
  let emailOk = false;

  // 1) Store the lead in Sanity (visible in Studio).
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

  // 2) Email the notification via Brevo SMTP.
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
        from: '"Dr. Shreyank Educare" <info@drshreyankeducare.com>',
        to: recipient,
        subject: `New ${verticalLabel} Lead: ${subject}`,
        text: `You have received a new ${verticalLabel} lead from the website.\n\nVertical: ${verticalLabel}\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <h2>New ${verticalLabel} Lead</h2>
          <p><strong>Vertical:</strong> ${verticalLabel}</p>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
      emailOk = true;
    } catch (err) {
      console.error("Lead: email notification failed:", err);
    }
  } else {
    console.warn("Lead: Brevo SMTP credentials not found. Skipping email.");
  }

  if (sanityOk || emailOk) {
    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  }

  // Both channels failed — surface an error and log so it can be diagnosed.
  console.error(
    "Lead: BOTH channels failed (Sanity + email). Check SANITY_API_WRITE_TOKEN and BREVO_SMTP_* env vars.",
  );
  return {
    success: false,
    message:
      "Sorry — we couldn't submit your request. Please call or WhatsApp us at +1 672-514-7587 and we'll help right away.",
  };
}
