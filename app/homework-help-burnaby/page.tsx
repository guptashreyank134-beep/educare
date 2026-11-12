import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Users,
} from "lucide-react";

import StudyClubInterestForm from "@/components/StudyClubInterestForm";
import RelevantTutorProfiles from "@/components/RelevantTutorProfiles";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/SchemaMarkup";
import { BUSINESS, SITE_URL } from "@/data/businessInfo";
import { STUDY_CLUB, STUDY_CLUB_PRICE } from "@/data/studyClub";
import {
  getStudyClubCmsContent,
  resolveCmsText,
} from "@/sanity/lib/studyClubPage";

const canonical = `${SITE_URL}${STUDY_CLUB.path}`;

const DEFAULT_META_TITLE = "Homework Help Burnaby Grades 9–10 | Dr Shreyank Educare";
const DEFAULT_META_DESCRIPTION =
  "Small group homework help in Burnaby for Grades 9–10. Maths and science support, 12 one-hour sessions monthly, CAD $299. Register your interest.";
const DEFAULT_OG_TITLE = "Homework and Study Club in Burnaby";
const DEFAULT_OG_DESCRIPTION =
  "An exclusive opening cohort for new Grades 9–10 students: small-group maths and science support led by Dr. Shreyank and the Educare team.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getStudyClubCmsContent();
  const title = resolveCmsText(cms?.metaTitle, DEFAULT_META_TITLE);
  const description = resolveCmsText(cms?.metaDescription, DEFAULT_META_DESCRIPTION);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: resolveCmsText(cms?.openGraphTitle, cms?.metaTitle || DEFAULT_OG_TITLE),
      description: resolveCmsText(
        cms?.openGraphDescription,
        cms?.metaDescription || DEFAULT_OG_DESCRIPTION,
      ),
      images: [BUSINESS.logo],
    },
  };
}

const defaultFaqs = [
  ["Which grades can join?", "Our opening Homework and Study Club group is for Grades 9 and 10. Please enquire about our existing tutoring programmes if your child is in another grade."],
  ["Which subjects are covered?", "The opening group focuses on mathematics and science. We also help students organise their work and prepare for school tests. Please confirm other subject needs before enrolling."],
  ["Does each student receive individual help?", "Yes. The tutor gives individual explanations and feedback while supporting a group of up to six students. Students also work independently, so this differs from a full hour of private tutoring."],
  ["How many sessions are included?", "A full monthly plan includes 12 sessions of 60 minutes, normally arranged as three sessions weekly across four teaching weeks. We provide the exact calendar in advance."],
  ["What if my child has no homework?", "They can revise a recent topic, prepare for a test or complete appropriate practice questions. Bringing school notes or the current topic helps us select useful work."],
  ["Will all homework be completed during the session?", "Completion depends on the amount and difficulty of the work. We help students prioritise, understand questions and make progress, but cannot promise that every assignment will be finished in one hour."],
  ["Is this suitable for a student who is far behind?", "We first discuss the student’s needs. A student who needs continuous individual teaching may benefit from private tutoring or a focused subject class before joining a study group."],
  ["What should students bring?", "Bring current assignments, school notes, a notebook, writing materials and any course-required calculator. A charged device is useful only when needed for schoolwork. Students should never share school-account passwords."],
  ["Who teaches the group?", "The opening offer is personally overseen by Dr. Shreyank and supported by the Educare team. We confirm the assigned tutor, subject coverage and progress-update process before enrolment."],
  ["What happens if my child misses a session?", "A reserved group session remains part of the monthly plan when a student is absent. Individual make-up lessons are not included. We may offer a transfer to another suitable group when space is available."],
  ["What happens if Educare cancels a session?", "We offer a replacement date. If we cannot provide a suitable replacement, we offer a proportionate credit or refund for that session."],
  ["Is there a long-term contract?", "The proposed club operates month to month, with no automatic renewal charge in the opening pilot. Tell us before paying the next month’s invoice if you wish to stop."],
  ["Is there a free trial?", "You can book a free 30-minute consultation to discuss your child’s needs. It is a planning conversation rather than a teaching session; a free study-club lesson is not included."],
  ["Do you guarantee higher grades?", "No. We support understanding, practice and study habits. Results depend on the student’s starting point, attendance, effort and school requirements."],
].map(([question, answer]) => ({ question, answer }));

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: STUDY_CLUB.name,
  url: canonical,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "City", name: "Burnaby" },
  audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "Grades 9–10" },
  description:
    "Small-group mathematics and science homework support for Grades 9–10 in Burnaby. The opening cohort is registering interest.",
  offers: {
    "@type": "Offer",
    priceCurrency: STUDY_CLUB.currency,
    price: STUDY_CLUB_PRICE,
    availability: "https://schema.org/PreOrder",
    url: `${canonical}#register-interest`,
  },
};

