import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContentProse } from "@/components/C-ContentProse";
import { SHIPPING_SECTIONS } from "@/lib/content";

// Per-page SEO metadata (title/description/canonical) is build step B-010.
// The section copy is shared with the C-Shipping drawer via lib/content.

export default function ShippingReturnsPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-8)] px-[var(--gutter)] py-[var(--space-7)]">
      <HeroTitle
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shipping & Returns" }]}
        headingLevel={1}
        heading="Shipping & Returns"
        description="How long your order takes, how customs work, and how to send something back."
      />
      <ContentProse
        items={SHIPPING_SECTIONS.map((section) => ({
          heading: section.title,
          paragraph: section.body,
        }))}
      />
    </main>
  );
}
