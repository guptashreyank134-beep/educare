import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Link2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import TrialClassForm from "@/components/TrialClassForm";
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

import { getSeoPageBySlug, seoPageUrl } from "@/data/seoPages";

const metrics = [
  { value: "PhD-Led", label: "by Dr. Shreyank Gupta" },
  { value: "10+ Years", label: "of teaching experience!" },
  { value: "5⭐ Rated", label: "by all parents!" },
];

/** Build Next.js metadata for an SEO landing page. */
export async function seoPageMetadata(slug: string): Promise<Metadata> {
  const page = getSeoPageBySlug(slug);
  if (!page) return {};

  // Editors can override the title/description in Studio; empty falls back.
  const content = await getLandingContent(slug);
  const metaTitle = orFallback(content?.metaTitle, page.metaTitle);
  const metaDescription = orFallback(content?.metaDescription, page.metaDescription);

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: h1 }]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          {/* Left: content + CTA above the fold */}
          <div className="flex flex-col">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bricolage font-medium text-slate leading-[1.2] mb-6">
              {h1}
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[520px] mb-8">
              {heroSubheading}
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/contact">
                <Button iconRight={ArrowRight}>Book Free Consultation</Button>
              </Link>
              <a
                href="https://wa.me/16725147587"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-[10px] border border-[#25D366] rounded-[8px] px-[20px] py-[10px] text-[#25D366] font-medium text-[16px] leading-none hover:bg-[#25D366]/10 transition-all"
              >
                Chat On WhatsApp
              </a>
            </div>
          </div>

          {/* Right: lead form */}
          <div className="relative mt-4 lg:mt-0">
            {/* Form-widget label, not a content heading — kept as <p> so it
                stays out of the heading outline (avoids duplicate-heading). */}
            <p className="text-[28px] font-bricolage font-medium text-slate text-center mb-3">
              Book a Free <span className="text-primary">30-Minute</span>{" "}
              Consultation
            </p>
            <p className="text-[15px] font-montserrat text-slate/70 text-center mb-6 leading-relaxed">
              Meet with our team, discuss your child's current challenges and receive a recommended tutoring plan.
            </p>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[110%] bg-white/40 blur-3xl rounded-full -z-10" />
            <TrialClassForm />
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
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

      <TrustedBrands />
      <Reviews />
      <VancouverCTABanner />
      <VancouverFAQSection faqs={faqs} />
    </div>
  );
}
