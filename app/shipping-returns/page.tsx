import type { Metadata } from "next";
import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContentProse } from "@/components/C-ContentProse";
import { SHIPPING_SECTIONS } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

// The section copy is shared with the C-Shipping drawer via lib/content.
const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "Shipping & Returns" }];

export const metadata: Metadata = pageMetadata({
  title: "Shipping & Returns",
  description:
    "How long your SHER order takes, how customs and duties work, and how to start a return or exchange.",
  path: "/shipping-returns",
});

export default function ShippingReturnsPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-8)] px-[var(--gutter)] py-[var(--space-7)]">
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/shipping-returns")} />
      <HeroTitle
        breadcrumb={BREADCRUMB}
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
