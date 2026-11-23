import type { Metadata } from "next";
import { Archivo, Karla } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { BackToTop } from "@/components/layout/BackToTop";
import { DeferredIconStyles } from "@/components/layout/DeferredIconStyles";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

/** Archivo for display - bold, friendly, no serif. Karla for body at 18px. */
const display = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? "";

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
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
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
        {gtmId ? <GoogleTagManager containerId={gtmId} /> : null}
        {/* Prefer GTM for tags; load GA4 directly only when GTM is not configured */}
        {!gtmId && gaId ? <GoogleAnalytics measurementId={gaId} /> : null}
      </body>
    </html>
  );
}
