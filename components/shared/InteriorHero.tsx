import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/shared/Breadcrumbs";
import { Icon, PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type JumpLink = { label: string; href: string };

type InteriorHeroProps = {
  overline: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  current: string;
  jumps?: JumpLink[];
  actions?: ReactNode;
  checks?: string[];
  image?: { src: string; alt: string };
  imageBackdrop?: "blue" | "wine";
  /** Title left / lead right - matches Pricing design hero. */
  splitLead?: boolean;
  children?: ReactNode;
};

/** Cream interior banner matching the daycare / services / rates designs. */
export function InteriorHero({
  overline,
  title,
  lead,
  crumbs,
  current,
  jumps,
  actions,
  checks,
  image,
  imageBackdrop = "blue",
  splitLead = false,
  children,
}: InteriorHeroProps) {
  const split = Boolean(image);

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        {!split && (
          <>
            <PawMark className="paw-deco right-[-1.5rem] top-10 h-[9.5rem] w-[9.5rem] rotate-[18deg] text-brand-500 sm:right-8 sm:top-12 sm:h-[11rem] sm:w-[11rem]" />
            <PawMark className="paw-deco right-16 top-[9.5rem] h-[4.75rem] w-[4.75rem] -rotate-[12deg] text-wine opacity-[0.12] sm:right-36 sm:top-[11rem] sm:h-[5.5rem] sm:w-[5.5rem]" />
          </>
        )}

        <div
          className={cn(
            "container-page relative z-[5]",
            split
              ? "grid items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-[4.5rem] lg:pb-20 lg:pt-16"
              : "py-14 sm:py-[4.75rem]",
          )}
        >
          <div className={cn(!split && "w-full")}>
            <Reveal className="w-full">
              {splitLead && !split && lead ? (
                <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                  <div>
                    <div className="flex items-center gap-3.5">
                      <span className="rule-accent" aria-hidden="true" />
                      <p className="eyebrow text-wine">{overline}</p>
                    </div>
                    <h1 className="mt-5 text-display-xl">{title}</h1>
                  </div>
                  <p className="max-w-xl text-subhead text-muted lg:pb-2">{lead}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3.5">
                    <span className="rule-accent" aria-hidden="true" />
                    <p className="eyebrow text-wine">{overline}</p>
                  </div>
                  <h1 className="mt-5 text-display-xl">{title}</h1>
                  {lead ? (
                    <p
                      className={cn(
                        "mt-5 text-subhead text-muted",
                        split ? "max-w-[32.5rem]" : "max-w-2xl",
                      )}
                    >
                      {lead}
                    </p>
                  ) : null}
                </>
              )}

              {actions && <div className="mt-8 flex flex-wrap gap-3.5">{actions}</div>}

              {checks && checks.length > 0 && (
                <ul className="mt-10 grid max-w-[32.5rem] gap-3.5 sm:grid-cols-2 sm:gap-x-[1.875rem]">
                  {checks.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[1rem] text-ink">
                      <Icon name="check" className="shrink-0 text-[1.25rem] text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {jumps && jumps.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {jumps.map((jump) => (
                    <Link
                      key={jump.href}
                      href={jump.href}
                      className="rounded-pill border border-[#ddd0bc] px-5 py-3 font-display text-[0.9375rem] font-bold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {jump.label}
                    </Link>
                  ))}
                </div>
              )}

              {children}
            </Reveal>
          </div>

          {image && (
            <Reveal
              from="right"
              delay={0.08}
              className="relative pb-6 pr-6 transition-transform duration-[420ms] ease-gentle hover:-translate-y-2.5"
            >
              <div
                aria-hidden="true"
                className={cn(
                  "absolute bottom-0 right-0 h-[88%] w-[90%] rounded-arch-lg",
                  imageBackdrop === "wine" ? "bg-wine-soft" : "bg-brand-200",
                )}
              />
              <div className="arch-frame-lg relative h-[22rem] sm:h-[28rem] lg:h-[33.75rem]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-[center_22%] transition-transform duration-700 ease-gentle hover:scale-[1.06]"
                />
              </div>
            </Reveal>
          )}
        </div>

        <div className="h-3 w-full bg-pole-stripes" aria-hidden="true" />
      </section>

      <Breadcrumbs items={crumbs} current={current} />
    </>
  );
}
