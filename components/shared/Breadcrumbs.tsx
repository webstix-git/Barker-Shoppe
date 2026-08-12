import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export type Crumb = { label: string; href: string };

type BreadcrumbsProps = {
  items: Crumb[];
  /** Current page label (not linked). */
  current: string;
};

/** Sits directly under the interior page banner. */
export function Breadcrumbs({ items, current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-cream-line bg-white">
      <div className="container-page py-3.5">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-soft">
          {items.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <Link href={crumb.href} className="transition-colors duration-300 hover:text-wine">
                {crumb.label}
              </Link>
              <Icon name="arrow-right" className="text-[0.65rem] text-cream-dark" />
            </li>
          ))}
          <li className="font-semibold text-ink" aria-current="page">
            {current}
          </li>
        </ol>
      </div>
    </nav>
  );
}
