import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileEdit, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export default function VancouverCTABanner() {
  const trialPoints = [
    "Understand your child's current level",
    "Identify weak concepts",
    "Recommend the right tutoring plan",
    "Explain how we can help improve confidence and grades"
  ];

  return (
    <section className="py-10 bg-primary relative overflow-hidden text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">

          {/* Left Column: Image */}
          <div className="w-full md:w-auto relative flex justify-center">
            <div className="relative w-[320px] sm:w-[360px] aspect-[1/1] rounded-[16px] overflow-hidden shadow-2xl">
              <Image
                src="/assets/ctaImage.jpg"
                alt="Book a free 30-minute tutoring consultation"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Icon */}
            <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-yellow-light p-3.5 rounded-xl shadow-lg z-10 text-slate">
              <FileEdit className="w-6 h-6" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-[600px]">
            <h2 className="text-[32px] sm:text-[38px] font-bricolage font-normal leading-[1.2] mb-4">
              Book Free Consultation With Us Today!
            </h2>

            <p className="text-[16px] font-montserrat font-normal text-white/90 leading-relaxed mb-8 max-w-[500px]">
              The best way to know whether our teaching style is right for your child is to experience it directly.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-light p-1.5 rounded-lg text-slate">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-[20px] font-bricolage font-medium">
                What The Free Consultation Covers
              </h3>
            </div>

            {/* CSS marker rather than a literal "•" element: the character was
                part of the text, so the content extracted as "•Understand your
                child's current level" and screen readers announced "bullet"
                before each item on top of the list semantics. */}
            <ul className="space-y-3 font-montserrat mb-10 list-disc pl-5 marker:text-white/60">
              {trialPoints.map((point, idx) => (
                <li key={idx} className="text-[15px] leading-relaxed text-white/90 pl-1">
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className='border border-white' iconRight={ArrowRight}>Book Free Consultation</Button>
              </Link>
              <a
                href="https://wa.me/16725147587"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-[10px] border border-[#25D366] rounded-[8px] px-[20px] py-[10px] text-[#25D366] font-medium text-[16px] leading-none hover:bg-[#25D366]/10 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat On Whatsapp
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
