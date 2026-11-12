"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { createStudyClubInterest } from "@/app/actions/lead";
import FormSpamFields from "@/components/FormSpamFields";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full rounded-lg border border-[#D8E0EA] bg-white px-4 py-3 text-[16px] font-montserrat text-slate " +
  "placeholder:text-slate/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-2 block text-[14px] font-montserrat font-semibold text-slate";
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StudyClubInterestForm() {
  const uid = useId();
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const submissionId = useRef<string | null>(null);

  const id = (name: string) => `${uid}-${name}`;
  const getSubmissionId = () => {
    if (!submissionId.current) {
      submissionId.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `study-club-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }
    return submissionId.current;
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("submissionId", getSubmissionId());

    try {
      const result = await createStudyClubInterest(data);
      if (result.success && "stored" in result && result.stored) {
        setSuccess(true);
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch {
      setMessage(
        "We could not submit your enquiry. Please try again or email info@drshreyankeducare.com.",
      );
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-7">
        <h3 className="text-[24px] font-bricolage font-semibold text-slate mb-3">
          Thank you for your interest
        </h3>
        <p className="font-montserrat text-slate/80 leading-relaxed">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      data-enquiry-form="page"
      className="relative space-y-6 rounded-3xl border border-[#E5EAF0] bg-white p-6 sm:p-8 shadow-[0_20px_70px_rgba(68,97,155,0.10)]"
    >
      <FormSpamFields />
      <div>
        <h3 className="text-[26px] font-bricolage font-semibold text-slate">Register your interest</h3>
        <p className="mt-2 text-[14px] font-montserrat text-slate/70 leading-relaxed">
          Tell us what would suit your family. Times are not yet confirmed, no payment is taken,
          and this enquiry does not reserve a place.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("parentName")} className={labelClass}>Parent or guardian name</label>
          <input id={id("parentName")} name="parentName" required maxLength={100} autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelClass}>Parent email</label>
          <input id={id("email")} name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor={id("phone")} className={labelClass}>Parent phone <span className="font-normal text-slate/50">(optional)</span></label>
        <input id={id("phone")} name="phone" type="tel" maxLength={40} autoComplete="tel" className={fieldClass} placeholder="International formats are welcome" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("grade")} className={labelClass}>Student grade</label>
          <select id={id("grade")} name="grade" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select a grade</option>
            <option>Grade 9</option><option>Grade 10</option><option>Another grade</option>
          </select>
        </div>
        <div>
          <label htmlFor={id("subjectNeed")} className={labelClass}>Subjects needing support</label>
          <select id={id("subjectNeed")} name="subjectNeed" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select support</option>
            <option>Mathematics</option><option>Science</option><option>Both</option><option>Other</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Preferred weekdays <span className="font-normal text-slate/50">(choose all that suit)</span></legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {weekdays.map((day) => (
            <label key={day} className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] font-montserrat text-slate cursor-pointer hover:border-primary/50">
              <input type="checkbox" name="preferredWeekdays" value={day} className="h-4 w-4 accent-primary" />
              {day}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={id("timeWindow")} className={labelClass}>Preferred time window <span className="font-normal text-slate/50">(optional)</span></label>
        <select id={id("timeWindow")} name="timeWindow" defaultValue="" className={fieldClass}>
          <option value="">No preference</option>
          <option>After school before 5 pm</option><option>5–7 pm</option><option>Flexible</option>
        </select>
      </div>

      <div>
        <label htmlFor={id("learningGoal")} className={labelClass}>Brief learning goal <span className="font-normal text-slate/50">(optional)</span></label>
        <textarea id={id("learningGoal")} name="learningGoal" rows={4} maxLength={500} className={fieldClass} placeholder="For example: build a consistent homework routine and prepare for maths tests" />
          <p className="mt-2 text-[12px] font-montserrat text-slate/75">Please do not include medical details, school passwords or confidential documents.</p>
      </div>

      <label className="flex items-start gap-3 text-[14px] font-montserrat text-slate/80 leading-relaxed">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-primary" />
        <span>I am the student&apos;s parent or guardian and agree that Dr. Shreyank Educare may use these details to respond to this enquiry and discuss suitable programme options. I have read the <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>.</span>
      </label>
      <label className="flex items-start gap-3 text-[14px] font-montserrat text-slate/70 leading-relaxed">
        <input type="checkbox" name="marketingOptIn" className="mt-1 h-4 w-4 shrink-0 accent-primary" />
        <span>Email me occasional updates about Dr. Shreyank Educare programmes. I can unsubscribe at any time.</span>
      </label>

      <div aria-live="polite">
        {message && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-montserrat text-red-700">{message}</p>}
      </div>
      <Button type="submit" disabled={pending} className="w-full justify-center">
        {pending ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Submitting…</span> : "Register Your Interest"}
      </Button>
    </form>
  );
}
