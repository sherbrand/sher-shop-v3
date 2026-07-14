import type { Metadata } from "next";
import { CategoryShopPage } from "@/components/CategoryShopPage";

export const metadata: Metadata = {
  title: "Shop Cocktail Dresses",
  description:
    "Shop cocktail dresses by SHER in satin and slip cuts, made to be seen. Choose Mini for bold, Midi for elegance, or Maxi for an evening statement.",
};

export default function ShopCocktailDressesPage(): React.ReactElement {
  return (
    <CategoryShopPage
      category="Cocktail Dresses"
      title="Shop Cocktail Dresses"
      subtitle="Shop cocktail dresses cut in satin and slip shapes, made to be seen. Pick Mini for a bold short look, Midi for easy elegance, or Maxi for a long evening statement."
      filterLabel="Filter by length"
      filters={["Mini", "Midi", "Maxi"]}
      about={{
        h2: "About our Cocktail Dresses",
        paragraph:
          "Our cocktail dresses are made for the moments people look. We cut them in satin and soft slip shapes that skim the body and catch the light. Choose the length that fits the night: Mini, Midi, or Maxi. Each one is built to hold a room.",
        btnLabel: "Explore Cocktail Dresses",
        btnHref: "/cocktail-dresses",
      }}
    />
  );
}
