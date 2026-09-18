import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  JsonLd,
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/components/SchemaMarkup";
import { answerPagePath, answerPages, getAnswerPage } from "@/content/answer-pages";
import { LEAD_AUTHOR, authorPath } from "@/data/authors";
import { SITE_URL } from "@/data/businessInfo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return answerPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAnswerPage(slug);
  if (!page) return {};

  const url = `${SITE_URL}${answerPagePath(page.slug)}`;
  const isDraft = page.status === "draft";
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    // A draft is still reachable for review, but must not be indexed or cited
    // while its claims are unverified. `follow` keeps its internal links live.
    ...(isDraft ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      images: "/assets/logo.png",
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export default async function AnswerPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getAnswerPage(slug);
  if (!page) notFound();

  const url = `${SITE_URL}${answerPagePath(page.slug)}`;

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <JsonLd
        schema={getArticleSchema({
          headline: page.question,
          description: page.metaDescription,
          url,
          datePublished: page.lastReviewed,
          dateModified: page.lastReviewed,
          byAuthor: true,
        })}
      />
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: page.question, url },
        ])}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Breadcrumbs items={[{ label: page.question }]} />

        {page.status === "draft" && (
          <p className="mt-6 rounded-xl border border-yellow-light bg-yellow-light/20 px-4 py-3 text-[14px] font-montserrat text-slate/80">
            Draft — awaiting review. This page is not indexed.
          </p>
        )}

        <h1 className="mt-6 text-[32px] sm:text-[40px] font-bricolage font-medium text-slate leading-[1.2] mb-5">
          {page.question}
        </h1>

        {/* The direct answer sits immediately under the H1: it is the passage an
            answer engine quotes, so nothing may come between them. */}
        <p className="text-[18px] sm:text-[20px] font-montserrat text-slate leading-relaxed border-l-4 border-primary pl-5 mb-8">
          {page.directAnswer}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-montserrat text-slate/60 border-b border-[#F1F5F9] pb-6 mb-10">
          <span>
            By{" "}
            <Link
              href={authorPath(LEAD_AUTHOR.slug)}
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {LEAD_AUTHOR.name}
            </Link>
          </span>
          <span>Last reviewed {formatDate(page.lastReviewed)}</span>
        </div>

        {page.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-[24px] sm:text-[30px] font-bricolage font-medium text-slate mb-4">
              {section.heading}
            </h2>
            {section.body.map((paragraph, index) => (
              <p
                key={index}
                className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
            {section.points && (
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[18px] font-montserrat text-slate/80">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {section.sources && (
              <p className="mt-4 text-[14px] font-montserrat text-slate/60">
                Source
                {section.sources.length > 1 ? "s" : ""}:{" "}
                {section.sources.map((source, index) => (
                  <span key={source.href}>
                    {index > 0 && ", "}
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      {source.label}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </section>
        ))}

        <section className="border-t border-[#F1F5F9] pt-8">
          <h2 className="text-[20px] font-bricolage font-medium text-slate mb-4">Related</h2>
          <div className="flex flex-wrap gap-2.5">
            {page.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[14px] font-montserrat text-slate/80 hover:border-primary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

export const revalidate = 3600;
