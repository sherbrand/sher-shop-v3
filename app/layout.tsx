import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { Cormorant_Infant, Cardo } from "next/font/google";
import "@/app/globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/C-Footer";
import { CartProvider } from "@/components/CartProvider";
import { SOCIAL_LINKS } from "@/lib/site";
import { SITE_URL } from "@/lib/seo";

/* Brand faces (see DESIGN.md and tokens.css):
   Cormorant Infant = display (headings, nav, buttons), Cardo = body/editorial.
   Loaded through next/font and bound to the --font-display and --font-body
   tokens the components read. The variable classes go on <body> so the loaded
   faces win over the token fallback for all page content by proximity,
   independent of stylesheet order. */
const cormorant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});
const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

// metadataBase resolves every page's relative canonical / Open Graph URL to an
// absolute one (B-010). The title template wraps each page's own title.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Modern Womenswear by SHER",
    template: "%s · SHER",
  },
  description:
    "Modern womenswear by SHER: structured corset tops, matching sets, and cocktail dresses.",
};

// Root layout is a Server Component: it ships no JavaScript of its own.
// SiteHeader is the only client island (scroll + menu state); the footer stays
// server-rendered for SEO.
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${cardo.variable}`}>
        <CartProvider>
          <SiteHeader />
          {children}
          <Footer socialLinks={SOCIAL_LINKS} />
        </CartProvider>
      </body>
    </html>
  );
}
