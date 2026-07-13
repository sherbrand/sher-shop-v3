import Link from "next/link";
// Social/brand glyphs are inline SVGs — lucide-react dropped brand icons (trademark).

// C-Footer — global footer. Server Component (static links, no interactivity).
// DESIGN: flat, background-alt surface, Manrope chrome, primary on hover.
const COLUMNS = [
  {
    title: "Shop & Learn",
    links: [
      { label: "Corset Tops", href: "/corset-tops" },
      { label: "Matching Sets", href: "/matching-sets" },
      { label: "Cocktail Dresses", href: "/cocktail-dresses" },
      { label: "Shop All", href: "/shop" },
    ],
  },
  {
    title: "More Information",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
    ],
  },
] as const;

export function Footer(): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface text-ink">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand mark + line */}
        <div className="lg:pr-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon-dark.png" alt="SHER" className="h-10 w-auto" />
          <p className="font-display-h mt-4 text-[15px] text-ink/70">Refined Sensuality</p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="eyebrow text-icon">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-ui text-sm text-ink/80 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="eyebrow text-icon">Connect with Us</h2>
          <div className="mt-4 flex items-center gap-4 text-ink/80">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M13 22v-8h2.7l.4-3H13V9.2c0-.9.3-1.5 1.6-1.5H16V5.1C15.7 5 14.8 5 13.8 5 11.6 5 10 6.3 10 8.9V11H7.5v3H10v8h3Z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="transition-colors hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.9v2.4c-1.3 0-2.5-.4-3.5-1v5.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.5a2.9 2.9 0 1 0 2 2.8V3h2.5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-ui text-xs text-ink/60">© SHER {year}</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="font-ui text-xs text-ink/60 transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="font-ui text-xs text-ink/60 transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
