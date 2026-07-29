"use client";

import { useEffect } from "react";

// Delegated click tracking for every phone, email and WhatsApp link on the site.
// One listener instead of editing 9 files, and it keeps working for links added
// later. Pushes GTM dataLayer events (create Custom Event triggers on
// "contact_click" in GTM and attach GA4 / Google Ads conversions). No PII is
// sent — only the channel and the page path.
type Channel = "phone" | "email" | "whatsapp";

function channelFor(href: string): Channel | null {
  if (/^tel:/i.test(href)) return "phone";
  if (/^mailto:/i.test(href)) return "email";
  if (/wa\.me|api\.whatsapp\.com|wa\.link/i.test(href)) return "whatsapp";
  return null;
}

export function ContactClickTracking() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!el) return;
      const channel = channelFor(el.getAttribute("href") || "");
      if (!channel) return;
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "contact_click",
        channel, // "phone" | "email" | "whatsapp"
        page: window.location.pathname,
      });
    };
    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);
  return null;
}
