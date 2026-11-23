import Script from "next/script";

type GoogleTagManagerProps = {
  containerId: string;
};

/**
 * Google Tag Manager + dataLayer/gtag bootstrap.
 * Set NEXT_PUBLIC_GTM_ID (e.g. GTM-XXXXXXXX) in the environment.
 */
export function GoogleTagManager({ containerId }: GoogleTagManagerProps) {
  if (!containerId) return null;

  return (
    <>
      <Script id="gtm-datalayer" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
