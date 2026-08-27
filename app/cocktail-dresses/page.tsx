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

const BREADCRUMB: Crumb[] = [{ label: "Shop", href: "/shop" }, { label: "Cocktail Dresses" }];

export const metadata: Metadata = pageMetadata({
  title: "Cocktail Dresses",
  description:
    "Shop cocktail dresses cut in satin and slip shapes, made to be seen. Pick Mini, Midi, or Maxi to fit the night.",
  path: "/cocktail-dresses",
});

export default async function CocktailDressesPage(): Promise<ReactElement> {
  const collection = await getCollection("cocktail-dresses");
  if (!collection) notFound();

  return (
    <main className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
        <JsonLd data={breadcrumbLd(BREADCRUMB, "/cocktail-dresses")} />
        <ShopListing
          breadcrumb={BREADCRUMB}
          heading="Shop Cocktail Dresses"
          description="Shop cocktail dresses cut in satin and slip shapes, made to be seen. Pick Mini for a bold short look, Midi for easy elegance, or Maxi for a long evening statement."
          items={collection.products.map(toListingItem)}
          filterValues={uniqueTypeValues(collection.products)}
        />
      </div>

      {/* Editorial images (s-005.3/4/5) — curated cocktail-dress shots. */}
      <div className="bg-[var(--surface-tint)]">
        <ShopEditorial
          media={
            // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
            <img src="/assets/cocktail/ck-onmodel.webp" alt="A SHER cocktail dress worn on a model" className="h-full w-full object-cover" />
          }
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          eyebrow="What is a Cocktail Dress?"
          heading="The Dress You Wear to Be Remembered"
          paragraph="A cocktail dress is a dressy short-to-mid dress made for evening events. It sits between everyday wear and a formal gown, right for parties, dinners, and occasions that ask you to dress up. The cut is refined and made to flatter. You wear a cocktail dress when you want to look pulled together and be remembered."
        />
        <ShopEditorial
          media={
            // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
            <img src="/assets/cocktail/ck-lengths.webp" alt="A SHER cocktail dress showing its length on a model" className="h-full w-full object-cover" />
          }
          mirror
          fullBleed
          mobileFirst="media"
          mobileAlign="left"
          eyebrow="Pick your Length"
          heading="Each Length Built for a Different Moment"
          paragraph="The Mini hits the thigh. It is short, striking, and made for a night out. The Midi falls between the knee and the ankle. It is the most versatile length, right for dinners, parties, and daytime events alike. The Maxi runs to the ankle or floor. It is long, commanding, and the dressiest of the three."
        />
        <ShopEditorial
          media={
            // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
            <img src="/assets/cocktail/ck-satin.webp" alt="Close satin detail of a SHER cocktail dress" className="h-full w-full object-cover" />
          }
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          eyebrow="Quality from Inside Out"
          heading="Sensual Without Looking Cheap"
          paragraph="We design for sensual, not for flash. The cut follows the body and stops at the right place, so the dress hints without showing too much. Weighted satin drapes clean instead of clinging. Seams are placed to shape you, not to squeeze. The result is a dress that reads elegant up close and from across the room. The quality is in the details. The satin is weighted so it drapes clean and does not cling in the wrong places. A smooth lining sits against the skin for comfort and shape. Seams are finished by hand and zips are set flat so nothing pulls. Made this way, the dress holds its shape through a long evening."
        />
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]">
        <ShopFaq
          items={[
            { q: "How do I measure for a cocktail dress?", a: "Measure your bust, waist, hip, and length. Keep the tape level and snug, not tight. A dress has to fit every point at once, so match your numbers to our size chart and choose the size that fits your largest one." },
            { q: "How should a cocktail dress fit?", a: "It should skim the body, not grip it. The fabric follows your shape with no pulling and no horizontal creases across the bust or hip. You can sit, move, and breathe with ease. If you see tight lines forming, size up." },
            { q: "What if I am between sizes?", a: "Size up. A cocktail dress is easier to take in than to let out, so the larger size gives you room. Then have a tailor take in the waist for a clean fit. This keeps the bust and hip comfortable while the middle stays sharp." },
            { q: "How do I care for my cocktail dress?", a: "Hand wash it cold or take it to a dry cleaner. Never wring satin, as twisting leaves marks that stay. Press the water out gently and lay the dress flat to dry, out of direct sun. Check the care label on your dress first, as fabrics differ." },
            { q: "How do I style a cocktail dress?", a: "Let the dress lead and add one strong accessory, like a bold earring or a clutch. Match the shoe to the hem: a heel for a Mini, a strappy sandal for a Midi, and a fine heel for a Maxi. Keep everything else quiet." },
            { q: "What do I wear a cocktail dress to?", a: "Wear it to dressy events that sit below black tie: parties, dinners, weddings as a guest, and work events with a dress code. When an invite says cocktail attire, this is the dress it means. It is dressy enough to stand out, not so formal it feels like a gown." },
          ]}
        />
      </div>
    </main>
  );
}
