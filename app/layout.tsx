import type { Metadata } from "next";
import { Cormorant_Infant, Cardo, Manrope } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Three typefaces from DESIGN.md, each a fixed role. Exposed as CSS variables
// that globals.css maps to --font-display / --font-body / --font-ui.
const cormorant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});
const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cardo",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Modern Womenswear by SHER",
    template: "%s · SHER",
  },
  description:
    "Modern womenswear by SHER: structured corset tops, matching sets, and cocktail dresses. Hand-built, sensual, and made to be seen.",
};

// Root layout is a Server Component (no 'use client'): it ships zero JS.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cardo.variable} ${manrope.variable}`}
    >
      <body>
        {/* Global chrome (B-003): transparent/sticky header + slide-in menu, footer. */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
