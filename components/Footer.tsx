/** @format */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

// Instagram brand icon (not in lucide-react — using inline SVG)
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Facebook brand icon (not in lucide-react — using inline SVG)
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
import { Button } from "./ui/Button";

import { Input } from "./ui/Input";
import { Textarea } from "./ui/TextArea";

import { createLead } from "../app/actions/lead";

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElement = e.currentTarget as HTMLFormElement;
    const form = new FormData(formElement);
    await createLead(form);

    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section className="relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* Yellow grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-46"
        style={{
          backgroundImage: `url('/backgrounds/yellowGrid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-[32px] font-bricolage font-normal text-slate leading-tight mb-3">
          Book a Free{" "}
          <span className="text-primary font-semibold">30-Minute</span>{" "}
          Consultation
        </h2>
        <p className="text-[16px] font-montserrat text-slate mb-10">
          Use the form below and a member of our team will respond within the
          next 24 hours.
        </p>

        {submitted ? (
          <div className="rounded-xl bg-white/80 backdrop-blur border border-primary/20 p-10 text-center shadow-sm">
            <p className="text-[20px] font-bricolage font-semibold text-primary mb-2">
              Thank you! 🎉
            </p>
            <p className="text-[15px] font-montserrat text-slate/70">
              We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-sm rounded-[24px] shadow-[0px_0px_50px_0px_#5757561F] p-8 text-left space-y-6"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Input
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Email ID"
              placeholder="enter email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Subject */}
            <Input
              id="subject"
              name="subject"
              label="Subject"
              placeholder="enter subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            {/* Message */}
            <Textarea
              id="message"
              name="message"
              label="Message/Feedback"
              placeholder="enter message here"
              value={formData.message}
              onChange={handleChange}
              required
            />

            {/* Submit */}
            <div className="flex justify-center pt-2">
              <Button type="submit" disabled={isSubmitting} iconRight={isSubmitting ? undefined : ArrowRight}>
                {isSubmitting ? "Submitting..." : "Submit For Consultation"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Footer Bar ───────────────────────────────────────────────────────────────

// Footer sitemap. Columns keep the deeper program/service/Vancouver pages one
// click from every page (they were 5+ clicks from the homepage), and funnel
// internal link equity to the Vancouver pages that rank on page 2–3.
const footerColumns = [
  {
    title: "Programs",
    links: [
      { label: "Math Tutoring", href: "/programs/mathematics" },
      { label: "Physics Tutoring", href: "/programs/physics" },
      { label: "Chemistry Tutoring", href: "/programs/chemistry" },
      { label: "Biology Tutoring", href: "/programs/biology" },
      { label: "Computer Science", href: "/programs/computer-science" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
      { label: "Pre-Calculus", href: "/programs/pre-calculus" },
      { label: "Finance Tutoring", href: "/programs/finance" },
      { label: "French", href: "/programs/french" },
      { label: "Mandarin", href: "/programs/mandarin" },
      { label: "Grade 11 Math (Burnaby)", href: "/grade-11-math-tutor-burnaby" },
      { label: "Grade 12 Math (Burnaby)", href: "/grade-12-math-tutor-burnaby" },
      { label: "Workplace Math (Burnaby)", href: "/workplace-math-tutor-burnaby" },
    ],
  },
  {
    title: "Coding & Test Prep",
    links: [
      { label: "Python", href: "/programs/python" },
      { label: "JavaScript", href: "/programs/javascript" },
      { label: "Web Development", href: "/programs/web-development" },
      { label: "Coding Tutor Burnaby", href: "/coding-tutor-burnaby" },
      { label: "SAT Prep", href: "/programs/sat-prep" },
      { label: "GRE Prep", href: "/programs/gre-prep" },
      { label: "GMAT Prep", href: "/programs/gmat-prep" },
      { label: "MCAT Prep", href: "/programs/mcat-prep" },
    ],
  },
  {
    title: "Vancouver & University",
    links: [
      { label: "Math Tutoring in Vancouver", href: "/math-tutor-vancouver" },
      { label: "Computer Science Tutor", href: "/computer-science-tutor-vancouver" },
      { label: "University Mathematics", href: "/programs/university-mathematics" },
      { label: "University Chemistry", href: "/programs/university-chemistry" },
      { label: "STEM Tutoring (Burnaby)", href: "/programs/burnaby-stem-tutoring" },
      { label: "Physics (School & University)", href: "/programs/physics-tutoring" },
      { label: "Vancouver Math Program", href: "/programs/vancouver-math-tutoring" },
      { label: "IB Math Tutor Vancouver", href: "/ib-math-tutor-vancouver" },
      { label: "Engineering Statics Tutor", href: "/engineering-statics-tutor" },
      { label: "University & Professional", href: "/university-professional" },
      { label: "Online Medical Tutoring", href: "/online-medical-tutoring" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      { label: "North Vancouver", href: "/math-tutor-north-vancouver" },
      { label: "West Vancouver", href: "/math-tutor-west-vancouver" },
      { label: "Coquitlam", href: "/math-tutor-coquitlam" },
      { label: "Port Moody", href: "/math-tutor-port-moody" },
      { label: "Port Coquitlam", href: "/math-tutor-port-coquitlam" },
      { label: "New Westminster", href: "/math-tutor-new-westminster" },
      { label: "Surrey", href: "/math-tutor-surrey" },
      { label: "Richmond", href: "/math-tutor-richmond" },
      { label: "Delta", href: "/math-tutor-delta" },
      { label: "Math Tutor Near Me", href: "/math-tutor-near-me" },
      { label: "All Locations", href: "/locations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "All Programs", href: "/programs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Resources", href: "/resources" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

function FooterBar() {
  return (
    <footer className="bg-primary rounded-[8px] text-bg-grey w-full max-w-[calc(100%-48px)] bg-bg-grey mx-auto mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-16 lg:gap-[104px]">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" aria-label="Dr. Shreyank Educare — Home">
              <Image
                src="/assets/logo.png"
                alt="Dr. Shreyank Educare Logo"
                width={220}
                height={83}
                className="h-auto w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Contact Us */}
          <div>
            <p className="text-[13px] font-montserrat font-semibold text-white/50 uppercase tracking-widest mb-3">
              Contact Us
            </p>
            <a
              href="tel:+16725147587"
              className="flex items-center gap-2 text-[14px] font-montserrat text-white/80 hover:text-white transition-colors mb-2"
            >
              <Phone className="w-4 h-4 shrink-0" />
              +1 (672) 514-7587
            </a>
            <a
              href="mailto: info@drshreyankeducare.com"
              className="flex items-center gap-2 text-[14px] font-montserrat text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" />
              info@drshreyankeducare.com
            </a>
          </div>

          {/* Social Media */}
          <div>
            <p className="text-[13px] font-montserrat font-semibold text-white/50 uppercase tracking-widest mb-3">
              Find Us On Social Media
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/drshreyankeducare/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/DrShreyankEducare/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 mt-14">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-montserrat font-semibold text-white/50 uppercase tracking-widest mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] font-montserrat text-bg-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Divider + Nav */}
        <div className="border-t border-bg-white mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-montserrat ">
            © Copyright 2026. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <>
      <ContactForm />
      <div className="flex justify-center items-center max-w-[784px] w-full mx-auto my-8 px-4">
        <div className="bg-[#E2E8F0] h-[1px] w-full" />
        <span className="text-[14px] font-montserrat font-medium text-[#94A3B8] px-4 uppercase tracking-wider">Or</span>
        <div className="bg-[#E2E8F0] h-[1px] w-full" />
      </div>
      <div className="flex flex-col gap-6 items-center text-center max-w-[1010px] w-full mx-auto mb-16 px-4">
        <p className="text-[18px] sm:text-[20px] font-montserrat font-medium text-slate">
          Prefer Quick Communication? Message Us On Whatsapp Or Call Us!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/16725147587"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[44px] items-center justify-center gap-[10px] border border-[#25D366] bg-white rounded-[8px] px-[20px] py-[10px] text-[#25D366] font-medium text-[16px] leading-none hover:bg-[#25D366]/5 transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat With Us On Whatsapp
          </a>
          <a
            href="tel:+16725147587"
            className="inline-flex h-[44px] items-center justify-center gap-[10px] bg-primary text-white rounded-[8px] px-[20px] py-[10px] font-medium text-[16px] leading-none hover:bg-primary/90 transition-all"
          >
            <Phone className="w-5 h-5 fill-current" />
            +1 672-514-7587
          </a>
        </div>
      </div>

      <FooterBar />
    </>
  );
}
