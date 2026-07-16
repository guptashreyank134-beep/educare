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
  const data = await getMetaDataBySlug("programPage", "chemistry");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/chemistry");
}

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-[14px]">
    <div className="bg-yellow-light h-8 w-8  flex items-center justify-center rounded-lg text-slate shadow-sm">
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

export default async function ChemistryProgramPage() {
  const data = await getMetaDataBySlug("programPage", "chemistry");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("chemistry");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Chemistry" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/chemistry")} />
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
          {/* Left Column: Content */}
          <div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
              Chemistry Tutoring in Burnaby & Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Chemistry is a subject that requires both conceptual
                understanding and practical application. From chemical reactions
                and formulas to lab reports and calculations, students often
                struggle to balance theory with problem-solving.
              </p>
              <p>
                At Dr. Shreyank Educare, we provide structured tutoring that
                helps students understand difficult concepts, improve analytical
                thinking, and perform better in coursework, labs, and exams.
              </p>
            </div>

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
                items={[
                  "Organic Chemistry",
                  "Inorganic Chemistry",
                  "Physical Chemistry",
                  "Chemical Reactions & Stoichiometry",
                  "Acids, Bases & Equilibrium",
                  "Lab Analysis & Report Writing",
                  "Problem-Solving Techniques",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "High school students preparing for Chemistry 11 & 12",
                  "College and university students taking advanced chemistry courses",
                  "Students struggling with theory-heavy topics",
                  "Learners needing help with labs and assignments",
                  "Students preparing for exams and improving grades",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring",
                  "Lab Support",
                  "Assignment Help",
                  "Exam Prep Sessions",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Better lab performance",
                  "Higher grades",
                  "Improved concept retention",
                  "Stronger exam preparation",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Strengthening Conceptual Understanding",
                    desc: "Chemistry concepts build on one another. We help students develop strong foundations before moving into advanced topics.",
                  },
                  {
                    title: "Improving Problem-Solving Skills",
                    desc: "From balancing equations to numerical chemistry problems, we teach structured approaches that improve speed and accuracy.",
                  },
                  {
                    title: "Supporting Lab Work and Reports",
                    desc: "We help students understand experiments, analyze outcomes, and confidently complete lab assignments.",
                  },
                  {
                    title: "Making Complex Topics Easier to Understand",
                    desc: "Our tutors simplify difficult concepts into manageable lessons that improve retention and confidence.",
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
                src="/assets/chemestry.jpg"
                alt="Chemistry Tutoring"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* UBC Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                University Of British Columbia
              </h3>
              <ul className="space-y-2">
                {["CHEM 111", "CHEM 121", "CHEM 123"].map((course) => (
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

            {/* Langara Card */}
            <div className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[22px] font-bricolage font-normal leading-[22px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1">
                Langara College
              </h3>
              <ul className="space-y-2">
                {["CHEM 1114", "CHEM 1118", "CHEM 1120", "CHEM 1220"].map(
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
          subject="Chemistry"
          relatedLinks={[{ label: "Chemistry 12 tutoring in Burnaby", href: "/chemistry-12-tutor-burnaby" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
