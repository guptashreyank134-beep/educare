/** @format */

export interface PolicySection {
  heading: string;
  content: string[];
}

export const PrivacyPolicyContent = {
  title: "Privacy Policy",
  lastUpdated: "Last Updated: January 2026",
  introduction:
    "At Dr. Shreyank Educare, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.",
  sections: [
    {
      heading: "1. Information We Collect",
      content: [
        "Personal Information: We collect information you provide directly, such as your name, email address, phone number, and academic background when you sign up for consultations or programs.",
        "Automatically Collected Information: We may collect information about your device, browser type, IP address, and pages visited through cookies and similar technologies.",
        "Student Information: With your consent, we collect information about your academic progress, learning preferences, and performance to tailor our tutoring services.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      content: [
        "To provide and improve our tutoring services and educational programs",
        "To communicate with you about your enrollment, progress, and account updates",
        "To send newsletters, updates, and promotional materials (you can opt out anytime)",
        "To analyze usage patterns and enhance user experience on our website",
        "To comply with legal obligations and resolve disputes",
      ],
    },
    {
      heading: "3. Data Security",
      content: [
        "We use reasonable administrative and technical safeguards intended to protect your personal information from unauthorized access, alteration, and destruction.",
        "No method of transmission or storage over the Internet is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "4. Third-Party Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share information with service providers who assist us in delivering services, subject to strict confidentiality agreements.",
        "We may disclose information when required by law or to protect the safety and rights of our users.",
      ],
    },
    {
      heading: "5. Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information by contacting us.",
        "You can opt out of marketing communications at any time.",
        "You may withdraw your consent to our use of your personal information at any time by contacting us, subject to legal or contractual restrictions.",
        "As a private organization in British Columbia, we handle personal information in line with BC's Personal Information Protection Act (PIPA). To exercise any of these rights, contact us using the details below.",
      ],
    },
    {
      heading: "6. Contact Us",
      content: [
        "If you have any questions about our Privacy Policy or how we handle your information, please contact us at info@drshreyankeducare.com or call +1 (672) 514-7587.",
      ],
    },
  ],
};

export const TermsAndConditionsContent = {
  title: "Terms and Conditions",
  lastUpdated: "Last Updated: January 2026",
  introduction:
    "These Terms and Conditions govern your use of the Dr. Shreyank Educare website and services. By accessing our website or enrolling in our programs, you agree to be bound by these terms.",
  sections: [
    {
      heading: "1. Use of Website",
      content: [
        "You agree to use our website and services only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment.",
        "Prohibited behavior includes: harassing or causing distress or inconvenience; obscene or offensive language; disrupting the normal flow of dialogue within our website.",
      ],
    },
    {
      heading: "2. Intellectual Property Rights",
      content: [
        "All content on our website, including text, graphics, logos, images, and software, is the property of Dr. Shreyank Educare or its content suppliers and is protected by international copyright laws.",
        "You may not reproduce, republish, transmit, or distribute any content without our prior written permission.",
        "Tutoring materials and educational content are provided for personal use only.",
      ],
    },
    {
      heading: "3. Enrollment and Tuition",
      content: [
        "All tuition fees and program costs must be paid in accordance with our posted rates and payment terms.",
        "We accept various payment methods including credit cards, debit cards, and bank transfers.",
        "There are no long-term contracts or minimum monthly requirements.",
      ],
    },
    {
      heading: "4. Refund Policy",
      content: [
        "Refunds are available within 7 days of enrollment if no sessions have been attended.",
        "For ongoing programs, refunds may be available based on the specific program terms.",
        "Requests for refunds must be submitted in writing to  info@drshreyankeducare.com.",
      ],
    },
    {
      heading: "5. Limitation of Liability",
      content: [
        "Dr. Shreyank Educare and its staff are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
        "Our liability is limited to the amount paid by you for the specific service in question.",
      ],
    },
    {
      heading: "6. Academic Results",
      content: [
        "While we strive for academic excellence and student success, we do not guarantee specific grades or exam results.",
        "Success depends on multiple factors including student effort, prior knowledge, and commitment to learning.",
      ],
    },
    {
      heading: "7. Changes to Terms",
      content: [
        "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting.",
        "Your continued use of our website constitutes acceptance of the modified terms.",
      ],
    },
    {
      heading: "8. Governing Law",
      content: [
        "These Terms and Conditions are governed by the laws of the Province of British Columbia and the applicable laws of Canada.",
        "Any disputes shall be resolved in the courts of British Columbia. (This clause, along with the refund, cancellation and limitation-of-liability terms above, should be reviewed by a BC-qualified lawyer.)",
      ],
    },
    {
      heading: "9. Contact Information",
      content: [
        "For questions or concerns about these Terms and Conditions, please contact us at info@drshreyankeducare.com or call +1 (672) 514-7587.",
      ],
    },
  ],
};

export const HeroSectionContent = {
  Privacy: {
    heading: "Privacy Policy",
    description:
      "We value your privacy and are committed to protecting your personal information.",
    buttonVisiblity: false,
    image: {
      src: "servicesPage/ServicesHeroImg.webp",
      alt: "Privacy Policy",
      href: "/contact",
    },
  },
  Terms: {
    heading: "Terms and Conditions",
    description:
      "Please read our terms carefully to understand our policies and your rights.",
    buttonVisiblity: false,
    image: {
      src: "servicesPage/ServicesHeroImg.webp",
      alt: "Terms and Conditions",
      href: "/contact",
    },
  },
};
