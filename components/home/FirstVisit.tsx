import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { firstVisitSteps, site } from "@/lib/site";

/** Two-column first-visit band: photo + badge left, numbered steps right. */
export function FirstVisit() {
  return (
    <section
      id="new-clients"
      className="relative overflow-hidden bg-navy px-5 py-[6.25rem] text-white sm:px-8"
    >
      <PawMark className="paw-deco bottom-8 right-6 h-[9.5rem] w-[9.5rem] rotate-[18deg] text-white opacity-[0.08] sm:bottom-12 sm:right-16" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-[5rem]">
        <Reveal from="left" className="relative">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-photo-lg">
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              <Image
                src="/images/first-visit-aussie.jpg"
                alt="Australian Shepherd looking up from the turf yard"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>

          <div className="absolute -bottom-4 right-4 max-w-[15.5rem] rounded-[1rem] bg-wine px-5 py-4 shadow-badge sm:bottom-6 sm:right-6 sm:px-6 sm:py-5">
            <p className="font-display text-[1.0625rem] font-extrabold leading-snug text-white">
              No Account to Set Up
            </p>
            <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-white/90">
              Paperwork happens here, at drop-off.
            </p>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.08}>
          <div className="flex items-center gap-3.5">
            <span className="rule-accent bg-brand-200" aria-hidden="true" />
            <p className="eyebrow text-brand-200">First Visit</p>
          </div>

          <h2 className="mt-5 text-display-lg text-white">
            Bringing Your Dog for the First Time
          </h2>
          <p className="mt-[1.125rem] max-w-xl text-body text-[#bcd3db]">
            Nothing to print at home. Three things and you are set.
          </p>

          <ol className="mt-10 flex flex-col">
            {firstVisitSteps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "flex gap-4 border-t border-white/10 py-6 sm:gap-5",
                  index === firstVisitSteps.length - 1 && "border-b",
                )}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 font-display text-sm font-bold text-brand-200"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-white sm:text-[1.375rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-[1.68] text-[#bcd3db]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-9">
            <ButtonLink
              href={site.phoneHref}
              size="lg"
              className="bg-brand-500 shadow-none hover:bg-white hover:text-navy hover:shadow-none"
            >
              Call {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
