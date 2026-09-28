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
import CourseConsultationPanel from "@/components/CourseConsultationPanel";
import {
  ConsultationCtaLink,
  StickyConsultationBar,
} from "@/components/ConsultationCta";
import { PROGRAM_ENQUIRY, programAnchor } from "@/content/program-enquiry";
import { PRICING_TEXT } from "@/data/pricing";
import { getProgramFaqs, getProgramBodyContent } from "@/sanity/lib/faqs";
import UniversityCourseTable from "@/components/UniversityCourseTable";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";
import RichBody from "@/components/RichBody";

const ENQUIRY_ANCHOR = programAnchor("chemistry");
const FORM_ID = ENQUIRY_ANCHOR;
const ENQUIRY = PROGRAM_ENQUIRY["chemistry"];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "chemistry");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/chemistry");
}

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-[14px]">
    <div className="bg-yellow-light h-8 w-8  flex items-center justify-center rounded-lg text-slate shadow-sm">
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

export default async function ChemistryProgramPage() {
  const data = await getMetaDataBySlug("programPage", "chemistry");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("chemistry");
  const bodyContent = await getProgramBodyContent("chemistry");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Chemistry" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/chemistry")} />
      <main className="relative min-h-screen bg-bg-grey overflow-hidden">
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
              Chemistry Tutoring in Burnaby & Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Chemistry is a subject that requires both conceptual
                understanding and practical application. From chemical reactions
                and formulas to lab reports and calculations, students often
                struggle to balance theory with problem-solving.
              </p>
              <p>
                At Dr. Shreyank Educare, we provide structured tutoring that
                helps students understand difficult concepts, improve analytical
                thinking, and perform better in coursework, labs, and exams.
              </p>
              <p>
                Whether your student is taking Chemistry 11 or 12 in the BC
                curriculum, AP or IB Chemistry, or a first-year university
                course, we tailor every session to the exact syllabus. We tutor
                in person at our Burnaby centre — minutes from SFU — and online
                for students across Vancouver and the Lower Mainland.
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
                  One free, no-obligation 30-minute conversation: tell us which course
                  the student is taking and where they are stuck, and we map out the
                  level, tutor and schedule that would help. We reply within 24 hours on
                  business days.
                </p>
              </div>
              <p className="mt-4 text-[14px] font-montserrat text-slate/70">
                One-to-one sessions are {PRICING_TEXT.oneOnOne}, varying by subject
                level — we confirm the rate for the course at the consultation. See{" "}
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
                  "Organic Chemistry",
                  "Inorganic Chemistry",
                  "Physical Chemistry",
                  "Chemical Reactions & Stoichiometry",
                  "Acids, Bases & Equilibrium",
                  "Lab Analysis & Report Writing",
                  "Problem-Solving Techniques",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "High school students preparing for Chemistry 11 & 12",
                  "College and university students taking advanced chemistry courses",
                  "Students struggling with theory-heavy topics",
                  "Learners needing help with labs and assignments",
                  "Students preparing for exams and improving grades",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring",
                  "Lab Support",
                  "Assignment Help",
                  "Exam Prep Sessions",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Better lab performance",
                  "Higher grades",
                  "Improved concept retention",
                  "Stronger exam preparation",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Strengthening Conceptual Understanding",
                    desc: "Chemistry concepts build on one another. We help students develop strong foundations before moving into advanced topics.",
                  },
                  {
                    title: "Improving Problem-Solving Skills",
                    desc: "From balancing equations to numerical chemistry problems, we teach structured approaches that improve speed and accuracy.",
                  },
                  {
                    title: "Supporting Lab Work and Reports",
                    desc: "We help students understand experiments, analyze outcomes, and confidently complete lab assignments.",
                  },
                  {
                    title: "Making Complex Topics Easier to Understand",
                    desc: "Our tutors simplify difficult concepts into manageable lessons that improve retention and confidence.",
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

          <CourseConsultationPanel
            subject={ENQUIRY.subject}
            anchor={ENQUIRY_ANCHOR}
            courseExample={ENQUIRY.courseExample}
            courseLabel={ENQUIRY.courseLabel}
            testimonialTopic={ENQUIRY.testimonialTopic}
            heading={ENQUIRY.heading}
            showCredential={ENQUIRY.taughtByFounder}
          />
        </div>

        {/* Chemistry we tutor, by level — targets Chem 11/12, AP, IB and
            university intent, and links to the dedicated pages for each. */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
              Chemistry We Tutor — By Level
            </h2>
            <p className="text-[18px] font-montserrat text-slate/60">
              From BC senior chemistry to first-year university
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Chemistry 11 & 12 (BC Curriculum)",
                body: "The BC senior chemistry courses move fast — atomic theory, the mole and stoichiometry, solubility, an introduction to organic chemistry, acids and bases, reaction kinetics and thermochemistry. We rebuild the gaps that quietly cost marks and keep every session aligned to what your student is covering in class.",
                href: "/chemistry-12-tutor-burnaby",
                cta: "Chemistry 12 tutoring in Burnaby",
              },
              {
                title: "AP Chemistry",
                body: "Full support across the College Board AP Chemistry curriculum, with exam-style multiple-choice and free-response practice so students walk into the exam knowing exactly what to expect.",
                href: "/ap-chemistry-tutor-burnaby",
                cta: "AP Chemistry tutoring",
              },
              {
                title: "IB Chemistry (SL & HL)",
                body: "Topic-by-topic tutoring for both Standard and Higher Level, plus structured help with the Internal Assessment (IA) — from framing a research question to writing up the analysis.",
                href: "/ib-chemistry-tutor-vancouver",
                cta: "IB Chemistry tutoring",
              },
              {
                title: "University Chemistry",
                body: "First year and beyond: General, Organic (reaction mechanisms, synthesis and spectroscopy), Physical (thermodynamics, kinetics and quantum) and Inorganic chemistry — plus lab reports and weekly problem sets for UBC and Langara courses.",
                href: "/programs/university-chemistry",
                cta: "University chemistry tutoring",
              },
            ].map((lvl) => (
              <div
                key={lvl.title}
                className="bg-bg-grey p-8 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
              >
                <h3 className="text-[20px] font-bricolage font-normal leading-[24px] text-slate mb-3 inline-block border-b-2 border-yellow-light pb-1">
                  {lvl.title}
                </h3>
                <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed mb-4">
                  {lvl.body}
                </p>
                <a
                  href={lvl.href}
                  className="text-[15px] font-montserrat font-medium text-primary underline decoration-2 underline-offset-4 decoration-yellow-light hover:text-primary/80 transition-colors"
                >
                  {lvl.cta} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section: Courses We Support */}
                <UniversityCourseTable subject={"Chemistry"} />
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      <RichBody value={bodyContent} />
      <RelatedTutoringPages pillar="/programs/chemistry" programSlug="chemistry" />

      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="Chemistry"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[
            { label: "Chemistry 11 tutoring in Burnaby", href: "/chemistry-11-tutor-burnaby" },
            { label: "Chemistry 12 tutoring in Burnaby", href: "/chemistry-12-tutor-burnaby" },
            { label: "Chemistry 12 final-exam review", href: "/chemistry-12-final-exam-review" },
            { label: "Chemistry 12 tutor in Vancouver", href: "/chemistry-12-tutor-vancouver" },
          ]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
