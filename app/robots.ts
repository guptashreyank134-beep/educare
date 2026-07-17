/** @format */

import { MetadataRoute } from "next";

// AI answer-engine / assistant crawlers we explicitly welcome. The wildcard
// rule already permits them, but listing them makes the intent unambiguous and
// future-proofs against any host/CDN default that blocks AI bots. Being visible
// to these is how the site gets cited in ChatGPT, Perplexity, Google AI
// Overviews, Claude and Apple Intelligence answers.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "cohere-ai",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio/"] },
      { userAgent: AI_BOTS, allow: "/", disallow: ["/studio/"] },
    ],
    sitemap: "https://www.drshreyankeducare.com/sitemap.xml",
    host: "https://www.drshreyankeducare.com",
  };
}
