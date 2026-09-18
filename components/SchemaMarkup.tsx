import React from "react";
import { urlFor } from "@/sanity/lib/image";
import { faqAnswerToPlainText } from "@/sanity/lib/faqs";
import { BUSINESS, SAME_AS, SITE_URL } from "@/data/businessInfo";
import { LEAD_AUTHOR, type Author, authorSameAs, authorUrl } from "@/data/authors";
import { cities } from "@/data/cities";

/** A JSON-LD value, as schema.org permits. */
export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export type JsonLdObject = { [key: string]: JsonLdValue };

export function JsonLd({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Derived from the city hubs we actually maintain, so areaServed cannot drift
// from the pages that back it. Retiring a city hub removes it from here too.
const AREAS_SERVED = cities.map((city) => city.name);

const SITE = SITE_URL;

/** Reused wherever schema needs the business postal address. */
const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.streetAddress,
  addressLocality: BUSINESS.addressLocality,
  addressRegion: BUSINESS.addressRegion,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.addressCountry,
} as const;

// Every tutoring service we offer, with its canonical page. Rendered as an
// OfferCatalog so AI answer engines can enumerate exactly which subjects we
// cover (math, sciences, university and medical/MCAT prep) and link each one.
export const TUTORING_SERVICES: { name: string; url: string }[] = [
  { name: "Mathematics Tutoring (Grades 6–12)", url: `${SITE}/programs/mathematics` },
  { name: "Pre-Calculus 11 & 12 Tutoring", url: `${SITE}/programs/pre-calculus` },
  { name: "University Mathematics Tutoring", url: `${SITE}/programs/university-mathematics` },
  { name: "Physics Tutoring", url: `${SITE}/programs/physics` },
  { name: "University Physics Tutoring", url: `${SITE}/programs/university-physics` },
  { name: "Chemistry Tutoring", url: `${SITE}/programs/chemistry` },
  { name: "University Chemistry Tutoring", url: `${SITE}/programs/university-chemistry` },
  { name: "Biology Tutoring", url: `${SITE}/programs/biology` },
  { name: "University Biology Tutoring", url: `${SITE}/programs/university-biology` },
  { name: "Computer Science & Coding Tutoring", url: `${SITE}/programs/computer-science` },
  { name: "IB & AP Tutoring", url: `${SITE}/programs/ib-ap-tutoring` },
  { name: "SAT Preparation", url: `${SITE}/programs/sat-prep` },
  { name: "MCAT Preparation (Medical)", url: `${SITE}/programs/mcat-prep` },
  { name: "GRE Preparation", url: `${SITE}/programs/gre-prep` },
  { name: "GMAT Preparation", url: `${SITE}/programs/gmat-prep` },
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    // Multi-typed so the same entity is eligible as both an education provider
    // and a local business (local-pack / "near me" signals).
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE}/#organization`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.logo,
    description:
      "PhD-led, 5-star-rated tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university across Burnaby & Vancouver — in person and online.",
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      contactType: "customer service",
      email: BUSINESS.email,
    },
    address: POSTAL_ADDRESS,
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: SAME_AS,
    // Machine-readable statement of the subjects this provider is authoritative
    // on — helps AI answer engines match the entity to subject queries.
    knowsAbout: [
      "Mathematics tutoring",
      "Pre-Calculus",
      "Calculus",
      "Physics tutoring",
      "Chemistry tutoring",
      "Biology tutoring",
      "Computer Science",
      "Python programming",
      "IB and AP courses",
      "SAT preparation",
      "GRE preparation",
      "GMAT preparation",
      "MCAT preparation",
      "University mathematics",
      "Statistics",
      "Finance",
    ],
    // Explicit, linkable catalogue of every subject we tutor. Lets AI answer
    // engines enumerate and cite each service, not just mathematics.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tutoring services",
      itemListElement: TUTORING_SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: s.url },
      })),
    },
    // Founder entity with real, on-site credentials (see About page / AuthorBox).
    // Strengthens E-E-A-T and the knowledge-graph link between the person and
    // the organization — a strong signal for AI answer engines.
    founder: {
      "@type": "Person",
      "@id": `${SITE}/#founder`,
      name: LEAD_AUTHOR.name,
      jobTitle: LEAD_AUTHOR.jobTitle,
      url: authorUrl(LEAD_AUTHOR.slug),
      description: LEAD_AUTHOR.bio,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: LEAD_AUTHOR.credential.degree,
        name: `${LEAD_AUTHOR.credential.degree} in ${LEAD_AUTHOR.credential.field}`,
      },
      knowsAbout: LEAD_AUTHOR.knowsAbout,
      worksFor: { "@id": `${SITE}/#organization` },
    },
    // NOTE: no aggregateRating here on purpose. Self-serving review markup (a
    // business rating itself on its own site) is not eligible for Google review
    // rich results and can risk a structured-data manual action. The genuine
    // Google rating is shown in the UI (Reviews.tsx) instead of marked up here.
  };
}

