import React from "react";
import { urlFor } from "@/sanity/lib/image";

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
    ],
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
  faqs: Array<{ question: string; answer: string }>
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
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
    "author": {
      "@type": "Person",
      "name": "Dr. Shreyank Gupta",
      "jobTitle": "PhD, Founder & Lead Tutor",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Dr. Shreyank Educare",
      },
      "url": "https://www.drshreyankeducare.com/about",
    },
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

