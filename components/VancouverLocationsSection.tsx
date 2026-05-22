import React from 'react';
import Image from 'next/image';
import { MonitorPlay } from 'lucide-react'; // Represents online tutoring

export default function VancouverLocationsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-[0px_0px_25px_0px_#5757561A] rounded-[8px] p-8 lg:p-12 border border-gray-50">

          {/* Left Column: Content */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center">
            <h2 className="text-[32px] font-bricolage font-normal text-slate leading-[1.2] mb-6">
              Serving Students Across Burnaby, Vancouver And Nearby Areas
            </h2>

            <p className="text-[16px] font-montserrat font-normal text-slate leading-relaxed mb-6">
              We support students from Burnaby, Vancouver, Metrotown, Delta, New Westminster, Richmond, Surrey, and nearby communities through both in-person and online tutoring options.
            </p>

            <p className="text-[16px] font-montserrat font-normal text-slate leading-relaxed">
              Parents choose us because we combine academic expertise with patient, student-friendly teaching.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-[40%] relative">
            <div className="relative w-full aspect-[4/3] rounded-8px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <Image
                src="/assets/vancouver.jpg"
                alt="Vancouver Skyline"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Icon */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-yellow-light p-3.5 rounded-xl shadow-lg z-10 flex items-center justify-center">
              <MonitorPlay className="text-slate w-6 h-6" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
