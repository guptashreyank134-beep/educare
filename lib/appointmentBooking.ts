export type AppointmentBooking = {
  provider: "Calendly" | "Google Calendar";
  url: string;
  embedUrl: string;
};

// Only a public booking URL belongs here. Never expose calendar credentials,
// refresh tokens, private calendar feeds, or calendar event data to the browser.
export function parseAppointmentBooking(value: string | undefined): AppointmentBooking | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    url.hash = "";
    url.search = "";
    if (url.hostname === "calendly.com" && /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) {
      const embed = new URL(url);
      embed.searchParams.set("embed_domain", "www.drshreyankeducare.com");
      embed.searchParams.set("embed_type", "Inline");
      return { provider: "Calendly", url: url.href, embedUrl: embed.href };
    }
    if (url.hostname === "calendar.google.com" && /^\/calendar\/appointments\/schedules\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) {
      const embed = new URL(url);
      embed.searchParams.set("gv", "true");
      return { provider: "Google Calendar", url: url.href, embedUrl: embed.href };
    }
  } catch { /* Invalid configuration leaves the enquiry form available. */ }
  return null;
}

export function getAppointmentBooking(): AppointmentBooking | null {
  return parseAppointmentBooking(
    process.env.NEXT_PUBLIC_APPOINTMENT_BOOKING_URL ??
      "https://calendly.com/drshreyankeducare-info/30min",
  );
}
