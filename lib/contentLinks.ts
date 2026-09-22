import { resolveInternalHref } from "../data/redirects";

/** Correct verified CMS link/label mismatches without rewriting article copy. */
export function resolveContentHref(href: string, label: string): string {
  const path = resolveInternalHref(href);
  const text = label.trim().toLowerCase();
  if (path === "/ap-calculus-tutor-vancouver" && text === "ap computer science tutor in vancouver") {
    return "/ap-computer-science-tutor-vancouver";
  }
  if (path === "/about" && text === "dr. shreyank gupta") {
    return "/about/dr-shreyank-gupta";
  }
  return path;
}

/** Normalize href attributes in trusted CMS HTML without changing text or markup.
 * This is link repair, not an HTML sanitizer.
 */
export function repairContentLinks(html: string): string {
  return html.replace(/(<a\b[^>]*?\s+href\s*=\s*)(["'])(.*?)\2/gi,
    (_, prefix, quote, href) => `${prefix}${quote}${resolveInternalHref(href)}${quote}`);
}
