import { cn } from "@/lib/cn";
import type { FiIcon } from "@/lib/site";

type IconProps = {
  name: FiIcon;
  className?: string;
  /** Accessible label. Omit for decorative icons (aria-hidden). */
  label?: string;
};

/**
 * FlatIcon UIcons (regular-rounded). Stylesheet is loaded in app/layout.tsx.
 * https://www.flaticon.com/uicons
 */
export function Icon({ name, className, label }: IconProps) {
  return (
    <i
      className={cn(`fi fi-rr-${name}`, className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}

/** Soft paw silhouette used as decorative background marks in the design. */
export function PawMark({ className, fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill={fill}
      aria-hidden="true"
    >
      <ellipse cx="32" cy="43" rx="16" ry="13" />
      <ellipse cx="13" cy="25" rx="7" ry="9" />
      <ellipse cx="26" cy="15" rx="7" ry="10" />
      <ellipse cx="42" cy="16" rx="7" ry="10" />
      <ellipse cx="54" cy="28" rx="7" ry="9" />
    </svg>
  );
}
