import React from 'react';
import Image from 'next/image';
import { Code, BookOpen } from 'lucide-react';

export default function VancouverHeroImage() {
  return (
    <div className="relative h-[300px] sm:h-[400px] w-full max-w-[500px] my-auto">
      {/* Left Floating Icon */}
      <div className="absolute top-12 -left-6 sm:-left-8 bg-yellow-light p-3 rounded-xl shadow-lg z-30">
        <Code className="text-[#1E293B] w-7 h-7" />
      </div>

      <div className="relative w-full h-full rounded-[24px] overflow-hidden border-4 border-white">
        <Image
          src="/assets/landingBanner.webp"
          alt="Classroom Tutoring"
          fill
          fetchPriority="high"
          className="object-cover"
        />
      </div>

      {/* Right Floating Icon */}
      <div className="absolute bottom-12 -right-6 sm:-right-8 bg-yellow-light p-3 rounded-xl shadow-lg z-30">
        <BookOpen className="text-[#1E293B] w-7 h-7" />
      </div>
    </div>
  );
}
