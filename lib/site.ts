/**
 * Single source of truth for Barker Shoppe content.
 * Copy, rates, hours, and services are taken from the client brief,
 * the attached homepage design, and the printed rate sheet.
 */

export const site = {
  name: "The Barker Shoppe",
  shortName: "Barker Shoppe",
  tagline: "Because every pet deserves a \u201Cpaw\u201D day.",
  url: "https://barkershoppesgf.com",
  phoneDisplay: "(417) 501-1053",
  phoneHref: "tel:+14175011053",
  email: "Barkershoppe@gmail.com",
  facebook: "https://www.facebook.com/barkershoppe",
  address: {
    street: "1927 East Bennett Street",
    streetShort: "1927 East Bennett St.",
    city: "Springfield",
    state: "MO",
    zip: "65804",
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=1927+East+Bennett+Street+Springfield+MO+65804",
  mapsEmbed:
    "https://www.google.com/maps?q=1927+East+Bennett+Street,+Springfield,+MO+65804&output=embed",
} as const;

/** Hours from the client rate sheet / shop schedule. */
export const hours: { day: string; time: string }[] = [
  { day: "Monday - Friday", time: "7:30 am - 6:00 pm" },
  { day: "Saturday & Sunday", time: "8:00-11:00 am, 4:00-6:00 pm" },
];

export const serviceNav = [
  { label: "Dog Daycare", href: "/services/daycare" },
  { label: "Overnight Boarding", href: "/services/boarding" },
  { label: "Professional Grooming", href: "/services/grooming" },
] as const;

export const pricingNav = [
  { label: "Rates & Packages", href: "/pricing-policy/rates-packages" },
  { label: "New Client Requirements", href: "/pricing-policy/new-client-requirements" },
  { label: "Vaccination Policy", href: "/pricing-policy/vaccination-policy" },
] as const;

export type NavChild = { label: string; href: string };
export type NavLink = {
  label: string;
  href: string;
  children?: readonly NavChild[];
};

export const aboutNav = [
  { label: "Our Story", href: "/our-story" },
] as const;

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us", children: aboutNav },
  { label: "Services", href: "/services", children: serviceNav },
  { label: "Pricing & Policy", href: "/pricing-policy", children: pricingNav },
  { label: "Contact Us", href: "/contact-us" },
];

/** Canonical page names for links and banners. */
export const pageLabels = {
  "/": "Home",
  "/about-us": "About Us",
  "/our-story": "Our Story",
  "/services": "Services",
  "/services/daycare": "Dog Daycare",
  "/services/boarding": "Overnight Boarding",
  "/services/grooming": "Professional Grooming",
  "/pricing-policy": "Pricing & Policy",
  "/pricing-policy/rates-packages": "Rates & Packages",
  "/pricing-policy/new-client-requirements": "New Client Requirements",
  "/pricing-policy/vaccination-policy": "Vaccination Policy",
  "/gallery": "Gallery",
  "/contact-us": "Contact Us",
  "/privacy-policy": "Privacy Policy",
  "/ai-policy": "AI Policy",
  "/ai-readiness-service-index": "AI Readiness Service Index",
  "/sitemap": "Sitemap",
} as const;

export function pageLabel(href: string): string {
  const path = href.split("#")[0];
  return pageLabels[path as keyof typeof pageLabels] ?? path;
}

/** FlatIcon UIcons class suffixes (regular-rounded set). */
export type FiIcon =
  | "paw"
  | "check"
  | "phone-call"
  | "marker"
  | "envelope"
  | "clock"
  | "scissors"
  | "moon"
  | "sun"
  | "shield-check"
  | "bone"
  | "home"
  | "heart"
  | "arrow-right"
  | "dog"
  | "calendar"
  | "user"
  | "bath"
  | "house-chimney"
  | "clipboard-list-check"
  | "syringe"
  | "star"
  | "interrogation"
  | "menu-dots"
  | "cross"
  | "angle-small-down";

export type Service = {
  slug: "daycare" | "boarding" | "grooming";
  name: string;
  icon: FiIcon;
  meta: string;
  blurb: string;
  intro: string;
  includes: string[];
  goodFor: string;
  cta: string;
  href: string;
  image: { src: string; alt: string };
  backdrop: "blue" | "wine";
};

