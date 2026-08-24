/** @format */

import Link from "next/link";

/**
 * Renders editor-added internal links (Studio "Extra Related Links") as a
 * "Related" pill block at the bottom of a page. Returns null when empty, so the
 * section only appears once an editor adds links. Used on landing pages, the
 * homepage, blog posts and the resources page.
 */
export default function ExtraRelatedLinks({
  links,
  heading = "Related",
}: {
  links?: { label?: string; href?: string }[] | null;
  heading?: string;
}) {
  const valid = (links || []).filter(
    (l): l is { label: string; href: string } => !!(l && l.label && l.href),
  );
  if (!valid.length) return null;
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-[22px] sm:text-[26px] font-bricolage font-normal text-slate mb-5">
        {heading}
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {valid.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[14px] font-montserrat text-slate/80 hover:border-primary hover:text-primary transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
