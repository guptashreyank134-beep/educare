import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MessageCircle, BookOpen } from "lucide-react";
import { BUSINESS } from "@/data/businessInfo";

const PAGE_URL = "https://www.drshreyankeducare.com/thank-you";

export const metadata: Metadata = {
  title: "Consultation Next Steps | Dr. Shreyank Educare",
  description:
    "Choose an available time for your free tutoring consultation or find the details of a completed booking in your confirmation email.",
  // Post-conversion page — keep it out of search results.
  robots: { index: false, follow: true },
  alternates: { canonical: PAGE_URL },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-bg-grey font-montserrat relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-40 pb-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-light">
          <CalendarDays className="h-9 w-9 text-slate" strokeWidth={1.75} />
        </div>

        <h1 className="text-[32px] sm:text-[42px] font-bricolage font-medium text-slate leading-[1.15] mb-4">
          Your consultation next steps
        </h1>
        <p className="text-[17px] sm:text-[19px] text-slate/80 leading-relaxed mb-8 max-w-xl mx-auto">
          If you completed your booking, check your confirmation email for your
          appointment details. To book a free 30-minute consultation,{" "}
          <Link href="/book" className="font-medium text-primary underline underline-offset-2">
            choose an available time
          </Link>{" "}
          and complete the booking form.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#25D366] px-5 py-3 text-[#15803D] font-medium text-[16px] hover:bg-[#25D366]/10 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Message us on WhatsApp
          </a>
          <Link
            href="/resources"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-slate px-5 py-3 text-white font-medium text-[16px] hover:bg-slate/90 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            Browse free resources
          </Link>
        </div>

        <p className="text-[14px] text-slate/60">
          Prefer to talk now? Call{" "}
          <a href={`tel:${BUSINESS.phoneE164}`} className="text-primary font-semibold">
            {BUSINESS.phone}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