export const services: Service[] = [
  {
    slug: "daycare",
    name: "Dog Daycare",
    icon: "sun",
    meta: "Monday - Friday, 7:30 AM to 6 PM",
    blurb: "A safe place for your dog to play and socialize while you work.",
    intro:
      "Busy day? Drop your dog off for daycare. We keep them active, comfortable, and well looked after until you pick them up.",
    includes: [
      "Full and half days",
      "Multi-day packages",
      "Outdoor play time",
      "Food and meds welcome",
    ],
    goodFor:
      "Busy professionals and families who want their dog to play and socialize during the day.",
    cta: "Read more about daycare",
    href: "/services/daycare",
    image: {
      src: "/images/aussie-yard.jpg",
      alt: "A happy Australian Shepherd sitting on the turf yard at The Barker Shoppe",
    },
    backdrop: "blue",
  },
  {
    slug: "boarding",
    name: "Overnight Boarding",
    icon: "moon",
    meta: "Open Weekends and Holidays",
    blurb: "Safe, comfortable overnight stays when you travel.",
    intro:
      "Need overnight care? Boarding keeps your dog in a clean, comfortable space with people who know how to look after them - including feeding and medication schedules you send.",
    includes: [
      "Every 7th night free",
      "Dogs from the same home can stay together",
      "Bring their food and meds",
      "Weekend drop-off and pickup hours",
    ],
    goodFor:
      "Owners who are traveling or away overnight and want a trusted place for their dog.",
    cta: "Read more about boarding",
    href: "/services/boarding",
    image: {
      src: "/images/dog-stack-yard.jpg",
      alt: "Dogs of every size together in the yard at The Barker Shoppe",
    },
    backdrop: "wine",
  },
  {
    slug: "grooming",
    name: "Professional Grooming",
    icon: "scissors",
    meta: "By Appointment",
    blurb: "Large or small, we do it all. Call for a quote.",
    intro:
      "Looking for someone to pamper your pet? Large or small, we do it all. Call for pricing based on the service and your dog, then book a grooming appointment.",
    includes: [
      "Full groom",
      "Bath and tidy",
      "Nail trim",
      "Add a groom to a boarding stay",
    ],
    goodFor:
      "Owners who want professional grooming, baths, or nail care.",
    cta: "Read more about grooming",
    href: "/services/grooming",
    image: {
      src: "/images/sheepdog-bandana.jpg",
      alt: "A freshly groomed black-and-white dog on the grooming table wearing a seasonal bandana",
    },
    backdrop: "blue",
  },
];

export type ServiceScheduleStep = {
  mark: string;
  title: string;
  body: string;
  accent?: boolean;
};

