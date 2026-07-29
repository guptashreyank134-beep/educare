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
  const data = await getMetaDataBySlug("programPage", "university-physics");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/university-physics");
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

export default async function UniversityPhysicsPage() {
  const data = await getMetaDataBySlug("programPage", "university-physics");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("university-physics");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "University Courses", href: "/programs" },
    { label: "Physics" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/university-physics")} />
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
              University Physics Tutoring in Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                University physics combines advanced theory with heavy
                mathematical application, making it one of the most demanding
                academic subjects.
              </p>
              <p>
                At Dr. Shreyank Educare, we help students break down difficult
                concepts and build confidence through structured problem-solving
                practice.
              </p>
              <p>
                Most of our university physics students come from UBC, SFU and
                Langara — first-year mechanics and electromagnetism (the PHYS
                100-series and equivalents) through to upper-year thermodynamics,
                quantum and modern physics. We work in person at our Burnaby
                centre, a short distance from SFU, and online for students across
                Vancouver and the Lower Mainland.
              </p>
            </div>

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
                items={[
                  "Mechanics",
                  "Thermodynamics",
                  "Electromagnetism",
                  "Waves & Optics",
                  "Quantum Physics",
                  "Nuclear Physics",
                  "Vector Analysis",
                  "Advanced Problem Solving",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "Undergraduate physics students",
                  "Engineering students",
                  "Pre-med students",
                  "Students struggling with mathematical physics",
                  "Students preparing for exams",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring: Fully personalized sessions tailored to individual goals",
                  "Small Group Sessions: Collaborative learning with expert guidance",
                  "On-Demand Support: Flexible help for assignments, labs, or exam prep",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Improved grades",
                  "Stronger numerical problem solving",
                  "Better conceptual understanding",
                  "Increased confidence in labs/exams",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Simplifying Complex Theories",
                    desc: "Clear explanations of difficult scientific concepts.",
                  },
                  {
                    title: "Strengthening Mathematical Foundations",
                    desc: "Reinforcing calculus and algebra used in physics.",
                  },
                  {
                    title: "Problem-Solving Practice",
                    desc: "Extensive guided practice sessions.",
                  },
                  {
                    title: "Exam Preparation Support",
                    desc: "Targeted help before major exams.",
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
                src="/assets/physics.jpg"
                alt="University Physics"
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
            {/* UBC Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                University Of British Columbia
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  "PHYS 100",
                  "PHYS 117",
                  "PHYS 101",
                  "PHYS 118",
                  "PHYS 107",
                  "PHYS 170",
                  "PHYS 108",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </div>
            </div>

            {/* SFU Card — SFU is in Burnaby, where our centre is */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Simon Fraser University
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  "PHYS 101",
                  "PHYS 120",
                  "PHYS 102",
                  "PHYS 121",
                  "PHYS 125",
                  "PHYS 126",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </div>
            </div>

            {/* Langara Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Langara College
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  "PHYS 1101",
                  "PHYS 1117",
                  "PHYS 1114",
                  "PHYS 1170",
                  "PHYS 1118",
                  "PHYS 1108",
                  "PHYS 1125",
                  "PHYS 1225",
                ].map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0" />
                    {course}
                  </li>
                ))}
              </div>
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
      
        <ProgramNextSteps
          subject="University Physics"
          relatedLinks={[
            { label: "Physics 11 & 12 tutoring", href: "/programs/physics" },
            { label: "Engineering statics tutor", href: "/engineering-statics-tutor" },
            { label: "Engineering dynamics tutor", href: "/engineering-dynamics-tutor" },
            { label: "First-year engineering tutor", href: "/first-year-engineering-tutor" },
          ]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
