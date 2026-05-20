import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getMetaDataBySlug, getMetadata } from '@/utils/seoBuilder';
import ContactForm from '@/components/ContactForm';
import HeroBreadcrumb from '@/components/GeneralComponents/HeroBreadcrumb';
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "contact");
  return getMetadata(data, "https://drshreyankeducare.com/contact");
}

const ContactPage = async () => {
  const data = await getMetaDataBySlug("page", "contact");
  return (
    <div className="min-h-screen bg-white font-montserrat relative overflow-hidden">
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/contact")} />
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FACC1510 1px, transparent 1px), linear-gradient(to bottom, #FACC1510 1px, transparent 1px)`,
          backgroundSize: '40px_40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-8 sm:pt-28 lg:pt-32">
        <HeroBreadcrumb>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us', href: '/contact' },
            ]}
          />
        </HeroBreadcrumb>

        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6 leading-tight">
            Let's Build A Smarter Learning Journey Together!
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed max-w-3xl mx-auto">
            Whether you're looking for personalized tutoring, academic guidance,
            exam preparation, or simply want to understand which program is right
            for you, our team is here to help.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4">
          <ContactInfoCard
            icon={<Phone className="w-7 h-7 text-[#1E293B]" />}
            title="Call Us"
            value="+1 672-514-7587"
            href="tel:+16725147587"
          />
          <ContactInfoCard
            icon={<Mail className="w-7 h-7 text-[#1E293B]" />}
            title="E-Mail Us"
            value="info@drshreyankeducare.com"
            href="mailto:info@drshreyankeducare.com"
          />
          <ContactInfoCard
            icon={<MapPin className="w-7 h-7 text-[#1E293B]" />}
            title="Reach Us"
            value="2088 Madison Avenue, Burnaby, V5C 6T5, BC, Canada"
          />
        </div>

        {/* Form Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 px-4">
          <h2 className="text-4xl font-bold text-[#1E293B] mb-6">Write To Us</h2>
          <p className="text-[#64748B] leading-relaxed max-w-2xl mx-auto text-lg">
            Reach out to discuss your goals, ask questions or book a free consultation,
            we'll help you find the right learning path based on your needs,
            schedule and academic ambitions.
          </p>
        </div>

        {/* Contact Form Card */}
        <ContactForm />
      </div>
    </div>
  );
};

const ContactInfoCard = ({ icon, title, value, href }: { icon: React.ReactNode, title: string, value: string, href?: string }) => (
  <div className="bg-white p-10 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#F1F5F9] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] group">
    <div className="w-16 h-16 bg-[#FEF9C3] rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <div className="relative mb-4">
      <h3 className="text-xl font-bold text-[#1E293B] relative z-10">{title}</h3>
      <div className="absolute bottom-0.5 left-0 w-full h-2 bg-[#FACC15] -z-0 opacity-80"></div>
    </div>
    {href ? (
      <a href={href} className="text-[#64748B] hover:text-[#44619B] transition-colors text-lg font-medium">
        {value}
      </a>
    ) : (
      <span className="text-[#64748B] text-lg font-medium leading-relaxed">{value}</span>
    )}
  </div>
);

export default ContactPage;

export const dynamic = "force-dynamic";
