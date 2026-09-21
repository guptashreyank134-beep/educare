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
import { getProgramFaqs, getProgramBodyContent } from "@/sanity/lib/faqs";
import UniversityCourseTable from "@/components/UniversityCourseTable";
import RelatedTutoringPages from "@/components/RelatedTutoringPages";
import RichBody from "@/components/RichBody";
import CourseEnquiryForm from "@/components/CourseEnquiryForm";
import {
  ConsultationCtaLink,
  StickyConsultationBar,
} from "@/components/ConsultationCta";
import TestimonialQuote from "@/components/TestimonialQuote";
import { LEAD_AUTHOR, authorPath, credentialLabel } from "@/data/authors";
import { PRICING_TEXT } from "@/data/pricing";
import { testimonialsFor } from "@/data/testimonials";

const ENQUIRY_ANCHOR = "physics-enquiry";
const FORM_ID = "physics-enquiry";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("programPage", "physics");
  return getMetadata(data, "https://www.drshreyankeducare.com/programs/physics");
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

export default async function PhysicsProgramPage() {
  const data = await getMetaDataBySlug("programPage", "physics");
  // FAQs are managed in Studio > Program Pages; empty means no section is shown.
  const faqs = await getProgramFaqs("physics");
  const bodyContent = await getProgramBodyContent("physics");
  const physicsTestimonials = testimonialsFor("physics");
  const breadcrumbItems = [
    { label: "Programs", href: "/programs" },
    { label: "Academic", href: "/programs" },
    { label: "Physics" },
  ];

  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://www.drshreyankeducare.com/programs/physics")} />
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
              Physics Tutoring in Burnaby & Vancouver
            </h1>

            <div className="space-y-4 text-[16px] leading-[22px] font-montserrat text-slate mb-6">
              <p>
                Physics is often one of the most challenging science subjects
                because it requires students to understand complex theories
                while applying advanced mathematical concepts to solve problems.
              </p>
              <p>
                At Dr. Shreyank Educare, we help students break down difficult
                physics topics into simpler concepts and develop the analytical
                skills needed to solve physics problems with confidence. Our
                structured approach ensures students improve both their
                understanding of physics theory and the mathematics behind it.
              </p>
              <p>
                We tutor Physics 11 and 12 in the BC curriculum, AP and IB
                Physics, and first-year university and engineering physics —
                tailoring every session to the exact course. Sessions run in
                person at our Burnaby centre — minutes from SFU — and online for
                students across Vancouver and the Lower Mainland.
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
                  your student is taking and where they are stuck, and we map out the
                  level, tutor and schedule that would help. Bring a recent test. We
                  reply within 24 hours on business days.
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
          </div>

          {/* Right column: who teaches it, and what a family said about it.
              Evidence sits beside the consultation offer rather than below the
              course detail. */}
          <div className="w-full lg:w-[380px]">
            {/* Credentials come from the author record, so this cannot drift
                from the About page or the structured data. */}
            <div className="rounded-[16px] border border-[#F1F5F9] bg-white/80 p-5">
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

            {/* Published reviews tagged for this subject. The quote names the
                course it refers to, so a reader can judge its relevance. */}
            {physicsTestimonials.map((testimonial) => (
              <div key={testimonial.author} className="mt-5">
                <TestimonialQuote testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* The enquiry form follows the consultation offer directly, so a reader
            meets it before the course detail rather than after it. */}
        <div id={ENQUIRY_ANCHOR} className="mt-12 w-full max-w-[640px] scroll-mt-28">
          <CourseEnquiryForm
            subject="Physics"
            formId={FORM_ID}
            courseLabel="Student's grade or course"
            courseExample="Physics 11, Physics 12, AP Physics 1, IB Physics HL, or UBC PHYS 117"
          />
        </div>

        <div className="mt-14 max-w-[880px]">
            <section>
              <SectionHeader icon={Layers} title="What We Cover" />
              <ListItems
                items={[
                  "Mechanics and Motion",
                  "Forces and Newton's Laws",
                  "Energy, Work and Power",
                  "Electricity and Magnetism",
                  "Waves, Light and Optics",
                  "Kinematics and Dynamics",
                  "Mathematical Problem-Solving Techniques",
                ]}
              />

              <SectionHeader icon={FileText} title="Who Is This For" />
              <ListItems
                items={[
                  "High school students preparing for Physics 11 & 12",
                  "College and university students taking advanced physics courses",
                  "Learners preparing for assignments, quizzes, and exams",
                  "Students struggling with math-heavy physics concepts",
                  "Students looking to improve confidence in problem-solving",
                ]}
              />

              <SectionHeader icon={LayoutGrid} title="Program Format" />
              <ListItems
                items={[
                  "One-on-One Tutoring",
                  "Small Group Sessions",
                  "On-Demand Support",
                ]}
              />

              <SectionHeader icon={Sparkles} title="Expected Outcomes" />
              <ListItems
                items={[
                  "Stronger understanding of physics concepts",
                  "Improved mathematical application skills",
                  "Support toward stronger academic performance",
                  "Faster problem-solving abilities",
                  "Greater confidence in tackling complex questions",
                ]}
              />

              <SectionHeader icon={Rocket} title="Our Approach" />
              <div className="ml-11 space-y-4">
                {[
                  {
                    title: "Breaking Down Complex Concepts",
                    desc: "Physics concepts can feel overwhelming. We simplify difficult theories into clear, easy-to-understand lessons that improve retention.",
                  },
                  {
                    title: "Strengthening Mathematical Foundations",
                    desc: "Many physics challenges stem from weak math fundamentals. We identify these gaps and strengthen the mathematical concepts required for success.",
                  },
                  {
                    title: "Building Problem-Solving Confidence",
                    desc: "We guide students through multiple question types, examples, and practice exercises to improve speed and accuracy.",
                  },
                  {
                    title: "Creating Consistent Learning Habits",
                    desc: "Our structured sessions help students stay organized, practice regularly, and improve performance over time.",
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

        {/* Physics we tutor, by level — targets Physics 11/12, AP, IB and
            engineering/university intent, and links to the dedicated pages. */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
              Physics We Tutor — By Level
            </h2>
            <p className="text-[18px] font-montserrat text-slate/60">
              From BC senior physics to engineering and university
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Physics 11 & 12 (BC Curriculum)",
                body: "BC senior physics spans kinematics and dynamics, momentum and energy, circular motion and gravitation, electricity and magnetism, and waves and optics. We connect each topic to the maths it relies on so problems stop feeling like guesswork.",
                href: "/physics-12-tutor-burnaby",
                cta: "Physics 12 tutoring in Burnaby",
              },
              {
                title: "AP Physics (1, 2 & C)",
                body: "Support across AP Physics 1 and 2 and both Physics C courses (Mechanics and Electricity & Magnetism), with exam-style free-response and multiple-choice practice so nothing on the exam is a surprise.",
                href: "/ap-physics-tutor-burnaby",
                cta: "AP Physics tutoring",
              },
              {
                title: "IB Physics (SL & HL)",
                body: "Topic-by-topic tutoring for both Standard and Higher Level, plus structured help with the Internal Assessment (IA) — from designing the investigation to writing up uncertainties and analysis.",
                href: "/ib-physics-tutor-vancouver",
                cta: "IB Physics tutoring",
              },
              {
                title: "University & Engineering Physics",
                body: "First-year mechanics and electromagnetism through to the calculus-based physics engineering students face — with weekly problem sets, lab support and exam prep for UBC, SFU and Langara courses.",
                href: "/programs/university-physics",
                cta: "University physics tutoring",
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
                <UniversityCourseTable subject={"Physics"} />
      </div>
    
        {faqs.length > 0 && (
          <>
            <JsonLd schema={getFAQSchema(faqs)} />
            <VancouverFAQSection faqs={faqs} />
          </>
        )}
      <RichBody value={bodyContent} />
      <RelatedTutoringPages pillar="/programs/physics" programSlug="physics" />

      
        <StickyConsultationBar targetId={ENQUIRY_ANCHOR} formId={FORM_ID} />

        <ProgramNextSteps
          subject="Physics"
          consultationHref={`#${ENQUIRY_ANCHOR}`}
          relatedLinks={[
            { label: "Physics 11 tutoring in Burnaby", href: "/physics-11-tutor-burnaby" },
            { label: "Physics 12 tutoring in Burnaby", href: "/physics-12-tutor-burnaby" },
            { label: "Physics 12 final-exam review", href: "/physics-12-final-exam-review" },
            { label: "Physics 12 tutor in Vancouver", href: "/physics-12-tutor-vancouver" },
          ]}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
