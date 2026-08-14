import React from "react";

/* ViewToggle — F-003 Grid View Toggle. A compact segmented control that switches
   the product grid's density (fewer vs more columns). Each option renders a glyph
   of N vertical bars indicating its column count. Controlled or uncontrolled. */

const DEFAULT_OPTIONS = [
  { key: "comfortable", barsMobile: 1, barsDesktop: 2, label: "Larger cards" },
  { key: "compact", barsMobile: 2, barsDesktop: 3, label: "Smaller cards" },
];

// bars beyond the mobile count are hidden below the desktop breakpoint via a
// container query, so the glyph mirrors the grid's column count at every size.
const VT_STYLE_ID = "sher-viewtoggle-bars";
function ensureStyle() {
  if (typeof document === "undefined" || document.getElementById(VT_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = VT_STYLE_ID;
  s.textContent = ".vt-bar-extra{display:none}@container sherframe (min-width:1024px){.vt-bar-extra{display:block}}";
  document.head.appendChild(s);
}

function Bars({ mobile, desktop, active }) {
  React.useEffect(ensureStyle, []);
  return (
    <span style={{ display: "inline-flex", gap: 2, alignItems: "stretch", height: 14 }}>
      {Array.from({ length: desktop }).map((_, k) => (
        <span key={k} className={k >= mobile ? "vt-bar-extra" : undefined}
          style={{ width: 3, borderRadius: 1,
            background: active ? "var(--text-on-inverse)" : "var(--text-strong)" }} />
      ))}
    </span>
  );
}

export function ViewToggle({
  value,
  defaultValue,
  options = DEFAULT_OPTIONS,
  onChange,
  className = "",
  style = {},
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? options[0].key);
  const val = value != null ? value : internal;
  const set = (k) => { if (value == null) setInternal(k); onChange && onChange(k); };
  return (
    <div role="group" aria-label="Grid view" className={className}
      style={{ display: "inline-flex", border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-sm)", overflow: "hidden", ...style }}>
      {options.map((o) => {
        const active = o.key === val;
        return (
          <button key={o.key} type="button" aria-label={o.label} title={o.label} aria-pressed={active}
            onClick={() => set(o.key)}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 34, border: "none", cursor: "pointer", padding: 0,
              background: active ? "var(--surface-inverse)" : "transparent",
              transition: "background var(--dur-fast) var(--ease-out)" }}>
            <Bars mobile={o.barsMobile} desktop={o.barsDesktop} active={active} />
          </button>
        );
      })}
    </div>
  );
}
