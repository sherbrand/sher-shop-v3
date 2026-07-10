import Link from "next/link";
// Social/brand glyphs are inline SVGs — lucide-react dropped brand icons (trademark).

// C-Footer — global footer. Server Component (static links, no interactivity).
// Link map from PRD section 6. TODO: social URLs + email come from D-006 site config.
const COLUMNS = [
  {
    title: "Shop & Learn",
    links: [
      { label: "Corset Tops", href: "/corset-tops" },
      { label: "Matching Sets", href: "/matching-sets" },
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
  // Year fills automatically (PRD: "© SHER {year}").
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-700 hover:text-neutral-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Connect with Us
          </h2>
          <div className="mt-4 flex items-center gap-4">
            {/* TODO: real profile URLs via D-006 config. */}
            <a href="#" aria-label="Instagram" className="text-neutral-700 hover:text-neutral-900">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-neutral-700 hover:text-neutral-900">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M13 22v-8h2.7l.4-3H13V9.2c0-.9.3-1.5 1.6-1.5H16V5.1C15.7 5 14.8 5 13.8 5 11.6 5 10 6.3 10 8.9V11H7.5v3H10v8h3Z" />
              </svg>
            </a>
            {/* lucide has no TikTok glyph yet — minimal inline mark as a placeholder. */}
            <a href="#" aria-label="TikTok" className="text-neutral-700 hover:text-neutral-900">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.9v2.4c-1.3 0-2.5-.4-3.5-1v5.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.5a2.9 2.9 0 1 0 2 2.8V3h2.5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© SHER {year}</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-neutral-800">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-neutral-800">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
