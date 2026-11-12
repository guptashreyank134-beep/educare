const BLOG_FAMILY_PREFIXES = [
  "university-mathematics",
  "university-chemistry",
  "university-physics",
  "university-biology",
  "university-finance",
  "computer-science",
  "web-development",
  "burnaby-stem-tutoring",
  "vancouver-math-tutoring",
  "pre-calculus",
  "ib-ap-tutoring",
  "study-skills-coaching",
  "online-economics",
  "after-school-science",
  "course-selection-guidance",
  "gmat-prep",
  "gre-prep",
  "mcat-prep",
  "sat-prep",
  "mathematics",
  "chemistry",
  "biology",
  "physics",
  "javascript",
  "python",
  "mandarin",
  "french",
] as const;

export type RelatedBlogPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  mainImage?: unknown;
};

export function blogFamilyPattern(slug: string): string {
  const prefix = BLOG_FAMILY_PREFIXES.find(
    (candidate) => slug === candidate || slug.startsWith(`${candidate}-`),
  );
  return `${prefix ?? slug.split("-").slice(0, 2).join("-")}-*`;
}

export function selectTopicNeighbours(
  candidates: RelatedBlogPost[],
  currentSlug: string,
  excludedPaths: ReadonlySet<string>,
  limit = 4,
): RelatedBlogPost[] {
  const eligible = candidates.filter(
    (candidate) => !excludedPaths.has(`/blog/${candidate.slug}`),
  );
  const currentIndex = eligible.findIndex(
    (candidate) => candidate.slug === currentSlug,
  );
  if (currentIndex < 0 || eligible.length < 2) return [];

  const selected: RelatedBlogPost[] = [];
  for (
    let distance = 1;
    selected.length < limit && distance < eligible.length;
    distance++
  ) {
    for (const direction of [1, -1]) {
      const index =
        (currentIndex + direction * distance + eligible.length) %
        eligible.length;
      const candidate = eligible[index];
      if (
        candidate.slug !== currentSlug &&
        !selected.some((post) => post.slug === candidate.slug)
      ) {
        selected.push(candidate);
      }
      if (selected.length === limit) break;
    }
  }
  return selected;
}
