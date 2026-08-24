/** @format */

import Link from "next/link";
import { spokesForPillar } from "@/data/seoPages";

/**
 * Renders every active seoPage "spoke" that belongs to this pillar (program hub)
 * as internal links, so no landing page stays orphaned and the hub passes
 * authority down to its topical cluster. Data-driven from data/seoPages.ts.
 */
export default function RelatedTutoringPages({
  pillar,
  heading = "Related Tutoring Pages",
}: {
  pillar: string;
  heading?: string;
}) {
  const spokes = spokesForPillar(pillar);
  if (!spokes.length) return null;
  return (
    <section className="relative z-10 max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-[24px] sm:text-[28px] font-bricolage font-normal text-slate mb-5">
        {heading}
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {spokes.map((s) => (
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
