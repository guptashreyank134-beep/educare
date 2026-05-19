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

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Dr. Shreyank Educare",
    url: "https://drshreyankeducare.com",
    logo: "https://drshreyankeducare.com/assets/logo.png",
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
    sameAs: [
      "https://www.facebook.com/drshreyankeducare",
      "https://www.instagram.com/drshreyankeducare",
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

export function getBlogPostSchema(post: any, currentUrl: string): Record<string, any> {
  if (!post) return {};

  const seo = post?.metaData;
  const title = seo?.metaTitle || post?.title || "Blog Post";
  const description = seo?.metaDescription || post?.excerpt || "Expert academic tutoring, coding classes, and test preparation.";

  let imageUrl = "https://drshreyankeducare.com/assets/logo.png";
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
      "@type": "Organization",
      "name": "Dr. Shreyank Educare",
      "url": "https://drshreyankeducare.com",
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Dr. Shreyank Educare",
      "logo": {
        "@type": "ImageObject",
        "url": "https://drshreyankeducare.com/assets/logo.png",
      },
    },
    "datePublished": post.publishedAt || new Date().toISOString(),
    "dateModified": post._updatedAt || post.publishedAt || new Date().toISOString(),
  };
}

