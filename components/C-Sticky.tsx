"use client";

import type { ReactElement, ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Sticky — the sticky header shown on every screen (and taking over on Home
   once the hero's bottom edge scrolls past). Solid page background with a
   hairline base. Dark mark logo centered; hamburger (opens C-Menu) left, cart
   (opens C-Cart) right.

   `hiddenAtRest` starts the header off-screen, for a page whose first band is
   full-bleed imagery that should meet the top edge. It then needs a way back:

     reveal="direction" — returns on an upward scroll, hides again going down,
       and re-hides at the very top. The desktop behavior.
     reveal="threshold" — stays away until `revealRatio` of the first
       `revealTarget` has scrolled past. The touch behavior: a swipeable
       gallery makes scroll direction an unreliable intent signal, so
       distance is used instead. It is NOT latched: scroll back to the top
       and the header hides again, so the full-bleed first band meets the
       top edge as it did on arrival.

   Both are tracked at once and both resolve in CSS: the 1024px container query
   picks direction above the breakpoint and threshold below it, so one page gets
   the right behavior per width with no device branching.

   The gutter sits OUTSIDE the container cap, matching the band and footer box
   model, so chrome and page content align at every width. */

export interface StickyProps {
  announcement?: ReactNode;
  /** Tone of the embedded announcement bar. Default "light". */
  announcementTone?: "dark" | "light" | "accent";
  onMenu?: () => void;
  onCart?: () => void;
  /** Start the header off-screen, for a page whose first band is full-bleed
   *  imagery that should meet the top edge. `reveal` decides how it comes back.
   *  Default false. */
  hiddenAtRest?: boolean;
  /** How the header returns. "direction" (default) reveals on an upward scroll
   *  and hides going down — with `hiddenAtRest` it stays hidden all the way down
   *  from the top, with no distance floor. "threshold" stays away until
   *  `revealRatio` of `revealTarget` has scrolled past. Neither latches: scrolling
   *  back to the top hides the header again. Both are tracked; the 1024px container
   *  query picks direction above the breakpoint and threshold below it. */
  reveal?: "direction" | "threshold";
  /** CSS selector for the element whose HEIGHT sets the threshold distance.
   *  Falls back to the scrollport height. */
  revealTarget?: string;
  /** Fraction of `revealTarget`'s height that must scroll past. Default 0.3. */
  revealRatio?: number;
  /** Scroll container: a selector or a ref. Defaults to the nearest scrollable
   *  ancestor, then the window. */
  scrollRoot?: string | RefObject<HTMLElement | null>;
  cartCount?: number;
  /** Cart glyph shown in the header. Default "tote". */
  cartIcon?: "bag" | "tote" | "trolley";
  logoHref?: string;
  /** Hide the announcement bar (e.g. once scrolled). Default true. */
  showAnnouncement?: boolean;
  className?: string;
}

export function Sticky({
  announcement,
  announcementTone = "light",
  onMenu,
  onCart,
  hiddenAtRest = false,
  reveal = "direction",
  revealTarget,
  revealRatio = 0.3,
  scrollRoot,
  cartCount = 0,
  cartIcon = "tote",
  logoHref = "/",
  showAnnouncement = true,
  className = "",
}: StickyProps): ReactElement {
  // Direction is behavior, tracked here; whether a hide APPLIES is a CSS
  // decision, so the breakpoint stays out of the JS.
  const [away, setAway] = useState(hiddenAtRest);
  // Threshold state is separate: `away` flips both ways, `past` only latches on.
  const [past, setPast] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let last = 0;

    // The scroll container. An explicit `scrollRoot` wins; otherwise walk up for
    // the nearest scrollable ancestor, so the header works inside a scrolling
    // shell as well as on a plain document.
    const scroller = (): HTMLElement | null => {
      if (scrollRoot) {
        return typeof scrollRoot === "string"
          ? document.querySelector<HTMLElement>(scrollRoot)
          : scrollRoot.current;
      }
      let node = rootRef.current?.parentElement ?? null;
      while (node && node !== document.body) {
        const overflowY = getComputedStyle(node).overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight
        ) {
          return node;
        }
        node = node.parentElement;
      }
      return null;
    };

    const host = scroller();
    const readY = (): number => (host ? host.scrollTop : window.scrollY);

    const onScroll = (): void => {
      const y = readY();

      if (reveal === "threshold" || hiddenAtRest) {
        // HEIGHT, not width: the target's own height sets the trigger distance.
        // Width is what container queries own, so it is never measured here.
        const target = revealTarget
          ? (host ?? document).querySelector<HTMLElement>(revealTarget)
          : null;
        const span = target
          ? target.getBoundingClientRect().height
          : host
            ? host.clientHeight
            : window.innerHeight;
        setPast(y > span * revealRatio);
      }

      // Ignore jitter. A hidden-at-rest header stays hidden all the way DOWN from
      // the top: any downward move keeps it away, with no distance floor to open a
      // gap where it would slide in and straight back out. It returns only on an
      // upward move. The ordinary header keeps its floor, which is there to ignore
      // small scrolls near the top.
      if (Math.abs(y - last) >= 6) {
        setAway(hiddenAtRest ? y <= 8 || y > last : y > last && y > 80);
        last = y;
      }
    };

    onScroll();
    if (host) host.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (host) host.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reveal, revealTarget, revealRatio, hiddenAtRest, scrollRoot]);

  return (
    <header
      ref={rootRef}
      className={[
        /* The header is fixed/sticky, so it sits outside every layout container.
           It declares its own container here, so the hide queries below always
           have something to measure. Its own width is the viewport width. */
        "@container sticky top-0 z-[var(--z-header)]",
        className,
      ].join(" ")}
    >
      {/* The visual bar is a child of the band so the container queries have
          something to move; the band itself only positions. */}
      <div
        className={[
          "border-b border-[var(--border-default)]",
          "bg-[var(--surface-page)] text-[var(--text-strong)]",
          /* Tailwind v4 puts translate-y on the standalone `translate` property, so that
             is what transitions. Naming `transform` here animates nothing. */
          "motion-safe:transition-[translate] motion-safe:duration-[var(--dur-med)] motion-safe:ease-[var(--ease-out)]",
          /* Below 1024px a hidden-at-rest header stays away until the threshold
             latches on. A swipeable gallery makes scroll direction unreliable,
             so distance decides. */
          hiddenAtRest && !past ? "@max-[1023.98px]:-translate-y-full" : "",
          /* From 1024px direction decides, for both the plain and the
             hidden-at-rest header. Resolved against the header's OWN width: a
             viewport media query here fires inside narrow frames on a wide screen. */
          away ? "@min-[1024px]:-translate-y-full" : "",
        ].join(" ")}
      >
        {showAnnouncement && (
          <AnnouncementBar tone={announcementTone}>{announcement || undefined}</AnnouncementBar>
        )}

        <div className="px-[var(--gutter)]">
          <div className="relative mx-auto flex h-[var(--header-h)] max-w-[var(--container)] items-center justify-between">
            {/* Optical hedge: a 44px button centers a ~26px glyph, leaving ~9px of dead
                space inside the box. Pull the first and last buttons back by that much
                so the GLYPH lines up with the page gutter, not the button box. */}
            <IconButton label="Open menu" onClick={onMenu} className="ml-[calc(var(--glyph-hedge)*-1)]">
              <Icon name="menu" size={26} />
            </IconButton>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%+4px)]">
              <Logo variant="mark" color="dark" size={44} href={logoHref} />
            </div>

            <IconButton
              label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
              onClick={onCart}
              className="relative mr-[calc(var(--glyph-hedge)*-1)]"
            >
              <Icon name={cartIcon} size={24} />
              {cartCount > 0 && (
                <span className="absolute right-[2px] top-[4px] h-[16px] min-w-[16px] px-[4px] text-center font-[family-name:var(--font-body)] text-[length:var(--size-nano)] leading-[16px] tabular-nums bg-[var(--surface-inverse)] text-[var(--text-on-inverse)] rounded-[var(--radius-pill)]">
                  {cartCount}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
