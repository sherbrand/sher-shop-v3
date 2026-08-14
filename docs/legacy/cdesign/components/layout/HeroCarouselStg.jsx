import React from "react";
import { Button } from "../module/Button.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Icon } from "../module/Icon.jsx";

/* HeroCarouselStg — the Home hero band (F-008). Slides through featured banners with
   a text overlay; auto-advances, with prev/next arrows and dot indicators.
   Full-bleed, edge-to-edge. Text sits over a tonal scrim for AA contrast. */

export function HeroCarouselStg({
  slides = [],
  interval = 6000,
  height = "fill",   // "fill" | number(px) | CSS string
  autoPlay = true,
  className = "",
  style = {},
}) {
  const [i, setI] = React.useState(0);
  const n = slides.length || 1;
  const go = (k) => setI((k + n) % n);

  React.useEffect(() => {
    if (!autoPlay || n <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, n]);

  const h = height === "fill" ? "100%" : typeof height === "number" ? height + "px" : height;

  return (
    <section
      className={"sher-band " + className}
      aria-roledescription="carousel"
      style={{ position: "relative", width: "100%", height: h, overflow: "hidden",
        background: "var(--surface-inverse)", ...style }}
    >
      {slides.map((s, k) => (
        <div key={k} aria-hidden={k !== i}
          style={{
            position: "absolute", inset: 0, opacity: k === i ? 1 : 0,
            transition: "opacity var(--dur-slow) var(--ease-out)",
            pointerEvents: k === i ? "auto" : "none",
          }}>
          <div style={{
            position: "absolute", inset: 0,
            background: s.image ? `center/cover no-repeat url("${s.image}")` : "var(--surface-inverse)",
          }} />
          {/* tonal scrim for text legibility */}
          <div style={{ position: "absolute", inset: 0,
            background: "var(--overlay-hero)" }} />
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "flex-end", textAlign: "center",
            color: "var(--sher-white)", padding: "var(--space-8) var(--gutter) var(--space-9)",
            gap: "var(--space-4)",
          }}>
            {s.eyebrow && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)",
              letterSpacing: "var(--tracking-label)", textTransform: "uppercase", opacity: 0.9 }}>{s.eyebrow}</span>}
            {s.heading && <span className="t-hero" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase",
              letterSpacing: "var(--tracking-display)",  lineHeight: 1.1,
              maxWidth: "18ch" }}>{s.heading}</span>}
            {s.cta && <Button as="a" href={s.cta.href} variant="primary"
              style={{ background: "var(--sher-white)", color: "var(--sher-dark)", marginTop: "var(--space-2)" }}>
              {s.cta.label}</Button>}
          </div>
        </div>
      ))}

      {n > 1 && (
        <>
          <div style={{ position: "absolute", top: "50%", left: "var(--space-3)", transform: "translateY(-50%)" }}>
            <IconButton label="Previous slide" onClick={() => go(i - 1)} style={{ color: "var(--sher-white)" }}>
              <Icon name="chevron-left" size={26} /></IconButton>
          </div>
          <div style={{ position: "absolute", top: "50%", right: "var(--space-3)", transform: "translateY(-50%)" }}>
            <IconButton label="Next slide" onClick={() => go(i + 1)} style={{ color: "var(--sher-white)" }}>
              <Icon name="chevron-right" size={26} /></IconButton>
          </div>
          <div style={{ position: "absolute", bottom: "var(--space-5)", left: 0, right: 0,
            display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
            {slides.map((_, k) => (
              <button key={k} aria-label={`Go to slide ${k + 1}`} onClick={() => go(k)}
                style={{ width: k === i ? 22 : 8, height: 8, border: "none", cursor: "pointer",
                  borderRadius: "var(--radius-pill)", padding: 0,
                  background: k === i ? "var(--sher-white)" : "var(--dot-idle)",
                  transition: "width var(--dur-med) var(--ease-out), background var(--dur-med) var(--ease-out)" }} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
