/** @format */

import Image from "next/image";

const brands = [
  { src: "/assets/brand-1.png", alt: "Simon Fraser University" },
  { src: "/assets/band-2.png", alt: "Capilano University" },
  { src: "/assets/brand-3.png", alt: "University of Waterloo" },
  { src: "/assets/brand-4.png", alt: "Carleton University" },
  { src: "/assets/brand-5.png", alt: "McGill University" },
  { src: "/assets/brand-6.png", alt: "University of Ottawa" },
];

export default function TrustedBrands() {
  // Quadruple the array to ensure seamless looping and no empty spaces on ultra-wide or 4K monitors
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-white flex justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-white rounded-[20px] shadow-[0px_0px_30px_0px_#57575614] p-10 text-center overflow-hidden">
          <h2 className="text-[24px] font-bricolage font-display font-medium text-slate mb-10">
            Where Our Students Study and Get Accepted
          </h2>
          
          <div className="relative w-full overflow-hidden py-2">
            {/* Left and right fade gradient overlays for premium look */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex animate-marquee whitespace-nowrap">
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-14 w-44 shrink-0 mx-6"
                >
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={160}
                    height={56}
                    className="max-h-full max-w-full object-contain opacity-65 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="text-[12px] text-slate/60 mt-6 font-montserrat max-w-2xl mx-auto">
            We support students enrolled at universities and colleges across Canada, including SFU, McGill and the University of Waterloo. These logos indicate where some of our students study or have been accepted — they do not imply any official partnership or endorsement by the institutions.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

