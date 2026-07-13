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
  const pageNum = parseInt(page, 10);

  const data = await getMetaDataBySlug("page", "blog");
  const baseMeta = getMetadata(data, "https://drshreyankeducare.com/blog/");
  const canonical = `https://drshreyankeducare.com/blog/page/${pageNum}/`;

  if (baseMeta && baseMeta.title) {
    return {
      ...baseMeta,
      title: `${baseMeta.title} - Page ${pageNum}`,
      description: `${baseMeta.description} (Page ${pageNum})`,
      alternates: { canonical },
    };
  }
  return { ...baseMeta, alternates: { canonical } };
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  // Page 1 canonically lives at /blog; non-numeric is invalid.
  if (Number.isNaN(pageNum)) notFound();
  if (pageNum <= 1) permanentRedirect("/blog");

  return <BlogListingView page={pageNum} />;
}

export const revalidate = 3600;
