/** @format */

import { Button } from "./ui/Button";
import { ArrowRight, Code, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const metrics = [
  { value: "10+ Years", label: "of teaching experience!" },
  { value: "90% Success", label: "rate in students!" },
  { value: "30% Improvement", label: "in overall grades!" },
];

export default function HomeBanner() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <h1 className="text-[42px] font-bricolage font-display font-normal text-slate leading-none mb-6">
              Personalized Learning, That Works At Every Level!
            </h1>
            <p className="text-[18px] font-sans font-normal text-slate mb-8 leading-none">
              From math and science to coding and exam preparation, our
              structured approach helps students build clarity, confidence, and
              consistent academic improvement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/programs">
                <Button iconRight={ArrowRight}>Explore Our Programs</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" iconRight={ArrowRight}>
                  Get A Free Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Grid */}
          <div className="relative lg:mt-0 mt-12 flex justify-center lg:justify-end">
            <div className="relative max-w-[500px] w-full">
              {/* Decorative background circle */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#3A5A98]/5 rounded-full blur-3xl" />

              <div className="relative overflow-hidden p-2">
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src="/assets/homeBanner.webp"
                    alt="Personalized Learning"
                    width={265}
                    height={478}
                    className="w-[265px] h-[478px] object-cover transform hover:scale-[1.02] transition-transform duration-700"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements to mimic screenshot feel */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Code
                    className="text-yellow-600"
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wider">
                    Coding
                  </p>
                  <p className="text-sm text-gray-900 font-display font-bold">
                    Interactive
                  </p>
                </div>
              </div>

              <div className="absolute -top-6 right-36 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                  <BookOpen
                    className="text-primary"
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wider">
                    Learning
                  </p>
                  <p className="text-sm text-gray-900 font-display font-bold">
                    Resources
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-all"
              >
                <p className="text-[34px] font-bricolage font-display font-medium text-primary leading-none mb-2">
                  {metric.value}
                </p>
                <p className="text-[20px] font-sans font-normal text-slate leading-none">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
