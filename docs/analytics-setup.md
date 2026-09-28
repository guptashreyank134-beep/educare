# Lead analytics: what fires, and what to do in GTM

The site pushes four events to the GTM dataLayer. They fire correctly — asserted
in a real browser by `tests/lead-capture.spec.ts` — but **nothing consumes them
until triggers exist in GTM**, so conversion reporting stays empty until the
steps below are done. That configuration lives in the GTM web interface, not in
this repository.

## The events

| Event | Fires when | Payload |
| --- | --- | --- |
| `consultation_cta_click` | A "Book a Free 30-Minute Consultation" link is clicked | `page`, `form_id` |
| `enquiry_form_start` | The visitor first edits the form — **once per interaction**, not per keystroke | `page`, `form_id` |
| `generate_lead` | The server confirms the enquiry was **stored durably** | `page`, `form_id`, `lead_subject` |
| `enquiry_form_error` | A submission was rejected | `page`, `form_id`, `reason` |

`reason` is one of `validation_email`, `validation_phone`, `validation_name`,
`not_stored`, `network`. It is a code, never the message shown to the visitor.

### What is deliberately absent

No name, email address, phone number or free-text answer is ever sent. The
`trackEvent` parameter type has no field for them, and a test asserts that a
caller attaching them anyway is ignored. `lead_subject` is safe because the page
sets it, not the visitor.

`generate_lead` fires **only** on confirmed durable storage. A submission that
was merely emailed, or silently discarded as automated, does not count — so the
conversion figure cannot drift above the enquiries that actually exist in Studio.

## Setting up GTM

For each of the four events:

1. **Triggers → New → Trigger Configuration → Custom Event**
2. Event name: exactly the name from the table above (no wildcards)
3. Fires on: All Custom Events
4. Save, naming it after the event

Then for each trigger, **Tags → New → Google Analytics: GA4 Event**:

- Measurement ID: your GA4 property
- Event Name: the same name
- Event Parameters: add `page`, `form_id`, and `lead_subject` or `reason` where
  the table lists them. Each value is a **Data Layer Variable** of the same name,
  created under Variables → New → Data Layer Variable.
- Triggering: the matching trigger

Publish the container. Use GTM Preview to confirm each event appears as you click
the CTA, edit the form, and submit.

### Marking the conversion

In GA4, **Admin → Events → mark `generate_lead` as a key event**. Do not mark
`enquiry_form_start`: a form start is interest, not an enquiry, and counting it
as a conversion makes the numbers look better than they are.

## Reading the result

`enquiry_form_start` against `generate_lead` gives the form's completion rate, and
`enquiry_form_error` broken down by `reason` shows what is stopping people. A
rise in `validation_phone`, for instance, would suggest the phone field is
rejecting a format real visitors use.

## Verifying it still works

```
npm run test:browser
```

Asserts in a real browser that all four fire, that `enquiry_form_start` fires
once rather than per keystroke, that `generate_lead` carries the right
`form_id`/`lead_subject`, and that no personal data reaches any event.

Note that GTM's own `gtm.js` bootstrap push also lands in the dataLayer. It is
not ours and carries no `page`; the tests exclude it.

## Consent

There is no consent-mode implementation in this repository. Events are pushed to
the dataLayer unconditionally, on the assumption that GTM governs consent for the
tags that consume them. If that is not how the container is configured, the
gating needs adding — either in GTM or here — before these events are used in a
jurisdiction that requires it.
