import type { ReactElement } from "react";
import { HeroTitle } from "@/components/C-HeroTitle";
import { EditorialSplit } from "@/components/C-EditorialSplit";

// Per-page SEO metadata (title/description/canonical) is build step B-010.

export default function AboutPage(): ReactElement {
  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
      <HeroTitle
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        headingLevel={1}
        measure="72ch"
        heading="Our SHER Brand"
        description="The SHER brand makes womenswear that is sensual and refined. We believe sensuality should lift a woman up, never cheapen her. Every piece is built by hand, one at a time, on real corsetry. Corset tops, matching sets, and cocktail dresses that shape the body and read elegant. We started SHER because premium, well-made sensual clothing was hard to find, so we make it ourselves."
      />

      {/* Editorial images (s-007.2/3) still missing (MVP) — media left empty. */}
      <EditorialSplit
        eyebrow="Our Philosophy"
        heading="Sensuality That Elevates"
        paragraph="Sensual does not have to mean cheap. That line sits at the center of everything we make. We design clothes that show off the body with control, not with excess. The cut hints instead of shouts. The fit flatters instead of clings. A SHER piece makes a woman feel bold and sure of herself, and it reads elegant to everyone else. That is sensuality that elevates."
      />
      <EditorialSplit
        mirror
        eyebrow="Meet the Founder"
        heading="The Woman Behind It, Sherilyn"
        paragraph="Sherilyn founded SHER to make the sensual, well-built clothing she could not find for herself. She leads the design of every piece, from the cut of a corset top to the drape of a dress. Her standard is simple: it has to look elegant, feel strong, and last. That standard runs through the whole SHER brand."
      />
    </main>
  );
}
