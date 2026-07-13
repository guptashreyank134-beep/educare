"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NavChild = { href: string; label: string };
type NavItem = { href?: string; label: string; children?: NavChild[] };

// University & Professional dropdown links only to pages that exist today
// (Medical hub + Quant/University hub). Individual subject pages are added
// to this submenu in Phase 2 as they are built (no broken links).
const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "School Tutoring" },
  { href: "/programs/ib-ap-tutoring", label: "IB & AP" },
  { href: "/programs", label: "Exam Prep" },
  {
    label: "University & Professional",
    children: [
      { href: "/online-medical-tutoring", label: "Medical Tutoring (USA & Caribbean)" },
      { href: "/university-professional", label: "Economics, Statistics, Actuarial & R" },
    ],
  },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const closeMobile = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="DSE Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 text-slate hover:text-primary font-display text-[17px] transition-colors duration-200 cursor-pointer"
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  {/* pt-3 bridges the hover gap to the panel */}
                  <div className="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[300px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-[15px] font-display text-slate hover:text-primary hover:bg-slate-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="text-slate hover:text-primary font-display text-[17px] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <Button iconRight={ArrowRight}>Contact Us</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="text-slate hover:text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() =>
                    setOpenSubmenu((cur) => (cur === link.label ? null : link.label))
                  }
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-display text-[18px] text-slate hover:text-primary hover:bg-slate-50 transition-all"
                  aria-expanded={openSubmenu === link.label}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openSubmenu === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenu === link.label && (
                  <div className="pl-4 space-y-1 pb-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMobile}
                        className="block px-3 py-2 rounded-lg text-[15px] font-display text-slate/90 hover:text-primary hover:bg-slate-50 transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                onClick={closeMobile}
                className="block px-3 py-2.5 rounded-xl text-base font-display text-[18px] text-slate hover:text-primary hover:bg-slate-50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="pt-4 border-t border-slate-50 px-3">
            <Link href="/contact" onClick={closeMobile} className="block w-full">
              <Button iconRight={ArrowRight} className="w-full justify-center">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
