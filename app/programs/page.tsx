import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ProgramsHeroSectionContent } from "@/components/GeneralComponents/content";
import ProgramsSection from "@/components/programsComponents/ProgramsSection";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import RelevantTutorProfiles from "@/components/RelevantTutorProfiles";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "programs");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs");
}

const ProgramsPage = async () => {
  const data = await getMetaDataBySlug("page", "programs");
  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs")} />
      <GeneralHeroSection
        {...ProgramsHeroSectionContent}
        description="Find support for the course your student is taking now: BC curriculum subjects, English and ESL for Grades 1–10, AP and IB courses, or university study. Explore the subject and level below, then book a free consultation to discuss the topics that need attention. Lessons are available in Burnaby and online, with a tutor matched to the student's needs."
        breadcrumb={<Breadcrumbs />}
      />
      <main className="m-auto bg-white w-full">
        <ProgramsSection />
        <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <p className="text-[16px] font-montserrat leading-relaxed text-slate/75">
            Subject knowledge and teaching approach both matter. Dr. Shreyank
            teaches mathematics, science and coding, while Niti supports English,
            ESL, mathematics and science through Grade 10. Their profiles explain
            how they build understanding through explanation and practice. Visit
            our{" "}
            <Link href="/about" className="font-medium text-primary underline underline-offset-4">
              full tutor roster
            </Link>{" "}
            for the team&apos;s additional subject specialisms, or compare{" "}
            <Link href="/pricing" className="font-medium text-primary underline underline-offset-4">
              tutoring formats and prices
            </Link>{" "}
            before booking.
          </p>
          <RelevantTutorProfiles tutorIds={[0, 9]} />
        </div>
      </main>
    </>
  );
};

export default ProgramsPage;

export const revalidate = 3600;
