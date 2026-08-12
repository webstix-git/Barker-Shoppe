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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-brand-100">
      <div className="h-3 w-full bg-pole-stripes" aria-hidden="true" />

      <div className="container-page py-16 sm:py-18">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo size="footer" />
            <p className="mt-5 max-w-xs text-body-sm leading-relaxed text-brand-100">
              A locally owned dog daycare, boarding, and grooming shoppe on East Bennett. Dogs only.
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-pill border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <i className="fi fi-brands-facebook" aria-hidden="true" />
              Facebook
            </a>
          </div>

          <nav aria-label="Footer explore">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Explore
            </h2>
            <ul className="mt-4 space-y-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/gallery"
                  className="text-body-sm transition-colors duration-300 hover:text-white"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-1.5">
              {serviceNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Pricing &amp; Policy
            </h2>
            <ul className="mt-4 space-y-1.5">
              {pricingNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Visit
            </h2>
            <ul className="mt-4 space-y-4 text-body-sm">
              <li className="flex items-start gap-3">
                <Icon name="marker" className="mt-0.5 shrink-0 text-brand-300" />
                <a
                  href={site.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-white"
                >
                  {site.address.streetShort}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone-call" className="mt-0.5 shrink-0 text-brand-300" />
                <a href={site.phoneHref} className="font-semibold text-white hover:text-brand-200">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="envelope" className="mt-0.5 shrink-0 text-brand-300" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors duration-300 hover:text-white"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-brand-200/80">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>
              © {year} {site.name}. All rights reserved.
            </span>
            {legalLinks.map((link) => (
              <span key={link.href} className="inline-flex items-center gap-x-2">
                <span aria-hidden="true">|</span>
                <Link
                  href={link.href}
                  className="underline underline-offset-2 transition-colors duration-300 hover:text-white"
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
