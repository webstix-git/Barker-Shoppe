import type { Metadata } from "next";
import { site } from "@/lib/site";

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** Override Open Graph title when it should differ from the document title. */
  ogTitle?: string;
  noIndex?: boolean;
};

/** Absolute URL for a site path (leading slash optional). */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return site.url;
  return `${site.url}${normalized}`;
}

/** Default social / featured image (homepage hero screenshot). */
export const defaultOgImage = {
  url: absoluteUrl("/images/og-featured.jpg"),
  width: 1200,
  height: 630,
  alt: "The Barker Shoppe — Great Care for Dogs. Peace of Mind for You. Springfield, MO",
} as const;

/** Shared page metadata: absolute canonical, Open Graph, Twitter. */
export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  noIndex,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = ogTitle ?? `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [defaultOgImage.url],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

/** Routes included in the XML sitemap (and HTML sitemap groups reuse labels elsewhere). */
export const sitemapEntries: {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/daycare", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/boarding", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/grooming", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing-policy", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pricing-policy/rates-packages", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pricing-policy/new-client-requirements", changeFrequency: "monthly", priority: 0.75 },
  { path: "/pricing-policy/vaccination-policy", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about-us", changeFrequency: "yearly", priority: 0.7 },
  { path: "/our-story", changeFrequency: "yearly", priority: 0.65 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sitemap", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/ai-policy", changeFrequency: "yearly", priority: 0.25 },
  { path: "/ai-readiness-service-index", changeFrequency: "yearly", priority: 0.25 },
];
