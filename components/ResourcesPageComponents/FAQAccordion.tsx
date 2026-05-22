"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
    id?: number | string;
    _key?: string;
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
    const [openIds, setOpenIds] = useState<(number | string)[]>([]);

    const toggleExpand = (id: number | string) => {
        setOpenIds((currentOpenIds) =>
            currentOpenIds.includes(id)
                ? currentOpenIds.filter((openId) => openId !== id)
                : [...currentOpenIds, id]
        );
    };

    return (
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="flex flex-col gap-10">
                {items.map((item, index) => {
                    const itemId = item._key || item.id || index;
                    const isOpen = openIds.includes(itemId);

                    return (
                        <div key={itemId} className="border-b-2 border-primary">
                            <button
                                onClick={() => toggleExpand(itemId)}
                                className="w-full flex items-start justify-between pt-5 pb-10 px-0 text-left hover:opacity-80 transition-opacity"
                                aria-expanded={isOpen}
                            >
                                <h3 className="text-xl font-montserrat font-medium text-primary leading-7">
                                    {item.question}
                                </h3>
                                <div className="shrink-0 ml-4">
                                    {isOpen ? (
                                        <Minus className="w-7 cursor-pointer h-7 text-primary font-extrabold" />
                                    ) : (
                                        <Plus className="w-7 h-7 cursor-pointer text-primary font-extrabold" />
                                    )}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="pb-5 px-0 animate-in fade-in duration-200">
                                    <p className="text-[18px] font-montserrat text-slate leading-7 whitespace-pre-wrap">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FAQAccordion;
