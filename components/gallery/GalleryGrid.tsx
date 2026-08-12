"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/lib/site";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) =>
      setActiveIndex((current) =>
        current === null ? current : (current + direction + images.length) % images.length,
      ),
    [images.length],
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

  const active = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <div className="masonry columns-1 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open larger view: ${image.caption}`}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.25rem] shadow-photo transition-shadow duration-300 hover:shadow-photo-hover"
          >
            <span className={cn("relative block w-full", image.aspect)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                className="object-cover transition-transform duration-500 ease-gentle group-hover:scale-[1.04]"
              />
            </span>

            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            />

            <span className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-left text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Icon name="paw" />
              {image.caption}
            </span>
          </button>
        ))}
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
                  {(activeIndex ?? 0) + 1} / {images.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
