import React from "react";
import { TermsAndConditionsContent } from "@/components/PolicyPageComponents/content";
import PolicySectionComponent from "@/components/PolicyPageComponents/PolicySection";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

export async function generateMetadata() {
    try {
        const data = await getMetaDataBySlug("page", "terms");
        return getMetadata(data, "https://www.drshreyankeducare.com/terms");
    } catch {
        return {
            title: "Terms and Conditions | Dr. Shreyank Educare",
            description: "Read our terms and conditions for using our website and services.",
        };
    }
}

const TermsPage = async () => {
    let data;
    try {
        data = await getMetaDataBySlug("page", "terms");
    } catch (e) {}
    
    return (
        <>
            <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/terms")} />
            <main className="min-h-screen max-w-7xl px-4 sm:px-6 m-auto bg-white pt-20">
                <div className="space-y-8 pt-22">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <h1 className="text-4xl font-bricolage font-semibold text-slate-900 leading-tight mb-8">
                            Terms and Conditions
                        </h1>
                        <p className="text-sm font-montserrat text-slate-500 mb-4">
                            {TermsAndConditionsContent.lastUpdated}
                        </p>
                        <p className="text-lg font-montserrat text-slate-700 leading-7">
                            {TermsAndConditionsContent.introduction}
                        </p>
                    </div>
                    <PolicySectionComponent sections={TermsAndConditionsContent.sections} />
                </div>
            </main>
        </>
    );
};

export default TermsPage;

export const revalidate = 3600;
