import { cities, cityUrl } from "@/data/cities";
import { verticalPages, verticalUrl } from "@/data/verticalPages";
import { seoPages, seoPageUrl } from "@/data/seoPages";
import { client } from "@/sanity/lib/client";

const BASE = "https://www.drshreyankeducare.com";

/**
 * Serves /llms.txt — an llmstxt.org-style overview of the site so AI systems
 * can discover and cite the right pages. Generated from the same data files
 * that drive the pages, so it stays in sync.
 */
export async function GET() {
  const lines: string[] = [];

  lines.push("# Dr. Shreyank Educare");
  lines.push("");
  lines.push(
    "> PhD-led, 5-star-rated tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university across Burnaby & Vancouver — in person and online — plus online University & Professional tutoring (Economics, Statistics, Actuarial Science, R) and MD-led Medical tutoring for USA & Caribbean students."
  );
  lines.push("");
  lines.push(
    "Dr. Shreyank Educare is a Burnaby-based tutoring service led by Dr. Shreyank Gupta (PhD, 10+ years' experience), rated 5.0 from 41 Google reviews. We offer one-on-one, curriculum-aligned tutoring aligned to the BC curriculum, IB and AP, with a strong focus on genuine understanding and exam results."
  );
  lines.push("");
  lines.push(
    `For the full inlined content — every program FAQ and complete blog article text — see ${BASE}/llms-full.txt.`
  );
  lines.push("");

  // Main pages
  lines.push("## Main Pages");
  const mainPages: [string, string, string][] = [
    ["Home", "/", "Tutoring in Burnaby & Vancouver — Math, Physics, Chemistry & Coding."],
    ["About", "/about", "About Dr. Shreyank Educare and our approach."],
    ["Services", "/services", "Our tutoring services and formats."],
    ["Programs", "/programs", "All tutoring programs by subject and level."],
    ["Pricing", "/pricing", "Tutoring pricing and plans."],
    ["Resources", "/resources", "Free study resources, practice exams and FAQs."],
    ["Blog", "/blog", "Study guides and subject articles by PhD-qualified educators."],
    ["Locations", "/locations", "Tutoring locations across Metro Vancouver."],
    ["Contact", "/contact", "Book a free 30-minute consultation."],
  ];
  for (const [title, path, desc] of mainPages) {
    lines.push(`- [${title}](${BASE}${path}): ${desc}`);
  }
  lines.push("");

  // Local tutoring by city
  lines.push("## Local Tutoring by City");
  for (const c of cities) {
    lines.push(`- [Math Tutor in ${c.name}](${cityUrl(c.slug)}): ${c.metaDescription}`);
  }
  lines.push("");

  // University & Professional + Medical
  lines.push("## University, Professional & Medical Tutoring");
  for (const p of verticalPages) {
    lines.push(`- [${p.heroHeading}](${verticalUrl(p.slug)}): ${p.metaDescription}`);
  }
  lines.push("");

  // SEO / subject pages grouped by cluster
  const byCluster = new Map<string, typeof seoPages>();
  for (const p of seoPages) {
    if (!byCluster.has(p.cluster)) byCluster.set(p.cluster, []);
    byCluster.get(p.cluster)!.push(p);
  }
  lines.push("## Subject & Local Landing Pages");
  for (const [cluster, pages] of byCluster) {
    lines.push("");
    lines.push(`### ${cluster}`);
    for (const p of pages) {
      lines.push(`- [${p.h1}](${seoPageUrl(p.slug)}): ${p.metaDescription}`);
    }
  }
  lines.push("");

  // Blog articles (from Sanity)
  try {
    const posts = await client.fetch<Array<{ slug: string; title: string; excerpt?: string }>>(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        "slug": slug.current, title, excerpt
      }`
    );
    if (posts.length) {
      lines.push("## Blog Articles");
      for (const post of posts) {
        const desc = post.excerpt ? `: ${post.excerpt}` : "";
        lines.push(`- [${post.title}](${BASE}/blog/${post.slug})${desc}`);
      }
      lines.push("");
    }
  } catch {
    // Sanity unavailable at build/request time — skip the blog section.
  }

  lines.push("## Contact");
  lines.push(
    "- Phone/WhatsApp: +1 672-514-7587 — Email: info@drshreyankeducare.com — Location: 2088 Madison Avenue, Burnaby, BC, Canada."
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export const revalidate = 3600;
