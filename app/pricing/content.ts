import type { LucideIcon } from "lucide-react";
import { CalendarDays, Users, Rocket } from "lucide-react";
import type { PricingCardProps } from "@/components/PricingComponent/PricingCard";

export interface PricingCardItem extends Omit<PricingCardProps, "icon"> {
  icon: LucideIcon;
}

export const pricingSectionContent: {
  heading: string;
  subheading: string;
  cards: PricingCardItem[];
} = {
  heading: "Flexible Pricing For Every Learning Goal",
  subheading:
    "Choose from personalized tutoring plans, exam prep programs, and monthly learning packages designed to fit your schedule and academic needs!",
  cards: [
    {
      icon: CalendarDays,
      title: "Monthly Program",
      subtitle: "Best for consistent growth",
      features: [
        "2 sessions per week",
        "Small group (6-8 students)",
        "Monthly progress tracking",
        "Exam strategy included",
      ],
      price: 185,
      priceMax: 200,
      priceCaption: "per month, no hidden fees",
      ctaText: "Enroll Today!",
    },
    {
      icon: Users,
      title: "1 On 1 Tutoring",
      subtitle: "Maximum personalization",
      features: [
        "Fully personalized sessions",
        "Flexible scheduling",
        "Faster targeted improvement",
        "Custom learning plan",
      ],
      price: 75,
      priceMax: 100,
      priceCaption: "based on subject and level",
      ctaText: "Book Free Consultation",
    },
    {
      icon: Rocket,
      title: "Exam Booster",
      subtitle: "Intensive exam preparation",
      features: [
        "2-week intensive program",
        "Past paper practice",
        "Test-taking strategy",
        "IB & AP specialized",
      ],
      price: 280,
      priceCaption: "per intensive course",
      ctaText: "Start Preparing",
    },
  ],
};
