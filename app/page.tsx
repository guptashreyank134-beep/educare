import HomeView from "@/components/Home";
import { getMetaDataBySlug, getMetadata } from "@/utils/seoBuilder";
import { JsonLd, getPageSchema } from "@/components/SchemaMarkup";

export async function generateMetadata() {
  const data = await getMetaDataBySlug("page", "home");
  return getMetadata(data, "https://drshreyankeducare.com/");
}

export default async function Home() {
  const data = await getMetaDataBySlug("page", "home");
  return (
    <>
      <JsonLd schema={getPageSchema(data, "https://drshreyankeducare.com/")} />
      <HomeView />
    </>
  );
}

export const dynamic = "force-dynamic";
