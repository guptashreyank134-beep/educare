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

const ENQUIRY_ANCHOR = programAnchor("gre-prep");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["gre-prep"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "gre-prep");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/gre-prep");
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

export default async function GrePrepProgramPage() {
  const data = await getMetaDataBySlug("programPage", "gre-prep");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("gre-prep");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Test Prep", href: "/programs" },
    { label: "GRE" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/gre-prep")} />
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
              GRE Prep & Coaching in Burnaby & Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Personalized GRE coaching focused on improving verbal,
                quantitative, and analytical writing performance.
              </p>
              <p>
                The GRE requires strategic preparation across verbal reasoning,
                math, and writing. Our structured coaching helps students
                improve efficiency and confidence.
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
                  "Quantitative Reasoning",
                  "Verbal Reasoning",
                  "Vocabulary Systems",
                  "Analytical Writing",
                  "Time Management",
                  "Mock Testing",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "Graduate school applicants",
                  "Students preparing for masters programs",
                  "International applicants",
                  "Students improving previous scores",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "Group Programs",
                  "Private Intensive Coaching",
                  "Mock Testing",
                  "Progress Analytics",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Target Score: 320-335+ GRE",
                  "Improved verbal and quant performance",
                  "Stronger essay writing score",
                  "Better graduate admissions opportunities",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Quant Efficiency Training",
                    desc: "Solve faster with smarter shortcuts.",
                  },
                  {
                    title: "Vocabulary Systems",
                    desc: "Learn retention-focused vocab methods.",
                  },
                  {
                    title: "Essay Feedback",
                    desc: "Receive writing reviews from instructors.",
                  },
                  {
                    title: "Practice Simulations",
                    desc: "Build familiarity and confidence.",
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

              <SectionHeader icon={FileText} title="Why Prepare With Dr. Shreyank Educare" />
              <div className="ml-11 space-y-4 text-[16px] leading-[24px] font-montserrat text-slate mb-8">
                <p>
                  A strong GRE score can open doors to competitive graduate and
                  PhD programs, and it rewards preparation that is precise rather
                  than generic. Our coaching pinpoints exactly where you lose marks
                  — quant pacing, vocabulary gaps, or analytical writing structure —
                  and rebuilds each area with proven, repeatable methods. You work
                  directly with experienced verbal and quantitative tutors who know
                  the exam inside out.
                </p>
                <p>
                  We begin with a full diagnostic and a week-by-week plan mapped to
                  your target score and test date, alternating focused concept work
                  with timed section practice and detailed review. For the
                  Analytical Writing tasks, you receive personalised feedback on
                  real essays, so your Issue and Argument responses become sharper
                  and better structured with each attempt.
                </p>
                <p>
                  Whether you are applying to graduate or doctoral programs, or
                  retaking the GRE to strengthen your application, we adapt the
                  intensity and format — online or in person in Burnaby —
                  to your goals and schedule, so you walk into the exam prepared and
                  confident.
                </p>
              </div>

              <SectionHeader icon={Sparkles} title="Planning Your GRE Preparation" />
              <div className="ml-11 space-y-5 mb-4">
                {[
                  {
                    q: "How long should I prepare for the GRE?",
                    a: "Most students prepare over 8–12 weeks, but we tailor the schedule to your target score and test date, including intensive options when time is short.",
                  },
                  {
                    q: "Do you help with the Analytical Writing (AWA) section?",
                    a: "Yes. You receive individual feedback on real Issue and Argument essays so your writing score improves steadily.",
                  },
                  {
                    q: "Are sessions online or in person?",
                    a: "Both. We offer flexible online sessions and in-person coaching in person in Burnaby.",
                  },
                  {
                    q: "Can you help me improve a previous GRE score?",
                    a: "Definitely. For retakers we run a diagnostic to identify the exact gaps limiting your score, then target them with a focused plan.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="text-[16px] font-montserrat text-slate">
                    <p className="font-medium mb-1">{item.q}</p>
                    <p className="font-normal opacity-90 leading-[24px]">{item.a}</p>
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
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="GRE"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
