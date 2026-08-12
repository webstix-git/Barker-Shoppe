import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Locally owned dog daycare, boarding, and grooming on East Bennett Street in Springfield, MO - dogs only.",
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About Us"
        title="About Us"
        lead="A locally owned shoppe on East Bennett Street, dedicated to Springfield pet owners and their dogs."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="About Us" />

      <Section tone="white">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal from="left">
            <div className="flex items-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">Who We Are</p>
            </div>
            <h2 className="mt-5 text-display-md">
              Dogs Only. Treated Like Family.
            </h2>
            <div className="mt-6 max-w-prose space-y-5 text-body text-muted">
              <p>
                Barker Shoppe is a full-service pet care facility in Springfield, Missouri. We
                offer dog boarding, daycare, and grooming in a safe, clean, and caring environment.
              </p>
              <p>
                Our experienced team is dedicated to personalized care - so every pet feels
                comfortable, happy, and well looked after while their owners are away. Dogs only.
                No cats, no other animals.
              </p>
              <p>
                We are locally owned and focused on what matters most: your pet&rsquo;s health,
                safety, and happiness - and your peace of mind.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/our-story" variant="secondary" className="group">
                Read our story
                <Icon name="arrow-right" className="transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="ghost">
                <Icon name="phone-call" />
                {site.phoneDisplay}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-arch shadow-photo">
                <Image
                  src="/images/yorkie-bow.jpg"
                  alt="A Yorkshire Terrier after a fresh groom"
                  fill
                  sizes="(min-width: 1024px) 24vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-arch shadow-photo">
                <Image
                  src="/images/aussie-yard.jpg"
                  alt="An Australian Shepherd on the outdoor turf yard"
                  fill
                  sizes="(min-width: 1024px) 24vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          align="center"
          overline="What We Stand On"
          title="How We Look After Your Dog"
          lead="Compassion, cleanliness, trust, reliability, and personalized attention."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="h-full rounded-[1.25rem] bg-white p-7 shadow-[0_10px_30px_rgba(13,44,56,0.06)] ring-1 ring-cream-dark/80 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-xl text-brand-600">
                  <Icon name={value.icon} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{value.title}</h3>
                <p className="mt-3 text-base text-muted">{value.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTASection tone="white" />
    </>
  );
}
