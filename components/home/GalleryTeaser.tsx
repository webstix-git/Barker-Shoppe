"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { ButtonLink } from "@/components/ui/Button";
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

      <GalleryLightbox
        images={cells}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </section>
  );
}
