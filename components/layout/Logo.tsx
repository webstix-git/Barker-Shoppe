import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Full header lockup (130px). Footer lockup is 120px. */
  size?: "sm" | "lg" | "footer";
  /** Compact lockup while the sticky header is scrolled (90px). */
  compact?: boolean;
};

export function Logo({ className, size = "sm", compact = false }: LogoProps) {
  const height = compact
    ? "h-[90px] w-auto"
    : size === "lg"
      ? "h-[130px] w-auto"
      : size === "footer"
        ? "h-[120px] w-auto"
        : "h-12 w-auto sm:h-14";

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={`${site.name} - home`}
    >
      <Image
        src="/images/barker-shoppe-logo.png"
        alt={site.name}
        width={225}
        height={179}
        priority={size !== "footer"}
        className={cn(
          height,
          "object-contain transition-[height] duration-300 ease-gentle",
        )}
      />
    </Link>
  );
}
