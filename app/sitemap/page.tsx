import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { SitePageList } from "@/components/shared/SitePageList";
import { Section } from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sitemap — All Pages",
  description:
    "Find every public page on The Barker Shoppe website: services, pricing, gallery, contact, and policies.",
  path: "/sitemap",
});

export default function SiteMapPage() {
  return (
    <>
      <PageHero
        overline="Sitemap"
        title="Sitemap"
        lead="Every public page on The Barker Shoppe website, in one place."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Sitemap" />

      <Section tone="white">
        <SitePageList />
      </Section>
    </>
  );
}
