import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Readiness Service Index",
  description: `A plain look at how ${site.name} uses AI-assisted tools - and where it does not.`,
  alternates: { canonical: "/ai-readiness-service-index" },
};

const sections = [
  {
    title: "Customer Communication",
    body: "Phone, email, and form messages are handled by our staff. AI may help draft a reply; a person reviews it before it goes out.",
  },
  {
    title: "Website Content",
    body: "Services, hours, rates, and location on this site are maintained by the business. AI may help with drafts; we check the details before publishing.",
  },
  {
    title: "Scheduling & Services",
    body: "Daycare, overnight boarding, and grooming appointments run through our normal shop process. AI does not book or cancel visits on its own, and it does not make care decisions for your dog.",
  },
  {
    title: "Privacy & Data",
    body: (
      <>
        Contact details you share are used to help you and run the business. See our{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-wine underline underline-offset-2"
        >
          Privacy Policy
        </Link>{" "}
        for more.
      </>
    ),
  },
  {
    title: "Transparency",
    body: (
      <>
        This page and our{" "}
        <Link href="/ai-policy" className="font-semibold text-wine underline underline-offset-2">
          AI Policy
        </Link>{" "}
        spell out where tools may help and where people stay in charge.
      </>
    ),
  },
] as const;

const related = [
  { label: "AI Policy", href: "/ai-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export default function AiReadinessServiceIndexPage() {
  return (
    <>
      <PageHero
        overline="AI Readiness Service Index"
        title="AI Readiness Service Index"
        lead={`A plain look at how ${site.name} uses AI-assisted tools - and where it does not.`}
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }]}
        current="AI Readiness Service Index"
      />

      <Section tone="white">
        <p className="text-body-sm text-soft">Last updated: August 11, 2026</p>

        <div className="mt-10 max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-display-sm">{section.title}</h2>
              <p className="mt-3 text-body text-muted">{section.body}</p>
            </div>
          ))}

          <div>
            <h2 className="text-display-sm">Related Pages</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-body text-muted">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-semibold text-wine underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-body text-muted">
            Questions? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-wine underline underline-offset-2"
            >
              {site.email}
            </a>{" "}
            or call{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-wine underline underline-offset-2"
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
