import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Policy",
  description: `How ${site.name} uses artificial intelligence tools on our website and in business operations — and where people stay in charge.`,
  path: "/ai-policy",
});

const linkClass = "font-semibold text-wine underline underline-offset-4 hover:text-brand-500";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "Our Approach",
    body: `${site.name} may use artificial intelligence tools to help draft website copy, organize information, or support routine business tasks. AI does not replace the people who care for your dog, make care decisions, or speak with you about scheduling and services.`,
  },
  {
    title: "Where AI May Be Used",
    body: "AI tools may assist with website content, internal notes, or administrative drafting. Any public-facing wording is reviewed by our team before it is published. Care plans, vaccination checks, and day-to-day handling of dogs are handled by staff - not by automated systems.",
  },
  {
    title: "Your Information",
    body: (
      <>
        We do not use AI tools as a substitute for protecting your privacy. Personal and pet
        information shared with us for daycare, boarding, or grooming is handled according to our{" "}
        <Link href="/privacy-policy" className={linkClass}>
          Privacy Policy
        </Link>{" "}
        and is not sold or used to train public AI models.
      </>
    ),
  },
  {
    title: "Accuracy",
    body: (
      <>
        If AI helps draft language for this website, we review it for accuracy before publishing.
        Rates, hours, vaccination requirements, and service details are confirmed by The Barker
        Shoppe. If something looks off, please{" "}
        <a href={site.phoneHref} className={linkClass}>
          call us
        </a>{" "}
        and we will correct it.
      </>
    ),
  },
  {
    title: "Questions",
    body: (
      <>
        If you have questions about this AI Policy, reach us at{" "}
        <a href={site.phoneHref} className={linkClass}>
          {site.phoneDisplay}
        </a>{" "}
        or{" "}
        <a href={`mailto:${site.email}`} className={linkClass}>
          {site.email}
        </a>
        .
      </>
    ),
  },
];

export default function AiPolicyPage() {
  return (
    <>
      <PageHero
        overline="AI Policy"
        title="AI Policy"
        lead="Where AI may help behind the scenes - and where our staff stays in charge."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="AI Policy" />

      <Section tone="white">
        <p className="text-body-sm text-soft">Effective date: August 11, 2026</p>
        <div className="mt-10 max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-display-sm">{section.title}</h2>
              <p className="mt-3 text-body text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
