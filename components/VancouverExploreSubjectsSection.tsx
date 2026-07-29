import React from 'react';
import Link from 'next/link';
import { PlusSquare, Atom, FlaskConical, Code } from 'lucide-react';

export default function VancouverExploreSubjectsSection() {
  const subjects = [
    {
      icon: PlusSquare,
      title: "Math Tutoring",
      href: "/programs/mathematics",
      items: [
        "Grades 6–10 Math",
        "Pre-Calculus 11",
        "Pre-Calculus 12",
        "Calculus Foundations",
        "Word Problems",
        "Exam Preparation"
      ]
    },
    {
      icon: Atom,
      title: "Physics Tutoring",
      href: "/programs/physics", 
      items: [
        "Forces and Motion",
        "Energy and Momentum",
        "Electricity and Circuits",
        "Waves",
        "Test and Exam Preparation"
      ]
    },
    {
      icon: FlaskConical,
      title: "Chemistry Tutoring",
      href: "/programs/chemistry",
      items: [
        "Chemical Reactions",
        "Stoichiometry",
        "Acids and Bases",
        "Organic Chemistry Basics",
        "IB/AP Chemistry Support"
      ]
    },
    {
      icon: Code,
      title: "Coding & STEM Tutoring",
      href: "/programs/computer-science",
      items: [
        "Beginner Coding",
        "Python Basics",
        "Logic Building",
        "Robotics and STEM Projects",
        "Problem-Solving Skills"
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Grid Background - subtle, primarily on left */}
      <div
        className="absolute left-0 top-0 w-1/3 h-full z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[26px] sm:text-[32px] font-bricolage font-display font-normal text-slate leading-[34px] mb-[14px]">
            Explore Subjects That We Offer
            <br />
            Designed Around Your Academic Goals
          </h2>
          <p className="text-[16px] font-sans font-normal text-slate opacity-80 leading-relaxed max-w-xl mx-auto">
            Tailored curriculum designed to build stronger understanding and academic confidence.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Link
                href={subject.href}
                key={index}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_30px_0_rgba(87,87,86,0.06)] hover:-translate-y-2 hover:shadow-[0_10px_40px_0_rgba(87,87,86,0.1)] transition-all duration-300 border border-slate-100 flex flex-col h-full group"
              >
                <div className="w-[44px] h-[44px] bg-yellow-light rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-slate" size={22} strokeWidth={1.5} />
                </div>

                <div className="mb-6">
                  <h3 className="text-[18px] sm:text-[20px] font-bricolage font-display font-medium text-slate inline-block border-b-[3px] border-yellow-light pb-1">
                    {subject.title}
                  </h3>
                </div>

                <ul className="space-y-2 flex-grow list-disc pl-5 marker:text-slate/40">
                  {subject.items.map((item, idx) => (
                    <li key={idx} className="text-[14px] text-slate/70 font-montserrat leading-snug pl-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
