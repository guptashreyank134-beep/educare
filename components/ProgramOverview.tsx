import { Children, isValidElement, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function ProgramOverview({ intro, consultation, children }: {
  intro: ReactNode;
  consultation: ReactNode;
  children: ReactNode;
}) {
  // At laptop widths only the opening cards share the form's row. Wider
  // desktops can fit another pair alongside it. Long articles always span
  // the section once the form ends.
  const rows: { cards: ReactNode[]; wide: boolean }[] = [];
  for (const card of Children.toArray(children)) {
    const wide = isValidElement<{ wide?: boolean }>(card) && card.props.wide === true;
    const previous = rows.at(-1);
    if (!wide && previous && !previous.wide && previous.cards.length === 1) {
      previous.cards.push(card);
    } else {
      rows.push({ cards: [card], wide });
    }
  }

  return (
    <section data-program-overview data-consultation-layout className="mt-10 flow-root lg:[--panel-width:26.25rem] lg:[--panel-gap:2.5rem]">
      <div data-consultation-intro className="mb-8 min-w-0 lg:float-left lg:w-[calc(100%-var(--panel-width)-var(--panel-gap))]">
        {intro}
      </div>
      <div data-consultation-aside className="mb-8 min-w-0 lg:float-right lg:mb-5 lg:ml-[var(--panel-gap)] lg:w-[var(--panel-width)]">
        {consultation}
      </div>
      {rows.map(({ cards, wide }, index) => (
        <div
          key={index}
          data-consultation-content={index === 0 ? true : undefined}
          data-program-row
          className={`@container/program-overview mb-5 flow-root min-w-0 last:mb-0 ${index === 0 && !wide ? "clear-left" : "clear-both"} ${wide ? "" : "xl:clear-left"}`}
        >
          <div className="grid min-w-0 gap-5 @[30rem]/program-overview:grid-cols-2 [&>:only-child]:col-span-full">
            {cards}
          </div>
        </div>
      ))}
    </section>
  );
}

export function ProgramInfoCard({
  icon: Icon,
  title,
  wide = false,
  children,
}: {
  icon: LucideIcon;
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      data-program-card
      className={`min-w-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6 ${wide ? "col-span-full" : ""}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-light text-slate">
          <Icon size={22} aria-hidden="true" />
        </span>
        <h2 className="text-[22px] font-bricolage font-medium leading-tight text-slate">{title}</h2>
      </div>
      {children}
    </article>
  );
}

export function ProgramBulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] sm:text-[16px] font-montserrat leading-relaxed text-slate/85">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProgramApproach({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div data-program-approach className="grid gap-4 @[36rem]/program-overview:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-[#E2E8F0] bg-bg-grey p-4">
          <h3 className="mb-2 text-[16px] font-montserrat font-semibold text-slate">{item.title}</h3>
          <p className="text-[15px] font-montserrat leading-relaxed text-slate/75">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
