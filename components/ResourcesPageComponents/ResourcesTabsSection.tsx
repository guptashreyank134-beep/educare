"use client";

import React, { useState } from "react";
import FAQAccordion from "./FAQAccordion";
import DemoVideosSection from "./DemoVideosSection";
import PracticeMaterialSection from "./PracticeMaterialSection";
import PracticeTestsSection from "./PracticeTestsSection";
import { faqData } from "./content";

interface ResourceTab {
    id: number;
    tabTitle: string;
}

const resourceTabs: ResourceTab[] = [
    { id: 1, tabTitle: "F.A.Q's" },
    { id: 2, tabTitle: "Demo Videos" },
    { id: 3, tabTitle: "Practice Material" },
    { id: 4, tabTitle: "Practice Tests" },
];

interface ResourcesTabsSectionProps {
    initialData?: any;
}

const ResourcesTabsSection = ({ initialData }: ResourcesTabsSectionProps) => {
    const [activeTabId, setActiveTabId] = useState<number>(1);

    const renderContent = () => {
        switch (activeTabId) {
            case 1:
                return (
                    <div className="max-w-324 w-full mx-auto">
                        <div className="space-y-8">
                            <div className="text-center max-w-2xl mx-auto">
                                <h2 className="text-4xl font-bricolage font-display text-slate-900 leading-tight mb-4">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-base text-slate-600 leading-7">
                                    Have questions about tutoring formats, schedules, pricing, or
                                    subjects? We&apos;ve answered the most common questions students
                                    and parents ask before enrolling.
                                </p>
                            </div>
                            <FAQAccordion items={initialData?.faqs || faqData} />
                        </div>
                    </div>
                );
            case 2:
                return <DemoVideosSection data={initialData?.videosSection} />;
            case 3:
                return <PracticeMaterialSection data={initialData?.practiceMaterialSection} />;
            case 4:
                return <PracticeTestsSection data={initialData?.practiceTestsSection} />;
            default:
                return null;
        }
    };

    return (
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 py-16 w-full min-w-0" id="faq">
            <div className="max-w-[1157px] w-full mx-auto flex flex-col gap-8 min-w-0">
                {/* Top tabs */}
                <div className="border-b-2 border-yellow-light mb-6 w-full min-w-0">
                    <div className="overflow-x-auto pb-[2px] -mb-[2px]">
                        <div className="flex gap-2 sm:gap-3 pb-4 min-w-max">
                        {resourceTabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTabId(tab.id)}
                                className={`cursor-pointer font-bricolage rounded-3xl p-5 text-[22px] font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${activeTabId === tab.id
                                    ? "bg-slate-900 text-white"
                                    : "bg-white text-slate-800 hover:bg-[#7C9FE3] hover:text-white"
                                    }`}
                            >
                                <p className="text-[22px] font-bricolage group-hover:text-bg-grey">{tab.tabTitle}</p>
                            </button>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="w-full">{renderContent()}</div>
            </div>
        </section>
    );
};

export default ResourcesTabsSection;
