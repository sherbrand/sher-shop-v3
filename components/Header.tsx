"use client"; // interactive: scroll swap + menu drawer toggle

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { MenuDrawer } from "@/components/MenuDrawer";

// Announcement text is hard-coded per PRD C-Transparent / C-Sticky.
// TODO: move to D-006 site config when that lands.
const ANNOUNCEMENT = "Delivers Worldwide. Free Global Shipping over $180";

// Global header. Two looks from the PRD:
//  - C-Transparent: Home only, sits over the hero, white, non-solid.
//  - C-Sticky: solid + sticky everywhere; on Home it takes over after 60vh of scroll.
// NOTE: colors/logo are placeholders until DESIGN.md defines tokens + the real logo asset.
export function Header(): React.ReactElement {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // On Home the solid header appears after 60vh; elsewhere it is always solid.
    if (!isHome) return;
    const onScroll = (): void => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Transparent only on Home, over the hero, before 60vh of scroll.
  const transparent = isHome && !scrolledPastHero;

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300 " +
          (transparent
            ? "bg-transparent text-white"
            : "bg-white text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.06)]")
        }
      >
        {/* Announcement bar */}
        <div
          className={
            "text-center text-[11px] uppercase tracking-[0.18em] py-2 " +
            (transparent ? "text-white/90" : "bg-neutral-900 text-white")
          }
        >
          {ANNOUNCEMENT}
        </div>

        {/* Header row */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="p-1"
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Logo → home. Placeholder wordmark; swap for the real logo asset later.
              PRD: oversized white square logo on transparent, dark symbol logo on sticky. */}
          <Link
            href="/"
            aria-label="SHER home"
            className={
              "font-semibold tracking-[0.35em] " +
              (transparent ? "text-3xl" : "text-xl")
            }
          >
            SHER
          </Link>

          <button
            type="button"
            aria-label="Open cart"
            // C-Cart drawer is Phase 3 / B-006 — icon is wired, drawer comes later.
            onClick={() => console.log("[cart] open — C-Cart drawer lands in Phase 3")}
            className="p-1"
          >
            <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
