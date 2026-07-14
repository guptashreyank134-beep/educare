import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation webhook for Sanity.
 *
 * Configure a webhook in Sanity (Manage > API > Webhooks):
 *   - URL:        https://www.drshreyankeducare.com/api/revalidate
 *   - Trigger on: Create, Update, Delete
 *   - HTTP method: POST
 *   - HTTP header: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *   - Projection:  { "_type": _type, "slug": slug.current }
 *
 * Set SANITY_REVALIDATE_SECRET in the environment to the same value.
 */

// Map a changed document to the site path(s) it affects.
function pathsForDocument(type?: string, slug?: string): string[] {
  switch (type) {
    case "vancouverPage":
      return ["/"];
    case "resourcePage":
      return ["/resources"];
    case "post":
      // The individual post and the blog listing (which shows recent posts).
      return slug ? [`/blog/${slug}`, "/blog"] : ["/blog"];
    case "programPage":
      return slug ? [`/programs/${slug}`] : ["/programs"];
    case "page":
      // Standalone pages: slug "about" -> /about, "services" -> /services, etc.
      return slug ? [`/${slug}`] : [];
    default:
      return [];
  }
}

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.replace(/^Bearer\s+/i, "").trim();
  const querySecret = request.nextUrl.searchParams.get("secret");

  return bearer === secret || querySecret === secret;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string; slug?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ revalidated: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const paths = pathsForDocument(body._type, body.slug);

  if (paths.length === 0) {
    return NextResponse.json({
      revalidated: false,
      message: `No route mapping for document type "${body._type ?? "unknown"}"`,
    });
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}
