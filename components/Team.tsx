/** @format */

import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    id: 0,
    name: "Dr. Shreyank",
    role: "PhD in Ultrasound Signal & Image Processing",
    credentials: "Founder & Lead Instructor",
    image: "/assets/drShreyank.webp",
  },
  {
    id: 1,
    name: "Prashanth Karupothula",
    role: "Fluid Sciences, Heat Transfer,",
    credentials: "and Numerical Methods.",
    image: "/assets/team-1.png",
  },
  // {
  //   id: 2,
  //   name: "Vipin Garg",
  //   role: "Expert Finance Tutor",
  //   credentials: "B.tech, MBA, CFA- Level III",
  //   image: "/assets/team-2.png",
  // },
  // {
  //   id: 3,
  //   name: "Seema",
  //   role: "Expert Chemistry Tutor",
  //   credentials: "M.Sc. (Chemistry), B.Ed.",
  //   image: "/assets/team-3.png",
  // },
  {
    id: 4,
    name: "Zeba Shaikh",
    role: "Expert Biology Tutor",
    credentials: "Msc. (Biochemistry)",
    image: "/assets/team-4.png",
  },
  {
    id: 5,
    name: "Dr. Vandani Verma",
    role: "Expert Mathematics Tutor",
    credentials: "Ph.D. in Applied Mathematics",
    image: "/assets/team-5.png",
  },
  // {
  //   id: 6,
  //   name: "Dr. Devinder Kaur",
  //   role: "Expert Physics & Math Tutor",
  //   credentials: "Ph.D. in High Energy Physics",
  //   image: "/assets/team-6.png",
  // },
];

export default function Team() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] font-bricolage font-display font-normal text-slate leading-[36px] mb-[12px]">
            Learn From Expert Instructors,
            <br />
            Focused On Growth!
          </h2>
          <p className="text-[16px] font-sans font-normal text-slate opacity-80 leading-relaxed max-w-xl mx-auto">
            Our experienced instructors combine academic excellence with
            real-world teaching, ensuring students grasp concepts thoroughly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-[1000px] mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-[8px] p-3 shadow-[0px_0px_30px_0px_#57575614] border border-gray-50 flex flex-col transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="rounded-[8px] overflow-hidden mb-5 bg-gray-100 aspect-[4/3] relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="px-1 text-left flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="text-[20px] font-bricolage font-display font-medium text-slate inline-block border-b-2 border-yellow-light">
                    {member.name}
                  </h3>
                </div>
                <p className="text-[16px] font-sans font-medium text-slate opacity-90 leading-relaxed">
                  {member.role}
                </p>
                <p className="text-[16px] font-sans font-normal text-slate opacity-70 leading-relaxed">
                  {member.credentials}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/about">
            <Button iconRight={ArrowRight}>Read About Our Team</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
