"use client"; // interactive: open/close + Escape handling

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";

// Nav data from PRD section 6. Kept here for now; can move to D-006 config later.
const SHOP_LINKS = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
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

// C-Menu — slide-in navigation drawer. Opens from the hamburger in either header.
export function MenuDrawer({ open, onClose }: MenuDrawerProps): React.ReactElement {
  // Close on Escape and lock body scroll while open.
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
          "absolute inset-0 bg-black/40 transition-opacity duration-300 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={
          "absolute left-0 top-0 h-full w-[86%] max-w-sm bg-white text-neutral-900 shadow-xl " +
          "transition-transform duration-300 ease-out " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/" onClick={onClose} className="text-lg font-semibold tracking-[0.35em]">
            SHER
          </Link>
          <button type="button" aria-label="Close menu" onClick={onClose} className="p-1">
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="px-6 py-4">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            Shop Now
          </p>
          <ul className="space-y-1">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block py-2 text-lg tracking-wide hover:opacity-60"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-5 border-neutral-100" />

          <ul className="space-y-1">
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block py-2 text-base tracking-wide hover:opacity-60"
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
