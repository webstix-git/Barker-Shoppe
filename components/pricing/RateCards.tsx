import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { site, type Package } from "@/lib/site";

export function RateCard({
  title,
  rows,
  accent = false,
}: {
  title: string;
  rows: { label: string; price: string; note?: string }[];
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] p-7 sm:p-8",
        accent ? "bg-navy text-white shadow-photo" : "bg-cream ring-1 ring-cream-dark",
      )}
    >
      <h3 className={cn("font-display text-xl font-bold", accent ? "text-white" : "text-ink")}>
        {title}
      </h3>
      <dl className={cn("mt-6 divide-y", accent ? "divide-white/10" : "divide-cream-dark")}>
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 py-3.5">
            <dt className={cn("text-body-sm", accent ? "text-white/85" : "text-ink")}>
              {row.label}
              {row.note && (
                <span
                  className={cn("mt-0.5 block text-sm", accent ? "text-brand-200" : "text-muted")}
                >
                  {row.note}
                </span>
              )}
            </dt>
            <dd
              className={cn(
                "shrink-0 font-display text-xl font-extrabold",
                accent ? "text-brand-300" : "text-brand-600",
              )}
            >
              {row.price}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PackageGrid({ items }: { items: Package[] }) {
  return (
    <Stagger className="mt-6 grid items-stretch gap-6 lg:grid-cols-3">
      {items.map((pkg) => (
        <StaggerItem key={pkg.name}>
          <div
            className={cn(
              "relative flex h-full flex-col rounded-[1.5rem] p-7 transition-[transform,box-shadow] duration-300 ease-gentle hover:-translate-y-1 sm:p-8",
              pkg.featured
                ? "bg-navy text-white shadow-photo-hover ring-2 ring-brand-400"
                : "bg-cream ring-1 ring-cream-dark hover:shadow-photo",
            )}
          >
            {pkg.featured && (
              <span className="absolute -top-3 left-7 rounded-pill bg-wine px-3.5 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white sm:left-8">
                Most Popular
              </span>
            )}

            <h3 className={cn("font-display text-xl font-bold", pkg.featured && "text-white")}>
              {pkg.name}
            </h3>
            <p className={cn("mt-1 text-sm", pkg.featured ? "text-brand-200" : "text-muted")}>
              {pkg.forWhom} · {pkg.perDay}
            </p>

            <p className="mt-5 font-display text-[2.5rem] font-extrabold leading-none">{pkg.price}</p>

            <p className={cn("mt-4 text-base", pkg.featured ? "text-white/80" : "text-muted")}>
              {pkg.summary}
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {pkg.perks.map((perk) => (
                <li key={perk} className="flex gap-3 text-base">
                  <Icon
                    name="check"
                    className={cn(
                      "mt-0.5 shrink-0",
                      pkg.featured ? "text-brand-300" : "text-brand-500",
                    )}
                  />
                  <span className={pkg.featured ? "text-white/85" : "text-ink"}>{perk}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={site.phoneHref}
              variant={pkg.featured ? "onDark" : "secondary"}
              className="mt-8 w-full"
            >
              <Icon name="phone-call" />
              Call to buy
            </ButtonLink>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
