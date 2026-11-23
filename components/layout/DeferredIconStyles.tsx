"use client";

import { useEffect } from "react";

const ICON_STYLESHEETS = [
  "https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css",
  "https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css",
] as const;

/** Inject FlatIcon CSS after first paint so it doesn’t block FCP/LCP. */
export function DeferredIconStyles() {
  useEffect(() => {
    for (const href of ICON_STYLESHEETS) {
      if (document.querySelector(`link[href="${href}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <noscript>
      {ICON_STYLESHEETS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </noscript>
  );
}
