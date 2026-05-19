/** @format */

import { Button } from "./ui/Button";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FocusedLearning() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative max-w-lg mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(58,90,152,0.15)]">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/assets/focusedLearning.webp"
                  alt="Focused Learning Experience"
                  width={449}
                  height={429}
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>

            {/* Trophy Icon */}
            <div className="absolute top-6 -right-20  flex items-center justify-center transform rotate-[-5deg] hover:rotate-0 transition-transform">
              <Image
                src="/icons/trophy.svg"
                alt="Trophy"
                width={150}
                height={150}
              />
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-[32px] font-display font-normal text-slate leading-[34px] mb-[14px]">
              A Focused Learning Experience Designed For Consistent Academic
              Growth
            </h2>

            <p className="text-[16px] font-sans font-normal text-slate leading-relaxed mb-5 opacity-80">
              At Dr. Shreyank Educare, we focus on simplifying concepts,
              building structured learning paths, and ensuring every session
              leads to measurable progress. The goal isn't just to complete the
              syllabus, but to help students truly understand, apply, and
              improve consistently.
            </p>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-light rounded flex items-center justify-center shadow-sm text-slate">
                  <Zap size={24} />
                </div>
                <h3 className="text-[20px] font-bricolage font-sans font-medium text-slate">
                  What We Offer
                </h3>
              </div>

              <ul className="space-y-1">
                {[
                  "Personalized Learning That Adapts to Every Student",
                  "Strong focus on concept clarity and understanding",
                  "Structured study plans with clear direction",
                  "Continuous progress tracking and feedback",
                  "Flexible scheduling to suit your routine",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-2.5 shrink-0 opacity-60"></span>
                    <span className="text-[16px] font-normal text-slate opacity-80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/about">
              <Button iconRight={ArrowRight}>More About Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
