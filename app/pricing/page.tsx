import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PricingSection from "@/components/PricingComponent/PricingSection";
import { pricingSectionContent } from "./content";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import HeroBreadcrumb from "@/components/GeneralComponents/HeroBreadcrumb";

export async function generateMetadata() {
    const data = await getMetaDataBySlug("page", "pricing");
    return getMetadata(data, "https://www.drshreyankeducare.com/pricing");
}
import LearningProcess from "@/components/LearningProcess";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

const PricingPage = async () => {
    const data = await getMetaDataBySlug("page", "pricing");
    return (
        <>
            <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/pricing")} />
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

                    {/* Contextual links out to where we actually teach. Someone
                        comparing prices next wants to know "do you cover my area
                        and my subject?" — descriptive anchors, not "learn more". */}
                    <section className="max-w-[1096px] mx-auto px-4 sm:px-6 pb-16">
                        <div className="rounded-[20px] border border-[#F1F5F9] bg-bg-grey p-8 sm:p-10">
                            <h2 className="text-[24px] sm:text-[28px] font-bricolage font-medium text-slate mb-3">
                                These rates apply wherever you learn with us
                            </h2>
                            <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed mb-6">
                                The same pricing covers in-person sessions at our Burnaby
                                centre and online tutoring across Metro Vancouver — there is
                                no premium for either.
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                {[
                                    { label: "Math tutoring in Burnaby", href: "/math-tutor-burnaby" },
                                    { label: "Math tutoring in Vancouver", href: "/math-tutor-vancouver" },
                                    { label: "Our tutoring programs by subject", href: "/programs" },
                                    { label: "How to choose a math tutor in Burnaby", href: "/how-to-choose-a-math-tutor-in-burnaby" },
                                    { label: "Book a free 30-minute consultation", href: "/contact" },
                                ].map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors"
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
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
