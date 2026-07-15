/** @format */

"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { programTabs, Program, ProgramTab } from "./programData";

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgramCard({
  program,
  isFirst,
  defaultOpen,
}: {
  program: Program;
  isFirst: boolean;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-[8px] shadow-[0px_0px_50px_0px_#5757561F] p-4 sm:p-5 bg-bg-grey transition-all duration-300 overflow-hidden cursor-pointer`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <h2 className="text-[18px] sm:text-[20px] lg:text-[22px] font-bricolage font-semibold pb-4 sm:pb-5 text-slate">
          {program.title}
        </h2>
        {open ? (
          <ChevronUp className="w-6 h-6 text-slate shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-slate shrink-0" />
        )}
      </button>

      {/* Body */}
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#F8F5F5] pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Core Targets */}
            <div>
              <h3 className="text-[15px] sm:text-[18px] font-montserrat font-medium text-primary mb-3 sm:mb-[18px] uppercase">
                Core Targets
              </h3>
              <ul className="space-y-1.5">
                {program.coreTargets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[15px] sm:text-[16px] font-montserrat text-slate leading-relaxed"
                  >
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-slate shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div>
              <h3 className="text-[15px] sm:text-[18px] font-montserrat font-medium text-primary mb-3 sm:mb-[18px] uppercase">
                Ideal For
              </h3>
              <p className="text-[15px] sm:text-[16px] font-montserrat text-slate leading-relaxed">
                {program.idealFor}
              </p>
            </div>

            {/* Expected Outcome */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-[15px] sm:text-[18px] font-montserrat font-medium text-primary mb-3 sm:mb-[18px] uppercase">
                Expected Outcome
              </h3>
              <p className="text-[15px] sm:text-[16px] font-montserrat text-slate leading-relaxed mb-[18px]">
                {program.expectedOutcome}
              </p>
              {/* Descriptive link text. Every card previously said "Learn more",
                  which describes nothing and gives search engines no signal about
                  the destination. */}
              {program.learnMoreHref && (
                <Link
                  href={program.learnMoreHref}
                  className="inline-flex items-center gap-1 text-[15px] sm:text-[18px] font-montserrat font-medium text-primary hover:underline transition-all"
                >
                  Explore our {program.title}
                  <ArrowUpRight className="w-[18px] sm:w-[22px] h-[18px] sm:h-[22px] shrink-0" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const activePrograms = programTabs[activeTab].programs;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1296px] mx-auto">
        {/* Tab Bar — scrollable on mobile, full-width border */}
        <div className="border-b-2 border-yellow-light mb-6">
          <div className="overflow-x-auto pb-[2px] -mb-[2px]">
            <div className="flex gap-2 sm:gap-3 pb-4 min-w-max">
            {programTabs.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`
                  inline-flex items-center justify-center
                  px-3 py-2.5 sm:px-4 sm:py-3 lg:p-5 rounded-[20px] sm:rounded-[24px] leading-[100%]
                  text-[14px] sm:text-[18px] lg:text-[22px] font-bricolage font-normal
                  transition-all duration-200 cursor-pointer whitespace-nowrap
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-[0px_0px_50px_0px_#5757561F]
                  ${
                    activeTab === idx
                      ? "bg-slate text-white"
                      : "bg-bg-grey text-slate hover:bg-[#E9EAEC]"
                  }
                `}
                style={
                  activeTab === idx
                    ? { boxShadow: "0px 0px 50px 0px #5757561F" }
                    : undefined
                }
              >
                {tab.label}
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="flex flex-col gap-4">
          {activePrograms.map((program, idx) => (
            <ProgramCard
              key={`${activeTab}-${program.title}`}
              program={program}
              isFirst={idx === 0}
              defaultOpen={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
