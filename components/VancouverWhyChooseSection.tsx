import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, LayoutGrid, Brain, Library, TrendingUp } from 'lucide-react';

export default function VancouverWhyChooseSection() {
  const cards = [
    {
      icon: LayoutGrid,
      title: "Concept-Based Teaching",
      description: "We do not teach students to memorize answers. We help them understand why each step works, so they can solve unfamiliar problems independently."
    },
    {
      icon: Brain,
      title: "Strong Focus On Problem Solving",
      description: "Our tutoring is especially effective for students who struggle with word problems, application questions, and multi-step exam-style problems."
    },
    {
      icon: Library,
      title: "Math, Physics, Chemistry & Coding Support",
      description: "Every subject is taught with equal importance. Students receive structured support across core academic areas, not just one subject."
    },
    {
      icon: TrendingUp,
      title: "Progress-Focused Learning",
      description: "We identify weak areas, assign targeted practice, and help parents understand what their child needs next."
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] sm:text-[38px] font-bricolage font-medium text-slate">
            Why Parents Choose Dr. Shreyank Educare
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-yellow-light rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <IconComponent className="w-6 h-6 text-slate" />
                  </div>
                  <h3 className="text-[20px] font-bricolage font-medium text-slate pr-2 leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Yellow Separator Line */}
                <div className="w-full h-[2px] bg-yellow-light/80" />

                <p className="text-[15px] font-montserrat text-slate/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/contact">
            <Button iconRight={ArrowRight} className="px-8 py-4 text-[16px]">
              Get A Free Consultation
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
