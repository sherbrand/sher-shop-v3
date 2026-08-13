import React from "react";
import { Icon } from "../module/Icon.jsx";

/* MediaGallery — the product page's media gallery: a thumbnail strip beside a
   main stage. Media order is fixed by the caller (video first, then images).
   On load the stage shows the first IMAGE while the video loads, then switches
   to the video and autoplays it muted, looped and inline. With reduced motion
   on it neither auto-switches nor autoplays.

   The strip turns vertical at the GALLERY's own 380px via a CSS container query
   (tokens/components.css) — nested in C-ProductPanel's two-up grid it receives
   about half the frame, so a page-level breakpoint would never fire. */

export function MediaGallery({
  media = [],
  className = "",
  style = {},
}) {
  const videoRef = React.useRef(null);
  const firstImage = Math.max(0, media.findIndex((m) => m.type !== "video"));
  const [active, setActive] = React.useState(firstImage);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // once the video can play, take over the stage and autoplay it — unless reduced motion
  const onVideoReady = () => {
    if (reduced) return;
    const vi = media.findIndex((m) => m.type === "video");
    if (vi > -1) setActive(vi);
    const v = videoRef.current;
    if (v) { v.muted = true; v.play().catch(() => {}); }
  };


  const stage = (
    <div className="stage" style={{ position: "relative", aspectRatio: "var(--ratio-3-4)",
      background: "var(--surface-raised)", overflow: "hidden" }}>
      {media.map((m, i) => (
        <div key={i} style={{ position: "absolute", inset: 0,
          opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none",
          transition: "opacity var(--dur-med) var(--ease-out)" }}>
          {m.type === "video" && m.src ? (
            <video ref={videoRef} src={m.src} muted loop playsInline
              poster={m.poster} autoPlay={!reduced} controls={reduced}
              onCanPlay={onVideoReady} aria-label={m.alt || "Product video"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : m.src ? (
            <img src={m.src} alt={m.alt || ""} style={{ width: "100%", height: "100%",
              objectFit: "cover", display: "block" }} />
          ) : (m.node || null)}
        </div>
      ))}
    </div>
  );

  const thumbs = (
    <div className="thumbs" role="group" aria-label="Product media">
      {media.map((m, i) => (
        <button key={i} type="button" aria-label={`Show ${m.type === "video" ? "video" : `image ${i + 1}`}`}
          aria-pressed={i === active} onClick={() => setActive(i)}
          style={{ position: "relative",
            aspectRatio: "var(--ratio-3-4)", flexShrink: 0, padding: 0, cursor: "pointer",
            background: "var(--surface-raised)", overflow: "hidden",
            border: "1px solid " + (i === active ? "var(--surface-inverse)" : "var(--border-default)"),
            transition: "border-color var(--dur-fast) var(--ease-out)" }}>
          {m.thumb || m.node || (m.src && m.type !== "video"
            ? <img src={m.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : null)}
          {m.type === "video" && (
            <span aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center", color: "var(--sher-white)",
              background: "var(--scrim-soft)" }}>
              <Icon name="chevron-right" size={18} />
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className={"sher-band " + className} style={style}>
      <div className="sher-mediagallery">
        {thumbs}
        {stage}
      </div>
    </div>
  );
}
