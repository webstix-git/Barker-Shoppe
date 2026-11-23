import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/services/ServicePageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { getServicePage, services } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const serviceSeo: Record<
  string,
  { title: string; description: string }
> = {
  daycare: {
    title: "Dog Daycare in Springfield, MO",
    description:
      "Full-day and half-day dog daycare in Springfield, MO with outdoor play time and multi-day packages. Call The Barker Shoppe at (417) 501-1053.",
  },
  boarding: {
    title: "Overnight Dog Boarding in Springfield, MO",
    description:
      "Safe overnight dog boarding in Springfield, MO from $35 a night. Every 7th night free. Same-home dogs can stay together. Call (417) 501-1053.",
  },
  grooming: {
    title: "Professional Dog Grooming in Springfield, MO",
    description:
      "Professional dog grooming in Springfield, MO — full grooms, bath and tidy, and nail trims. Large or small, call The Barker Shoppe for a quote.",
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service" };
  const seo = serviceSeo[slug] ?? {
    title: service.name,
    description: service.blurb,
  };
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: service.href,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const page = getServicePage(slug);
  if (!service || !page) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.intro,
          href: service.href,
          image: (page.bannerImage ?? service.image).src,
        })}
      />
      <ServicePageView service={service} page={page} />
    </>
  );
}
