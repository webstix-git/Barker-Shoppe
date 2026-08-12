import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "cream" | "warm" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink",
  cream: "bg-[#B4D1DA] text-ink",
  warm: "bg-[#FEFBF5] text-ink",
  navy: "bg-navy text-white",
};

type SectionProps = {
  tone?: Tone;
  space?: "tight" | "base" | "loose";
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ tone = "white", space = "base", id, className, children }: SectionProps) {
  const spacing =
    space === "tight" ? "py-14 sm:py-16" : space === "loose" ? "py-22 sm:py-28" : "py-20 sm:py-24";

  return (
    <section id={id} className={cn("relative overflow-hidden", tones[tone], spacing, className)}>
      <div className="container-page relative">{children}</div>
    </section>
  );
}
