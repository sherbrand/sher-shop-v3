import type { Metadata } from "next";
import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { EditorialSplit } from "@/components/C-EditorialSplit";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { bandCopy, metaCopy, slotText } from "@/lib/slots";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "About Us" }];

const META = metaCopy("s-007");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/about",
});

export default function AboutPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/about")} />
      <HeroTitle
        breadcrumb={BREADCRUMB}
        headingLevel={1}
        measure="72ch"
        heading={slotText("s-007.1.heading")}
        description={slotText("s-007.1.paragraph")}
      />

      {/* Editorial images (s-007.2/3) still missing (MVP) — media left empty. */}
      <EditorialSplit {...bandCopy("s-007.2")} />
      <EditorialSplit mirror {...bandCopy("s-007.3")} />
    </main>
  );
}
