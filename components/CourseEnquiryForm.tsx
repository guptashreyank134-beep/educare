"use client";

import React, { useId, useRef, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { createLead } from "@/app/actions/lead";
import FormSpamFields from "@/components/FormSpamFields";
import { Button } from "@/components/ui/Button";
import { isConfirmedCapture, trackEvent, type EnquiryErrorReason } from "@/lib/analytics";

type ContactMethod = "email" | "phone";

interface CourseEnquiryFormProps {
  /** Recorded as the lead subject. Set by the page, never typed by the visitor. */
  subject: string;
  /** Identifies the form in analytics, e.g. "university-physics-enquiry". */
  formId: string;
  /** Example for the optional course field, e.g. "UBC PHYS 117 or SFU PHYS 120". */
  courseExample: string;
  /** Routes the notification and tags the lead. */
  vertical?: "local-k12" | "medical" | "quant";
}

/** Maps a server rejection to a coarse analytics reason; no message text is sent. */
function reasonFor(message: string): EnquiryErrorReason {
  if (/email/i.test(message)) return "validation_email";
  if (/phone/i.test(message)) return "validation_phone";
  if (/name/i.test(message)) return "validation_name";
  return "not_stored";
}

const labelClass = "block text-[14px] font-montserrat font-medium text-slate mb-1.5";
const fieldClass =
  "w-full rounded-[8px] border border-[#E2E8F0] bg-white px-4 py-3 text-[16px] font-montserrat text-slate " +
  "placeholder:text-slate/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

/**
 * Compact enquiry form for a single course page.
 *
 * Asks for one contact method rather than both: requiring an email from someone
 * who wants a phone call is a reason to abandon the form, and the server
 * validates whichever channel was chosen.
 *
 * Success is shown only when the server confirms the lead was stored durably —
 * a sent notification alone is not treated as capture — and the entered values
 * are preserved on failure so a retry costs nothing.
 */
export default function CourseEnquiryForm({
  subject,
  formId,
  courseExample,
  vertical = "local-k12",
}: CourseEnquiryFormProps) {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    course: `${uid}-course`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    help: `${uid}-help`,
    status: `${uid}-status`,
  };

  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captured, setCaptured] = useState(false);

  // One id per filled-in form, reused across retries so a second attempt
  // resolves against the same record instead of filing a duplicate. Generated
  // on first submit rather than during render: crypto.randomUUID and Date.now
  // are impure, and a render-time call can produce a different id per render.
  const submissionId = useRef<string | null>(null);
  const getSubmissionId = () => {
    if (!submissionId.current) {
      submissionId.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }
    return submissionId.current;
  };
  const startedRef = useRef(false);

  /** Fires once per interaction, on the first edit rather than on render. */
  const handleFirstInput = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("enquiry_form_start", { form_id: formId });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Guards the pending window: a second click while in flight is ignored.
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const raw = new FormData(form);
    const name = ((raw.get("fullName") as string) || "").trim();
    const course = ((raw.get("course") as string) || "").trim();
    const help = ((raw.get("help") as string) || "").trim();
    const marketingOptIn = raw.get("marketingOptIn") === "on";

    const payload = new FormData();
    payload.append("firstName", name);
    payload.append("lastName", "");
    payload.append("email", (raw.get("email") as string) || "");
    payload.append("phone", (raw.get("phone") as string) || "");
    payload.append("subject", subject);
    payload.append("vertical", vertical);
    payload.append("preferredContact", contactMethod);
    payload.append("submissionId", getSubmissionId());
    payload.append("company", (raw.get("company") as string) || "");
    payload.append("formStartedAt", (raw.get("formStartedAt") as string) || "");
    payload.append(
      "message",
      [
        `Name: ${name}`,
        `Subject: ${subject}`,
        course ? `University / course code: ${course}` : null,
        `Preferred contact: ${contactMethod}`,
        help ? `Needs help with: ${help}` : null,
        `Marketing opt-in: ${marketingOptIn ? "yes" : "no"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    try {
      const result = await createLead(payload);

      // Only a confirmed durable write counts: see isConfirmedCapture.
      if (isConfirmedCapture(result)) {
        setCaptured(true);
        trackEvent("generate_lead", { form_id: formId, lead_subject: subject });
        return;
      }

      setError(result.message);
      trackEvent("enquiry_form_error", { form_id: formId, reason: reasonFor(result.message) });
    } catch {
      setError(
        "Something went wrong sending your enquiry. Please try again, or call us and we'll help right away.",
      );
      trackEvent("enquiry_form_error", { form_id: formId, reason: "network" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (captured) {
    return (
      <div
        className="rounded-[20px] border border-[#F1F5F9] bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
        role="status"
      >
        <p className="text-[20px] font-bricolage font-medium text-slate mb-2">
          Thank you — we have your enquiry.
        </p>
        <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed">
          We typically respond within 24 hours on business days to arrange your free
          30-minute consultation.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-[20px] border border-[#F1F5F9] bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      <p className="text-[22px] font-bricolage font-medium text-slate mb-1">
        Ask about {subject.toLowerCase()} tutoring
      </p>
      <p className="text-[14px] font-montserrat text-slate/70 mb-6">
        Takes under a minute. We reply within 24 hours on business days.
      </p>

      <form onSubmit={handleSubmit} onInput={handleFirstInput} className="space-y-5" noValidate>
        <FormSpamFields />

        <div>
          <label htmlFor={ids.name} className={labelClass}>
            Your name
          </label>
          <input
            id={ids.name}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
            placeholder="e.g. Priya Sharma"
          />
        </div>

        <div>
          <label htmlFor={ids.course} className={labelClass}>
            University and course code{" "}
            <span className="font-normal text-slate/50">(optional)</span>
          </label>
          <input
            id={ids.course}
            name="course"
            type="text"
            autoComplete="off"
            className={fieldClass}
            placeholder={`e.g. ${courseExample}`}
          />
        </div>

        <fieldset>
          <legend className={labelClass}>How should we reach you?</legend>
          <div className="flex gap-3">
            {(["email", "phone"] as ContactMethod[]).map((method) => {
              const selected = contactMethod === method;
              return (
                <label
                  key={method}
                  className={`flex-1 cursor-pointer rounded-[8px] border px-4 py-3 text-center text-[15px] font-montserrat capitalize transition-colors ${
                    selected
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-[#E2E8F0] text-slate/70 hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={selected}
                    onChange={() => setContactMethod(method)}
                    className="sr-only"
                  />
                  {method}
                </label>
              );
            })}
          </div>
        </fieldset>

        {contactMethod === "email" ? (
          <div>
            <label htmlFor={ids.email} className={labelClass}>
              Email address
            </label>
            <input
              id={ids.email}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              className={fieldClass}
              placeholder="e.g. you@example.com"
            />
          </div>
        ) : (
          <div>
            <label htmlFor={ids.phone} className={labelClass}>
              Phone number
            </label>
            <input
              id={ids.phone}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className={fieldClass}
              placeholder="e.g. (604) 123-4567"
            />
          </div>
        )}

        <div>
          <label htmlFor={ids.help} className={labelClass}>
            What do you need help with?{" "}
            <span className="font-normal text-slate/50">(optional)</span>
          </label>
          <textarea
            id={ids.help}
            name="help"
            rows={3}
            className={fieldClass}
            placeholder="e.g. midterm on rotational dynamics in three weeks"
          />
        </div>

        <label className="flex items-start gap-3 text-[14px] font-montserrat text-slate/70">
          <input
            type="checkbox"
            name="marketingOptIn"
            className="mt-1 h-4 w-4 shrink-0 rounded border-[#E2E8F0] accent-primary"
          />
          <span>
            Send me occasional study tips and updates. Optional — leaving this unticked
            does not affect your enquiry.
          </span>
        </label>

        {/* The live region announces both failures and the pending state. */}
        <div id={ids.status} aria-live="polite" className="min-h-0">
          {error && (
            <p className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-montserrat text-red-700">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-describedby={ids.status}
          className="w-full justify-center"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </span>
          ) : (
            "Book a Free 30-Minute Consultation"
          )}
        </Button>

        <p className="text-[13px] font-montserrat text-slate/60 leading-relaxed">
          We use your details only to reply to this enquiry. See our{" "}
          <Link href="/privacy" className="text-primary underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
