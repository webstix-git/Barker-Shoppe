"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const cells = [
  {
    src: "/images/gallery-teaser-3.jpg",
    alt: "Small white dog with a seasonal bow after a groom",
    caption: "Fresh groom",
    className: "md:row-span-2 rounded-arch",
    objectPosition: "object-[center_18%]",
  },
  {
    src: "/images/gallery-teaser-2.jpg",
    alt: "Freshly groomed doodle wearing a spring bandana",
    caption: "Salon finish",
    className: "md:col-span-2 rounded-[1.375rem]",
    objectPosition: "object-[center_20%]",
  },
  {
    src: "/images/gallery-teaser-6.jpg",
    alt: "Dogs playing tug with a toy on the turf",
    caption: "Yard play",
    className: "rounded-[1.375rem_1.375rem_11.25rem_11.25rem]",
    objectPosition: "object-[center_40%]",
  },
  {
    src: "/images/gallery-teaser-5.jpg",
    alt: "Two dogs looking up from the yard",
    caption: "Happy faces",
    className: "rounded-[1.375rem]",
    objectPosition: "object-[center_30%]",
  },
  {
    src: "/images/gallery-teaser-4.jpg",
    alt: "Dogs playing together in the outdoor yard",
    caption: "Good day",
    className: "md:col-span-2 rounded-[1.375rem]",
    objectPosition: "object-[center_40%]",
  },
] as const;

/** Matches the attached homepage: asymmetric 4-column mosaic with mixed radii. */
export function GalleryTeaser() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) =>
      setActiveIndex((current) =>
        current === null ? current : (current + direction + cells.length) % cells.length,
      ),
    [],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, step]);

  const active = activeIndex === null ? null : cells[activeIndex];

  return (
    <section id="gallery" className="bg-white px-5 py-[6.25rem] sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="mb-11">
            <div className="flex items-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">The Regulars</p>
            </div>
            <h2 className="mt-5 text-display-lg">Fresh Cuts and Good Days</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-[1.125rem] md:grid-cols-4 md:grid-rows-[280px_280px]">
          {cells.map((cell, index) => (
            <button
              key={cell.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open larger view: ${cell.caption}`}
              className={`group relative min-h-[14rem] overflow-hidden bg-[#dfe9ec] text-left ${cell.className}`}
            >
              <Image
                src={cell.src}
                alt={cell.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className={`object-cover ${cell.objectPosition} transition-transform duration-700 ease-gentle group-hover:scale-[1.05]`}
              />
            </button>
          ))}
        </div>

        <Reveal delay={0.08} className="mt-10 flex justify-center">
          <ButtonLink href="/gallery" size="lg">
            View the Gallery
          </ButtonLink>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/92 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close larger view"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
            >
              <Icon name="cross" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
            >
              <Icon name="arrow-right" className="rotate-180" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
            >
              <Icon name="arrow-right" />
            </button>

            <motion.figure
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="w-full">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1400}
                  height={1050}
                  sizes="90vw"
                  className="mx-auto h-auto max-h-[76vh] w-auto max-w-full rounded-[1.25rem] object-contain shadow-2xl"
                />
              </div>
              <figcaption className="mt-5 text-center text-sm text-brand-100">
                {active.caption}
                <span className="ml-2 text-brand-200/70">
                  {(activeIndex ?? 0) + 1} / {cells.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
