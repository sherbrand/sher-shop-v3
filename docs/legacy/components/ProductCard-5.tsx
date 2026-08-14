import type { ReactElement, ReactNode } from "react";
import { Price } from "@/components/Price";

/* ProductCard — the unit of the product grid. Media over an optional `category`
   eyebrow + title on the left with the price right-aligned on the same row. Pass a
   `media` node for the image, or a `src`; with neither it renders a tonal
   placeholder. Sold-out dims and badges it. */

export interface ProductCardProps {
  title: string;
  /** Price in major units (e.g. 240). Omit to hide. */
  price?: number;
  currency?: string;
  /** Strikethrough original price. */
  compareAt?: number;
  href?: string;
  /** Image URL. */
  src?: string;
  /** Custom media node (e.g. a next/image) — overrides `src`. */
  media?: ReactNode;
  /** Dim + badge as sold out. */
  soldOut?: boolean;
  /** Category eyebrow above the title. Rendered when set. */
  category?: string;
  className?: string;
}

export function ProductCard({
  title,
  price,
  currency = "USD",
  compareAt,
  category,
  href = "#",
  src,
  media,
  soldOut = false,
  className = "",
}: ProductCardProps): ReactElement {
  return (
    <a href={href} className={`group block no-underline text-[var(--text-strong)] ${className}`}>
      <div className="relative mb-[var(--space-3)] aspect-[3/4] overflow-hidden bg-[var(--surface-raised)] rounded-[var(--radius-sm)]">
        {media ? (
          media
        ) : src ? (
          // eslint-disable-next-line @next/next/no-img-element -- placement passes a next/image via `media`; `src` is the plain fallback
          <img
            src={src}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-muted)]">
            {title}
          </span>
        )}
        {soldOut && (
          <span className="absolute left-[var(--space-3)] top-[var(--space-3)] bg-[var(--surface-page)] px-[var(--pad-pill-y)] py-[var(--space-1)] font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-strong)] rounded-[var(--radius-sm)]">
            Sold Out
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-[var(--space-4)]">
        <span className="min-w-0">
          {category && (
            <span className="mb-[var(--space-1)] block font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
              {category}
            </span>
          )}
          <span className="block font-[family-name:var(--font-body)] text-[length:var(--fs-item,var(--size-item-lg))] text-[var(--text-strong)] underline-offset-[0.25em] group-hover:underline">
            {title}
          </span>
        </span>
        {price != null && (
          <Price
            amount={price}
            currency={currency}
            compareAt={compareAt}
            size="md"
            className="shrink-0 text-right"
          />
        )}
      </div>
    </a>
  );
}
