import Image from "next/image";
import { InteriorHero } from "@/components/shared/InteriorHero";
import { CTASection } from "@/components/shared/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { site, type Service, type ServicePageContent } from "@/lib/site";

type Props = {
  service: Service;
  page: ServicePageContent;
};

export function ServicePageView({ service, page }: Props) {
  return (
    <>
      <InteriorHero
        overline={service.meta}
        title={service.name}
        lead={service.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        current={service.name}
        image={service.image}
        imageBackdrop={service.backdrop}
        actions={
          <>
            <ButtonLink href={site.phoneHref} size="lg">
              {page.primaryCta}
            </ButtonLink>
            <ButtonLink href={page.secondaryCta.href} variant="secondary" size="lg">
              {page.secondaryCta.label}
            </ButtonLink>
          </>
        }
      />

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-[6.25rem]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="max-w-[38.75rem]">
            <div className="flex items-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">{page.scheduleOverline}</p>
            </div>
            <h2 className="mt-5 text-display-lg">{page.scheduleTitle}</h2>
          </Reveal>

          <div className="relative mt-14">
            <div
              aria-hidden="true"
              className="absolute left-[6%] right-[6%] top-[1.625rem] hidden h-0.5 bg-[repeating-linear-gradient(90deg,#d8c6ad_0_10px,transparent_10px_20px)] md:block"
            />
            <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {page.schedule.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06}>
                  <div
                    className={cn(
                      "grid h-[3.375rem] w-[3.375rem] place-items-center rounded-full font-display text-[0.9375rem] font-extrabold text-white shadow-[0_0_0_8px_#ffffff]",
                      step.accent ? "bg-wine" : "bg-brand-500",
                    )}
                  >
                    {step.mark}
                  </div>
                  <h3 className="mt-[1.375rem] font-display text-[1.3125rem] font-extrabold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-[1.68] text-muted">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 sm:py-[6.25rem]">
        <PawMark className="paw-deco bottom-[3.75rem] left-[3.125rem] h-[8.125rem] w-[8.125rem] rotate-[18deg] text-wine" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal from="left">
            <div className="flex items-center gap-3.5">
              <span className="rule-accent bg-brand-500" aria-hidden="true" />
              <p className="eyebrow text-brand-600">{page.fitOverline}</p>
            </div>
            <h2 className="mt-5 text-display-lg">{page.fitTitle}</h2>
            <p className="mt-[1.125rem] mb-8 max-w-[32.5rem] text-body text-muted">{page.fitLead}</p>
            <ul className="flex flex-col">
              {page.fitPoints.map((point, index) => (
                <li
                  key={point}
                  className={cn(
                    "flex items-start gap-4 border-t border-[#e6dccb] py-[1.125rem]",
                    index === page.fitPoints.length - 1 && "border-b",
                  )}
                >
                  <Icon name="check" className="mt-1 shrink-0 text-[1.3rem] text-brand-500" />
                  <span className="text-[1rem] leading-[1.6] text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal from="right" delay={0.08} className="relative flex justify-center">
            <div
              aria-hidden="true"
              className="absolute -top-[1.125rem] right-6 h-[9.375rem] w-[9.375rem] rounded-full bg-brand-200"
            />
            <div className="relative aspect-square w-full max-w-[27.5rem] overflow-hidden rounded-full shadow-photo-lg transition-shadow duration-[420ms] hover:shadow-photo-hover">
              <Image
                src={page.fitImage.src}
                alt={page.fitImage.alt}
                fill
                sizes="440px"
                className="object-cover object-[center_45%] transition-transform duration-700 ease-gentle hover:scale-[1.06]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 sm:px-8 sm:py-[6.25rem]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-[35rem]">
              <div className="flex items-center gap-3.5">
                <span className="rule-accent" aria-hidden="true" />
                <p className="eyebrow text-wine">{page.ratesOverline}</p>
              </div>
              <h2 className="mt-5 text-display-lg">{page.ratesTitle}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ButtonLink href="/pricing-policy/rates-packages" variant="secondary">
                {page.ratesLinkLabel}
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal>
            <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_40px_rgba(13,44,56,0.08)] ring-1 ring-[#e6eef1]">
              <div className="border-b border-[#e6eef1] bg-wine px-6 py-4 sm:px-8">
                <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
                  At-a-Glance Pricing
                </p>
              </div>
              <div className="divide-y divide-[#e6eef1]">
                {page.rates.map((row, index) => (
                  <div
                    key={row.label}
                    className={cn(
                      "flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-6",
                      index === 0 && "bg-brand-50/60",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[1.1875rem] font-bold text-ink">{row.label}</p>
                      <p className="mt-1 text-base text-soft">{row.note}</p>
                    </div>
                    <p className="shrink-0 font-display text-[2rem] font-extrabold leading-none text-wine sm:min-w-[7.5rem] sm:text-right">
                      {row.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title={page.ctaTitle} body={page.ctaBody} />
    </>
  );
}
