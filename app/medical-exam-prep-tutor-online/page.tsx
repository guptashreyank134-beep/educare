import VerticalLandingPage, { verticalMetadata } from "@/components/VerticalLandingPage";

const SLUG = "medical-exam-prep-tutor-online";

export function generateMetadata() {
  return verticalMetadata(SLUG);
}

export default function Page() {
  return <VerticalLandingPage slug={SLUG} />;
}

export const revalidate = 3600;
