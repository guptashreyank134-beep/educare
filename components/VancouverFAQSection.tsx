import React from 'react';
import FAQAccordion from '@/components/ResourcesPageComponents/FAQAccordion';

interface FAQItem {
  _key?: string;
  question: string;
  // Portable Text blocks (rich answers) or a plain string (legacy answers).
  answer: unknown;
}

export default function VancouverFAQSection({ faqs }: { faqs?: FAQItem[] }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[32px] sm:text-[38px] font-bricolage font-medium text-slate mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed max-w-xl mx-auto">
            Have questions? We&apos;ve answered the most common questions students and parents ask before enrolling.
          </p>
        </div>

        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
