import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { BlogsHeroSectionContent } from "@/components/GeneralComponents/content";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import Pagination from "@/components/ui/Pagination";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page;
  const pageNum = typeof page === "string" ? parseInt(page, 10) : 1;
  const suffix = !isNaN(pageNum) && pageNum > 1 ? ` - Page ${pageNum}` : "";

  const data = await getMetaDataBySlug("page", "blog");
  const baseMeta = getMetadata(data, "https://drshreyankeducare.com/blog/");

  if (baseMeta && baseMeta.title) {
    return {
      ...baseMeta,
      title: `${baseMeta.title}${suffix}`,
      alternates: {
        canonical: pageNum > 1 ? `https://drshreyankeducare.com/blog/?page=${pageNum}` : `https://drshreyankeducare.com/blog/`,
      },
    };
  }
  return baseMeta;
}

// Helper to extract plain text from Portable Text blocks
function toPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n");
}

// Helper to strip HTML tags and return clean text
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper to estimate reading time
function getReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogListingPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const pageVal = resolvedSearchParams.page;
  const currentPage = typeof pageVal === "string" ? parseInt(pageVal, 10) : 1;
  const validPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  const POSTS_PER_PAGE = 9;
  const start = (validPage - 1) * POSTS_PER_PAGE;
  const end = validPage * POSTS_PER_PAGE;

  // Query only the required posts slice and count the total posts in parallel
  const countQuery = `count(*[_type == "post"])`;
  const postsQuery = `*[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    mainImage
  }`;

  const [posts, totalPosts, data] = await Promise.all([
    client.fetch(postsQuery, { start, end }),
    client.fetch(countQuery),
    getMetaDataBySlug("page", "blog"),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/blog/")} />
      <GeneralHeroSection
        {...BlogsHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />

      <main className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-display font-medium text-slate-700 mb-2">
                No articles found
              </h3>
              <p className="text-slate-500 mb-6">
                Check back soon for new educational insights and guides!
              </p>
              {validPage > 1 && (
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-opacity-90 transition-all duration-200"
                >
                  Back to Page 1
                </Link>
              )}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => {
                  let plainTextBody = "";
                  if (Array.isArray(post.body)) {
                    plainTextBody = toPlainText(post.body);
                  } else {
                    plainTextBody = stripHtml(post.body || "");
                  }
                  const postExcerpt = post.excerpt || (plainTextBody.substring(0, 150) + "...");
                  const readingTime = getReadingTime(plainTextBody);
                  const formattedDate = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "Recently published";

                  const imageUrl = post.mainImage
                    ? urlFor(post.mainImage).url()
                    : "/assets/aboutUsPage/AboutHeroImg.webp"; // fallback image

                  return (
                    <article
                      key={post._id}
                      className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                      {/* Image block */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        />
                      </div>

                      {/* Content block */}
                      <div className="flex flex-col flex-1 p-6 sm:p-8">
                        {/* Meta information */}
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-sans">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-slate-600 font-sans text-sm leading-relaxed mb-6 line-clamp-3">
                          {postExcerpt}
                        </p>

                        {/* Read more link */}
                        <div className="mt-auto pt-4 border-t border-slate-50">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-800 hover:text-primary transition-colors"
                          >
                            Read Article
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination controls */}
              <Pagination
                currentPage={validPage}
                totalPages={totalPages}
                basePath="/blog"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";
