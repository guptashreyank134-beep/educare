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
      className={`rounded-[8px] shadow-[0px_0px_50px_0px_#5757561F] p-5 bg-bg-grey  transition-all duration-300 overflow-hidden cursor-pointer`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between text-left  hover:bg-gray-50 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <h2 className="text-[22px] font-bricolage font-semibold pb-5 text-slate">
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
          <div className="border-t border-[#F8F5F5] pt-5 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core Targets */}
            <div>
              <h3 className="text-[18px] font-montserrat font-medium text-primary mb-[18px] uppercase">
                Core Targets
              </h3>
              <ul className="space-y-1.5">
                {program.coreTargets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[16px] font-montserrat text-slate"
                  >
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-slate shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div>
              <h3 className="text-[18px] font-montserrat font-medium text-primary mb-[18px] uppercase">
                Ideal For
              </h3>
              <p className="text-[16px] font-montserrat text-slate leading-relaxed">
                {program.idealFor}
              </p>
            </div>

            {/* Expected Outcome */}
            <div>
              <h3 className="text-[18px] font-montserrat font-medium text-primary mb-[18px] uppercase">
                Expected Outcome
              </h3>
              <p className="text-[16px] font-montserrat text-slate leading-relaxed mb-[18px]">
                {program.expectedOutcome}
              </p>
              {program.learnMoreHref && (
                <Link
                  href={program.learnMoreHref}
                  className="inline-flex items-center gap-1 text-[18px] font-montserrat font-medium text-primary hover:underline transition-all"
                >
                  Learn more
                  <ArrowUpRight className="w-[22px] h-[22px]" />
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
        {/* Tab Bar */}
        <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b-2 border-yellow-light">
          {programTabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`
                inline-flex items-center justify-center
                p-5 rounded-[24px] leading-[100%]
                text-[24px] font-bricolage font-normal
                transition-all duration-200 cursor-pointer
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

        {/* Program Cards */}
        <div className="flex flex-col gap-4">
          {activePrograms.map((program, idx) => (
            <ProgramCard
              key={`${activeTab}-${program.title}`}
              program={program}
              isFirst={idx === 0}
              defaultOpen={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
