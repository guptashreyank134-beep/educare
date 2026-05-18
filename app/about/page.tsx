import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import MakesUsDifferenceSection from "@/components/aboutUsComponents/MakesUsDifferenceSection";
import LearningProcess from "@/components/LearningProcess";
import { AboutHeroSectionContent } from "@/components/GeneralComponents/content";
import ReadAboutTutors from "@/components/aboutUsComponents/ReadAboutTutors";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import KeySection from "@/components/aboutUsComponents/KeySection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";


export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "about");
  return getMetadata(data, "https://drshreyankeducare.com/about");
}
import TrustedBrands from "@/components/TrustedBrands";

const AboutUs = () => {
  return (
    <>
      <GeneralHeroSection
        {...AboutHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white">
        <div className="max-w-324 h-auto flex flex-col gap-45 align-middle justify-center-safe">
          <MakesUsDifferenceSection />
          <LearningProcess />
          <ReadAboutTutors />
          <TrustedBrands />
          <KeySection />
        </div>
      </main>
    </>

  );
}

export default AboutUs;