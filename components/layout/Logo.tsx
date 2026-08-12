import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Compact lockup while the sticky header is scrolled (80px). */
  compact?: boolean;
};

/** Brand lockup — 150px by default; 80px when the sticky header is scrolled. */
export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={`${site.name} - home`}
    >
      <Image
        src="/images/barker-shoppe-logo.png"
        alt={site.name}
        width={571}
        height={437}
        priority
        className={cn(
          "w-auto object-contain transition-[height] duration-300 ease-gentle",
          compact ? "h-[80px]" : "h-[150px]",
        )}
      />
    </Link>
  );
}
