"use client"; // interactive: open/close + Escape handling

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";

// Nav data from PRD section 6.
const SHOP_LINKS = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
  { label: "Cocktail Dresses", href: "/cocktail-dresses" },
  { label: "Shop All", href: "/shop" },
] as const;

const INFO_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  // Login/Account → Shopify hosted customer account (wired in a later phase).
  { label: "Login / Account", href: "/account" },
] as const;

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

// C-Menu — slide-in navigation drawer (DESIGN: right/left drawer — sharp corners,
// subtle edge shadow, 500ms emphasized easing, white background, Manrope chrome).
export function MenuDrawer({ open, onClose }: MenuDrawerProps): React.ReactElement {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={"fixed inset-0 z-50 " + (open ? "" : "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={
          "absolute inset-0 bg-black/30 transition-opacity duration-300 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />

      {/* Panel — sharp corners, edge shadow, emphasized easing. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={
          "absolute left-0 top-0 h-full w-[86%] max-w-sm bg-background text-ink " +
          "shadow-[0_0_24px_rgba(0,0,0,0.08)] transition-transform duration-500 " +
          "[transition-timing-function:cubic-bezier(0.4,0,0.2,1)] " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/" onClick={onClose} aria-label="SHER home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon-dark.png" alt="SHER" className="h-8 w-auto" />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="p-1 transition-opacity hover:opacity-70"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="px-6 py-4">
          <p className="eyebrow mb-4 text-icon">Shop Now</p>
          <ul className="space-y-1">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="font-ui block py-2 text-base tracking-wide transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-5 border-black/5" />

          <ul className="space-y-1">
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="font-ui block py-2 text-sm tracking-wide transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
