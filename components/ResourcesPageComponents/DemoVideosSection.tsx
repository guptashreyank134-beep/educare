import Image from "next/image";
import { BookOpen, Play } from "lucide-react";
import { demoVideoData } from "./content";

interface DemoVideosSectionProps {
    data?: any;
}

const DemoVideosSection = ({ data }: DemoVideosSectionProps) => {
    const content = data || demoVideoData;
    const learningPoints = content.learningPoints || demoVideoData.learningPoints;
    const categories = content.categories || demoVideoData.categories;
    const imageUrl = data?.image || demoVideoData.imageUrl;

    return (
        <div className="max-w-324 mt-10 w-full mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-3 max-w-118">
                        <div className="relative flex-1 h-92 rounded-lg overflow-hidden aspect-16/10">
                            <Image
                                src={imageUrl}
                                alt={content.imageAlt || demoVideoData.imageAlt}
                                fill
                                className="object-cover h-full w-full"
                                priority
                            />
                        </div>
                        <div className="shrink-0">
                            <div className="h-12 w-12 rounded-lg bg-yellow-light text-slate-900 flex items-center justify-center shadow-lg border border-slate-200">
                                <Play className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        <div className="bg-white max-w-103.5 rounded-lg border-slate-200 shadow-sm p-5">
                            <h3 className="text-[22px] font-bricolage underline underline-offset-4 decoration-yellow-light decoration-2 font-semibold text-slate mb-3">
                                {learningPoints.heading}
                            </h3>
                            <ul className="space-y-2 text-[16px] font-montserrat text-slate-700 leading-4 list-disc list-inside">
                                {learningPoints.pointers?.map((point: string, pointIndex: number) => (
                                    <li key={pointIndex}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 py-2.5 px-0">
                    <div className="max-w-[660px]">
                        <h2 className="text-4xl sm:text-[32px] font-bricolage font-normal text-slate-900 leading-[34px] mb-5">
                            {content.heading}
                        </h2>
                        <p className="text-base sm:text-lg font-montserrat text-slate-700 leading-7 max-w-3xl whitespace-pre-wrap">
                            {content.description}
                        </p>
                    </div>

                    <div className="grid gap-8">
                        <div className="space-y-4">
                            <div className="flex items-start gap-2">
                                <div className="h-8 w-8 rounded-sm bg-yellow-light text-slate-900 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-bricolage font-display font-normal text-slate-900">
                                        Featured Video Categories
                                    </h3>
                                </div>
                            </div>
                            <ul className="space-y-3 ml-1 text-[16px] leading-relaxed font-montserrat text-slate list-disc list-inside">
                                {categories.map((category: any, index: number) => (
                                    <li key={index} className="py-2 whitespace-break-spaces">
                                        <span className="font-medium font-montserrat text-slate">{category.title}</span><span className="font-normal text-base font-montserrat text-slate"> {category.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoVideosSection;
