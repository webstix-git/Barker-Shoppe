import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { buildPageMetadata } from "@/lib/seo";

/** Below-fold sections: separate chunks so framer-motion Reveal isn’t in the initial JS. */
const ServicesOverview = dynamic(() =>
  import("@/components/home/ServicesOverview").then((m) => m.ServicesOverview),
);
const WhyChooseUs = dynamic(() =>
  import("@/components/home/WhyChooseUs").then((m) => m.WhyChooseUs),
);
const YardSection = dynamic(() =>
  import("@/components/home/YardSection").then((m) => m.YardSection),
);
const FirstVisit = dynamic(() =>
  import("@/components/home/FirstVisit").then((m) => m.FirstVisit),
);
const GalleryTeaser = dynamic(() =>
  import("@/components/home/GalleryTeaser").then((m) => m.GalleryTeaser),
);
const HomeContact = dynamic(() =>
  import("@/components/home/HomeContact").then((m) => m.HomeContact),
);

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "The Barker Shoppe | Daycare, Boarding & Grooming",
    description:
      "Local dog daycare, boarding & grooming in Springfield, MO. Dogs only. Call (417) 501-1053.",
    path: "/",
    ogTitle: "The Barker Shoppe | Daycare, Boarding & Grooming",
  }),
  title: {
    absolute: "The Barker Shoppe | Daycare, Boarding & Grooming",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <YardSection />
      <FirstVisit />
      <GalleryTeaser />
      <HomeContact />
    </>
  );
}
