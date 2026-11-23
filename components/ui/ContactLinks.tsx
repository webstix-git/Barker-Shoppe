import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type ContactLinkProps = {
  className?: string;
  children?: ReactNode;
};

/** Clickable business phone (`tel:` + E.164). */
export function PhoneLink({ className, children }: ContactLinkProps) {
  return (
    <a href={site.phoneHref} className={cn(className)}>
      {children ?? site.phoneDisplay}
    </a>
  );
}

/** Clickable business email (`mailto:`). */
export function EmailLink({ className, children }: ContactLinkProps) {
  return (
    <a href={`mailto:${site.email}`} className={cn(className)}>
      {children ?? site.email}
    </a>
  );
}
