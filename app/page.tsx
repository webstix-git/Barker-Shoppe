import type { Metadata } from "next";
import { FirstVisit } from "@/components/home/FirstVisit";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { Hero } from "@/components/home/Hero";
import { HomeContact } from "@/components/home/HomeContact";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { YardSection } from "@/components/home/YardSection";

export const metadata: Metadata = {
  title: "Dog Daycare, Boarding & Grooming in Springfield, MO",
  description:
    "The Barker Shoppe - locally owned dog daycare, overnight boarding, and professional grooming on East Bennett Street. Dogs only.",
  alternates: { canonical: "/" },
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
