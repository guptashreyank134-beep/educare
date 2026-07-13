"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PortableText } from "@portabletext/react";

interface FAQItem {
    id?: number | string;
    _key?: string;
    question: string;
    // Rich text (Portable Text blocks) for new answers, or a plain string for
    // legacy answers that haven't been re-saved in Studio yet.
    answer: unknown;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

// Renders links inside FAQ answers, matching the blog's link styling.
const faqPortableTextComponents = {
    block: {
        normal: ({ children }: any) => (
            <p className="text-[18px] font-montserrat text-slate leading-7 mb-4 last:mb-0">
                {children}
            </p>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-6 mb-4 space-y-2 text-[18px] font-montserrat text-slate leading-7">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-[18px] font-montserrat text-slate leading-7">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => <li>{children}</li>,
        number: ({ children }: any) => <li>{children}</li>,
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-semibold text-slate">{children}</strong>
        ),
        em: ({ children }: any) => <em className="italic">{children}</em>,
        link: ({ children, value }: any) => {
            const href: string = value?.href || "#";
            const isExternal =
                /^https?:\/\//.test(href) && !href.includes("drshreyankeducare.com");
            return (
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-primary underline hover:text-primary/80 transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
};

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
                                    {Array.isArray(item.answer) ? (
                                        <div className="text-[18px] font-montserrat text-slate leading-7">
                                            <PortableText
                                                value={item.answer as any}
                                                components={faqPortableTextComponents}
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-[18px] font-montserrat text-slate leading-7 whitespace-pre-wrap">
                                            {item.answer as string}
                                        </p>
                                    )}
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
