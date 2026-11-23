import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { MidwestTracker } from "@/components/analytics/MidwestTracker";
import { BackToTop } from "@/components/layout/BackToTop";
import { DeferredIconStyles } from "@/components/layout/DeferredIconStyles";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

/** Self-hosted: next/font/google fails on Vercel for Archivo (font-stretch CSS). */
const display = localFont({
  src: "./fonts/archivo.woff2",
  display: "swap",
  variable: "--font-display",
  weight: "600 800",
});

const body = localFont({
  src: "./fonts/karla.woff2",
  display: "swap",
  variable: "--font-body",
  weight: "400 700",
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const midwestTrackSiteId =
  process.env.NEXT_PUBLIC_MIDWEST_TRACK_SITE_ID?.trim() || "1a701f8d5e2f4548";
const midwestTrackEndpoint =
  process.env.NEXT_PUBLIC_MIDWEST_TRACK_ENDPOINT?.trim() ||
  "https://ywwxvriolxwuqcwjaluh.supabase.co/functions/v1/track-event";
const gscVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  "_U5KG5PSiW7ALvoVzLm_8BUsEZprhhT9S9a_s-5Zq-c";

const defaultTitle = "The Barker Shoppe | Daycare, Boarding & Grooming";
const defaultDescription =
  "Local dog daycare, boarding & grooming in Springfield, MO. Dogs only. Call (417) 501-1053.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: "%s | The Barker Shoppe",
  },
  description: defaultDescription,
  keywords: [
    "dog daycare Springfield MO",
    "dog boarding Springfield Missouri",
    "dog grooming Springfield MO",
    "Barker Shoppe",
    "The Barker Shoppe",
    "pet boarding Springfield",
    "dog daycare near me Springfield",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  category: "Pet Care",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: site.url },
  verification: gscVerification ? { google: gscVerification } : undefined,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body id="top">
        <DeferredIconStyles />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />

        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        {/* One tracker only: GA4 direct, or GTM (not both — avoids double counting). */}
        {gaId ? (
          <GoogleAnalytics measurementId={gaId} />
        ) : gtmId ? (
          <GoogleTagManager containerId={gtmId} />
        ) : null}
        <MidwestTracker siteId={midwestTrackSiteId} endpoint={midwestTrackEndpoint} />
      </body>
    </html>
  );
}
