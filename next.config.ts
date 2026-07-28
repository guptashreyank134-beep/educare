/** @format */

import type { NextConfig } from "next";
import { redirectPairs } from "./data/redirects";


const nextConfig: NextConfig = {
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

