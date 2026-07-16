import Link from "next/link";
import { MapPin, Monitor, Phone } from "lucide-react";

/**
 * How sessions actually work — online or in person.
 *
 * The Services page promised "Online, In-Person & Exam Prep" but described
 * online almost exclusively. It is one service delivered two ways, not two
 * products, so this says that plainly rather than inventing a second offering.
 *
 * Every detail here came from the client: enquirers call about rates, book the
 * free consultation, and if it suits them they come to the tutor's home in
 * Burnaby for sessions. Parking is free. Nothing is embellished — in
 * particular this does NOT imply a teaching facility, because there isn't one.
 *
 * Both formats are named here because both are real and sold: one-to-one, and
 * the Monthly Program's small group of 6-8 (app/pricing/content.ts). An earlier
 * version of this file called the service "one-to-one" full stop and described
 * "one student" at the table, which contradicted the pricing page and a dozen
 * programme pages. Keep the two in step.
 */
export default function HowSessionsWork() {
  return (
    <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-[820px]">
        <h2 className="text-[28px] sm:text-[32px] font-bricolage font-normal text-slate mb-4">
          How sessions work
        </h2>
        <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-4">
          It is one service — PhD-led tutoring — in two formats. One-to-one, when
          something specific is broken and needs finding. Or the Monthly Program,
          two sessions a week in a small group of six to eight, when the need is
          steady practice across a term.
        </p>
        <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-4">
          Either way you choose how it is delivered — in person in Burnaby or
          online. The teaching, the tutor and the price are the same whichever
          room you pick; only the room changes.
        </p>
        <p className="text-[16px] sm:text-[18px] font-montserrat text-slate/80 leading-relaxed mb-10">
          Most families start by calling to ask about rates, then book a free
          30-minute consultation. If it feels like a fit, we agree a schedule from
          there. There is no obligation at any point.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* In person */}
        <div className="rounded-[20px] border border-[#F1F5F9] bg-bg-grey p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-light p-2.5 rounded-lg">
              <MapPin className="w-6 h-6 text-slate" />
            </span>
            <h3 className="text-[22px] font-bricolage font-medium text-slate">
              In person, in Burnaby
            </h3>
          </div>
          <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed mb-4">
            Sessions take place at Dr. Shreyank&apos;s home study in Burnaby — a
            quiet table, no distractions. It is a study rather than a storefront
            learning centre, and that is deliberate: even in the small group, the
            teaching is done by the person whose name is on the door.
          </p>
          <ul className="list-disc pl-5 marker:text-primary space-y-2">
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              One-to-one or small-group sessions at our Burnaby location, 2088
              Madison Avenue
            </li>
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              Free parking — no need to circle the block
            </li>
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              Convenient for Metrotown, Brentwood and Lougheed, and reachable by
              SkyTrain from across Vancouver
            </li>
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              Bring the actual homework, test or course notes you are stuck on
            </li>
          </ul>
        </div>

        {/* Online */}
        <div className="rounded-[20px] border border-[#F1F5F9] bg-bg-grey p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-light p-2.5 rounded-lg">
              <Monitor className="w-6 h-6 text-slate" />
            </span>
            <h3 className="text-[22px] font-bricolage font-medium text-slate">
              Online, across Metro Vancouver
            </h3>
          </div>
          <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed mb-4">
            The same session over a shared whiteboard, working through problems
            together in real time. It suits maths and science better than people
            expect — the working is visible to both of us, and nothing is lost.
          </p>
          <ul className="list-disc pl-5 marker:text-primary space-y-2">
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              Available anywhere in Metro Vancouver, and beyond for university
              and professional students
            </li>
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              No travel, which makes evening slots easier around school
            </li>
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              Same tutor, same price — online is not a cheaper or lesser version
            </li>
            <li className="text-[16px] font-montserrat text-slate/80 pl-1">
              Easy to switch between online and in person week to week
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-[20px] border border-[#F1F5F9] bg-white p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-light p-2.5 rounded-lg">
            <Phone className="w-6 h-6 text-slate" />
          </span>
          <h3 className="text-[22px] font-bricolage font-medium text-slate">
            Starting is a phone call
          </h3>
        </div>
        <p className="text-[16px] font-montserrat text-slate/80 leading-relaxed mb-5 max-w-[760px]">
          Call or message to ask about rates, then book a free 30-minute
          consultation — a conversation, not a lesson. Bring a recent test and we
          will tell you where the marks are going and what it would take to fix.
          If tutoring is not what your child needs, we will say so.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/contact" className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors">
            Book a free 30-minute consultation
          </Link>
          <Link href="/pricing" className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors">
            See our tutoring prices
          </Link>
          <a href="tel:+16725147587" className="text-[16px] font-montserrat font-medium text-primary underline hover:text-primary/80 transition-colors">
            Call +1 672-514-7587
          </a>
        </div>
      </div>
    </section>
  );
}
