"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * Moves the reader to the enquiry form and puts the cursor in it.
 *
 * A plain anchor jumped up to 2,700px instantly on a phone, with no page change
 * and no movement to follow, which reads as a broken button rather than as
 * having arrived somewhere. Scrolling smoothly and then focusing the first field
 * makes the click land visibly, and leaves the visitor able to type immediately.
 *
 * Still an `<a href="#...">`, so it works before hydration, honours middle-click
 * and "open in new tab", and remains reachable by keyboard.
 */
export function scrollToEnquiryForm(targetId: string): boolean {
  const target = document.getElementById(targetId);
  if (!target) return false;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  // Focus once the scroll has settled. `preventScroll` stops the browser from
  // yanking the page a second time and undoing the smooth movement.
  const field = target.querySelector<HTMLElement>(
    'input:not([type="hidden"]):not([tabindex="-1"]), textarea',
  );
  window.setTimeout(() => field?.focus({ preventScroll: true }), reduceMotion ? 0 : 450);

  // Keep the hash so the URL is shareable, without a second jump.
  window.history.replaceState(null, "", `#${targetId}`);
  return true;
}

export function ConsultationCtaLink({
  targetId,
  formId,
  children,
  className = "",
}: {
  targetId: string;
  formId: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      onClick={(event) => {
        trackEvent("consultation_cta_click", { form_id: formId });
        // Only take over when the target is really there; otherwise let the
        // browser handle the link as it normally would.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        if (scrollToEnquiryForm(targetId)) event.preventDefault();
      }}
      className={className}
    >
      {children}
    </a>
  );
}

/**
 * Mobile-only bar pinned to the bottom, linking back to the form.
 *
 * Hidden whenever the form is on screen, so it can never sit over the fields a
 * visitor is trying to fill. The page reserves matching bottom padding while the
 * bar is showing, so it does not cover the last of the content either.
 */
export function StickyConsultationBar({
  targetId,
  formId,
  label = "Book a Free 30-Minute Consultation",
}: {
  targetId: string;
  formId: string;
  label?: string;
}) {
  const [visible, setVisible] = useState(false);
  const observed = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    observed.current = target;

    // Show the bar only once the form has been scrolled past, and hide it again
    // whenever any part of the form is back in view.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#F1F5F9] bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-200 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a
        href={`#${targetId}`}
        tabIndex={visible ? 0 : -1}
        onClick={(event) => {
          trackEvent("consultation_cta_click", { form_id: `${formId}-sticky` });
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          if (scrollToEnquiryForm(targetId)) event.preventDefault();
        }}
        className="flex w-full items-center justify-center rounded-[8px] bg-primary px-5 py-3 text-[16px] font-montserrat font-medium text-white"
      >
        {label}
      </a>
    </div>
  );
}
