import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Request Received",
  description: "Thanks for contacting The Barker Shoppe. We will get in touch with you shortly.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <PageHero
      overline="Request received"
      title="Thanks for contacting us!"
      lead="We will get in touch with you shortly."
    />
  );
}
