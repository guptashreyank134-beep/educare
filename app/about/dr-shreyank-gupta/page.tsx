import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { JsonLd, getBreadcrumbSchema, getFounderSchema } from "@/components/SchemaMarkup";
import { LEAD_AUTHOR, authorSameAs, authorUrl, credentialLabel } from "@/data/authors";
import { SITE_URL } from "@/data/businessInfo";

const author = LEAD_AUTHOR;
const url = authorUrl(author.slug);

export const metadata: Metadata = {
  title: `${author.name} — ${author.jobTitle} | Dr. Shreyank Educare`,
  description: `${author.name}, ${credentialLabel(author.credential)}. Over 10 years teaching Math, Physics and Chemistry to students in Burnaby, Vancouver and online.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${author.name} — ${author.jobTitle}`,
    description: author.bio,
    url,
    type: "profile",
    images: author.image,
  },
};

/** Facts rendered only when confirmed, so nothing here is a placeholder. */
const credentialFacts = [
  { label: "Degree", value: `${author.credential.degree} in ${author.credential.field}` },
  author.credential.institution
    ? { label: "Institution", value: author.credential.institution }
    : null,
  author.credential.year ? { label: "Awarded", value: String(author.credential.year) } : null,
  { label: "Teaching experience", value: "10+ years" },
  { label: "Subjects", value: author.knowsAbout.join(", ") },
].filter((fact): fact is { label: string; value: string } => fact !== null);

export default function AuthorPage() {
  const profiles = authorSameAs(author);

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <JsonLd schema={getFounderSchema(author)} />
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About", url: `${SITE_URL}/about` },
          { name: author.name, url },
        ])}
      />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: author.name }]} />
        </div>

        <div className="flex flex-col sm:flex-row gap-8 items-start mb-10">
          <Image
            src="/assets/drShreyank.webp"
            alt={author.name}
            width={140}
            height={140}
            className="rounded-[20px] border border-[#F1F5F9] object-cover shrink-0"
          />
          <div>
            <h1 className="text-[32px] sm:text-[40px] font-bricolage font-medium text-slate leading-tight mb-3">
              {author.name}
            </h1>
            <p className="inline-flex items-center gap-2 text-[16px] font-montserrat text-slate/70 mb-4">
              <GraduationCap className="w-5 h-5 text-primary shrink-0" />
              {author.jobTitle}, Dr. Shreyank Educare
            </p>
            <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mb-5">
            Credentials
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {credentialFacts.map((fact) => (
              <div key={fact.label} className="border-b border-[#F1F5F9] pb-3">
                <dt className="text-[13px] font-montserrat uppercase tracking-wide text-slate/50 mb-1">
                  {fact.label}
                </dt>
                <dd className="text-[16px] font-montserrat text-slate">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {profiles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mb-5">
              Elsewhere
            </h2>
            <ul className="flex flex-wrap gap-3">
              {profiles.map((profile) => (
                <li key={profile}>
                  <a
                    href={profile}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center rounded-full border border-[#E2E8F0] px-4 py-2 text-[14px] font-montserrat text-slate/80 hover:border-primary hover:text-primary transition-colors"
                  >
                    {new URL(profile).hostname.replace(/^www\./, "")}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mb-4">
            Work with Dr. Shreyank
          </h2>
          <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-5">
            Sessions run one-on-one and in small groups, in person in Burnaby and online across
            Metro Vancouver.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-[8px] bg-primary px-5 py-3 text-[16px] font-montserrat font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Book a free 30-minute consultation
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-[8px] border border-[#E2E8F0] px-5 py-3 text-[16px] font-montserrat font-medium text-slate hover:border-primary hover:text-primary transition-colors"
            >
              Meet the full team
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
