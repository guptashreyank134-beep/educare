import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, GraduationCap } from "lucide-react";

/**
 * Byline / author box for blog articles.
 *
 * Deliberately conditional: a named expert byline is only an honest E-E-A-T
 * signal if that expert has actually read the article. So the named credit
 * appears only when the post is marked `reviewedByExpert` in Studio; otherwise
 * the article is credited to the organisation, which claims nothing about an
 * individual's first-hand teaching experience.
 */

export const EXPERT = {
  name: "Dr. Shreyank Gupta",
  credentials: "PhD",
  role: "Founder & Lead Tutor, Dr. Shreyank Educare",
  // A specific, checkable credential is a far stronger expertise signal than a
  // bare "PhD" — and ultrasound/signal processing is applied math and physics,
  // which is exactly what he teaches.
  bio: "Dr. Shreyank Gupta holds a PhD in ultrasound and signal processing from the University of Quebec — applied mathematics and physics in practice. He has taught Math, Physics and Chemistry for over 10 years, working with students across Burnaby and Vancouver from Grade 6 through university.",
  url: "/about",
};

const ORG = {
  name: "Dr. Shreyank Educare",
  role: "PhD-led tutoring in Burnaby & Vancouver",
  bio: "Written by the Dr. Shreyank Educare team and aligned to the BC curriculum, IB and AP coursework.",
};

export default function AuthorBox({
  reviewedByExpert = false,
  reviewedAt,
  publishedAt,
  updatedAt,
}: {
  reviewedByExpert?: boolean;
  reviewedAt?: string;
  publishedAt?: string;
  updatedAt?: string;
}) {
  const fmt = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
      : null;

  const published = fmt(publishedAt);
  const updated = fmt(updatedAt);
  const reviewed = fmt(reviewedAt);
  const showUpdated = updated && updated !== published;

  return (
    <aside className="my-12 rounded-[20px] border border-[#F1F5F9] bg-bg-grey p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-full bg-white border border-[#F1F5F9] flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/logo.png"
              alt={reviewedByExpert ? EXPERT.name : ORG.name}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-[18px] font-bricolage font-medium text-slate">
              {reviewedByExpert ? `${EXPERT.name}, ${EXPERT.credentials}` : ORG.name}
            </p>
            {reviewedByExpert && (
              <span className="inline-flex items-center gap-1 text-[12px] font-montserrat text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                <BadgeCheck className="w-3.5 h-3.5" />
                Expert reviewed
              </span>
            )}
          </div>

          <p className="text-[14px] font-montserrat text-slate/70 mb-3 inline-flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-primary shrink-0" />
            {reviewedByExpert ? EXPERT.role : ORG.role}
          </p>

          <p className="text-[15px] font-montserrat text-slate/80 leading-relaxed mb-4">
            {reviewedByExpert ? EXPERT.bio : ORG.bio}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-montserrat text-slate/60">
            {published && <span>Published {published}</span>}
            {showUpdated && <span>Updated {updated}</span>}
            {reviewedByExpert && reviewed && <span>Reviewed {reviewed}</span>}
          </div>

          <div className="mt-5">
            <Link
              href="/contact"
              className="text-[15px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors"
            >
              Book a free 30-minute consultation
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
