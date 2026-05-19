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
} from "lucide-react";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getMetaDataBySlug("programPage", "physics-tutoring");
    return getMetadata(data, "https://drshreyankeducare.com/programs/physics-tutoring");
  } catch {
    return {
      title: "Physics Tutoring | Dr. Shreyank Educare",
      description:
        "Expert Physics 11 & 12 tutoring in BC. Master mechanics, waves, electricity, and electromagnetism with personalized one-on-one sessions designed to boost your grades and exam confidence.",
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

export default async function PhysicsTutoringPage() {
  let data;
  try {
    data = await getMetaDataBySlug("programPage", "physics-tutoring");
  } catch {}

  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Physics Tutoring" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/programs/physics-tutoring")} />
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
              <h1 className="text-[42px] sm:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
                Physics Tutoring
              </h1>

              <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
                <p>
                  Physics is one of the most conceptually demanding subjects in
                  the BC high school curriculum. Balancing theory with
                  mathematics, applying formulas correctly, and visualizing
                  abstract phenomena can be challenging for even the most
                  dedicated students.
                </p>
                <p>
                  At Dr. Shreyank Educare, our physics tutors use clear
                  explanations, real-world examples, and structured
                  problem-solving strategies to help students develop genuine
                  understanding — not just memorized answers.
                </p>
              </div>

              <section>
                <SectionHeader icon={Layers} title="What We Cover" />
                <ListItems
                  items={[
                    "Kinematics & Dynamics (Forces, Motion, Newton's Laws)",
                    "Energy, Work & Power",
                    "Waves, Sound & Light (Optics)",
                    "Electricity & Circuits",
                    "Electromagnetism",
                    "Nuclear Physics & Modern Physics",
                    "Vectors & Problem-Solving Techniques",
                  ]}
                />

                <SectionHeader icon={FileText} title="Who Is This For" />
                <ListItems
                  items={[
                    "Students enrolled in Physics 11 or Physics 12",
                    "Learners who find physics concepts abstract or difficult",
                    "Students preparing for BC Provincial Exams",
                    "Students heading into engineering, medicine, or science programs",
                    "Anyone who wants to improve their physics grade quickly",
                  ]}
                />

                <SectionHeader icon={LayoutGrid} title="Program Format" />
                <ListItems
                  items={[
                    "One-on-One Online Tutoring",
                    "Concept-First Explanations with Visual Aids",
                    "Step-by-Step Problem Solving",
                    "Exam & Provincial Assessment Preparation",
                    "Homework & Lab Report Support",
                  ]}
                />

                <SectionHeader icon={Sparkles} title="Expected Outcomes" />
                <ListItems
                  items={[
                    "Improved Physics 11 & 12 grades",
                    "Stronger performance on BC Provincial Exams",
                    "Clear conceptual understanding of all major units",
                    "Confident and systematic approach to physics problems",
                    "Solid preparation for first-year university physics",
                  ]}
                />

                <SectionHeader icon={Rocket} title="Our Approach" />
                <div className="ml-11 space-y-4">
                  {[
                    {
                      title: "Concept Before Calculation",
                      desc: "We ensure students understand the 'why' before applying formulas. This deep understanding allows them to tackle unfamiliar problems confidently.",
                    },
                    {
                      title: "Visual and Real-World Learning",
                      desc: "We use diagrams, animations, and real-world analogies to make abstract physics concepts intuitive and memorable.",
                    },
                    {
                      title: "Systematic Problem-Solving",
                      desc: "Students learn a structured method for approaching physics problems — identify knowns, unknowns, select the right formula, and verify units — reducing careless errors.",
                    },
                    {
                      title: "Exam Strategy and Time Management",
                      desc: "We walk students through past provincial exam questions, teaching them how to allocate time, recognize question types, and avoid common pitfalls.",
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

            {/* Right Column */}
            <div className="relative lg:pt-20 w-fit">
              <div className="relative w-fit rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group transition-transform hover:rotate-0 duration-500">
                <Image
                  src="/assets/physics.jpg"
                  alt="Physics Tutoring"
                  width={378}
                  height={361}
                  className="h-[361px] w-[378px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute bottom-8 left-0 bg-yellow-light text-slate px-4 py-2 rounded-r-xl shadow-lg flex items-center gap-2 animate-bounce-slow">
                  <Zap size={18} fill="currentColor" />
                  <p className="text-[14px] font-bricolage font-bold">
                    Concept Clarity
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
                BC Curriculum — High School & University Physics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  High School Physics
                </h3>
                <ul className="space-y-2">
                  {[
                    "Physics 11",
                    "Physics 12",
                    "BC Provincial Exam Prep",
                    "IB Physics SL/HL",
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[16px] font-montserrat text-slate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate/20" />{c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                  University Physics
                </h3>
                <ul className="space-y-2">
                  {[
                    "Introductory Mechanics",
                    "Electromagnetism",
                    "Waves & Modern Physics",
                    "Engineering Physics Courses",
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
      </main>
    </>
  );
}
