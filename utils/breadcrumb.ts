/** @format */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const normalizeSegment = (segment: string) => {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .trim();
};

export const buildBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
  if (!pathname || pathname === "/") return [];

  const segments = pathname
    .split("/")
    .filter((segment) => segment && segment.length > 0);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return {
      label: normalizeSegment(segment),
      href: index < segments.length - 1 ? href : undefined,
    };
  });
};
