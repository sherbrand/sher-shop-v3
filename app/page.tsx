import type { Metadata } from "next";
import type { ReactElement } from "react";
import { pageMetadata } from "@/lib/seo";

// Home keeps the brand default title (no "%s · SHER" template) and a canonical
// at the site root (B-010, S-001 seo_role=Pillar).
export const metadata: Metadata = pageMetadata({
  title: { absolute: "Modern Womenswear by SHER" },
  description:
    "Modern womenswear by SHER: hand-built corset tops, matching sets, and cocktail dresses that shape the body and read elegant.",
  path: "/",
});

/* Placeholder home. The real Home page (S-001: hero carousel, category tiles,
   featured products) is build step B-008; this minimal page just keeps the app
   shippable until then. */
export default function HomePage(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[var(--space-4)] px-[var(--gutter)] text-center">
      <h1 className="text-[length:var(--size-hero)]">SHER</h1>
      <p className="max-w-[46ch] text-[var(--text-meta)]">
        Modern womenswear. The store is on its way.
      </p>
    </main>
  );
}
