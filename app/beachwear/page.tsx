import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/shopify/fetchers";
import { toListingItem, uniqueTypeValues } from "@/lib/listing";
import { ShopListing } from "@/components/ShopListing";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { ShopFaq } from "@/components/C-ShopFaq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Shop", href: "/shop" }, { label: "Beachwear" }];

export const metadata: Metadata = pageMetadata({
  title: "Beachwear",
  description:
    "Beachwear by SHER, lined front and back so it holds its shape wet or dry. Choose a One Piece for one clean line, or a Bikini sold as a set.",
  path: "/beachwear",
});

export default async function BeachwearPage(): Promise<ReactElement> {
  const collection = await getCollection("beachwear");
  if (!collection) notFound();

  return (
    <main className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
        <JsonLd data={breadcrumbLd(BREADCRUMB, "/beachwear")} />
        <ShopListing
          breadcrumb={BREADCRUMB}
          heading="Shop Beachwear"
          description="Shop beachwear in two cuts. Pick a One Piece for one long, clean line, or a Bikini set for two pieces to move between."
          items={collection.products.map(toListingItem)}
          filterValues={uniqueTypeValues(collection.products)}
        />
      </div>

      {/* Editorial images (s-012.3/4/5) still missing (MVP) — media left empty. */}
      <div className="bg-[var(--surface-tint)]">
        <ShopEditorial
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          eyebrow="What is Beachwear?"
          heading="Swimwear Shaped to Hold You, Not Just Cover You"
          paragraph="Beachwear is swimwear made for the water and for everywhere around it. SHER cuts it with the same shaping as the rest of the range, so it holds the body instead of hanging on it. A One Piece joins the top and bottom into one. A Bikini keeps them separate and sells them together as a set. Both read elegant, never cheap."
        />
        <ShopEditorial
          fullBleed
          mirror
          mobileFirst="media"
          mobileAlign="left"
          eyebrow="Pick your Swim Type"
          heading="Each Swim Type Built for a Different Line"
          paragraph="The One Piece joins the top and bottom into a single piece. It holds the middle and draws one long line from shoulder to hip. Pick this one for coverage and shape together. The Bikini is a separate top and bottom, sold as a set. It shows more skin and gives you two pieces to move between through the day. Pick this one for the freedom to change what you show."
        />
        <ShopEditorial
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          eyebrow="Quality from Inside Out"
          heading="Lined So Nothing Shows, Wet or Dry"
          paragraph="Thin swimwear turns sheer the moment it gets wet. Ours is lined front and back, so it stays opaque either way. The bust cups are shaped to hold their form after washing, not flatten out by the third wear. Every seam is sewn flat, so nothing digs in and nothing prints a line under the fabric. The swim fabric holds its shape wet and dries fast. You can swim in it, then walk off the beach in it."
        />
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]">
        <ShopFaq
          items={[
            { q: "How do I measure for beachwear?", a: "Measure your bust, waist, and hip. Keep the tape level and snug, not tight. Bust matters most on a One Piece and on a bikini top. Hip matters most on a bikini bottom. Match your numbers to our size chart and pick the size that fits your largest one." },
            { q: "How should beachwear fit?", a: "Snug, not tight. It should hold you with no pulling at the seams and no skin pushed over an edge. Swim fabric gives a little once wet, so it should feel firm while it is dry. If it leaves marks or you cannot move freely, size up." },
            { q: "What if I am between sizes?", a: "Pick the size that fits your largest measurement. A set is sized as one piece, so the top and bottom come in the same size. If your bust and your hip land on different sizes, take the larger one." },
            { q: "How do I care for my beachwear?", a: "Rinse it in cold water after every wear, then hand wash it. Never dry clean it. Lay it flat to dry, out of direct sun. Always check the care label on your piece first, as fabrics differ." },
            { q: "How do I style beachwear?", a: "Wear it on its own at the water. To walk off the beach, pull a shirt or a skirt over it. A bikini top or a One Piece carries into the evening under an open shirt. Keep the jewelry small and let the piece lead." },
            { q: "Can I buy a bikini top or bottom on its own?", a: "No. Every bikini is sold as a set, top and bottom together." },
          ]}
        />
      </div>
    </main>
  );
}
