/** @format */

import type { ReactNode } from "react";

export interface GeneralHeroSectionProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonVisiblity?: boolean;
  breadcrumb?: ReactNode;
  image?: {
    src: string;
    alt: string;
    href?: string;
  };
}

export const AboutHeroSectionContent = {
  heading: "A More Focused Approach to Learning",
  description:
    "At Dr. Shreyank Educare, we help students move beyond confusion and build true understanding through structured, personalized, and engaging learning experiences.",
  buttonText: "Get a free consultation",
  buttonVisiblity: true, // This is just for an example, if you want to hide the button for this section, set it to false. (default if true)
  image: {
    src: "aboutUsPage/AboutHeroImg.webp",
    alt: "About Us Hero Image",
    href: "/contact",
  },
};

export const ServicesHeroSectionContent = {
  heading: "Customized Tutoring,\n for Academic Excellence",
  description:
    "From personalized tutoring to structured exam preparation and summer programs, we provide the right support at every stage of your academic journey.",
  buttonText: "Get a free consultation",
  image: {
    src: "servicesPage/ServicesHeroImg.webp",
    alt: "About Us Hero Image",
    href: "/contact",
  },
};

export const ResourcesHeroSectionContent = {
  heading: "Resources Designed to Help\n Students Learn Smarter",
  description:
    "Explore helpful study materials, watch real tutoring sessions, and get answers to common questions , all designed to support students beyond the classroom.",
  buttonText: "Get a free consultation",
  buttonVisiblity: false,
  image: {
    src: "servicesPage/ServicesHeroImg.webp",
    alt: "About Us Hero Image",
    href: "/contact",
  },
};

export const ProgramsHeroSectionContent = {
  heading: "Find a Program That Works for You",
  description:
    "Build strong academic foundations with personalized tutoring designed\nto simplify concepts, improve problem-solving, and boost performance\nacross school and university levels.",
  buttonText: "Book a Free 30-Minute Consultation",
  buttonVisiblity: true,
  image: {
    src: "programsHeroImage.jpg",
    alt: "Programs Hero Image",
    href: "/contact",
  },
};

export const ChemistryHeroSectionContent = {
  heading: "Master Chemistry with\nExpert Personalized Tutoring",
  description:
    "Unlock your potential in Chemistry with Dr. Shreyank Educare. Our specialized tutoring simplifies complex concepts, from atomic structures to advanced organic reactions, helping you achieve top grades and exam success.",
  buttonText: "Book a Free 30-Minute Consultation",
  buttonVisiblity: true,
  image: {
    src: "chemistryHeroImg.png",
    alt: "Chemistry Tutoring",
    href: "/contact",
  },
};

export interface KeySectionCard {
  title: string;
  description: string;
}

export interface KeySectionContent {
  heading: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: string;
  cards: KeySectionCard[];
}

export const keySectionContent: KeySectionContent = {
  heading: "Our Approach, A Structured Learning Process",
  description:
    "Success in math and science requires more than memorization; it demands clarity, application, and practice. Our teaching method is built around a simple but effective three-step process.",
  imageUrl: "/assets/aboutUsPage/profStanding.webp",
  imageAlt: "Our Approach Image",
  icon: "layers",
  cards: [
    {
      title: "Building Strong Foundations",
      description:
        "We ensure students fully understand the underlying theory before moving to complex problems.",
    },
    {
      title: "Demonstrating Practical Problem-Solving Techniques",
      description:
        "Students are guided through step-by-step methods to apply concepts effectively.",
    },
    {
      title: "Reinforcing Learning Through Practice",
      description:
        "Consistent practice helps students build confidence, accuracy, and speed over time.",
    },
  ],
};

export const BlogsHeroSectionContent = {
  heading: "Stay Informed with the\nLatest Educational Insights",
  description:
    "Explore expert tips, rigorous study guides, and actionable industry insights from Dr. Shreyank Educare to elevate academic success.",
  buttonText: "Browse Articles",
  buttonVisiblity: false,
  image: {
    src: "servicesPage/ServicesHeroImg.webp",
    alt: "Educare Blog Hero Image",
    href: "/blog",
  },
};
