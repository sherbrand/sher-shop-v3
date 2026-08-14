"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { Icon } from "@/components/Icon";

/* MediaGallery — the product page's media gallery: a thumbnail strip beside a
   main stage. Media order is fixed by the caller (video first, then images).
   On load the stage shows the first IMAGE while the video loads, then switches to
   the video and autoplays it muted, looped and inline. With reduced motion on it
   neither auto-switches nor autoplays.

   The strip turns vertical at the GALLERY's own 380px. Nested in C-ProductPanel's
   two-up grid it receives about half the frame, so a page-level breakpoint would
   never fire. */

export interface MediaItem {
  /** "video" or "image". Video renders in the stage with a play badge on its thumb. */
  type?: "video" | "image";
  /** Media URL. A "video" item without a `src` falls back to `node`. */
  src?: string;
  /** Poster frame for a video, shown before it can play. */
  poster?: string;
  /** Alt text (images) or accessible label (video). */
  alt?: string;
  /** Placeholder node used when there is no `src`. */
  node?: ReactNode;
  /** Optional distinct node for the thumbnail. */
  thumb?: ReactNode;
}

export interface MediaGalleryProps {
  media?: MediaItem[];
  className?: string;
}

export function MediaGallery({ media = [], className = "" }: MediaGalleryProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstImage = Math.max(
    0,
    media.findIndex((item) => item.type !== "video"),
  );
  const [active, setActive] = useState(firstImage);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent): void => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Once the video can play, take over the stage and autoplay it — unless reduced motion.
  const onVideoReady = (): void => {
    if (reduced) return;
    const videoIndex = media.findIndex((item) => item.type === "video");
    if (videoIndex > -1) setActive(videoIndex);
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      void video.play().catch(() => {});
    }
  };

  return (
    <div className={`@container ${className}`}>
      <div className="flex flex-col gap-[var(--space-3)] @min-[380px]:grid @min-[380px]:grid-cols-[72px_minmax(0,1fr)]">
        <div
          role="group"
          aria-label="Product media"
          className="order-2 flex shrink-0 flex-row gap-[var(--space-2)] overflow-x-auto @min-[380px]:order-1 @min-[380px]:flex-col @min-[380px]:overflow-x-visible"
        >
          {media.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${item.type === "video" ? "video" : `image ${i + 1}`}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={[
                "relative shrink-0 cursor-pointer overflow-hidden border p-0",
                "w-[64px] @min-[380px]:w-[72px] aspect-[var(--ratio-3-4)]",
                "bg-[var(--surface-raised)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                i === active ? "border-[var(--surface-inverse)]" : "border-[var(--border-default)]",
              ].join(" ")}
            >
              {item.thumb ||
                item.node ||
                (item.src && item.type !== "video" ? (
                  // eslint-disable-next-line @next/next/no-img-element -- gallery thumbs come from the Shopify CDN, already sized
                  <img src={item.src} alt="" className="h-full w-full object-cover" />
                ) : null)}
              {item.type === "video" && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-[var(--scrim-soft)] text-[var(--sher-white)]"
                >
                  <Icon name="chevron-right" size={18} />
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="order-1 relative overflow-hidden bg-[var(--surface-raised)] aspect-[var(--ratio-3-4)] @min-[380px]:order-2">
          {media.map((item, i) => (
            <div
              key={i}
              className={[
                "absolute inset-0 transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)]",
                i === active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
              ].join(" ")}
            >
              {item.type === "video" && item.src ? (
                <video
                  ref={videoRef}
                  src={item.src}
                  muted
                  loop
                  playsInline
                  poster={item.poster}
                  autoPlay={!reduced}
                  controls={reduced}
                  onCanPlay={onVideoReady}
                  aria-label={item.alt || "Product video"}
                  className="block h-full w-full object-cover"
                />
              ) : item.src ? (
                // eslint-disable-next-line @next/next/no-img-element -- placement passes a next/image via `node`; `src` is the plain fallback
                <img
                  src={item.src}
                  alt={item.alt || ""}
                  className="block h-full w-full object-cover"
                />
              ) : (
                item.node || null
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
