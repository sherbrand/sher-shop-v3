import type { SocialLink } from "@/components/C-Footer";

/* Central site chrome: the bits that are not in Shopify and do not belong to a
   single page's content file. Sourced from knowledge-sher.md.

   The announcement text is NOT here. It is copy, so it lives in D-006, and the
   slot files are read on the server — app/layout passes it down to SiteHeader,
   which is a client island. */

// Handles from knowledge-sher.md: Instagram @sher.brand, Facebook /sherbrand,
// TikTok @sher.brand. Opened in a new tab by C-Footer.
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/sher.brand", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/sherbrand", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com/@sher.brand", icon: "tiktok" },
];