export type ServicePageContent = {
  slug: Service["slug"];
  heroChecks: string[];
  primaryCta: string;
  secondaryCta: { label: string; href: string };
  scheduleOverline: string;
  scheduleTitle: string;
  schedule: ServiceScheduleStep[];
  fitOverline: string;
  fitTitle: string;
  fitLead: string;
  fitPoints: string[];
  fitImage: { src: string; alt: string };
  /** Optional detail-page banner image; falls back to the shared service card image. */
  bannerImage?: { src: string; alt: string };
  ratesOverline: string;
  ratesTitle: string;
  ratesLinkLabel: string;
  rates: { label: string; note: string; price: string }[];
  ctaTitle: string;
  ctaBody: string;
  hubFeatures: { title: string; body: string }[];
  hubBlurb: string;
  hubPriceNote: string;
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "daycare",
    heroChecks: [
      "Full day $30, half day $15",
      "Packages down to $19 a day",
      "Outdoor play time",
      "Second-dog rate available",
    ],
    primaryCta: "Call to book a day",
    secondaryCta: { label: "See daycare rates", href: "/pricing-policy/rates-packages#daycare" },
    scheduleOverline: "A Day Here",
    scheduleTitle: "Drop Off, Play, Pick Up",
    schedule: [
      {
        mark: "7:30 am",
        title: "Drop-Off Opens",
        body: "Come in after 7:30 am. Hand over food or medication and let us know anything we should keep in mind.",
      },
      {
        mark: "Day",
        title: "Play and Socialization",
        body: "Your dog spends the day in a safe, clean space with room to play outdoors and hang out with other dogs.",
      },
      {
        mark: "Half",
        title: "Half Days Available",
        body: "Shorter shifts? Half days cover the mornings or the errands that do not need a full day.",
      },
      {
        mark: "6:00 pm",
        title: "Pickup by Six",
        body: "Pick up by 6:00 pm and ask how the day went. We are happy to fill you in.",
        accent: true,
      },
    ],
    fitOverline: "Is Daycare Right for Your Dog?",
    fitTitle: "Built for Busy Days and Social Dogs",
    fitLead:
      "Daycare is a good fit when you need a trusted place for your dog to stay and play while you work. Call us and we will talk through whether it suits your dog.",
    fitPoints: [
      "Owners who work long days and want more than a crate at home",
      "Dogs who enjoy other dogs and outdoor play",
      "Families who want regular socialization without the guesswork",
    ],
    fitImage: {
      src: "/images/golden-pool-hero.webp",
      alt: "Golden retriever cooling off in the summer pool",
    },
    ratesOverline: "Daycare Rates",
    ratesTitle: "One Dog, at a Glance",
    ratesLinkLabel: "Full price list, including two dogs",
    rates: [
      { label: "Full Day", note: "Drop off from 7:30 am, pickup by 6 pm", price: "$30" },
      { label: "Half Day", note: "For shorter days", price: "$15" },
      { label: "5 Day Package", note: "$23 per day", price: "$115" },
      { label: "10 Day Package", note: "$21 per day", price: "$210" },
      { label: "30 Day Package", note: "$19 per day", price: "$570" },
    ],
    ctaTitle: "Ready to Try a Daycare Day?",
    ctaBody: "Call us and we will help you find a day that works.",
    hubFeatures: [
      {
        title: "Daily Play and Socialization",
        body: "A safe place for your dog to play, hang out, and burn energy while you are at work.",
      },
      {
        title: "Half or Full Days",
        body: "Pick what fits your schedule. Multi-day passes bring the daily rate down.",
      },
      {
        title: "Outdoor Time",
        body: "Yard space and, in summer, the pool - so the day feels like more than indoor downtime.",
      },
      {
        title: "Food and Meds Welcome",
        body: "Send anything your dog takes during the day and we will take care of it.",
      },
    ],
    hubBlurb:
      "A safe place for your dog to play and socialize while you work. Full days, half days, and multi-day packages - all in a clean, caring setup.",
    hubPriceNote: "Full day $30, half day $15, packages from $19 a day.",
  },
  {
    slug: "boarding",
    heroChecks: [
      "From $35 a night",
      "Every 7th night free",
      "Dogs from the same home can stay together",
      "Weekend drop-off and pickup hours",
    ],
    primaryCta: "Call to check dates",
    secondaryCta: { label: "See boarding rates", href: "/pricing-policy/rates-packages#boarding" },
    scheduleOverline: "A Stay Here",
    scheduleTitle: "Drop Off, Settle In, Go Home Happy",
    schedule: [
      {
        mark: "In",
        title: "Drop-Off",
        body: "Bring portioned meals, meds with dosing notes, and anything else we should know about the stay.",
      },
      {
        mark: "Day",
        title: "Comfortable Care",
        body: "Your dog stays in a clean, comfortable space with people who know how to look after them.",
      },
      {
        mark: "Night",
        title: "Overnight Stays",
        body: "Dogs from the same home can stay together. We follow the feeding and medication notes you send.",
      },
      {
        mark: "Out",
        title: "Pickup",
        body: "Weekdays 7:30 am - 6 pm. Weekends 8-11 am and 4-6 pm. Call ahead for busy holiday weeks.",
        accent: true,
      },
    ],
    fitOverline: "Is Boarding Right for Your Dog?",
    fitTitle: "When You Need Overnight Care You Can Trust",
    fitLead:
      "Boarding is for trips, work travel, and any stretch when you need a safe overnight place for your dog.",
    fitPoints: [
      "Owners traveling for work or vacation",
      "Dogs who do best with familiar care and a steady routine",
      "Households with more than one dog who prefer to stay together",
    ],
    fitImage: {
      src: "/images/boarding-fit-shepherd.png",
      alt: "German Shepherd resting indoors during a boarding stay",
    },
    bannerImage: {
      src: "/images/boarding-banner-dogs.png",
      alt: "Small tan dog looking up from the sidewalk",
    },
    ratesOverline: "Boarding Rates",
    ratesTitle: "Per Night, at a Glance",
    ratesLinkLabel: "Full price list",
    rates: [
      { label: "1 Dog", note: "Per night", price: "$35" },
      { label: "2 Dogs", note: "Same household", price: "$60" },
      { label: "3 Dogs", note: "Same household", price: "$85" },
      { label: "Every 7th Night", note: "Ask when you book", price: "Free" },
    ],
    ctaTitle: "Got Travel Dates?",
    ctaBody: "Call with your dates and we will check what is open.",
    hubFeatures: [
      {
        title: "Every 7th Night Free",
        body: "Longer stays cost less. Ask when you book and we will confirm how it applies.",
      },
      {
        title: "Stay Together",
        body: "Dogs from the same home can board together.",
      },
      {
        title: "Their Food, Their Schedule",
        body: "Send meals and note any medication at drop-off.",
      },
      {
        title: "Weekend Hours",
        body: "Saturday and Sunday, 8-11 am and 4-6 pm for drop-off and pickup.",
      },
    ],
    hubBlurb:
      "Safe, comfortable overnight stays when you travel. From $35 a night, with every seventh night free - and food and meds handled the way you ask.",
    hubPriceNote: "From $35 a night. Call ahead for holidays.",
  },
  {
    slug: "grooming",
    heroChecks: [
      "Call for a quote",
      "Full groom, bath & tidy",
      "Nail trims available",
      "Add to a boarding stay",
    ],
    primaryCta: "Get a grooming quote",
    secondaryCta: { label: "See all rates", href: "/pricing-policy/rates-packages#grooming" },
    scheduleOverline: "How a Groom Goes",
    scheduleTitle: "Call, Quote, Book, Pick Up",
    schedule: [
      {
        mark: "1",
        title: "Call for a Quote",
        body: "Tell us about your dog and what you want done. We quote before you book.",
      },
      {
        mark: "2",
        title: "Drop Off",
        body: "Bring current shot records if we do not already have them on file.",
      },
      {
        mark: "3",
        title: "Grooming",
        body: "Full groom, bath and tidy, or nail trim - whatever you booked.",
      },
      {
        mark: "4",
        title: "Pickup",
        body: "Or add the groom to a boarding stay so they go home looking sharp.",
        accent: true,
      },
    ],
    fitOverline: "Who Grooming Is For",
    fitTitle: "Baths, Trims, and Tidy-Ups",
    fitLead:
      "Large or small, we do it all. Call for pricing based on the service and your dog.",
    fitPoints: [
      "Regular baths and tidy-ups",
      "Full grooms and trims",
      "Nail care on its own or with a groom",
    ],
    fitImage: {
      src: "/images/white-fluffy-groom.jpg",
      alt: "Small white dog after a professional groom",
    },
    ratesOverline: "Grooming",
    ratesTitle: "By Appointment - call for pricing",
    ratesLinkLabel: "Back to rates",
    rates: [
      { label: "Full Groom", note: "Bath, cut, ears, and nails", price: "-" },
      { label: "Bath and Tidy", note: "Wash, dry, and clean-up", price: "-" },
      { label: "Nail Trim", note: "On its own or added to a stay", price: "-" },
      { label: "With Boarding", note: "Book into a stay, pick up clean", price: "-" },
    ],
    ctaTitle: "Want a Grooming Quote?",
    ctaBody: "Call us with your dog’s breed, size, and the service you want.",
    hubFeatures: [
      {
        title: "Full Groom",
        body: "A full tidy-up - call for pricing based on your dog.",
      },
      {
        title: "Bath and Tidy",
        body: "Wash, dry, and a clean-up when they need it.",
      },
      {
        title: "Nail Trim",
        body: "On its own, or added to a groom or boarding stay.",
      },
      {
        title: "Groom Before Pickup",
        body: "Add it to a boarding stay so they go home fresh.",
      },
    ],
    hubBlurb:
      "Looking for someone to pamper your pet? Large or small, we do it all. Call for a quote, then book an appointment.",
    hubPriceNote: "Call for a grooming quote.",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export type Feature = { icon: FiIcon; title: string; body: string };

export const differentiators: Feature[] = [
  {
    icon: "dog",
    title: "Dogs Only",
    body: "No cats, no other animals. Everything here is set up for dogs.",
  },
  {
    icon: "home",
    title: "All in One Place",
    body: "Daycare, overnight boarding, and professional grooming under one roof.",
  },
  {
    icon: "shield-check",
    title: "Safe and Clean",
    body: "Current Bordetella, DHPP, and Rabies required. Health, safety, and happiness come first.",
  },
  {
    icon: "heart",
    title: "Personalized Care",
    body: "Experienced, caring people who treat every pet like family.",
  },
];

export const yardHighlights = [
  { icon: "home" as FiIcon, label: "Outdoor Play Yard" },
  { icon: "bath" as FiIcon, label: "Summer Pool" },
  { icon: "shield-check" as FiIcon, label: "Safe, Clean Facility" },
  { icon: "dog" as FiIcon, label: "Dogs Only" },
];

export const firstVisitSteps = [
  {
    title: "Call or Stop In",
    body: "Tell us about your dog and what you need - daycare, boarding, or grooming. We will help you get started.",
  },
  {
    title: "Bring Shot Records",
    body: "Current Bordetella, DHPP, and Rabies are required for every dog, every service.",
  },
  {
    title: "Fill Out the Form Here",
    body: "Paperwork is filled out in the shoppe at drop-off. Send food and any medication along with them.",
  },
];

export const heroChecks = ["Locally owned"] as const;

/** Rates from the client’s printed sheet (effective June 1; packages stay the same). */
export const daycareRates = {
  oneDog: [
    { label: "Full Day", price: "$30", note: undefined as string | undefined },
    { label: "Half Day", price: "$15" },
    { label: "5 Day Package", price: "$115", note: "$23 / day" },
    { label: "10 Day Package", price: "$210", note: "$21 / day" },
    { label: "30 Day Package", price: "$570", note: "$19 / day" },
  ],
  twoDogs: [
    { label: "Full Day", price: "$50" },
    { label: "Half Day", price: "$25" },
    { label: "5 Day Package", price: "$170", note: "$34 / day" },
    { label: "10 Day Package", price: "$310", note: "$31 / day" },
    { label: "30 Day Package", price: "$840", note: "$28 / day" },
  ],
};

export const boardingRates = [
  { label: "1 Dog", price: "$35", note: "Per night" },
  { label: "2 Dogs", price: "$60", note: "Per night" },
  { label: "3 Dogs", price: "$85", note: "Per night" },
];

export type Package = {
  name: string;
  price: string;
  perDay: string;
  forWhom: string;
  summary: string;
  perks: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    name: "5 Day Pass",
    price: "$115",
    perDay: "$23 / day",
    forWhom: "One dog",
    summary: "A short block for a busy stretch, or a first try at daycare.",
    perks: ["Five full daycare days", "Use anytime", "Food and meds welcome at drop-off"],
  },
  {
    name: "10 Day Pass",
    price: "$210",
    perDay: "$21 / day",
    forWhom: "One dog",
    summary: "A solid pick for dogs who come a couple days a week.",
    perks: ["Ten full daycare days", "Lower per-day rate", "Great for regular visits"],
    featured: true,
  },
  {
    name: "30 Day Pass",
    price: "$570",
    perDay: "$19 / day",
    forWhom: "One dog",
    summary: "Best per-day rate when your dog is here most weekdays.",
    perks: ["Thirty full daycare days", "Lowest per-day rate", "Ideal for full-time working owners"],
  },
];

