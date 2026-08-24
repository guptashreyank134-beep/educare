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
import { JsonLd, getPageSchema, getFAQSchema } from "@/components/SchemaMarkup";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import ProgramNextSteps from "@/components/ProgramNextSteps";
import { getProgramFaqs } from "@/sanity/lib/faqs";
import type { Metadata } from "next";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";

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

            {/* Right Column */}
            <div className="relative lg:pt-20 w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[378px] rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group transition-transform hover:rotate-0 duration-500">
                <Image
                  src="/assets/mathematics.jpg"
                  alt="Pre-Calculus 11 and 12 Tutoring"
                  width={378}
                  height={361}
                  className="h-[280px] sm:h-[361px] w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute bottom-8 left-0 bg-yellow-light text-slate px-4 py-2 rounded-r-xl shadow-lg flex items-center gap-2 animate-bounce-slow">
                  <Zap size={18} fill="currentColor" />
                  <p className="text-[14px] font-bricolage font-bold">
                    Exam Ready
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
      <RelatedTutoringPages pillar="/programs/pre-calculus" programSlug="pre-calculus" />

      
        <ProgramNextSteps
          subject="Pre-Calculus"
          relatedLinks={[{ label: "Pre-Calculus 12 tutoring in Burnaby", href: "/pre-calculus-12-tutor-burnaby" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