/**
 * BreadcrumbList structured data. Pass the trail as {name, url} items (the last
 * item is the current page). Helps search and AI engines understand site
 * hierarchy and show breadcrumb context in results.
 */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Dedicated Person entity for the founder, rendered on the About page. It shares
 * the same @id as the Organization's `founder`, so search engines and AI answer
 * engines reconcile both references into a single well-described person — a
 * strong knowledge-graph / E-E-A-T signal. Only facts the site publishes.
 */
export function getFounderSchema(author: Author = LEAD_AUTHOR) {
  const { credential } = author;
  const sameAs = authorSameAs(author);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/#founder`,
    name: author.name,
    ...(author.honorificPrefix ? { honorificPrefix: author.honorificPrefix } : {}),
    jobTitle: author.jobTitle,
    image: author.image,
    url: authorUrl(author.slug),
    description: author.bio,
    // Only claimed when the institution is confirmed: alumniOf asserts a
    // relationship with a named university.
    ...(credential.institution
      ? { alumniOf: { "@type": "CollegeOrUniversity", name: credential.institution } }
      : {}),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: credential.degree,
      name: `${credential.degree} in ${credential.field}`,
      ...(credential.institution
        ? { recognizedBy: { "@type": "CollegeOrUniversity", name: credential.institution } }
        : {}),
      ...(credential.year ? { dateCreated: String(credential.year) } : {}),
    },
    knowsAbout: author.knowsAbout,
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      name: BUSINESS.name,
    },
  };
}

export function getPageSchema(data: any, currentUrl: string) {
  const seo = data?.metaData;
  const title = seo?.metaTitle || data?.title || "Dr. Shreyank Educare";
  const description = seo?.metaDescription || "Expert academic tutoring, coding classes, and test preparation to help students excel in their educational journey.";
  const type = data?._type === "programPage" ? "Course" : "WebPage";

  const schema: any = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description: description,
    url: currentUrl,
    publisher: {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      name: BUSINESS.name,
    },
  };

  if (type === "Course") {
    // Course requires name + description + provider (all set). We previously
    // also emitted courseMode "Online, Offline" and a CourseInstance with
    // courseMode "Mixed" — neither is a valid schema.org courseMode value, so
    // validators flagged the markup as containing errors. A CourseInstance is
    // given with a valid "blended" mode and no invented cohort dates (this is a
    // rolling, one-to-one tutoring program, not a fixed-date cohort).
    schema.provider = {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      name: BUSINESS.name,
      url: BUSINESS.url,
    };
    schema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: "blended",
      courseWorkload: "PT1H",
      location: {
        "@type": "Place",
        name: "Burnaby, BC (in person) & online",
      },
    };
  }

  return schema;
}

export function getCityPageSchema(city: any, currentUrl: string): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `${BUSINESS.name} — Tutoring in ${city.name}`,
    description:
      city.metaDescription ||
      `Math, Physics, Chemistry and Coding tutoring for ${city.name} students.`,
    url: currentUrl,
    logo: BUSINESS.logo,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: POSTAL_ADDRESS,
    areaServed: {
      "@type": "City",
      name: `${city.name}, ${city.region || "BC"}`,
    },
    sameAs: SAME_AS,
  };
}

export function getServiceSchema(
  opts: {
    name: string;
    description: string;
    url: string;
    areaServed?: string[];
  }
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Online Tutoring",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      logo: BUSINESS.logo,
    },
    ...(opts.areaServed && opts.areaServed.length
      ? { areaServed: opts.areaServed.map((a) => ({ "@type": "Place", name: a })) }
      : {}),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: opts.url,
      availableLanguage: "en",
    },
  };
}

