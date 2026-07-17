import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, BookOpen } from "lucide-react";
import ThankYouTracking from "@/components/ThankYouTracking";

const PAGE_URL = "https://www.drshreyankeducare.com/thank-you";

export const metadata: Metadata = {
  title: "Thank You — Your Request Is In | Dr. Shreyank Educare",
  description:
    "Thanks for booking your free assessment with Dr. Shreyank Educare. We'll be in touch within 24 hours to arrange your session.",
  // Post-conversion page — keep it out of search results.
  robots: { index: false, follow: true },
  alternates: { canonical: PAGE_URL },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-bg-grey font-montserrat relative overflow-hidden">
      {/* Fires the conversion event to GTM's dataLayer on load. */}
      <ThankYouTracking />

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
          <CheckCircle2 className="h-9 w-9 text-slate" strokeWidth={1.75} />
        </div>

        <h1 className="text-[32px] sm:text-[42px] font-bricolage font-medium text-slate leading-[1.15] mb-4">
          Thank You — Your Request Is In
        </h1>
        <p className="text-[17px] sm:text-[19px] text-slate/80 leading-relaxed mb-8 max-w-xl mx-auto">
          Thanks for booking your free assessment. A member of our team will be
          in touch within 24 hours to arrange a time and match your student with
          the right PhD-led tutor. There&apos;s nothing more you need to do.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="https://wa.me/16725147587"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#25D366] px-5 py-3 text-[#25D366] font-medium text-[16px] hover:bg-[#25D366]/10 transition-all"
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
          <a href="tel:+16725147587" className="text-primary font-semibold">
            +1 (672) 514-7587
          </a>
          .
        </p>
      </div>
    </div>
  );
}
