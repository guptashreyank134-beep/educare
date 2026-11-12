import React from 'react'
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ExtraRelatedLinks from "@/components/ExtraRelatedLinks";
import GeneralHeroSection from "@/components/GeneralComponents/GereralHeroSection";
import { ResourcesHeroSectionContent } from '@/components/GeneralComponents/content';
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "resources");
  return getMetadata(data, "https://www.drshreyankeducare.com/resources");
}
import ResourcesTabsSection from '@/components/ResourcesPageComponents/ResourcesTabsSection';
import { getResourcePageData } from '@/utils/seoBuilder';
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import { answerPagePath, publishedAnswerPages } from "@/content/answer-pages";


const Page = async () => {
  const resourceData = await getResourcePageData();
  const pageData = await getMetaDataBySlug("page", "resources");

  return (
    <>
      <JsonLd schema={getPageSchema(pageData, "https://www.drshreyankeducare.com/resources")} />
      <GeneralHeroSection
        {...ResourcesHeroSectionContent}
        breadcrumb={<Breadcrumbs />}
      />
      <main className="min-h-screen m-auto bg-white w-[100vw] md:w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          {publishedAnswerPages.length > 0 && (
            <section aria-labelledby="learning-guides-heading" className="mb-12 sm:mb-16">
              <div className="max-w-3xl mb-6">
                <h2 id="learning-guides-heading" className="font-bricolage text-[28px] sm:text-[32px] font-medium text-slate">
                  Guides for students and parents
                </h2>
                <p className="mt-3 text-[16px] font-montserrat leading-relaxed text-slate/75">
                  Find answers to practical questions about tutoring prices, BC
                  course choices and exam preparation. Each guide explains the
                  next steps and links to relevant courses or official sources.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {publishedAnswerPages.map((guide) => (
                  <article key={guide.slug} className="rounded-2xl border border-slate/10 bg-bg-grey p-5 sm:p-6">
                    <h3 className="font-bricolage text-[21px] font-medium leading-snug text-slate">
                      <Link href={answerPagePath(guide.slug)} className="text-primary underline decoration-yellow-light decoration-2 underline-offset-4 hover:text-primary/80">
                        {guide.question}
                      </Link>
                    </h3>
                    <p className="mt-3 text-[15px] font-montserrat leading-relaxed text-slate/75">
                      {guide.metaDescription}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
          <ResourcesTabsSection initialData={resourceData} />
          <ExtraRelatedLinks links={resourceData?.relatedLinks} />
        </div>
      </main>
    </>
  )
}

export default Page

export const revalidate = 3600;