export default async function StudyClubPage() {
  const cms = await getStudyClubCmsContent();
  const faqs = cms?.faqs?.length ? cms.faqs : defaultFaqs;
  const answerSummary = resolveCmsText(
    cms?.answerSummary,
    "The Homework and Study Club is an in-person Burnaby programme for Grades 9–10 students who need regular mathematics and science homework support. A monthly plan includes 12 one-hour small-group sessions for up to six students at CAD $299.",
  );
  const serviceDescription = resolveCmsText(
    cms?.serviceDescription,
    "Small-group mathematics and science homework support for Grades 9–10 in Burnaby. The opening cohort is registering interest.",
  );
  const serviceAreas = cms?.serviceAreas?.filter(Boolean).length
    ? cms.serviceAreas.filter(Boolean)
    : ["Burnaby"];
  const entities = cms?.entities?.filter(Boolean) ?? [];
  const cmsServiceSchema = {
    ...serviceSchema,
    description: serviceDescription,
    areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: resolveCmsText(cms?.metaTitle, DEFAULT_META_TITLE),
    description: answerSummary,
    about: entities.map((name) => ({ "@type": "Thing", name })),
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <main className="bg-white text-slate">
      <JsonLd schema={cmsServiceSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={webPageSchema} />
      <section className="relative overflow-hidden bg-[#F8FAFC] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32">
        <div className="absolute inset-0 opacity-35" style={{ backgroundImage: "url('/backgrounds/yellowGrid.svg')", backgroundSize: "cover" }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-yellow-light px-4 py-2 text-[13px] font-montserrat font-semibold uppercase tracking-[0.12em] text-slate">
              Exclusive opening offer for new students
            </span>
            <p className="mt-6 text-[15px] font-montserrat font-semibold text-primary">Grades 9–10 · In person in Burnaby</p>
            <h1 className="mt-3 max-w-3xl text-[38px] leading-[1.08] sm:text-[50px] lg:text-[58px] font-bricolage font-semibold text-slate">
              Homework and Study Club in Burnaby
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-8 font-montserrat text-slate/80">
              Give your child a regular place to work through maths and science homework, ask questions and prepare for school tests. This opening cohort is personally overseen by Dr. Shreyank with support from the Educare team.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-[15px] font-montserrat font-semibold">
              <span className="rounded-lg bg-white px-4 py-3 shadow-sm">CAD ${STUDY_CLUB_PRICE} per month</span>
              <span className="rounded-lg bg-white px-4 py-3 shadow-sm">12 one-hour sessions</span>
              <span className="rounded-lg bg-white px-4 py-3 shadow-sm">Maximum {STUDY_CLUB.capacity} students</span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#register-interest" iconRight={ArrowRight}>Register Your Interest</ButtonLink>
              <ButtonLink href={STUDY_CLUB.consultationPath} variant="ghost">Book a Free 30-Minute Consultation</ButtonLink>
            </div>
          </div>
          <div className="rounded-3xl border border-yellow-light/80 bg-white p-7 sm:p-9 shadow-[0_24px_80px_rgba(68,97,155,0.12)]">
            <p className="text-[13px] font-montserrat font-semibold uppercase tracking-[0.12em] text-primary">{STUDY_CLUB.statusLabel}</p>
            <h2 className="mt-3 text-[28px] font-bricolage font-semibold">We are forming our first Grades 9–10 group</h2>
            <p className="mt-4 text-[16px] leading-7 font-montserrat text-slate/75">
              Register your interest to discuss your child&apos;s needs and preferred days. We will share the timetable, start date, assigned tutor and full programme details before asking you to pay.
            </p>
            <p className="mt-4 text-[15px] leading-7 font-montserrat text-slate/70">{answerSummary}</p>
            <p className="mt-5 rounded-xl bg-[#FFF8D8] p-4 text-[14px] leading-6 font-montserrat text-slate/80">
              An enquiry does not reserve a place or create a payment obligation. No tuition checkout is active for this opening stage.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            [BookOpenCheck, "Current schoolwork", "Maths homework, Grade 9–10 science assignments, revision and extra practice when a concept needs more attention."],
            [CalendarDays, "A reliable study routine", "Students set a clear goal, work independently between explanations and finish by identifying their next step."],
            [Users, "Small group guidance", "The tutor circulates, explains difficult concepts and checks understanding in a focused group of no more than six students."],
          ].map(([Icon, title, copy]) => {
            const FeatureIcon = Icon as typeof BookOpenCheck;
            return <article key={String(title)} className="rounded-2xl border border-[#EEF1F5] bg-white p-7 shadow-[0_12px_40px_rgba(0,0,0,0.05)]"><FeatureIcon className="h-9 w-9 text-primary" /><h2 className="mt-5 text-[23px] font-bricolage font-semibold">{String(title)}</h2><p className="mt-3 text-[15px] leading-7 font-montserrat text-slate/70">{String(copy)}</p></article>;
          })}
        </div>
      </section>

      <section className="bg-bg-grey py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[14px] font-montserrat font-semibold uppercase tracking-widest text-primary">How sessions work</p>
            <h2 className="mt-3 text-[34px] font-bricolage font-semibold">Help with the work your child is doing at school</h2>
            <p className="mt-5 text-[16px] leading-8 font-montserrat text-slate/75">We begin by identifying what each student needs to work on. Students then work on assignments while the tutor answers questions, explains difficult concepts and checks progress. At the end, each student identifies what they completed and what comes next.</p>
            <p className="mt-4 text-[16px] leading-8 font-montserrat text-slate/75">The tutor&apos;s attention is shared across the group. Students should be comfortable working independently between explanations. Families needing sustained individual instruction can discuss private tutoring options.</p>
          </div>
          <div className="rounded-3xl bg-primary p-8 text-white">
            <GraduationCap className="h-10 w-10 text-yellow-light" />
            <h2 className="mt-5 text-[30px] font-bricolage font-semibold">Led by Dr. Shreyank, supported by his team</h2>
            <p className="mt-4 text-[16px] leading-8 font-montserrat text-white/85">Dr. Shreyank holds a PhD in Ultrasound Signal and Image Processing and has more than ten years of teaching experience. His approach emphasises understanding the method, explaining the reasoning and practising independently.</p>
            <p className="mt-4 text-[14px] leading-6 font-montserrat text-white/75">Before enrolment, we confirm the assigned tutor and subject coverage. Students receive guidance on their own work and remain responsible for completing and submitting assignments.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <RelevantTutorProfiles tutorIds={[0]} heading="Meet Your Study Club Supervisor" />
        <p className="mt-5 text-[15px] font-montserrat leading-relaxed text-slate/70">
          Dr. Shreyank oversees the opening programme. The tutor assigned to each
          group and the subjects they will cover are confirmed before enrolment.
          You can also{" "}
          <Link href="/about" className="font-medium text-primary underline underline-offset-4">
            meet the wider Educare team
          </Link>{" "}
          and discuss individual tutoring if your child needs more sustained
          one-to-one support.
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[14px] font-montserrat font-semibold uppercase tracking-widest text-primary">Who it suits</p>
            <h2 className="mt-3 text-[34px] font-bricolage font-semibold">For students ready to build a consistent routine</h2>
            <p className="mt-5 text-[16px] leading-8 font-montserrat text-slate/75">The opening group suits Grade 9–10 students who bring work, attempt questions and participate respectfully in a shared learning space.</p>
            <p className="mt-4 text-[16px] leading-8 font-montserrat text-slate/75">Families seeking Grade 11–12, AP, IB or university support can contact us about our subject-specific and private programmes.</p>
          </div>
          <div>
            <h2 className="text-[28px] font-bricolage font-semibold">What is included</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {["Twelve scheduled 60-minute sessions per full billing month","Small-group maths and science homework support","School-test revision and study-routine guidance","Basic practice materials where appropriate","A brief monthly parent update","In-person sessions in Burnaby"].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-[#EEF1F5] p-4 text-[15px] font-montserrat text-slate/75"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-[0_20px_70px_rgba(68,97,155,0.08)]">
            <p className="text-[14px] font-montserrat font-semibold uppercase tracking-widest text-primary">Opening programme price</p>
            <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2"><p className="text-[52px] leading-none font-bricolage font-semibold">CAD ${STUDY_CLUB_PRICE}</p><p className="text-[17px] font-montserrat text-slate/65">per calendar month</p></div>
            <p className="mt-6 text-[16px] leading-8 font-montserrat text-slate/75">The standard plan includes 12 one-hour sessions, normally scheduled three times weekly across four teaching weeks. We share exact dates before enrolment. If a planned month offers fewer sessions, the fee is reduced proportionately.</p>
            <p className="mt-3 text-[15px] font-montserrat text-slate/70">Registration and basic materials are included. No payment is requested while the opening cohort is forming.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-[34px] font-bricolage font-semibold">Choose the support that fits</h2>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E5EAF0]">
          <table className="w-full min-w-[720px] text-left font-montserrat"><thead className="bg-primary text-white"><tr><th className="p-5">Programme</th><th className="p-5">Main purpose</th><th className="p-5">Format and price</th></tr></thead><tbody className="divide-y divide-[#E5EAF0] text-[15px] text-slate/75"><tr><th className="p-5 text-slate">Homework and Study Club</th><td className="p-5">Current schoolwork and a regular study routine</td><td className="p-5">Grades 9–10 · 12 group sessions · CAD $299 monthly</td></tr><tr><th className="p-5 text-slate">Subject-specific group tutoring</th><td className="p-5">Planned lessons and practice in one subject</td><td className="p-5">Two weekly sessions · currently CAD $185–$200 monthly</td></tr><tr><th className="p-5 text-slate">Private tutoring</th><td className="p-5">Sustained attention and an individual plan</td><td className="p-5">Currently CAD $75–$100 per hour</td></tr></tbody></table>
        </div>
      </section>

      <section className="bg-bg-grey py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[34px] font-bricolage font-semibold">Parent questions</h2>
          <div className="mt-10 space-y-3">{faqs.map(({ question, answer }) => <details key={question} className="group rounded-xl border border-[#E5EAF0] bg-white px-5 py-4"><summary className="cursor-pointer list-none text-[17px] font-montserrat font-semibold text-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">{question}<span className="float-right text-primary group-open:rotate-45 transition-transform">+</span></summary><p className="pt-4 text-[15px] leading-7 font-montserrat text-slate/70">{answer}</p></details>)}</div>
        </div>
      </section>

      <section id="programme-terms" className="mx-auto max-w-5xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-[14px] font-montserrat font-semibold uppercase tracking-widest text-primary">Programme terms</p>
        <h2 className="mt-3 text-[34px] font-bricolage font-semibold">Clear terms before any payment</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 text-[15px] leading-7 font-montserrat text-slate/75">
          <div className="rounded-2xl bg-bg-grey p-6"><h3 className="text-[20px] font-bricolage font-semibold text-slate mb-2">Place and billing</h3><p>An enquiry is a request for information. A place is confirmed only after suitability, tutor, calendar, enrolment details and payment are confirmed in writing. Billing is month to month by invoice with no automatic card renewal during the opening pilot.</p></div>
          <div className="rounded-2xl bg-bg-grey p-6"><h3 className="text-[20px] font-bricolage font-semibold text-slate mb-2">Refunds and changes</h3><p>A refund may be requested within seven days of enrolment if no sessions have been attended, or before a paid month begins. Once attendance starts, unused sessions are generally not refunded. Educare cancellations receive a replacement, credit or proportionate refund.</p></div>
          <div className="rounded-2xl bg-bg-grey p-6"><h3 className="text-[20px] font-bricolage font-semibold text-slate mb-2">Attendance and collection</h3><p>Parents confirm arrival and collection arrangements before attendance. Transport, school pickup and extended supervision are not included. Student absences do not create a right to private make-up lessons.</p></div>
          <div className="rounded-2xl bg-bg-grey p-6"><h3 className="text-[20px] font-bricolage font-semibold text-slate mb-2">Participation and privacy</h3><p>Students bring suitable work, complete their own assignments and respect the shared learning space. Parent information is used to manage the enquiry and programme. Marketing and media permissions remain separate and optional.</p></div>
        </div>
        <p className="mt-6 text-[14px] font-montserrat text-slate/65">These programme terms apply alongside our <Link href="/terms" className="text-primary underline">general terms</Link> and <Link href="/privacy" className="text-primary underline">privacy policy</Link>. The exact calendar and assigned tutor are provided before enrolment.</p>
      </section>

      <section id="register-interest" className="scroll-mt-24 bg-[#F7F9FC] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:items-start">
          <div>
            <p className="text-[14px] font-montserrat font-semibold uppercase tracking-widest text-primary">Exclusive opening cohort</p>
            <h2 className="mt-3 text-[36px] font-bricolage font-semibold">Discuss a place for your child</h2>
            <p className="mt-5 text-[16px] leading-8 font-montserrat text-slate/75">Tell us the grade, subject needs and days that suit your family. Dr. Shreyank and the team will discuss whether the opening group is a suitable fit and explain the next steps.</p>
            <div className="mt-7 rounded-xl border border-yellow-light bg-[#FFF9DE] p-5 text-[14px] leading-6 font-montserrat text-slate/75">No child&apos;s full name, school, report card, home address or payment details are needed at this stage.</div>
            <p className="mt-6 text-[15px] font-montserrat">Prefer to talk first? <Link href="/book" className="font-semibold text-primary underline">Book a free 30-minute consultation</Link> or email <a href={`mailto:${BUSINESS.email}`} className="font-semibold text-primary underline">{BUSINESS.email}</a>.</p>
          </div>
          <StudyClubInterestForm />
        </div>
      </section>
    </main>
  );
}

export const revalidate = 3600;
