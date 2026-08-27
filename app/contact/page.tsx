import type { Metadata } from "next";
import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContactMethods } from "@/components/C-ContactMethods";
import type { ContactItem } from "@/components/C-ContactMethods";
import { SOCIAL_LINKS } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { metaCopy, slotText } from "@/lib/slots";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "Contact" }];

const META = metaCopy("s-008");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/contact",
});

/* S-008.2 — the three ways to reach SHER. The heading of each row is copy and
   comes from D-006; the address and inbox it points at are contact details and
   stay here. A row whose heading has no row is left out (F-008). */
const CONTACT_ROWS: (Omit<ContactItem, "heading"> & { slot: string })[] = [
  { slot: "s-008.2.heading-1", kind: "social", links: SOCIAL_LINKS },
  { slot: "s-008.2.heading-2", kind: "email", value: "hello@sherbrand.co" },
  {
    slot: "s-008.2.heading-3",
    kind: "address",
    value: "456/49 Moo 10, T.Bangpla, A.Bangplee, Samutprakarn 10540",
  },
];

const CONTACT_ITEMS: ContactItem[] = CONTACT_ROWS.flatMap(({ slot, ...rest }) => {
  const heading = slotText(slot);
  return heading ? [{ heading, ...rest }] : [];
});

export default function ContactPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/contact")} />
      <HeroTitle
        breadcrumb={BREADCRUMB}
        headingLevel={1}
        measure="60ch"
        heading={slotText("s-008.1.heading")}
        description={slotText("s-008.1.subtitle")}
      />
      <ContactMethods items={CONTACT_ITEMS} />
    </main>
  );
}
