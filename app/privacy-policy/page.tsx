import type { Metadata } from "next";
import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { ContentProse } from "@/components/C-ContentProse";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "Privacy Policy" }];

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What SHER collects when you shop, how we use it, and the choices you have over your data.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-8)] px-[var(--gutter)] py-[var(--space-7)]">
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/privacy-policy")} />
      <HeroTitle
        breadcrumb={BREADCRUMB}
        headingLevel={1}
        heading="Privacy Policy"
        description="What we collect when you shop with SHER, how we use it, and the choices you have."
      />
      <ContentProse
        items={[
          {
            heading: "Information We Collect",
            paragraph:
              "We collect the details you give us when you shop. That means your name, email, shipping address, and phone number. When you pay, our checkout partner handles your card details, and we never see your full card number. We also collect basic data about how you use the site, like the pages you view and the device you are on.",
          },
          {
            heading: "How We Use Your Data",
            paragraph:
              "We use your data to run your order and support you. That covers taking payment, shipping your items, and sending order updates by email. We also use it to answer your questions and to improve the site. If you opt in, we send you news and offers, and you can stop these at any time.",
          },
          {
            heading: "Sharing with Third Parties",
            paragraph:
              "We share your data only with the partners who help us run the shop. That includes our store platform, our payment partner, and the carriers who deliver your order. Each one may use your data only to do its job for us. We do not sell your data to anyone.",
          },
          {
            heading: "Security",
            paragraph:
              "We protect your data with care. Payments run through a secure, encrypted checkout. We limit who on our team can see your details, and we keep them only as long as we need. No system is perfect, so we also ask you to keep your own account and password safe.",
          },
          {
            heading: "Cookies",
            paragraph:
              "We use cookies to make the site work and to remember your cart. Some cookies are needed for the site to run. Others help us see how the site is used, so we can make it better. You can turn off non-essential cookies in your browser or in our cookie banner.",
          },
          {
            heading: "Your Rights",
            paragraph:
              "You have rights over the data we hold, and these depend on the laws where you live. In most places you can ask to see your data, fix it, or have it deleted. You can also opt out of marketing at any time. To make a request, email us at hello@sherbrand.co.",
          },
        ]}
      />
    </main>
  );
}
