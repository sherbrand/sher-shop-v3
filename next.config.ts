import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product + collection images are served from Shopify's CDN.
  // next/image needs each remote host allow-listed.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
