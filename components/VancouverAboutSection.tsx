import React from 'react';
import Image from 'next/image';
import { Trophy, Zap } from 'lucide-react';

export interface VancouverAboutSectionProps {
  /** Override the section heading (city pages pass a locally-framed one). */
  heading?: string;
  /** Override the two lead paragraphs. */
  body?: string[];
  /** Override the "We Help Students Who" list. */
  points?: string[];
}

const DEFAULT_HEADING =
  "Is Your Child Struggling With Math, Science, Or Exam Confidence?";
const DEFAULT_BODY = [
  "Many students do not struggle because they are weak. They struggle because concepts are not explained clearly, problem-solving steps are skipped, or they lose confidence after repeated mistakes.",
  "At Dr. Shreyank Educare, we slow down, identify the exact gaps, and rebuild understanding from the foundation.",
];
const DEFAULT_POINTS = [
  "Feel confused in class even after paying attention",
  "Make mistakes in word problems and multi-step questions",
  "Need support in Pre-Calculus 11/12, Physics, Chemistry, or Coding",
  "Are preparing for school tests, finals, IB, AP, or competitive academic goals",
  "Need a patient teacher who explains clearly and systematically",
];

/**
 * Shared "who we help" section. City pages pass locally-framed copy so this
 * block is not byte-identical across every city — it was previously the single
 * largest duplicated block on the city landing pages.
 */
export default function VancouverAboutSection({
  heading,
  body,
  points,
}: VancouverAboutSectionProps = {}) {
  const painPoints = points?.length ? points : DEFAULT_POINTS;
  const paragraphs = body?.length ? body : DEFAULT_BODY;

  return (
    <section className="overflow-hidden mt-12 mb-20">
      <div className="mx-auto w-full max-w-[1296px] h-auto min-h-[334px]">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full h-full p-6">

          {/* Left Column: Image */}
          <div className="relative order-2 lg:order-1 w-full max-w-[341px] lg:max-w-none lg:w-[461px] h-[300px] sm:h-[400px] rounded-lg overflow-visible">
            <Image
              src="/assets/landingAbout.webp"
              alt="Student studying in classroom"
              fill
              className="object-cover rounded-lg"
              priority
            />
            {/* Floating Trophy Icon */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 h-10 w-10 rounded-lg bg-yellow-light text-primary flex items-center justify-center shadow-lg z-10">
              <Trophy className="w-6 h-6" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full order-1 lg:order-2 max-w-[665px] h-full flex flex-col justify-between align-start">
            <div>
              <h2 className="text-[32px] leading-[34px] font-bricolage font-display font-normal text-slate capitalize mb-4">
                {heading || DEFAULT_HEADING}
              </h2>

              {paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-[16px] leading-[22px] font-montserrat font-normal text-slate ${
                    idx === paragraphs.length - 1 ? "mb-8" : "mb-4"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-sm bg-yellow-light text-primary flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-3.5 align-center justify-center">
                  <h3 className="text-[22px] align-middle leading-[22px] font-bricolage font-display font-normal text-slate pt-0.5">
                    We Help Students Who
                  </h3>
                </div>
              </div>
              <ul className="space-y-2 ml-1 text-[16px] leading-relaxed font-montserrat text-slate-600 list-disc list-inside">
                {painPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
