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
  const data = await getMetaDataBySlug("programPage", "gmat-prep");
  return getMetadata(data, "https://drshreyankeducare.com/programs/gmat-prep");
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

export default async function GmatPrepProgramPage() {
  const data = await getMetaDataBySlug("programPage", "gmat-prep");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Test Prep", href: "/programs" },
    { label: "GMAT" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/programs/gmat-prep")} />
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
              GMAT Prep Program
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Structured GMAT coaching designed to help students improve
                scores and strengthen business school applications.
              </p>
              <p>
                The GMAT requires strong quantitative reasoning, verbal
                ability, and strategic pacing. Our prep programs help students
                improve efficiency and maximize scores.
              </p>
            </div>

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
                items={[
                  "Quantitative Reasoning",
                  "Verbal Reasoning",
                  "Data Insights",
                  "Critical Reasoning",
                  "Time Management",
                  "Mock Testing",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "MBA applicants",
                  "Business school applicants",
                  "Working professionals",
                  "Students retaking GMAT exams",
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
                  "Target Score: 675-750+ GMAT",
                  "Higher MBA admission competitiveness",
                  "Improved test confidence",
                  "Stronger quant and verbal performance",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Adaptive Exam Strategy",
                    desc: "Learn how to navigate adaptive scoring systems.",
                  },
                  {
                    title: "Data Insights Practice",
                    desc: "Master modern GMAT Focus requirements.",
                  },
                  {
                    title: "Mock Testing",
                    desc: "Simulate real exam conditions.",
                  },
                  {
                    title: "Personalized Score Planning",
                    desc: "Build strategies based on your target school goals.",
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
                src="/assets/gmat.png"
                alt="GMAT Prep"
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
      </div>
    </main>
    </>
  );
}

export const dynamic = "force-dynamic";
