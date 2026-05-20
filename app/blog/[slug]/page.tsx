import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, CalendarDays } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { notFound } from "next/navigation";
import { JsonLd, getBlogPostSchema } from "@/components/SchemaMarkup";
import { PortableText } from "@portabletext/react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await getMetaDataBySlug("post", slug);
  return getMetadata(data, `https://drshreyankeducare.com/blog/${slug}/`);
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

const portableTextComponents = {
  types: {
    htmlBlock: ({ value }: any) => {
      if (!value || !value.html) return null;
      return (
        <div
          className="my-6 raw-html-block"
          dangerouslySetInnerHTML={{ __html: value.html }}
        />
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 font-sans text-slate-800 text-[16px] sm:text-[18px] leading-relaxed">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-3xl sm:text-4xl font-display font-bold mt-10 mb-4 text-slate-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl sm:text-3xl font-display font-bold mt-8 mb-4 text-slate-900 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl sm:text-2xl font-display font-bold mt-6 mb-3 text-slate-900 leading-snug">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary bg-slate-50 pl-4 py-2 my-6 italic text-slate-700 font-sans">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 font-sans text-slate-800">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 font-sans text-slate-800">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-[16px] sm:text-[18px] leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-[16px] sm:text-[18px] leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm text-pink-600">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const href = value?.href;
      const target =
        href && !href.startsWith("/") && !href.startsWith("https://drshreyankeducare.com")
          ? "_blank"
          : undefined;
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the current post with updatedAt and metadata
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    publishedAt,
    excerpt,
    body,
    mainImage,
    metaData
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    notFound();
  }

  // Fetch related posts (excluding the current one)
  const relatedQuery = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...2] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    mainImage
  }`;

  const relatedPosts = await client.fetch(relatedQuery, { slug });

  const plainTextBody = Array.isArray(post.body)
    ? toPlainText(post.body)
    : stripHtml(post.body || "");
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

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd schema={getBlogPostSchema(post, `https://drshreyankeducare.com/blog/${slug}/`)} />
      {/* Blog Detail Main Wrapper */}
      <main className="min-h-screen bg-slate-50 relative pb-24 font-sans">
        {/* Background Decorative Accents */}
        <div
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Top Header / Breadcrumb Space */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Article Section */}
        <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Main Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            {/* Main Featured Image */}
            <div className="relative h-64 sm:h-[400px] w-full bg-slate-100">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-w-1200px) 100vw, 1200px"
              />
            </div>

            {/* Content Container */}
            <div className="p-6 sm:p-12 lg:p-16">
              {/* Meta information */}
              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 mb-6 font-medium">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readingTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 leading-tight mb-8">
                {post.title}
              </h1>

              {/* Rich Blog Body Content */}
              <div className="blog-rich-content text-slate-800 text-[16px] sm:text-[18px] leading-relaxed space-y-6">
                {Array.isArray(post.body) ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: post.body || "" }} />
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Recommended / Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mt-16 pt-16 border-t border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-8">
              Recommended Reads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relPost: any) => {
                const relDate = relPost.publishedAt
                  ? new Date(relPost.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Recently published";

                const relImg = relPost.mainImage
                  ? urlFor(relPost.mainImage).url()
                  : "/assets/aboutUsPage/AboutHeroImg.webp";

                const relPlainBody = Array.isArray(relPost.body)
                  ? toPlainText(relPost.body)
                  : stripHtml(relPost.body || "");
                const relReadingTime = getReadingTime(relPlainBody);

                return (
                  <Link
                    key={relPost._id}
                    href={`/blog/${relPost.slug}`}
                    className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="relative h-44 w-full bg-slate-100">
                      <Image
                        src={relImg}
                        alt={relPost.title}
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-300"
                        sizes="(max-w-768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {relDate}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span>{relReadingTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-slate-800 text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {relPost.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Inject Styles specifically for rich HTML styling */}
        <style dangerouslySetInnerHTML={{ __html: `
          .blog-rich-content h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.3333333;
            font-family: var(--font-bricolage), sans-serif;
          }
          @media (min-width: 640px) {
            .blog-rich-content h2 {
              font-size: 1.875rem;
            }
          }
          .blog-rich-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
            margin-top: 1.6rem;
            margin-bottom: 0.8rem;
            font-family: var(--font-bricolage), sans-serif;
          }
          .blog-rich-content p {
            margin-top: 0;
            margin-bottom: 1.25rem;
            color: #334155;
            font-family: var(--font-montserrat), sans-serif;
            font-weight: 400;
            line-height: 1.75;
          }
          .blog-rich-content ul {
            list-style-type: disc;
            padding-left: 1.625rem;
            margin-bottom: 1.25rem;
            space-y: 0.5rem;
          }
          .blog-rich-content ol {
            list-style-type: decimal;
            padding-left: 1.625rem;
            margin-bottom: 1.25rem;
          }
          .blog-rich-content li {
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
            color: #334155;
            font-family: var(--font-montserrat), sans-serif;
          }
          .blog-rich-content blockquote {
            font-weight: 500;
            font-style: italic;
            color: #0f172a;
            border-left-width: 0.25rem;
            border-left-color: #fcd34d;
            padding-left: 1rem;
            margin: 1.5rem 0;
          }
          .blog-rich-content em {
            font-style: italic;
          }
          .blog-rich-content strong {
            font-weight: 700;
            color: #0f172a;
          }
          .blog-rich-content a {
            color: #f59e0b;
            text-decoration: underline;
            font-weight: 600;
          }
          .blog-rich-content a:hover {
            color: #d97706;
          }
        `}} />
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";
