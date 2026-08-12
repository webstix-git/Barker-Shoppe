import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteriorHero } from "@/components/shared/InteriorHero";
import { CTASection } from "@/components/shared/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { getServicePage, services, vaccinationPolicy } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Dog daycare, overnight boarding, and professional grooming at The Barker Shoppe in Springfield, MO.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <InteriorHero
        overline="Services"
        title="Services"
        lead="Daycare, overnight boarding, and professional grooming under one roof - so you have one trusted place for the care your dog needs."
        crumbs={[{ label: "Home", href: "/" }]}
        current="Services"
        jumps={[
          { label: "Dog Daycare", href: "#daycare" },
          { label: "Overnight Boarding", href: "#boarding" },
          { label: "Professional Grooming", href: "#grooming" },
          { label: "What to bring", href: "#requirements" },
        ]}
      />

      {services.map((service, index) => {
        const page = getServicePage(service.slug)!;
        const reverse = index % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "scroll-mt-28 px-5 py-24 sm:px-8 sm:py-[6.5rem]",
              reverse ? "bg-[#FEFBF5]" : "bg-white",
            )}
          >
            <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <Reveal
                from={reverse ? "right" : "left"}
                className={cn(
                  "relative pb-5 pl-5 transition-transform duration-[420ms] ease-gentle hover:-translate-y-2.5",
                  reverse && "lg:order-2",
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-0 left-0 h-[88%] w-[90%] rounded-arch",
                    service.backdrop === "wine" ? "bg-wine-soft" : "bg-brand-200",
                  )}
                />
                <div className="arch-frame relative h-[22rem] sm:h-[29.375rem]">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 90vw"
                    className="object-cover object-[center_22%] transition-transform duration-700 ease-gentle hover:scale-[1.06]"
                  />
                </div>
              </Reveal>

              <Reveal from={reverse ? "left" : "right"} delay={0.08} className={cn(reverse && "lg:order-1")}>
                <p className="font-display text-sm font-semibold tracking-[0.06em] text-soft">
                  {service.meta}
                </p>
                <h2 className="mt-3 text-display-lg">{service.name}</h2>
                <p className="mt-[1.125rem] mb-8 max-w-[32.5rem] text-body text-muted">{page.hubBlurb}</p>

                <div className="grid gap-6 border-y border-[#e6eef1] py-7 sm:grid-cols-2 sm:gap-x-9">
                  {page.hubFeatures.map((feature) => (
                    <div key={feature.title}>
                      <h3 className="font-display text-[1.0625rem] font-extrabold text-ink">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-base leading-[1.62] text-muted">{feature.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-5">
                  <div className="rounded-[1.25rem] bg-cream px-5 py-4 ring-1 ring-cream-dark sm:px-6 sm:py-5">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-wine">
                      Pricing
                    </p>
                    <p className="mt-2 font-display text-[1.25rem] font-extrabold leading-snug text-ink">
                      {page.hubPriceNote}
                    </p>
                    <Link
                      href="/pricing-policy/rates-packages"
                      className="mt-3 inline-flex font-display text-[0.9375rem] font-bold text-brand-600 underline-offset-2 transition-colors duration-300 hover:text-wine hover:underline"
                    >
                      View full rates &amp; packages
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <ButtonLink href={service.href}>{service.cta}</ButtonLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section id="requirements" className="scroll-mt-28 bg-navy px-5 py-[6.25rem] text-white sm:px-8">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="max-w-[41rem]">
            <div className="flex items-center gap-3.5">
              <span className="rule-accent bg-brand-300" aria-hidden="true" />
              <p className="eyebrow text-brand-200">Before Your First Visit</p>
            </div>
            <h2 className="mt-5 text-display-lg text-white">
              What Every Dog Needs, Whatever They Are Booked For
            </h2>
            <p className="mt-4 text-body text-[#bcd3db]">
              The same three vaccinations apply to daycare, boarding, and grooming.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
            {vaccinationPolicy.map((item, index) => (
              <Reveal key={item.vaccine} delay={index * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-[1.25rem] bg-white/5 p-6 ring-1 ring-white/10 sm:p-7">
                  <h3 className="font-display text-xl font-extrabold leading-snug text-white">
                    {item.vaccine}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-[1.65] text-[#bcd3db]">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.24} className="h-full">
              <div className="flex h-full flex-col rounded-[1.25rem] bg-white/5 p-6 ring-1 ring-white/10 sm:p-7">
                <h3 className="font-display text-xl font-extrabold leading-snug text-white">
                  Food &amp; Medication
                </h3>
                <p className="mt-3 flex-1 text-base leading-[1.65] text-[#bcd3db]">
                  Food for boarding stays, plus any medication with dosing notes. Paperwork is filled
                  out here at drop-off.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-12">
            <Link
              href="/pricing-policy/new-client-requirements"
              className="text-link border-brand-300 text-brand-200 hover:border-white hover:text-white"
            >
              Full new client checklist
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Not Sure Which Service You Need?"
        body="Call us about daycare, boarding, or grooming and we will help you get set up."
        note="Bring current Bordetella, DHPP, and Rabies records to your first visit."
      />
    </>
  );
}
