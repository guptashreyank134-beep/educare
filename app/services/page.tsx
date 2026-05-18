import React from 'react'
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ServicesHeroSectionContent } from '@/components/GeneralComponents/content';
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "services");
  return getMetadata(data, "https://drshreyankeducare.com/services");
}
import LearningProgramsSection from '@/components/servicesPageComponents/LearningProgramsSection';


const page = () => {
  return (
    <>
      <GeneralHeroSection
        {...ServicesHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white">
        <div className="max-w-324 h-auto flex flex-col gap-45 align-middle justify-center-safe">
          <LearningProgramsSection />
        </div>
      </main>
    </>
  )
}

export default page
