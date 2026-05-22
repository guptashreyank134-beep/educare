import Image from "next/image";
import { Layers } from "lucide-react";
import { keySectionContent } from "../GeneralComponents/content";

const iconMap: Record<string, typeof Layers> = {
    layers: Layers,
};

const KeySection = () => {
    const Icon = iconMap[keySectionContent.icon] ?? Layers;

    return (
        <div className="max-w-324 w-full mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.85fr_0.90fr] gap-5 py-10 lg:py-5">
                <div className="flex items-start gap-2.5">
                    <div className="relative rounded-lg overflow-hidden flex-1 h-171">
                        <Image
                            src={keySectionContent.imageUrl}
                            alt={keySectionContent.imageAlt}
                            fill
                            className="object-cover object-top-left h-full w-full"
                            priority
                        />
                    </div>
                    <div className="w-12.25 h-11 rounded-lg bg-yellow-light text-slate-900 flex items-center justify-center shadow-lg border border-slate-200">
                        <Icon className="w-6 h-6" />
                    </div>
                </div>

                <div className="flex flex-col justify-center w-full xl:max-w-[350px] order-1 xl:order-2">
                    <div >
                        <h2 className="text-4xl sm:text-[48px] font-bricolage font-normal text-slate mb-5">
                            {keySectionContent.heading}
                        </h2>
                        <p className="text-base sm:text-lg text-slate-700 leading-7">
                            {keySectionContent.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-6 xl:gap-10 w-full xl:max-w-[386px] order-3 xl:order-3">
                    {keySectionContent.cards.map((card, index) => (
                        <div key={index} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <div className="inline-block border-b-2 border-yellow-light pb-1 mb-4">
                                <h3 className="text-[20px] font-bricolage font-display font-normal text-slate">
                                    {card.title}
                                </h3>
                            </div>
                            <p className="text-base text-slate-700 leading-7">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KeySection;
