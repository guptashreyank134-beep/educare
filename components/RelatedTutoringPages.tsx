/** @format */

import Link from "next/link";
import { spokesForPillar } from "@/data/seoPages";

const safeHref = (raw: string) =>
  (raw.startsWith("/") && !raw.startsWith("//")) || /^(https?:|mailto:|tel:)/i.test(raw) ? raw : "#";
import { getProgramRelatedLinks } from "@/sanity/lib/faqs";

/**
 * "Related Tutoring Pages" block for a program hub.
 * - Auto: every active seoPage spoke that belongs to this pillar (from
 *   data/seoPages.ts) — self-maintaining, prevents orphans.
 * - Manual: optional editor-added links from Studio (programPage.relatedLinks),
 *   appended and de-duplicated. Pass programSlug to enable the Sanity fetch.
 */
export default async function RelatedTutoringPages({
  pillar,
  programSlug,
  heading = "Related Tutoring Pages",
}: {
  pillar: string;
  programSlug?: string;
  heading?: string;
}) {
  const auto = spokesForPillar(pillar);
  const extra = programSlug ? await getProgramRelatedLinks(programSlug) : [];

  const seen = new Set<string>();
  const norm = (h: string) => h.replace(/\/+$/, "").toLowerCase();
  const links: { label: string; href: string }[] = [];
  for (const l of [...auto, ...extra]) {
    const k = norm(l.href);
    if (seen.has(k)) continue;
    seen.add(k);
    links.push(l);
  }
  if (!links.length) return null;

  return (
    <section className="relative z-10 max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-[24px] sm:text-[28px] font-bricolage font-normal text-slate mb-5">
        {heading}
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {links.map((s) => (
          <Link
            key={s.href}
            href={safeHref(s.href)}
            className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[14px] font-montserrat text-slate/80 hover:border-primary hover:text-primary transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
