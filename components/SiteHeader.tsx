"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Transparent } from "@/components/C-Transparent";
import { Sticky } from "@/components/C-Sticky";
import { Menu } from "@/components/C-Menu";
import { useCart } from "@/components/CartProvider";
import { ANNOUNCEMENT } from "@/lib/site";

/* Global chrome orchestrator (build step B-003).
   Home shows the transparent header over the hero, then hands off to the sticky
   header once the hero has scrolled out of view. Every other route is sticky
   throughout. Also owns the menu drawer's open state and routes its links
   through the Next.js router for client-side navigation.
   The cart icon is present but inert here: the cart drawer is build step B-007. */

// Fraction of the viewport height scrolled before the sticky header takes over.
const HERO_TAKEOVER = 0.6;

export function SiteHeader(): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    // Only Home swaps on scroll; other routes are sticky from the start.
    if (!isHome) {
      setPastHero(false);
      return;
    }
    const onScroll = (): void => {
      setPastHero(window.scrollY > window.innerHeight * HERO_TAKEOVER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const openMenu = (): void => setMenuOpen(true);
  const closeMenu = (): void => setMenuOpen(false);
  const navigate = (href: string): void => {
    router.push(href);
  };
  // Cart drawer + item count come from the global CartProvider (B-007).
  const { count: cartCount, openCart } = useCart();

  const transparent = isHome && !pastHero;

  return (
    <>
      {transparent ? (
        <Transparent
          announcement={ANNOUNCEMENT}
          onMenu={openMenu}
          onCart={openCart}
          cartCount={cartCount}
        />
      ) : (
        <Sticky
          announcement={ANNOUNCEMENT}
          onMenu={openMenu}
          onCart={openCart}
          cartCount={cartCount}
        />
      )}
      <Menu open={menuOpen} onClose={closeMenu} onNavigate={navigate} />
    </>
  );
}
