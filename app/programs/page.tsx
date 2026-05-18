import React from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ProgramsHeroSectionContent } from "@/components/GeneralComponents/content";
import ProgramsSection from "@/components/programsComponents/ProgramsSection";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "programs");
  return getMetadata(data, "https://drshreyankeducare.com/programs");
}

const ProgramsPage = () => {
  return (
    <>
      <GeneralHeroSection
        {...ProgramsHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white">
        <ProgramsSection />
      </main>
    </>
  );
};

export default ProgramsPage;
