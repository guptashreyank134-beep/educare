/** @format */

import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

export const getResourcePageData = async () => {
  try {
    const query = `*[_type == "resourcePage" && slug.current == "resources"][0]{
  title,
  "slug": slug.current,

  faqs[]{
    question,
    answer
  },

  videosSection{
    heading,
    description,
    "image": image.asset->url,

    categories[]{
      title,
      description
    },

    learningPoints{
      heading,
      pointers
    }
  },

  practiceMaterialSection{
    heading,
    description,
    "image": image.asset->url,

    studyTips[]{
      title,
      description
    },

    whyPracticeHelp{
      heading,
      icon,
      pointers
    },

    downloadMaterials[]{
      label,
      "fileUrl": file.asset->url
    }
  },

  practiceTestsSection{
    mainHeading,
    mainDescription,
    testHeading,
    testDescription,

    "image": image.asset->url,

    leftSections[]{
      heading,
      description,
      points
    },

    practiceTests[]{
      label,
      link
    }
  }
}`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.warn("Could not fetch resource page data from Sanity, using defaults");
    return { title: "Resources", faqs: [] };
  }
};

const fallbackPageData = {
  vancouverPage: {
    title: "Best Math, Physics, Chemistry & Coding Tutoring In Burnaby And Vancouver!",
    metaData: {
      metaTitle: "EduCare - Tutoring Services",
      metaDescription: "Professional tutoring in Math, Physics, Chemistry and Coding",
    },
  },
};

export const getPageData = async (type) => {
  try {
    const query = `*[_type == "${type}"][0]`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.warn(`Could not fetch ${type} from Sanity, using fallback data`);
    return fallbackPageData[type] || {};
  }
};

export const getMetaDataBySlug = async (type, slug) => {
  try {
    const query = `*[_type == "${type}" && slug.current == $slug][0]{
      title,
      metaData {
        metaTitle,
        metaDescription,
        metaImage,
        canonical
      }
    }`;
    const data = await client.fetch(query, { slug });
    return data;
  } catch (error) {
    console.warn(`Could not fetch metadata for ${type}/${slug}, using defaults`);
    return { title: "Page", metaData: {} };
  }
};

export function getMetadata(data, currentUrl = "", fallback = {}) {
  const seo = data?.metaData;
  // Use provided URL or default to homepage
  const canonicalUrl = currentUrl || "https://drshreyankeducare.com/";

  // Page-specific fallbacks prevent the generic default title/description from
  // being duplicated across pages when a page has no Sanity metadata set.
  const defaultTitle = fallback.title || "Dr. Shreyank Educare";
  const defaultDescription =
    fallback.description ||
    "Expert academic tutoring, coding classes, and test preparation to help students excel in their educational journey.";

  const metadata = {
    title: defaultTitle,
    description: defaultDescription,
    openGraph: { images: "/assets/logo.png" },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      image: "/assets/logo.png",
    },
    alternates: {
      languages: {
        "en-US": "https://drshreyankeducare.com/",
      },
      canonical: canonicalUrl,
    },
  };

  metadata.openGraph.title = metadata.title;
  metadata.openGraph.description = metadata.description;
  if (!seo) {
    return metadata;
  }

  if (seo.metaTitle) {
    metadata.title = seo.metaTitle;
    metadata.twitter.title = seo.metaTitle;
  }
  if (seo.metaDescription) {
    metadata.description = seo.metaDescription;
    metadata.twitter.description = seo.metaDescription;
  }
  if (seo.metaImage) {
    const imageUrl = urlFor(seo.metaImage).url() ?? "/assets/logo.png";
    metadata.openGraph = { images: imageUrl };
    metadata.twitter.image = imageUrl;
  }

  if (seo.canonical) {
    metadata.alternates.canonical = seo.canonical;
  }

  metadata.openGraph.title = metadata.title;
  metadata.openGraph.description = metadata.description;
  return metadata;
}
