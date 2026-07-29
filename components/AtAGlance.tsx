/** @format */

import type { Fact } from "@/data/businessInfo";

/**
 * Compact, server-rendered "At a Glance" fact block. Renders as a semantic
 * definition list so the facts are in the initial HTML (no client JS needed) and
 * are easy for search and AI answer engines to extract and cite.
 */
export default function AtAGlance({
  heading = "At a Glance",
  facts,
}: {
  heading?: string;
  facts: Fact[];
}) {
  if (!facts.length) return null;
  return (
    <section
      aria-label={heading}
      className="max-w-4xl mx-auto px-4 sm:px-6 my-12"
    >
      <div className="rounded-[16px] border border-[#F1F5F9] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-6 sm:p-8">
        <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mb-5">
          {heading}
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 border-b border-[#F1F5F9] pb-2"
            >
              <dt className="text-[13px] font-montserrat font-semibold uppercase tracking-wide text-slate/50 sm:w-[42%] shrink-0">
                {f.label}
              </dt>
              <dd className="text-[16px] font-montserrat text-slate">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
