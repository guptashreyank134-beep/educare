"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createLead } from "@/app/actions/lead";

export type LeadVertical = "local-k12" | "medical" | "quant";

interface LeadFormProps {
  /** Which vertical this lead belongs to — drives Sanity tagging + email routing. */
  vertical: LeadVertical;
  /** Heading above the form. */
  heading?: string;
  /** Label for the "subject/interest" field (e.g. "Course / Exam"). */
  subjectLabel?: string;
  subjectPlaceholder?: string;
  /** Submit button text. */
  submitLabel?: string;
}

/**
 * Reusable, segmented lead form for the Medical and Quant verticals.
 * (The Local K-12 homepage/city pages use TrialClassForm.) Every submission
 * carries a `vertical` value so createLead can route it to the right inbox.
 */
const LeadForm: React.FC<LeadFormProps> = ({
  vertical,
  heading = "Book a Free 30-Minute Consultation",
  subjectLabel = "Subject / Course of Interest",
  subjectPlaceholder = "e.g. USMLE Step 1, Statistics, Actuarial exams",
  submitLabel = "Book Free Consultation",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const formElement = e.currentTarget;
    const rawData = new FormData(formElement);

    const fullName = (rawData.get("fullName") as string) || "";
    const interest = (rawData.get("subject") as string) || "";
    const level = (rawData.get("level") as string) || "";

    const formData = new FormData();
    formData.append("firstName", fullName);
    formData.append("lastName", "");
    formData.append("email", (rawData.get("email") as string) || "");
    formData.append("phone", (rawData.get("phone") as string) || "");
    formData.append("subject", interest);
    formData.append("vertical", vertical);
    formData.append(
      "message",
      [
        `Name: ${fullName}`,
        `Interest: ${interest}`,
        `Level: ${level}`,
        `Phone: ${rawData.get("phone")}`,
        `Email: ${rawData.get("email")}`,
      ].join("\n"),
    );

    const result = await createLead(formData);

    setIsSubmitting(false);
    setFeedback(result);
    if (result.success) {
      formElement.reset();
    }
  };

  return (
    <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 border border-[#F1F5F9]">
      {heading && (
        // Form-widget label, not a content heading — kept as <p> so it stays
        // out of the heading outline (avoids duplicate-heading across pages).
        <p className="text-[24px] font-bricolage font-medium text-slate text-center mb-6">
          {heading}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          placeholder="enter your name"
          id="fullName"
          name="fullName"
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="enter your email"
            id="email"
            name="email"
            required
          />
          <Input
            label="Phone / WhatsApp"
            type="tel"
            placeholder="enter your phone"
            id="phone"
            name="phone"
            required
          />
        </div>
        <Input
          label={subjectLabel}
          placeholder={subjectPlaceholder}
          id="subject"
          name="subject"
          required
        />
        <Input
          label="Level (optional)"
          placeholder="e.g. undergraduate, postgraduate, professional"
          id="level"
          name="level"
        />

        {feedback && (
          <div
            className={`p-4 rounded-xl text-center text-sm font-medium ${
              feedback.success
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="pt-2 flex flex-col items-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            iconRight={isSubmitting ? undefined : ArrowRight}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </span>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
