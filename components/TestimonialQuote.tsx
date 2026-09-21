import { Star } from "lucide-react";

import type { Testimonial } from "@/data/testimonials";

/**
 * A single published review, rendered as visible content only.
 *
 * No Review or AggregateRating markup is emitted — see data/testimonials.ts for
 * why. The source is named so a reader can check the claim rather than take it
 * on trust.
 */
export default function TestimonialQuote({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-[16px] border border-[#F1F5F9] bg-white/80 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-1" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={16}
            className="fill-yellow-light text-yellow-light"
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="text-[15px] font-montserrat leading-relaxed text-slate/85">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-3 text-[14px] font-montserrat text-slate/60">
        {testimonial.author} — {testimonial.source} review
      </figcaption>
    </figure>
  );
}
