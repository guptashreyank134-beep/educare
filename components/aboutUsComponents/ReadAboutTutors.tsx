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

export const tutors = [
  {
    id: 0,
    name: "Dr. Shreyank",
    role: "Founder & Lead Instructor",
    image: "/assets/drShreyank.webp",
    belowshortDescription:
      "Dr. Shreyank offers personalized tutoring programs designed to help students build confidence and achieve academic excellence.",
    fullDescription:
      "Dr. Shreyank is the founder and director of Dr. Shreyank Educare. He holds a PhD in Ultrasound Signal & Image Processing and brings over 10 years of professional teaching experience.\n\nHe has successfully supported students from top Canadian universities, including McGill, York, Carleton, and the University of Ottawa. His personalized tutoring programs are designed to help students improve grades, build confidence, and gain a deeper understanding of core subjects like mathematics, physics, chemistry, biology, and computer science.",
    education: [
      "Ph.D. in Ultrasound Signal & Image Processing",
      "10+ Years of Teaching Experience",
    ],
    expertise: "Expert Tutoring in Math, Science & Coding",
    strengths: [
      "PhD-level expert instructor with over 10 years of teaching experience",
      "Tailored 1-on-1 and group coaching styles",
      "Proven track record with students from McGill, York, Carleton, and Ottawa",
      "Comprehensive coverage of mathematics, physics, chemistry, and coding",
    ],
  },
  {
    id: 1,
    name: "Prashanth Karupothula",
    role: "Mechanical Engineering Tutor",
    image: "/assets/tutors/prashanth.webp",

    belowshortDescription:
      "Prashanth integrates tools like MATLAB, COMSOL, Ansys, and AutoCAD into his teaching to provide a more applied and engaging learning experience.",

    fullDescription:
      "Prashanth Karupothula is a highly qualified mechanical engineering tutor with over 500+ hours of teaching experience, having supported 50+ students across core engineering subjects.\n\nSpecializes in thermo-fluid sciences, heat transfer, and numerical methods, helping students simplify complex concepts through clear, structured explanations. With a strong academic background from IIT Kanpur and the University of Alberta, he combines theoretical depth with practical application.\n\n",

    education: [
      "B.Tech (IIT Kanpur)",
      "M.Sc. (University of Alberta)",
    ],

    expertise:
      "Expert mentor for Fluid Sciences, Heat Transfer & Numerical Methods.",

    strengths: [
      "Strong foundation in core mechanical engineering subjects",
      "Experience with real-world research and simulations",
      "Clear, patient, and structured teaching style",
      "Focus on building conceptual understanding and confidence",
    ],
  },

  // {
  //   id: 2,
  //   name: "Vipin Garg",
  //   role: "Expert Finance Tutor",
  //   image: "/assets/tutors/vipin.webp",
  //
  //   belowshortDescription:
  //     "Vipin offers the expertise, guidance, and personalized support to help you achieve your academic and professional goals.",
  //
  //   fullDescription:
  //     "Vipin Garg is a results-driven finance tutor with over a decade of experience teaching undergraduate, graduate, and professional-level courses. His expertise spans corporate finance, investments, and financial markets.\n\nWith extensive corporate experience in financial planning, capital markets, and FinTech, he brings practical insights into his teaching, helping students connect theory with real-world applications.\n\n",
  //
  //   education: ["B.Tech", "MBA", "CFA Level III"],
  //
  //   expertise: "Expert Finance Tutor",
  //
  //   strengths: [
  //     "Strong industry and academic experience in finance",
  //     "Expertise in professional exam preparation (CFA, CSC, IFC)",
  //     "Practical, real-world teaching approach",
  //     "Structured learning plans for academic and career growth",
  //   ],
  // },
  //
  // {
  //   id: 3,
  //   name: "Seema",
  //   role: "Expert Chemistry Tutor",
  //   image: "/assets/tutors/seema.webp",
  //
  //   belowshortDescription:
  //     "Seema’s student-centered tutoring style ensures every learner receives personalized attention.",
  //
  //   fullDescription:
  //     "Seema is a dedicated chemistry tutor with strong academic expertise and teaching experience across school and college levels. She specializes in organic, inorganic, and physical chemistry.\n\nHer teaching style focuses on breaking down difficult topics into simple, understandable concepts, helping students build confidence and improve exam performance.\n\n",
  //
  //   education: ["M.Sc. Chemistry", "B.Ed."],
  //
  //   expertise: "Expert Chemistry Tutor",
  //
  //   strengths: [
  //     "Strong subject knowledge across all chemistry domains",
  //     "Clear and structured teaching approach",
  //     "Personalized learning support",
  //     "Focus on conceptual clarity and exam readiness",
  //   ],
  // },

  {
    id: 4,
    name: "Zeba Shaikh",
    role: "Expert Biology Tutor",
    image: "/assets/tutors/zeba.webp",

    belowshortDescription:
      "Zeba ensures that students not only master their coursework but also develop the skills to excel in future academic and career pursuits.",

    fullDescription:
      "Zeba Shaikh is a passionate biology tutor with expertise in subjects such as genetics, physiology, and ecology. She focuses on making complex biological concepts easy to understand through structured and engaging lessons.\n\nHer student-centered approach ensures personalized attention, helping learners improve both understanding and academic performance.\n\n",

    education: ["M.Sc. Biochemistry"],

    expertise: "Expert Biology Tutor",

    strengths: [
      "Strong foundation in biology and biochemistry",
      "Engaging and student-focused teaching style",
      "Focus on clarity, retention, and application",
      "Support for school and higher-level biology",
    ],
  },

  {
    id: 5,
    name: "Dr. Vandani Verma",
    role: "Expert Mathematics Tutor",
    image: "/assets/tutors/vandani.webp",

    belowshortDescription:
      "Zeba’s ensures that students not only master their coursework but also develop the skills to excel in future academic and career pursuits.",

    fullDescription:
      "Dr. Vandani Verma is an experienced Applied Mathematics educator with over 18 years of teaching expertise across school and university levels. She specializes in simplifying complex topics such as calculus, algebra, statistics, and differential equations.\n\nHer teaching approach focuses on building strong conceptual clarity and applying mathematical concepts to real-world problems, helping students improve both performance and confidence.\n\n",

    education: ["Ph.D. in Applied Mathematics"],

    expertise: "Expert Mathematics Tutor",

    strengths: [
      "Expertise in advanced mathematics and applied concepts",
      "Extensive university-level teaching experience",
      "Focus on conceptual clarity and problem-solving",
      "Strong academic and research background",
    ],
  },

  // {
  //   id: 6,
  //   name: "Dr. Devinder Kaur",
  //   role: "Expert Physics & Mathematics Tutor",
  //   image: "/assets/tutors/devinder.webp",
  //
  //   belowshortDescription:
  //     "Dr. Devinder’s teaching integrates simulations, technology, and visual tools to create engaging physics lessons tailored to each student’s needs.",
  //
  //   fullDescription:
  //     "Dr. Devinder Kaur brings over 7 years of experience in teaching physics and mathematics. With a Ph.D. in High Energy Physics, she specializes in making complex topics such as mechanics, calculus, and nuclear physics easy to understand.\n\nHer sessions integrate visual tools, simulations, and structured problem-solving techniques to help students develop deeper understanding and confidence.\n\n",
  //
  //   education: ["Ph.D. in High Energy Physics"],
  //
  //   expertise: "Expert Physics & Mathematics Tutor",
  //
  //   strengths: [
  //     "Strong foundation in physics and applied mathematics",
  //     "Experience in research and higher education",
  //     "Use of technology-driven teaching methods",
  //     "Focus on analytical thinking and clarity",
  //   ],
  // },
];
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
              <h3 className="text-xl font-medium underline decoration-yellow-light underline-offset-6">{tutor.name}</h3>

              <p
                className={`mt-2 text-[16px] group-hover:text-white ${activeTutor.id === tutor.id
                  ? "text-gray-20 "
                  : "text-gray-600"
                  }`}
              >
                {tutor.role}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReadAboutTutors;