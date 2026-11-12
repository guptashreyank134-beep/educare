import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";

import { tutors } from "@/components/aboutUsComponents/tutorsData";
import { authorPath, credentialYears } from "@/data/authors";

export default function RelevantTutorProfiles({
  tutorIds,
  heading = "Meet Your Subject Tutors",
  showFullBiography = false,
  idPrefix = "subject-tutor",
}: {
  tutorIds: number[];
  heading?: string;
  showFullBiography?: boolean;
  idPrefix?: string;
}) {
  const relevantTutors = tutorIds
    .map((id) => tutors.find((tutor) => tutor.id === id))
    .filter((tutor): tutor is (typeof tutors)[number] => Boolean(tutor));

  if (relevantTutors.length === 0) return null;

  return (
    <section aria-labelledby={`${idPrefix}-heading`}>
      <div className="mb-6 text-center lg:text-left">
        <h2
          id={`${idPrefix}-heading`}
          className="text-[26px] sm:text-[30px] font-bricolage font-medium text-slate"
        >
          {heading}
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
            id={`${idPrefix}-${tutor.id}`}
            className="scroll-mt-28 overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="grid gap-0 md:grid-cols-[210px_minmax(0,1fr)]">
              <div className="flex justify-center p-5 pb-0 md:pr-0 md:pb-5">
                <div className="relative aspect-[4/5] w-40 self-start overflow-hidden rounded-2xl bg-bg-grey md:w-full">
                  <Image
                    src={tutor.image}
                    alt={`${tutor.name}, ${tutor.role}`}
                    fill
                    sizes="(max-width: 767px) 160px, 190px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="min-w-0 p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
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

                {tutor.credential?.institution && (
                  <p className="mt-3 text-sm text-slate/70">
                    {[tutor.credential.institution, credentialYears(tutor.credential)].filter(Boolean).join(", ")}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {tutor.education.map((credential) => (
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

                {showFullBiography && (
                  <p className="mt-4 whitespace-pre-line text-[14px] sm:text-[15px] font-montserrat leading-relaxed text-slate/75">
                    {tutor.bio || tutor.fullDescription}
                  </p>
                )}

                <div className="mt-5 border-t border-[#E2E8F0] pt-5">
                  <p className="text-[12px] font-montserrat font-semibold uppercase tracking-[0.12em] text-slate/55">
                    Expertise and teaching strengths
                  </p>
                  <p className="mt-2 text-[15px] font-montserrat font-semibold text-slate">
                    {tutor.expertise}
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {(showFullBiography ? tutor.strengths : tutor.strengths.slice(0, 4)).map((strength) => (
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

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-primary">
                  {(!showFullBiography || tutor.authorSlug) && (
                    <Link
                      href={tutor.authorSlug ? authorPath(tutor.authorSlug) : `/about#tutor-${tutor.id}`}
                      className="underline decoration-yellow-light decoration-2 underline-offset-4"
                    >
                      Read {tutor.name}’s full profile
                    </Link>
                  )}
                  {showFullBiography && tutor.profiles?.linkedin && (
                    <a href={tutor.profiles.linkedin} target="_blank" rel="noopener noreferrer me" className="underline underline-offset-4">LinkedIn</a>
                  )}
                  {showFullBiography && tutor.profiles?.scholar && (
                    <a href={tutor.profiles.scholar} target="_blank" rel="noopener noreferrer me" className="underline underline-offset-4">Google Scholar</a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
