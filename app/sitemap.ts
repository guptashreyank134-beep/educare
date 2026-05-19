import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://drshreyankeducare.com";

  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/pricing",
    "/privacy",
    "/programs",
    "/programs/biology",
    "/programs/burnaby-stem-tutoring",
    "/programs/chemistry",
    "/programs/computer-science",
    "/programs/finance",
    "/programs/french",
    "/programs/gmat-prep",
    "/programs/gre-prep",
    "/programs/ib-ap-tutoring",
    "/programs/javascript",
    "/programs/mandarin",
    "/programs/mathematics",
    "/programs/mcat-prep",
    "/programs/physics",
    "/programs/physics-tutoring",
    "/programs/pre-calculus",
    "/programs/python",
    "/programs/sat-prep",
    "/programs/university-biology",
    "/programs/university-chemistry",
    "/programs/university-finance",
    "/programs/university-mathematics",
    "/programs/university-physics",
    "/programs/vancouver-math-tutoring",
    "/programs/web-development",
    "/resources",
    "/services",
    "/terms",
  ];

  let dynamicRoutes: string[] = [];
  try {
    const posts = await client.fetch<Array<{ slug: string }>>(
      `*[_type == "post" && defined(slug.current)] {
        "slug": slug.current
      }`
    );
    dynamicRoutes = posts.map((post) => `/blog/${post.slug}`);
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  return allRoutes.map((route) => {
    const suffix = route.endsWith("/") ? "" : "/";
    return {
      url: `${baseUrl}${route}${suffix}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1 : 0.8,
    };
  });
}

