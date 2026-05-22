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
  return getMetadata(data, "https://drshreyankeducare.com/contact");
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
        </div>
      </section>
    </>
  );
};

export default ContactPage;

export const revalidate = 3600;
