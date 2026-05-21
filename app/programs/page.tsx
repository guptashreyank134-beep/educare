import React from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ProgramsHeroSectionContent } from "@/components/GeneralComponents/content";
import ProgramsSection from "@/components/programsComponents/ProgramsSection";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "programs");
  return getMetadata(data, "https://drshreyankeducare.com/programs");
}

const ProgramsPage = async () => {
  const data = await getMetaDataBySlug("page", "programs");
  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/programs")} />
      <GeneralHeroSection
        {...ProgramsHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white w-[100vw] md:w-full">
        <ProgramsSection />
      </main>
    </>
  );
};

export default ProgramsPage;

export const revalidate = 3600;
