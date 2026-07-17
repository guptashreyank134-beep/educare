import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import MakesUsDifferenceSection from "@/components/aboutUsComponents/MakesUsDifferenceSection";
import LearningProcess from "@/components/LearningProcess";
import { AboutHeroSectionContent } from "@/components/GeneralComponents/content";
import ReadAboutTutors from "@/components/aboutUsComponents/ReadAboutTutors";
import { tutors } from "@/components/aboutUsComponents/tutorsData";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema, getTutorsSchema, getFounderSchema } from "@/components/SchemaMarkup";
import KeySection from "@/components/aboutUsComponents/KeySection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "about");
  return getMetadata(data, "https://www.drshreyankeducare.com/about");
}
import TrustedBrands from "@/components/TrustedBrands";
import Reviews from "@/components/Reviews";

const AboutUs = async () => {
  const data = await getMetaDataBySlug("page", "about");
  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/about")} />
      {/* Person markup for the tutors the page actually names. */}
      <JsonLd schema={getTutorsSchema(tutors)} />
      {/* Dedicated founder entity (shares @id with Organization.founder). */}
      <JsonLd schema={getFounderSchema()} />
      <GeneralHeroSection
        {...AboutHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white w-[100vw] md:w-full">
        <div className="max-w-[1296px] mx-auto h-auto flex flex-col gap-16 sm:gap-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <MakesUsDifferenceSection />
          <LearningProcess />
          <ReadAboutTutors />
          <TrustedBrands />
          <KeySection />
          <Reviews />
        </div>
      </main>
    </>

  );
}

export default AboutUs;
export const revalidate = 3600;
