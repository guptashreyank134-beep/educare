import type { ReactNode } from "react";

interface HeroBreadcrumbProps {
  children: ReactNode;
}

const HeroBreadcrumb = ({ children }: HeroBreadcrumbProps) => {
  return (
    <div className="mb-12 flex justify-start sm:mb-14 lg:mb-16">
      {children}
    </div>
  );
};

export default HeroBreadcrumb;
