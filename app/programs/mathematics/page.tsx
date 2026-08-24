/** @format */

import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  Layers,
  FileText,
  LayoutGrid,
  Sparkles,
  Rocket,
  Zap,
} from "lucide-react";

import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema, getFAQSchema } from "@/components/SchemaMarkup";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import ProgramNextSteps from "@/components/ProgramNextSteps";
import { getProgramFaqs } from "@/sanity/lib/faqs";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "mathematics");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/mathematics");
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

export default async function MathematicsProgramPage() {
  const data = await getMetaDataBySlug("programPage", "mathematics");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("mathematics");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Mathematics" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/mathematics")} />
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
              Mathematics Tutoring
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                At Dr. Shreyank Educare, we help students approach mathematics
                with clarity and confidence. Through personalized one-on-one
                sessions and small group learning, each student receives focused
                support tailored to their level, learning style, and academic
                goals.
              </p>
              <p>
                Our teaching approach emphasizes concept clarity, consistent
                practice, and structured guidance, helping students improve not
                just their grades, but their overall understanding of
                mathematics.
              </p>
            </div>

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
                items={[
                  "Algebra and Functions",
                  "Calculus (Limits, Derivatives, Integration)",
                  "Geometry and Trigonometry",
                  "Statistics and Data Interpretation",
                  "Problem-Solving Techniques",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "Middle and high school students (Grades 6-12)",
                  "Students preparing for exams and assessments",
                  "University students (including statistics and linear algebra)",
                  "Learners struggling with foundational concepts",
                  "Students aiming to improve performance and confidence",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring",
                  "Small Group Sessions",
                  "On-Demand Support",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Improved grades and exam performance",
                  "Strong conceptual understanding",
                  "Faster and more accurate problem-solving",
                  "Increased confidence in tackling complex questions",
                  "Better academic consistency over time",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Building Strong Fundamentals",
                    desc: "Mathematics is cumulative, and gaps in understanding can affect future learning. We identify weak areas early and strengthen core concepts to build a solid foundation.",
                  },
                  {
                    title: "Breaking Down Complex Problems",
                    desc: "Difficult questions are simplified into step-by-step methods, helping students approach them with clarity and confidence.",
                  },
                  {
                    title: "Making Learning Engaging and Structured",
                    desc: "Our sessions are designed to be interactive and supportive, encouraging students to ask questions, practice regularly, and stay motivated.",
                  },
                  {
                    title: "Focusing on Concept Clarity Over Memorization",
                    desc: "We prioritize understanding over rote learning, ensuring students can apply concepts effectively in exams and real-world situations.",
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

          {/* Right Column: Image and Visuals */}
          <div className="relative lg:pt-20 w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[378px] rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group transition-transform hover:rotate-0 duration-500">
              <Image
                src="/assets/mathematics.jpg"
                alt="Mathematics Tutoring"
                width={378}
                height={361}
                className="h-[280px] sm:h-[361px] w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-0 bg-yellow-light text-slate px-4 py-2 rounded-r-xl shadow-lg flex items-center gap-2 animate-bounce-slow">
                <Zap size={18} fill="currentColor" />
                <p className="text-[14px] font-bricolage font-bold">
                  Accelerated Learning
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          </div>
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
            {/* School Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                School-Level Mathematics
              </h3>
              <ul className="space-y-2">
                {[
                  "Mathematics 8, 9",
                  "Foundations of Mathematics (10, 11, 12)",
                  "Pre-Calculus (11, 12)",
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

            {/* University Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                University-Level Mathematics
              </h3>
              <ul className="space-y-2">
                {["Statistics", "Linear Algebra", "Advanced Mathematics Courses"].map(
                  (course) => (
                    <li
                      key={course}
                      className="flex items-center gap-3 text-[16px] font-montserrat text-slate"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />
                      {course}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Test Prep Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Test Preparation
              </h3>
              <ul className="space-y-2">
                {[
                  "Math Diagnostic Tests (MDTs)",
                  "Math Proficiency Tests (MPTs)",
                  "Math Competency Tests (MCTs)",
                  "Basic Skills Tests (BSTs)",
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
      <RelatedTutoringPages pillar="/programs/mathematics" programSlug="mathematics" />

      
        <ProgramNextSteps
          subject="Math"
          relatedLinks={[{ label: "Pre-Calculus 12 tutoring", href: "/pre-calculus-12-tutor-burnaby" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
