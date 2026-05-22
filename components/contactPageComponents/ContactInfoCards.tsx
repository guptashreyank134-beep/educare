import { Mail, MapPin, PhoneCall, type LucideIcon } from "lucide-react";

export type ContactCard = {
  title: string;
  value: string;
  type: "phone" | "email" | "location";
};

export type ContactInfoCardsProps = {
  cards: ContactCard[];
};

const cardIcons: Record<ContactCard["type"], LucideIcon> = {
  phone: PhoneCall,
  email: Mail,
  location: MapPin,
};

const getContactHref = ({ type, value }: ContactCard) => {
  if (type === "phone") {
    return `tel:${value.replace(/[^\d+]/g, "")}`;
  }

  if (type === "email") {
    return `mailto:${value}`;
  }

  return undefined;
};

const ContactInfoCards = ({ cards }: ContactInfoCardsProps) => {
  if (!cards.length) {
    return null;
  }

  return (
    <section
      aria-label="Contact information"
      className="mx-auto flex w-full max-w-[1296px] flex-col items-center justify-center gap-8 px-4 sm:px-6 md:flex-row md:flex-wrap md:gap-10 xl:flex-nowrap xl:gap-20"
    >
      {cards.map((card) => {
        const Icon = cardIcons[card.type];
        const href = getContactHref(card);

        const valueContent = (
          <span className="block break-words text-center font-bricolage text-[18px] font-normal leading-[22px] text-[#2C3340] [overflow-wrap:anywhere]">
            {card.value}
          </span>
        );

        return (
          <article
            key={`${card.type}-${card.title}`}
            className="flex min-h-[140px] w-full max-w-[295px] flex-col rounded-[8px] bg-white p-5 shadow-[0px_0px_25px_0px_#5757561A] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0px_14px_32px_0px_#57575624] sm:w-[295px]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#E7DA73] text-[#2C3340]">
                <Icon className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />
              </div>

              <h3 className="relative inline-block font-bricolage text-[22px] font-normal capitalize leading-[22px] text-[#2C3340] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-[#E7DA73]">
                {card.title}
              </h3>
            </div>

            <div className="flex flex-1 items-center justify-center pt-8">
              {href ? (
                <a
                  href={href}
                  className="transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {valueContent}
                </a>
              ) : (
                valueContent
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ContactInfoCards;
