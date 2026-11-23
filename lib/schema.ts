import { absoluteUrl } from "@/lib/seo";
import { hours, services, site } from "@/lib/site";

type Crumb = { label: string; href: string };

function dayNameToSchema(day: string): string[] {
  const map: Record<string, string[]> = {
    Monday: ["Monday"],
    Tuesday: ["Tuesday"],
    Wednesday: ["Wednesday"],
    Thursday: ["Thursday"],
    Friday: ["Friday"],
    Saturday: ["Saturday"],
    Sunday: ["Sunday"],
    "Monday - Friday": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "Saturday & Sunday": ["Saturday", "Sunday"],
  };
  return map[day] ?? [];
}

/** Parse "7:30 am - 6:00 pm" / "8:00-11:00 am, 4:00-6:00 pm" into schema ranges. */
function parseTimeRanges(time: string): { opens: string; closes: string }[] {
  const ranges = time.split(",").map((part) => part.trim());
  const result: { opens: string; closes: string }[] = [];

  for (const range of ranges) {
    const match = range.match(
      /(\d{1,2}):(\d{2})\s*(am|pm)?\s*[-–]\s*(\d{1,2}):(\d{2})\s*(am|pm)/i,
    );
    if (!match) continue;
    const closeMer = match[6].toLowerCase();
    const openMer = (match[3] ?? match[6]).toLowerCase();
    const to24 = (h: string, m: string, mer: string) => {
      let hour = Number(h) % 12;
      if (mer === "pm") hour += 12;
      return `${String(hour).padStart(2, "0")}:${m}`;
    };
    result.push({
      opens: to24(match[1], match[2], openMer),
      closes: to24(match[4], match[5], closeMer),
    });
  }

  return result;
}

function openingHoursSpecification() {
  const specs: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }[] = [];

  for (const row of hours) {
    const days = dayNameToSchema(row.day);
    for (const range of parseTimeRanges(row.time)) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days.length === 1 ? days[0] : days,
        opens: range.opens,
        closes: range.closes,
      });
    }
  }

  return specs;
}

/** Primary LocalBusiness / PetStore JSON-LD for the site. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["PetStore", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    description:
      "Locally owned dog daycare, overnight boarding, and professional grooming on East Bennett Street in Springfield, Missouri. Dogs only.",
    image: [
      absoluteUrl("/images/barker-shoppe-logo.png"),
      absoluteUrl("/images/hero-slide-1.webp"),
    ],
    logo: absoluteUrl("/images/barker-shoppe-logo.png"),
    telephone: site.phoneE164,
    email: site.email,
    url: site.url,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.1726,
      longitude: -93.2507,
    },
    hasMap: site.mapsDirections,
    areaServed: {
      "@type": "City",
      name: "Springfield",
      containedInPlace: {
        "@type": "State",
        name: "Missouri",
      },
    },
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: [site.facebook],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dog care services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.blurb,
          url: absoluteUrl(service.href),
          provider: { "@id": `${site.url}/#business` },
          areaServed: "Springfield, MO",
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: Crumb[], current: string) {
  const list = [...items, { label: current, href: "" }];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: absoluteUrl(item.href) }
        : {}),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  href: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.href),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    provider: { "@id": `${site.url}/#business` },
    areaServed: {
      "@type": "City",
      name: "Springfield",
      containedInPlace: { "@type": "State", name: "Missouri" },
    },
  };
}
