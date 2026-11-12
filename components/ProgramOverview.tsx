import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/** Related program facts share the available width instead of forming one
 * narrow list down the left side of a full-width page. */
export function ProgramOverview({ children }: { children: ReactNode }) {
  return (
    <section data-program-overview className="grid min-w-0 gap-5 md:grid-cols-2">
      {children}
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
      className={`min-w-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6 ${wide ? "md:col-span-2" : ""}`}
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
    <div data-program-approach className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-[#E2E8F0] bg-bg-grey p-4">
          <h3 className="mb-2 text-[16px] font-montserrat font-semibold text-slate">{item.title}</h3>
          <p className="text-[15px] font-montserrat leading-relaxed text-slate/75">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
