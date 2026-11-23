"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { PawMark } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const heroSlides = [
  {
    src: "/images/hero-slide-1.webp",
    alt: "Happy husky looking up from the turf yard",
  },
  {
    src: "/images/hero-slide-2.webp",
    alt: "Two dogs looking up from the turf",
  },
  {
    src: "/images/hero-slide-3.webp",
    alt: "Golden retriever resting on the turf",
  },
  {
    src: "/images/hero-slide-4.webp",
    alt: "Three dogs playing tug together in the yard",
  },
] as const;

function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [allowExtras, setAllowExtras] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Defer non-LCP slides until after first paint / idle.
  useEffect(() => {
    const start = () => setAllowExtras(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1800 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || !allowExtras) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, allowExtras]);

  const nextIndex = (index + 1) % heroSlides.length;
  const visibleIndexes = new Set(
    reduceMotion || !allowExtras ? [0] : [index, nextIndex, 0],
  );

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
      <div className="relative h-[min(68vw,420px)] w-full overflow-hidden rounded-[1.75rem] shadow-photo-lg sm:h-[520px] sm:rounded-[2rem] lg:h-[590px]">
        {heroSlides.map((slide, i) => {
          if (!visibleIndexes.has(i)) return null;
          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-gentle",
                i === index ? "z-[1] opacity-100" : "z-0 pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                quality={70}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 88vw"
                className="object-cover object-[center_28%]"
              />
            </div>
          );
        })}
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
            onClick={() => {
              setAllowExtras(true);
              setIndex(i);
            }}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === index ? "w-7 bg-wine" : "w-2.5 bg-white/80 hover:bg-white",
            )}
          />
        ))}
      </div>

      <div className="absolute left-2 bottom-8 z-20 flex h-[6.5rem] w-[6.5rem] flex-col items-center justify-center gap-0.5 rounded-full bg-wine text-white shadow-badge ring-[3px] ring-white sm:-left-4 sm:bottom-12 sm:h-[8.75rem] sm:w-[8.75rem]">
        <span className="font-display text-[0.5625rem] font-semibold tracking-[0.22em] sm:text-[0.6875rem]">
          EST.
        </span>
        <span className="font-display text-[1.625rem] font-extrabold leading-none sm:text-[2.125rem]">
          2015
        </span>
        <span className="font-display text-[0.5rem] font-semibold tracking-[0.14em] text-[#f7e6e7] sm:text-[0.625rem]">
          SPRINGFIELD
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FEFBF5]">
      <PawMark className="paw-deco -left-8 top-10 h-[170px] w-[170px] -rotate-[26deg] text-brand-500" />
      <PawMark className="paw-deco left-[7.5rem] top-40 h-24 w-24 rotate-[8deg] text-wine opacity-[0.11]" />

      <div className="container-page relative z-[5] grid items-center gap-12 pt-0 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-[4.5rem] lg:pb-20">
        <div>
          <h1 className="animate-hero-rise text-[clamp(2.125rem,8.2vw,3.5rem)] leading-[1.08] tracking-[-0.035em]">
            <span className="block sm:whitespace-nowrap">Great Care for Dogs.</span>
            <span className="block text-brand-700 sm:whitespace-nowrap">Peace of Mind for You.</span>
          </h1>

          <p
            className="mt-6 max-w-[32.5rem] animate-hero-rise text-body text-muted"
            style={{ animationDelay: "120ms" }}
          >
            From a fresh groom to a full day of play or a comfortable overnight stay, The Barker
            Shoppe gives your dog the care, attention, and time they deserve.
          </p>

          <div
            className="mt-9 flex animate-hero-rise flex-wrap gap-3.5"
            style={{ animationDelay: "220ms" }}
          >
            <ButtonLink href="/services" variant="secondary" size="lg">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>

        {/* No entrance delay on LCP image */}
        <div>
          <HeroSlideshow />
        </div>
      </div>

      <div className="h-1.5 w-full bg-pole-stripes" aria-hidden="true" />
    </section>
  );
}
