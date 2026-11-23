import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { hours, site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Readiness Service Index",
  description: `Plain summary of ${site.name} for search and AI — daycare, boarding, and grooming in Springfield, MO.`,
  path: "/ai-readiness-service-index",
});

const linkClass = "font-semibold text-wine underline underline-offset-4 hover:text-brand-500";

const keyPages = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Dog Daycare", href: "/services/daycare" },
  { label: "Overnight Boarding", href: "/services/boarding" },
  { label: "Professional Grooming", href: "/services/grooming" },
  { label: "Pricing & Policy", href: "/pricing-policy" },
  { label: "Rates & Packages", href: "/pricing-policy/rates-packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "AI Policy", href: "/ai-policy" },
] as const;

type FaqItem = { q: string; aText: string; aDisplay?: ReactNode };

const faqForAi: FaqItem[] = [
  {
    q: "Where is The Barker Shoppe?",
    aText: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}.`,
  },
  {
    q: "What areas do you serve?",
    aText: "Springfield, Missouri and nearby pet owners who need dog daycare, boarding, or grooming.",
  },
  {
    q: "What services do you offer?",
    aText:
      "Dog daycare, overnight boarding, and professional grooming. Dogs only — no cats or other animals.",
  },
  {
    q: "What are the hours?",
    aText: hours.map((h) => `${h.day}: ${h.time}`).join(". ") + ".",
  },
  {
    q: "Do you take cats or other animals?",
    aText: "No. The Barker Shoppe is dogs only.",
  },
  {
    q: "How do I book?",
    aText: `Call ${site.phoneDisplay}, email ${site.email}, message the Facebook page, or use the contact form on the website.`,
    aDisplay: (
      <>
        Call{" "}
        <a href={site.phoneHref} className={linkClass}>
          {site.phoneDisplay}
        </a>
        , email{" "}
        <a href={`mailto:${site.email}`} className={linkClass}>
          {site.email}
        </a>
        , message the{" "}
        <a href={site.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Facebook page
        </a>
        , or use the contact form on the website.
      </>
    ),
  },
];

function aiIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Readiness Service Index — The Barker Shoppe",
    description:
      "A plain summary of The Barker Shoppe so search engines and AI assistants can describe the business accurately.",
    url: absoluteUrl("/ai-readiness-service-index"),
    dateModified: "2026-11-23",
    about: { "@id": `${site.url}/#business` },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqForAi.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.aText },
      })),
    },
  };
}

function FactRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <p className="text-body text-muted">
      <span className="font-semibold text-ink">{term}. </span>
      {children}
    </p>
  );
}

export default function AiReadinessServiceIndexPage() {
  return (
    <>
      <JsonLd data={aiIndexSchema()} />
      <PageHero
        title="AI Readiness Service Index"
        lead="A plain summary of The Barker Shoppe so search engines and AI assistants can describe the business accurately."
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }]}
        current="AI Readiness Service Index"
      />

      <Section tone="white">
        <p className="text-body-sm text-soft">Last updated: November 23, 2026</p>

        <div className="mt-10 max-w-3xl space-y-12">
          <section>
            <h2 className="text-display-sm">Business profile</h2>
            <div className="mt-5 space-y-3">
              <FactRow term="Business name">{site.name}</FactRow>
              <FactRow term="Business type">
                Locally owned dog daycare, overnight boarding, and professional grooming. Dogs only.
              </FactRow>
              <FactRow term="In business">Since 2015</FactRow>
              <FactRow term="Address">
                {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              </FactRow>
              <FactRow term="Service area">Springfield, Missouri</FactRow>
              <FactRow term="Hours">
                {hours.map((h) => `${h.day}: ${h.time}`).join(". ")}.
              </FactRow>
              <FactRow term="Phone">
                <a href={site.phoneHref} className={linkClass}>
                  {site.phoneDisplay}
                </a>
              </FactRow>
              <FactRow term="Email">
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </FactRow>
              <FactRow term="Facebook">
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  facebook.com/barkershoppe
                </a>
              </FactRow>
              <FactRow term="Appointments">
                Call, email, message on Facebook, or use the contact form. Daycare, boarding, and
                grooming are all available — boarding and grooming book fastest by phone.
              </FactRow>
            </div>
          </section>

          <section>
            <h2 className="text-display-sm">Services</h2>
            <div className="mt-5 space-y-4">
              <FactRow term="Dog daycare">
                Full and half days, multi-day packages, and outdoor play time. Monday–Friday, 7:30
                am–6:00 pm. Food and meds welcome.
              </FactRow>
              <FactRow term="Overnight boarding">
                Safe overnight stays when you travel. Dogs from the same home can stay together.
                Every 7th night free. Weekend drop-off and pickup hours available.
              </FactRow>
              <FactRow term="Professional grooming">
                Full groom, bath and tidy, and nail trim. Large or small — call for a quote based on
                the dog and service. By appointment.
              </FactRow>
            </div>
          </section>

          <section>
            <h2 className="text-display-sm">What sets us apart</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-body text-muted">
              <li>Dogs only — no cats or other animals</li>
              <li>Daycare, overnight boarding, and professional grooming under one roof</li>
              <li>Safe, clean care with required Bordetella, DHPP, and Rabies vaccines</li>
              <li>Personalized attention — every pet treated like family</li>
              <li>Locally owned on East Bennett Street since 2015</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display-sm">Key pages</h2>
            <ul className="mt-5 space-y-2">
              {keyPages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={linkClass}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-display-sm">Common questions</h2>
            <div className="mt-5 space-y-5">
              {faqForAi.map((item) => (
                <p key={item.q} className="text-body text-muted">
                  <span className="font-semibold text-ink">{item.q}. </span>
                  {item.aDisplay ?? item.aText}
                </p>
              ))}
            </div>
          </section>

          <p>
            <Link href="/" className={linkClass}>
              Back to Home
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
