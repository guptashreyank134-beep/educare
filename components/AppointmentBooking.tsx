"use client";

import { useState } from "react";
import TrialClassForm from "@/components/TrialClassForm";
import { getAppointmentBooking } from "@/lib/appointmentBooking";

export default function AppointmentBooking() {
  const booking = getAppointmentBooking();
  const [showEnquiry, setShowEnquiry] = useState(false);
  if (!booking) return <TrialClassForm showAppointmentLink={false} />;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3" aria-label="Booking options">
        <button type="button" aria-pressed={!showEnquiry} onClick={() => setShowEnquiry(false)}
          className={`rounded-lg border px-4 py-3 ${!showEnquiry ? "bg-primary text-white" : "text-primary"}`}>
          Book a time
        </button>
        <button type="button" aria-pressed={showEnquiry} onClick={() => setShowEnquiry(true)}
          className={`rounded-lg border px-4 py-3 ${showEnquiry ? "bg-primary text-white" : "text-primary"}`}>
          Send an email enquiry
        </button>
      </div>
      {showEnquiry ? (
        <section aria-label="Email enquiry">
          <p className="mb-4 text-sm text-slate/80">
            Send us your details without booking a time. Your enquiry will be emailed to our team,
            and we&apos;ll reply within one business day.
          </p>
          <TrialClassForm showAppointmentLink={false} submitLabel="Send Email Enquiry" />
        </section>
      ) : (
        <section aria-label="Appointment scheduler">
          <p className="mb-4 text-sm text-slate/80">
            Choose an available time and confirm your appointment in the booking form.
            Check the displayed time zone before booking.
          </p>
          <iframe src={booking.embedUrl} title={`Book a tutoring consultation with ${booking.provider}`}
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white"
            height={780} referrerPolicy="strict-origin-when-cross-origin" />
          <p className="mt-4 text-sm">
            Having trouble with the calendar?{" "}
            <a href={booking.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Open the booking page in a new tab
            </a>.
          </p>
        </section>
      )}
    </div>
  );
}
