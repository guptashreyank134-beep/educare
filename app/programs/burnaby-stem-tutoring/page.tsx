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
  MapPin,
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
import type { Metadata } from "next";

const ENQUIRY_ANCHOR = programAnchor("burnaby-stem-tutoring");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["burnaby-stem-tutoring"];

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getMetaDataBySlug("programPage", "burnaby-stem-tutoring");
    return getMetadata(data, "https://www.drshreyankeducare.com/programs/burnaby-stem-tutoring");
  } catch {
    return {
      title: "Burnaby STEM Tutoring | Dr. Shreyank Educare",
      description:
        "Expert STEM tutoring in Burnaby, BC. Covering Math, Physics, Chemistry, Biology, and Computer Science for high school and university students.",
    };
  }
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

export default async function BurnabySTEMTutoringPage() {
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("burnaby-stem-tutoring");
  let data;
  try {
    data = await getMetaDataBySlug("programPage", "burnaby-stem-tutoring");
  } catch {}

  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Local Programs", href: "/programs" },
    { label: "Burnaby STEM Tutoring" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/burnaby-stem-tutoring")} />
      <main className="relative min-h-screen bg-bg-grey overflow-hidden">
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
            {/* Left Column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-[14px] font-montserrat text-primary font-medium uppercase tracking-wide">
                  Serving Burnaby, BC
                </span>
              </div>

              <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
                Burnaby STEM Tutoring
              </h1>

              <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
                <p>
                  Dr. Shreyank Educare offers comprehensive STEM tutoring for
                  Burnaby students. From Mathematics and Physics to Chemistry,
                  Biology, and Computer Science, our expert tutors provide
                  structured, personalized support aligned with the BC curriculum.
                </p>
                <p>
                  Whether your child is at Simon Fraser University, a Burnaby high
                  school, or preparing for university entrance, we deliver the
                  focused academic support they need to succeed in STEM.
                </p>
              </div>

              {/* Consultation offer. The description and the response time are
                  the same ones published on /book and /contact. */}
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
                    One free, no-obligation 30-minute conversation: tell us which
                    course the student is taking and where they are stuck, and we map
                    out the level, tutor and schedule that would help. We reply within
                    24 hours on business days.
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
                <SectionHeader icon={Layers} title="Subjects We Cover" />
                <ListItems
                  items={[
                    "Mathematics (Grades 8–12 & University)",
                    "Physics 11 & 12 / University Physics",
                    "Chemistry 11 & 12 / University Chemistry",
                    "Biology 11 & 12 / University Biology",
                    "Computer Science & Programming",
                    "Statistics & Data Analysis",
                  ]}
                />

                <SectionHeader icon={FileText} title="Who Is This For" />
                <ListItems
                  items={[
                    "Burnaby high school students (Grades 8–12)",
                    "SFU and other university students",
                    "Students struggling with one or more STEM subjects",
                    "Learners preparing for final exams and unit assessments",
                    "Students aiming for post-secondary STEM programs",
                  ]}
                />

                <SectionHeader icon={LayoutGrid} title="Program Format" />
                <ListItems
                  items={[
                    "One-on-One Online Tutoring",
                    "Subject-Specific Deep Dives",
                    "Homework & Assignment Assistance",
                    "Flexible scheduling for busy students",
                  ]}
                />

                <SectionHeader icon={Sparkles} title="Expected Outcomes" />
                <ListItems
                  items={[
                    "Improved grades across all STEM subjects",
                    "Stronger problem-solving and analytical skills",
                    "Greater confidence in lab work and assignments",
                    "Better preparation for post-secondary programs",
                    "Reduced subject-specific anxiety",
                  ]}
                />

                <SectionHeader icon={Rocket} title="Our Approach" />
                <div className="ml-11 space-y-4">
                  {[
                    {
                      title: "Cross-Subject Connections",
                      desc: "STEM subjects interconnect. We help students see how math supports physics, and how chemistry relates to biology — building a richer, more cohesive understanding.",
                    },
                    {
                      title: "BC Curriculum Aligned",
                      desc: "Our tutors are familiar with Burnaby school curricula and university course structures, ensuring sessions are always relevant and practical.",
                    },
                    {
                      title: "Targeted Concept Reinforcement",
                      desc: "We identify the specific gaps holding each student back and address them systematically, so no weak area is left unresolved.",
                    },
                    {
                      title: "Exam & Assignment Focus",
                      desc: "Practical, outcome-focused sessions ensure students are prepared not just to understand material, but to perform well in assessments.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="text-[16px] font-montserrat leading-tight text-slate">
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

          {/* Courses We Support */}
          <section className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
                STEM Subjects We Support
              </h2>
              <p className="text-[18px] font-montserrat text-slate/60">
                Comprehensive Coverage for Burnaby & Metro Vancouver Students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  Math & Physics
                </h3>
                <ul className="space-y-2">
                  {["Pre-Calculus 11 & 12", "Calculus 12", "Physics 11 & 12", "University Physics"].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  Chemistry & Biology
                </h3>
                <ul className="space-y-2">
                  {["Chemistry 11 & 12", "University Chemistry", "Biology 11 & 12", "University Biology"].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  Computer Science
                </h3>
                <ul className="space-y-2">
                  {["Python", "JavaScript", "Data Structures", "SFU CMPT Courses"].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
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
          subject="STEM"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[{ label: "STEM tutoring in Vancouver", href: "/stem-tutor-vancouver" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
