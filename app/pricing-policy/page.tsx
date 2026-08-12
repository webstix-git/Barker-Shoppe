import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { InteriorHero } from "@/components/shared/InteriorHero";
import { CTASection } from "@/components/shared/CTASection";
import { policyFaqs, pricingNav } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pricing & Policy",
  description:
    "Rates, packages, new client requirements, and vaccination policy at The Barker Shoppe in Springfield, MO.",
  alternates: { canonical: "/pricing-policy" },
};

const hubCards = [
  {
    ...pricingNav[0],
    icon: "clipboard-list-check" as const,
    body: "Daycare drop-in rates, multi-day passes, and overnight boarding prices - including every 7th night free.",
    image: { src: "/images/aussie-yard.jpg", alt: "Dog on the turf yard" },
    backdrop: "blue" as const,
  },
  {
    ...pricingNav[1],
    icon: "user" as const,
    body: "What to bring on day one: a quick call or stop-in, shot records, the in-shoppe form, and food or meds.",
    image: { src: "/images/dog-stack-yard.jpg", alt: "Dogs together in the yard" },
    backdrop: "wine" as const,
  },
  {
    ...pricingNav[2],
    icon: "syringe" as const,
    body: "Bordetella, DHPP, and Rabies must be current for every dog, every service. No exceptions.",
    image: { src: "/images/sheepdog-bandana.jpg", alt: "Dog after a groom" },
    backdrop: "blue" as const,
  },
];

export default function PricingPage() {
  return (
    <>
      <InteriorHero
        overline="Pricing & Policy"
        title="Pricing & Policy"
        lead="Daycare and boarding prices are posted here. Grooming is quoted by size and coat before we start. New client and vaccination rules are spelled out so drop-off is simple."
        crumbs={[{ label: "Home", href: "/" }]}
        current="Pricing & Policy"
        jumps={pricingNav.map((item) => ({ label: item.label, href: item.href }))}
      />

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-[6.25rem]">
        <div className="mx-auto max-w-[1180px]">
          <Stagger className="grid gap-10 lg:gap-12">
            {hubCards.map((card, index) => {
              const reverse = index % 2 === 1;
              return (
                <StaggerItem key={card.href}>
                  <Link
                    href={card.href}
                    className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <div
                      className={cn(
                        "relative pb-5 pl-5 transition-transform duration-[420ms] ease-gentle group-hover:-translate-y-2",
                        reverse && "lg:order-2",
                      )}
                    >
                      <div
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-0 left-0 h-[88%] w-[90%] rounded-arch",
                          card.backdrop === "wine" ? "bg-wine-soft" : "bg-brand-200",
                        )}
                      />
                      <div className="arch-frame relative aspect-[5/4]">
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          fill
                          sizes="(min-width: 1024px) 45vw, 90vw"
                          className="object-cover transition-transform duration-700 ease-gentle group-hover:scale-[1.05]"
                        />
                      </div>
                    </div>

                    <div className={cn(reverse && "lg:order-1")}>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-xl text-brand-600">
                        <Icon name={card.icon} />
                      </span>
                      <h2 className="mt-5 text-display-md group-hover:text-wine">{card.label}</h2>
                      <p className="mt-4 max-w-xl text-body text-muted">{card.body}</p>
                      <span className="text-link mt-7 inline-flex">Open page</span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-[6.25rem]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">Policy FAQs</p>
            </div>
            <h2 className="mt-5 text-display-lg">Quick Answers</h2>
          </Reveal>
          <div className="mx-auto mt-14 max-w-3xl">
            <Accordion items={policyFaqs} defaultOpen="all" />
          </div>
        </div>
      </section>

      <CTASection
        title="Have a Question We Didn’t Answer?"
        body="Call the shoppe and we will walk you through openings, rates, and what to bring."
      />
    </>
  );
}
