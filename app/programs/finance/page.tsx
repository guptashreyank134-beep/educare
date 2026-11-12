/** @format */

import React from "react";
import { ProgramOverview, ProgramInfoCard, ProgramBulletList, ProgramApproach } from "@/components/ProgramOverview";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  Layers,
  FileText,
  LayoutGrid,
  Sparkles,
  Rocket,
} from "lucide-react";

import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema, getFAQSchema } from "@/components/SchemaMarkup";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import ProgramNextSteps from "@/components/ProgramNextSteps";
import CourseConsultationPanel from "@/components/CourseConsultationPanel";
import {
  ConsultationCtaLink,
  StickyConsultationBar,
} from "@/components/ConsultationCta";
import { PROGRAM_ENQUIRY, programAnchor } from "@/content/program-enquiry";
import { PRICING_TEXT } from "@/data/pricing";
import { getProgramFaqs } from "@/sanity/lib/faqs";

const ENQUIRY_ANCHOR = programAnchor("finance");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["finance"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "finance");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/finance", {
    title: "Finance Tutor in Burnaby & Vancouver | Accounting & CFA Help",
    description:
      "Expert finance and accounting tutoring in Burnaby & Vancouver — high school, university and professional (CFA, CSC) support. Book a free consultation today.",
  });
}

