import VerticalLandingPage, { verticalMetadata } from "@/components/VerticalLandingPage";

const SLUG = "actuarial-exam-tutor-online";

export function generateMetadata() {
  return verticalMetadata(SLUG);
}

export default function Page() {
  return <VerticalLandingPage slug={SLUG} />;
}

export const revalidate = 3600;
