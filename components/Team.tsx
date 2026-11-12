import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tutors } from "@/components/aboutUsComponents/tutorsData";
import { authorPath } from "@/data/authors";

export default function Team() {
  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[32px] font-bricolage font-normal text-slate leading-[36px] mb-3">
            Learn From Expert Instructors, Focused On Growth!
          </h2>
          <p className="text-[16px] text-slate/80 leading-relaxed max-w-xl mx-auto">
            Get to know the people behind your lessons: their qualifications,
            subjects and approach to helping students understand each concept.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
          {tutors.map((tutor) => (
            <article key={tutor.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col">
              <div className="rounded-xl overflow-hidden mb-5 bg-bg-grey aspect-[4/3] relative">
                <Image
                  src={tutor.image}
                  alt={`${tutor.name}, ${tutor.role}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 45vw, 300px"
                />
              </div>
              <h3 className="text-[22px] font-bricolage font-medium text-slate">{tutor.name}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{tutor.role}</p>
              <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate/75">
                {tutor.education.map((credential) => <li key={credential}>{credential}</li>)}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-slate/75">{tutor.belowshortDescription}</p>
              <Link
                href={tutor.authorSlug ? authorPath(tutor.authorSlug) : `/about#tutor-${tutor.id}`}
                className="mt-auto pt-5 text-sm font-medium text-primary underline decoration-yellow-light decoration-2 underline-offset-4"
              >
                Read {tutor.name}’s profile
              </Link>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/about#tutor-heading" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-white hover:bg-primary/90">
            Read About Our Team <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
