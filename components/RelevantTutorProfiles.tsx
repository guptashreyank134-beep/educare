import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";

import { tutors } from "@/components/aboutUsComponents/tutorsData";

export default function RelevantTutorProfiles({
  tutorIds,
}: {
  tutorIds: number[];
}) {
  const relevantTutors = tutorIds
    .map((id) => tutors.find((tutor) => tutor.id === id))
    .filter((tutor): tutor is (typeof tutors)[number] => Boolean(tutor));

  if (relevantTutors.length === 0) return null;

  return (
    <section aria-labelledby="relevant-tutors-heading" className="mt-10">
      <div className="mb-6 text-center lg:text-left">
        <h2
          id="relevant-tutors-heading"
          className="text-[26px] sm:text-[30px] font-bricolage font-medium text-slate"
        >
          Meet Your Subject Tutors
        </h2>
        <p className="mt-2 text-[15px] font-montserrat leading-relaxed text-slate/65">
          Review the qualifications and teaching strengths behind your
          personalized tutor match.
        </p>
      </div>

      <div className="space-y-5">
        {relevantTutors.map((tutor) => (
          <article
            key={tutor.id}
            className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="grid gap-0 md:grid-cols-[190px_1fr]">
              <div className="relative min-h-[240px] bg-bg-grey md:min-h-full">
                <Image
                  src={tutor.image}
                  alt={`${tutor.name}, ${tutor.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 190px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate/90 to-transparent px-4 pb-4 pt-14 text-white md:hidden">
                  <p className="text-[13px] font-montserrat font-medium">
                    Tutor profile
                  </p>
                </div>
              </div>

              <div className="min-w-0 p-5 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bricolage text-[24px] font-medium leading-tight text-slate">
                      {tutor.name}
                    </h3>
                    <p className="mt-1 text-[14px] font-montserrat font-semibold leading-snug text-primary">
                      {tutor.role}
                    </p>
                  </div>
                  <Link
                    href="/book"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-montserrat font-medium text-white transition-colors hover:bg-primary/90"
                  >
                    Book a consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {tutor.education.slice(0, 2).map((credential) => (
                    <span
                      key={credential}
                      className="inline-flex items-center gap-2 rounded-full bg-yellow-light/35 px-3 py-1.5 text-[12px] font-montserrat font-medium leading-snug text-slate"
                    >
                      <GraduationCap
                        className="h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {credential}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-[14px] sm:text-[15px] font-montserrat leading-relaxed text-slate/75">
                  {tutor.belowshortDescription}
                </p>

                <div className="mt-5 border-t border-[#E2E8F0] pt-5">
                  <p className="text-[12px] font-montserrat font-semibold uppercase tracking-[0.12em] text-slate/55">
                    Expertise and teaching strengths
                  </p>
                  <p className="mt-2 text-[15px] font-montserrat font-semibold text-slate">
                    {tutor.expertise}
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {tutor.strengths.slice(0, 4).map((strength) => (
                      <li
                        key={strength}
                        className="flex items-start gap-2 text-[13px] font-montserrat leading-relaxed text-slate/70"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/about"
                  className="mt-5 inline-flex text-[13px] font-montserrat font-medium text-primary underline decoration-yellow-light decoration-2 underline-offset-4"
                >
                  Read the full tutor profile
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
