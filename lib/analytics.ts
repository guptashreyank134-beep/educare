/** @format */

// Analytics events, pushed to the GTM dataLayer.
//
// Same mechanism as components/ContactClickTracking.tsx: GTM is the only
// analytics tag on the site, and consent is configured there rather than in the
// app, so pushing to the dataLayer is what "respecting the existing consent
// settings" means here — a blocked tag simply never fires on the event.
//
// Nothing personal is ever sent. Names, email addresses, phone numbers and
// free-text answers stay on the server; these events carry only the page, the
// form and, for failures, a short reason code.

export type AnalyticsEvent =
  | "consultation_cta_click"
  | "enquiry_form_start"
  | "generate_lead"
  | "enquiry_form_error";

/** Reason codes for enquiry_form_error. Deliberately coarse and never free text. */
export type EnquiryErrorReason =
  | "validation_email"
  | "validation_phone"
  | "validation_name"
  | "not_stored"
  | "network";

interface EventParams {
  /** Which form or button, e.g. "university-physics-enquiry". */
  form_id?: string;
  /** Where the interaction happened. Defaults to the current path. */
  page?: string;
  /** Only on enquiry_form_error. */
  reason?: EnquiryErrorReason;
  /** Only on generate_lead: the subject, which is set by the page, not typed. */
  lead_subject?: string;
}

/**
 * Push one event. Safe to call during render or on the server: it does nothing
 * when `window` is absent, and never throws into the caller's flow.
 */
export function trackEvent(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event,
      page: params.page ?? window.location.pathname,
      ...(params.form_id ? { form_id: params.form_id } : {}),
      ...(params.reason ? { reason: params.reason } : {}),
      ...(params.lead_subject ? { lead_subject: params.lead_subject } : {}),
    });
  } catch {
    // Analytics must never break a form submission.
  }
}
