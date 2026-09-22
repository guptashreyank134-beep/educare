import { permanentRedirect, notFound } from "next/navigation";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import BlogListingView, { getTotalBlogPages } from "../../BlogListingView";

interface PageProps {
  params: Promise<{ page: string }>;
}

// Prerender the known paginated pages at build time.
export async function generateStaticParams() {
  try {
    const totalPages = await getTotalBlogPages();
    const params: { page: string }[] = [];
    for (let p = 2; p <= totalPages; p++) {
      params.push({ page: String(p) });
    }
    return params;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params;
  const pageNum = Number(page);
  if (!/^\d+$/.test(page) || !Number.isSafeInteger(pageNum) || pageNum < 1) notFound();

  const data = await getMetaDataBySlug("page", "blog");
  const baseMeta = getMetadata(data, "https://www.drshreyankeducare.com/blog");
  const canonical = `https://www.drshreyankeducare.com/blog/page/${pageNum}`;

  if (baseMeta && baseMeta.title) {
    return {
      ...baseMeta,
      title: `Tutoring Tips & Study Guides | Page ${pageNum}`,
      description: `Explore page ${pageNum} of our tutoring blog: math, science, coding and exam preparation guides for school and university students.`,
      alternates: { canonical, languages: { "en-CA": canonical } },
      openGraph: { ...baseMeta.openGraph, url: canonical, title: `Tutoring Tips & Study Guides | Page ${pageNum}` },
      twitter: { ...baseMeta.twitter, title: `Tutoring Tips & Study Guides | Page ${pageNum}` },
    };
  }
  return { ...baseMeta, alternates: { canonical } };
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNum = Number(page);

  // Page 1 canonically lives at /blog; non-numeric is invalid.
  if (!/^\d+$/.test(page) || !Number.isSafeInteger(pageNum) || pageNum < 1) notFound();
  if (pageNum <= 1) permanentRedirect("/blog");

  return <BlogListingView page={pageNum} />;
}

export const revalidate = 3600;
