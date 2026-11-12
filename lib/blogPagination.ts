import { redirectSources } from "../data/redirects";

export const POSTS_PER_PAGE = 9;
export const BLOG_CACHE_TAG = "published-blog-posts";
// Lists and the sitemap must expire together when a post is published or removed.
export const BLOG_FETCH_OPTIONS = {
  next: { revalidate: 3600, tags: [BLOG_CACHE_TAG] },
};
export const REDIRECTED_POST_SLUGS = [...redirectSources]
  .filter((path) => path.startsWith("/blog/"))
  .map((path) => path.slice("/blog/".length));
// A CMS import can leave two published documents with the same public slug.
// Select the newest record, with a stable ID tie-breaker, before counting/slicing.
export const LISTED_POSTS = `*[_type == "post" && defined(slug.current) && !(slug.current in $excluded)
  && _id == (*[_type == "post" && slug.current == ^.slug.current]
    | order(_updatedAt desc, _id asc))[0]._id]`;

// One GROQ response gives each archive page's count and cards the same snapshot.
// The slug/ID tie-breakers keep pagination stable when publication dates match.
export const BLOG_LISTING_QUERY = `{
  "posts": ${LISTED_POSTS} | order(publishedAt desc, slug.current asc, _id asc) [$start...$end] {
    _id, title, "slug": slug.current, publishedAt, excerpt, body, mainImage
  },
  "totalPosts": count(${LISTED_POSTS})
}`;

export function blogPageCount(postCount: number): number {
  return Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE));
}
