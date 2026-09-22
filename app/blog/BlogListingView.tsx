import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { BlogsHeroSectionContent } from "@/components/GeneralComponents/content";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import Pagination from "@/components/ui/Pagination";
import { getMetaDataBySlug } from "@/utils/seoBuilder";
import { redirectSources } from "@/data/redirects";

export const POSTS_PER_PAGE = 9;

function toPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n");
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/** Total number of blog listing pages (used by generateStaticParams). */
/**
 * Slugs of posts that permanently redirect. Listing them would send a reader —
 * and a crawler — through a 308, so they are excluded from the listing and its
 * page count, exactly as the sitemap excludes them.
 */
const REDIRECTED_POST_SLUGS = [...redirectSources]
  .filter((path) => path.startsWith("/blog/"))
  .map((path) => path.replace("/blog/", ""));

const LISTED_POSTS = `*[_type == "post" && !(slug.current in $excluded)]`;

export async function getTotalBlogPages(): Promise<number> {
  const totalPosts = await client.fetch<number>(`count(${LISTED_POSTS})`, {
    excluded: REDIRECTED_POST_SLUGS,
  });
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
}

/**
 * Shared blog listing view, rendered by both /blog (page 1) and
 * /blog/page/[page] (page N) so the two routes stay in sync.
 */
export default async function BlogListingView({ page }: { page: number }) {
  const validPage = Number.isNaN(page) || page < 1 ? 1 : page;
  const start = (validPage - 1) * POSTS_PER_PAGE;
  const end = validPage * POSTS_PER_PAGE;

  const postsQuery = `${LISTED_POSTS} | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    mainImage
  }`;

  const [posts, totalPosts, data] = await Promise.all([
    client.fetch(postsQuery, { start, end, excluded: REDIRECTED_POST_SLUGS }),
    client.fetch(`count(${LISTED_POSTS})`, { excluded: REDIRECTED_POST_SLUGS }),
    getMetaDataBySlug("page", "blog"),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  // A page beyond the last one (other than page 1) is a 404, not an empty list.
  if (validPage > 1 && posts.length === 0) {
    notFound();
  }

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/blog")} />
      <GeneralHeroSection
        {...BlogsHeroSectionContent}
        heading={`Tutoring Tips & Study Guides${validPage > 1 ? ` — Page ${validPage}` : ""}`}
        description={`Browse tutoring tips and study guides for math, science, coding and exam preparation.${validPage > 1 ? ` This is page ${validPage} of the blog archive.` : " Find practical explanations for school and university coursework."}`}
        breadcrumb={<Breadcrumbs items={[{ label: "Blog" }]} />}
      />

      <main className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Blog archive pages" className="mb-10 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold">Browse the archive:</span>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <Link key={number} href={number === 1 ? "/blog" : `/blog/page/${number}`}
                aria-current={number === validPage ? "page" : undefined}
                className="text-primary underline underline-offset-4">
                Page {number}
              </Link>
            ))}
          </nav>
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-display font-medium text-slate-700 mb-2">
                No articles found
              </h3>
              <p className="text-slate-500 mb-6">
                Check back soon for new educational insights and guides!
              </p>
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
                  const postExcerpt =
                    post.excerpt || plainTextBody.substring(0, 150) + "...";
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
                    : "/assets/aboutUsPage/AboutHeroImg.webp";

                  return (
                    <article
                      key={post._id}
                      className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        />
                      </div>

                      <div className="flex flex-col flex-1 p-6 sm:p-8">
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

                        <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className="text-slate-600 font-sans text-sm leading-relaxed mb-6 line-clamp-3">
                          {postExcerpt}
                        </p>

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
