import Image from "next/image";
import { PawMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { differentiators } from "@/lib/site";

/** Photo collage left, bordered paw-row list right - height follows content. */
export function WhyChooseUs() {
  return (
    <section className="bg-cream px-5 py-[4.5rem] sm:px-8 sm:py-[6.875rem]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-14 lg:grid-cols-2 lg:gap-[5.625rem]">
        <Reveal from="left" className="relative w-full max-w-[28rem] pb-16 sm:pb-20 lg:pb-24">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.625rem] shadow-photo-lg">
            <Image
              src="/images/why-owners-yard.jpg"
              alt="Two dogs looking up from the turf yard"
              fill
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[9.5rem] w-[9.5rem] overflow-hidden rounded-full border-[10px] border-cream shadow-photo sm:h-[13rem] sm:w-[13rem]">
            <Image
              src="/images/white-fluffy-groom.jpg"
              alt="Small dog fresh from a groom"
              fill
              sizes="208px"
              className="object-cover object-[center_18%]"
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
