"use client";

import Image from "next/image";
import React, { useState } from "react";
import type { LearningProgramTab } from "./content";
import { learningProgramsTabs } from "./content";
import { Laptop } from "lucide-react";

const LearningProgramsSection = () => {
  const [activeProgram, setActiveProgram] = useState<LearningProgramTab>(
    learningProgramsTabs[0]
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full min-w-0">
      <div className="flex flex-col gap-8 w-full min-w-0">
        {/* Top tabs */}
        <div className="border-b-2 border-yellow-light mb-6 w-full min-w-0">
          <div className="overflow-x-auto pb-[2px] -mb-[2px]">
            <div className="flex gap-2 sm:gap-3 pb-4 min-w-max">
            {learningProgramsTabs.map((program) => (
              <button
                key={program.id}
                type="button"
                onClick={() => setActiveProgram(program)}
                className={`
                  inline-flex items-center justify-center
                  px-3 py-2.5 sm:px-4 sm:py-3 lg:p-5 rounded-[20px] sm:rounded-[24px] leading-[100%]
                  text-[14px] sm:text-[18px] lg:text-[22px] font-bricolage font-normal
                  transition-all duration-200 cursor-pointer whitespace-nowrap
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-[0px_0px_50px_0px_#5757561F]
                  ${
                    activeProgram.id === program.id
                      ? "bg-slate text-white"
                      : "bg-bg-grey text-slate hover:bg-[#E9EAEC]"
                  }
                `}
                style={
                  activeProgram.id === program.id
                    ? { boxShadow: "0px 0px 50px 0px #5757561F" }
                    : undefined
                }
              >
                {program.tabTitle}
              </button>
            ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 max-w-[1157px]">
          {/* Left sidebar */}
          <div className="space-y-6">
            <div className="relative lg:max-w-[461px] h-[334px] rounded-lg overflow-visible">
              <Image
                src={activeProgram.image}
                alt={activeProgram.heading}
                fill
                className="object-cover rounded-lg max-w-[413px]"
                priority
              />
              <div className="absolute top-0 right-0 h-10 w-10 rounded-lg bg-yellow-light text-slate flex items-center justify-center shadow-lg">
                <Laptop  className="w-6 h-6 text-slate " />
              </div>

            </div>
            <div className="grid gap-8">
              {activeProgram.infoCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white max-w-[414px] rounded-lg border-slate-200 shadow-sm p-5"
                >
                  <h3 className="text-[22px] underline underline-offset-4 decoration-yellow-light decoration-2 font-semibold text-slate mb-3">
                    {card.title}
                  </h3>
                  <ul className="space-y-2 text-[16px] text-slate-700 leading-6 list-disc list-inside">
                    {card.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right main content */}
          <div className="flex flex-col gap-8 py-2.5 px-5">
            <div className="max-w-[660px]">
              <h2 className="text-4xl sm:text-[32px] font-bricolage font-normal text-slate-900 leading-[34px] mb-5">
                {activeProgram.heading}
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-7 max-w-3xl">
                {activeProgram.description}
              </p>
            </div>

            <div className="grid gap-8">
              {activeProgram.rightSections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <div className="space-y-4" key={index}>
                            <div className="flex items-start gap-2" key={index}>
                                <div className="h-8 w-8 rounded-sm bg-yellow-light text-slate flex items-center justify-center">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col gap-3.5 align-center justify-center">
                                    <h3 className="text-[22px] align-middle font-bricolage font-display font-normal text-slate">
                                        {section.title}
                                    </h3>
                                </div>
                            </div>
                            <ul className="space-y-3 ml-1 text-[16px] leading-4 font-montserrat text-slate-600 list-disc list-inside">
                                        {section.points.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                      </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProgramsSection;
