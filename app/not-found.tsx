import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// A useful 404: instead of a dead end, route lost visitors to the pages people
// actually search for (from Search Console) plus the primary conversion path.
export const metadata: Metadata = {
  title: "Page Not Found | Dr. Shreyank Educare",
  robots: { index: false, follow: true },
};

const POPULAR: { label: string; href: string }[] = [
  { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
  { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
  { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
  { label: "Coding Tutor in Burnaby", href: "/coding-tutor-burnaby" },
  { label: "Chemistry Tutoring", href: "/programs/chemistry" },
  { label: "Physics Tutoring", href: "/programs/physics" },
  { label: "University Physics (UBC/SFU)", href: "/programs/university-physics" },
  { label: "All Programs", href: "/programs" },
];

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="mt-2 text-[32px] sm:text-[40px] font-bricolage font-medium text-slate leading-tight">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 text-[16px] sm:text-[18px] font-montserrat text-slate/70 leading-relaxed">
        The link may be old or mistyped. Here are the pages families visit most —
        or book a free consultation and we&apos;ll point you the right way.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/book">
          <Button iconRight={ArrowRight}>Book a Free 30-Minute Consultation</Button>
        </Link>
        <Link href="/">
          <Button variant="ghost">Back to Home</Button>
        </Link>
      </div>

      <div className="mt-14 text-left">
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-slate/50">
          Popular pages
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {POPULAR.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] font-montserrat text-slate hover:border-primary hover:text-primary transition-all"
              >
                {p.label}
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
