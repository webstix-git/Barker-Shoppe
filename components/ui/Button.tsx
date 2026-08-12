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

type ButtonLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}
