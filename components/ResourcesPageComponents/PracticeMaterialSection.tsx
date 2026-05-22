import Image from "next/image";
import { Blocks, Download, FileText, Sparkles } from "lucide-react";
import { practiceMaterialData } from "./content";

interface PracticeMaterialSectionProps {
    data?: any;
}

const PracticeMaterialSection = ({ data }: PracticeMaterialSectionProps) => {
    const content = data || practiceMaterialData;
    const downloadMaterials = content.downloadMaterials || practiceMaterialData.downloadMaterials;
    const studyTips = content.studyTips || practiceMaterialData.studyTips;
    const whyPracticeHelp = content.whyPracticeHelp || practiceMaterialData.whyPraticeHelp;
    const imageUrl = data?.image || practiceMaterialData.imageUrl;
 
    console.log(data);
    
    return (
        <div className="max-w-[1296px] mt-10 w-full mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-3 max-w-[472px]">
                        <div className="relative flex-1 h-[368px] rounded-lg overflow-hidden aspect-[16/10]">
                            <Image
                                src={imageUrl}
                                alt={content.practiceMaterialSection?.imageAlt || practiceMaterialData.imageAlt}
                                fill
                                className="object-cover h-full w-full"
                                priority
                            />
                        </div>
                        <div className="shrink-0">
                            <div className="h-12 w-12 rounded-lg bg-yellow-light text-slate-900 flex items-center justify-center shadow-lg border border-slate-200">
                                <Blocks className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border-slate-200 ">
                        <div className="flex items-start gap-2 mb-5">
                            <div className="h-8 w-8 rounded-sm bg-yellow-light text-slate-900 flex items-center justify-center shadow-sm">
                                <Download className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-[22px] font-bricolage font-display font-normal text-slate-900">
                                    Download Practice Material
                                </h3>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            {downloadMaterials.map((material: any, index: number) => {
                                const downloadUrl = material.fileUrl || material.externalLink || "#";
                                return (
                                    <a 
                                        key={index} 
                                        href={downloadUrl}
                                        target={material.externalLink ? "_blank" : undefined}
                                        rel={material.externalLink ? "noopener noreferrer" : undefined}
                                        className="group rounded-3xl w-fit bg-bg-grey p-5 shadow-[0px_0px_25px_0px_#5757561A] hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <p className="text-[22px] font-semibold font-bricolage text-slate mb-2 underline decoration-2 decoration-yellow-light underline-offset-4">
                                            {material.label}
                                        </p>
                                        <div className="flex items-center gap-1 text-primary font-medium">
                                            <p className="font-montserrat text-[18px] text-primary font-medium">Download</p>
                                            <Download className="w-5 h-5"/>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 py-2.5 px-0">
                    <div className="max-w-165">
                        <h2 className="text-4xl sm:text-[32px] font-bricolage font-normal text-slate leading-8.5 mb-5">
                            {content?.heading}
                        </h2>
                        <p className="text-base font-montserrat sm:text-lg text-slate leading-7 max-w-3xl whitespace-pre-wrap">
                            {content?.description}
                        </p>
                    </div>

                    <div className="grid gap-8">
                        <div className="space-y-4">
                            <div className="flex items-start gap-2">
                                <div className="h-8 w-8 rounded-sm bg-yellow-light text-slate flex items-center justify-center">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-bricolage font-display font-normal text-slate">
                                        Study Tips
                                    </h3>
                                </div>
                            </div>
                            <ul className="space-y-3 ml-1 text-[16px] leading-relaxed font-montserrat text-slate list-disc list-inside whitespace-pre-wrap">
                                {studyTips.map((tip: any, index: number) => (
                                    <li key={index} className="">
                                        <span className="font-medium text-[16px] font-montserrat text-slate">{tip.title}</span>: <span className="font-normal text-[16px] font-montserrat text-slate">{`\n${tip.description}`}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-2">
                                <div className="h-8 w-8 rounded-sm bg-yellow-light text-slate flex items-center justify-center">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-bricolage font-display font-normal text-slate">
                                        {whyPracticeHelp.heading}
                                    </h3>
                                </div>
                            </div>
                            <ul className="space-y-3 ml-1 text-[16px] leading-relaxed font-montserrat text-slate list-disc list-inside">
                                {whyPracticeHelp.pointers?.map((pointer: string, index: number) => (
                                    <li key={index} className="font-montserrat">
                                        {pointer}
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

export default PracticeMaterialSection;
