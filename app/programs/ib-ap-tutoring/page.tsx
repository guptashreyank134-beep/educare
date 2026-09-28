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
  Award,
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
import type { Metadata } from "next";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";
import RichBody from "@/components/RichBody";

const ENQUIRY_ANCHOR = programAnchor("ib-ap-tutoring");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["ib-ap-tutoring"];

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getMetaDataBySlug("programPage", "ib-ap-tutoring");
    return getMetadata(data, "https://www.drshreyankeducare.com/programs/ib-ap-tutoring");
  } catch {
    return {
      title: "IB & AP Tutoring | Dr. Shreyank Educare",
      description:
        "Specialized IB and AP tutoring for high-achieving students. Expert support for IB Math, Physics, Chemistry, Biology, and AP courses to help you achieve top scores.",
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

export default async function IBAPTutoringPage() {
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("ib-ap-tutoring");
  const bodyContent = await getProgramBodyContent("ib-ap-tutoring");
  let data;
  try {
    data = await getMetaDataBySlug("programPage", "ib-ap-tutoring");
  } catch {}

  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Exam Prep", href: "/programs" },
    { label: "IB & AP Tutoring" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/ib-ap-tutoring")} />
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
                <Award size={18} className="text-primary" />
                <span className="text-[14px] font-montserrat text-primary font-medium uppercase tracking-wide">
                  Advanced Academic Programs
                </span>
              </div>

              <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
                IB & AP Tutoring in Vancouver
              </h1>

              <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
                <p>
                  The International Baccalaureate (IB) and Advanced Placement
                  (AP) programs are among the most rigorous and rewarding
                  academic pathways available to high school students. But their
                  depth and pace can be overwhelming without the right support.
                </p>
                <p>
                  At Dr. Shreyank Educare, our tutors have expert knowledge of
                  IB and AP syllabi — from internal assessments and extended
                  essays to AP free-response questions. We help students not
                  only survive these programs, but excel in them and earn the
                  top scores needed for university credit.
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
                    "IB Mathematics: Analysis & Approaches (SL & HL)",
                    "IB Mathematics: Applications & Interpretation (SL & HL)",
                    "IB Physics SL & HL",
                    "IB Chemistry SL & HL",
                    "IB Biology SL & HL",
                    "AP Calculus AB & BC",
                    "AP Physics 1, 2 & C",
                    "AP Chemistry & AP Biology",
                    "AP Statistics",
                  ]}
                />

                <SectionHeader icon={FileText} title="Who Is This For" />
                <ListItems
                  items={[
                    "IB Diploma Programme (DP) students in Years 1 & 2",
                    "Students enrolled in AP courses seeking higher scores",
                    "Learners struggling with IB Internal Assessments (IAs)",
                    "Students aiming for 6s and 7s on IB exams",
                    "AP students targeting a 4 or 5 on their exams",
                    "Students applying to competitive universities",
                  ]}
                />

                <SectionHeader icon={LayoutGrid} title="Program Format" />
                <ListItems
                  items={[
                    "One-on-One Specialized Tutoring (online)",
                    "IA & Extended Essay (EE) Guidance",
                    "Past Paper Practice & Timed Exams",
                    "AP Free-Response Question Coaching",
                    "Flexible scheduling around IB/AP deadlines",
                  ]}
                />

                <SectionHeader icon={Sparkles} title="Expected Outcomes" />
                <ListItems
                  items={[
                    "Higher IB subject scores (targeting 6 & 7)",
                    "Stronger AP exam scores (targeting 4 & 5)",
                    "Confident Internal Assessment completion",
                    "Better time management across heavy IB/AP workloads",
                    "University credit and advanced standing",
                  ]}
                />

                <SectionHeader icon={Rocket} title="Our Approach" />
                <div className="ml-11 space-y-4">
                  {[
                    {
                      title: "Syllabus-Specific Expertise",
                      desc: "Our tutors know the IB and AP syllabi in detail — including command terms, mark schemes, and assessment criteria — so students are always practising in exactly the right way.",
                    },
                    {
                      title: "Internal Assessment Support",
                      desc: "IB IAs can be daunting. We guide students through topic selection, methodology, data analysis, and report writing to understand the assessment criteria and improve their own reasoning, analysis and communication.",
                    },
                    {
                      title: "Past Paper Mastery",
                      desc: "We use official past papers from IB and College Board to simulate real exam conditions, helping students build speed, accuracy, and exam confidence.",
                    },
                    {
                      title: "Depth Over Surface Coverage",
                      desc: "IB and AP reward genuine understanding. We go deep into concepts rather than teaching to the test, ensuring students can handle any question the exam throws at them.",
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
                Programs We Support
              </h2>
              <p className="text-[18px] font-montserrat text-slate/60">
                IB Diploma & AP Courses — Expert-Level Tutoring
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  IB Diploma Programme
                </h3>
                <ul className="space-y-2">
                  {[
                    "IB Math AA & AI (SL & HL)",
                    "IB Physics SL & HL",
                    "IB Chemistry SL & HL",
                    "IB Biology SL & HL",
                    "Internal Assessments (IA)",
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  Advanced Placement (AP)
                </h3>
                <ul className="space-y-2">
                  {[
                    "AP Calculus AB & BC",
                    "AP Physics 1, 2 & C",
                    "AP Chemistry",
                    "AP Biology",
                    "AP Statistics",
                  ].map((c) => (
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
      <RichBody value={bodyContent} />
      <RelatedTutoringPages pillar="/programs/ib-ap-tutoring" programSlug="ib-ap-tutoring" />

      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="IB & AP"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[{ label: "IB Math tutoring in Vancouver", href: "/ib-math-tutor-vancouver" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
