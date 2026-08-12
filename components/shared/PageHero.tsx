import type { ReactNode } from "react";
import { PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  overline: string;
  title: string;
  lead: string;
  children?: ReactNode;
};

/** Interior page banner - breadcrumbs render separately below this. */
export function PageHero({ overline, title, lead, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-cream-line bg-cream pb-14 pt-12 sm:pb-16 sm:pt-14">
      <PawMark className="paw-deco right-[-1.5rem] top-10 h-[9.5rem] w-[9.5rem] rotate-[18deg] text-brand-500 sm:right-8 sm:top-12 sm:h-[11rem] sm:w-[11rem]" />
      <PawMark className="paw-deco right-16 top-[9.5rem] h-[4.75rem] w-[4.75rem] -rotate-[12deg] text-wine opacity-[0.12] sm:right-36 sm:top-[11rem] sm:h-[5.5rem] sm:w-[5.5rem]" />

      <div className="container-page relative z-[5]">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3.5">
            <span className="rule-accent" aria-hidden="true" />
            <p className="eyebrow text-wine">{overline}</p>
          </div>
          <h1 className="mt-5 text-display-lg">{title}</h1>
          <p className="mt-5 max-w-2xl text-body text-muted">{lead}</p>
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-pole-stripes" aria-hidden="true" />
    </section>
  );
}
