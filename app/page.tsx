import type { Metadata } from "next";
import { FirstVisit } from "@/components/home/FirstVisit";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { Hero } from "@/components/home/Hero";
import { HomeContact } from "@/components/home/HomeContact";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { YardSection } from "@/components/home/YardSection";
import { buildPageMetadata } from "@/lib/seo";

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
