import CityLandingPage, { cityMetadata } from "@/components/CityLandingPage";

const CITY_SLUG = "west-vancouver";

export function generateMetadata() {
  return cityMetadata(CITY_SLUG);
}

export default function Page() {
  return <CityLandingPage slug={CITY_SLUG} />;
}

export const revalidate = 3600;
