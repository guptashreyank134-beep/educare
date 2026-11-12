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
import UniversityCourseTable from "@/components/UniversityCourseTable";

const ENQUIRY_ANCHOR = programAnchor("university-chemistry");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["university-chemistry"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "university-chemistry");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/university-chemistry");
}

export default async function UniversityChemistryPage() {
  const data = await getMetaDataBySlug("programPage", "university-chemistry");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("university-chemistry");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "University Courses", href: "/programs" },
    { label: "Chemistry" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/university-chemistry")} />
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
              University Chemistry
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                University chemistry requires students to understand theory
                while solving numerical problems and completing lab work. Master
                difficult chemistry concepts with structured support for
                coursework, labs, and exams.
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
                    "Organic Chemistry",
                    "Inorganic Chemistry",
                    "Physical Chemistry",
                    "General Chemistry",
                    "Stoichiometry",
                    "Chemical Equilibrium",
                    "Reaction Kinetics",
                    "Lab Report Support",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={FileText} title="Who Is This For">
                <ProgramBulletList
                  items={[
                    "High school students preparing for Chemistry 11 & 12",
                    "College and university students taking advanced chemistry courses",
                    "Students struggling with theory-heavy topics",
                    "Learners needing help with labs and assignments",
                    "Students preparing for exams and improving grades",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={LayoutGrid} title="Program Format">
                <ProgramBulletList
                  items={[
                    "One-on-One Tutoring",
                    "Lab Support",
                    "Assignment Help",
                    "Exam Prep Sessions",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Sparkles} title="Expected Outcomes">
                <ProgramBulletList
                  items={[
                    "Better understanding of chemistry concepts",
                    "Improved grades and exam performance",
                    "Stronger lab confidence",
                    "Faster and more accurate problem-solving",
                    "Greater confidence in coursework and assignments",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Rocket} title="Our Approach" wide>
                <ProgramApproach
                  items={[
                    {
                      title: "Simplified Concept Learning",
                      desc: "Break complex topics into manageable lessons.",
                    },
                    {
                      title: "Quantitative Problem Solving",
                      desc: "Master formulas and calculations.",
                    },
                    {
                      title: "Lab Support",
                      desc: "Help with reports and interpretations.",
                    },
                    {
                      title: "Exam Preparation",
                      desc: "Structured revision support.",
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
                <UniversityCourseTable subject={"Chemistry"} />
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="University Chemistry"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
