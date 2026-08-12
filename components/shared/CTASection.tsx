import { ButtonLink } from "@/components/ui/Button";
import { PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

type CTASectionProps = {
  overline?: string;
  title?: string;
  body?: string;
  cardTitle?: string;
  cardBody?: string;
  note?: string;
  /** Section background. Default blue band; use white on pages like About Us. */
  tone?: "blue" | "white";
};

/**
 * Daycare / pricing “Come See Us” band - cream left copy + sculpted navy card.
 * One CTA per interior page; do not stack a second closing band below it.
 */
export function CTASection({
  overline = "Come See Us",
  title = "Ready to Book?",
  body = "Call us about daycare, boarding, or grooming. We will help you get set up for your first visit.",
  cardTitle = "Ready to book your dog’s first day?",
  cardBody = "Call and we will walk you through openings, rates, and what to bring.",
  note = "Bring current Bordetella, DHPP, and Rabies records to your first visit.",
  tone = "blue",
}: CTASectionProps) {
  return (
    <>
      <section
        className={
          tone === "white"
            ? "relative overflow-hidden bg-white px-5 py-[6.25rem] sm:px-8"
            : "relative overflow-hidden bg-[#B4D1DA] px-5 py-[6.25rem] sm:px-8"
        }
      >
        <PawMark className="paw-deco right-[3.75rem] top-[4.375rem] h-[8.125rem] w-[8.125rem] -rotate-[14deg] text-brand-500" />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <div className="flex items-center gap-3.5">
              <span className="rule-accent" aria-hidden="true" />
              <p className="eyebrow text-wine">{overline}</p>
            </div>
            <h2 className="mt-5 text-display-lg">{title}</h2>
            <p className="mt-[1.125rem] max-w-[31.25rem] text-body text-muted">{body}</p>
          </Reveal>

          <Reveal delay={0.1} className="relative self-center">
            <div
              aria-hidden="true"
              className="absolute -inset-1.5 rounded-[1.75rem_7.5rem_1.75rem_7.5rem] bg-brand-200"
            />
            <div className="relative rounded-[1.75rem_7.5rem_1.75rem_7.5rem] bg-navy px-8 py-12 shadow-photo-lg sm:px-14 sm:pb-16 sm:pt-14">
              <h3 className="max-w-[23.75rem] font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.125rem]">
                {cardTitle}
              </h3>
              <p className="mt-4 mb-8 max-w-[25rem] text-[1.0625rem] leading-[1.7] text-[#bcd3db]">
                {cardBody}
              </p>

              <div className="flex flex-wrap gap-3.5">
                <ButtonLink
                  href={site.phoneHref}
                  size="lg"
                  className="bg-brand-500 shadow-none hover:bg-white hover:text-navy hover:shadow-none"
                >
                  Call {site.phoneDisplay}
                </ButtonLink>
                <ButtonLink href="/contact-us" variant="outline" size="lg">
                  Contact Us
                </ButtonLink>
              </div>

              <p className="mt-7 border-t border-white/14 pt-[1.375rem] text-[0.9375rem] leading-[1.6] text-[#8fb0bc]">
                {note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
