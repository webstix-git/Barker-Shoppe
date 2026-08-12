import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the tracing root to this folder; a lockfile in the parent directory
  // otherwise makes Next guess the workspace root incorrectly.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/story", destination: "/our-story", permanent: true },
      { source: "/site-map", destination: "/sitemap", permanent: true },
      { source: "/pricing", destination: "/pricing-policy", permanent: true },
      { source: "/pricing/rates", destination: "/pricing-policy/rates-packages", permanent: true },
      {
        source: "/pricing/new-clients",
        destination: "/pricing-policy/new-client-requirements",
        permanent: true,
      },
      {
        source: "/pricing/vaccination",
        destination: "/pricing-policy/vaccination-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
