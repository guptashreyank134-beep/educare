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
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "university-mathematics");
  return getMetadata(data, "https://drshreyankeducare.com/programs/university-mathematics");
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
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "University Courses", href: "/programs" },
    { label: "Mathematics" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/programs/university-mathematics")} />
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
            <h1 className="text-[42px] sm:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
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
          <div className="relative lg:pt-20 w-fit">
            <div className="relative w-fit rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group transition-transform hover:rotate-0 duration-500">
              <Image
                src="/assets/mathematics.jpg"
                alt="University Mathematics"
                width={378}
                height={361}
                className="h-[361px] w-[378px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
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
            {/* UBC Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                University Of British Columbia
              </h3>
              <ul className="space-y-2">
                {[
                  "Statistics: STAT 200, 203, 241, 251",
                  "Linear Algebra: MATH 152",
                  "Differential Calculus: MATH 100, 102, 104, 110, 120, 180, 184",
                  "Integral Calculus: MATH 101, 103, 105, 121",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* Langara Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Langara College
              </h3>
              <ul className="space-y-2">
                {[
                  "Statistics: STAT 1123, 1124, 1181",
                  "Linear Algebra: MATH 2362",
                  "Differential Calculus: MATH 1153, 1171, 1173, 1174, 1253",
                  "Integral Calculus: MATH 1271, 1273, 1274",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Other Calculus Topics
              </h3>
              <ul className="space-y-2">
                {[
                  "Multivariable Calculus",
                  "Vector Calculus",
                  "Lambda Calculus",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}

export const dynamic = "force-dynamic";
