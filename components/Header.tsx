"use client"; // interactive: scroll swap + menu drawer toggle

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { MenuDrawer } from "@/components/MenuDrawer";

// Announcement bar copy (DESIGN: announcement-bar, label-sm on background-alt).
const ANNOUNCEMENT = "Delivers Worldwide · Free Global Shipping over $180";

// Global header. Two looks from the PRD + DESIGN.md:
//  - Transparent: Home only, over the hero — white logo lockup, white chrome.
//  - Solid/sticky: everywhere else; on Home it takes over after 60vh of scroll —
//    white background, the dark circular emblem.
export function Header(): React.ReactElement {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = (): void => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Transparent only on Home, over the hero, before 60vh of scroll.
  const transparent = isHome && !scrolledPastHero;

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500 " +
          (transparent
            ? "text-white"
            : "bg-background text-ink shadow-[0_1px_0_rgba(0,0,0,0.05)]")
        }
      >
        {/* Announcement bar — background-alt fill + label-sm when solid. */}
        <div
          className={
            "eyebrow text-center py-2.5 " +
            (transparent ? "text-white/80" : "bg-surface text-ink")
          }
        >
          {ANNOUNCEMENT}
        </div>

        {/* Header row — display container width. */}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 py-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="-ml-1 p-1 transition-opacity hover:opacity-70"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {/* Logo → home. White emblem+wordmark on transparent, dark emblem on solid. */}
          <Link href="/" aria-label="SHER home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={transparent ? "/logo-square-white.png" : "/logo-icon-dark.png"}
              alt="SHER"
              className={transparent ? "h-14 w-auto" : "h-9 w-auto"}
            />
          </Link>

          <button
            type="button"
            aria-label="Open cart"
            // C-Cart drawer lands in a later phase — icon wired now.
            onClick={() => console.log("[cart] open — C-Cart drawer lands later")}
            className="-mr-1 p-1 transition-opacity hover:opacity-70"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
