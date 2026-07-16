import { permanentRedirect } from "next/navigation";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import BlogListingView from "./BlogListingView";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "blog");
  const baseMeta = getMetadata(data, "https://www.drshreyankeducare.com/blog");
  return {
    ...baseMeta,
    alternates: { canonical: "https://www.drshreyankeducare.com/blog" },
  };
}

export default async function BlogListingPage({ searchParams }: PageProps) {
  // Preserve old query-param links: /blog?page=N -> /blog/page/N
  const { page } = await searchParams;
  const pageNum = typeof page === "string" ? parseInt(page, 10) : 1;
  if (!Number.isNaN(pageNum) && pageNum > 1) {
    permanentRedirect(`/blog/page/${pageNum}`);
  }

  return <BlogListingView page={1} />;
}

export const revalidate = 3600;
