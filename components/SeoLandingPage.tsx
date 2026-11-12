import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Link2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import CourseConsultationPanel from "@/components/CourseConsultationPanel";
import RelevantTutorProfiles from "@/components/RelevantTutorProfiles";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import ExtraRelatedLinks from "@/components/ExtraRelatedLinks";
import { getLandingContent, orFallback } from "@/sanity/lib/faqs";
import VancouverCTABanner from "@/components/VancouverCTABanner";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  JsonLd,
  getServiceSchema,
  getFAQSchema,
} from "@/components/SchemaMarkup";

import { getSeoPageBySlug, seoPageUrl, getSeoSiblings } from "@/data/seoPages";
import { founderTeaches } from "@/data/authors";
import { resolveInternalHref } from "@/data/redirects";
import { BUSINESS } from "@/data/businessInfo";
import { correctSeoCopy } from "@/data/seoCopyCorrections";
import { tutorIdsForContext } from "@/data/tutorAssignments";

const metrics = [
  { value: "PhD-Led", label: "by Dr. Shreyank Gupta" },
  { value: "10+ Years", label: "of teaching experience!" },
  { value: "Rated 5.0", label: "on Google by parents & students" },
];

const englishTutorMetrics = [
  { value: "20+ Years", label: "of teaching experience" },
  { value: "2 Master’s", label: "in Education and English" },
  { value: "Grades 1–10", label: "English and ESL support" },
];

/** Build Next.js metadata for an SEO landing page. */
export async function seoPageMetadata(slug: string): Promise<Metadata> {
  const page = getSeoPageBySlug(slug);
  if (!page) return {};

  // Editors can override the title/description in Studio; empty falls back.
  const content = await getLandingContent(slug);
  const metaTitle = correctSeoCopy(orFallback(content?.metaTitle, page.metaTitle));
  const metaDescription = correctSeoCopy(orFallback(content?.metaDescription, page.metaDescription));

  const url = seoPageUrl(slug);
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      images: "/assets/logo.png",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: "/assets/logo.png",
    },
  };
}

export default async function SeoLandingPage({ slug }: { slug: string }) {
  const page = getSeoPageBySlug(slug);
  if (!page) {
    notFound();
  }

  const url = seoPageUrl(slug);
  // Content is editable in Sanity; each field falls back to the code value.
  const content = await getLandingContent(slug);
  const h1 = orFallback(content?.heading, page.h1);
  const heroSubheading = orFallback(content?.heroSubheading, page.heroSubheading);
  const intro = orFallback(content?.intro, page.intro);
  const sections = orFallback(content?.sections, page.sections);
  const faqs = orFallback(content?.faqs, page.faqs);
  const trustMetrics = slug === "english-tutor-vancouver" ? englishTutorMetrics : metrics;
  const tutorIds = tutorIdsForContext(`${page.h1} ${page.cluster} ${slug}`);

  return (
    <div className="min-h-screen bg-white font-montserrat relative overflow-hidden">
      <JsonLd
        schema={getServiceSchema({
          name: h1,
          description: page.metaDescription,
          url,
          areaServed: page.location ? [`${page.location}, BC`] : ["Burnaby, BC", "Vancouver, BC"],
        })}
      />
      <JsonLd schema={getFAQSchema(faqs)} />

      {/* Yellow Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 sm:pt-32 pb-10 lg:pb-12">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: h1 }]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          {/* Left: content + CTA above the fold */}
          <div className="flex flex-col">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bricolage font-medium text-slate leading-[1.2] mb-6">
              {h1}
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[520px] mb-8">
              {heroSubheading}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/book">
                <Button iconRight={ArrowRight}>
                  {page.location === "Vancouver"
                    ? "Book a Free Assessment Session"
                    : "Book a Free 30-Minute Consultation"}
                </Button>
              </Link>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-[10px] border border-[#25D366] rounded-[8px] px-[20px] py-[10px] text-[#25D366] font-medium text-[16px] leading-none hover:bg-[#25D366]/10 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-8 space-y-4 rounded-[16px] border border-[#F1F5F9] bg-white/75 p-5 sm:p-6">
              <h2 className="text-[22px] font-bricolage font-medium text-slate">
                Tutoring Built Around the Student
              </h2>
              {intro.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] sm:text-[16px] font-montserrat text-slate/75 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right: lead form */}
          <div className="relative mt-4 lg:mt-0">
            {/* The page's own H1 becomes the lead subject, so an enquiry names
                the page that produced it rather than a generic bucket. */}
            <CourseConsultationPanel
              fluid
              subject={h1}
              anchor={`${slug}-enquiry`}
              courseLabel="Student's grade or course"
              courseExample="Math 10, Chemistry 12, or a first-year university course"
              heading={page.location ? `Ask about tutoring in ${page.location}` : "Ask about tutoring"}
              testimonialTopic={/university.*physics/i.test(`${page.h1} ${page.cluster}`) ? "university-physics" : undefined}
              showCredential={founderTeaches(`${page.h1} ${page.cluster}`)}
            />
          </div>
        </div>

        {tutorIds.length > 0 && (
          <div className="mx-auto max-w-5xl pt-10 lg:pt-14">
            <RelevantTutorProfiles tutorIds={tutorIds} />
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-10 lg:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trustMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#F1F5F9] flex flex-col items-center text-center transform hover:-translate-y-1 transition-all"
              >
                <p className="text-[34px] font-bricolage font-medium text-[#44619B] leading-tight mb-2">
                  {metric.value}
                </p>
                <p className="text-[20px] font-montserrat font-normal text-[#64748B]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-[24px] sm:text-[30px] font-bricolage font-medium text-slate mb-5">
              {section.heading}
            </h2>
            {section.body?.map((p, j) => (
              <p
                key={j}
                className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-4"
              >
                {p}
              </p>
            ))}
            {section.points && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 bg-bg-grey rounded-xl px-4 py-3 border border-[#F1F5F9]"
                  >
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-[16px] font-montserrat text-slate">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Related internal links */}
      {page.related && page.related.length > 0 && (
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-primary" />
            <h2 className="text-[20px] font-bricolage font-medium text-slate">
              Related Tutoring
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {page.related.map((link) => (
              <Link
                key={link.href}
                href={resolveInternalHref(link.href)}
                className="inline-flex items-center gap-2 text-primary font-montserrat font-medium underline decoration-2 underline-offset-4 decoration-yellow-light hover:text-primary/80 transition-colors"
              >
                {link.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Auto-generated sibling links (same cluster / location). Ensures every
          programmatic landing page is well cross-linked, not orphaned. */}
      {(() => {
        const siblings = getSeoSiblings(slug, 6, (page.related || []).map((r) => r.href));
        if (!siblings.length) return null;
        return (
          <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
            <h2 className="text-[20px] font-bricolage font-medium text-slate mb-4">
              Explore More Tutoring
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {siblings.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[14px] font-montserrat text-slate/80 hover:border-primary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      <VancouverCTABanner />
      <VancouverFAQSection faqs={faqs} />
      <ExtraRelatedLinks links={content?.relatedLinks} />
    </div>
  );
}
