"use server";

import { client } from "@/sanity/lib/client";
import nodemailer from "nodemailer";

// Route each vertical's lead notifications to its own inbox when configured,
// falling back to the shared inbox so nothing is ever silently dropped.
const FALLBACK_LEAD_EMAIL = "guptashreyank134@gmail.com";
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

export async function createLead(formData: FormData) {
  const firstName = (formData.get("firstName") as string) || "";
  const lastName = (formData.get("lastName") as string) || "";
  const email = (formData.get("email") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const subject = (formData.get("subject") as string) || "Website Contact Form";
  const message = (formData.get("message") as string) || "";
  const vertical = (formData.get("vertical") as string) || "local-k12";
  const verticalLabel = VERTICAL_LABEL[vertical] || VERTICAL_LABEL["local-k12"];
  const recipient = LEAD_EMAIL_BY_VERTICAL[vertical] || FALLBACK_LEAD_EMAIL;

  try {
    // Note: We use a write-enabled client for server actions
    // Since sanity/lib/client.ts uses useCdn: true, we need a fresh one with token for writing
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
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

    // Setup Nodemailer transport with Brevo SMTP
    if (process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.BREVO_SMTP_USER,
          pass: process.env.BREVO_SMTP_PASS,
        },
      });

      const mailOptions = {
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
      };

      // Await email sending to guarantee it succeeds in serverless environments
      try {
        await transporter.sendMail(mailOptions);
      } catch (err: unknown) {
        console.error("Failed to send email notification:", err);
      }
    } else {
      console.warn(
        "Brevo SMTP credentials not found. Skipping email notification.",
      );
    }

    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error: unknown) {
    console.error("Error creating lead:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
