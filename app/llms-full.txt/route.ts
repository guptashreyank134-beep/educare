import { cities, cityUrl } from "@/data/cities";
import { verticalPages, verticalUrl } from "@/data/verticalPages";
import { seoPages, seoPageUrl } from "@/data/seoPages";
import { client } from "@/sanity/lib/client";
import { REVIEW_RATING, REVIEW_COUNT } from "@/data/reviews";

const BASE = "https://www.drshreyankeducare.com";

/**
 * Serves /llms-full.txt — a fuller companion to /llms.txt. Where llms.txt is a
 * link index, this inlines the actual content (org facts, founder credentials,
 * every program FAQ, and full blog article text) so AI answer engines can read
 * and cite the site without fetching each page. Generated from the same data
 * and Sanity content that drive the pages, so it stays in sync.
 */
function plainText(blocks: unknown): string {
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];
  for (const b of blocks as any[]) {
    if (!b || b._type !== "block" || !Array.isArray(b.children)) continue; // skip math/html/image blocks
    const text = b.children.map((c: any) => c?.text || "").join("").trim();
    if (text) out.push(text);
  }
  return out.join("\n\n");
}

export async function GET() {
  const lines: string[] = [];

  lines.push("# Dr. Shreyank Educare — Full Content");
  lines.push("");
  lines.push(
    `> PhD-led, 5-star-rated (${REVIEW_RATING.toFixed(1)} from ${REVIEW_COUNT} Google reviews) tutoring in Math, Physics, Chemistry, Biology and Coding for Grades 6–12 and university across Burnaby & Vancouver — in person and online — plus online University & Professional tutoring (Economics, Statistics, Actuarial Science, R), MD-led Medical tutoring for USA & Caribbean students, and SAT/GRE/GMAT/MCAT exam prep.`
  );
  lines.push("");

  // Key facts (machine-readable, high-signal for AI answers)
  lines.push("## Key Facts");
  lines.push("- Name: Dr. Shreyank Educare");
  lines.push("- Founder: Dr. Shreyank Gupta — PhD in Ultrasound Signal & Image Processing (University of Quebec), 10+ years teaching experience.");
  lines.push(`- Rating: ${REVIEW_RATING.toFixed(1)} out of 5 from ${REVIEW_COUNT} Google reviews.`);
  lines.push("- Location: 2088 Madison Avenue, Burnaby, BC, Canada. Serves Burnaby, Vancouver and Metro Vancouver in person, and students worldwide online.");
  lines.push("- Contact: +1 672-514-7587 (phone/WhatsApp), info@drshreyankeducare.com.");
  lines.push("- Subjects: Math, Pre-Calculus, Calculus, Physics, Chemistry, Biology, Computer Science, Python, JavaScript, Web Development; IB & AP; SAT, GRE, GMAT, MCAT; university calculus, physics, chemistry, statistics, finance (CFA, MBA, BCom); MD-led medical sciences; French and Mandarin.");
  lines.push("- Curriculum: aligned to the BC curriculum, IB and AP. Free 30-minute consultation available.");
  lines.push("");

  // Main pages
  lines.push("## Main Pages");
  const mainPages: [string, string, string][] = [
    ["Home", "/", "Tutoring in Burnaby & Vancouver — Math, Physics, Chemistry & Coding."],
    ["About", "/about", "About Dr. Shreyank Educare and the founder's background."],
    ["Services", "/services", "Tutoring services and formats."],
    ["Programs", "/programs", "All tutoring programs by subject and level."],
    ["Pricing", "/pricing", "Tutoring pricing and plans."],
    ["Resources", "/resources", "Free study resources, practice exams and FAQs."],
    ["Blog", "/blog", "Study guides and subject articles by PhD-qualified educators."],
    ["Locations", "/locations", "Tutoring locations across Metro Vancouver."],
    ["Contact", "/contact", "Book a free 30-minute consultation."],
  ];
  for (const [title, path, desc] of mainPages) lines.push(`- [${title}](${BASE}${path}): ${desc}`);
  lines.push("");

  // Local coverage
  lines.push("## Local Tutoring Coverage");
  for (const c of cities) lines.push(`- [Math Tutor in ${c.name}](${cityUrl(c.slug)}): ${c.metaDescription}`);
  lines.push("");

  // University / Professional / Medical
  lines.push("## University, Professional & Medical Tutoring");
  for (const p of verticalPages) lines.push(`- [${p.heroHeading}](${verticalUrl(p.slug)}): ${p.metaDescription}`);
  lines.push("");

  // Program FAQs inlined (direct, citable Q&A)
  try {
    const programs = await client.fetch<Array<{ title?: string; slug: string; faqs?: Array<{ question: string; answer: unknown }> }>>(
      `*[_type == "programPage" && count(faqs) > 0]{ title, "slug": slug.current, faqs[]{ question, answer } } | order(title asc)`
    );
    if (programs.length) {
      lines.push("## Program FAQs");
      for (const p of programs) {
        lines.push("");
        lines.push(`### ${p.title || p.slug} (${BASE}/programs/${p.slug})`);
        for (const f of p.faqs || []) {
          lines.push(`**Q: ${f.question}**`);
          lines.push(plainText(f.answer));
          lines.push("");
        }
      }
    }
  } catch {
    /* Sanity unavailable — skip. */
  }

  // Subject / local landing pages (link index)
  lines.push("## Subject & Local Landing Pages");
  for (const p of seoPages) lines.push(`- [${p.h1}](${seoPageUrl(p.slug)}): ${p.metaDescription}`);
  lines.push("");

  // Blog articles — full text inlined
  try {
    const posts = await client.fetch<Array<{ slug: string; title: string; excerpt?: string; body?: unknown }>>(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ "slug": slug.current, title, excerpt, body }`
    );
    if (posts.length) {
      lines.push("## Blog Articles (Full Text)");
      for (const post of posts) {
        lines.push("");
        lines.push(`### ${post.title}`);
        lines.push(`URL: ${BASE}/blog/${post.slug}`);
        lines.push("");
        const body = plainText(post.body);
        lines.push(body || post.excerpt || "");
        lines.push("");
      }
    }
  } catch {
    /* Sanity unavailable — skip. */
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export const revalidate = 3600;
