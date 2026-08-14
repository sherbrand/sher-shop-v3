import React from "react";
import { Button } from "../module/Button.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Icon } from "../module/Icon.jsx";

/* HeroCarousel — the Home hero band (F-008). A sliding "peek" carousel: one banner
   on mobile, two at 50% each on tablet/desktop. Banners are fixed portrait crops
   (2:3 on mobile/tablet, 4:5 on desktop by default). Auto-advances by one banner
   with wrap; prev/next arrows and dots page by one. Each banner takes a solid tone
   (bg) or an image, an optional text overlay (eyebrow/heading/cta) over a scrim. */


export function HeroCarousel({
  slides = [],
  interval = 6000,
  autoPlay = true,
  className = "",
  style = {},
}) {
  const [pos, setPos] = React.useState(0);
  const [anim, setAnim] = React.useState(true);
  const n = slides.length || 1;

  // the CELL WIDTH is a container query (1-up below 768, 2-up above); the track
  // shifts by --pos and the query supplies the matching percentage, so JS never
  // needs to know how many banners are on screen
  React.useEffect(() => {
    if (!autoPlay || n <= 1) return;
    const t = setInterval(() => setPos((p) => p + 1), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, n]);

  React.useEffect(() => { if (!anim) requestAnimationFrame(() => setAnim(true)); }, [anim]);

  const ext = slides.concat(slides.slice(0, 2));
  const active = ((pos % n) + n) % n;
  const go = (k) => setPos((((k % n) + n) % n));
  const onEnd = () => { if (pos >= n) { setAnim(false); setPos(pos - n); } };

  const eyebrow = { fontFamily: "var(--font-body)", fontSize: "var(--size-xs)",
    letterSpacing: "var(--tracking-label)", textTransform: "uppercase", opacity: 0.9 };
  const heading = { fontFamily: "var(--font-display)", textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)", maxWidth: "18ch" };

  return (
    <section className={"sher-band sher-herocarousel " + className} aria-roledescription="carousel"
      style={{ position: "relative", width: "100%", overflow: "hidden", background: "var(--surface-inverse)", ...style }}>
      <div className="sher-herocarousel-track" onTransitionEnd={onEnd} style={{ display: "flex",
        "--pos": pos,
        transition: anim ? "transform var(--dur-slow) var(--ease-out)" : "none" }}>
        {ext.map((s, k) => (
          <div key={k} className="sher-herocarousel-cell" style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: s.image ? `center/cover no-repeat url("${s.image}")` : (s.bg || "var(--surface-inverse)") }} />
            <div style={{ position: "absolute", inset: 0, background: "var(--overlay-hero)" }} />
            {(s.eyebrow || s.heading || s.cta) && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-end", textAlign: "center", color: "var(--sher-white)",
                padding: "var(--space-8) var(--gutter) var(--space-9)", gap: "var(--space-4)" }}>
                {s.eyebrow && <span style={eyebrow}>{s.eyebrow}</span>}
                {s.heading && <span className="t-hero" style={heading}>{s.heading}</span>}
                {s.cta && <Button as="a" href={s.cta.href} variant="primary"
                  style={{ background: "var(--sher-white)", color: "var(--sher-dark)", marginTop: "var(--space-2)" }}>{s.cta.label}</Button>}
              </div>
            )}
          </div>
        ))}
      </div>
      {n > 1 && (
        <>
          <div className="hc-nav hc-prev">
            <IconButton label="Previous slide" onClick={() => go(active - 1)} style={{ color: "var(--sher-white)" }}><Icon name="chevron-left" size={26} /></IconButton>
          </div>
          <div className="hc-nav hc-next">
            <IconButton label="Next slide" onClick={() => go(active + 1)} style={{ color: "var(--sher-white)" }}><Icon name="chevron-right" size={26} /></IconButton>
          </div>
          <div style={{ position: "absolute", bottom: "var(--space-5)", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
            {slides.map((_, k) => (
              <button key={k} aria-label={`Go to slide ${k + 1}`} onClick={() => go(k)}
                style={{ width: k === active ? 22 : 8, height: 8, border: "none", cursor: "pointer",
                  borderRadius: "var(--radius-pill)", padding: 0,
                  background: k === active ? "var(--sher-white)" : "var(--dot-idle)",
                  transition: "width var(--dur-med) var(--ease-out), background var(--dur-med) var(--ease-out)" }} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
