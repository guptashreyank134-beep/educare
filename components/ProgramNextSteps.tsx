import Link from "next/link";

/**
 * Contextual links at the foot of a program page.
 *
 * Program pages had no route to pricing (0 of 25 linked to it) and no
 * in-content consultation link — only the header button. A parent who has just
 * read what we teach has exactly two next questions: what does it cost, and how
 * do I start. This answers both with descriptive anchors rather than
 * "learn more", which tells neither a reader nor a search engine anything.
 *
 * `relatedLinks` lets a page point at the subject pages it genuinely relates to.
 */
export default function ProgramNextSteps({
  subject,
  relatedLinks = [],
}: {
  /** e.g. "Physics" — used to make the anchors specific to this page. */
  subject: string;
  relatedLinks?: Array<{ label: string; href: string }>;
}) {
  return (
    <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="rounded-[20px] border border-[#F1F5F9] bg-bg-grey p-8 sm:p-10">
        <h2 className="text-[24px] sm:text-[28px] font-bricolage font-normal text-slate mb-3">
          Next steps
        </h2>
        <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed mb-6 max-w-[760px]">
          Sessions run one-to-one, in person at our Burnaby centre or online across
          Metro Vancouver. The most useful first step is a conversation — bring a
          recent test and we will tell you where the marks are actually going.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link
            href="/contact"
            className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors"
          >
            Book a free 30-minute {subject} consultation
          </Link>
          <Link
            href="/pricing"
            className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors"
          >
            See our tutoring prices
          </Link>
          <Link
            href="/math-tutor-burnaby"
            className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors"
          >
            Tutoring in Burnaby
          </Link>
          <Link
            href="/math-tutor-vancouver"
            className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors"
          >
            Tutoring in Vancouver
          </Link>
          {relatedLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
