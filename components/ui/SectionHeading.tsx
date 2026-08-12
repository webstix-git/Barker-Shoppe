import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  overline?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
};

export function SectionHeading({
  overline,
  title,
  lead,
  align = "left",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {overline && (
        <div className={cn("flex items-center gap-3.5", align === "center" && "justify-center")}>
          <span className={cn("rule-accent", onDark && "bg-brand-300")} aria-hidden="true" />
          <p className={cn("eyebrow", onDark ? "text-brand-200" : "text-wine")}>{overline}</p>
        </div>
      )}
      <h2 className={cn("mt-5 text-display-lg", onDark && "text-white")}>{title}</h2>
      {lead && (
        <p className={cn("mt-5 text-body", onDark ? "text-white/80" : "text-soft")}>{lead}</p>
      )}
    </Reveal>
  );
}
