import Image from "next/image";
import Link from "next/link";

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
    <section aria-labelledby="relevant-tutors-heading" className="mt-8">
      <div className="mb-4">
        <h2
          id="relevant-tutors-heading"
          className="text-[22px] font-bricolage font-medium text-slate"
        >
          Meet Tutors for This Subject
        </h2>
        <p className="mt-1 text-[14px] font-montserrat leading-relaxed text-slate/65">
          We match each learner with a tutor whose verified background fits the
          course, level and goals discussed during the consultation.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {relevantTutors.map((tutor) => (
          <article
            key={tutor.id}
            className="flex gap-4 rounded-[16px] border border-[#E2E8F0] bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
          >
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-bg-grey">
              <Image
                src={tutor.image}
                alt={`${tutor.name}, ${tutor.role}`}
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-bricolage text-[18px] font-medium leading-tight text-slate">
                {tutor.name}
              </h3>
              <p className="mt-1 text-[13px] font-montserrat font-medium leading-snug text-primary">
                {tutor.role}
              </p>
              <p className="mt-2 text-[13px] font-montserrat leading-relaxed text-slate/70">
                {tutor.education.slice(0, 2).join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/about"
        className="mt-4 inline-flex text-[14px] font-montserrat font-medium text-primary underline decoration-yellow-light decoration-2 underline-offset-4"
      >
        Read full tutor profiles
      </Link>
    </section>
  );
}
