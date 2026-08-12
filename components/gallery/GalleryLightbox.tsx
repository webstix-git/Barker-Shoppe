"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

export type LightboxImage = {
  src: string;
  alt: string;
  caption: string;
};

type GalleryLightboxProps = {
  images: readonly LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/** Full-screen gallery viewer with dark overlay and prev/next controls. */
export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const reduceMotion = useReducedMotion();
  const active = activeIndex === null ? null : images[activeIndex];

  const step = useCallback(
    (direction: 1 | -1) => {
      if (activeIndex === null) return;
      onChange((activeIndex + direction + images.length) % images.length);
    },
    [activeIndex, images.length, onChange],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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
  }, [activeIndex, onClose, step]);

  return (
    <AnimatePresence>
      {active && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
        >
          {/* Dark overlay */}
          <button
            type="button"
            aria-label="Close larger view"
            className="absolute inset-0 bg-black/85 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-lg text-white transition-colors hover:bg-white/30 sm:right-6 sm:top-6"
          >
            <Icon name="cross" />
          </button>

          <div className="relative z-10 flex w-full max-w-5xl items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 text-lg text-white shadow-lg transition-colors hover:bg-white/30 sm:h-12 sm:w-12"
            >
              <Icon name="arrow-right" className="rotate-180" />
            </button>

            <motion.figure
              key={active.src}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative flex min-w-0 flex-1 flex-col items-center"
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={1400}
                height={1050}
                sizes="90vw"
                className="mx-auto h-auto max-h-[76vh] w-auto max-w-full rounded-[1.25rem] object-contain shadow-2xl"
              />
              <figcaption className="mt-5 text-center text-sm text-white/90">
                {active.caption}
                <span className="ml-2 text-white/55">
                  {activeIndex + 1} / {images.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 text-lg text-white shadow-lg transition-colors hover:bg-white/30 sm:h-12 sm:w-12"
            >
              <Icon name="arrow-right" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