/**
 * Article schema for guides and long-form pages. `author` defaults to the
 * organisation: naming a person is a claim of first-hand authorship, so callers
 * opt in by passing the author explicitly.
 */
export function getArticleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  byAuthor?: boolean;
  about?: string[];
  image?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    url: opts.url,
    image: opts.image ?? BUSINESS.logo,
    author: opts.byAuthor
      ? { "@id": `${SITE}/#founder` }
      : { "@type": "Organization", "@id": `${SITE}/#organization`, name: BUSINESS.name, url: BUSINESS.url },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: BUSINESS.logo },
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    ...(opts.about?.length ? { about: opts.about } : {}),
  };
}

export function getFAQSchema(
  // Answers may be plain strings (code data) or Portable Text blocks (Sanity).
  faqs: Array<{ question: string; answer: unknown }>
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerToPlainText(faq.answer),
      },
    })),
  };
}

export function getBlogPostSchema(post: any, currentUrl: string): Record<string, any> {
  if (!post) return {};

  const seo = post?.metaData;
  const title = seo?.metaTitle || post?.title || "Blog Post";
  const description = seo?.metaDescription || post?.excerpt || "Expert academic tutoring, coding classes, and test preparation.";

  let imageUrl: string = BUSINESS.logo;
  if (post?.mainImage) {
    try {
      imageUrl = urlFor(post.mainImage).url();
    } catch (e) {
      console.error("Error building image URL for post schema:", e);
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    "headline": title,
    "description": description,
    "image": imageUrl,
    // Credit the named expert ONLY on articles he has actually reviewed —
    // claiming a person's authorship in structured data is a claim about
    // first-hand expertise, and it should be true. Unreviewed posts are
    // credited to the organisation instead.
    "author": post?.reviewedByExpert
      ? {
          "@type": "Person",
          "@id": `${SITE}/#founder`,
          "name": LEAD_AUTHOR.name,
          "jobTitle": LEAD_AUTHOR.jobTitle,
          "worksFor": {
            "@type": "EducationalOrganization",
            "@id": `${SITE}/#organization`,
            "name": BUSINESS.name,
          },
          "url": authorUrl(LEAD_AUTHOR.slug),
        }
      : {
          "@type": "Organization",
          "@id": `${SITE}/#organization`,
          "name": BUSINESS.name,
          "url": BUSINESS.url,
        },
    ...(post?.reviewedByExpert
      ? {
          "reviewedBy": {
            "@type": "Person",
            "@id": `${SITE}/#founder`,
            "name": LEAD_AUTHOR.name,
            "jobTitle": LEAD_AUTHOR.jobTitle,
          },
        }
      : {}),
    "publisher": {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      "name": BUSINESS.name,
      "logo": {
        "@type": "ImageObject",
        "url": BUSINESS.logo,
      },
    },
    "datePublished": post.publishedAt || new Date().toISOString(),
    "dateModified": post._updatedAt || post.publishedAt || new Date().toISOString(),
  };
}


/**
 * Person markup for the tutors shown on the About page.
 *
 * Google's guidance is to show who is behind the teaching, and the site names
 * seven tutors with real credentials but emitted no Person markup at all.
 * `knowsAbout` states each tutor's subjects, which is the machine-readable
 * version of "tutor profile -> subjects taught".
 *
 * Only fields the site genuinely displays are included — no invented awards,
 * ratings or affiliations.
 */
export function getTutorsSchema(
  tutors: Array<{ name: string; role: string; education?: string[]; strengths?: string[] }>
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Tutors at ${BUSINESS.name}`,
    itemListElement: (tutors || []).map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: t.name,
        jobTitle: t.role,
        worksFor: {
          "@type": "EducationalOrganization",
          "@id": `${SITE}/#organization`,
          name: BUSINESS.name,
          url: BUSINESS.url,
        },
        ...(t.education?.length ? { description: t.education.join(" · ") } : {}),
        ...(t.role ? { knowsAbout: t.role } : {}),
      },
    })),
  };
}
