import type { Metadata } from "next";
import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContactMethods } from "@/components/C-ContactMethods";
import { SOCIAL_LINKS } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "Contact" }];

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Reach SHER by direct message for a fast reply, by email for business, or by post for returns.",
  path: "/contact",
});

export default function ContactPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/contact")} />
      <HeroTitle
        breadcrumb={BREADCRUMB}
        headingLevel={1}
        measure="60ch"
        heading="Contact Us"
        description="Reach SHER the way that suits you. Message us for a fast reply, email us for business, or use the address below for returns."
      />
      <ContactMethods
        items={[
          {
            heading: "Direct Message - For the fastest response",
            kind: "social",
            links: SOCIAL_LINKS,
          },
          {
            heading: "Email - For business inquiries",
            kind: "email",
            value: "hello@sherbrand.co",
          },
          {
            heading: "Warehouse Address - For product returns",
            kind: "address",
            value: "456/49 Moo 10, T.Bangpla, A.Bangplee, Samutprakarn 10540",
          },
        ]}
      />
    </main>
  );
}
