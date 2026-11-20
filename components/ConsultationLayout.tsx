import type { ReactNode } from "react";

/** Keep course details flowing beside a desktop enquiry, with the form early
 * in the reading order on phones. The sidebar spans both content rows so its
 * height cannot push the course description below an otherwise empty column. */
export default function ConsultationLayout({
  intro,
  consultation,
  children,
  className = "",
}: {
  intro: ReactNode;
  consultation: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-consultation-layout
      className={`grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:grid-rows-[auto_1fr] lg:gap-x-10 ${className}`}
    >
      <div data-consultation-intro className="min-w-0 lg:col-start-1 lg:row-start-1">
        {intro}
      </div>
      <div data-consultation-aside className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
        {consultation}
      </div>
      {children && (
        <div data-consultation-content className="@container min-w-0 lg:col-start-1 lg:row-start-2">
          {children}
        </div>
      )}
    </div>
  );
}
