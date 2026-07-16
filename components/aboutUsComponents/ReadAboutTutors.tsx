// import React from 'react'

// const ReadAboutTutors = () => {
//   return (
//     <main className='flex felx-col gap-10 max-w-324 m-auto h-auto'>

//      <div id='heading'>
//         <h2 className=''>Read about our tutors, get to know them better!</h2>
//        <p >Our experienced instructors combine academic excellence with real-world teaching, ensuring students grasp concepts thoroughly.</p>
//      </div>

//      <div id='mainSection'>

//      </div>



//     </main>>
//   )
// }

// export default ReadAboutTutors

/** @format */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { GraduationCap, NotebookPen, Zap } from "lucide-react";
import { tutors } from "./tutorsData";

const ReadAboutTutors = () => {
  const [activeTutor, setActiveTutor] = useState(tutors[0]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-12">
      {/* Heading */}
      <div className="text-center max-w-[546px] mx-auto mb-10">
        <h2 className="text-[32px] font-bricolage font-display font-normal text-slate leading-[34px] mb-4">
          Read about our tutors, <br />
          get to know them better!
        </h2>
        <p className="text-[16px] font-sans font-normal text-slate leading-relaxed opacity-80">
          Our experienced instructors combine academic excellence with real-world teaching, ensuring students grasp concepts thoroughly.
        </p>
      </div>

      {/* Main Section */}
      <div
        id="mainSection"
        className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-8 items-start"
      >
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 w-full max-w-[341px] mx-auto lg:max-w-none">
          {/* Image */}
          <div className="rounded-xl overflow-hidden w-full">
            <Image
              src={activeTutor.image}
              alt={activeTutor.name}
              width={266}
              height={328}
              className="w-full h-[400px] object-cover object-top rounded-xl"
            />
          </div>

          {/* Small Info Card */}
          <div className="bg-white rounded-lg shadow-md p-5 flex flex-col gap-5 w-full">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-light p-2.5 rounded-lg">
                <GraduationCap className="w-8 h-8 text-slate" />
              </div>

              <div className="text-sm text-gray-700">
                {activeTutor.education.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-yellow-light p-2.5 rounded-lg">
                <NotebookPen className="w-8 h-8 text-slate" />
              </div>

              <p className="text-sm text-gray-700">
                Expert mentor with structured teaching methods.
              </p>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-8 flex flex-col gap-6 order-3 lg:order-2 w-full">
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-slate-800 mb-4">
              {activeTutor.name}
            </h3>

            <p className="text-gray-700 leading-[22px] font-normal whitespace-pre-line">
              {activeTutor.fullDescription}
            </p>
          </div>

          {/* Key Strengths */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-light p-2 rounded-lg">
                <Zap className="w-8 h-8 text-slate" />
              </div>

              <h3 className="text-2xl font-medium text-slate">
                Key Strengths
              </h3>
            </div>

            <ul className="list-disc pl-6 text-gray-700 flex flex-col gap-2">
              {activeTutor.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {activeTutor.belowshortDescription}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible whitespace-nowrap lg:whitespace-normal pb-4 lg:pb-0 gap-4 lg:gap-5 snap-x order-1 lg:order-3 w-full lg:w-auto">
          {tutors.map((tutor) => (
            <button
              key={tutor.id}
              onClick={() => setActiveTutor(tutor)}
              className={`group p-5 rounded-xl text-left transition-all shadow-sm cursor-pointer hover:text-white min-w-[220px] lg:min-w-0 shrink-0 lg:shrink w-auto lg:w-full snap-start whitespace-normal
                ${activeTutor.id === tutor.id
                  ? "bg-slate-800 text-white"
                  : "bg-white hover:bg-[#7C9FE3]"
                }`}
            >
              {/* Thumbnail + name. The list previously showed names only, so a
                  visitor had to click each tutor to see who they were. */}
              <div className="flex items-start gap-3">
                <span className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-yellow-light/60">
                  <Image
                    src={tutor.image}
                    alt={`${tutor.name} — ${tutor.role}`}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </span>

                <span className="min-w-0">
                  {/* Selector-button label (navigation), not a content heading —
                      block <span> keeps the look but leaves the heading outline. */}
                  <span className="block text-xl font-medium underline decoration-yellow-light underline-offset-6">
                    {tutor.name}
                  </span>

                  <p
                    className={`mt-2 text-[16px] group-hover:text-white ${activeTutor.id === tutor.id
                      ? "text-gray-20 "
                      : "text-gray-600"
                      }`}
                  >
                    {tutor.role}
                  </p>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReadAboutTutors;