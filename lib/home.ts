import type { HeroSlide } from "@/components/C-HeroCarousel";
import type { CategoryItem } from "@/components/C-CategoryGrid";
import { mediaSlot, mediaSlots, slotText, valueSlots } from "@/lib/slots";

/* Home's slot data, shaped into the props its components take (S-001, B-008).

   Every other screen reads a slot and passes the string straight through, so it
   needs nothing more than the accessors in lib/slots. Home is the one screen
   that turns slots into structures: a carousel of banners, a grid of tiles, and
   a list of product handles. That shaping lives here rather than in the shared
   reader. */

// Design fallback, not content: a hero slot with no image shows the brand tone,
// so the transparent site header still reads over it.
const HERO_FALLBACK_BG = "var(--sher-dark)";

/* S-001.1 — hero banners, in slot order. Home REQUIRES a hero band: the site
   header renders as a transparent overlay over it and only hands off to the
   sticky header once the hero scrolls past (see SiteHeader). The carousel slides
   once there is more than one banner. A banner with an `href` is a link. */
export const HERO_SLIDES: HeroSlide[] = mediaSlots("s-001.1.image").flatMap((slot) => {
  const media = mediaSlot(slot);
  // A slot with no picture yet is not a banner. Without this an unfilled row
  // would still take a turn in the carousel, showing only the fallback tone.
  if (!media?.image) return [];
  return [
    {
      bg: HERO_FALLBACK_BG,
      image: media.image || undefined,
      alt: media.alt || undefined,
      href: media.href || undefined,
    },
  ];
});

/* S-001.3 — the category tiles, in the order they show on Home. Each tile is a
   button, so its label is fixed UI copy and sits here beside the slot it belongs
   to. The picture, its alt, and the link come from D-004. */
const CATEGORY_TILES: { slot: string; label: string }[] = [
  { slot: "s-001.3.image-1", label: "Shop Corset Tops" },
  { slot: "s-001.3.image-2", label: "Shop Matching Sets" },
  { slot: "s-001.3.image-3", label: "Shop Cocktail Dresses" },
  { slot: "s-001.3.image-4", label: "Shop Beachwear" },
];

/* A tile needs a picture and a link to work, so a slot missing either is left
   out and logged (F-008).

   The slot's alt is not read here on purpose. Each tile is a link that already
   shows its label, so the label is the link's name. Adding the alt as well would
   make a screen reader read the photo and then the label. The alt column stays
   in D-004 as the note for whoever picks the photo. */
export const HOME_CATEGORIES: CategoryItem[] = CATEGORY_TILES.flatMap((tile) => {
  const media = mediaSlot(tile.slot);
  if (!media?.image || !media.href) {
    console.warn(
      `[F-008] tile "${tile.slot}" has no image or no link in D-004 — left out.`,
    );
    return [];
  }
  return [
    { label: tile.label, href: media.href, id: tile.slot, image: media.image },
  ];
});

/* S-001.4 — featured products (F-012), hand-picked by Shopify handle. A slot
   with no handle is skipped, and with none set the Home page leaves the whole
   Featured block out. */
export const FEATURED_HANDLES: string[] = valueSlots("featured")
  .map((slot) => slotText(slot) ?? "")
  .filter((handle) => handle !== "");
