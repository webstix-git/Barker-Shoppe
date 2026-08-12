import Image from "next/image";
import { PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { differentiators } from "@/lib/site";

/** Photo left, bordered paw-row list right - image height matches content. */
export function WhyChooseUs() {
  return (
    <section className="bg-cream px-5 py-[4.5rem] sm:px-8 sm:py-[6.875rem]">
      <div className="mx-auto grid max-w-[1180px] items-stretch gap-14 lg:grid-cols-2 lg:gap-[5.625rem]">
        <Reveal from="left" className="relative h-full min-h-[22rem] w-full">
          <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.625rem] shadow-photo-lg lg:absolute lg:inset-0 lg:min-h-0">
            <Image
              src="/images/why-owners-yard.jpg"
              alt="Two dogs looking up from the turf yard"
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal from="right">
          <div className="flex items-center gap-3.5">
            <span className="rule-accent" aria-hidden="true" />
            <p className="eyebrow text-wine">Why Owners Keep Coming Back</p>
          </div>
          <h2 className="mt-5 text-display-lg">
            Safe, Clean Care - with a Personal Touch
          </h2>
          <p className="mt-5 mb-8 max-w-xl text-body text-muted">
            We give Springfield owners a trusted place for their dogs to stay, play, and get groomed
            - with the same love and attention they would get at home.
          </p>

          <div className="flex flex-col">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "flex items-start gap-5 border-t border-[#e6eef1] py-[1.375rem]",
                  index === differentiators.length - 1 && "border-b",
                )}
              >
                <PawMark
                  className="mt-0.5 h-[30px] w-[30px] shrink-0"
                  fill={index % 2 === 0 ? "#309ecf" : "#8b1c25"}
                />
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-body-sm leading-[1.62] text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
