import React from "react";
import { PolicySection } from "./content";

interface PolicySectionComponentProps {
    sections: PolicySection[];
}

const PolicySectionComponent: React.FC<PolicySectionComponentProps> = ({
    sections,
}) => {
    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <div className="space-y-12">
                {sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                        <h2 className="text-3xl font-bricolage font-semibold text-slate-900 leading-tight">
                            {section.heading}
                        </h2>
                        <div className="space-y-3">
                            {section.content.map((paragraph, pIndex) => (
                                <p
                                    key={pIndex}
                                    className="text-base font-montserrat text-slate-700 leading-7"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PolicySectionComponent;
