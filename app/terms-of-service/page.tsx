import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContentProse } from "@/components/C-ContentProse";

// Per-page SEO metadata (title/description/canonical) is build step B-010.

export default function TermsOfServicePage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-8)] px-[var(--gutter)] py-[var(--space-7)]">
      <HeroTitle
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
        headingLevel={1}
        heading="Terms of Service"
        description="The rules for using the SHER site and placing an order."
      />
      <ContentProse
        items={[
          {
            heading: "Overview",
            paragraph:
              "These terms cover your use of the SHER site and any order you place. When you shop with us, you agree to them. Please read them before you buy. If you do not agree, please do not use the site.",
          },
          {
            heading: "Orders & Payment",
            paragraph:
              "When you place an order, you make an offer to buy. We confirm it by email once we accept it. Payment is taken at checkout through our secure payment partner. Any customs or duty fees are yours to pay. We may cancel an order if an item is out of stock or a price is shown wrong.",
          },
          {
            heading: "Intellectual Property",
            paragraph:
              "Everything on the SHER site belongs to SHER. That covers our name, logo, photos, and text. You may not copy, resell, or reuse them without our written say-so. You may view and share our pages for your own personal use.",
          },
          {
            heading: "Liability",
            paragraph:
              "We work hard to keep the site correct and running. Even so, we cannot promise it will always be error-free or open. We are not liable for loss that comes from events we cannot control, such as a carrier delay. Nothing here removes a right the law gives you.",
          },
          {
            heading: "Governing Law",
            paragraph:
              "These terms are governed by the laws of Thailand. Any dispute will be handled by the courts of Thailand.",
          },
        ]}
      />
    </main>
  );
}
