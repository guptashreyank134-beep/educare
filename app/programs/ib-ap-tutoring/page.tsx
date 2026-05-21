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
  Award,
} from "lucide-react";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getMetaDataBySlug("programPage", "ib-ap-tutoring");
    return getMetadata(data, "https://drshreyankeducare.com/programs/ib-ap-tutoring");
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
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/programs/ib-ap-tutoring")} />
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
                IB & AP Tutoring
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
                      desc: "IB IAs can be daunting. We guide students through topic selection, methodology, data analysis, and report writing to maximize their IA scores.",
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

            {/* Right Column */}
            <div className="relative lg:pt-20 w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[378px] rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group transition-transform hover:rotate-0 duration-500">
                <Image
                  src="/assets/biology.jpg"
                  alt="IB and AP Tutoring"
                  width={378}
                  height={361}
                  className="h-[280px] sm:h-[361px] w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute bottom-8 left-0 bg-yellow-light text-slate px-4 py-2 rounded-r-xl shadow-lg flex items-center gap-2 animate-bounce-slow">
                  <Zap size={18} fill="currentColor" />
                  <p className="text-[14px] font-bricolage font-bold">
                    Score a 7 / 5
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
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";
