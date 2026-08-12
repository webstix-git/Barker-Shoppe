import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/ui/Section";
import { navLinks, pricingNav, serviceNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Find every page on The Barker Shoppe website in one place.",
  alternates: { canonical: "/sitemap" },
};

const groups = [
  {
    title: "Main",
    links: [
      ...navLinks.map((link) => ({ label: link.label, href: link.href })),
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Services",
    links: [...serviceNav],
  },
  {
    title: "Pricing & Policy",
    links: [...pricingNav],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "AI Policy", href: "/ai-policy" },
      { label: "AI Readiness Service Index", href: "/ai-readiness-service-index" },
    ],
  },
] as const;

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
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-wine">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-muted transition-colors duration-300 hover:text-wine"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
