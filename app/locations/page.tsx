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

        <div className="max-w-2xl mb-14">
          <h1 className="text-[32px] sm:text-[42px] font-bricolage font-medium text-slate leading-[1.2] mb-5">
            Tutoring Locations Across Metro Vancouver
          </h1>
          <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed">
            Expert, PhD-led tutoring in Math, Physics, Chemistry and Coding for
            Grades 6–12 and university — in person in Burnaby and
            online across Metro Vancouver. Choose your city to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={cityPath(city.slug)}
              className="group flex items-center justify-between bg-white rounded-2xl p-6 border border-[#F1F5F9] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-[20px] font-bricolage font-medium text-slate leading-tight">
                    {city.name}
                  </p>
                  <p className="text-[14px] font-montserrat text-slate/70 mt-1">
                    Math &amp; science tutor in {city.name}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate/40 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
