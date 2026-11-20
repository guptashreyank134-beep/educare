"use client";

import { useEffect, useRef } from "react";
import type { AppointmentBooking } from "@/lib/appointmentBooking";
import { trackEvent } from "@/lib/analytics";

export default function BookingCalendarFrame({ booking }: { booking: AppointmentBooking }) {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (booking.provider !== "Calendly") return;
    const calendar = frame.current;
    const origin = new URL(booking.embedUrl).origin;
    function onScheduled(message: MessageEvent) {
      if (!calendar?.contentWindow || message.source !== calendar.contentWindow || message.origin !== origin) return;
      if (message.data?.event !== "calendly.event_scheduled") return;
      window.removeEventListener("message", onScheduled);
      trackEvent("booking_confirmed");
    }
    window.addEventListener("message", onScheduled);
    return () => window.removeEventListener("message", onScheduled);
  }, [booking.embedUrl, booking.provider]);

  return (
    <iframe ref={frame} src={booking.embedUrl} title={`Book a tutoring consultation with ${booking.provider}`}
      className="w-full min-w-0 rounded-xl border border-slate-200 bg-white"
      height={780} referrerPolicy="strict-origin-when-cross-origin" />
  );
}
