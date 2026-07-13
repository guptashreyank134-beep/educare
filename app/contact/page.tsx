import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import HeroBreadcrumb from "@/components/GeneralComponents/HeroBreadcrumb";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";
import ContactInfoCards, {
  type ContactCard,
} from "@/components/contactPageComponents/ContactInfoCards";

const fallbackContactCards: ContactCard[] = [
  {
    title: "Call Us",
    value: "+1 672-514-7587",
    type: "phone",
  },
  {
    title: "E-Mail Us",
    value: "info@drshreyankeducare.com",
    type: "email",
  },
  {
    title: "Reach Us",
    value: "2088 Madison Avenue, Burnaby, V5C 6T5, BC, Canada",
    type: "location",
  },
];

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "contact");
  return getMetadata(data, "https://drshreyankeducare.com/contact", {
    title: "Contact Dr. Shreyank Educare | Tutoring in Burnaby & Vancouver",
    description:
      "Get in touch with Dr. Shreyank Educare for tutoring in Burnaby & Vancouver. Call, email or book a free 30-minute consultation — we usually reply within 24 hours.",
  });
}

const ContactPage = async () => {
  const data = await getMetaDataBySlug("page", "contact");
  const contactCards =
    (data?.contactCards as ContactCard[] | undefined) ?? fallbackContactCards;

  return (
    <>
      <JsonLd
        schema={getPageSchema(data, "https://drshreyankeducare.com/contact")}
      />
      <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-20">
        <div
          className="absolute inset-0 z-0 opacity-150 pointer-events-none"
          style={{
            backgroundImage: "url('/backgrounds/yellowGrid.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBreadcrumb nearHeader>
            <Breadcrumbs />
          </HeroBreadcrumb>

          <div className="space-y-8">
            <div className="text-center max-w-181.5 mx-auto">
              <h1 className="text-4xl md:text-[32px] font-bricolage font-display text-slate leading-7 mb-4">
                Let's Build a Smarter Learning Journey Together!
              </h1>
              <p className="text-base max-w-146.5 mx-auto font-montserrat text-slate leading-7">
                Whether you're looking for personalized tutoring, academic
                guidance, exam preparation, or simply want to understand which
                program is right for you, our team is here to help.
              </p>
            </div>

            <ContactInfoCards cards={contactCards} />
          </div>

          {/* Supporting content — how we help + FAQ */}
          <div className="mt-16 max-w-3xl mx-auto space-y-10">
            <div className="space-y-4 text-[16px] font-montserrat text-slate leading-7">
              <h2 className="text-[26px] font-bricolage font-medium text-slate">
                How We Can Help
              </h2>
              <p>
                Dr. Shreyank Educare provides PhD-led tutoring in Math, Physics,
                Chemistry and Coding for students in Grades 6–12 and university,
                along with advanced University &amp; Professional and Medical
                tutoring. When you get in touch, we start by understanding your
                goals — catching up, keeping up, exam preparation, or getting
                ahead — and recommend the right program and tutor for you.
              </p>
              <p>
                The fastest way to begin is a free 30-minute consultation. During
                that call we assess your current level, discuss timelines and
                targets, and outline a personalised plan. There is no obligation,
                and you will leave with a clear next step. We typically respond to
                enquiries within 24 hours on business days.
              </p>
              <p>
                We offer both in-person sessions at our Burnaby centre and flexible
                online tutoring across Metro Vancouver — including Vancouver,
                Coquitlam, the North Shore, Surrey, Richmond and beyond — as well as
                fully online tutoring for university and professional learners
                worldwide.
              </p>
            </div>

            <div className="space-y-5">
              <h2 className="text-[26px] font-bricolage font-medium text-slate">
                Frequently Asked Questions
              </h2>
              {[
                {
                  q: "How quickly will you respond?",
                  a: "We usually reply to calls, emails and form enquiries within 24 hours on business days.",
                },
                {
                  q: "Is the first consultation really free?",
                  a: "Yes. Your initial 30-minute consultation is completely free and comes with no obligation.",
                },
                {
                  q: "Do you offer online and in-person tutoring?",
                  a: "Both. We tutor in person at our Burnaby centre and online across Metro Vancouver and worldwide.",
                },
                {
                  q: "Which subjects and levels do you cover?",
                  a: "Math, Physics, Chemistry and Coding for Grades 6–12 and university, plus University & Professional (Economics, Statistics, Actuarial, R) and MD-led Medical tutoring.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-[16px] font-montserrat text-slate leading-7">
                  <p className="font-medium">{item.q}</p>
                  <p className="opacity-90">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;

export const revalidate = 3600;
