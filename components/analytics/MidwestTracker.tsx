import Script from "next/script";

type MidwestTrackerProps = {
  siteId: string;
  endpoint: string;
};

/**
 * Midwest Family Portal page-view tracker (track.js).
 * Set NEXT_PUBLIC_MIDWEST_TRACK_SITE_ID and NEXT_PUBLIC_MIDWEST_TRACK_ENDPOINT.
 */
export function MidwestTracker({ siteId, endpoint }: MidwestTrackerProps) {
  if (!siteId || !endpoint) return null;

  return (
    <Script
      id="midwest-track"
      src="https://midwestfamilyportal.com/track.js"
      strategy="afterInteractive"
      data-site={siteId}
      data-endpoint={endpoint}
    />
  );
}
