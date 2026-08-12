import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteriorHero } from "@/components/shared/InteriorHero";
import { CTASection } from "@/components/shared/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { daycareRates, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rates & Packages",
  description:
    "Daycare rates, multi-day packages, and overnight boarding prices at The Barker Shoppe in Springfield, MO.",
  alternates: { canonical: "/pricing-policy/rates-packages" },
};

const daycareRows = [
  {
    label: "Full Day",
    note: "7:30 am to 6 pm",
    one: daycareRates.oneDog[0].price,
    two: daycareRates.twoDogs[0].price,
  },
  {
    label: "Half Day",
    note: "For short shifts and errands",
    one: daycareRates.oneDog[1].price,
    two: daycareRates.twoDogs[1].price,
  },
  {
    label: "5 Day Package",
    one: daycareRates.oneDog[2].price,
    oneSub: "$23 per day",
    two: daycareRates.twoDogs[2].price,
    twoSub: "$34 per day",
  },
  {
    label: "10 Day Package",
    one: daycareRates.oneDog[3].price,
    oneSub: "$21 per day",
    two: daycareRates.twoDogs[3].price,
    twoSub: "$31 per day",
  },
  {
    label: "30 Day Package",
    one: daycareRates.oneDog[4].price,
    oneSub: "$19 per day",
    two: daycareRates.twoDogs[4].price,
    twoSub: "$28 per day",
  },
];

const boardingRows = [
  { label: "1 Dog", note: "per night", price: "$35", accent: "wine" as const },
  { label: "2 Dogs", note: "per night", price: "$60", accent: "wine" as const },
  { label: "3 Dogs", note: "per night", price: "$85", accent: "wine" as const },
  {
    label: "Every 7th Night",
    note: "applied automatically",
    price: "Free",
    accent: "blue" as const,
  },
];

const groomingRows = [
  { label: "Full Groom", note: "Bath, cut, ears, and nails" },
  { label: "Bath and Tidy", note: "Wash, dry, and a clean-up around face and feet" },
  { label: "Nail Trim", note: "On its own, or added to a groom or boarding stay" },
];

