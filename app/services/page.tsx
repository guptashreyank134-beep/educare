import React from 'react'
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ServicesHeroSectionContent } from '@/components/GeneralComponents/content';
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "services");
  return getMetadata(data, "https://www.drshreyankeducare.com/services");
}
import LearningProgramsSection from '@/components/servicesPageComponents/LearningProgramsSection';
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

const page = async () => {
  const data = await getMetaDataBySlug("page", "services");
  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/services")} />
      <GeneralHeroSection
        {...ServicesHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white w-[100vw] md:w-full">
        <div className="max-w-[1296px] mx-auto h-auto flex flex-col gap-12 sm:gap-24 px-4 sm:px-6 lg:px-8 w-full min-w-0">
          <LearningProgramsSection />
        </div>
      </main>
    </>
  )
}

export default page

export const revalidate = 3600;
