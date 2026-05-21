import type { ReactNode } from "react";

interface HeroBreadcrumbProps {
  children: ReactNode;
  nearHeader?: boolean;
}

const HeroBreadcrumb = ({ children, nearHeader = false }: HeroBreadcrumbProps) => {
  if (nearHeader) {
    return (
      <div className="relative mb-6 h-9 sm:mb-8 lg:mb-10">
        <div className="absolute left-0 -top-2 sm:-top-6 lg:-top-22">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 flex justify-start sm:mb-14 lg:mb-16">
      {children}
    </div>
  );
};

export default HeroBreadcrumb;
