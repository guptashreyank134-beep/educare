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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up form submission
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
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
          Sign-Up For Your 30-Minute{" "}
          <span className="text-primary font-semibold">FREE Consultation</span>{" "}
          Today!
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
              <Button type="submit" iconRight={ArrowRight}>
                Submit For Consultation
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Footer Bar ───────────────────────────────────────────────────────────────

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/resources#faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

function FooterBar() {
  return (
    <footer className="bg-primary rounded-[8px] text-bg-grey w-full max-w-[calc(100%-48px)] bg-bg-grey mx-auto mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-16 lg:gap-[104px]">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
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
              href="tel:+17788193202"
              className="flex items-center gap-2 text-[14px] font-montserrat text-white/80 hover:text-white transition-colors mb-2"
            >
              <Phone className="w-4 h-4 shrink-0" />
              +1 (778) 819-3202
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
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
        <nav className="flex flex-wrap justify-between gap-x-5 gap-y-2 mt-14">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[16px] font-semibold font-montserrat text-bg-white transition-colors"
            >
              {link.label}
            </Link>
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
      <FooterBar />
    </>
  );
}
