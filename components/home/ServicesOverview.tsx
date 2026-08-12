import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, PawMark } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/site";

export function ServicesOverview() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#B4D1DA] py-24 sm:py-26">
      <PawMark className="paw-deco right-[4.5rem] top-14 h-[150px] w-[150px] -rotate-[18deg] text-brand-500" />
      <PawMark className="paw-deco right-[13rem] top-[13.75rem] h-22 w-22 rotate-12 text-wine opacity-[0.13]" />

      <div className="container-page relative max-w-[1180px]">
        <SectionHeading
          overline="What We Do"
          title={
            <span className="whitespace-nowrap">Three Services, One Front Door</span>
          }
          lead="Daycare, overnight boarding, and professional grooming - all in one place for Springfield dog owners."
          className="max-w-none"
        />

        <Stagger className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-12">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <article>
                <div className="group relative pb-[1.125rem] pl-[1.125rem] transition-transform duration-[420ms] ease-gentle hover:-translate-y-2.5">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[88%] w-[90%] rounded-arch bg-[#A2C9D9]"
                  />
                  <div className="arch-frame relative h-[22rem] transition-shadow duration-[420ms] group-hover:shadow-photo-hover sm:h-[25rem]">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover transition-transform duration-700 ease-gentle group-hover:scale-[1.06]"
                    />
                  </div>
                </div>

                <p className="mt-8 font-display text-sm font-semibold text-soft">{service.meta}</p>
                <h3 className="mt-3 text-display-sm">{service.name}</h3>
                <p className="mt-3.5 text-body-sm text-muted">{service.blurb}</p>

                <ul className="mt-5 space-y-[0.7rem]">
                  {service.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink">
                      <Icon
                        name="check"
                        className="mt-0.5 shrink-0 text-[1.05rem] text-brand-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href={service.href} className="text-link mt-6">
                  {service.cta}
                </Link>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-20 flex justify-center sm:mt-24">
          <ButtonLink href="/services" variant="secondary" size="lg">
            See Full Service Details
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
