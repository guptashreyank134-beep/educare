/** @format */

// Published testimonials.
//
// Every entry is a real, attributable review that already exists publicly —
// currently the Google Business Profile, where the reviewer's name and rating
// are visible to anyone. Nothing here may be written, paraphrased or composited
// for the site: quote verbatim or do not publish.
//
// These render as visible content only. No Review or AggregateRating markup is
// emitted: self-serving review schema on a business's own site is not eligible
// for review rich results and risks a manual action, which is the same reason
// components/SchemaMarkup.tsx omits aggregateRating.

export interface Testimonial {
  /** Verbatim review text. Never edited for tone or length. */
  quote: string;
  /** The reviewer's name as it appears publicly on the source platform. */
  author: string;
  /** Where the review is published, so a reader can verify it. */
  source: "Google";
  /**
   * Roughly when it was left. Google reports an age ("42 weeks ago") rather
   * than a date, so this is approximate and is not rendered as a precise date.
   */
  approximateDate?: string;
  /** Subject areas this review actually speaks to, for page-level matching. */
  topics: string[];
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dr has been an excellent tutor for my daughter's university Physics course. His clear " +
      "explanations and patient approach helped her gain confidence and truly understand the " +
      "subject. We're very thankful for his professionalism, his passion and dedication, and I " +
      "highly recommend him to any student seeking strong guidance in physics.",
    author: "Parag Jawkar",
    source: "Google",
    // Shown as "42 weeks ago" on the profile in September 2026.
    approximateDate: "2025-11",
    topics: ["university-physics", "physics"],
  },
];

/** Testimonials that genuinely speak to a topic. Empty means show nothing. */
export function testimonialsFor(topic: string): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) => testimonial.topics.includes(topic));
}
