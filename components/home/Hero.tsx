"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { PawMark } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const heroSlides = [
  {
    src: "/images/hero-slide-1.jpg",
    alt: "Happy husky looking up from the turf yard",
  },
  {
    src: "/images/hero-slide-2.jpg",
    alt: "Two dogs looking up from the turf",
  },
  {
    src: "/images/hero-slide-3.jpg",
    alt: "Golden retriever resting on the turf",
  },
  {
    src: "/images/hero-slide-4.jpg",
    alt: "Three dogs playing tug together in the yard",
  },
] as const;

function HeroSlideshow() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  return (
    <div
      className="relative pb-5 pr-5 sm:pb-6 sm:pr-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-[92%] w-[92%] rounded-[1.75rem] bg-[#A2C9D9] sm:rounded-[2rem]"
      />
      <div className="relative h-[590px] w-full overflow-hidden rounded-[1.75rem] shadow-photo-lg sm:rounded-[2rem]">
        {heroSlides.map((slide, i) => (
          <motion.div
            key={slide.src}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className={cn(
              "absolute inset-0",
              i === index ? "z-[1]" : "z-0 pointer-events-none",
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="object-cover object-[center_28%]"
            />
          </motion.div>
        ))}
      </div>

      <div
        className="absolute bottom-10 right-10 z-10 flex gap-2 sm:bottom-12 sm:right-12"
        role="tablist"
        aria-label="Hero photos"
      >
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === index ? "w-7 bg-wine" : "w-2.5 bg-white/80 hover:bg-white",
            )}
          />
        ))}
      </div>

      <div className="absolute -left-2 bottom-10 z-20 flex h-[8.75rem] w-[8.75rem] flex-col items-center justify-center gap-0.5 rounded-full bg-wine text-white shadow-badge ring-[3px] ring-white sm:-left-4 sm:bottom-12">
        <span className="font-display text-[0.6875rem] font-semibold tracking-[0.22em]">EST.</span>
        <span className="font-display text-[2.125rem] font-extrabold leading-none">
          2015
        </span>
        <span className="font-display text-[0.625rem] font-semibold tracking-[0.14em] text-wine-soft">
          SPRINGFIELD
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: EASE },
        };

  return (
    <section id="top" className="relative overflow-hidden bg-[#FEFBF5]">
      <PawMark className="paw-deco -left-8 top-10 h-[170px] w-[170px] -rotate-[26deg] text-brand-500" />
      <PawMark className="paw-deco left-[7.5rem] top-40 h-24 w-24 rotate-[8deg] text-wine opacity-[0.11]" />

      <div className="container-page relative z-[5] grid items-center gap-12 pt-0 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-[4.5rem] lg:pb-20">
        <div>
          <motion.h1
            {...rise(0.05)}
            className="text-[clamp(1.85rem,4.1vw,3.15rem)] leading-[1.08] tracking-[-0.035em] [text-wrap:unset]"
          >
            <span className="block whitespace-nowrap">Great Care for Dogs.</span>
            <span className="block whitespace-nowrap text-brand-500">Peace of Mind for You.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-[32.5rem] text-body text-muted">
            From a fresh groom to a full day of play or a comfortable overnight stay, The Barker
            Shoppe gives your dog the care, attention, and time they deserve.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-9 flex flex-wrap gap-3.5">
            <ButtonLink href="/services" variant="secondary" size="lg">
              Explore Our Services
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div {...rise(0.2)}>
          <HeroSlideshow />
        </motion.div>
      </div>

      <div className="h-1.5 w-full bg-pole-stripes" aria-hidden="true" />
    </section>
  );
}
