/** @format */

import { Button } from "./ui/Button";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Code,
  ClipboardCheck,
  Landmark,
} from "lucide-react";
import Link from "next/link";

const programs = [
  {
    icon: GraduationCap,
    title: "Academic Subjects",
    description: "Grades 8-12 subjects mastered through core fundamentals.",
    href: "/programs/mathematics",
  },
  {
    icon: Code,
    title: "Coding & Tech",
    description: "Python, Java, and Web Architecture for young innovators.",
    href: "/programs/computer-science",
  },
  {
    icon: ClipboardCheck,
    title: "Test Preparations",
    description: "SAT, ACT, and AP exam strategies that actually work.",
    href: "/programs/sat-prep",
  },
  {
    icon: Landmark,
    title: "University Courses",
    description:
      "Portfolio building and admissions counselling for global universities.",
    href: "/university-professional",
  },
];

export default function ExplorePrograms() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Grid Background - subtle, primarily on left */}
      <div
        className="absolute left-0 top-0 w-1/3 h-full z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[26px] sm:text-[32px] font-bricolage font-display font-normal text-slate leading-[34px] mb-[14px]">
            Explore Learning Programs,
            <br />
            Designed Around Your Academic Goals
          </h2>
          <p className="text-[16px] font-sans font-normal text-slate opacity-80 leading-relaxed max-w-xl mx-auto">
            Tailored curricula designed to push academic boundaries and secure
            stronger understanding and results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-[0_0_30px_0_rgba(87,87,86,0.08)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className="w-[48px] h-[48px] bg-yellow-light rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="text-slate" size={24} strokeWidth={1.5} />
                </div>

                <div className="mb-2">
                  <h3 className="text-[20px] font-bricolage font-display font-medium text-slate inline-block border-b-2 border-yellow-light">
                    {program.title}
                  </h3>
                </div>

                <p className="text-[16px] font-sans text-slate opacity-70 leading-relaxed flex-grow mb-6">
                  {program.description}
                </p>

                {/* Descriptive link text: "Learn more" tells neither a reader
                    nor a search engine what is on the other side, and every card
                    rendered the identical phrase. */}
                <Link
                  href={program.href}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-sans text-[18px] font-medium transition-colors"
                >
                  Explore {program.title} <ArrowUpRight className="ml-1 shrink-0" size={18} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/programs">
            <Button iconRight={ArrowRight}>Explore Our Programs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
