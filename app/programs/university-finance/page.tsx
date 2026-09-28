/** @format */

import React from "react";
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

const ENQUIRY_ANCHOR = programAnchor("university-finance");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["university-finance"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "university-finance");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/university-finance");
}

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-[14px]">
    <div className="bg-yellow-light h-8 w-8 flex items-center justify-center rounded-lg text-slate shadow-sm">
      <Icon size={24} />
    </div>
    <h2 className="text-[22px] font-bricolage font-normal text-slate">
      {title}
    </h2>
  </div>
);

const ListItems = ({ items }: { items: string[] }) => (
  <ul className="space-y-1 mb-8 ml-11">
    {items.map((item, index) => (
      <li
        key={index}
        className="text-[16px] font-montserrat font-normal text-slate flex items-start"
      >
        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

export default async function UniversityFinancePage() {
  const data = await getMetaDataBySlug("programPage", "university-finance");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("university-finance");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "University Courses", href: "/programs" },
    { label: "Finance" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/university-finance")} />
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

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-[95px] relative z-10">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 mt-10 items-start">
          {/* Left Column: Content */}
          <div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
              University Finance Tutoring in Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Finance requires more than understanding formulas and theories—it
                demands analytical thinking, practical application, and
                strategic decision-making.
              </p>
              <p>
                At Dr. Shreyank Educare, we help students and professionals
                master complex financial concepts through structured coaching,
                personalized mentorship, and industry-relevant learning. Whether
                you&apos;re pursuing university coursework or preparing for
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

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
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

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
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

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring: Personalized academic support",
                  "Certification Coaching: Flexible sessions from anywhere",
                  "Online Learning: Structured preparation for finance certifications",
                  "Assignment & Exam Support: Help with coursework, projects, and assessments",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Improved academic performance",
                  "Better understanding of financial concepts",
                  "Stronger analytical and decision-making skills",
                  "Stronger preparation for certification exams",
                  "Greater career readiness in finance",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
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
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="text-[16px] font-montserrat leading-tight text-slate"
                  >
                    <div className="flex items-start gap-2">
                      <span className="shrink-0">·</span>
                      <div>
                        <p className="font-medium mb-0.5">{item.title}</p>
                        <p className="font-normal opacity-90">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <CourseConsultationPanel
            subject={ENQUIRY.subject}
            anchor={ENQUIRY_ANCHOR}
            courseExample={ENQUIRY.courseExample}
            courseLabel={ENQUIRY.courseLabel}
            testimonialTopic={ENQUIRY.testimonialTopic}
          />
        </div>

        {/* Bottom Section: Courses We Support */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
              Courses We Support
            </h2>
            <p className="text-[18px] font-montserrat text-slate/60">
              Coverage Across School and University Curriculum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* B.Com Card */}
            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* MBA Card */}
            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Card */}
            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Professional Certifications
              </h3>
              <ul className="space-y-2">
                <p className="text-[12px] font-bold text-slate/40 mb-2 uppercase tracking-wider">CFA Levels I, II & III</p>
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
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* MSc/PhD Card */}
            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* CSC Card */}
            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* IFC Card */}
            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
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
          subject="University Finance"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[{ label: "University & professional tutoring", href: "/university-professional" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
