import Link from "next/link";

import CourseEnquiryForm from "@/components/CourseEnquiryForm";
import TestimonialQuote from "@/components/TestimonialQuote";
import { LEAD_AUTHOR, authorPath, credentialLabel } from "@/data/authors";
import { testimonialsFor } from "@/data/testimonials";

/**
 * The consultation column on a program page: who teaches it, the enquiry form
 * directly beneath, and any review that genuinely speaks to the subject.
 *
 * The credential comes first because it is the reason to fill the form in, and
 * the form sits immediately under it rather than further down the page, where
 * a reader convinced by the credential would have to go looking for it.
 *
 * Credential text is read from the author record, so it cannot drift from the
 * About page or the structured data. A page with no matching review renders
 * none — nothing here is invented to fill the space.
 */
export default function CourseConsultationPanel({
  subject,
  anchor,
  courseExample,
  courseLabel,
  testimonialTopic,
}: {
  /** Recorded as the lead subject. Set by the page, never typed by the visitor. */
  subject: string;
  /** Element id the page's CTAs scroll to. */
  anchor: string;
  courseExample: string;
  /** Omit for the university wording; school pages ask for a grade instead. */
  courseLabel?: string;
  /** Which testimonials apply here. Omit to show none. */
  testimonialTopic?: string;
}) {
  const testimonials = testimonialTopic ? testimonialsFor(testimonialTopic) : [];

  return (
    <div className="w-full lg:w-[400px]">
      <div className="rounded-[16px] border border-[#F1F5F9] bg-white/80 p-5">
        <p className="text-[14px] font-montserrat font-medium text-slate mb-1">
          Taught by {LEAD_AUTHOR.name}
        </p>
        <p className="text-[14px] font-montserrat leading-relaxed text-slate/70">
          {credentialLabel(LEAD_AUTHOR.credential)}, with over 10 years teaching
          mathematics and physics.{" "}
          <Link
            href={authorPath(LEAD_AUTHOR.slug)}
            className="text-primary underline underline-offset-2"
          >
            Full profile
          </Link>
        </p>
      </div>

      <div id={anchor} className="mt-5 scroll-mt-28">
        <CourseEnquiryForm
          subject={subject}
          formId={anchor}
          courseExample={courseExample}
          courseLabel={courseLabel}
        />
      </div>

      {testimonials.map((testimonial) => (
        <div key={testimonial.author} className="mt-5">
          <TestimonialQuote testimonial={testimonial} />
        </div>
      ))}
    </div>
  );
}