export const twoDogPackages: Package[] = [
  {
    name: "5 Day Pass · Two Dogs",
    price: "$170",
    perDay: "$34 / day",
    forWhom: "Two dogs",
    summary: "Two dogs from the same home who come together.",
    perks: ["Five full days for two dogs", "Same drop-off, same pickup"],
  },
  {
    name: "10 Day Pass · Two Dogs",
    price: "$310",
    perDay: "$31 / day",
    forWhom: "Two dogs",
    summary: "The two-dog version of our most-used pass.",
    perks: ["Ten full days for two dogs", "Save versus daily drop-in"],
    featured: true,
  },
  {
    name: "30 Day Pass · Two Dogs",
    price: "$840",
    perDay: "$28 / day",
    forWhom: "Two dogs",
    summary: "Best rate when two dogs are in most weekdays.",
    perks: ["Thirty full days for two dogs", "Lowest two-dog per-day rate"],
  },
];

export const newClientRequirements = [
  {
    title: "Call or Stop by First",
    body: "Tell us about your dog and what you need. We will walk you through the next steps.",
  },
  {
    title: "Bring Current Vaccination Records",
    body: "Bordetella, DHPP, and Rabies must be current.",
  },
  {
    title: "Fill Out the Intake Form on Arrival",
    body: "Paperwork is done in the shoppe at drop-off. No online account to set up and nothing to print at home.",
  },
  {
    title: "Send Food and Medication",
    body: "Bring pre-portioned food and any meds. Label everything with their name.",
  },
];

