import { client } from "./client";

export type FaqItem = {
  question: string;
  /** Portable Text blocks (rich answer) or a plain string (legacy). */
  answer: unknown;
};

/**
 * FAQs for a landing page, managed in Sanity (`pageFaq` docs keyed by slug).
 *
 * Returns null when there is no document for the slug (or it has no FAQs) so
 * callers can fall back to their hardcoded list — a page must never render an
 * empty FAQ section just because Sanity is unreachable or unpopulated.
 */
export async function getPageFaqs(slug: string): Promise<FaqItem[] | null> {
  try {
    const doc = await client.fetch<{ faqs?: FaqItem[] } | null>(
      `*[_type == "pageFaq" && pageSlug == $slug][0]{ faqs[]{ question, answer } }`,
      { slug }
    );
    return doc?.faqs?.length ? doc.faqs : null;
  } catch {
    // Sanity unavailable at build/request time — caller falls back to code data.
    return null;
  }
}

/**
 * Flattens a Portable Text answer to plain text. FAQPage structured data (and
 * Google) needs a plain string, not blocks.
 */
export function faqAnswerToPlainText(answer: unknown): string {
  if (typeof answer === "string") return answer;
  if (!Array.isArray(answer)) return "";
  return answer
    .map((block: any) => {
      if (!block || block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children.map((child: any) => child?.text ?? "").join("");
    })
    .filter(Boolean)
    .join(" ")
    .trim();
}
