import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why The Barker Shoppe started - a safe, caring home-away-from-home for Springfield dogs.",
  alternates: { canonical: "/our-story" },
};

export default function StoryPage() {
  return (
    <>
      <PageHero
        overline="Our Story"
        title="Our Story"
        lead="We started The Barker Shoppe to give dogs a safe, caring place - with the same love and attention they get at home."
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-us" },
        ]}
        current="Our Story"
      />

      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal from="left">
            <div className="relative pb-5 pr-5 lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-[92%] w-[92%] rounded-[1.75rem] bg-[#A2C9D9] sm:rounded-[2rem]"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-photo-lg sm:rounded-[2rem]">
                <Image
                  src="/images/white-fluffy-groom.jpg"
                  alt="A freshly groomed small white dog on the grooming table"
                  fill
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              overline="How It Started"
              title="A Home Away from Home for Springfield Dogs"
            />

            <div className="mt-8 max-w-prose space-y-5 text-body text-muted">
              <p>
                The Barker Shoppe started with a simple goal: give pet owners peace of mind. We
                wanted a place where dogs get the same love and attention they would at home -
                not just a spot to wait until pickup.
              </p>
              <p>
                That means a safe, clean, and caring environment, run by people who take the job
                seriously and keep things friendly. Locally owned, dogs only, and built around
                personalized care.
              </p>
              <p>
                Today we offer daycare, overnight boarding, and professional grooming under one
                roof on East Bennett Street - so Springfield owners have one trusted place for the
                days (and nights) they cannot be there.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CTASection title="Come Say Hi" body="Call or stop by and we will talk through what your dog needs." />
    </>
  );
}
