import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContentProse } from "@/components/C-ContentProse";

// Per-page SEO metadata (title/description/canonical) is build step B-010.

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
        items={[
          {
            heading: "Where Do You Ship?",
            paragraph: "We ship worldwide. Every order goes out from SHER's warehouse in Thailand.",
          },
          {
            heading: "When Will I Receive My Order?",
            paragraph:
              "First we process your order, which takes 2 to 3 business days. Then we hand it to the carrier and email you to confirm. Standard shipping takes 7 to 14 business days. Express shipping takes 3 to 5 business days.",
          },
          {
            heading: "About Customs & Duties",
            paragraph:
              "Import duties may apply when your order arrives. The amount depends on your country's rules, and local customs set the fee. Please check your country's import rules first, so the charge is no surprise. If you reject the package and will not pay the fee, we cannot refund the order.",
          },
          {
            heading: "Returns & Exchanges",
            paragraph:
              "We accept exchanges. To start one, email us at hello@sherbrand.co with your order number in the subject line. Then mail the item to 456/49 Moo 10, T.Bangpla, A.Bangplee, Samutprakarn 10540.",
          },
        ]}
      />
    </main>
  );
}
