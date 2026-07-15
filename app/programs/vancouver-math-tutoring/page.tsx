/** @format */

import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  Layers,
  FileText,
  LayoutGrid,
  Sparkles,
  Rocket,
  Zap,
  MapPin,
} from "lucide-react";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema, getFAQSchema } from "@/components/SchemaMarkup";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import { getProgramFaqs } from "@/sanity/lib/faqs";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getMetaDataBySlug("programPage", "vancouver-math-tutoring");
    return getMetadata(data, "https://www.drshreyankeducare.com/programs/vancouver-math-tutoring");
  } catch {
    return {
      title: "Vancouver Math Tutoring | Dr. Shreyank Educare",
      description:
        "Expert one-on-one math tutoring in Vancouver. We help students from Grade 8 through university master algebra, calculus, pre-calculus, and more.",
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

export default async function VancouverMathTutoringPage() {
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("vancouver-math-tutoring");
  let data;
  try {
    data = await getMetaDataBySlug("programPage", "vancouver-math-tutoring");
  } catch {}

  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Local Programs", href: "/programs" },
    { label: "Vancouver Math Tutoring" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/vancouver-math-tutoring")} />
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
                  Serving Vancouver, BC
                </span>
              </div>

              <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
                Vancouver Math Tutoring
              </h1>

              <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
                <p>
                  Looking for reliable math tutoring in Vancouver? Dr. Shreyank
                  Educare provides expert, personalized math support for students
                  from Grade 8 through university. Whether your child is
                  struggling with foundational concepts or preparing for final
                  exams, our experienced tutors are here to help.
                </p>
                <p>
                  We focus on concept clarity, structured practice, and
                  confidence-building — helping Vancouver students not just pass,
                  but truly understand mathematics.
                </p>
              </div>

              <section>
                <SectionHeader icon={Layers} title="What We Cover" />
                <ListItems
                  items={[
                    "Algebra & Functions (Grades 8–12)",
                    "Pre-Calculus 11 & 12",
                    "Foundations of Mathematics 10, 11, 12",
                    "Calculus (Limits, Derivatives, Integration)",
                    "Statistics and Probability",
                    "Word Problems & Exam Strategies",
                  ]}
                />

                <SectionHeader icon={FileText} title="Who Is This For" />
                <ListItems
                  items={[
                    "Vancouver students in Grades 8 through 12",
                    "University students in introductory math courses",
                    "Students falling behind or needing to accelerate",
                    "Learners preparing for provincial exams",
                    "Students who want structured, consistent support",
                  ]}
                />

                <SectionHeader icon={LayoutGrid} title="Program Format" />
                <ListItems
                  items={[
                    "One-on-One Online Tutoring",
                    "Flexible scheduling — evenings & weekends",
                    "Homework Help & Assignment Support",
                    "Exam Preparation Sessions",
                  ]}
                />

                <SectionHeader icon={Sparkles} title="Expected Outcomes" />
                <ListItems
                  items={[
                    "Improved report card grades",
                    "Stronger exam performance",
                    "Greater confidence in approaching math problems",
                    "Solid foundation for future courses",
                    "Reduced math anxiety",
                  ]}
                />

                <SectionHeader icon={Rocket} title="Our Approach" />
                <div className="ml-11 space-y-4">
                  {[
                    {
                      title: "Personalized to Each Student",
                      desc: "Every Vancouver student learns differently. We tailor each session to match the student's current level, pace, and BC curriculum requirements.",
                    },
                    {
                      title: "BC Curriculum Aligned",
                      desc: "Our tutors are familiar with the BC Math curriculum and ensure sessions directly support what students are learning in class.",
                    },
                    {
                      title: "Building Long-Term Understanding",
                      desc: "Rather than quick fixes, we build lasting conceptual understanding so students are prepared for each next step in their math journey.",
                    },
                    {
                      title: "Consistent Progress Tracking",
                      desc: "We monitor student progress and adjust our approach to ensure continuous improvement and growing confidence.",
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

            {/* Right Column */}
            <div className="relative lg:pt-20 w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[378px] rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group transition-transform hover:rotate-0 duration-500">
                <Image
                  src="/assets/mathematics.jpg"
                  alt="Vancouver Math Tutoring"
                  width={378}
                  height={361}
                  className="h-[280px] sm:h-[361px] w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute bottom-8 left-0 bg-yellow-light text-slate px-4 py-2 rounded-r-xl shadow-lg flex items-center gap-2 animate-bounce-slow">
                  <Zap size={18} fill="currentColor" />
                  <p className="text-[14px] font-bricolage font-bold">
                    Vancouver, BC
                  </p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>

          {/* Courses We Support */}
          <section className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
                Courses We Support
              </h2>
              <p className="text-[18px] font-montserrat text-slate/60">
                Aligned With the BC Mathematics Curriculum
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  Middle School (Grades 8–9)
                </h3>
                <ul className="space-y-2">
                  {["Math 8", "Math 9", "Foundations of Math 10"].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  High School (Grades 10–12)
                </h3>
                <ul className="space-y-2">
                  {["Pre-Calculus 11 & 12", "Foundations of Math 11 & 12", "Calculus 12"].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  University Level
                </h3>
                <ul className="space-y-2">
                  {["Calculus I & II", "Linear Algebra", "Statistics", "Differential Equations"].map((c) => (
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
      </main>
    </>
  );
}

export const revalidate = 3600;
