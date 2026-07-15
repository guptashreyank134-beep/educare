import PricingCard from "@/components/PricingComponent/PricingCard";
import type { PricingCardProps } from "@/components/PricingComponent/PricingCard";
import type { LucideIcon } from "lucide-react";

export interface PricingCardItem extends Omit<PricingCardProps, "icon"> {
  icon: LucideIcon;
}

interface PricingSectionProps {
    heading: string;
    subheading: string;
    cards: PricingCardItem[];
}

 const PricingSection =({
    heading,
    subheading,
    cards,
}: PricingSectionProps) => {
    return (
        <section className="py-10 bg-white overflow-hidden">
            <div className="mx-auto w-full max-w-[1296px] flex flex-col gap-10 px-4 sm:px-6 lg:px-8">
                {/* Heading Wrapper */}
                <div className="w-full max-w-[683px] h-auto mx-auto gap-3 flex flex-col items-center justify-center">
                    <h1 className="text-[28px] sm:text-[32px] leading-[40px] sm:leading-[44px] font-bricolage font-display font-normal text-slate text-center">
                        {heading}
                    </h1>
                    <p className="text-[14px] sm:text-[16px] leading-5 sm:leading-6 font-montserrat font-normal text-slate opacity-80 text-center">
                        {subheading}
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="w-full flex flex-col sm:flex-row flex-wrap justify-center gap-10 items-stretch mx-auto">
                    {cards.map((card, index) => (
                        <PricingCard
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            subtitle={card.subtitle}
                            features={card.features}
                            price={card.price}
                            priceMax={card.priceMax}
                            priceCaption={card.priceCaption}
                            ctaText={card.ctaText}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PricingSection;