import * as React from "react";

interface MediaItem {
  /** "video" or "image". Video renders in the stage with a play badge on its thumb. */
  type?: "video" | "image";
  /** Media URL. A "video" item without a `src` falls back to `node`. */
  src?: string;
  /** Poster frame for a video, shown before it can play. */
  poster?: string;
  /** Alt text (images) or accessible label (video). */
  alt?: string;
  /** Placeholder node used when there is no `src` (e.g. an <image-slot>). */
  node?: React.ReactNode;
  /** Optional distinct node for the thumbnail. */
  thumb?: React.ReactNode;
}

/**
 * MediaGallery — the product page's media gallery: a thumbnail strip beside a
 * main stage, stacking below 380px of its own width. Media order is fixed by the caller
 * (video first, then images). The stage shows the first image while the video
 * loads, then switches to the video and autoplays it muted, looped and inline;
 * with `prefers-reduced-motion` it neither auto-switches nor autoplays.
 */
export interface MediaGalleryProps {
  media?: MediaItem[];
}

export function MediaGallery(props: MediaGalleryProps): JSX.Element;
