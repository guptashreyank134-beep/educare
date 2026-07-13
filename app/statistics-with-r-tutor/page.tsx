import VerticalLandingPage, { verticalMetadata } from "@/components/VerticalLandingPage";

const SLUG = "statistics-with-r-tutor";

export function generateMetadata() {
  return verticalMetadata(SLUG);
}

export default function Page() {
  return <VerticalLandingPage slug={SLUG} />;
}

export const revalidate = 3600;
