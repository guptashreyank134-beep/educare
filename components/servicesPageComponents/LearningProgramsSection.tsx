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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col gap-8">
        {/* Top tabs */}
        <div className="overflow-x-auto pb-10 border-b-2 border-yellow-light">
          <div className="inline-flex gap-3 flex-wrap min-w-max ">
            {learningProgramsTabs.map((program) => (
              <button
                key={program.id}
                type="button"
                onClick={() => setActiveProgram(program)}
                className={`cursor-pointer rounded-3xl p-5 text-[22px] font-normal transition-all duration-200 whitespace-nowrap shadow-sm ${activeProgram.id === program.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-800 group hover:bg-[#7C9FE3]"
                  }`}
              >
                <p className="text-5.5 group-hover:text-bg-grey">{program.tabTitle}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 max-w-289.25">
          {/* Left sidebar */}
          <div className="space-y-6">
            <div className="relative lg:max-w-115.25 h-83.5 rounded-lg overflow-visible">
              <Image
                src={activeProgram.image}
                alt={activeProgram.heading}
                fill
                className="object-cover rounded-lg max-w-103.25"
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
                  className="bg-white max-w-103.5 rounded-lg border-slate-200 shadow-sm p-5"
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
            <div className="max-w-165">
              <h2 className="text-4xl sm:text-[32px] font-bricolage font-normal text-slate-900 leading-8.5 mb-5">
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
