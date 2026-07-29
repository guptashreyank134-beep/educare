/** @format */

import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/SchemaMarkup";

const URL =
  "https://www.drshreyankeducare.com/guides/how-to-choose-a-tutor-burnaby-vancouver";
const TITLE =
  "How to Choose a Tutor in Burnaby and Vancouver: Costs, Formats and Questions to Ask";
const DESCRIPTION =
  "A neutral, practical guide to choosing a tutor in Burnaby and Vancouver — independent tutor vs centre, one-on-one vs group, online vs in person, pricing, qualifications, the questions to ask and the warning signs.";

export const metadata: Metadata = {
  title: "How to Choose a Tutor in Burnaby & Vancouver | Costs & Questions",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, images: "/assets/logo.png" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: "/assets/logo.png" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  author: {
    "@type": "Organization",
    name: "Dr. Shreyank Educare",
    url: "https://www.drshreyankeducare.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Dr. Shreyank Educare",
    logo: {
      "@type": "ImageObject",
      url: "https://www.drshreyankeducare.com/assets/logo.png",
    },
  },
  about: [
    "Tutoring in Burnaby",
    "Tutoring in Vancouver",
    "Math tutoring",
    "Science tutoring",
    "University tutoring",
    "MCAT preparation",
  ],
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[24px] sm:text-[30px] font-bricolage font-medium text-slate mt-12 mb-4">
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-4">
      {children}
    </p>
  );
}

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white font-montserrat">
      <JsonLd schema={articleSchema} />
      {/* BreadcrumbList JSON-LD is emitted by the <Breadcrumbs> component below. */}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Breadcrumbs items={[{ label: "How to Choose a Tutor in Burnaby & Vancouver" }]} />

        <h1 className="text-[30px] sm:text-[40px] font-bricolage font-medium text-slate leading-[1.2] mt-6 mb-6">
          How to Choose a Tutor in Burnaby and Vancouver: Costs, Formats and
          Questions to Ask
        </h1>
        <P>
          Choosing a tutor is mostly about matching the right format and person to
          a specific student, not finding a single &ldquo;best&rdquo; option. This
          guide walks through the trade-offs — for math, the sciences, university
          courses and medical-entrance prep — so you can decide what actually fits
          your child or your own studies. It is deliberately neutral; there is no
          ranking of local providers here.
        </P>

        <H2>Independent tutor versus tutoring centre</H2>
        <P>
          An independent tutor is often cheaper and more flexible, and you deal
          with the person teaching directly. The trade-off is continuity: if they
          are unavailable, there is no backup, and quality varies widely. A
          tutoring centre usually offers vetted tutors, a physical space, cover
          when someone is away and structured progress tracking, typically at a
          somewhat higher price. For younger students or families who value a
          consistent in-person routine, a centre&rsquo;s structure can matter more
          than the hourly rate.
        </P>

        <H2>One-on-one versus small group</H2>
        <P>
          One-on-one is the most tailored option: the session bends entirely to one
          student&rsquo;s pace, gaps and current coursework, which is why it works
          best for students who are struggling or preparing for a specific exam.
          Small-group tutoring (commonly up to about six students) costs less per
          student and adds some peer motivation, but it only works well when the
          group is genuinely close in level and taking the same course. A wide
          spread of abilities in one group usually means someone is bored and
          someone else is lost.
        </P>

        <H2>Online versus in person</H2>
        <P>
          Online tutoring is effective and convenient for older, self-motivated
          students whose difficulty is with specific content. In-person tends to
          help younger students, and any student who quietly disengages when
          confused — it is much harder to nod along and hide a gap when a tutor is
          sitting beside you watching the work on paper. Many families mix the two.
        </P>

        <H2>Pricing structures</H2>
        <P>
          Expect to see per-session and monthly-package pricing. In Metro
          Vancouver, one-on-one high-school rates commonly fall in the roughly
          $70–$110 per hour range depending on level and tutor experience; group
          rates are lower per student. Ask what is included: session length,
          whether materials and practice sets are provided, whether tax is
          included, and the cancellation window. A clear, written policy is a good
          sign. (For reference, our own{" "}
          <Link href="/pricing" className="text-primary underline decoration-yellow-light decoration-2 underline-offset-2">
            pricing is published here
          </Link>
          .)
        </P>

        <H2>BC curriculum familiarity</H2>
        <P>
          A tutor who knows the BC curriculum saves time. For high school that means
          Foundations of Mathematics versus Pre-Calculus 11 and 12, the way senior
          sciences are assessed, and how school-based final exams are weighted. For
          university, it means knowing the actual courses — the UBC, SFU and Langara
          calculus, physics, chemistry and statistics sequences — rather than
          generic &ldquo;first-year math.&rdquo; Ask whether they have supported the
          exact course your student is taking.
        </P>

        <H2>Tutor qualifications</H2>
        <P>
          Subject knowledge and the ability to explain it are different skills; you
          want both. Reasonable things to look for are relevant academic
          background, real teaching experience, and comfort with the level being
          taught (a strong high-school tutor is not automatically the right person
          for third-year university physics, and vice versa). For specialised goals
          like MCAT preparation, ask specifically about experience with that exam.
        </P>

        <H2>Questions parents should ask</H2>
        <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[18px] font-montserrat text-slate/80 mb-4">
          <li>Have you tutored this exact course or exam before?</li>
          <li>How do you find out where a student is actually stuck?</li>
          <li>What happens in a typical session, and how is progress tracked?</li>
          <li>What is the pricing, cancellation policy and session length?</li>
          <li>Is the first meeting a lesson or a consultation?</li>
          <li>Do you help with a student&rsquo;s own work, or complete it for them?</li>
        </ul>

        <H2>Warning signs</H2>
        <P>
          Be cautious of guaranteed grades or promised improvement on a fixed
          timeline — genuine learning does not work that way. Other red flags:
          vague answers about qualifications, no clear plan after the first meeting,
          pressure to commit to a long package immediately, and any willingness to
          complete graded assignments or exams on a student&rsquo;s behalf, which is
          an academic-integrity violation.
        </P>

        <H2>Which format suits different students</H2>
        <P>
          A younger student who goes quiet in class usually does best one-on-one and
          in person. A capable, busy Grade 12 student prepping for a Pre-Calculus 12
          final may do fine online in a small group. A university student hitting a
          wall in first-year calculus needs someone who knows their specific course.
          A pre-med student needs targeted, exam-specific MCAT work. Match the format
          to the situation rather than assuming one size fits all.
        </P>

        <H2>How Dr. Shreyank Educare fits in</H2>
        <P>
          For families in Burnaby and Vancouver, we offer PhD-led tutoring across{" "}
          <Link href="/math-tutor-burnaby" className="text-primary underline decoration-yellow-light decoration-2 underline-offset-2">
            mathematics
          </Link>
          ,{" "}
          <Link href="/programs/chemistry" className="text-primary underline decoration-yellow-light decoration-2 underline-offset-2">
            chemistry
          </Link>
          ,{" "}
          <Link href="/programs/physics" className="text-primary underline decoration-yellow-light decoration-2 underline-offset-2">
            physics
          </Link>
          , university courses and{" "}
          <Link href="/programs/mcat-prep" className="text-primary underline decoration-yellow-light decoration-2 underline-offset-2">
            MCAT preparation
          </Link>
          , one-on-one or small group, in person at our Burnaby centre or online. If
          it helps, book a free 30-minute consultation — a planning conversation,
          not a sales pitch — and we will tell you honestly which format we think
          fits.
        </P>
      </article>
    </main>
  );
}

export const revalidate = 3600;
