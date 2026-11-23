import Script from "next/script";

type GoogleAnalyticsProps = {
  measurementId: string;
};

/**
 * Google Analytics 4 via gtag.js.
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXX) in the environment.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-config" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
