import type { HeroSlide } from "@/components/C-HeroCarousel";
import type { CategoryItem } from "@/components/C-CategoryGrid";

/* D-004 Home Content — the repo file the Home page (S-001, B-008) renders from
   (PRD §4 D-004, F-008 hero/tiles, F-012 featured). Copy comes from
   docs/content/s-001_home.md.

   Images are D-004 assets that have not been delivered yet: hero banners and
   category-tile photos. Until they arrive the hero shows a tone band and the
   tiles fall back to their tone — the same empty-slot MVP the other pages use.
   The structure and copy are final; only the imagery is pending.

   Featured products are named by Shopify product HANDLE (F-012); the content
   file lists placeholder product names, not handles, so no slot resolves yet
   and the Featured block is left out until real handles are provided. */

// S-001.1 — hero banners. Home REQUIRES a hero band: the site header renders as
// a transparent overlay over it and only hands off to the sticky header after
// the hero scrolls past (see SiteHeader). No banner image has been delivered
// yet (D-004), so the single banner shows the dark brand tone as a photo
// placeholder — the transparent white header reads correctly over it. Add
// { image, alt } slides (plus optional overlay eyebrow/heading/cta) as the hero
// art arrives; the carousel starts sliding once there is more than one.
export const HERO_SLIDES: HeroSlide[] = [
  { bg: "var(--sher-dark)", image: "/assets/cocktail/hero.webp" },
  { bg: "var(--sher-dark)", image: "/assets/cocktail/hero2.webp" },
];

// S-001.2 — intro title block (eyebrow / H1 / subtitle).
export const HOME_INTRO = {
  eyebrow: "Refined Sensuality",
  heading: "Modern Womenswear by SHER",
  description:
    "Every SHER piece is made by hand, down to the boning set one at a time. Sensual, refined, and never cheap.",
};

// S-001.3 — category tiles: labels and links from the content file. Tile images
// are pending, so each tile shows its tone until then.
export const HOME_CATEGORIES: CategoryItem[] = [
  { label: "Shop Corset Tops", href: "/corset-tops", id: "cat-corsets" },
  { label: "Shop Matching Sets", href: "/matching-sets", id: "cat-sets" },
  {
    label: "Shop Cocktail Dresses",
    href: "/cocktail-dresses",
    id: "cat-dresses",
    image: "/assets/cocktail/tile-cocktail.webp",
  },
  { label: "Shop All Products", href: "/shop", id: "cat-all" },
];

// S-001.4 — featured product handles (F-012). Empty until D-004 supplies real
// Shopify handles; an unmatched handle is left out, and with none set the whole
// Featured block is omitted.
export const FEATURED_HANDLES: string[] = [];

// S-001.5 — closing call-to-action band.
export const HOME_CTA = {
  heading: "Made to Be Seen",
  description:
    "The right piece turns heads before you say a word. Find yours and own the room.",
  cta: { label: "Shop the Full Collection", href: "/shop" },
};
