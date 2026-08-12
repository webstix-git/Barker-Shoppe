import type { Metadata } from "next";
import { CTASection } from "@/components/shared/CTASection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { vaccinationPolicy } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vaccination Policy",
  description:
    "Bordetella, DHPP, and Rabies requirements for daycare, boarding, and grooming at The Barker Shoppe.",
  alternates: { canonical: "/pricing-policy/vaccination-policy" },
};

export default function VaccinationPage() {
  return (
    <>
      <PageHero
        overline="Vaccination Policy"
        title="Vaccination Policy"
        lead="We check records at intake and keep them on file for every dog we care for."
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Pricing & Policy", href: "/pricing-policy" },
        ]}
        current="Vaccination Policy"
      />

      <Section tone="white">
        <SectionHeading
          overline="Required"
          title="Three Vaccines, No Exceptions"
          lead="Required for every dog and every service - daycare, boarding, and grooming."
        />

        <ul className="mx-auto mt-12 max-w-3xl space-y-4">
          {vaccinationPolicy.map((item, index) => (
            <Reveal key={item.vaccine} delay={index * 0.07}>
              <li className="flex gap-4 rounded-[1.25rem] bg-cream p-6 ring-1 ring-cream-dark sm:p-7">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-sm">
                  <Icon name="shield-check" className="text-lg" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">
                    {item.vaccine}
                    <span className="ml-2 text-sm font-semibold text-soft">{item.who}</span>
                  </p>
                  <p className="mt-2 text-base text-muted">{item.note}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTASection />
    </>
  );
}
