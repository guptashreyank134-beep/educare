import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function VancouverFlexibleProgramsSection() {
  const options = [
    {
      title: "One-On-One Tutoring",
      image: "/assets/flex1.png",
      description: "Best for students who need personalized attention, fast improvement, or help with specific weak areas."
    },
    {
      title: "Small Group Classes",
      image: "/assets/flexi2.png",
      description: "Best for students who want structured weekly learning with peer motivation and affordable pricing."
    },
    {
      title: "Exam Preparation",
      image: "/assets/flexi3.png",
      description: "Focused support before tests, finals, Pre-Calculus exams, IB assessments, AP preparation, and school evaluations"
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[28px] sm:text-[34px] font-bricolage font-medium text-slate mb-4">
            Flexible Program Options That We Offer
          </h2>
          <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed max-w-md mx-auto">
            Choose the right support for your child from our varied range of program structures
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {options.map((option, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[8px] p-3 shadow-[0px_0px_30px_0px_#57575614] border border-gray-50 flex flex-col transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Image */}
              <div className="rounded-[8px] overflow-hidden mb-5 bg-gray-100 aspect-[4/3] relative">
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Card Content */}
              <div className="px-1 text-left flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="text-[20px] sm:text-[22px] font-bricolage font-medium text-slate inline-block border-b-2 border-yellow-light">
                    {option.title}
                  </h3>
                </div>
                
                <p className="text-[15px] font-montserrat text-slate opacity-80 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/contact">
            <Button iconRight={ArrowRight} className="px-8 py-4 text-[16px]">
              Book Free Consultation
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
