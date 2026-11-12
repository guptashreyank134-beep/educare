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
import { getProgramFaqs, getProgramBodyContent } from "@/sanity/lib/faqs";
import UniversityCourseTable from "@/components/UniversityCourseTable";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";
import RichBody from "@/components/RichBody";

const ENQUIRY_ANCHOR = programAnchor("university-mathematics");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["university-mathematics"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "university-mathematics");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/university-mathematics");
}

export default async function UniversityMathematicsPage() {
  const data = await getMetaDataBySlug("programPage", "university-mathematics");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("university-mathematics");
  const bodyContent = await getProgramBodyContent("university-mathematics");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "University Courses", href: "/programs" },
    { label: "Mathematics" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/university-mathematics")} />
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
              University Mathematics
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                University mathematics can quickly become overwhelming when
                concepts become increasingly abstract and problem-heavy. From
                calculus and linear algebra to statistics and advanced
                mathematical modeling, students often struggle to keep pace with
                lectures and assignments.
              </p>
              <p>
                At Dr. Shreyank Educare, we simplify complex mathematical
                concepts through personalized instruction, step-by-step problem
                solving, and focused academic support.
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
                    "Calculus I & II",
                    "Linear Algebra",
                    "Differential Equations",
                    "Statistics",
                    "Probability",
                    "Mathematical Modeling",
                    "Applied Mathematics",
                    "Cryptography",
                    "Operations Research",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={FileText} title="Who Is This For">
                <ProgramBulletList
                  items={[
                    "Undergraduate math students",
                    "Engineering students",
                    "Business students taking statistics/math courses",
                    "Students struggling with advanced problem-solving",
                    "Students preparing for finals and major assessments",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={LayoutGrid} title="Program Format">
                <ProgramBulletList
                  items={[
                    "One-on-One Tutoring",
                    "Assignment Support",
                    "Exam Preparation",
                    "Weekly Concept Reinforcement Sessions",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Sparkles} title="Expected Outcomes">
                <ProgramBulletList
                  items={[
                    "Higher academic performance",
                    "Better problem-solving speed",
                    "Improved exam confidence",
                    "Stronger conceptual understanding",
                    "Better preparedness for advanced coursework",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Rocket} title="Our Approach" wide>
                <ProgramApproach
                  items={[
                    {
                      title: "Building Conceptual Clarity",
                      desc: "We simplify advanced formulas and theories into easy-to-understand concepts.",
                    },
                    {
                      title: "Step-by-Step Problem Solving",
                      desc: "Students learn how to solve complex mathematical questions with confidence.",
                    },
                    {
                      title: "Assignment & Exam Support",
                      desc: "Support for coursework, assignments, quizzes, and final exams.",
                    },
                    {
                      title: "Applied Learning Methods",
                      desc: "We help students understand how mathematics applies to real-world industries and careers.",
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
                <UniversityCourseTable subject={["Statistics", "Mathematics"]} />
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      <RichBody value={bodyContent} />
      <RelatedTutoringPages pillar="/programs/university-mathematics" programSlug="university-mathematics" />

      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="University Math"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[
            { label: "University math tutoring", href: "/university-math-tutor-vancouver" },
            { label: "Calculus 1 tutor online", href: "/calculus-1-tutor-online" },
            { label: "Calculus 2 tutor online", href: "/calculus-2-tutor-online" },
            { label: "Differential equations tutor", href: "/differential-equations-tutor-online-canada" },
          ]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
