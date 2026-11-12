import React from 'react'
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ServicesHeroSectionContent } from '@/components/GeneralComponents/content';
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "services");
  return getMetadata(data, "https://www.drshreyankeducare.com/services");
}
import LearningProgramsSection from '@/components/servicesPageComponents/LearningProgramsSection';
import HowSessionsWork from '@/components/servicesPageComponents/HowSessionsWork';
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import RelevantTutorProfiles from "@/components/RelevantTutorProfiles";

const page = async () => {
  const data = await getMetaDataBySlug("page", "services");
  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/services")} />
      <GeneralHeroSection
        {...ServicesHeroSectionContent}
        description="Choose individual tutoring, small-group learning or exam preparation around the support your student needs. Our Burnaby-based team teaches in person and online, from English and ESL for Grades 1–10 to school mathematics and science, university courses and specialist subjects. We discuss the current course, learning gaps and goals before recommending a tutor and format."
        breadcrumb={<Breadcrumbs />}
      />
      <main className="m-auto bg-white w-full">
        <div className="max-w-[1296px] mx-auto flex flex-col px-4 sm:px-6 lg:px-8 w-full min-w-0">
          <LearningProgramsSection />
          <HowSessionsWork />
          <div className="mx-auto w-full max-w-5xl pb-12 sm:pb-16">
            <p className="mb-6 text-[16px] font-montserrat leading-relaxed text-slate/75">
              A useful tutor match starts with the subject and level. Dr. Shreyank
              supports mathematics, science and coding; Niti teaches English and
              ESL for Grades 1–10, plus mathematics and science through Grade 10.
              For medical sciences, engineering, actuarial studies and other
              specialist support, explore our{" "}
              <Link href="/about" className="font-medium text-primary underline underline-offset-4">
                full teaching team and their qualifications
              </Link>.
            </p>
            <RelevantTutorProfiles tutorIds={[0, 9]} />
          </div>
        </div>
      </main>
    </>
  )
}

export default page

export const revalidate = 3600;
