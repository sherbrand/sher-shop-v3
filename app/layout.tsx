import type { Metadata } from "next";
import "@/app/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
