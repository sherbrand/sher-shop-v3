import type { Metadata } from "next";
import { CategoryShopPage } from "@/components/CategoryShopPage";

export const metadata: Metadata = {
  title: "Shop Matching Sets",
  description:
    "Shop matching sets by SHER: a hand-built corset top paired with a skirt or trousers. Choose a soft Skirt Set or a sharp Trouser Set.",
};

export default function ShopMatchingSetsPage(): React.ReactElement {
  return (
    <CategoryShopPage
      category="Matching Sets"
      title="Shop Matching Sets"
      subtitle="Shop matching sets that pair a corset top with a skirt or trousers. Choose a Skirt Set for a soft, feminine line, or a Trouser Set for a sharp, sleek one."
      filterLabel="Filter by set"
      filters={["Skirt Set", "Trouser Set"]}
      about={{
        h2: "About our Matching Sets",
        paragraph:
          "A matching set does the styling for you. We pair a hand-built corset top with a skirt or trousers cut to match, so the whole look lands as one. The Skirt Set softens the line; the Trouser Set sharpens it. Either way, you walk in ready to be seen.",
        btnLabel: "Explore Matching Sets",
        btnHref: "/matching-sets",
      }}
    />
  );
}
