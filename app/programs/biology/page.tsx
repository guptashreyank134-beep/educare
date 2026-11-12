/** @format */

import React from "react";
import Link from "next/link";
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
import RelatedTutoringPages from "@/components/RelatedTutoringPages";
import RichBody from "@/components/RichBody";
import { ProgramOverview, ProgramInfoCard, ProgramBulletList, ProgramApproach } from "@/components/ProgramOverview";

const ENQUIRY_ANCHOR = programAnchor("biology");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["biology"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "biology");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/biology");
}

export default async function BiologyProgramPage() {
  const data = await getMetaDataBySlug("programPage", "biology");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("biology");
  const bodyContent = await getProgramBodyContent("biology");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Biology" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/biology")} />
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
              Biology Tutoring in Burnaby & Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                University biology becomes challenging when students rely solely
                on memorization. We help students understand biological systems,
                relationships, and scientific reasoning to master the subject
                effectively.
              </p>
              <p>
                Whether you&apos;re preparing for nursing school, pre-med, or a
                biology major, our tutors provide the conceptual clarity and lab
                support needed to excel in your coursework and exams.
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
                    "Cell Biology",
                    "Molecular Biology",
                    "Genetics",
                    "Anatomy & Physiology",
                    "Ecology",
                    "Biotechnology",
                    "Research Concepts",
                    "Lab Support",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={FileText} title="Who Is This For">
                <ProgramBulletList
                  items={[
                    "Biology majors",
                    "Pre-med students",
                    "Nursing students",
                    "Healthcare students",
                    "Students preparing for exams/labs",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={LayoutGrid} title="Program Format">
                <ProgramBulletList
                  items={[
                    "One-on-One Tutoring",
                    "Online Tutoring",
                    "In-Person Tutoring",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Sparkles} title="Expected Outcomes">
                <ProgramBulletList
                  items={[
                    "Better understanding of biological systems",
                    "Improved retention of complex concepts",
                    "Higher grades and exam performance",
                    "Greater confidence in theory-heavy subjects",
                    "Stronger academic consistency",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Rocket} title="Our Approach" wide>
                <ProgramApproach
                  items={[
                    {
                      title: "Concept-Based Learning",
                      desc: "Focus on understanding rather than memorization. We teach you to see the bigger picture and connect different biological concepts.",
                    },
                    {
                      title: "System-Level Thinking",
                      desc: "Learn how biological systems interact. This approach helps in mastering complex topics like human physiology and ecology.",
                    },
                    {
                      title: "Lab Preparation",
                      desc: "Support for assignments and practicals. We help you understand the 'why' behind experiments and how to write effective reports.",
                    },
                    {
                      title: "Exam Preparation",
                      desc: "Targeted revision plans. We focus on high-yield topics and test-taking strategies to boost your performance.",
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

          <div className="flex justify-center">
            {/* University Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group max-w-xl w-full">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                College & University Biology
              </h3>
              <ul className="space-y-2">
                {[
                  "General Biology",
                  "Molecular Biology",
                  "Anatomy and Physiology",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[16px] font-montserrat text-slate"
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
      <RichBody value={bodyContent} />
      <RelatedTutoringPages pillar="/programs/biology" programSlug="biology" />

      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="Biology"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[{ label: "Biology 12 tutoring in Burnaby", href: "/biology-12-tutor-burnaby" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
