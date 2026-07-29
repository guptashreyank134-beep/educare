/** @format */

import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloating from "../components/WhatsAppFloating";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from "../components/GoogleTagManager";
import { JsonLd, getOrganizationSchema } from "../components/SchemaMarkup";
import { ContactClickTracking } from "../components/ContactClickTracking";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drshreyankeducare.com"),
  title:
    "Dr. Shreyank Educare — Math, Physics, Chemistry & Coding Tutoring in Burnaby & Vancouver",
  description:
    "PhD-led, 5-star-rated tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university across Burnaby & Vancouver — in person and online. Book a free consultation.",
  applicationName: "Dr. Shreyank Educare",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/logo.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Dr. Shreyank Educare",
    locale: "en_CA",
    url: "https://www.drshreyankeducare.com",
    title:
      "Dr. Shreyank Educare — Math, Physics, Chemistry & Coding Tutoring in Burnaby & Vancouver",
    description:
      "PhD-led, 5-star-rated tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university across Burnaby & Vancouver — in person and online.",
    images: "/assets/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Shreyank Educare — Tutoring in Burnaby & Vancouver",
    description:
      "PhD-led tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university.",
    images: "/assets/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-20">
        <GoogleTagManagerNoScript />
        <GoogleTagManagerScript />
        <JsonLd schema={getOrganizationSchema()} />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloating />
        <ContactClickTracking />
      </body>
    </html>
  );
}
