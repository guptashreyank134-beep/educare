import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/Button";
import LeadForm from "@/components/LeadForm";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import { getLandingContent, orFallback } from "@/sanity/lib/faqs";
import VancouverCTABanner from "@/components/VancouverCTABanner";
import TrustedBrands from "@/components/TrustedBrands";
import Reviews from "@/components/Reviews";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  JsonLd,
  getServiceSchema,
  getFAQSchema,
} from "@/components/SchemaMarkup";

import { getVerticalPageBySlug, verticalUrl, getVerticalSiblings } from "@/data/verticalPages";

/** Build Next.js metadata for a vertical page. Used by each route's generateMetadata. */
export async function verticalMetadata(slug: string): Promise<Metadata> {
  const page = getVerticalPageBySlug(slug);
  if (!page) return {};

  // Editors can override the title/description in Studio; empty falls back.
  const content = await getLandingContent(slug);
  const metaTitle = orFallback(content?.metaTitle, page.metaTitle);
  const metaDescription = orFallback(content?.metaDescription, page.metaDescription);

  const url = verticalUrl(slug);
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

export default async function VerticalLandingPage({ slug }: { slug: string }) {
  const page = getVerticalPageBySlug(slug);
  if (!page) {
    notFound();
  }

  const url = verticalUrl(slug);
  // Content is editable in Sanity; each field falls back to the code value.
  const content = await getLandingContent(slug);
  const heroHeading = orFallback(content?.heading, page.heroHeading);
  const heroSubheading = orFallback(content?.heroSubheading, page.heroSubheading);
  const intro = orFallback(content?.intro, page.intro);
  const sections = orFallback(content?.sections, page.sections);
  const faqs = orFallback(content?.faqs, page.faqs);

  return (
    <div className="min-h-screen bg-white font-montserrat relative overflow-hidden">
      <JsonLd
        schema={getServiceSchema({
          name: heroHeading,
          description: page.metaDescription,
          url,
          areaServed: page.regionsServed,
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: heroHeading }]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
          {/* Left: content + CTA above the fold */}
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2 self-start bg-yellow-light/60 text-slate text-[13px] font-montserrat px-3 py-1.5 rounded-full border border-[#F1F5F9] mb-5">
              <GraduationCap className="w-4 h-4 text-primary" />
              Serving: {page.regionsServed.join(" · ")}
            </span>
            <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bricolage font-medium text-slate leading-[1.2] mb-6">
              {heroHeading}
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[560px] mb-8">
              {heroSubheading}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/book">
                <Button iconRight={ArrowRight}>Book a Free 30-Minute Consultation</Button>
              </Link>
              <a
                href="https://wa.me/16725147587"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-[10px] border border-[#25D366] rounded-[8px] px-[20px] py-[10px] text-[#25D366] font-medium text-[16px] leading-none hover:bg-[#25D366]/10 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: segmented lead form */}
          <div className="relative mt-4 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[110%] bg-white/40 blur-3xl rounded-full -z-10" />
            <LeadForm
              vertical={page.vertical}
              heading={page.leadHeading}
              subjectLabel={page.leadSubjectLabel}
              subjectPlaceholder={page.leadSubjectPlaceholder}
            />
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-8">
        <div className="space-y-5">
          {intro.map((paragraph, index) => (
            <p
              key={index}
              className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

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

      {/* Who it's for */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-8">
        <h2 className="text-[24px] sm:text-[30px] font-bricolage font-medium text-slate mb-5">
          Who This Is For
        </h2>
        <ul className="space-y-2.5">
          {page.whoFor.map((item) => (
            <li
              key={item}
              className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 flex items-start"
            >
              <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Related internal links */}
      {page.relatedLinks && page.relatedLinks.length > 0 && (
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="flex flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 text-primary font-montserrat font-medium underline decoration-2 underline-offset-4 decoration-yellow-light hover:text-primary/80 transition-colors"
              >
                {link.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sibling pages in the same vertical (medical / quant) — keeps every
          vertical page cross-linked rather than orphaned. */}
      {(() => {
        const siblings = getVerticalSiblings(slug).filter(
          (s) => !(page.relatedLinks || []).some((r) => r.href === s.href)
        );
        if (!siblings.length) return null;
        return (
          <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
            <h2 className="text-[20px] font-bricolage font-medium text-slate mb-4">
              Related Tutoring
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

      <TrustedBrands />
      <Reviews />
      <VancouverCTABanner />
      <VancouverFAQSection faqs={faqs} />
    </div>
  );
}
