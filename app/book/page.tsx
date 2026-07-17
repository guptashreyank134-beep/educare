import type { Metadata } from "next";
import { Star, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import TrialClassForm from "@/components/TrialClassForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { JsonLd, getServiceSchema } from "@/components/SchemaMarkup";

const PAGE_URL = "https://www.drshreyankeducare.com/book";
const title = "Book Your Free Assessment | Dr. Shreyank Educare";
const description =
  "Book a free 30-minute assessment with a PhD-led tutor — tell us where your student struggles and we'll map out how to help, in Burnaby or online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PAGE_URL },
  openGraph: { title, description, url: PAGE_URL, images: "/assets/logo.png" },
  twitter: { card: "summary_large_image", title, description, images: "/assets/logo.png" },
};

const TRUST = [
  { icon: GraduationCap, text: "PhD-led tutors, 10+ years' experience" },
  { icon: Star, text: "Rated 5.0 from 41 Google reviews" },
  { icon: MapPin, text: "In person in Burnaby or online across Metro Vancouver" },
  { icon: ShieldCheck, text: "No obligation — we'll tell you honestly if we're not the right fit" },
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-bg-grey font-montserrat relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <JsonLd
        schema={getServiceSchema({
          name: "Free Tutoring Assessment",
          description:
            "A free 30-minute consultation with a PhD-led tutor to assess a student's needs and recommend a tutoring plan.",
          url: PAGE_URL,
        })}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "Book a Free Assessment" }]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: the single, obvious value proposition */}
          <div className="lg:pt-6">
            <h1 className="text-[34px] sm:text-[44px] font-bricolage font-medium text-slate leading-[1.15] mb-5">
              Book Your Free Assessment
            </h1>
            <p className="text-[17px] sm:text-[19px] text-slate/80 leading-relaxed mb-8 max-w-xl">
              One free, no-obligation 30-minute consultation with a PhD-led tutor.
              Tell us where your student is struggling, and we&apos;ll map out
              exactly how to help — the right subject, level, tutor and schedule.
            </p>

            <ul className="space-y-4 mb-8">
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-light">
                    <Icon className="h-5 w-5 text-slate" strokeWidth={1.75} />
                  </span>
                  <span className="text-[16px] text-slate/85 leading-relaxed pt-1.5">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[14px] text-slate/60 leading-relaxed max-w-md">
              Fill in the form and we&apos;ll be in touch to arrange your free
              assessment. It takes under a minute and commits you to nothing.
            </p>
          </div>

          {/* Right: the single action */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[110%] bg-white/40 blur-3xl rounded-full -z-10" />
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F1F5F9] shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <p className="text-[24px] sm:text-[28px] font-bricolage font-medium text-slate text-center mb-2">
                Book a Free <span className="text-primary">30-Minute</span> Assessment
              </p>
              <p className="text-[14px] text-slate/70 text-center mb-6">
                No cost, no obligation. We usually reply within 24 hours.
              </p>
              <TrialClassForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
