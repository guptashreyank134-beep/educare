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
/** Clearance for the sticky site header, so the form never lands behind it. */
const HEADER_CLEARANCE = 96;
const BOTTOM_PADDING = 24;

export function scrollToEnquiryForm(targetId: string): boolean {
  const target = document.getElementById(targetId);
  if (!target) return false;

  const box = target.getBoundingClientRect();
  const viewport = window.innerHeight;
  const pageTop = window.scrollY + box.top;
  const usable = viewport - HEADER_CLEARANCE - BOTTOM_PADDING;

  // Aligning the top is only right when the whole form fits. The form runs to
  // ~889px against a 900px viewport, so a top-aligned scroll left the submit
  // button below the fold and the form looked cut off. When it does not fit,
  // bring the bottom into view instead, so the button that completes the
  // booking is the thing the visitor can see.
  const fits = box.height <= usable;
  const top = fits
    ? pageTop - HEADER_CLEARANCE
    : pageTop + box.height - viewport + BOTTOM_PADDING;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });

  // Focus the first field only when it is actually on screen. On a short
  // viewport the bottom-aligned scroll puts it above the fold, and focusing it
  // there would scroll the page back and undo the alignment.
  const field = target.querySelector<HTMLElement>(
    'input:not([type="hidden"]):not([tabindex="-1"]), textarea',
  );
  window.setTimeout(
    () => {
      const fieldBox = field?.getBoundingClientRect();
      const fieldOnScreen =
        fieldBox && fieldBox.top >= HEADER_CLEARANCE && fieldBox.bottom <= window.innerHeight;

      if (fieldOnScreen) {
        field!.focus({ preventScroll: true });
        return;
      }

      // The field is above the fold after a bottom-aligned scroll. Focus must
      // still move to the form, or it stays on the link far up the page and a
      // keyboard user carries on tabbing from there rather than from here.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    },
    reduceMotion ? 0 : 500,
  );

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
