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

export function SiteHeader({ accountHref = "/account" }: { accountHref?: string }): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  // Off Home the sticky header is on from the first paint, so it never slides in.
  const [stickyOn, setStickyOn] = useState(!isHome);

  useEffect(() => {
    // Only Home hands off on scroll; other routes are sticky throughout.
    if (!isHome) {
      setStickyOn(true);
      return;
    }
    const check = (): void => {
      // Measured against the hero's real bottom edge, not a viewport fraction,
      // so the handoff lands at the same point on every screen size.
      const hero = document.querySelector("[data-hero]");
      if (!hero) {
        setStickyOn(true);
        return;
      }
      setStickyOn(hero.getBoundingClientRect().bottom <= 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isHome]);

  const openMenu = (): void => setMenuOpen(true);
  const closeMenu = (): void => setMenuOpen(false);
  const navigate = (href: string): void => {
    // Absolute URLs (e.g. Shopify hosted customer accounts) leave the app;
    // in-app paths use the router for client-side navigation.
    if (/^https?:\/\//.test(href)) {
      window.location.assign(href);
      return;
    }
    router.push(href);
  };

  // The menu's secondary links, with Login/Account pointing at Shopify hosted
  // customer accounts (built from the store domain, passed down from layout).
  const secondaryLinks = [
    { label: "Our Story", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Login / Account", href: accountHref },
  ];
  // Cart drawer + item count come from the global CartProvider (B-007).
  const { count: cartCount, openCart } = useCart();

  return (
    <>
      {/* Both headers stay mounted, so nothing enters or leaves the layout on
          handoff and the page never jumps. Transparent is absolute (no space in
          the flow); the sticky slot below always holds its 4.5rem + 2.25rem.
          Transparent is first in the DOM on purpose: the two share --z-header,
          so the later element wins and the sticky bar paints over it. */}
      {isHome && (
        <Transparent
          announcement={ANNOUNCEMENT}
          onMenu={openMenu}
          onCart={openCart}
          cartCount={cartCount}
        />
      )}
      <div
        // Hidden means off-screen: keep it out of the tab order too.
        inert={!stickyOn}
        // Tailwind v4 moves the slide onto the standalone `translate` property,
        // so that is what transitions here. Naming `transform` animates nothing.
        className={`sticky top-0 z-[var(--z-header)] motion-safe:transition-[translate,opacity] motion-safe:duration-[var(--dur-slow)] motion-safe:ease-[var(--ease-out)] ${
          stickyOn ? "translate-y-0 opacity-100" : "-translate-y-[115%] opacity-0"
        }`}
      >
        <Sticky
          announcement={ANNOUNCEMENT}
          onMenu={openMenu}
          onCart={openCart}
          cartCount={cartCount}
        />
      </div>
      <Menu
        open={menuOpen}
        onClose={closeMenu}
        onNavigate={navigate}
        secondaryLinks={secondaryLinks}
      />
    </>
  );
}
