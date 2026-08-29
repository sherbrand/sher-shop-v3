"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Transparent } from "@/components/C-Transparent";
import { Sticky } from "@/components/C-Sticky";
import { Menu } from "@/components/C-Menu";
import { useCart } from "@/components/CartProvider";
import { SOCIAL_LINKS } from "@/lib/site";

/* Global chrome orchestrator (build step B-003).
   Home shows the transparent header over the hero, then hands off to the sticky
   header once the hero has scrolled out of view. Every other route is sticky
   throughout. Also owns the menu drawer's open state and routes its links
   through the Next.js router for client-side navigation.
   The cart icon is present but inert here: the cart drawer is build step B-007. */

export function SiteHeader({
  accountHref = "/account",
  announcement,
}: {
  accountHref?: string;
  /** Promo strip above both headers. Its copy is a D-006 slot, and the slot
   *  files are read on the server, so layout passes it in. Omit for no bar. */
  announcement?: string;
}): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  // S-006: the product page opens on a full-bleed gallery shot, so the header
  // starts off-screen. C-Sticky's own 1024px query then splits how it returns:
  // distance below the breakpoint, scroll direction above it.
  const isProduct = pathname.startsWith("/products/");

  const [menuOpen, setMenuOpen] = useState(false);
  /* null until the client has looked for a hero. The server cannot decide this:
     usePathname is not dependable during a server render, and an ISR rebuild that
     got it wrong shipped the sticky header visible on Home, which then hid itself
     on hydration and read as a flash. So the resting state is a CSS fact instead,
     keyed off whether the PAGE contains a hero, and this state only overrides it
     once the client knows. */
  const [stickyOn, setStickyOn] = useState<boolean | null>(null);

  useEffect(() => {
    // A page with no hero has nothing to hand off from, so the header is simply on.
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      setStickyOn(true);
      return;
    }
    const check = (): void => {
      // Measured against the hero's real bottom edge, not a viewport fraction, so
      // the handoff lands at the same point on every screen size.
      const rect = hero.getBoundingClientRect();
      /* A hero with no height has not been laid out yet: the stylesheet supplies its
         aspect-ratio, and before that lands the box is empty. Its bottom then reads 0,
         which looks exactly like "scrolled past" and would turn the header on over the
         hero. Decide nothing until there is a real box. */
      if (rect.height === 0) return;
      setStickyOn(rect.bottom <= 0);
    };
    check();
    /* Fires the moment the hero gets its real box, so a stylesheet that arrives after
       the markup corrects itself. Without it the first wrong answer would stand until
       the reader happened to scroll or resize. */
    const observer = new ResizeObserver(check);
    observer.observe(hero);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

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

  // The drawer's account link points at Shopify hosted customer accounts (built
  // from the store domain, passed down from layout). Its More Info group is the
  // component's own default.
  const accountLink = { label: "Login / Account", href: accountHref };
  // Cart drawer + item count come from the global CartProvider (B-007).
  const { count: cartCount, openCart } = useCart();

  return (
    <>
      {/* Both headers stay mounted, so nothing enters or leaves the layout on
          handoff and the page never jumps. Transparent is absolute (no space in
          the flow); the sticky slot below always holds its 4.5rem + 2.25rem.
          Transparent is first in the DOM on purpose: the two share --z-header,
          so the later element wins and the sticky bar paints over it. */}
      {/* Rendered on every route and hidden by CSS where the page has no hero.
          Which route this is cannot be decided on the server, but whether the
          PAGE has a hero is in the markup itself, so the answer is the same
          before and after hydration. */}
      <Transparent
        className="[body:not(:has([data-hero]))_&]:hidden"
        announcement={announcement}
        onMenu={openMenu}
        onCart={openCart}
        cartCount={cartCount}
      />
      <div
        // Hidden means off-screen: keep it out of the tab order too.
        inert={stickyOn === false}
        // Set only once the client has decided, so the CSS rule below owns the
        // resting state on the server and through the first paint.
        data-sticky-on={stickyOn === true ? "" : undefined}
        // Tailwind v4 moves the slide onto the standalone `translate` property,
        // so that is what transitions here. Naming `transform` animates nothing.
        /* The slot stays sticky at every route. C-Sticky takes itself out of the
           flow when hiddenAtRest, so the first band meets the top edge without
           this wrapper doing anything. */
        className={[
          "sticky top-0 z-[var(--z-header)]",
          "motion-safe:transition-[translate,opacity] motion-safe:duration-[var(--dur-slow)] motion-safe:ease-[var(--ease-out)]",
          // On by default: a page with no hero has nothing to hand off from.
          "translate-y-0 opacity-100",
          /* A page that carries a hero starts with the sticky header away, until
             the client sets data-sticky-on. This is what the server renders, so
             the markup no longer depends on the router knowing the route. */
          "[body:has([data-hero])_&:not([data-sticky-on])]:-translate-y-[115%]",
          "[body:has([data-hero])_&:not([data-sticky-on])]:opacity-0",
        ].join(" ")}
      >
        <Sticky
          announcement={announcement}
          onMenu={openMenu}
          onCart={openCart}
          cartCount={cartCount}
          hiddenAtRest={isProduct}
          reveal={isProduct ? "threshold" : "direction"}
        />
      </div>
      <Menu
        open={menuOpen}
        onClose={closeMenu}
        onNavigate={navigate}
        accountLink={accountLink}
        socialLinks={SOCIAL_LINKS}
      />
    </>
  );
}
