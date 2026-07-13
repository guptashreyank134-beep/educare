import CityLandingPage, { cityMetadata } from "@/components/CityLandingPage";

const CITY_SLUG = "port-coquitlam";

export function generateMetadata() {
  return cityMetadata(CITY_SLUG);
}

export default function Page() {
  return <CityLandingPage slug={CITY_SLUG} />;
}

export const revalidate = 3600;
