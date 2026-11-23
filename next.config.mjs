import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the tracing root to this folder; a lockfile in the parent directory
  // otherwise makes Next guess the workspace root incorrectly.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  // Send title/description in the initial <head> (not streamed after </head>)
  // so SEO crawlers that do not hoist late meta tags still see them.
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [65, 70, 75, 85],
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
      // Legacy barkershoppesgf.com paths → closest related page (or home)
      { source: "/book-now", destination: "/contact-us", permanent: true },
      { source: "/book", destination: "/contact-us", permanent: true },
      { source: "/booking", destination: "/contact-us", permanent: true },
      // Member/account portal no longer exists → home
      { source: "/m/login", destination: "/", permanent: true },
      { source: "/m/reset", destination: "/", permanent: true },
      { source: "/m/create", destination: "/", permanent: true },
      { source: "/m/create-account", destination: "/", permanent: true },
      { source: "/m", destination: "/", permanent: true },
      { source: "/m/:path*", destination: "/", permanent: true },
      { source: "/login", destination: "/", permanent: true },
      { source: "/account", destination: "/", permanent: true },
      { source: "/account/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
