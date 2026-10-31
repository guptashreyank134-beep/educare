import type { LucideIcon } from "lucide-react";
import { CalendarDays, Users, Rocket, BookOpenCheck } from "lucide-react";
import type { PricingCardProps } from "@/components/PricingComponent/PricingCard";
import { PRICING } from "@/data/pricing";

export interface PricingCardItem extends Omit<PricingCardProps, "icon"> {
  icon: LucideIcon;
}

export const pricingSectionContent: {
  heading: string;
  subheading: string;
  cards: PricingCardItem[];
  notes: string[];
} = {
  heading: "Flexible Pricing For Every Learning Goal",
  subheading:
    "Choose from personalized tutoring plans, exam prep programs, and monthly learning packages designed to fit your schedule and academic needs!",
  cards: [
    {
      icon: BookOpenCheck,
      title: "Homework and Study Club",
      subtitle: "Exclusive opening offer for new Grades 9–10 students",
      features: [
        `${PRICING.studyClub.monthlySessions} ${PRICING.studyClub.sessionMinutes}-minute sessions per month`,
        `Maximum ${PRICING.studyClub.maxGroupSize} students`,
        "Maths and science homework guidance",
        "Monthly parent update",
        "In person in Burnaby",
      ],
      price: PRICING.studyClub.amount,
      priceCaption: "per month; registering interest",
      ctaText: "Register Your Interest",
      ctaHref: "/homework-help-burnaby#register-interest",
    },
    {
      icon: CalendarDays,
      title: "Monthly Program",
      subtitle: "Best for consistent growth",
      features: [
        `Two ${PRICING.monthlyGroup.sessionMinutes}-minute sessions per week`,
        `Small group of up to ${PRICING.monthlyGroup.maxGroupSize} students`,
        "All materials included",
        "Monthly progress tracking",
      ],
      price: PRICING.monthlyGroup.min,
      priceMax: PRICING.monthlyGroup.max,
      priceCaption: "per month, GST included",
      ctaText: "Book a Free 30-Minute Consultation",
      ctaHref: "/book",
    },
    {
      icon: Users,
      title: "One-on-One Tutoring",
      subtitle: "Maximum personalization",
      features: [
        "60-minute one-on-one sessions",
        "Fully personalized to your goals",
        "Flexible scheduling",
        "All materials included",
      ],
      price: PRICING.oneOnOne.min,
      priceMax: PRICING.oneOnOne.max,
      priceCaption: "per 60-min session, GST incl. (varies by subject & level)",
      ctaText: "Book a Free 30-Minute Consultation",
      ctaHref: "/book",
    },
    {
      icon: Rocket,
      title: "Exam Booster",
      subtitle: "Intensive exam preparation",
      features: [
        "5 hours of focused instruction",
        "Revision and question-solving",
        "Targeted concept review",
        "Past-paper practice",
      ],
      price: PRICING.examBooster.amount,
      priceCaption: `for the full ${PRICING.examBooster.hours}-hour course, GST included`,
      ctaText: "Book a Free 30-Minute Consultation",
      ctaHref: "/book",
    },
  ],
  // Shared terms shown as small print under the cards, so pricing is unambiguous.
  notes: [
    "Every session is 60 minutes.",
    "All prices are GST-inclusive — no hidden fees.",
    "All learning materials are included.",
    "The same pricing covers online and in-person sessions in Burnaby.",
    `Please cancel or reschedule at least ${PRICING.cancellationHours} hours before a session.`,
  ],
};
