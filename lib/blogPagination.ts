import { redirectSources } from "../data/redirects";

export const POSTS_PER_PAGE = 9;
export const REDIRECTED_POST_SLUGS = [...redirectSources]
  .filter((path) => path.startsWith("/blog/"))
  .map((path) => path.slice("/blog/".length));
// A CMS import can leave two published documents with the same public slug.
// Select the newest record, with a stable ID tie-breaker, before counting/slicing.
export const LISTED_POSTS = `*[_type == "post" && defined(slug.current) && !(slug.current in $excluded)
  && _id == (*[_type == "post" && slug.current == ^.slug.current]
    | order(_updatedAt desc, _id asc))[0]._id]`;

export function blogPageCount(postCount: number): number {
  return Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE));
}
