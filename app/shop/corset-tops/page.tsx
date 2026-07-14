import type { Metadata } from "next";
import { CategoryShopPage } from "@/components/CategoryShopPage";

export const metadata: Metadata = {
  title: "Shop Corset Tops",
  description:
    "Shop corset tops by SHER, built on real corsetry with hand-set boning. Choose Lace Closure for an adjustable fit or Zip Closure for easy wear.",
};

export default function ShopCorsetTopsPage(): React.ReactElement {
  return (
    <CategoryShopPage
      category="Corset Tops"
      title="Shop Corset Tops"
      subtitle="Shop corset tops built on real corsetry, in two closures. Pick Lace Closure for an adjustable fit, or Zip Closure for the easiest way in and out."
      filterLabel="Filter by closure"
      filters={["Lace Closure", "Zip Closure"]}
      about={{
        h2: "About our Corset Tops",
        paragraph:
          "We build every corset top by hand. Each bone is set one at a time on a mannequin, not laid flat by a machine, so the shape holds to the body. Inside, a satin lining and structured bust cups keep the fit clean and comfortable. The result is a top that reads elegant, never cheap.",
        btnLabel: "See How Corset Tops Are Made",
        btnHref: "/corset-tops",
      }}
    />
  );
}
