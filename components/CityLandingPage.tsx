import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/Button";
import TrialClassForm from "@/components/TrialClassForm";
import VancouverHeroImage from "@/components/VancouverHeroImage";
import VancouverAboutSection from "@/components/VancouverAboutSection";
import VancouverWhyChooseSection from "@/components/VancouverWhyChooseSection";
import VancouverExploreSubjectsSection from "@/components/VancouverExploreSubjectsSection";
import VancouverFlexibleProgramsSection from "@/components/VancouverFlexibleProgramsSection";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import { getLandingContent, orFallback } from "@/sanity/lib/faqs";
import VancouverCTABanner from "@/components/VancouverCTABanner";
import TrustedBrands from "@/components/TrustedBrands";
import Reviews from "@/components/Reviews";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  JsonLd,
  getCityPageSchema,
  getFAQSchema,
} from "@/components/SchemaMarkup";

import { getCityBySlug, cityUrl } from "@/data/cities";

const metrics = [
  { value: "PhD-Led", label: "by Dr. Shreyank Gupta" },
  { value: "10+ Years", label: "of teaching experience!" },
  { value: "5⭐ Rated", label: "by all parents!" },
];

/** Build Next.js metadata for a city page. Used by each route's generateMetadata. */
export async function cityMetadata(slug: string): Promise<Metadata> {
  const city = getCityBySlug(slug);
  if (!city) return {};

  // Editors can override the title/description in Studio; empty falls back.
  const content = await getLandingContent(slug);
  const metaTitle = orFallback(content?.metaTitle, city.metaTitle);
  const metaDescription = orFallback(content?.metaDescription, city.metaDescription);

  const url = cityUrl(slug);
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

export default async function CityLandingPage({ slug }: { slug: string }) {
  const city = getCityBySlug(slug);
  if (!city) {
    notFound();
  }

  const url = cityUrl(slug);
  const breadcrumbItems = [{ label: `Math Tutor in ${city.name}` }];
  // Content is editable in Sanity; each field falls back to the code value.
  const content = await getLandingContent(slug);
  const heroHeading = orFallback(content?.heading, city.heroHeading);
  const heroSubheading = orFallback(content?.heroSubheading, city.heroSubheading);
  const intro = orFallback(content?.intro, city.intro);
  const faqs = orFallback(content?.faqs, city.faqs);

  return (
    <div className="min-h-screen bg-white font-montserrat relative overflow-hidden">
      <JsonLd schema={getCityPageSchema(city, url)} />
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
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Left Column: Content & Images */}
          <div className="flex flex-col">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bricolage font-medium text-slate leading-[1.2] mb-6">
              {heroHeading}
            </h1>
            <p className="text-[#64748B] text-[16px] leading-relaxed max-w-[500px] mb-8">
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
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat On Whatsapp
              </a>
            </div>

            {/* Hero Image Component */}
            <VancouverHeroImage />
          </div>

          {/* Right Column: Lead Form */}
          <div className="relative mt-12 lg:mt-0">
            {/* Form-widget label, not a content heading — kept as <p> so it
                stays out of the heading outline (avoids duplicate-heading). */}
            <p className="text-[32px] font-bricolage font-medium text-slate text-center mb-3">
              Book a Free <span className="text-primary">30-Minute</span>{" "}
              Consultation
            </p>
            <p className="text-[15px] font-montserrat text-slate/70 text-center mb-6 leading-relaxed">
              Meet with our team, discuss your child's current challenges and receive a recommended tutoring plan.
            </p>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[110%] bg-white/40 blur-3xl rounded-full -z-10" />
            <TrialClassForm />
            <p className="text-[14px] text-slate font-montserrat text-center mt-4 leading-relaxed">
              ⓘ Limited spots available for weekly tutoring batches and
              one-on-one sessions !
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-24">
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

      {/* City-specific intro / local content */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-[28px] sm:text-[34px] font-bricolage font-medium text-slate mb-6">
          Math, Physics, Chemistry &amp; Coding Tutoring in {city.name}
        </h2>
        <div className="space-y-5">
          {intro.map((paragraph, index) => (
            <p
              key={index}
              className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed">
            {city.availability}
          </p>
        </div>
      </section>

      {/* Areas served + local schools */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-[20px] font-bricolage font-medium text-slate">
                Areas We Serve in {city.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {city.neighborhoods.map((area) => (
                <span
                  key={area}
                  className="inline-block bg-yellow-light/60 text-slate text-[14px] font-montserrat px-3 py-1.5 rounded-full border border-[#F1F5F9]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="text-[20px] font-bricolage font-medium text-slate">
                Supporting {city.name} Students From
              </h3>
            </div>
            <ul className="space-y-2">
              {city.nearbySchools.map((school) => (
                <li
                  key={school}
                  className="text-[15px] font-montserrat text-slate/80 flex items-start"
                >
                  <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  {school}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <VancouverAboutSection />
      <VancouverWhyChooseSection />
      <VancouverExploreSubjectsSection />
      <VancouverFlexibleProgramsSection />
      <TrustedBrands />
      <Reviews />
      <VancouverCTABanner />
      <VancouverFAQSection faqs={faqs} />
    </div>
  );
}
