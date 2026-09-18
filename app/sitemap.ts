import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { cities, cityPath } from "@/data/cities";
import { verticalPages, verticalPath } from "@/data/verticalPages";
import { seoPages, seoPagePath } from "@/data/seoPages";
import { redirectSources } from "@/data/redirects";
import { noindexPaths } from "@/content/page-policy";
import routeDates from "@/data/route-dates.json";
import { LEAD_AUTHOR } from "@/data/authors";
import { SITE_URL } from "@/data/businessInfo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  const cityRoutes = cities.map((c) => cityPath(c.slug));
  const verticalRoutes = verticalPages.map((p) => verticalPath(p.slug));
  const seoRoutes = seoPages.map((p) => seoPagePath(p.slug));

  const staticRoutes = [
    "",
    "/about",
    `/about/${LEAD_AUTHOR.slug}`,
    "/blog",
    "/book",
    "/contact",
    "/pricing",
    "/privacy",
    "/locations",
    "/guides/how-to-choose-a-tutor-burnaby-vancouver",
    ...verticalRoutes,
    ...cityRoutes,
    ...seoRoutes,
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
  // CMS-backed pages carry their own real modification time.
  const cmsDates = new Map<string, string>();
  try {
    const posts = await client.fetch<Array<{ slug: string; updatedAt?: string }>>(
      `*[_type == "post" && defined(slug.current)] {
        "slug": slug.current,
        "updatedAt": coalesce(_updatedAt, publishedAt)
      }`
    );
    dynamicRoutes = posts.map((post) => `/blog/${post.slug}`);
    for (const post of posts) {
      if (post.updatedAt) cmsDates.set(`/blog/${post.slug}`, post.updatedAt);
    }

    // Path-based blog pagination pages (/blog is page 1; extras are /blog/page/N)
    const POSTS_PER_PAGE = 9;
    const totalBlogPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    for (let p = 2; p <= totalBlogPages; p++) {
      dynamicRoutes.push(`/blog/page/${p}`);
    }
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  // Landing and program pages render Sanity overrides on top of their code
  // definition, so when an override exists its _updatedAt is the truer "last
  // changed" for that URL than the commit that last touched the data file.
  try {
    const overrides = await client.fetch<Array<{ path?: string; updatedAt?: string }>>(
      `*[_type in ["pageFaq", "programPage"]] {
        "path": select(
          _type == "pageFaq" => "/" + pageSlug,
          _type == "programPage" => "/programs/" + slug.current
        ),
        "updatedAt": _updatedAt
      }`
    );
    for (const override of overrides) {
      if (override.path && override.updatedAt) cmsDates.set(override.path, override.updatedAt);
    }
  } catch (error) {
    console.error("Error fetching page overrides for sitemap:", error);
  }

  // Exclude any route that is a permanent-redirect source: a sitemap must list
  // only canonical, indexable URLs, never a URL that 308s elsewhere.
  const allRoutes = [...staticRoutes, ...dynamicRoutes].filter((route) => {
    const path = route.replace(/\/+$/, "") || "/";
    return !redirectSources.has(path) && !noindexPaths.has(path);
  });

  const fileDates = routeDates as Record<string, string>;

  return allRoutes.map((route) => {
    // The site serves canonical URLs WITHOUT a trailing slash (Next default
    // trailingSlash:false). Emitting "/about/" here made every sitemap entry a
    // 301 to its slash-less form, which Seobility flagged as 266 internal
    // redirects. Match the canonical form: root keeps its slash, nothing else.
    const normalized = route.replace(/\/+$/, "");
    const path = normalized || "/";
    // A real date or none at all. Every URL previously carried the build time,
    // which tells a crawler nothing and trains it to ignore the signal.
    const lastModified = cmsDates.get(path) ?? fileDates[path];
    return {
      url: normalized === "" ? `${baseUrl}/` : `${baseUrl}${normalized}`,
      ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    };
  });
}

