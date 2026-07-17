import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export interface PricingCardProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    features: string[];
    price: number;
    /** Top of the price range, e.g. $75–$100. NOT a former price. */
    priceMax?: number;
    priceCaption: string;
    ctaText: string;
    ctaHref?: string;
    onCtaClick?: () => void;
}

const PricingCard = ({
    icon: Icon,
    title,
    subtitle,
    features,
    price,
    priceMax,
    priceCaption,
    ctaText,
    ctaHref,
    onCtaClick,
}: PricingCardProps) => {
    return (
        <div className="w-full sm:w-[341px] min-h-[526px] rounded-lg bg-bg-grey p-10 shadow-[0px_0px_50px_0px_rgba(87,87,86,0.12)] flex flex-col transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0px_0px_60px_0px_rgba(87,87,86,0.16)] hover:border-2 hover:border-yellow-light">
            {/* Content Wrapper */}
            <div className="w-full h-full flex flex-col gap-6 justify-between flex-grow">
                <div className="flex flex-col gap-6">
                    {/* Icon Box */}
                    <div className="h-11 w-[49px] rounded-lg bg-yellow-light p-2.5 flex items-center justify-center shadow-[0px_0px_50px_0px_rgba(87,87,86,0.12)]">
                        <Icon className="h-6 w-6 text-slate" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[22px] leading-6 font-bricolage underline decoration-yellow-light underline-offset-5  font-display font-normal text-slate">
                            {title}
                        </h3>
                        <p className="text-[14px] leading-5 font-montserrat font-normal text-slate opacity-70">
                            {subtitle}
                        </p>
                    </div>

                    {/* Features List */}
                    {/* CSS marker, not a literal bullet character — the character
                        was text, so features extracted as "•Fully personalized
                        sessions". */}
                    <ul className="flex flex-col gap-2 list-disc pl-5 marker:text-primary">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="text-[16px] leading-5 font-montserrat font-normal text-slate opacity-80 pl-1"
                            >
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Divider */}
                    <div className="h-0.5 w-full bg-yellow-light opacity-60" />

                    {/* Price Section */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-3">
                            {/* A range, not a discount: `priceMax` is the top of the
                                price band (e.g. $75–$100 by subject and level), so it
                                must never be rendered as a struck-through "was" price. */}
                            {/* leading-none (line-height:1), NOT leading-1 — under
                                Tailwind v4 leading-1 = 0.25rem (4px), which crushed the
                                price's line box and made it overlap the caption below. */}
                            <span className="text-[24px] leading-none font-bricolage font-display font-semibold text-slate">
                                ${price}
                                {priceMax ? (
                                    <span className="text-[24px] font-bricolage font-display font-semibold text-slate">
                                        –${priceMax}
                                    </span>
                                ) : null}
                            </span>
                        </div>
                        <p className="text-[12px] leading-4 font-montserrat font-normal text-slate opacity-70">
                            {priceCaption}
                        </p>

                    </div>
                    <Link href={'/book'} className="w-full h-full flex items-center justify-center">
                    <Button
                        iconRight={ArrowRight}
                        onClick={onCtaClick}
                        className="w-full"
                    >
                        
                        {ctaText}
                    </Button>
                        </Link>
                </div>
            </div>
        </div>
    );
}

export default PricingCard;