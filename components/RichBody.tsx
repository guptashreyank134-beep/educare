/** @format */

import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

// Renders Sanity "Body Content" (faqAnswer / portable text) as prose with inline
// links, so editors can place linked paragraphs mid-page. Hidden when empty.

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-[22px] sm:text-[26px] font-bricolage font-medium text-slate mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[18px] sm:text-[20px] font-bricolage font-medium text-slate mt-6 mb-2">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-1.5 mb-4 text-[16px] sm:text-[18px] font-montserrat text-slate/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-1.5 mb-4 text-[16px] sm:text-[18px] font-montserrat text-slate/80">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-slate">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href || "#";
      const internal = href.startsWith("/");
      const cls =
        "text-primary underline decoration-2 underline-offset-2 decoration-yellow-light hover:text-primary/80";
      return internal ? (
        <Link href={href} className={cls}>
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    },
  },
};

export default function RichBody({
  value,
  className = "",
}: {
  value?: unknown;
  className?: string;
}) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <section className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 ${className}`}>
      <PortableText value={value as never} components={components} />
    </section>
  );
}
