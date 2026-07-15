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
              GRE Prep Program
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
                  intensity and format — online or in person at our Burnaby centre —
                  to your goals and schedule, so you walk into the exam prepared and
                  confident.
                </p>
              </div>

              <SectionHeader icon={Sparkles} title="Frequently Asked Questions" />
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
                    a: "Both. We offer flexible online sessions and in-person coaching at our Burnaby centre.",
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

          {/* Right Column: Image and Visuals */}
          <div className="relative lg:pt-20 w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[378px] rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group transition-transform hover:rotate-0 duration-500">
              <Image
                src="/assets/gre.png"
                alt="GRE Prep"
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
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      
        <ProgramNextSteps
          subject="GRE"
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
