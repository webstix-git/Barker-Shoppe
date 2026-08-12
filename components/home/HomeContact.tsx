import { ButtonLink } from "@/components/ui/Button";
import { PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * Matches the attached homepage: cream band, heading left,
 * sculpted navy CTA card right, barber-pole stripe beneath.
 */
export function HomeContact() {
  return (
    <>
      <section id="contact" className="relative overflow-hidden bg-cream px-5 py-[6.25rem] sm:px-8">
        <PawMark className="paw-deco right-[3.75rem] top-[4.375rem] h-[8.125rem] w-[8.125rem] -rotate-[14deg] text-brand-500" />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <div className="flex items-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">Come See Us</p>
            </div>
            <h2 className="mt-5 text-display-lg">Ready to Book? Give Us a Call</h2>
            <p className="mt-[1.125rem] max-w-[31.25rem] text-body text-muted">
              Questions about daycare, boarding, or grooming? Call or email - we are happy to help
              Springfield dog owners get set up.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative self-center">
            <div
              aria-hidden="true"
              className="absolute -inset-1.5 rounded-[1.75rem_7.5rem_1.75rem_7.5rem] bg-brand-200"
            />
            <div className="relative rounded-[1.75rem_7.5rem_1.75rem_7.5rem] bg-navy px-8 py-12 shadow-photo-lg sm:px-14 sm:pb-16 sm:pt-14">
              <h3 className="max-w-[23.75rem] font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.125rem]">
                Ready to Book Your Dog&rsquo;s First Day?
              </h3>
              <p className="mt-4 mb-8 max-w-[25rem] text-[1.0625rem] leading-[1.7] text-[#bcd3db]">
                Call and we will walk you through openings, rates, and what to bring. Grooming quotes
                take about a minute over the phone.
              </p>

              <div className="flex flex-wrap gap-3.5">
                <ButtonLink
                  href={site.phoneHref}
                  size="lg"
                  className="bg-brand-500 shadow-none hover:bg-white hover:text-navy hover:shadow-none"
                >
                  Call {site.phoneDisplay}
                </ButtonLink>
                <ButtonLink href={`mailto:${site.email}`} variant="outline" size="lg">
                  Email us
                </ButtonLink>
              </div>

              <p className="mt-7 border-t border-white/14 pt-[1.375rem] text-[0.9375rem] leading-[1.6] text-[#8fb0bc]">
                Bring current Bordetella, DHPP, and Rabies records to your first visit.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
