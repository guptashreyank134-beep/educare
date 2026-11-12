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

const ENQUIRY_ANCHOR = programAnchor("javascript");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["javascript"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "javascript");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/javascript");
}

export default async function JavaScriptProgramPage() {
  const data = await getMetaDataBySlug("programPage", "javascript");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("javascript");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Code & Tech", href: "/programs" },
    { label: "JavaScript" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/javascript")} />
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
              JavaScript Programming
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Coding helps students build logical thinking, creativity, and
                problem-solving skills that extend far beyond the classroom.
                Whether your child is exploring programming for the first time
                or looking to advance their technical skills, our JavaScript
                programs create a strong foundation through hands-on learning.
              </p>
              <p>
                At Dr. Shreyank Educare, students learn by building projects,
                experimenting with code, and understanding how programming works
                in real-world applications like websites, games, and software
                systems.
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
                    "Variables and Data Types",
                    "Functions and Logic Building",
                    "Loops and Conditionals",
                    "Object-Oriented Programming",
                    "DOM Manipulation",
                    "Web Interactivity",
                    "Debugging Techniques",
                    "Project Development Fundamentals",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={FileText} title="Who Is This For">
                <ProgramBulletList
                  items={[
                    "Kids interested in coding and technology",
                    "Beginners exploring programming for the first time",
                    "Students interested in game development",
                    "Learners curious about web development",
                    "Students building future-ready digital skills",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={LayoutGrid} title="Program Format">
                <ProgramBulletList
                  items={[
                    "One-on-one sessions for personalized guidance",
                    "Small group classes for collaborative learning",
                    "Interactive sessions focused on practical coding",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Sparkles} title="Expected Outcomes">
                <ProgramBulletList
                  items={[
                    "Strong coding fundamentals",
                    "Better logical thinking skills",
                    "Real project-building experience",
                    "Improved creativity and confidence",
                    "Early exposure to future career skills",
                  ]}
                />
              </ProgramInfoCard>

              <ProgramInfoCard icon={Rocket} title="Our Approach" wide>
                <ProgramApproach
                  items={[
                    {
                      title: "Hands-On Project Learning",
                      desc: "Students learn coding by creating real projects that make learning exciting and practical.",
                    },
                    {
                      title: "Building Strong Logic Skills",
                      desc: "We focus on problem-solving, sequencing, and analytical thinking that supports long-term programming growth.",
                    },
                    {
                      title: "Encouraging Creativity",
                      desc: "From games to interactive websites, students build projects that make coding fun and engaging.",
                    },
                    {
                      title: "Step-by-Step Learning",
                      desc: "Our curriculum gradually progresses from beginner concepts to advanced projects.",
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

        {/* Bottom Section: Program Structure */}
        <section className="mt-12 lg:mt-16">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
              Program Structure
            </h2>
            <p className="text-[18px] font-montserrat text-slate/60">
              Progressive Learning Through Levels and Projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level 1 */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Level 1: Beginner Programming
              </h3>
              <ul className="space-y-4">
                {[
                  "Mini Project: Number Guessing Game / Simple Calculator",
                  "Students learn coding basics including variables, conditions, and basic logic.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Level 2 */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Level 2: Intermediate Programming
              </h3>
              <ul className="space-y-4">
                {[
                  "Mini Project: To-Do List App / Interactive Quiz Game",
                  "Students begin working with functions, DOM interaction, and structured programming concepts.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Level 3 */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Level 3: Advanced Programming
              </h3>
              <ul className="space-y-4">
                {[
                  "Capstone Project: Student Management System / Interactive Web Application",
                  "Students build larger projects while learning advanced problem-solving and development concepts.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {item}
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
          subject="JavaScript"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[{ label: "Computer Science Tutoring in Vancouver", href: "/computer-science-tutor-vancouver" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
