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
import type { Metadata } from "next";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";
import RichBody from "@/components/RichBody";

const ENQUIRY_ANCHOR = programAnchor("pre-calculus");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["pre-calculus"];

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getMetaDataBySlug("programPage", "pre-calculus");
    return getMetadata(data, "https://www.drshreyankeducare.com/programs/pre-calculus");
  } catch {
    return {
      title: "Pre-Calculus 11 & 12 Tutoring | Dr. Shreyank Educare",
      description:
        "Expert Pre-Calculus 11 and 12 tutoring. Master transformations, polynomial and rational functions, exponentials, logarithms, trigonometry and sequences — aligned to the BC curriculum.",
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

export default async function PreCalculusProgramPage() {
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("pre-calculus");
  const bodyContent = await getProgramBodyContent("pre-calculus");
  let data;
  try {
    data = await getMetaDataBySlug("programPage", "pre-calculus");
  } catch {}

  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Pre-Calculus 11/12" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/pre-calculus")} />
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
              <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
                Pre-Calculus 11 & 12 Tutoring
              </h1>

              <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
                <p>
                  Pre-Calculus is one of the most challenging — and most
                  important — math courses in the BC high school curriculum.
                  Strong performance in Pre-Calculus 11 and 12 directly impacts
                  university entrance and the ability to handle first-year
                  university mathematics.
                </p>
                <p>
                  At Dr. Shreyank Educare, our tutors specialize in breaking
                  down the complex topics of Pre-Calculus into clear,
                  manageable steps — from quadratics and trigonometry to
                  rational functions and series — so students can approach
                  exams with confidence.
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
                <SectionHeader icon={Layers} title="What We Cover" />
                <ListItems
                  items={[
                    "Quadratic Functions & Equations",
                    "Polynomial Functions & Rational Expressions",
                    "Trigonometry (Unit Circle, Identities, Equations)",
                    "Exponential & Logarithmic Functions",
                    "Sequences, Series & Binomial Theorem",
                    "Permutations, Combinations & Probability",
                    "Limits & Derivatives — optional Calculus 12 bridge",
                  ]}
                />

                <SectionHeader icon={FileText} title="Who Is This For" />
                <ListItems
                  items={[
                    "Students enrolled in Pre-Calculus 11 or 12",
                    "Students who struggled with Foundations of Math 10",
                    "Learners preparing for school tests, final exams and BC curriculum-aligned coursework",
                    "Students aiming for science, engineering, or business programs",
                    "Anyone wanting a strong head start on university math",
                  ]}
                />

                <SectionHeader icon={LayoutGrid} title="Program Format" />
                <ListItems
                  items={[
                    "One-on-One Tutoring (online)",
                    "Chapter-by-chapter review sessions",
                    "Practice problem sets & worked solutions",
                    "School test, unit assessment and final exam preparation",
                    "Flexible scheduling — evenings & weekends",
                  ]}
                />

                <SectionHeader icon={Sparkles} title="Expected Outcomes" />
                <ListItems
                  items={[
                    "Higher grades in Pre-Calculus 11 & 12",
                    "Stronger performance on school tests and final examinations",
                    "Readiness for university-level calculus",
                    "Confident approach to multi-step problems",
                    "Clear understanding of all key unit concepts",
                  ]}
                />

                <SectionHeader icon={Rocket} title="Our Approach" />
                <div className="ml-11 space-y-4">
                  {[
                    {
                      title: "Unit-by-Unit Mastery",
                      desc: "We work through each unit systematically — ensuring no concept is left unclear before moving forward. Every topic is revisited until the student is fully confident.",
                    },
                    {
                      title: "Exam-Focused Practice",
                      desc: "We use BC curriculum-aligned practice problems and past exam questions to ensure students know exactly what to expect on test day.",
                    },
                    {
                      title: "Bridging the Gap to Calculus",
                      desc: "For students heading to university, we place special emphasis on concepts like limits and function analysis that form the foundation of first-year calculus.",
                    },
                    {
                      title: "Flexible and Responsive Sessions",
                      desc: "Every student progresses at their own pace. Sessions adapt week to week based on what the student is currently studying in class.",
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
              heading={ENQUIRY.heading}
              showCredential={ENQUIRY.taughtByFounder}
            />
          </div>

          {/* Courses We Support */}
          <section className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
                Courses We Support
              </h2>
              <p className="text-[18px] font-montserrat text-slate/60">
                BC Curriculum — Grades 11 & 12
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  Pre-Calculus 11
                </h3>
                <ul className="space-y-2">
                  {[
                    "Quadratic Functions",
                    "Radical Expressions & Equations",
                    "Rational Expressions",
                    "Trigonometry",
                    "Sequences & Series",
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  Pre-Calculus 12
                </h3>
                <ul className="space-y-2">
                  {[
                    "Function Transformations",
                    "Exponential & Logarithms",
                    "Trigonometric Functions & Identities",
                    "Polynomial Functions",
                    "Permutations, Combinations & Binomial Theorem",
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
      <RelatedTutoringPages pillar="/programs/pre-calculus" programSlug="pre-calculus" />

      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="Pre-Calculus"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[{ label: "Pre-Calculus 12 tutoring in Burnaby", href: "/pre-calculus-12-tutor-burnaby" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
