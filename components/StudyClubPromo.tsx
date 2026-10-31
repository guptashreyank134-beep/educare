import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { STUDY_CLUB, STUDY_CLUB_PRICE } from "@/data/studyClub";

export default function StudyClubPromo() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-primary text-white shadow-[0_24px_70px_rgba(68,97,155,0.20)]">
        <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[12px] font-montserrat font-semibold uppercase tracking-widest text-yellow-light">
              <Sparkles className="h-4 w-4" /> Exclusive offer for new students
            </span>
            <h2 className="mt-5 text-[32px] sm:text-[40px] font-bricolage font-semibold">
              Homework and Study Club
            </h2>
            <p className="mt-3 max-w-3xl text-[16px] leading-7 font-montserrat text-white/85">
              A regular study routine with small-group maths and science support for Grades 9–10 in Burnaby, personally overseen by Dr. Shreyank with the Educare team.
            </p>
            <p className="mt-4 text-[15px] font-montserrat font-semibold text-yellow-light">
              12 one-hour sessions · Maximum {STUDY_CLUB.capacity} students · CAD ${STUDY_CLUB_PRICE} monthly
            </p>
          </div>
          <div className="lg:text-right">
            <p className="mb-3 text-[13px] font-montserrat font-semibold uppercase tracking-widest text-white/65">{STUDY_CLUB.statusLabel}</p>
            <Link href={STUDY_CLUB.path}><Button variant="ghost" iconRight={ArrowRight}>Explore the Study Club</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
