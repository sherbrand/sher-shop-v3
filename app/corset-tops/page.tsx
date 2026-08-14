import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/shopify/fetchers";
import { toListingItem, uniqueTypeValues } from "@/lib/listing";
import { ShopListing } from "@/components/ShopListing";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { ShopFaq } from "@/components/C-ShopFaq";

// Per-page SEO metadata (title/description/canonical) is build step B-010.

export default async function CorsetTopsPage(): Promise<ReactElement> {
  const collection = await getCollection("corset-tops");
  if (!collection) notFound();

  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
      <ShopListing
        breadcrumb={[{ label: "Shop", href: "/shop" }, { label: "Corset Tops" }]}
        heading="Shop Corset Tops"
        description="Shop corset tops built on real corsetry, in two closures. Pick Lace Closure for an adjustable fit, or Zip Closure for the easiest way in and out."
        items={collection.products.map(toListingItem)}
        filterValues={uniqueTypeValues(collection.products)}
      />

      {/* Editorial images (s-003.3/4/5) are still missing (MVP) — media left empty. */}
      <ShopEditorial
        mobileFirst="text"
        mobileAlign="right"
        eyebrow="What is a Corset Top?"
        heading="Structured Boning That Commands the Silhouette"
        paragraph="A corset top is a fitted top built on corsetry. Thin bones run through the fabric to shape the waist and support the bust. Unlike a plain top, it holds its structure and stays put as you move. The look is firm but not stiff. SHER makes each corset top to be worn on its own, as the piece people notice first."
      />
      <ShopEditorial
        mirror
        mobileFirst="text"
        mobileAlign="left"
        eyebrow="Pick your Corset Closure Type"
        heading="Each Corset Closure Designed for a Different Priority"
        paragraph="The Lace Closure laces up the back through metal eyelets. Pull the cord tighter or looser to set the fit yourself. Pick this one if you want control over how firm it feels. The Zip Closure uses a separating zip. Step in, zip up, and you are done. The fit is fixed, so there is nothing to adjust. Pick this one if you want the fastest way in and out with the same clean shape."
      />
      <ShopEditorial
        mobileFirst="text"
        mobileAlign="right"
        eyebrow="Quality from Inside Out"
        heading="Each Bone Set by Hand, Not by Machine"
        paragraph="Most brands lay the boning flat with a machine. We do it by hand. Each bone is set one at a time on a mannequin, so it follows the curve of a real body. This takes longer, but the fit is better. The top shapes you where it should and stays smooth where it should. That hand-set boning is why a SHER corset top reads elegant, never cheap. The care shows on the inside. A satin lining sits against the skin, so the top feels smooth and holds its shape. Structured bust cups keep the front clean. On lace styles, the lace is cut and placed by hand so the pattern runs true. Strong thread and finished seams mean it lasts. You can tell the quality from across the room."
      />

      <ShopFaq
        items={[
          { q: "How do I measure for a corset top?", a: "Measure your bust, waist, hip, and length. Bust matters most on a corset top, so get that one right. Keep the tape level and snug, not tight. Then match your numbers to our size chart and pick the size that fits your largest one." },
          { q: "How should a corset top fit?", a: "It should feel firm but never painful. The top edge sits flat against your chest with no gap, and the waist holds close with no space to pinch. You should still breathe and move with ease. If it hurts or leaves marks, size up." },
          { q: "What if I am between sizes?", a: "Size up. A corset top can be taken in but not let out, so the larger size gives you room to adjust. With a Lace Closure, you can cinch it further for a closer fit. With a Zip Closure, a tailor can take in the seams." },
          { q: "How do I care for my corset top?", a: "Hand wash it cold or take it to a dry cleaner. Skip the machine, since the spin can bend the boning. Lay it flat to dry, out of direct sun. Always check the care label on your piece first, as fabrics differ." },
          { q: "How do I style a corset top?", a: "Let the corset top lead. Keep the rest simple, with plain trousers, a straight skirt, or tailored denim. One clean shoe and small jewelry is enough. The top is the piece people notice, so give it room and let everything else stay quiet." },
          { q: "Should I choose a Lace or Zip Closure?", a: "Pick by preference, since the fit is the same either way. Choose Lace Closure if you want to adjust how firm it feels, or if a size change is likely. Choose Zip Closure if you want the easiest way in and out. Both give you the same shape." },
        ]}
      />
    </main>
  );
}
