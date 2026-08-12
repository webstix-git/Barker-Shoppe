import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/shared/CTASection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { firstVisitSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "New Client Requirements",
  description:
    "What to bring for your dog’s first visit at The Barker Shoppe - intake form, shot records, and how daycare is matched.",
  alternates: { canonical: "/pricing-policy/new-client-requirements" },
};

export default function NewClientsPage() {
  return (
    <>
      <PageHero
        overline="New Client Requirements"
        title="New Client Requirements"
        lead="No online account needed. Call or stop in, bring current shot records, and fill out a short form at drop-off."
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Pricing & Policy", href: "/pricing-policy" },
        ]}
        current="New Client Requirements"
      />

      <Section tone="white">
        <SectionHeading
          overline="Same Day Checklist"
          title={
            <span className="whitespace-nowrap">Three Steps and You Are Rolling</span>
          }
          className="max-w-none"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {firstVisitSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <div className="h-full rounded-[1.25rem] bg-white p-7 ring-1 ring-cream-dark">
                <span className="font-display text-3xl font-extrabold text-brand-500">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-base text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-10">
          <p className="text-body-sm text-muted">
            Also see our{" "}
            <Link href="/pricing-policy/vaccination-policy" className="font-semibold text-wine underline underline-offset-4">
              vaccination policy
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
