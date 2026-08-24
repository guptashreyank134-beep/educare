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
import RelatedTutoringPages from "@/components/RelatedTutoringPages";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "computer-science");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/computer-science");
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

export default async function ComputerScienceProgramPage() {
  const data = await getMetaDataBySlug("programPage", "computer-science");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("computer-science");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Computer Science" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/computer-science")} />
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
              Computer Science Tutoring
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Computer science can feel overwhelming when students are
                expected to understand complex programming concepts while
                completing assignments, projects, and exams under tight
                deadlines.
              </p>
              <p>
                At Dr. Shreyank Educare, we provide structured tutoring that
                helps students understand technical concepts, improve coding
                skills, and confidently solve programming challenges through
                hands-on learning and personalized support.
              </p>
            </div>

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
                items={[
                  "Python programming, from first steps to intermediate",
                  "Java and JavaScript fundamentals",
                  "Data structures and algorithms",
                  "Object-oriented programming",
                  "Databases and SQL",
                  "Web development (HTML, CSS, JavaScript)",
                  "Debugging and problem-solving techniques",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "School students beginning to code",
                  "AP and high-school computer science students",
                  "College and university computer science students",
                  "Students who need help understanding assignments and projects",
                  "Anyone stuck on debugging or a specific concept",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring",
                  "Online Learning",
                  "Assignment & Exam Support",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Stronger coding confidence",
                  "Better assignment and project performance",
                  "Improved problem-solving abilities",
                  "Higher grades in technical courses",
                  "Better readiness for internships and tech careers",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Breaking Down Complex Concepts",
                    desc: "We simplify technical topics into structured lessons that are easier to understand and apply.",
                  },
                  {
                    title: "Hands-On Coding Practice",
                    desc: "Students learn by building projects, writing code, and solving practical programming problems.",
                  },
                  {
                    title: "Debugging and Assignment Support",
                    desc: "We help students troubleshoot errors, improve coding logic, and complete assignments confidently.",
                  },
                  {
                    title: "Career-Focused Learning",
                    desc: "Beyond academics, students gain exposure to industry tools, best practices, and emerging technologies.",
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
                src="/assets/computer.jpg"
                alt="Computer Science Tutoring"
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
              From first lines of code to university coursework — the areas our tutors genuinely teach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[24px] text-slate mb-6 inline-block border-b-2 border-yellow-light pb-1">
                School Coding & Beginners
              </h3>
              <ul className="space-y-2">
                {["First steps in Python","Loops, conditionals and functions","Variables, lists and basic data types","Moving from block coding to written code"].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-2 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[24px] text-slate mb-6 inline-block border-b-2 border-yellow-light pb-1">
                AP & High-School Computer Science
              </h3>
              <ul className="space-y-2">
                {["AP Computer Science Principles concepts","Java fundamentals and object-oriented basics","Reading, tracing and writing code","Preparing for school CS assessments"].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-2 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[24px] text-slate mb-6 inline-block border-b-2 border-yellow-light pb-1">
                University Computer Science
              </h3>
              <ul className="space-y-2">
                {["Data structures and algorithms","Object-oriented programming","Databases and SQL","Discrete mathematics for computing"].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-2 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[24px] text-slate mb-6 inline-block border-b-2 border-yellow-light pb-1">
                Programming Assignment Support
              </h3>
              <ul className="space-y-2">
                {["Understanding what the assignment asks","Planning an approach before coding","Code review and feedback on your work","Explaining errors and how to fix them"].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-2 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 group">
              <h3 className="text-[20px] font-bricolage font-normal leading-[24px] text-slate mb-6 inline-block border-b-2 border-yellow-light pb-1">
                Projects & Debugging
              </h3>
              <ul className="space-y-2">
                {["Building small projects step by step","Reading and understanding error messages","Debugging logic and edge cases","Web basics: HTML, CSS and JavaScript"].map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-2 text-[14px] font-montserrat text-slate"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate/20 mt-1.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Academic-integrity note */}
          <div className="mt-10 max-w-3xl mx-auto rounded-[12px] border border-yellow-light bg-yellow-light/20 px-6 py-5">
            <p className="text-[15px] font-montserrat text-slate leading-relaxed">
              <span className="font-semibold">A note on academic integrity.</span>{" "}
              Our tutoring gives you explanations, worked examples and step-by-step
              guidance so you can do your own work with confidence. We do not
              complete graded assignments, exams or projects on a student&apos;s
              behalf.
            </p>
          </div>
        </section>
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      <RelatedTutoringPages pillar="/programs/computer-science" programSlug="computer-science" />

      
        <ProgramNextSteps
          subject="Computer Science"
          relatedLinks={[{ label: "Computer science tutoring in Vancouver", href: "/computer-science-tutor-vancouver" }]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
