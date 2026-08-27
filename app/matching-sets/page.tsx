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

const BREADCRUMB: Crumb[] = [{ label: "Shop", href: "/shop" }, { label: "Matching Sets" }];

export const metadata: Metadata = pageMetadata({
  title: "Matching Sets",
  description:
    "Shop matching sets that pair a corset top with a skirt or trousers. Choose a Skirt Set for a soft line, or a Trouser Set for a sharp one.",
  path: "/matching-sets",
});

export default async function MatchingSetsPage(): Promise<ReactElement> {
  const collection = await getCollection("matching-sets");
  if (!collection) notFound();

  return (
    <main className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
        <JsonLd data={breadcrumbLd(BREADCRUMB, "/matching-sets")} />
        <ShopListing
          breadcrumb={BREADCRUMB}
          heading="Shop Matching Sets"
          description="Shop matching sets that pair a corset top with a skirt or trousers. Choose a Skirt Set for a soft, feminine line, or a Trouser Set for a sharp, sleek one."
          items={collection.products.map(toListingItem)}
          filterValues={uniqueTypeValues(collection.products)}
        />
      </div>

      {/* Editorial images (s-004.3/4/5) still missing (MVP) — media left empty. */}
      <div className="bg-[var(--surface-tint)]">
        <ShopEditorial
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          eyebrow="What is a Matching Set?"
          heading="One Look, Two Pieces That Belong Together"
          paragraph="A matching set is a top and a bottom made from the same fabric to be worn together. Some call it a co-ord or a two-piece set. The two pieces share the same color, cut, and finish, so they read as one outfit, not two separate items. You put on both and the look is complete, with nothing left to match."
        />
        <ShopEditorial
          mirror
          fullBleed
          mobileFirst="media"
          mobileAlign="left"
          eyebrow="Pick your Matching Set Type"
          heading="Each Set Built for a Different Look"
          paragraph="The Skirt Set pairs the top with a matching skirt. It gives a soft, feminine line that moves as you walk. Pick this one for a look that feels dressed up without effort, day or evening. The Trouser Set pairs the top with matching trousers. It gives a longer, sharper line and reads a little bolder. Pick this one when you want to look put together and ready for anything."
        />
        <ShopEditorial
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          eyebrow="Quality from Inside Out"
          heading="Cut to Sit Right Together"
          paragraph="We cut both pieces to work as a pair. The top ends where the bottom begins, so the hems meet with no gap and no overlap. The color is dyed in the same run, so the two pieces never look off. Each set is made together, checked together, and sold together. That is why a SHER set sits right the moment you put it on. The quality shows up close. Both pieces use the same soft, weighted fabric that holds its shape and drapes clean. Seams are finished so nothing frays, and the color is set to fade evenly over time. Zips and closures are chosen to last. Made this way, the set keeps looking like new wash after wash."
        />
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]">
        <ShopFaq
          items={[
            { q: "How do I measure for a matching set?", a: "Measure your bust, waist, hip, and the length of each piece. Waist matters most on a set, since both pieces meet there. Keep the tape level and snug. Then match your numbers to our size chart and choose the size that fits your waist." },
            { q: "How should a matching set fit?", a: "The top should feel firm and hold close. The bottom sits at your natural waist, though the exact spot can shift by style. When both are on, the top hem and the waistband should meet with no skin showing between them. You should still move with ease." },
            { q: "What if I am between sizes?", a: "Size up the top. It can be taken in but not let out, so the larger size gives you room to adjust. For the bottom, choose the size that fits your waist. A tailor can then take in either piece for a closer fit." },
            { q: "How do I care for my matching set?", a: "Wash by fabric: hand wash, machine wash cold, or dry clean. Always wash both pieces together so they fade at the same rate and stay matched. Lay them flat to dry, out of direct sun. Check the care label on your set first, as fabrics differ." },
            { q: "How do I style a matching set?", a: "Wear both pieces together as one look. The set does the work, so keep the rest simple. One clean shoe and small jewelry is enough. Adding busy accessories only breaks the line the two pieces make." },
            { q: "Can I buy the top and bottom on their own?", a: "No. Each set is sold only as a pair. The two pieces are cut, dyed, and finished to match, so splitting them would break the look they are made for. You buy the set and wear it as one." },
          ]}
        />
      </div>
    </main>
  );
}
