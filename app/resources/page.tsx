import React from 'react'
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ResourcesHeroSectionContent } from '@/components/GeneralComponents/content';
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "resources");
  return getMetadata(data, "https://drshreyankeducare.com/resources");
}
import ResourcesTabsSection from '@/components/ResourcesPageComponents/ResourcesTabsSection';
import { getResourcePageData } from '@/utils/seoBuilder';



const Page = async () => {
  const resourceData = await getResourcePageData();

  return (
    <>
      <GeneralHeroSection
        {...ResourcesHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <ResourcesTabsSection initialData={resourceData} />
        </div>
      </main>
    </>
  )
}

export default Page
