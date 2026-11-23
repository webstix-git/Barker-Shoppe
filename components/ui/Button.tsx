import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-display font-bold tracking-[0.01em] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-gentle active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-wine text-white shadow-cta hover:bg-brand-500 hover:shadow-[0_12px_28px_rgba(35,150,206,0.32)]",
  secondary: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  outline: "border-2 border-white/70 text-white hover:bg-white hover:text-navy",
  ghost: "text-ink hover:bg-cream-dark/60",
  onDark: "bg-white text-navy hover:bg-cream",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.9375rem]",
  lg: "px-7 py-[1.05rem] text-[1.0625rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

function isProtocolHref(href: ComponentProps<typeof Link>["href"]): boolean {
  const value = typeof href === "string" ? href : href.pathname ?? "";
  return /^(tel:|mailto:|sms:|http:|https:)/i.test(value);
}

type ButtonLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

/**
 * Styled link button. Uses a native <a> for tel:/mailto:/http(s)
 * so phone and email CTAs always open correctly.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (isProtocolHref(href) && typeof href === "string") {
    const { replace: _replace, scroll: _scroll, prefetch: _prefetch, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