export const vaccinationPolicy = [
  { vaccine: "Rabies", who: "All dogs", note: "Required, current, and documented by your veterinarian." },
  { vaccine: "DHPP / Distemper combo", who: "All dogs", note: "Required and current." },
  { vaccine: "Bordetella (kennel cough)", who: "All dogs", note: "Required on your vet’s recommended schedule." },
];

export const policyFaqs = [
  {
    question: "Do You Take Cats or Other Animals?",
    answer: "No. The Barker Shoppe is dogs only.",
  },
  {
    question: "Can My Two Dogs Stay Together?",
    answer: "Yes. Dogs from the same home can board together.",
  },
  {
    question: "What If My Dog Is Nervous Around Other Dogs?",
    answer:
      "Give us a call and tell us how your dog does around others. We will help you figure out whether daycare, boarding, or grooming is the better fit.",
  },
  {
    question: "Is Every Seventh Night Really Free?",
    answer:
      "Yes. On boarding stays, every 7th night is free. Ask us when you book and we will confirm how that applies to your dates.",
  },
  {
    question: "Do I Need to Set Up an Online Account?",
    answer:
      "No. Forms are filled out in the shoppe when you arrive. Bring current vaccination records with you.",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  aspect: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/golden-pool-hero.webp",
    alt: "Golden retriever smiling in the pink summer pool",
    caption: "Pool days out back",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/packages-preview.jpg",
    alt: "Three dogs stacked playfully on the turf yard with the summer pool behind them",
    caption: "Yard energy",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/aussie-yard.jpg",
    alt: "Australian Shepherd on the outdoor turf",
    caption: "Turf underfoot",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/sheepdog-bandana.jpg",
    alt: "Freshly groomed dog with a fall bandana",
    caption: "Fresh groom",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/white-fluffy-groom.jpg",
    alt: "Small white dog after a groom on the table",
    caption: "Salon finish",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/yorkie-bow.jpg",
    alt: "Yorkshire Terrier with a seasonal bow after grooming",
    caption: "Yorkie tidy-up",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/black-dog-jump.jpg",
    alt: "Black dog jumping toward the camera on the turf",
    caption: "Daycare play",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/holiday-two-dogs.jpg",
    alt: "Two dogs in holiday scarves for a seasonal photo",
    caption: "Holiday backdrop",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/holiday-santa-hat.jpg",
    alt: "Small dog in a Santa hat on the holiday set",
    caption: "Seasonal portraits",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/birthday-brindle.jpg",
    alt: "Brindle dog wearing a party hat",
    caption: "Birthday pup",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/birthday-cream.jpg",
    alt: "Cream dog in a polka-dot party hat licking its nose",
    caption: "Party ready",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/black-poodle-tie.jpg",
    alt: "Black poodle mix in a festive tie",
    caption: "Dressed for the season",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/holiday-cream-doodle.jpg",
    alt: "Cream doodle in a snowflake scarf on the holiday set",
    caption: "Merry and bright",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/birthday-brown-hat.jpg",
    alt: "Brown curly dog in a Happy Birthday party hat",
    caption: "Another trip around the sun",
    aspect: "aspect-[3/4]",
  },
];

export const homeGalleryTeaser = galleryImages.slice(0, 6);

export const values: Feature[] = [
  {
    icon: "heart",
    title: "Treat Every Pet Like Family",
    body: "Compassionate care with personalized attention - so every dog feels comfortable and well looked after.",
  },
  {
    icon: "shield-check",
    title: "Safe, Clean, and Caring",
    body: "Current Bordetella, DHPP, and Rabies required. We keep the focus on your pet’s health, safety, and happiness.",
  },
  {
    icon: "home",
    title: "Local and Trusted",
    body: "Locally owned on East Bennett Street, dedicated to Springfield pet owners who need a place they can count on.",
  },
];
