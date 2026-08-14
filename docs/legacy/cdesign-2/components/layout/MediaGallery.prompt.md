One-line: C-MediaGallery — the product page's media gallery: thumbnail strip beside a main stage, video-first with reduced-motion handling.

```jsx
<MediaGallery media={[
  { type: "video", src: "/p-1.mp4", alt: "Corset top on a model" },
  { type: "image", src: "/p-1a.jpg", alt: "Front view" },
  { type: "image", node: <image-slot id="p-1b" /> },
]} />
```

- Each item: `{ type, src?, poster?, alt?, node?, thumb? }` — pass `node` for a placeholder when there's no `src`. A `video` item **without** a `src` falls back to `node` too, so the stage is never blank.
- Order is the caller's: put the video first per the PRD. Its thumb carries a play badge.
- The stage opens on the first **image** while the video loads, then switches to the video and autoplays it muted/looped/inline. Under `prefers-reduced-motion` it stays on the image and the video shows controls instead.
- Thumbs sit beside the stage at/above 380px of the gallery's **own** width and above it when narrower; stage crop is 3:4. Nested in C-ProductPanel it gets about half the frame, so a page-level breakpoint would keep it horizontal at almost every size.
