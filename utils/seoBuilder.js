/** @format */

import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

export const getResourcePageData = async () => {
  try {
    const query = `*[_type == "resourcePage" && slug.current == "resources"][0]{
  title,
  "slug": slug.current,
  relatedLinks[]{ label, href },

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

// Last-resort values used only if Sanity is unreachable. Kept consistent with
// the live copy: no "Best" superlative, and a title that names the subjects and
// locations rather than just the brand.
const fallbackPageData = {
  vancouverPage: {
    title: "PhD-Led Math, Physics, Chemistry & Coding Tutoring in Burnaby and Vancouver",
    metaData: {
      metaTitle: "Math & Science Tutoring in Burnaby & Vancouver | Dr. Shreyank",
      metaDescription:
        "PhD-led tutoring in Burnaby and Vancouver for Math, Physics, Chemistry and Coding. Grades 6–12 and university. Book a free 30-minute consultation.",
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
    // _type must be projected: getPageSchema uses it to decide Course vs
    // WebPage, and without it every programPage silently emitted WebPage.
    const query = `*[_type == "${type}" && slug.current == $slug][0]{
      _type,
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

/**
 * Force a canonical onto the www host.
 *
 * The site is served from www and every other signal (sitemap, schema,
 * metadataBase) points there. A non-www canonical names a URL that only
 * redirects, which contradicts those signals — so normalise it here rather than
 * trusting whatever host happens to be saved in Studio.
 */
function normalizeCanonical(url) {
  if (typeof url !== "string" || !url.trim()) return url;
  const onWww = url
    .trim()
    .replace(/^https?:\/\/(www\.)?drshreyankeducare\.com/i, "https://www.drshreyankeducare.com");
  // Drop a trailing slash from any deeper path. The site serves slash-less
  // canonicals (trailingSlash:false), so "/blog/x/" only redirects — a canonical
  // or hreflang pointing there is a redirect loop / self-alternate mismatch.
  // The bare origin keeps its slash.
  return onWww.replace(/^(https:\/\/www\.drshreyankeducare\.com)\/(.+?)\/$/i, "$1/$2");
}

export function getMetadata(data, currentUrl = "", fallback = {}) {
  const seo = data?.metaData;
  // Use provided URL or default to homepage
  const canonicalUrl = normalizeCanonical(currentUrl) || "https://www.drshreyankeducare.com/";

  // Page-specific fallbacks prevent the generic default title/description from
  // being duplicated across pages when a page has no Sanity metadata set.
  const defaultTitle = fallback.title || "Dr. Shreyank Educare";
  const defaultDescription =
    fallback.description ||
    "Expert academic tutoring, coding classes, and test preparation to help students excel in their educational journey.";

  const metadata = {
    title: defaultTitle,
    description: defaultDescription,
    openGraph: {
      type: "website",
      siteName: "Dr. Shreyank Educare",
      locale: "en_CA",
      url: canonicalUrl,
      images: "/assets/logo.png",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: "/assets/logo.png",
    },
    alternates: {
      languages: {
        // Self-referential: the alternate for THIS page is this page. It was
        // hardcoded to the homepage, so every page claimed the homepage was its
        // en-CA equivalent.
        "en-CA": canonicalUrl,
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
    metadata.openGraph.images = imageUrl;
    metadata.twitter.images = imageUrl;
  }

  if (seo.canonical) {
    // Normalised: a canonical saved as non-www would otherwise override the
    // correct www URL and point at a redirect.
    metadata.alternates.canonical = normalizeCanonical(seo.canonical);
    // Keep the self-referential hreflang in step with the canonical. Otherwise a
    // Studio-set canonical leaves the en-CA alternate pointing at the passed-in
    // URL, so the page has "no alternate link pointing to itself" (Seobility).
    metadata.alternates.languages["en-CA"] = metadata.alternates.canonical;
  }

  metadata.openGraph.title = metadata.title;
  metadata.openGraph.description = metadata.description;
  return metadata;
}
