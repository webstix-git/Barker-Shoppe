import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { navLinks, pricingNav, serviceNav, site } from "@/lib/site";

const legalLinks = [
  { label: "Sitemap", href: "/sitemap" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "AI Policy", href: "/ai-policy" },
  { label: "AI Readiness Service Index", href: "/ai-readiness-service-index" },
] as const;

const footerLinkClass =
  "relative z-10 inline-flex min-h-10 items-center py-1 text-body-sm text-brand-100 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-navy text-brand-100">
      <div className="h-1.5 w-full bg-pole-stripes" aria-hidden="true" />

      <div className="container-page relative z-10 pb-0 pt-16 sm:pt-18">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-body-sm leading-relaxed text-brand-100">
              A locally owned dog daycare, boarding, and grooming shoppe on East Bennett. Dogs only.
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
            >
              <i className="fi fi-brands-facebook" aria-hidden="true" />
              Facebook
            </a>
          </div>

          <nav aria-label="Footer explore" className="relative z-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Explore
            </p>
            <ul className="mt-4 space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/our-story" className={footerLinkClass}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className={footerLinkClass}>
                  Gallery
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer services" className="relative z-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Services
            </p>
            <ul className="mt-4 space-y-0.5">
              {serviceNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Pricing &amp; Policy
            </p>
            <ul className="mt-4 space-y-0.5">
              {pricingNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Visit
            </p>
            <ul className="mt-4 space-y-4 text-body-sm">
              <li className="flex items-start gap-3">
                <Icon name="marker" className="mt-1.5 shrink-0 text-brand-300" />
                <a
                  href={site.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  {site.address.streetShort}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone-call" className="mt-1.5 shrink-0 text-brand-300" />
                <a
                  href={site.phoneHref}
                  className="relative z-10 font-semibold text-white underline-offset-4 hover:text-brand-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="envelope" className="mt-1.5 shrink-0 text-brand-300" />
                <a
                  href={`mailto:${site.email}`}
                  className="relative z-10 break-all underline-offset-4 transition-colors duration-300 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-14 border-t border-white/10 py-5 text-center text-sm text-brand-200/80">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>
              © {year} {site.name}. All rights reserved.
            </span>
            {legalLinks.map((link) => (
              <span key={link.href} className="inline-flex items-center gap-x-2">
                <span aria-hidden="true">|</span>
                <Link
                  href={link.href}
                  className="relative z-10 underline underline-offset-2 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
