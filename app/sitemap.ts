import type { MetadataRoute } from "next";

const SITE_URL = "https://drshreyankeducare.com";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programs", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.25 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.25 },
] as const;

const programRoutes = [
  "/programs/biology",
  "/programs/chemistry",
  "/programs/computer-science",
  "/programs/finance",
  "/programs/french",
  "/programs/gmat-prep",
  "/programs/gre-prep",
  "/programs/javascript",
  "/programs/mandarin",
  "/programs/mathematics",
  "/programs/mcat-prep",
  "/programs/physics",
  "/programs/python",
  "/programs/sat-prep",
  "/programs/university-biology",
  "/programs/university-chemistry",
  "/programs/university-finance",
  "/programs/university-mathematics",
  "/programs/university-physics",
  "/programs/web-development",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...programRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
