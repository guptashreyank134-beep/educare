/** @format */

import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Analysis",
    description: "Diagnose Weak Areas & Work Out A Plan",
  },
  {
    number: "2",
    title: "Concepts",
    description: "Build Strong Conceptual Foundation",
  },
  {
    number: "3",
    title: "Application",
    description: "Apply To Real Problems, Utilize Learnt Concepts",
  },
  {
    number: "4",
    title: "Track",
    description: "Track Your Progress & Improve Continuously",
  },
];

export default function LearningProcess() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-136.5 mx-auto mb-10">
          <h2 className="text-[32px] font-bricolage font-display font-normal text-slate leading-[34px] mb-4">
            A Structured Learning Process, Designed To Keep You On Track
          </h2>
          <p className="text-[16px] font-sans font-normal text-slate leading-none opacity-80">
            Every step is designed to make learning simple, effective, and
            goal-oriented.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-[112px] h-[112px] bg-yellow-light rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <span className="text-[52px] font-display font-bold text-slate">
                  {step.number}
                </span>
              </div>
              <h3 className="text-[24px] leading-[24px] font-display font-bold text-slate">
                {step.title}
              </h3>
              <p className="text-[16px] font-sans font-normal text-slate leading-relaxed max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/contact">
            <Button iconRight={ArrowRight}>Get A Free Consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
