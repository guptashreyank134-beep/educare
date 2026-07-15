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

  {
    id: 6,
    name: "Dr. Sabiha Arshed",
    role: "Health Sciences & Medical Tutor",
    image: "/assets/tutors/sabiha.webp",

    belowshortDescription:
      "Sabiha breaks down complex medical and science concepts into clear, structured lessons tailored to each student's needs and learning style.",

    fullDescription:
      "Sabiha Arshed is a medical graduate and MSc-trained health sciences professional with extensive experience in teaching, mentoring, clinical education and public health. She specializes in breaking down complex medical and science concepts into clear, structured and easy-to-understand lessons tailored to each student's needs and learning style.\n\nShe supports students across a wide range of subjects including medical terminology, anatomy, physiology, health sciences, biology and general science as well as English writing, study skills and exam preparation. With multilingual fluency in English, Urdu, Hindi and Punjabi, Sabiha creates a calm, encouraging and culturally responsive learning environment for students from diverse backgrounds.",

    education: [
      "MD, MSc in Health Sciences",
      "Experienced in Clinical Education & Public Health",
      "Multilingual tutor with a culturally responsive approach",
    ],

    expertise: "Health Sciences & Medical Tutor",

    strengths: [
      "MD and MSc-qualified tutor with expertise in health sciences and clinical education",
      "Personalized study plans, structured lessons, and practice-based learning",
      "Covers medical terminology, anatomy, physiology, biology, and general science",
      "Support for English writing, study skills, and exam preparation",
      "Multilingual instruction in English, Urdu, Hindi, and Punjabi",
    ],
  },

  {
    id: 7,
    name: "Aanchal Kanotra",
    role: "Actuarial, Economics & School Subjects Tutor",
    image: "/assets/tutors/aanchal.webp",

    belowshortDescription:
      "Aanchal supports students from school subjects through to actuarial exams and graduate Economics, with sessions built around each student's pace.",

    fullDescription:
      "Aanchal Kanotra is an experienced and versatile tutor who supports students across multiple academic levels and disciplines. She works with students up to Class 10 across all core subjects, with a strong emphasis on building fundamentals, developing concept clarity and preparing effectively for exams.\n\nAanchal also brings specialized expertise in Actuarial exam coaching, guiding students through CM1, CB1, CB2, CB3, CS1, CS2, CP2 and CP3 with targeted support in concepts, problem-solving techniques and exam strategy. In addition, she tutors graduate-level Economics students, helping them with conceptual understanding, assignments and exam preparation. All sessions are personalized to match each student's pace and individual learning needs.",

    education: [
      "Experienced Tutor — All Subjects up to Class 10",
      "Actuarial Exam Coach — CM1, CB1, CB2, CS1, CS2 & more",
      "Graduate-Level Economics Tutoring & Exam Prep",
    ],

    expertise: "Actuarial, Economics & School Subjects Tutor",

    strengths: [
      "All-subject tutoring for students up to Class 10 with a focus on strong fundamentals",
      "Specialized Actuarial exam coaching across CM1, CB1, CB2, CB3, CS1, CS2, CP2 and CP3",
      "Graduate-level Economics tutoring including assignments and exam preparation",
      "Fully personalized sessions adapted to each student's pace and learning style",
      "Integrated focus on concept clarity, problem-solving, and exam strategy",
    ],
  },

  {
    id: 8,
    name: "Dr. Vishal Sehgal",
    role: "Physician & Healthcare Education Tutor",
    image: "/assets/tutors/vishal.webp",

    belowshortDescription:
      "Dr. Sehgal bridges the gap between theory and real-world clinical practice, drawing on hands-on healthcare experience to bring concepts to life.",

    fullDescription:
      "Dr. Vishal Sehgal is a practicing physician and experienced healthcare educator who brings a rare combination of clinical expertise and academic excellence to every teaching session. His approach is rooted in creating an engaging, supportive learning environment that promotes critical thinking and the practical application of medical knowledge.\n\nA hallmark of Dr. Sehgal's teaching style is his ability to bridge the gap between theory and real-world clinical practice, drawing on his hands-on healthcare experience to bring concepts to life for students. Having worked with diverse student populations including international learners, he adapts his methods to suit individual learning needs and backgrounds. Dr. Sehgal is deeply committed to fostering professional growth, academic excellence and a lifelong love of learning, inspiring future healthcare professionals to lead with compassion, competence and confidence.",

    education: [
      "Physician & Healthcare Educator",
      "Extensive Experience in Clinical Practice & Academic Instruction",
      "Specialized in Teaching Diverse & International Learners",
    ],

    expertise: "Physician & Healthcare Education Tutor",

    strengths: [
      "Qualified physician with extensive clinical and academic teaching experience",
      "Integrates real-world healthcare scenarios to connect theory with practice",
      "Skilled at adapting instruction for diverse and international student populations",
      "Promotes critical thinking, professional growth, and lifelong learning",
      "Committed to building competent, compassionate future healthcare professionals",
    ],
  },

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
                  <h3 className="text-xl font-medium underline decoration-yellow-light underline-offset-6">
                    {tutor.name}
                  </h3>

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