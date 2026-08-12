import type { Metadata } from "next";
import { Archivo, Karla } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

/** Archivo for display - bold, friendly, no serif. Karla for body at 18px. */
const display = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Barker Shoppe | Dog Daycare, Boarding & Grooming in Springfield, MO",
    template: "%s | The Barker Shoppe",
  },
  description:
    "Locally owned dog daycare, overnight boarding, and professional grooming on East Bennett Street in Springfield, Missouri. Dogs only.",
  keywords: [
    "dog daycare Springfield MO",
    "dog boarding Springfield Missouri",
    "dog grooming Springfield MO",
    "Barker Shoppe",
    "The Barker Shoppe",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "The Barker Shoppe | Daycare, Boarding & Grooming",
    description:
      "Because every pet deserves a “paw” day. Safe, clean dog care in Springfield, MO.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "PetStore",
  name: site.name,
  slogan: site.tagline,
  image: `${site.url}/images/barker-shoppe-logo.png`,
  telephone: site.phoneDisplay,
  email: site.email,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* FlatIcon UIcons - regular-rounded set */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
