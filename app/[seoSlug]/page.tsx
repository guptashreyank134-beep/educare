import SeoLandingPage, { seoPageMetadata } from "@/components/SeoLandingPage";
import { seoPages } from "@/data/seoPages";

interface PageProps {
  params: Promise<{ seoSlug: string }>;
}

// Only the slugs defined in data/seoPages.ts render; any other top-level
// path returns 404 (static routes and redirects take precedence).
export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((p) => ({ seoSlug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { seoSlug } = await params;
  return seoPageMetadata(seoSlug);
}

export default async function Page({ params }: PageProps) {
  const { seoSlug } = await params;
  return <SeoLandingPage slug={seoSlug} />;
}

export const revalidate = 3600;
