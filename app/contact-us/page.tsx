import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { hours, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call (417) 501-1053 or visit The Barker Shoppe at 1927 East Bennett Street, Springfield, MO 65804.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Contact Us"
        title="Contact Us"
        lead="We're on East Bennett Street. Calling is the quickest way to book boarding or a grooming appointment."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Contact Us" />

      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal from="left">
            <ContactForm />
          </Reveal>

          <div className="space-y-6">
            <Reveal from="right" delay={0.08}>
              <div className="rounded-[1.5rem] bg-white p-7 shadow-[0_10px_30px_rgba(13,44,56,0.06)] ring-1 ring-cream-dark sm:p-8">
                <h2 className="text-display-sm">Shoppe Details</h2>

                <ul className="mt-7 space-y-6">
                  <Detail
                    icon="marker"
                    label="Address"
                    body={
                      <>
                        {site.address.street}
                        <br />
                        {site.address.city}, {site.address.state} {site.address.zip}
                      </>
                    }
                    link={{ href: site.mapsDirections, text: "Get directions" }}
                  />
                  <Detail
                    icon="phone-call"
                    label="Phone"
                    body={
                      <a
                        href={site.phoneHref}
                        className="font-display text-xl font-bold text-ink hover:text-wine"
                      >
                        {site.phoneDisplay}
                      </a>
                    }
                  />
                  <Detail
                    icon="envelope"
                    label="Email"
                    body={
                      <a
                        href={`mailto:${site.email}`}
                        className="break-all text-body-sm text-ink hover:text-wine"
                      >
                        {site.email}
                      </a>
                    }
                  />
                  <li className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                      <i className="fi fi-brands-facebook" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-soft">
                        Facebook
                      </h3>
                      <a
                        href={site.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 block text-body-sm text-ink hover:text-wine"
                      >
                        facebook.com/barkershoppe
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal from="right" delay={0.16}>
              <div className="rounded-[1.5rem] bg-white p-7 shadow-[0_10px_30px_rgba(13,44,56,0.06)] ring-1 ring-cream-dark sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600">
                    <Icon name="clock" />
                  </span>
                  <h2 className="text-display-sm">Hours</h2>
                </div>

                <dl className="mt-6 divide-y divide-cream-dark">
                  {hours.map((entry) => (
                    <div
                      key={entry.day}
                      className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3"
                    >
                      <dt className="font-semibold text-ink">{entry.day}</dt>
                      <dd className="text-body-sm text-muted">{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="white" space="tight">
        <Reveal>
          <h2 className="text-display-sm">Find Us on East Bennett</h2>
          <p className="mt-3 max-w-2xl text-body-sm text-muted">
            Find us at {site.address.full}. Give us a call if you need directions.
          </p>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] shadow-photo ring-1 ring-cream-dark">
            <iframe
              title={`Google Map showing ${site.name} at ${site.address.full}`}
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full border-0 sm:h-[26rem]"
            />
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Let's Get Your Dog on the Schedule"
        body="Have dates in mind for boarding, daycare, or a groom? Call or send a message and we will help."
      />
    </>
  );
}

function Detail({
  icon,
  label,
  body,
  link,
}: {
  icon: "marker" | "phone-call" | "envelope";
  label: string;
  body: ReactNode;
  link?: { href: string; text: string };
}) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Icon name={icon} />
      </span>
      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-soft">
          {label}
        </h3>
        <div className="mt-1.5 text-body-sm text-ink">{body}</div>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-wine"
          >
            <Icon name="arrow-right" className="text-xs" />
            {link.text}
          </a>
        )}
      </div>
    </li>
  );
}
