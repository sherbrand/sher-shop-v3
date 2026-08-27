import type { Metadata } from "next";
import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContentProse } from "@/components/C-ContentProse";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { metaCopy, proseSections, slotText } from "@/lib/slots";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "Privacy Policy" }];

const META = metaCopy("s-010");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-8)] px-[var(--gutter)] py-[var(--space-7)]">
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/privacy-policy")} />
      <HeroTitle
        breadcrumb={BREADCRUMB}
        headingLevel={1}
        heading={slotText("s-010.1.heading")}
        description={slotText("s-010.1.subtitle")}
      />
      <ContentProse items={proseSections("s-010")} />
    </main>
  );
}
