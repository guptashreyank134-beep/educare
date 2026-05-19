import type { MetadataRoute } from "next";

const SITE_URL = "https://drshreyankeducare.com";

const DISALLOWED_PATHS = [
  "/api/",
  "/api",
  "/studio/",
  "/studio",
  "/admin/",
  "/admin",
  "/dashboard/",
  "/dashboard",
  "/login/",
  "/login",
  "/preview/",
  "/preview",
  "/draft/",
  "/draft",
  "/internal/",
  "/internal",
  "/private/",
  "/private",
  "/_vercel/",
  "/*?*",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED_PATHS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
