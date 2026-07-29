import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cities, cityPath } from "@/data/cities";

const PAGE_URL = "https://www.drshreyankeducare.com/locations";

export function generateMetadata(): Metadata {
  const title = "Tutoring Locations Across Metro Vancouver";
  const description =
    "Expert math, physics, chemistry and coding tutoring across Metro Vancouver — Burnaby, Vancouver, the North Shore, Tri-Cities, Surrey and Richmond.";
  return {
    title,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: { title, description, url: PAGE_URL, images: "/assets/logo.png" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "/assets/logo.png",
    },
  };
}

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-white font-montserrat relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "Locations" }]} />
        </div>

        <div className="max-w-3xl mb-12">
          {/* H1 kept distinct from the meta title (avoids the "duplicate h1 and
              title" flag) and leans into local "tutor near you" intent. */}
          <h1 className="text-[32px] sm:text-[42px] font-bricolage font-medium text-slate leading-[1.2] mb-5">
            Find a Tutor Near You Across Metro Vancouver
          </h1>
          <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed mb-4">
            Dr. Shreyank Educare provides expert, PhD-led tutoring in Math,
            Physics, Chemistry, Biology and Coding for Grades 6–12 and university
            students right across Metro Vancouver. We teach in person at our
            Burnaby location and online everywhere else in the region — so
            wherever you are, your student gets the same experienced,
            curriculum-aligned instruction.
          </p>
          <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed">
            Every session is one-to-one or small-group, aligned to the BC
            curriculum, IB or AP, and built around your student&apos;s exact
            course and goals. Choose a city below for local details — the
            neighbourhoods we cover and the schools our students come from.
          </p>
        </div>

        {/* What we offer everywhere */}
        <div className="max-w-3xl mb-14 bg-white rounded-2xl p-6 sm:p-8 border border-[#F1F5F9] shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mb-4">
            What We Offer in Every Location
          </h2>
          <ul className="space-y-2.5 text-[15px] sm:text-[16px] text-slate/80">
            <li>• In-person tutoring in Burnaby, or online across Metro Vancouver — the same PhD-led tutors either way.</li>
            <li>• Math, Physics, Chemistry, Biology, Computer Science and coding for Grades 6–12, plus Pre-Calculus 11/12, Calculus, IB and AP.</li>
            <li>• Exam preparation for the SAT, GRE, GMAT and MCAT, and final-exam and unit-assessment review.</li>
            <li>• University support for UBC, SFU and Langara students in calculus, physics, chemistry, statistics and finance.</li>
            <li>• A free 30-minute consultation before you commit, so you can meet your tutor first.</li>
          </ul>
        </div>

        <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mb-6">
          Cities We Serve
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((city) => {
            const areas = (city.neighborhoods || []).slice(0, 4).join(", ");
            return (
              <Link
                key={city.slug}
                href={cityPath(city.slug)}
                className="group flex items-start justify-between bg-white rounded-2xl p-6 border border-[#F1F5F9] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-[20px] font-bricolage font-medium text-slate leading-tight">
                      Math &amp; Science Tutor in {city.name}
                    </p>
                    <p className="text-[14px] font-montserrat text-slate/70 mt-1.5 leading-relaxed">
                      {areas ? `Serving ${areas} and nearby areas.` : `In-person and online tutoring for ${city.name} students.`}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate/40 group-hover:text-primary transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>

        {/* Online beyond Metro Vancouver */}
        <div className="max-w-3xl mt-14">
          <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mb-4">
            Online Tutoring Beyond Metro Vancouver
          </h2>
          <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed mb-4">
            Beyond the Lower Mainland, we tutor students across Canada and
            internationally online — including university and professional
            courses, MD-led medical sciences for USA and Caribbean students, and
            SAT, GRE, GMAT and MCAT exam preparation. Distance is no barrier to
            expert, one-to-one help.
          </p>
          <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed">
            Not sure which format fits your student?{" "}
            <Link href="/contact" className="text-primary font-semibold underline underline-offset-4">
              Book a free 30-minute consultation
            </Link>{" "}
            and we&apos;ll recommend the right tutor and schedule — in person in
            Burnaby or online, wherever you are.
          </p>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
