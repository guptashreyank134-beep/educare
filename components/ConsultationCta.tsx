"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * Anchor to the enquiry form that records the click.
 *
 * A link rather than a button: it moves the reader to the form on the same page,
 * so it must behave like navigation for keyboard and middle-click alike.
 */
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
      onClick={() => trackEvent("consultation_cta_click", { form_id: formId })}
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
        onClick={() => trackEvent("consultation_cta_click", { form_id: `${formId}-sticky` })}
        className="flex w-full items-center justify-center rounded-[8px] bg-primary px-5 py-3 text-[16px] font-montserrat font-medium text-white"
      >
        {label}
      </a>
    </div>
  );
}
