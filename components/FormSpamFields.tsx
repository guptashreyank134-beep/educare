"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Two hidden inputs the server uses to recognise automated submissions.
 *
 * `company` is a honeypot: it is invisible and skipped by keyboard navigation,
 * so a person never fills it, while a bot completing every field it finds does.
 * `formStartedAt` records when the form appeared, letting the server reject a
 * submission that arrived faster than a person could type.
 *
 * Hidden with CSS rather than `type="hidden"` on purpose — a bot reads the input
 * type and skips genuinely hidden fields, but fills a text input it can see in
 * the markup. It is also `aria-hidden` so screen readers skip it too.
 */
export default function FormSpamFields() {
  // A fixed id collides whenever two forms share a page — the footer enquiry
  // form alongside a page's own. A duplicate id makes the label ambiguous and
  // binds it to whichever field comes first in the document.
  const honeypotId = `${useId()}-company-website`;
  const [startedAt, setStartedAt] = useState("");
  const rendered = useRef(false);

  useEffect(() => {
    // Set on mount rather than render, so a statically cached page stamps the
    // time the visitor actually opened it rather than the time it was built.
    if (rendered.current) return;
    rendered.current = true;
    setStartedAt(String(Date.now()));
  }, []);

  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor={honeypotId}>Company website (leave blank)</label>
      <input
        id={honeypotId}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
      <input type="hidden" name="formStartedAt" value={startedAt} readOnly />
    </div>
  );
}
