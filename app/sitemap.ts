import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/about-us",
  "/our-story",
  "/services",
  "/services/daycare",
  "/services/boarding",
  "/services/grooming",
  "/pricing-policy",
  "/pricing-policy/rates-packages",
  "/pricing-policy/new-client-requirements",
  "/pricing-policy/vaccination-policy",
  "/gallery",
  "/contact-us",
  "/sitemap",
  "/privacy-policy",
  "/ai-policy",
  "/ai-readiness-service-index",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
