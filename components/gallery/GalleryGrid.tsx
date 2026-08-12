"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/lib/site";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

      <GalleryLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </>
  );
}
