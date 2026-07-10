import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Site-wide defaults. Page-level metadata (products, collections) will override
// these via generateMetadata later.
export const metadata: Metadata = {
  title: {
    default: "SHER",
    template: "%s · SHER",
  },
  description: "SHER web store.",
};

// Root layout is a Server Component (no 'use client'): it ships zero JS.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>
        {/* Global chrome (B-003): sticky/transparent header + slide-in menu, and footer. */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
