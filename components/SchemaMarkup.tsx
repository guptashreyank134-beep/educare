import React from "react";
import { urlFor } from "@/sanity/lib/image";
import { faqAnswerToPlainText } from "@/sanity/lib/faqs";

export function JsonLd({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Metro-Vancouver areas we serve — kept in sync with the city landing pages.
const AREAS_SERVED = [
  "Burnaby",
  "Vancouver",
  "North Vancouver",
  "West Vancouver",
  "Coquitlam",
  "Port Moody",
  "Port Coquitlam",
  "Surrey",
  "Richmond",
  "New Westminster",
  "Delta",
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    // Multi-typed so the same entity is eligible as both an education provider
    // and a local business (local-pack / "near me" signals).
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": "https://www.drshreyankeducare.com/#organization",
    name: "Dr. Shreyank Educare",
    url: "https://www.drshreyankeducare.com",
    logo: "https://www.drshreyankeducare.com/assets/logo.png",
    image: "https://www.drshreyankeducare.com/assets/logo.png",
    description:
      "PhD-led, 5-star-rated tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university across Burnaby & Vancouver — in person and online.",
    telephone: "+1-672-514-7587",
    email: "info@drshreyankeducare.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-672-514-7587",
      contactType: "customer service",
      email: "info@drshreyankeducare.com",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2088 Madison Avenue",
      addressLocality: "Burnaby",
      addressRegion: "BC",
      postalCode: "V5C 6T5",
      addressCountry: "CA",
    },
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
    sameAs: [
      "https://www.facebook.com/DrShreyankEducare/",
      "https://www.instagram.com/drshreyankeducare/",
      "https://www.tiktok.com/@drshreyankeducare",
    ],
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
    // Founder entity with real, on-site credentials (see About page / AuthorBox).
    // Strengthens E-E-A-T and the knowledge-graph link between the person and
    // the organization — a strong signal for AI answer engines.
    founder: {
      "@type": "Person",
      "@id": "https://www.drshreyankeducare.com/#founder",
      name: "Dr. Shreyank Gupta",
      jobTitle: "Founder & Director",
      description:
        "Founder and director of Dr. Shreyank Educare, with a PhD in Ultrasound Signal & Image Processing and over 10 years of teaching experience.",
      alumniOf: { "@type": "CollegeOrUniversity", name: "University of Quebec" },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: "PhD",
        name: "PhD in Ultrasound Signal & Image Processing",
      },
      knowsAbout: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
      ],
      worksFor: { "@id": "https://www.drshreyankeducare.com/#organization" },
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
      name: "Dr. Shreyank Educare",
    },
  };

  if (type === "Course") {
    schema.provider = {
      "@type": "EducationalOrganization",
      name: "Dr. Shreyank Educare",
    };
    // Example course specifics if available
    schema.courseMode = "Online, Offline";
    schema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: "Mixed",
    };
  }

  return schema;
}

export function getCityPageSchema(city: any, currentUrl: string): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `Dr. Shreyank Educare — Tutoring in ${city.name}`,
    description:
      city.metaDescription ||
      `Math, Physics, Chemistry and Coding tutoring for ${city.name} students.`,
    url: currentUrl,
    logo: "https://www.drshreyankeducare.com/assets/logo.png",
    telephone: "+1-672-514-7587",
    email: "info@drshreyankeducare.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2088 Madison Avenue",
      addressLocality: "Burnaby",
      addressRegion: "BC",
      postalCode: "V5C 6T5",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, ${city.region || "BC"}`,
    },
    sameAs: [
      "https://www.facebook.com/DrShreyankEducare/",
      "https://www.instagram.com/drshreyankeducare/",
    ],
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
      name: "Dr. Shreyank Educare",
      url: "https://www.drshreyankeducare.com",
      logo: "https://www.drshreyankeducare.com/assets/logo.png",
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

  let imageUrl = "https://www.drshreyankeducare.com/assets/logo.png";
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
          "name": "Dr. Shreyank Gupta",
          "jobTitle": "PhD, Founder & Lead Tutor",
          "worksFor": {
            "@type": "EducationalOrganization",
            "name": "Dr. Shreyank Educare",
          },
          "url": "https://www.drshreyankeducare.com/about",
        }
      : {
          "@type": "Organization",
          "name": "Dr. Shreyank Educare",
          "url": "https://www.drshreyankeducare.com",
        },
    ...(post?.reviewedByExpert
      ? {
          "reviewedBy": {
            "@type": "Person",
            "name": "Dr. Shreyank Gupta",
            "jobTitle": "PhD, Founder & Lead Tutor",
          },
        }
      : {}),
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Dr. Shreyank Educare",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.drshreyankeducare.com/assets/logo.png",
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
    name: "Tutors at Dr. Shreyank Educare",
    itemListElement: (tutors || []).map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: t.name,
        jobTitle: t.role,
        worksFor: {
          "@type": "EducationalOrganization",
          name: "Dr. Shreyank Educare",
          url: "https://www.drshreyankeducare.com",
        },
        ...(t.education?.length ? { description: t.education.join(" · ") } : {}),
        ...(t.role ? { knowsAbout: t.role } : {}),
      },
    })),
  };
}
