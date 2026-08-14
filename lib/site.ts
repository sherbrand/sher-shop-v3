import type { SocialLink } from "@/components/C-Footer";

/* Central site chrome content: the bits that are not in Shopify and do not
   belong to a single page's content file. Sourced from knowledge-sher.md. */

export const ANNOUNCEMENT = "Delivers Worldwide · Free Shipping over $250";

// Handles from knowledge-sher.md: Instagram @sher.brand, Facebook /sherbrand,
// TikTok @sher.brand. Opened in a new tab by C-Footer.
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/sher.brand", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/sherbrand", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com/@sher.brand", icon: "tiktok" },
];
