import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppointmentBookingLink } from "@/components/TrialClassForm";
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
import { BUSINESS } from "@/data/businessInfo";
import StudyClubPromo from "@/components/StudyClubPromo";

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
    <main className="min-h-screen bg-white font-montserrat relative overflow-hidden">
      <section data-home-hero aria-labelledby="home-heading" className="relative">
      {/* Yellow Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 sm:pt-16 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-x-8 gap-y-6 lg:gap-x-12 lg:gap-y-4 items-start">
          <div data-home-introduction className="min-w-0 lg:col-start-1 lg:row-start-1">
            {/* "Best" was an unsupportable superlative; "PhD-Led" states a fact
                we can stand behind and still leads with the subjects + locations. */}
            <h1 id="home-heading" className="text-[32px] sm:text-[40px] lg:text-[44px] font-bricolage font-medium text-slate leading-[1.2] mb-5">
              PhD-Led Math, Physics, Chemistry &amp; Coding Tutoring in Burnaby
              and Vancouver
            </h1>
            <p className="text-[#64748B] text-[16px] leading-relaxed">
              Personalized tutoring that helps students build confidence, master
              difficult concepts, and improve grades through clear, step-by-step
              teaching.
            </p>
          </div>

          <section
            data-home-booking
            data-enquiry-form="page"
            aria-labelledby="home-booking-heading"
            className="min-w-0 rounded-xl border-l-4 border-primary bg-[#F5F7FC] p-5 sm:p-6 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:rounded-none lg:bg-transparent lg:py-0 lg:pl-8"
          >
            <h2 id="home-booking-heading" className="font-bricolage text-[24px] font-medium leading-tight text-slate sm:text-[28px]">
              Your Free 30-Minute Consultation
            </h2>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-slate/80">
              Bring a question about your course or a topic you find difficult.
              We’ll discuss what to work on first and which tutoring options fit.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate/75">
              Choose an available time and complete the Calendly booking form to confirm your appointment.
            </p>
            <AppointmentBookingLink>Book a Free Consultation</AppointmentBookingLink>
            <p className="mt-4 text-[14px] leading-relaxed text-slate/75">
              Have a question first?{" "}
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#15803D] underline underline-offset-4 hover:text-[#166534] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Chat on WhatsApp
              </a>
            </p>
          </section>

          <div data-home-details className="min-w-0 lg:col-start-1 lg:row-start-2">
            <p className="text-[#64748B] text-[16px] leading-relaxed mb-4">
              Based in Burnaby, we offer in-person lessons at our tutoring centre
              and online support for Vancouver students. Lessons are matched to
              your school or university course, with guided practice and time to
              work through the concepts you find difficult.
            </p>
            <p className="text-[#64748B] text-[15px] leading-relaxed">
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
          </div>
        </div>

        {/* Booking precedes imagery on mobile; the image and trust facts share
            the space below the introduction on larger screens. */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-center">
          <div data-home-visual className="flex justify-center px-6 sm:px-8">
            <VancouverHeroImage />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#F1F5F9] flex flex-col items-center text-center"
              >
                <p className="text-[28px] font-bricolage font-medium text-[#44619B] leading-tight mb-1">
                  {metric.value}
                </p>
                <p className="text-[16px] font-montserrat font-normal text-[#64748B]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      </section>

      <StudyClubPromo />
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
    </main>
  );
}

export const revalidate = 3600;
