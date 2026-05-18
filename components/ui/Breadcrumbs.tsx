/** @format */

"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { buildBreadcrumbItems, BreadcrumbItem } from "@/utils/breadcrumb";

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const SITE_ORIGIN = "https://drshreyankeducare.com";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const pathname = usePathname();
  console.log(pathname);
  

  const breadcrumbItems = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    return buildBreadcrumbItems(pathname || "/");
  }, [items, pathname]);

  const breadcrumbJsonLd = useMemo(() => {
    if (!breadcrumbItems.length) return null;

    const itemListElement = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_ORIGIN}/`,
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `${SITE_ORIGIN}${item.href ?? pathname}`,
      })),
    ];

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    };
  }, [breadcrumbItems, pathname]);

  if (!breadcrumbItems.length) {
    return null;
  }

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="inline-flex flex-wrap items-center gap-2 bg-transparent px-3 py-2 text-sm font-montserrat text-primary"
      >
        <Link
          href="/"
          className="inline-flex items-center text-slate-500 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Home size={16} />
        </Link>

        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <span className="text-slate-300">/</span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-primary transition-colors hover:text-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="whitespace-nowrap font-medium text-slate">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
    </>
  );
};

export default Breadcrumbs;