export default async function FinanceProgramPage() {
  const data = await getMetaDataBySlug("programPage", "finance");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("finance");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Finance" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/finance")} />
      <main className="relative min-h-screen bg-bg-grey overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute h-[1568px] inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/bigYellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-12 lg:pb-16 relative z-10">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 mt-10 items-start">
          {/* Left Column: Content */}
          <div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
              Finance Tutoring in Burnaby & Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Finance requires more than understanding formulas and theories;
                it demands analytical thinking, practical application, and
                strategic decision-making.
              </p>
              <p>
                At Dr. Shreyank Educare, we help students and professionals
                master complex financial concepts through structured coaching,
                personalized mentorship, and industry-relevant learning. Whether
                you're pursuing university coursework or preparing for
                professional certifications, our programs are built to help you
                succeed.
              </p>
            </div>

            {/* Consultation offer. The description and the response time are the
                same ones published on /book and /contact. */}
            <div className="mb-8 rounded-[16px] border border-[#F1F5F9] bg-white/80 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <ConsultationCtaLink
                  targetId={ENQUIRY_ANCHOR}
                  formId={FORM_ID}
                  className="inline-flex shrink-0 items-center justify-center rounded-[8px] bg-primary px-5 py-3 text-[16px] font-montserrat font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Book a Free 30-Minute Consultation
                </ConsultationCtaLink>
                <p className="text-[15px] font-montserrat leading-relaxed text-slate/80">
                  One free, no-obligation 30-minute conversation: tell us which course
                  the student is taking and where they are stuck, and we map out the
                  level, tutor and schedule that would help. We reply within 24 hours on
                  business days.
                </p>
              </div>
              <p className="mt-4 text-[14px] font-montserrat text-slate/70">
                One-to-one sessions are {PRICING_TEXT.oneOnOne}, varying by subject
                level — we confirm the rate for the course at the consultation. See{" "}
                <Link href="/pricing" className="text-primary underline underline-offset-2">
                  full pricing
                </Link>
                .
              </p>
            </div>

            <ProgramOverview>
              <ProgramInfoCard icon={Layers} title="What We Cover">
                <ProgramBulletList
                  items={[
                    "Corporate Finance",
                    "Investment Management",
                    "Financial Accounting",
                    "Financial Markets",
                    "Portfolio Management",
                    "Risk Management",
                    "FinTech",
                    "Asset Pricing",
                    "Derivatives & Fixed Income",
                    "Financial Analytics",
                    "Wealth Planning & Ethics",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={FileText} title="Who Is This For">
                <ProgramBulletList
                  items={[
                    "B.Com students",
                    "MBA students",
                    "MSc and PhD finance students",
                    "CFA aspirants (Levels I, II & III)",
                    "CSC certification students",
                    "IFC certification students",
                    "Professionals looking to upskill in finance",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={LayoutGrid} title="Program Format">
                <ProgramBulletList
                  items={[
                    "One-on-One Tutoring: Personalized academic support",
                    "Certification Coaching: Flexible sessions from anywhere",
                    "Online Learning: Structured preparation for finance certifications",
                    "Assignment & Exam Support: Help with coursework, projects, and assessments",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Sparkles} title="Expected Outcomes">
                <ProgramBulletList
                  items={[
                    "Improved academic performance",
                    "Better understanding of financial concepts",
                    "Stronger analytical and decision-making skills",
                    "Stronger preparation for certification exams",
                    "Greater career readiness in finance",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Rocket} title="Our Approach" wide>
                <ProgramApproach
                  items={[
                    {
                      title: "Strengthening Core Financial Concepts",
                      desc: "We simplify complex theories and financial models to help students build stronger academic foundations.",
                    },
                    {
                      title: "Applying Real-World Financial Knowledge",
                      desc: "Students learn how finance concepts work in practical business and investment environments.",
                    },
                    {
                      title: "Certification-Focused Preparation",
                      desc: "We provide structured preparation for CFA, CSC, and IFC certifications with exam-focused guidance.",
                    },
                    {
                      title: "Personalized Mentorship",
                      desc: "Every student receives support tailored to their academic goals, career aspirations, and learning pace.",
                    },
                  ]}
                />
              </ProgramInfoCard>
            </ProgramOverview>
          </div>

          <CourseConsultationPanel
            wide
            subject={ENQUIRY.subject}
            anchor={ENQUIRY_ANCHOR}
            courseExample={ENQUIRY.courseExample}
            courseLabel={ENQUIRY.courseLabel}
            testimonialTopic={ENQUIRY.testimonialTopic}
            heading={ENQUIRY.heading}
            showCredential={ENQUIRY.taughtByFounder}
          />
        </div>

        {/* Bottom Section: Courses We Support */}
        <section className="mt-12 lg:mt-16">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
              Courses We Support
            </h2>
            <p className="text-[18px] font-montserrat text-slate/60">
              Coverage Across School and University Curriculum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* B. Com Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                B. Com Programs
              </h3>
              <ul className="space-y-2">
                {[
                  "Financial Accounting",
                  "Managerial Accounting",
                  "Corporate Finance",
                  "Investment Theory",
                  "Financial Markets",
                  "Risk Management",
                  "FinTech",
                  "Venture Capital",
                  "Mergers & Acquisitions",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* MBA Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                MBA Programs
              </h3>
              <ul className="space-y-2">
                {[
                  "Corporate Finance",
                  "Banking & Capital Markets",
                  "FinTech",
                  "Investment Management",
                  "Financial Management",
                  "Venture Capital",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Certifications Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Professional Certifications
              </h3>
              <p className="text-[14px] font-montserrat font-medium text-slate/60 mb-2">
                CFA Levels I, II & III
              </p>
              <ul className="space-y-2">
                {[
                  "Ethics",
                  "Economics",
                  "Portfolio Management",
                  "Equity Investments",
                  "Derivatives",
                  "Fixed Income",
                  "Alternative Investments",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* MSc & PhD Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                MSc & PhD Finance Programs
              </h3>
              <ul className="space-y-2">
                {[
                  "Theory of Finance",
                  "Corporate Finance",
                  "Asset Pricing",
                  "Financial Research",
                  "Financial Analytics",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* CSC Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                CSC Certification
              </h3>
              <ul className="space-y-2">
                {[
                  "Market Structures",
                  "Investment Products",
                  "Portfolio Management",
                  "Regulatory Framework",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* IFC Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                IFC Certification
              </h3>
              <ul className="space-y-2">
                {[
                  "Mutual Funds",
                  "Client Profiling",
                  "Regulatory Compliance",
                  "Investment Product Knowledge",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="Finance"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[{ label: "University & professional tutoring", href: "/university-professional" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
