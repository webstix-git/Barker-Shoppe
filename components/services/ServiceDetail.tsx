import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { site, type Service } from "@/lib/site";

type ServiceDetailProps = {
  service: Service;
  reverse?: boolean;
};

export function ServiceDetail({ service, reverse = false }: ServiceDetailProps) {
  return (
    <div
      id={service.slug}
      className="scroll-mt-28 grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal from={reverse ? "right" : "left"} className={cn(reverse && "lg:order-2")}>
        <div className="relative pb-5 pl-5">
          <div
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 left-0 h-[88%] w-[90%] rounded-arch",
              service.backdrop === "wine" ? "bg-wine-soft" : "bg-brand-200",
            )}
          />
          <div className="arch-frame relative aspect-[5/4]">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>

      <Reveal from={reverse ? "left" : "right"} delay={0.08}>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-xl text-brand-600">
          <Icon name={service.icon} />
        </span>

        <p className="mt-5 font-display text-sm font-semibold text-soft">{service.meta}</p>
        <h2 className="mt-2 text-display-md">{service.name}</h2>
        <p className="mt-5 text-body text-muted">{service.intro}</p>

        <h3 className="mt-9 font-display text-sm font-bold uppercase tracking-[0.12em] text-ink">
          What&rsquo;s included
        </h3>
        <ul className="mt-4 space-y-3">
          {service.includes.map((item) => (
            <li key={item} className="flex gap-3 text-base text-ink">
              <Icon name="check" className="mt-1 shrink-0 text-brand-500" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-3 rounded-[1.25rem] bg-cream p-5 ring-1 ring-cream-dark">
          <Icon name="user" className="mt-0.5 shrink-0 text-lg text-brand-600" />
          <p className="text-base text-ink">
            <span className="font-semibold">Who it&rsquo;s for: </span>
            {service.goodFor}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={site.phoneHref} size="md">
            <Icon name="phone-call" />
            Book {service.name.toLowerCase()}
          </ButtonLink>
          <ButtonLink href="/pricing-policy/rates-packages" variant="secondary" size="md">
            See rates &amp; packages
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
