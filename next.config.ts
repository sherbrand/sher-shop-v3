import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product and collection images are served from Shopify's CDN.
  // next/image needs each remote host allow-listed.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },

  /* The slot files (D-004, D-006) are read from disk at run time, through a path
     built from process.cwd(). Next traces a route's files by reading its
     imports, so it cannot see that path and leaves the TSVs out of the bundle.

     Statically rendered screens never notice: they read the files during the
     build, when the whole repo is on disk. A route rendered on demand reads them
     on the server instead, finds nothing, and fails. Name the files here so
     every server bundle carries them. */
  outputFileTracingIncludes: {
    "/**": ["./docs/content/*.tsv"],
  },
};

export default nextConfig;
