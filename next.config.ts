/** @format */

import type { NextConfig } from "next";
import { redirectPairs } from "./data/redirects";


const nextConfig: NextConfig = {
  // Keep prerendering from flooding the CMS with simultaneous requests as the
  // site grows, and retry page generation when a transient fetch fails.
  experimental: {
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 100,
    staticGenerationRetryCount: 2,
  },
  images: {
    minimumCacheTTL: 31536000, // 1 year cache policy for optimized images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return redirectPairs.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

