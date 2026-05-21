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
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

const PricingPage = async () => {
    const data = await getMetaDataBySlug("page", "pricing");
    return (
        <>
            <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/pricing")} />
            <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-20">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 z-0 opacity-150 pointer-events-none"
                    style={{
                        backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <HeroBreadcrumb nearHeader>
                        <Breadcrumbs />
                    </HeroBreadcrumb>
                <main className="relative z-10 bg-white">
                    <PricingSection
                        heading={pricingSectionContent.heading}
                        subheading={pricingSectionContent.subheading}
                        cards={pricingSectionContent.cards}
                    />
                </main>
                    <div className="max-w-[1296px] mx-auto h-auto flex flex-col gap-12 sm:gap-24">
                        <LearningProcess />
                    </div>
                </div>

            </section>

        </>

    );
}

export default PricingPage;
export const revalidate = 3600;
