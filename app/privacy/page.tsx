import React from "react";
import { PrivacyPolicyContent } from "@/components/PolicyPageComponents/content";
import PolicySectionComponent from "@/components/PolicyPageComponents/PolicySection";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

export async function generateMetadata() {
    try {
        const data = await getMetaDataBySlug("page", "privacy");
        return getMetadata(data, "https://drshreyankeducare.com/privacy");
    } catch {
        return {
            title: "Privacy Policy | Dr. Shreyank Educare",
            description: "Learn about how we protect your privacy and handle your personal information.",
        };
    }
}

const PrivacyPage = async () => {
    let data;
    try {
        data = await getMetaDataBySlug("page", "privacy");
    } catch (e) {}

    return (
        <>
            <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/privacy")} />
            <main className="min-h-screen max-w-7xl px-4 sm:px-6 m-auto bg-white pt-20">
                <div className="space-y-8 pt-22">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <h1 className="text-4xl font-bricolage font-semibold text-slate-900 leading-tight mb-8">
                            Privacy Policy
                        </h1>
                        <p className="text-sm font-montserrat text-slate-500 mb-4">
                            {PrivacyPolicyContent.lastUpdated}
                        </p>
                        <p className="text-lg font-montserrat text-slate-700 leading-7">
                            {PrivacyPolicyContent.introduction}
                        </p>
                    </div>
                    <PolicySectionComponent sections={PrivacyPolicyContent.sections} />
                </div>
            </main>
        </>
    );
};

export default PrivacyPage;

export const revalidate = 3600;
