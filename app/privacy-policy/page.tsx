import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects information shared through our website and services.`,
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    title: "Who We Are",
    body: `${site.name} (“we,” “us,” or “our”) is a locally owned dog daycare, boarding, and grooming business located at ${site.address.full}. This policy explains how we handle information when you visit our website, call us, email us, or use our services.`,
  },
  {
    title: "Information We Collect",
    body: "We may collect your name, phone number, email address, mailing address, dog information (name, breed, age, vaccination records, and care notes), and any details you share when booking or asking a question. If you browse our website, standard technical data such as browser type, device, and pages viewed may be collected automatically by our hosting provider.",
  },
  {
    title: "How We Use Information",
    body: "We use your information to schedule and provide daycare, boarding, and grooming; communicate about appointments and your dog’s care; maintain required health and vaccination records; improve our website and services; and respond to questions or requests.",
  },
  {
    title: "Sharing",
    body: "We do not sell your personal information. We may share details with your veterinarian when needed for your dog’s care, with service providers who help us run our business (such as phone, email, or website hosting), or when required by law.",
  },
  {
    title: "Data Security",
    body: "We take reasonable steps to protect the information you share with us. No method of transmission or storage is completely secure, so we encourage you to use care when sending sensitive details online or by email.",
  },
  {
    title: "Your Choices",
    body: `You may ask us to update or correct your contact details, or request that we limit how we use information that is not required for care or legal records. Contact us at ${site.email} or ${site.phoneDisplay}.`,
  },
  {
    title: "Updates",
    body: "We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated effective date.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        overline="Privacy Policy"
        title="Privacy Policy"
        lead="How we collect, use, and protect information shared through our website and services."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Privacy Policy" />

      <Section tone="white">
        <p className="text-body-sm text-soft">Effective date: August 11, 2026</p>
        <div className="mt-10 max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-display-sm">{section.title}</h2>
              <p className="mt-3 text-body text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
