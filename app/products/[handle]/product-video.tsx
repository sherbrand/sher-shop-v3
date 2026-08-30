"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";

/* Route-private client glue for the gallery video (F-010, B-011).

   The video is the first cell of C-ProductPanel's stacked rail, so its file
   competes with the shot beside it for the page's Largest Contentful Paint.
   `preload="none"` does not hold it back: a browser told to autoplay has to
   fetch the media, so the hint is ignored and the file lands first.

   So the src is held back until the browser goes idle after first paint. The
   poster paints straight away, so the cell is never empty while it waits. */

export type ProductVideoProps = {
  src: string;
  /** Still from the clip. Paints while the file is held back. */
  poster?: string;
  label: string;
};

// How long to wait when the browser has no requestIdleCallback (Safari).
const IDLE_FALLBACK_MS = 1200;

export function ProductVideo({ src, poster, label }: ProductVideoProps): ReactElement {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const win = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setLoad(true));
      return () => window.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(() => setLoad(true), IDLE_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <video
      // No src until idle. The element still lays out and paints its poster.
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-label={label}
      className="h-full w-full object-cover"
    />
  );
}
