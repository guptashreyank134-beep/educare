import { client } from "./client";

export type FaqItem = {
  question: string;
  /** Portable Text blocks (rich answer) or a plain string (legacy). */
  answer: unknown;
};

export type LandingSection = {
  heading?: string;
  body?: string[];
  points?: string[];
};

/** Editable landing-page content from Sanity. Every field is optional — an
 *  empty field means "keep whatever the code defines". */
export type LandingContent = {
  metaTitle?: string;
  metaDescription?: string;
  heading?: string;
  heroSubheading?: string;
  intro?: string[];
  sections?: LandingSection[];
  faqs?: FaqItem[];
  relatedLinks?: { label?: string; href?: string }[];
  bodyContent?: unknown;
};

const LANDING_QUERY = `*[_type == "pageFaq" && pageSlug == $slug][0]{
  metaTitle, metaDescription, heading, heroSubheading, intro,
  sections[]{ heading, body, points },
  faqs[]{ question, answer },
  relatedLinks[]{ label, href },
  bodyContent
}`;

/**
 * Editable content for a landing page, managed in Sanity.
 *
 * Returns null when there is no document for the slug, and individual fields
 * may be empty — callers must fall back to their code-defined values. A page
 * must never render blank just because Sanity is unreachable or a field is
 * unset.
 */
export async function getLandingContent(slug: string): Promise<LandingContent | null> {
  try {
    return await client.fetch<LandingContent | null>(LANDING_QUERY, { slug });
  } catch {
    // Sanity unavailable at build/request time — caller falls back to code data.
    return null;
  }
}

/** Use the Sanity value only when it is actually set; otherwise the code value. */
export function orFallback<T>(sanityValue: T | undefined | null, codeValue: T): T {
  if (sanityValue === undefined || sanityValue === null) return codeValue;
  if (typeof sanityValue === "string" && sanityValue.trim() === "") return codeValue;
  if (Array.isArray(sanityValue) && sanityValue.length === 0) return codeValue;
  return sanityValue;
}

/**
 * FAQs for a landing page. Returns null when unset so callers fall back to
 * their hardcoded list.
 */
export async function getPageFaqs(slug: string): Promise<FaqItem[] | null> {
  try {
    const doc = await client.fetch<{ faqs?: FaqItem[] } | null>(
      `*[_type == "pageFaq" && pageSlug == $slug][0]{ faqs[]{ question, answer } }`,
      { slug }
    );
    return doc?.faqs?.length ? doc.faqs : null;
  } catch {
    return null;
  }
}

/**
 * FAQs for a program page (Studio > Program Pages > … > FAQs), keyed by slug.
 * Returns an empty array when unset so callers can skip the section entirely.
 */
export async function getProgramFaqs(slug: string): Promise<FaqItem[]> {
  try {
    const doc = await client.fetch<{ faqs?: FaqItem[] } | null>(
      `*[_type == "programPage" && slug.current == $slug][0]{ faqs[]{ question, answer } }`,
      { slug }
    );
    return doc?.faqs?.length ? doc.faqs : [];
  } catch {
    return [];
  }
}

/** Editor-added rich-text body block for a program page (Studio > Body Content). */
export async function getProgramBodyContent(slug: string): Promise<unknown> {
  try {
    const doc = await client.fetch<{ bodyContent?: unknown } | null>(
      `*[_type == "programPage" && slug.current == $slug][0]{ bodyContent }`,
      { slug },
    );
    return doc?.bodyContent ?? null;
  } catch {
    return null;
  }
}

/** Editor-added extra internal links for a program page (Studio > Extra Related Links). */
export async function getProgramRelatedLinks(
  slug: string,
): Promise<{ label: string; href: string }[]> {
  try {
    const doc = await client.fetch<{ relatedLinks?: { label?: string; href?: string }[] } | null>(
      `*[_type == "programPage" && slug.current == $slug][0]{ relatedLinks[]{ label, href } }`,
      { slug },
    );
    return (doc?.relatedLinks || [])
      .filter((l) => l && l.label && l.href)
      .map((l) => ({ label: l.label as string, href: l.href as string }));
  } catch {
    return [];
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
