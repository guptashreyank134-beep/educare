/** @format */

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  Layers,
  FileText,
  LayoutGrid,
  Sparkles,
  Rocket,
} from "lucide-react";

import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema, getFAQSchema } from "@/components/SchemaMarkup";
import VancouverFAQSection from "@/components/VancouverFAQSection";
import ProgramNextSteps from "@/components/ProgramNextSteps";
import { getProgramFaqs } from "@/sanity/lib/faqs";
import UniversityCourseTable from "@/components/UniversityCourseTable";
import CourseEnquiryForm from "@/components/CourseEnquiryForm";
import {
  ConsultationCtaLink,
  StickyConsultationBar,
} from "@/components/ConsultationCta";
import { LEAD_AUTHOR, authorPath, credentialLabel } from "@/data/authors";
import { PRICING_TEXT } from "@/data/pricing";

const ENQUIRY_ANCHOR = "university-physics-enquiry";
const FORM_ID = "university-physics-enquiry";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "university-physics");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/university-physics");
}

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-[14px]">
    <div className="bg-yellow-light h-8 w-8 flex items-center justify-center rounded-lg text-slate shadow-sm">
      <Icon size={24} />
    </div>
    <h2 className="text-[22px] font-bricolage font-normal text-slate">
      {title}
    </h2>
  </div>
);

const ListItems = ({ items }: { items: string[] }) => (
  <ul className="space-y-1 mb-8 ml-11">
    {items.map((item, index) => (
      <li
        key={index}
        className="text-[16px] font-montserrat font-normal text-slate flex items-start"
      >
        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

export default async function UniversityPhysicsPage() {
  const data = await getMetaDataBySlug("programPage", "university-physics");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("university-physics");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "University Courses", href: "/programs" },
    { label: "Physics" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/university-physics")} />
      <main className="relative min-h-screen bg-bg-grey overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute h-[1568px] inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/bigYellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-[95px] relative z-10">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 mt-10 items-start">
          {/* Left Column: Content */}
          <div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bricolage font-normal text-slate leading-tight mb-[18px]">
              University Physics Tutoring in Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                University physics combines advanced theory with heavy
                mathematical application, making it one of the most demanding
                academic subjects.
              </p>
              <p>
                At Dr. Shreyank Educare, we help students break down difficult
                concepts and build confidence through structured problem-solving
                practice.
              </p>
              <p>
                Most of our university physics students come from UBC, SFU and
                Langara — first-year mechanics and electromagnetism (the PHYS
                100-series and equivalents) through to upper-year thermodynamics,
                quantum and modern physics. We work in person at our Burnaby
                centre, a short distance from SFU, and online for students across
                Vancouver and the Lower Mainland.
              </p>
            </div>

            {/* Consultation offer. The description and the response time are the
                same ones published on /book and /contact. */}
            <div className="mb-8 rounded-[16px] border border-[#F1F5F9] bg-white/80 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <ConsultationCtaLink
                  targetId={ENQUIRY_ANCHOR}
                  formId={FORM_ID}
                  className="inline-flex shrink-0 items-center justify-center rounded-[8px] bg-primary px-5 py-3 text-[16px] font-montserrat font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Book a Free 30-Minute Consultation
                </ConsultationCtaLink>
                <p className="text-[15px] font-montserrat leading-relaxed text-slate/80">
                  One free, no-obligation 30-minute conversation: tell us where you are
                  stuck, and we map out the subject, level and schedule that would help.
                  Bring a recent test or problem set. We reply within 24 hours on
                  business days.
                </p>
              </div>
              <p className="mt-4 text-[14px] font-montserrat text-slate/70">
                One-to-one sessions are {PRICING_TEXT.oneOnOne}, varying by subject
                level — we confirm the rate for your course at the consultation. See{" "}
                <Link href="/pricing" className="text-primary underline underline-offset-2">
                  full pricing
                </Link>
                .
              </p>
            </div>

            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
                items={[
                  "Mechanics",
                  "Thermodynamics",
                  "Electromagnetism",
                  "Waves & Optics",
                  "Quantum Physics",
                  "Nuclear Physics",
                  "Vector Analysis",
                  "Advanced Problem Solving",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "Undergraduate physics students",
                  "Engineering students",
                  "Pre-med students",
                  "Students struggling with mathematical physics",
                  "Students preparing for exams",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring: Fully personalized sessions tailored to individual goals",
                  "Small Group Sessions: Collaborative learning with expert guidance",
                  "On-Demand Support: Flexible help for assignments, labs, or exam prep",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Improved grades",
                  "Stronger numerical problem solving",
                  "Better conceptual understanding",
                  "Increased confidence in labs/exams",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Simplifying Complex Theories",
                    desc: "Clear explanations of difficult scientific concepts.",
                  },
                  {
                    title: "Strengthening Mathematical Foundations",
                    desc: "Reinforcing calculus and algebra used in physics.",
                  },
                  {
                    title: "Problem-Solving Practice",
                    desc: "Extensive guided practice sessions.",
                  },
                  {
                    title: "Exam Preparation Support",
                    desc: "Targeted help before major exams.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="text-[16px] font-montserrat leading-tight text-slate"
                  >
                    <div className="flex items-start gap-2">
                      <span className="shrink-0">·</span>
                      <div>
                        <p className="font-medium mb-0.5">{item.title}</p>
                        <p className="font-normal opacity-90">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: the enquiry form, on the first screen */}
          <div id={ENQUIRY_ANCHOR} className="w-full lg:w-[400px] scroll-mt-28">
            <CourseEnquiryForm
              subject="University Physics"
              formId={FORM_ID}
              courseExample="UBC PHYS 117 or SFU PHYS 120"
            />

            {/* Who teaches it. Credentials come from the author record, so this
                cannot drift from the About page or the structured data. */}
            <div className="mt-5 rounded-[16px] border border-[#F1F5F9] bg-white/80 p-5">
              <p className="text-[14px] font-montserrat font-medium text-slate mb-1">
                Taught by {LEAD_AUTHOR.name}
              </p>
              <p className="text-[14px] font-montserrat leading-relaxed text-slate/70">
                {credentialLabel(LEAD_AUTHOR.credential)}, with over 10 years teaching
                mathematics and physics.{" "}
                <Link
                  href={authorPath(LEAD_AUTHOR.slug)}
                  className="text-primary underline underline-offset-2"
                >
                  Full profile
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Courses We Support */}
                <UniversityCourseTable subject={"Physics"} />
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="University Physics"
          relatedLinks={[
            { label: "Physics 11 & 12 tutoring", href: "/programs/physics" },
            { label: "Engineering statics tutor", href: "/engineering-statics-tutor" },
            { label: "Engineering dynamics tutor", href: "/engineering-dynamics-tutor" },
            { label: "First-year engineering tutor", href: "/first-year-engineering-tutor" },
          ]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
