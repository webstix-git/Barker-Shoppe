import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { galleryImages, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Fresh grooms, daycare afternoons, the summer pool, and seasonal backdrops at The Barker Shoppe in Springfield, Missouri.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        overline="Gallery"
        title="Gallery"
        lead="Fresh grooms, yard play, the summer pool, and plenty of happy faces. Click any photo for a closer look."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Gallery" />

      <Section tone="cream">
        <GalleryGrid images={galleryImages} />

        <Reveal delay={0.1} className="mt-14">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[1.5rem] bg-white p-8 text-center shadow-[0_10px_30px_rgba(13,44,56,0.06)] ring-1 ring-cream-dark sm:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-xl text-brand-600">
              <Icon name="paw" />
            </span>
            <h2 className="text-display-sm">See More on Facebook</h2>
            <p className="text-body-sm text-muted">
              Follow The Barker Shoppe for photos of dogs at play, fresh grooms, and life around the
              shoppe.
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              See More on Facebook
            </a>
          </div>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
