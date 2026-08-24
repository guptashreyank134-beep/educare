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
import UniversityCourseTable from "@/components/UniversityCourseTable";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "university-mathematics");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/university-mathematics");
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

export default async function UniversityMathematicsPage() {
  const data = await getMetaDataBySlug("programPage", "university-mathematics");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("university-mathematics");
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

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-[95px] relative z-10">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 mt-10 items-start">
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

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
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

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "Undergraduate math students",
                  "Engineering students",
                  "Business students taking statistics/math courses",
                  "Students struggling with advanced problem-solving",
                  "Students preparing for finals and major assessments",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring",
                  "Assignment Support",
                  "Exam Preparation",
                  "Weekly Concept Reinforcement Sessions",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Higher academic performance",
                  "Better problem-solving speed",
                  "Improved exam confidence",
                  "Stronger conceptual understanding",
                  "Better preparedness for advanced coursework",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
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
                alt="University Mathematics"
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
                <UniversityCourseTable subject={["Statistics", "Mathematics"]} />
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      <RelatedTutoringPages pillar="/programs/university-mathematics" programSlug="university-mathematics" />

      
        <ProgramNextSteps
          subject="University Math"
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
