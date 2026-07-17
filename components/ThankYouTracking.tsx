"use client";

import { useEffect } from "react";

/**
 * Pushes a booking-confirmed event to the GTM dataLayer when the /thank-you page
 * mounts. This gives a second, URL-based way to fire the conversion (create a
 * Custom Event trigger on "booking_confirmed", or a Page View trigger on
 * "/thank-you", and attach your GA4 / Google Ads conversion tag). Runs once.
 */
export default function ThankYouTracking() {
  useEffect(() => {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "booking_confirmed", page: "/thank-you" });
  }, []);
  return null;
}
