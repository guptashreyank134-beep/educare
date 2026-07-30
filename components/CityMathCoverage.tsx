/** @format */

import Link from "next/link";

// Math-focused coverage block for the /math-tutor-<city> pages. Keeps the bulk
// of each city page specifically about mathematics (per the page's intent and
// URL), with other subjects relegated to a brief related-services strip.

const MATH_AREAS: { heading: string; items: string[] }[] = [
  {
    heading: "Grades 6–12 (BC curriculum)",
    items: [
      "Number sense, algebra and problem-solving foundations",
      "Foundations of Mathematics 11 & 12",
      "Functions, quadratics and coordinate geometry",
      "Trigonometry, exponents and logarithms",
      "Word problems and applied reasoning",
    ],
  },
  {
    heading: "Senior math & the calculus on-ramp",
    items: [
      "Pre-Calculus 11 — the jump many students feel first",
      "Pre-Calculus 12 — transformations, identities, series",
      "Calculus 12 — an introduction to limits and derivatives",
      "Final-exam and unit-test preparation",
    ],
  },
  {
    heading: "University mathematics",
    items: [
      "First- and second-year calculus, linear algebra and statistics",
      "Selected UBC, SFU and Langara courses (by tutor availability)",
      "Assignment support and exam preparation",
    ],
  },
];

export default function CityMathCoverage({ cityName }: { cityName: string }) {
  const isBurnaby = cityName === "Burnaby";
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
      <h2 className="text-[26px] sm:text-[32px] font-bricolage font-medium text-slate mb-3">
        The Mathematics We Tutor in {cityName}
      </h2>
      <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-8 max-w-[720px]">
        From Grade&nbsp;6 fundamentals through Pre-Calculus 12 and first-year
        university math, one-on-one or in a small group —{" "}
        {isBurnaby
          ? "in person at our Burnaby studio or online."
          : `online for ${cityName} students, with in-person sessions available at our Burnaby studio.`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MATH_AREAS.map((area) => (
          <div
            key={area.heading}
            className="bg-bg-grey rounded-[12px] border border-[#F1F5F9] p-6"
          >
            <h3 className="text-[18px] font-bricolage font-medium text-slate mb-3">
              {area.heading}
            </h3>
            <ul className="space-y-2">
              {area.items.map((it) => (
                <li
                  key={it}
                  className="text-[15px] font-montserrat text-slate/80 flex items-start"
                >
                  <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/programs/pre-calculus"
          className="text-[15px] font-montserrat font-medium text-primary underline decoration-2 underline-offset-4 decoration-yellow-light hover:text-primary/80"
        >
          Pre-Calculus 11 & 12 →
        </Link>
        <Link
          href="/programs/university-mathematics"
          className="text-[15px] font-montserrat font-medium text-primary underline decoration-2 underline-offset-4 decoration-yellow-light hover:text-primary/80"
        >
          University mathematics →
        </Link>
        <Link
          href="/pricing"
          className="text-[15px] font-montserrat font-medium text-primary underline decoration-2 underline-offset-4 decoration-yellow-light hover:text-primary/80"
        >
          See pricing →
        </Link>
      </div>

      {/* Brief related-services strip — other subjects live on their own pages. */}
      <div className="mt-10 pt-6 border-t border-[#F1F5F9]">
        <p className="text-[14px] font-montserrat text-slate/60 mb-2">
          Beyond mathematics, we also tutor:
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] font-montserrat">
          <Link href="/programs/physics" className="text-slate hover:text-primary underline decoration-[#E2E8F0] underline-offset-4">Physics</Link>
          <Link href="/programs/chemistry" className="text-slate hover:text-primary underline decoration-[#E2E8F0] underline-offset-4">Chemistry</Link>
          <Link href="/programs/biology" className="text-slate hover:text-primary underline decoration-[#E2E8F0] underline-offset-4">Biology</Link>
          <Link href="/programs/computer-science" className="text-slate hover:text-primary underline decoration-[#E2E8F0] underline-offset-4">Computer Science &amp; coding</Link>
          <Link href="/programs/ib-ap-tutoring" className="text-slate hover:text-primary underline decoration-[#E2E8F0] underline-offset-4">IB &amp; AP</Link>
        </div>
      </div>
    </section>
  );
}
