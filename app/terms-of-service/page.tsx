import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the SHER site and placing an order: orders and payment, intellectual property, liability, and governing law.",
};

export default function TermsOfServicePage(): React.ReactElement {
  return (
    <ProsePage
      title="Terms of Service"
      subtitle="The rules for using the SHER site and placing an order."
      sections={[
        {
          h2: "Overview",
          body: "These terms cover your use of the SHER site and any order you place. When you shop with us, you agree to them. Please read them before you buy. If you do not agree, please do not use the site.",
        },
        {
          h2: "Orders & Payment",
          body: "When you place an order, you make an offer to buy. We confirm it by email once we accept it. Payment is taken at checkout through our secure payment partner. Any customs or duty fees are yours to pay. We may cancel an order if an item is out of stock or a price is shown wrong.",
        },
        {
          h2: "Intellectual Property",
          body: "Everything on the SHER site belongs to SHER. That covers our name, logo, photos, and text. You may not copy, resell, or reuse them without our written say-so. You may view and share our pages for your own personal use.",
        },
        {
          h2: "Liability",
          body: "We work hard to keep the site correct and running. Even so, we cannot promise it will always be error-free or open. We are not liable for loss that comes from events we cannot control, such as a carrier delay. Nothing here removes a right the law gives you.",
        },
        {
          h2: "Governing Law",
          body: "These terms are governed by the laws of Thailand. Any dispute will be handled by the courts of Thailand.",
        },
      ]}
    />
  );
}
