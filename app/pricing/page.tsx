import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PricingSection from "@/components/PricingComponent/PricingSection";
import { pricingSectionContent } from "./content";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import HeroBreadcrumb from "@/components/GeneralComponents/HeroBreadcrumb";

export async function generateMetadata() {
    const data = await getMetaDataBySlug("page", "pricing");
    return getMetadata(data, "https://drshreyankeducare.com/pricing");
}
import LearningProcess from "@/components/LearningProcess";

const PricingPage = () => {
    return (
        <>
            <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-20">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 z-0 opacity-100 pointer-events-none"
                    style={{
                        backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <HeroBreadcrumb>
                        <Breadcrumbs />
                    </HeroBreadcrumb>
                </div>
                <main className="relative z-10 bg-white">
                    <PricingSection
                        heading={pricingSectionContent.heading}
                        subheading={pricingSectionContent.subheading}
                        cards={pricingSectionContent.cards}
                    />
                    <div className="max-w-324 h-auto flex flex-col gap-45 align-middle justify-center-safe">
                        <LearningProcess />
                    </div>
                </main>

            </section>

        </>

    );
}

export default PricingPage;