"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds. Use small offsets (0.05-0.15) when revealing siblings in sequence. */
  delay?: number;
  /** Slide direction of the entrance. */
  from?: "bottom" | "left" | "right" | "none";
  className?: string;
};

/**
 * Scroll-triggered fade/slide. Animations start only after mount so SSR HTML
 * matches the first client paint (avoids hydration console errors).
 */
export function Reveal({ children, delay = 0, from = "bottom", className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const animate = ready && reduceMotion === false;
  const offset =
    from === "bottom" ? { y: 24 } : from === "left" ? { x: -28 } : from === "right" ? { x: 28 } : {};

  return (
    <motion.div
      className={className}
      initial={animate ? { opacity: 0, ...offset } : false}
      whileInView={animate ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={animate ? { once: true, amount: 0.15, margin: "0px 0px -40px 0px" } : undefined}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const listVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Wrap a grid to stagger its children's entrances. Pair with `<StaggerItem>`. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const animate = ready && reduceMotion === false;

  return (
    <motion.div
      className={className}
      variants={animate ? listVariants : undefined}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "shown" : undefined}
      viewport={animate ? { once: true, amount: 0.12, margin: "0px 0px -40px 0px" } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const animate = ready && reduceMotion === false;

  return (
    <motion.div className={className} variants={animate ? itemVariants : undefined}>
      {children}
    </motion.div>
  );
}