export default function RatesPage() {
  return (
    <>
      <InteriorHero
        overline="Rates & Packages"
        title="Rates & Packages"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing & Policy", href: "/pricing-policy" },
        ]}
        current="Rates & Packages"
        jumps={[
          { label: "Daycare", href: "#daycare" },
          { label: "Boarding", href: "#boarding" },
          { label: "Grooming", href: "#grooming" },
        ]}
      />

      <section id="daycare" className="scroll-mt-28 bg-white px-5 py-[5.25rem] sm:px-8 sm:py-[5.625rem]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-[37.5rem]">
              <div className="flex items-center gap-3.5">
                <span className="rule-accent" aria-hidden="true" />
                <p className="eyebrow text-wine">Monday - Friday, 7:30 AM to 6 PM</p>
              </div>
              <h2 className="mt-5 text-display-lg">Daycare</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Link href="/services/daycare" className="text-link text-base text-brand-600">
                How a Daycare Day Works
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <div className="overflow-hidden rounded-[1.375rem] border border-cream-dark">
              <div className="grid grid-cols-3 gap-3 bg-navy px-4 py-5 sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-6 sm:px-8">
                <span className="font-display text-[0.75rem] font-bold uppercase tracking-[0.14em] text-brand-200 sm:text-[0.8125rem]">
                  Option
                </span>
                <span className="text-center font-display text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white sm:text-[0.8125rem]">
                  One Dog
                </span>
                <span className="text-center font-display text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white sm:text-[0.8125rem]">
                  Two Dogs
                </span>
              </div>

              {daycareRows.map((row, index) => (
                <div
                  key={row.label}
                  className={cn(
                    "grid grid-cols-3 items-center gap-3 border-t border-cream-dark px-4 py-5 sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-6 sm:px-8 sm:py-[1.375rem]",
                    index % 2 === 0 ? "bg-cream" : "bg-white",
                  )}
                >
                  <div>
                    <p className="font-display text-[1.05rem] font-bold text-ink sm:text-[1.1875rem]">
                      {row.label}
                    </p>
                    {row.note && <p className="mt-1 text-base text-soft">{row.note}</p>}
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[1.35rem] font-extrabold text-wine sm:text-[1.625rem]">
                      {row.one}
                    </p>
                    {row.oneSub && <p className="mt-1 text-xs text-soft sm:text-sm">{row.oneSub}</p>}
                  </div>
                  <div className="text-center">
                    <p className="font-display text-[1.35rem] font-extrabold text-ink sm:text-[1.625rem]">
                      {row.two}
                    </p>
                    {row.twoSub && <p className="mt-1 text-xs text-soft sm:text-sm">{row.twoSub}</p>}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 text-[0.9375rem] leading-[1.6] text-soft">
              Daily rates effective June 1. Package pricing is unchanged.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="boarding"
        className="relative scroll-mt-28 overflow-hidden bg-[#FEFBF5] px-5 py-[6.25rem] sm:px-8"
      >
        <PawMark className="paw-deco bottom-[3.75rem] left-[3.125rem] h-[8.125rem] w-[8.125rem] rotate-[18deg] text-wine" />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal from="left">
            <div className="flex items-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">Open Weekends and Holidays</p>
            </div>
            <h2 className="mt-5 text-display-lg">Boarding</h2>
            <p className="mt-[1.125rem] max-w-[31.25rem] text-body text-muted">
              Priced per night, with dogs from the same home sharing a run. Every seventh night is free
              on longer stays.
            </p>

            <div className="mt-8 flex flex-col">
              {boardingRows.map((row, index) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex flex-col gap-1 border-t border-[#e6dccb] py-[1.125rem] sm:flex-row sm:items-baseline sm:gap-5",
                    index === boardingRows.length - 1 && "border-b",
                  )}
                >
                  <span className="flex-1 font-display text-[1.125rem] font-bold text-ink">
                    {row.label}
                  </span>
                  <span className="flex-1 text-base text-soft">{row.note}</span>
                  <span
                    className={cn(
                      "font-display text-[1.5rem] font-extrabold",
                      row.accent === "blue" ? "text-brand-500" : "text-wine",
                    )}
                  >
                    {row.price}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[0.9375rem] leading-[1.6] text-soft">
              Weekend drop-off and pickup: 8-11 am and 4-6 pm.
            </p>
          </Reveal>

          <Reveal
            from="right"
            delay={0.08}
            className="relative pb-5 pr-5 transition-transform duration-[420ms] ease-gentle hover:-translate-y-2.5"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-[92%] w-[92%] rounded-[1.5rem] bg-wine-soft sm:rounded-[1.75rem]"
            />
            <div className="relative h-[22rem] overflow-hidden rounded-[1.5rem] shadow-photo sm:h-[28.75rem] sm:rounded-[1.75rem]">
              <Image
                src="/images/holiday-cream-doodle.jpg"
                alt="Golden retriever posing at the holiday backdrop"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-[center_32%] transition-transform duration-700 ease-gentle hover:scale-[1.06]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="grooming" className="scroll-mt-28 bg-white px-5 py-[6.25rem] sm:px-8">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal
            from="left"
            className="relative pb-5 pl-5 transition-transform duration-[420ms] ease-gentle hover:-translate-y-2.5"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[92%] w-[92%] rounded-[1.5rem] bg-[#A2C9D9] sm:rounded-[1.75rem]"
            />
            <div className="relative h-[22rem] overflow-hidden rounded-[1.5rem] shadow-photo sm:h-[28.75rem] sm:rounded-[1.75rem]">
              <Image
                src="/images/poodle-after-groom.jpg"
                alt="Freshly groomed doodle on the grooming table"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-[center_32%] transition-transform duration-700 ease-gentle hover:scale-[1.06]"
              />
            </div>
          </Reveal>

          <Reveal from="right" delay={0.08}>
            <div className="flex items-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">By Appointment</p>
            </div>
            <h2 className="mt-5 text-display-lg">Grooming</h2>

            <div className="mt-8 flex flex-col">
              {groomingRows.map((row, index) => (
                <div
                  key={row.label}
                  className={cn(
                    "border-t border-[#e6eef1] py-5",
                    index === groomingRows.length - 1 && "border-b",
                  )}
                >
                  <p className="font-display text-[1.1875rem] font-bold text-ink">{row.label}</p>
                  <p className="mt-1.5 text-[1rem] text-soft">{row.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <ButtonLink href={site.phoneHref}>Get a grooming quote</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Questions About a Rate?"
        body="Call and we will tell you exactly what your dog’s week or stay would cost, packages included."
      />
    </>
  );
}
