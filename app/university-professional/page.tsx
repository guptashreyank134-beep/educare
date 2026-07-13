import VerticalLandingPage, { verticalMetadata } from "@/components/VerticalLandingPage";

const SLUG = "university-professional";

export function generateMetadata() {
  return verticalMetadata(SLUG);
}

export default function Page() {
  return <VerticalLandingPage slug={SLUG} />;
}

export const revalidate = 3600;
