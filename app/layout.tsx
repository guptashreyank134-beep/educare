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

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drshreyankeducare.com"),
  title: "Educare - Personalized Learning",
  description: "Personalized Learning, That Works At Every Level!",
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
      </body>
    </html>
  );
}
