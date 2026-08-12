import Image from "next/image";
import { Icon, PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { yardHighlights } from "@/lib/site";

/** Matches the attached homepage: copy left, circular pool photo right. */
export function YardSection() {
  return (
    <section id="play" className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 sm:py-26">
      <PawMark className="paw-deco bottom-[3.75rem] left-[3.75rem] h-[7.5rem] w-[7.5rem] rotate-[24deg] text-wine opacity-15" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal from="left">
          <div className="flex items-center gap-3.5">
            <span className="rule-accent bg-brand-500" aria-hidden="true" />
            <p className="eyebrow text-brand-600">Out Back</p>
          </div>
          <h2 className="mt-5 text-display-lg">
            Outdoor Space to Play - and a Pool in the Summer
          </h2>
          <p className="mt-5 mb-8 max-w-[32.5rem] text-body text-muted">
            Out back, dogs get room to play in a safe, clean yard. When summer hits, the pool comes
            out too. Come take a look next time you stop by.
          </p>

          <div className="grid max-w-[32.5rem] grid-cols-1 gap-[1.125rem] sm:grid-cols-2 sm:gap-x-[2.125rem]">
            {yardHighlights.map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-body-sm text-ink">
                <Icon name="check" className="shrink-0 text-[1.15rem] text-brand-500" />
                {item.label}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal from="right" className="relative flex justify-center">
          <div
            aria-hidden="true"
            className="absolute -top-[1.125rem] right-6 h-[9.375rem] w-[9.375rem] rounded-full bg-brand-200"
          />
          <div className="relative aspect-square w-full max-w-[28.75rem] overflow-hidden rounded-full shadow-photo-lg">
            <Image
              src="/images/golden-pool-hero.webp"
              alt="Golden retriever cooling off in the kiddie pool"
              fill
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover object-[center_45%]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
