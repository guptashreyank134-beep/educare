import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import TrialClassForm from "@/components/TrialClassForm";
import VancouverHeroImage from "@/components/VancouverHeroImage";
import VancouverAboutSection from "@/components/VancouverAboutSection";
import VancouverWhyChooseSection from "@/components/VancouverWhyChooseSection";
import VancouverExploreSubjectsSection from "@/components/VancouverExploreSubjectsSection";
import VancouverFlexibleProgramsSection from "@/components/VancouverFlexibleProgramsSection";
import VancouverLocationsSection from "@/components/VancouverLocationsSection";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import ExtraRelatedLinks from "@/components/ExtraRelatedLinks";
import VancouverCTABanner from "@/components/VancouverCTABanner";
import TrustedBrands from "@/components/TrustedBrands";
import Reviews from "@/components/Reviews";
import { getPageData, getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";

export async function generateMetadata() {
  // SEO metadata lives on the "home" page document — the same place every other
  // page reads it from (Studio > Pages > Home). It previously read from
  // vancouverPage, which has no metaData, so edits in Studio never showed up.
  const data = await getMetaDataBySlug("page", "home");
  return getMetadata(data, "https://www.drshreyankeducare.com/", {
    title: "Math & Science Tutoring in Burnaby & Vancouver | Dr. Shreyank",
    description:
      "PhD-led tutoring in Burnaby and Vancouver for Math, Physics, Chemistry and Coding. Grades 6–12 and university. Book a free 30-minute consultation.",
  });
}

const metrics = [
  { value: "Led By", label: "Dr. Shreyank Gupta" },
  { value: "10+ Years", label: "of teaching experience!" },
  { value: "Rated 5.0", label: "on Google by parents & students" },
];

export default async function Home() {
  const data = await getPageData("vancouverPage");

  return (
    <div className="min-h-screen bg-white font-montserrat relative overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Left Column: Content & Images */}
          <div className="flex flex-col">
            {/* "Best" was an unsupportable superlative; "PhD-Led" states a fact
                we can stand behind and still leads with the subjects + locations. */}
            <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bricolage font-medium text-slate leading-[1.2] mb-6">
              PhD-Led Math, Physics, Chemistry &amp; Coding Tutoring in Burnaby
              and Vancouver
            </h1>
            <p className="text-[#64748B] text-[16px] leading-relaxed max-w-[500px] mb-4">
              Personalized tutoring that helps students build confidence, master
              difficult concepts, and improve grades through clear, step-by-step
              teaching.
            </p>
            <p className="text-[#64748B] text-[15px] leading-relaxed max-w-[520px] mb-8">
              Popular:{" "}
              <Link href="/math-tutor-burnaby" className="text-primary underline decoration-yellow-light decoration-2 underline-offset-2 hover:text-primary/80">
                math tutoring in Burnaby
              </Link>
              . New to tutoring? Read our guide on{" "}
              <Link href="/guides/how-to-choose-a-tutor-burnaby-vancouver" className="text-primary underline decoration-yellow-light decoration-2 underline-offset-2 hover:text-primary/80">
                how to choose a tutor in Burnaby &amp; Vancouver
              </Link>
              .
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/book">
                <Button iconRight={ArrowRight}>Book a Free 30-Minute Consultation</Button>
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
                Chat on WhatsApp
              </a>
            </div>

            {/* Hero Image Component */}
            <VancouverHeroImage />
          </div>

          {/* Right Column: Lead Form */}
          <div className="relative mt-12 lg:mt-0">
            {/* Decorative glow behind form */}
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
              ⓘ No obligation — we'll suggest a plan that fits your child.
            </p>
          </div>
        </div>

        {/* Bottom Badges Section */}
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

      <VancouverAboutSection />
      <VancouverWhyChooseSection />
      <VancouverExploreSubjectsSection />
      <VancouverFlexibleProgramsSection />
      <VancouverLocationsSection />

      {/* University & Professional / Medical — advanced tutoring verticals */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-[28px] sm:text-[36px] font-bricolage font-medium text-slate mb-3">
            Beyond School: University, Professional &amp; Medical Tutoring
          </h2>
          <p className="text-[16px] font-montserrat text-slate/80 max-w-2xl mx-auto">
            We also support university students and professionals worldwide with
            advanced, expert-led online tutoring.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/university-professional"
            className="group flex items-center justify-between bg-white rounded-2xl p-8 border border-[#F1F5F9] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <div>
              <p className="text-[22px] font-bricolage font-medium text-slate mb-1">
                University &amp; Professional
              </p>
              <p className="text-[15px] font-montserrat text-slate/70">
                Economics, Statistics, Actuarial Science &amp; R — UK, USA &amp; worldwide
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate/40 group-hover:text-primary transition-colors shrink-0 ml-4" />
          </Link>
          <Link
            href="/online-medical-tutoring"
            className="group flex items-center justify-between bg-white rounded-2xl p-8 border border-[#F1F5F9] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <div>
              <p className="text-[22px] font-bricolage font-medium text-slate mb-1">
                Medical Tutoring
              </p>
              <p className="text-[15px] font-montserrat text-slate/70">
                MD-led online tutoring for USA &amp; Caribbean medical students
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate/40 group-hover:text-primary transition-colors shrink-0 ml-4" />
          </Link>
        </div>
      </section>

      <TrustedBrands />
      <Reviews />
      <VancouverCTABanner />
      <VancouverFAQSection faqs={data?.faqs} />
      <ExtraRelatedLinks links={data?.relatedLinks} />
    </div>
  );
}

export const revalidate = 3600;
