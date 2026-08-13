/* @ds-bundle: {"format":4,"namespace":"SHERDesignSystem_84f0d7","components":[{"name":"Cart","sourcePath":"components/layout/Cart.jsx"},{"name":"CategoryGrid","sourcePath":"components/layout/CategoryGrid.jsx"},{"name":"ContactMethods","sourcePath":"components/layout/ContactMethods.jsx"},{"name":"ContentProse","sourcePath":"components/layout/ContentProse.jsx"},{"name":"EditorialSplit","sourcePath":"components/layout/EditorialSplit.jsx"},{"name":"FeatureColumns","sourcePath":"components/layout/FeatureColumns.jsx"},{"name":"Footer","sourcePath":"components/layout/Footer.jsx"},{"name":"HeroCarousel","sourcePath":"components/layout/HeroCarousel.jsx"},{"name":"HeroCarouselStg","sourcePath":"components/layout/HeroCarouselStg.jsx"},{"name":"HeroTitle","sourcePath":"components/layout/HeroTitle.jsx"},{"name":"MediaGallery","sourcePath":"components/layout/MediaGallery.jsx"},{"name":"Menu","sourcePath":"components/layout/Menu.jsx"},{"name":"ProductGrid","sourcePath":"components/layout/ProductGrid.jsx"},{"name":"ProductPanel","sourcePath":"components/layout/ProductPanel.jsx"},{"name":"RelatedProducts","sourcePath":"components/layout/RelatedProducts.jsx"},{"name":"Shipping","sourcePath":"components/layout/Shipping.jsx"},{"name":"ShopEditorial","sourcePath":"components/layout/ShopEditorial.jsx"},{"name":"ShopFaq","sourcePath":"components/layout/ShopFaq.jsx"},{"name":"ShopTitle","sourcePath":"components/layout/ShopTitle.jsx"},{"name":"Sizing","sourcePath":"components/layout/Sizing.jsx"},{"name":"Sticky","sourcePath":"components/layout/Sticky.jsx"},{"name":"Transparent","sourcePath":"components/layout/Transparent.jsx"},{"name":"Accordion","sourcePath":"components/module/Accordion.jsx"},{"name":"AnnouncementBar","sourcePath":"components/module/AnnouncementBar.jsx"},{"name":"Breadcrumb","sourcePath":"components/module/Breadcrumb.jsx"},{"name":"Button","sourcePath":"components/module/Button.jsx"},{"name":"ButtonPill","sourcePath":"components/module/ButtonPill.jsx"},{"name":"Heading","sourcePath":"components/module/Heading.jsx"},{"name":"Icon","sourcePath":"components/module/Icon.jsx"},{"name":"IconButton","sourcePath":"components/module/IconButton.jsx"},{"name":"Logo","sourcePath":"components/module/Logo.jsx"},{"name":"Price","sourcePath":"components/module/Price.jsx"},{"name":"ProductCard","sourcePath":"components/module/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/module/QuantityStepper.jsx"},{"name":"SizeSelector","sourcePath":"components/module/SizeSelector.jsx"},{"name":"ViewToggle","sourcePath":"components/module/ViewToggle.jsx"}],"sourceHashes":{"components/layout/Cart.jsx":"7b8ec71a3ce0","components/layout/CategoryGrid.jsx":"a263915b77af","components/layout/ContactMethods.jsx":"376714cdf120","components/layout/ContentProse.jsx":"754ba96ba621","components/layout/EditorialSplit.jsx":"6272e2261a61","components/layout/FeatureColumns.jsx":"8627574562ce","components/layout/Footer.jsx":"610f3f18a1f0","components/layout/HeroCarousel.jsx":"11e075050473","components/layout/HeroCarouselStg.jsx":"21a295d54b69","components/layout/HeroTitle.jsx":"41ddced46f02","components/layout/MediaGallery.jsx":"0663538fd54c","components/layout/Menu.jsx":"24947acd7edf","components/layout/ProductGrid.jsx":"d457c1bfc357","components/layout/ProductPanel.jsx":"916c36eb5c0e","components/layout/RelatedProducts.jsx":"286e01c9950a","components/layout/Shipping.jsx":"50d34722ef9f","components/layout/ShopEditorial.jsx":"f8fdde015b38","components/layout/ShopFaq.jsx":"5d4e1a707755","components/layout/ShopTitle.jsx":"d4e9dce17772","components/layout/Sizing.jsx":"5999cf5f2e97","components/layout/Sticky.jsx":"72b276abb5f1","components/layout/Transparent.jsx":"1ba06864bf68","components/module/Accordion.jsx":"4d82b6d8dc20","components/module/AnnouncementBar.jsx":"694054cf134f","components/module/Breadcrumb.jsx":"5ad820604818","components/module/Button.jsx":"9e5ffae280c7","components/module/ButtonPill.jsx":"85c154c742de","components/module/Heading.jsx":"725d7d9cd882","components/module/Icon.jsx":"aabbb293a3c4","components/module/IconButton.jsx":"ab0421501489","components/module/Logo.jsx":"7e8779a6de07","components/module/Price.jsx":"b729f2fecb37","components/module/ProductCard.jsx":"5cb763ca6915","components/module/QuantityStepper.jsx":"6e39e5d15ce5","components/module/SizeSelector.jsx":"48349c03e60a","components/module/ViewToggle.jsx":"bae0dd42e1ff","image-slot.js":"0394ad34f685"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SHERDesignSystem_84f0d7 = window.SHERDesignSystem_84f0d7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/module/AnnouncementBar.jsx
try { (() => {
/* SHER announcement bar — the thin promo strip above both headers.
   Default copy from the PRD: worldwide delivery / free shipping over $250. */

function AnnouncementBar({
  children = "Delivers Worldwide · Free Shipping over $250",
  tone = "dark",
  // "dark" | "light" | "accent"
  className = "",
  style = {}
}) {
  const bg = {
    dark: "var(--surface-inverse)",
    light: "var(--surface-raised)",
    accent: "var(--accent)"
  }[tone];
  const fg = {
    dark: "var(--text-on-inverse)",
    light: "var(--text-default)",
    accent: "var(--sher-white)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    role: "region",
    "aria-label": "Announcement",
    style: {
      height: "var(--announce-h)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      background: bg,
      color: fg,
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-announce, var(--size-announce-lg))",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      padding: "0 var(--gutter)",
      textAlign: "center",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/module/Breadcrumb.jsx
try { (() => {
/* Breadcrumb — the page trail (e.g. Home › Shop). Links every crumb except the
   current (last) one. On narrow widths the current label can ellipsis-trim. */

function Breadcrumb({
  items = [],
  separator = "\u203A",
  // ›
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    className: className,
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last || !it.href ? /*#__PURE__*/React.createElement("span", {
      "aria-current": last ? "page" : undefined,
      style: {
        color: last ? "var(--text-strong)" : "var(--text-meta)",
        maxWidth: "22ch",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href,
      style: {
        color: "var(--text-meta)",
        textDecoration: "none"
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: "var(--text-muted)",
        opacity: 0.7
      }
    }, separator));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/module/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SHER button — Cormorant Infant, UPPERCASE, tracked.
   primary   : dark fill, light text (strong CTA — Add to Cart, Checkout)
   secondary : hairline outline, dark text (fills on hover)
   ghost     : text only, underline on hover
   accent    : primary fill, dark text (AA) — softer emphasis */

const SIZES = {
  sm: {
    fontSize: "var(--size-xs)",
    padding: "var(--space-2) var(--space-4)",
    letterSpacing: "var(--tracking-label)"
  },
  md: {
    fontSize: "var(--size-sm)",
    padding: "var(--space-3) var(--pad-btn-md)",
    letterSpacing: "var(--tracking-label)"
  },
  lg: {
    fontSize: "var(--size-base)",
    padding: "var(--space-4) var(--pad-btn-lg)",
    letterSpacing: "var(--tracking-label)"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  as = "button",
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-button)",
    textTransform: "uppercase",
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent",
    width: fullWidth ? "100%" : "auto",
    transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
    ...SIZES[size]
  };
  const variants = {
    primary: {
      background: hover && !disabled ? "var(--sher-text)" : "var(--surface-inverse)",
      color: "var(--text-on-inverse)",
      borderColor: "transparent"
    },
    accent: {
      background: hover && !disabled ? "var(--accent-hover)" : "var(--accent)",
      color: "var(--sher-white)",
      borderColor: "transparent"
    },
    surface: {
      background: hover && !disabled ? "var(--surface-tint)" : "var(--surface-raised)",
      color: "var(--text-strong)",
      borderColor: "var(--border-strong)"
    },
    tonal: {
      background: hover && !disabled ? "var(--accent-hover)" : "var(--sher-primary)",
      color: hover && !disabled ? "var(--sher-white)" : "var(--text-on-primary)",
      borderColor: "transparent"
    },
    secondary: {
      background: hover && !disabled ? "var(--surface-inverse)" : "transparent",
      color: hover && !disabled ? "var(--text-on-inverse)" : "var(--text-strong)",
      borderColor: "var(--text-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-strong)",
      textDecoration: hover && !disabled ? "underline" : "none",
      textUnderlineOffset: "0.3em",
      padding: SIZES[size].padding,
      borderColor: "transparent"
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: className,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    disabled: as === "button" ? disabled : undefined,
    "aria-disabled": disabled || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/Button.jsx", error: String((e && e.message) || e) }); }

// components/module/ButtonPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SHER pill button — the rounded filter / category control used by the attribute
   filter (F-002) and the Shop category links. Active pills invert to dark. */

function ButtonPill({
  children,
  active = false,
  as = "button",
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const bg = active ? "var(--surface-inverse)" : hover ? "var(--surface-raised)" : "transparent";
  const color = active ? "var(--text-on-inverse)" : "var(--text-strong)";
  const borderColor = active ? "var(--surface-inverse)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: className,
    "aria-pressed": as === "button" ? active : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-button)",
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      lineHeight: 1,
      padding: "var(--pad-pill-y) var(--pad-pill-x)",
      borderRadius: "var(--radius-pill)",
      border: "1px solid " + borderColor,
      background: bg,
      color,
      cursor: "pointer",
      textDecoration: "none",
      whiteSpace: "nowrap",
      transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { ButtonPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/ButtonPill.jsx", error: String((e && e.message) || e) }); }

// components/module/Heading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Heading — the shared level-to-tag primitive. `level` (1–4) sets the HTML tag
   (h1–h4) for document/SEO outline WITHOUT changing the visual style; styling
   comes from the passed style/className. Used by every layout band and overlay
   so heading levels can be tuned per page without restyling. */

function Heading({
  level = 2,
  as,
  children,
  className = "",
  style = {},
  ...rest
}) {
  const L = Math.min(4, Math.max(1, level));
  const Tag = as || "h" + L;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: className,
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Heading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/Heading.jsx", error: String((e && e.message) || e) }); }

// components/layout/CategoryGrid.jsx
try { (() => {
/* CategoryGrid — a full-bleed grid of category tiles. One column on mobile, two
   at/above 640px (CSS container query). Each tile is a portrait crop (3:4) with a media layer
   (image or a passed node, e.g. an image slot) under a bottom gradient label.
   Labels alternate bottom-left / bottom-right per tile. Hairline gaps between. */

function CategoryGrid({
  items = [],
  headingLevel = 2,
  alternate = true,
  // alternate label align left / right per tile
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sher-band " + className,
    style: {
      background: "var(--border-default)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-categorygrid"
  }, items.map((it, i) => {
    const right = alternate && i % 2 === 1;
    return /*#__PURE__*/React.createElement("a", {
      key: it.id || i,
      href: it.href,
      style: {
        position: "relative",
        aspectRatio: "var(--ratio-4-5)",
        textDecoration: "none",
        overflow: "hidden",
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: it.image ? `center/cover no-repeat url("${it.image}")` : it.bg || "var(--surface-raised)"
      }
    }, it.media), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: right ? "flex-end" : "flex-start",
        padding: "var(--space-6)",
        background: "linear-gradient(180deg,transparent 55%,var(--scrim) 100%)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
      level: headingLevel,
      className: "t-title",
      style: {
        margin: 0,
        color: "var(--sher-white)",
        fontFamily: "var(--font-display)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-display)",
        fontWeight: 400,
        lineHeight: "var(--leading-snug)",
        textAlign: right ? "right" : "left"
      }
    }, it.label)));
  })));
}
Object.assign(__ds_scope, { CategoryGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/CategoryGrid.jsx", error: String((e && e.message) || e) }); }

// components/layout/ContentProse.jsx
try { (() => {
/* ContentProse — the policy page band (shipping & returns, privacy, terms):
   a full-width section that centres a run of heading + paragraph blocks at a
   readable measure. Owns its own band padding, content width, heading/body sizes
   and block rhythm, all stepped by CSS container queries on its OWN width — a
   page only places it.
   `paragraph` takes a string or an array of strings (the notation allows a section
   to run to several paragraphs). Email addresses render as mailto links. */

// split a paragraph so any email address becomes a mailto link.
// the domain group repeats \.[\w-]+ so it can't end on a dot — a trailing
// sentence period stays outside the address.
function withLinks(text) {
  const parts = String(text).split(/([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g);
  return parts.map((p, i) => /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(p) ? /*#__PURE__*/React.createElement("a", {
    key: i,
    href: `mailto:${p}`,
    style: {
      color: "var(--text-strong)",
      textDecoration: "underline",
      textUnderlineOffset: "0.2em"
    }
  }, p) : p);
}
function ContentProse({
  items = [],
  headingLevel = 2,
  measure = "72ch",
  contentWidth = "var(--container-prose)",
  background,
  paddingTop,
  children,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "sher-band sher-contentprose " + className,
    style: {
      paddingTop: paddingTop != null ? paddingTop : undefined,
      background: background || "transparent",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-contentprose-inner",
    style: {
      maxWidth: contentWidth,
      margin: "0 auto"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.heading || i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-section",
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, it.heading), (Array.isArray(it.paragraph) ? it.paragraph : [it.paragraph]).filter(Boolean).map((para, k) => /*#__PURE__*/React.createElement("p", {
    key: k,
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)",
      maxWidth: measure
    }
  }, withLinks(para))))), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)",
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, children)));
}
Object.assign(__ds_scope, { ContentProse });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ContentProse.jsx", error: String((e && e.message) || e) }); }

// components/layout/EditorialSplit.jsx
try { (() => {
/* EditorialSplit — the two-up editorial band used on the About page: a media panel
   beside a text column (eyebrow, heading, paragraph, optional actions). `mirror`
   swaps the sides once two-up; stacked, `mobileFirst` chooses which leads.

   Everything responsive is driven by CSS container queries on the band's OWN width
   (tokens/components.css) — no JS measurement, no breakpoint props. Media keeps a
   fixed 4:5 crop; for the Shop pages' stepped crop use C-ShopEditorial. */

function EditorialSplit({
  eyebrow,
  heading,
  headingLevel = 2,
  paragraph,
  media,
  mirror = false,
  mobileFirst = "media",
  mediaRounded = false,
  background,
  children,
  className = "",
  style = {}
}) {
  const cls = ["sher-band", className].filter(Boolean).join(" ");
  const inner = ["sher-editorial", mirror ? "mirror" : "", mobileFirst === "text" ? "first-text" : ""].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: {
      background,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: inner
  }, /*#__PURE__*/React.createElement("div", {
    className: "media",
    style: {
      position: "relative",
      aspectRatio: "var(--ratio-4-5)",
      background: "var(--surface-raised)",
      overflow: "hidden",
      borderRadius: mediaRounded ? "var(--radius-sm)" : 0
    }
  }, media), /*#__PURE__*/React.createElement("div", {
    className: "txt",
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "var(--space-3)"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "hd t-section",
    style: {
      margin: 0,
      maxWidth: "24ch",
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, heading), paragraph && /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)",
      maxWidth: "62ch"
    }
  }, paragraph), children && /*#__PURE__*/React.createElement("div", {
    className: "actions",
    style: {
      marginTop: "var(--space-2)",
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, children))));
}
Object.assign(__ds_scope, { EditorialSplit });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/EditorialSplit.jsx", error: String((e && e.message) || e) }); }

// components/layout/FeatureColumns.jsx
try { (() => {
/* FeatureColumns — an eyebrow + heading over a row of 2–3 columns, each a media
   panel with its own subheading and paragraph. Used for the "pick your closure /
   set type / length" comparison bands. Columns stack on mobile. */

function FeatureColumns({
  eyebrow,
  heading,
  headingLevel = 2,
  itemHeadingLevel = 3,
  items = [],
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sher-band " + className,
    style: {
      "--fc-count": items.length,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      marginBottom: "var(--space-7)"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, eyebrow), heading && /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-section",
    style: {
      margin: 0,
      maxWidth: "34ch",
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, heading)), /*#__PURE__*/React.createElement("div", {
    className: "sher-featurecols"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "var(--ratio-4-5)",
      background: "var(--surface-raised)",
      overflow: "hidden"
    }
  }, it.media), /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: itemHeadingLevel,
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400,
      fontSize: "var(--size-sub)"
    }
  }, it.heading), /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)"
    }
  }, it.paragraph)))));
}
Object.assign(__ds_scope, { FeatureColumns });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/FeatureColumns.jsx", error: String((e && e.message) || e) }); }

// components/layout/HeroTitle.jsx
try { (() => {
/* HeroTitle — an editorial title band: an optional breadcrumb, optional eyebrow, a
   heading, an optional lead description, and optional actions (buttons) below.
   Centered or left-aligned. Font sizes step against the band's OWN width via
   container queries (tokens/components.css) — no page CSS, no JS measurement. */

function HeroTitle({
  breadcrumb,
  eyebrow,
  heading,
  headingLevel = 1,
  description,
  align = "center",
  // "center" | "start"
  measure = "68ch",
  // description max line length
  headingFont = "display",
  headingMeasure = "34ch",
  background,
  tone = "light",
  children,
  // actions (e.g. buttons)
  className = "",
  style = {}
}) {
  const start = align === "start";
  // "body" sets the heading in Cardo, title case, untracked (the display face is
  // uppercase + tracked, which Cardo's larger x-height doesn't need)
  const inverse = tone === "inverse";
  const headingStyle = {
    margin: 0,
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)",
    lineHeight: "var(--leading-tight)",
    color: inverse ? "var(--sher-white)" : "var(--text-strong)",
    fontWeight: 400,
    maxWidth: headingMeasure
  };
  if (headingFont === "body") {
    headingStyle.fontFamily = "var(--font-body)";
    headingStyle.textTransform = "none";
    headingStyle.letterSpacing = "0";
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "sher-band " + className,
    style: {
      padding: "var(--space-8) var(--gutter)",
      background: background || "transparent",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      alignItems: start ? "flex-start" : "center",
      textAlign: start ? "left" : "center"
    }
  }, breadcrumb && breadcrumb.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.Breadcrumb, {
    items: breadcrumb,
    style: {
      marginBottom: "var(--space-2)"
    }
  }), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: inverse ? "var(--sher-white)" : "var(--text-meta)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-display",
    style: headingStyle
  }, heading), description && /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: inverse ? "var(--sher-white)" : "var(--text-default)",
      opacity: inverse ? 0.9 : 1,
      lineHeight: "var(--leading-normal)",
      maxWidth: measure
    }
  }, description), children && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap",
      marginTop: "var(--space-3)",
      justifyContent: start ? "flex-start" : "center"
    }
  }, children)));
}
Object.assign(__ds_scope, { HeroTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/HeroTitle.jsx", error: String((e && e.message) || e) }); }

// components/layout/ShopEditorial.jsx
try { (() => {
/* ShopEditorial — the two-up editorial band used across the Shop and category
   pages: a media panel beside a text column (eyebrow, heading, paragraph, optional
   actions). `mirror` swaps the sides once the band is two-up; stacked, `mobileFirst`
   chooses whether the media or the text leads and `mobileAlign` can push the copy to
   the right edge.

   Everything responsive is driven by CSS container queries on the band's OWN width
   (tokens/components.css) — no JS measurement, no breakpoint props:
     mobile  (<640)   gap 24  crop 4:3
     tablet  (>=640)  gap 24  crop 1:1   two-up from 768
     desktop (>=1024) gap 64  crop 5:4
   Override a placement with the `gap` / `ratio` props, or set --editorial-gap. */

function ShopEditorial({
  eyebrow,
  heading,
  headingLevel = 2,
  headingFont = "display",
  paragraph,
  media,
  mirror = false,
  mobileFirst = "media",
  mobileAlign = "left",
  gap,
  ratio,
  background,
  children,
  className = "",
  style = {}
}) {
  // self-contained heading treatment — never relies on a page loading base.css
  const headingStyle = {
    margin: 0,
    maxWidth: "24ch",
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)",
    lineHeight: "var(--leading-snug)",
    color: "var(--text-strong)",
    fontWeight: 400
  };
  // "body" sets the heading in Cardo, title case, untracked — a softer editorial voice
  if (headingFont === "body") {
    headingStyle.fontFamily = "var(--font-body)";
    headingStyle.textTransform = "none";
    headingStyle.letterSpacing = "0";
  }
  const cls = ["sher-band", className].filter(Boolean).join(" ");
  const inner = ["sher-editorial", mirror ? "mirror" : "", mobileFirst === "text" ? "first-text" : "", mobileAlign === "right" ? "align-right" : ""].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: {
      background,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: inner,
    style: gap ? {
      "--editorial-gap": gap
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "media" + (ratio ? "" : " crop"),
    style: {
      position: "relative",
      background: "var(--surface-raised)",
      overflow: "hidden",
      aspectRatio: ratio || undefined
    }
  }, media), /*#__PURE__*/React.createElement("div", {
    className: "txt",
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "var(--space-3)"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "hd t-section",
    style: headingStyle
  }, heading), paragraph && /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)",
      maxWidth: "62ch"
    }
  }, paragraph), children && /*#__PURE__*/React.createElement("div", {
    className: "actions",
    style: {
      marginTop: "var(--space-2)",
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, children))));
}
Object.assign(__ds_scope, { ShopEditorial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ShopEditorial.jsx", error: String((e && e.message) || e) }); }

// components/layout/ShopTitle.jsx
try { (() => {
/* ShopTitle — the page header band for Shop and category pages: a breadcrumb,
   a heading, an optional description, and an optional row of filter pills. Left
   aligned. Heading and description sizes step against the band's OWN width via
   container queries (see tokens/components.css) — no page CSS, no JS measurement. */

function ShopTitle({
  breadcrumb = [],
  heading,
  headingLevel = 1,
  description,
  filters,
  // [{ label, href, key, active }]
  activeFilter,
  // key of the active filter (alt to per-item active)
  onFilter,
  // (key) => void; if set, pills are buttons
  align = "center",
  // "center" | "start"
  measure = "78ch",
  className = "",
  style = {}
}) {
  const start = align === "start";
  return /*#__PURE__*/React.createElement("header", {
    className: "sher-band " + className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      alignItems: "stretch",
      textAlign: start ? "left" : "center",
      ...style
    }
  }, breadcrumb.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.Breadcrumb, {
    items: breadcrumb,
    style: {
      justifyContent: start ? "flex-start" : "center"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-hero",
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, heading), description && /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)",
      maxWidth: measure,
      marginLeft: start ? 0 : "auto",
      marginRight: start ? 0 : "auto"
    }
  }, description), filters && filters.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-3)",
      marginTop: "var(--space-2)",
      justifyContent: start ? "flex-start" : "center"
    }
  }, filters.map((f, i) => {
    const active = f.active != null ? f.active : activeFilter != null && f.key === activeFilter;
    const k = f.key || f.href || f.label || i;
    // a per-item onClick (or a shared onFilter) makes the pill a button; otherwise it's a link
    const handler = f.onClick || (onFilter ? () => onFilter(f.key) : null);
    return handler ? /*#__PURE__*/React.createElement(__ds_scope.ButtonPill, {
      key: k,
      active: active,
      onClick: handler
    }, f.label) : /*#__PURE__*/React.createElement(__ds_scope.ButtonPill, {
      key: k,
      as: "a",
      href: f.href,
      active: active
    }, f.label);
  })));
}
Object.assign(__ds_scope, { ShopTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ShopTitle.jsx", error: String((e && e.message) || e) }); }

// components/module/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SHER icon set.
   UI icons follow the brand's icon spec: Lucide line style, 1.5px stroke, round joins.
   Brand/social marks use Simple Icons (filled) — for official social links only.
   Paths are inlined so the system stays offline-portable. */

const UI = {
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M18 6 6 18M6 6l12 12",
  bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-right": "m9 18 6-6-6-6",
  "chevron-left": "m15 18-6-6 6-6",
  "arrow-right": "M5 12h14M12 5l7 7-7 7",
  minus: "M5 12h14",
  plus: "M5 12h14M12 5v14",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6",
  ruler: "M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4ZM14.5 5.5l2 2M11 9l2 2M7.5 12.5l2 2"
};
const BRAND = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
};
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  className = "",
  style = {},
  ...rest
}) {
  const isBrand = name in BRAND;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    style: {
      display: "block",
      flexShrink: 0,
      ...style
    },
    "aria-hidden": true,
    ...rest
  };
  if (isBrand) {
    return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: BRAND[name]
    }));
  }
  return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: UI[name] || ""
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/Icon.jsx", error: String((e && e.message) || e) }); }

// components/layout/ContactMethods.jsx
try { (() => {
/* ContactMethods — the stacked contact band: one row per method, each a heading
   over its content. Three kinds: "social" (brand-mark links), "email" (mailto
   link), "address" (plain address text). Rows are hairline-separated. */

function ContactMethods({
  items = [],
  headingLevel = 2,
  className = "",
  style = {}
}) {
  const linkStyle = {
    fontFamily: "var(--font-body)",
    color: "var(--text-strong)",
    textDecoration: "underline",
    textUnderlineOffset: "0.25em"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sher-band sher-contactmethods " + className,
    style: {
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-6) 0",
      borderTop: i === 0 ? "1px solid var(--border-default)" : "none",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400,
      fontSize: "var(--size-sub)"
    }
  }, it.heading), it.kind === "social" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center"
    }
  }, (it.links || []).map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    "aria-label": l.label,
    target: "_blank",
    rel: "noreferrer",
    style: {
      color: "var(--text-strong)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: l.icon,
    size: 24
  })))), it.kind === "email" && /*#__PURE__*/React.createElement("a", {
    href: `mailto:${it.value}`,
    className: "t-body",
    style: linkStyle
  }, it.value), it.kind === "address" && /*#__PURE__*/React.createElement("address", {
    className: "t-body",
    style: {
      margin: 0,
      fontStyle: "normal",
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)",
      whiteSpace: "pre-line"
    }
  }, it.value))));
}
Object.assign(__ds_scope, { ContactMethods });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ContactMethods.jsx", error: String((e && e.message) || e) }); }

// components/layout/MediaGallery.jsx
try { (() => {
/* MediaGallery — the product page's media gallery: a thumbnail strip beside a
   main stage. Media order is fixed by the caller (video first, then images).
   On load the stage shows the first IMAGE while the video loads, then switches
   to the video and autoplays it muted, looped and inline. With reduced motion
   on it neither auto-switches nor autoplays.

   The strip turns vertical at the GALLERY's own 380px via a CSS container query
   (tokens/components.css) — nested in C-ProductPanel's two-up grid it receives
   about half the frame, so a page-level breakpoint would never fire. */

function MediaGallery({
  media = [],
  className = "",
  style = {}
}) {
  const videoRef = React.useRef(null);
  const firstImage = Math.max(0, media.findIndex(m => m.type !== "video"));
  const [active, setActive] = React.useState(firstImage);
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = e => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // once the video can play, take over the stage and autoplay it — unless reduced motion
  const onVideoReady = () => {
    if (reduced) return;
    const vi = media.findIndex(m => m.type === "video");
    if (vi > -1) setActive(vi);
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  };
  const stage = /*#__PURE__*/React.createElement("div", {
    className: "stage",
    style: {
      position: "relative",
      aspectRatio: "var(--ratio-3-4)",
      background: "var(--surface-raised)",
      overflow: "hidden"
    }
  }, media.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "absolute",
      inset: 0,
      opacity: i === active ? 1 : 0,
      pointerEvents: i === active ? "auto" : "none",
      transition: "opacity var(--dur-med) var(--ease-out)"
    }
  }, m.type === "video" && m.src ? /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    src: m.src,
    muted: true,
    loop: true,
    playsInline: true,
    poster: m.poster,
    autoPlay: !reduced,
    controls: reduced,
    onCanPlay: onVideoReady,
    "aria-label": m.alt || "Product video",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : m.src ? /*#__PURE__*/React.createElement("img", {
    src: m.src,
    alt: m.alt || "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : m.node || null)));
  const thumbs = /*#__PURE__*/React.createElement("div", {
    className: "thumbs",
    role: "group",
    "aria-label": "Product media"
  }, media.map((m, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    "aria-label": `Show ${m.type === "video" ? "video" : `image ${i + 1}`}`,
    "aria-pressed": i === active,
    onClick: () => setActive(i),
    style: {
      position: "relative",
      aspectRatio: "var(--ratio-3-4)",
      flexShrink: 0,
      padding: 0,
      cursor: "pointer",
      background: "var(--surface-raised)",
      overflow: "hidden",
      border: "1px solid " + (i === active ? "var(--surface-inverse)" : "var(--border-default)"),
      transition: "border-color var(--dur-fast) var(--ease-out)"
    }
  }, m.thumb || m.node || (m.src && m.type !== "video" ? /*#__PURE__*/React.createElement("img", {
    src: m.src,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : null), m.type === "video" && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--sher-white)",
      background: "var(--scrim-soft)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18
  })))));
  return /*#__PURE__*/React.createElement("div", {
    className: "sher-band " + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-mediagallery"
  }, thumbs, stage));
}
Object.assign(__ds_scope, { MediaGallery });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/MediaGallery.jsx", error: String((e && e.message) || e) }); }

// components/module/Accordion.jsx
try { (() => {
/* Accordion — stacked disclosure rows for FAQ blocks. One item open at a time by
   default (`single`), or allow many. Rows are hairline-separated; the trigger is
   a full-width button with a rotating chevron. */

function Accordion({
  items = [],
  headingLevel = 3,
  single = true,
  defaultOpen = null,
  className = "",
  style = {}
}) {
  const [open, setOpen] = React.useState(defaultOpen == null ? [] : [defaultOpen]);
  const isOpen = i => open.indexOf(i) !== -1;
  const toggle = i => setOpen(prev => {
    if (prev.indexOf(i) !== -1) return prev.filter(x => x !== i);
    return single ? [i] : prev.concat(i);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      borderTop: "1px solid var(--border-default)",
      ...style
    }
  }, items.map((it, i) => {
    const o = isOpen(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: "1px solid var(--border-default)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
      level: headingLevel,
      style: {
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => toggle(i),
      "aria-expanded": o,
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        padding: "var(--space-5) 0",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        color: "var(--text-strong)",
        font: "inherit",
        fontFamily: "var(--font-display)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-display)",
        fontSize: "var(--fs-sub, var(--size-sub))",
        lineHeight: "var(--leading-snug)"
      }
    }, /*#__PURE__*/React.createElement("span", null, it.q), /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        display: "inline-flex",
        transform: o ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform var(--dur-med) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-down",
      size: 20
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: "hidden",
        maxHeight: o ? 600 : 0,
        opacity: o ? 1 : 0,
        transition: "max-height var(--dur-slow) var(--ease-out), opacity var(--dur-med) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        paddingBottom: "var(--space-5)",
        color: "var(--text-default)",
        fontSize: "var(--fs-body, var(--size-body-lg))",
        lineHeight: "var(--leading-normal)",
        maxWidth: "72ch"
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/layout/ShopFaq.jsx
try { (() => {
/* ShopFaq — the FAQ band: a heading beside its accordion at two-up, stacking to
   one column below 768px. The heading sits vertically centred against the
   accordion. Layout and heading size come from CSS container queries on the
   band's OWN width (tokens/components.css) — no JS measurement. */

function ShopFaq({
  heading = "Frequently Asked Questions",
  headingLevel = 2,
  items = [],
  itemHeadingLevel = 3,
  defaultOpen = 0,
  single = true,
  align = "center",
  // heading block: "center" | "start" (vertical, at two-up)
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sher-band " + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-shopfaq" + (align === "center" ? " align-center" : "")
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "hd t-section",
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, heading), /*#__PURE__*/React.createElement(__ds_scope.Accordion, {
    items: items,
    headingLevel: itemHeadingLevel,
    defaultOpen: defaultOpen,
    single: single
  })));
}
Object.assign(__ds_scope, { ShopFaq });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ShopFaq.jsx", error: String((e && e.message) || e) }); }

// components/module/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SHER icon button — square, borderless tap target for header controls
   (hamburger, cart, close). 44px min hit area for accessibility. */

function IconButton({
  children,
  label,
  // required aria-label
  size = 44,
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      padding: 0,
      border: "none",
      background: "transparent",
      color: "inherit",
      cursor: "pointer",
      borderRadius: "var(--radius-sm)",
      opacity: hover ? 0.6 : 1,
      transition: "opacity var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/layout/HeroCarousel.jsx
try { (() => {
/* HeroCarousel — the Home hero band (F-008). A sliding "peek" carousel: one banner
   on mobile, two at 50% each on tablet/desktop. Banners are fixed portrait crops
   (2:3 on mobile/tablet, 4:5 on desktop by default). Auto-advances by one banner
   with wrap; prev/next arrows and dots page by one. Each banner takes a solid tone
   (bg) or an image, an optional text overlay (eyebrow/heading/cta) over a scrim. */

function HeroCarousel({
  slides = [],
  interval = 6000,
  autoPlay = true,
  className = "",
  style = {}
}) {
  const [pos, setPos] = React.useState(0);
  const [anim, setAnim] = React.useState(true);
  const n = slides.length || 1;

  // the CELL WIDTH is a container query (1-up below 768, 2-up above); the track
  // shifts by --pos and the query supplies the matching percentage, so JS never
  // needs to know how many banners are on screen
  React.useEffect(() => {
    if (!autoPlay || n <= 1) return;
    const t = setInterval(() => setPos(p => p + 1), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, n]);
  React.useEffect(() => {
    if (!anim) requestAnimationFrame(() => setAnim(true));
  }, [anim]);
  const ext = slides.concat(slides.slice(0, 2));
  const active = (pos % n + n) % n;
  const go = k => setPos((k % n + n) % n);
  const onEnd = () => {
    if (pos >= n) {
      setAnim(false);
      setPos(pos - n);
    }
  };
  const eyebrow = {
    fontFamily: "var(--font-body)",
    fontSize: "var(--size-xs)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    opacity: 0.9
  };
  const heading = {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)",
    lineHeight: "var(--leading-tight)",
    maxWidth: "18ch"
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "sher-band sher-herocarousel " + className,
    "aria-roledescription": "carousel",
    style: {
      position: "relative",
      width: "100%",
      overflow: "hidden",
      background: "var(--surface-inverse)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-herocarousel-track",
    onTransitionEnd: onEnd,
    style: {
      display: "flex",
      "--pos": pos,
      transition: anim ? "transform var(--dur-slow) var(--ease-out)" : "none"
    }
  }, ext.map((s, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "sher-herocarousel-cell",
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: s.image ? `center/cover no-repeat url("${s.image}")` : s.bg || "var(--surface-inverse)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--overlay-hero)"
    }
  }), (s.eyebrow || s.heading || s.cta) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      textAlign: "center",
      color: "var(--sher-white)",
      padding: "var(--space-8) var(--gutter) var(--space-9)",
      gap: "var(--space-4)"
    }
  }, s.eyebrow && /*#__PURE__*/React.createElement("span", {
    style: eyebrow
  }, s.eyebrow), s.heading && /*#__PURE__*/React.createElement("span", {
    className: "t-hero",
    style: heading
  }, s.heading), s.cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    as: "a",
    href: s.cta.href,
    variant: "primary",
    style: {
      background: "var(--sher-white)",
      color: "var(--sher-dark)",
      marginTop: "var(--space-2)"
    }
  }, s.cta.label))))), n > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: "var(--space-3)",
      transform: "translateY(-50%)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Previous slide",
    onClick: () => go(active - 1),
    style: {
      color: "var(--sher-white)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-left",
    size: 26
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      right: "var(--space-3)",
      transform: "translateY(-50%)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Next slide",
    onClick: () => go(active + 1),
    style: {
      color: "var(--sher-white)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 26
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "var(--space-5)",
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: "var(--space-2)"
    }
  }, slides.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    "aria-label": `Go to slide ${k + 1}`,
    onClick: () => go(k),
    style: {
      width: k === active ? 22 : 8,
      height: 8,
      border: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      padding: 0,
      background: k === active ? "var(--sher-white)" : "var(--dot-idle)",
      transition: "width var(--dur-med) var(--ease-out), background var(--dur-med) var(--ease-out)"
    }
  })))));
}
Object.assign(__ds_scope, { HeroCarousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/HeroCarousel.jsx", error: String((e && e.message) || e) }); }

// components/layout/HeroCarouselStg.jsx
try { (() => {
/* HeroCarouselStg — the Home hero band (F-008). Slides through featured banners with
   a text overlay; auto-advances, with prev/next arrows and dot indicators.
   Full-bleed, edge-to-edge. Text sits over a tonal scrim for AA contrast. */

function HeroCarouselStg({
  slides = [],
  interval = 6000,
  height = "fill",
  // "fill" | number(px) | CSS string
  autoPlay = true,
  className = "",
  style = {}
}) {
  const [i, setI] = React.useState(0);
  const n = slides.length || 1;
  const go = k => setI((k + n) % n);
  React.useEffect(() => {
    if (!autoPlay || n <= 1) return;
    const t = setInterval(() => setI(x => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, n]);
  const h = height === "fill" ? "100%" : typeof height === "number" ? height + "px" : height;
  return /*#__PURE__*/React.createElement("section", {
    className: "sher-band " + className,
    "aria-roledescription": "carousel",
    style: {
      position: "relative",
      width: "100%",
      height: h,
      overflow: "hidden",
      background: "var(--surface-inverse)",
      ...style
    }
  }, slides.map((s, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    "aria-hidden": k !== i,
    style: {
      position: "absolute",
      inset: 0,
      opacity: k === i ? 1 : 0,
      transition: "opacity var(--dur-slow) var(--ease-out)",
      pointerEvents: k === i ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: s.image ? `center/cover no-repeat url("${s.image}")` : "var(--surface-inverse)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--overlay-hero)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      textAlign: "center",
      color: "var(--sher-white)",
      padding: "var(--space-8) var(--gutter) var(--space-9)",
      gap: "var(--space-4)"
    }
  }, s.eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      opacity: 0.9
    }
  }, s.eyebrow), s.heading && /*#__PURE__*/React.createElement("span", {
    className: "t-hero",
    style: {
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)",
      maxWidth: "18ch"
    }
  }, s.heading), s.cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    as: "a",
    href: s.cta.href,
    variant: "primary",
    style: {
      background: "var(--sher-white)",
      color: "var(--sher-dark)",
      marginTop: "var(--space-2)"
    }
  }, s.cta.label)))), n > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: "var(--space-3)",
      transform: "translateY(-50%)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Previous slide",
    onClick: () => go(i - 1),
    style: {
      color: "var(--sher-white)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-left",
    size: 26
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      right: "var(--space-3)",
      transform: "translateY(-50%)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Next slide",
    onClick: () => go(i + 1),
    style: {
      color: "var(--sher-white)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 26
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "var(--space-5)",
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: "var(--space-2)"
    }
  }, slides.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    "aria-label": `Go to slide ${k + 1}`,
    onClick: () => go(k),
    style: {
      width: k === i ? 22 : 8,
      height: 8,
      border: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      padding: 0,
      background: k === i ? "var(--sher-white)" : "var(--dot-idle)",
      transition: "width var(--dur-med) var(--ease-out), background var(--dur-med) var(--ease-out)"
    }
  })))));
}
Object.assign(__ds_scope, { HeroCarouselStg });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/HeroCarouselStg.jsx", error: String((e && e.message) || e) }); }

// components/layout/Shipping.jsx
try { (() => {
/* C-Shipping — Shipping & Returns Drawer.
   Opens from the product page. Shows the same content as the /shipping-returns
   page. Slides from the right. Pass your own content as children, or use the
   default sections. */

const DEFAULT_SECTIONS = [{
  title: "Shipping",
  body: "We deliver worldwide. Complimentary global shipping on orders over $250; a flat rate applies below that. Orders are dispatched within 2–3 business days."
}, {
  title: "Returns",
  body: "Unworn pieces with tags may be returned within 14 days of delivery. Made-to-measure and altered pieces are final sale."
}, {
  title: "Tailoring",
  body: "Every SHER piece can be tailored to you. Reach out and we'll guide you through measurements before you order."
}];
function Shipping({
  open = false,
  onClose,
  headingLevel = 2,
  sections = DEFAULT_SECTIONS,
  children,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur-med) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("aside", {
    className: "sher-band " + className,
    "aria-label": "Shipping and returns",
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      width: "min(94vw, 460px)",
      background: "var(--surface-page)",
      boxShadow: "var(--shadow-drawer)",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform var(--dur-med) var(--ease-out)",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-5)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-title",
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, "Shipping & Returns"), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "var(--space-5)"
    }
  }, children || sections.map(s => /*#__PURE__*/React.createElement("section", {
    key: s.title,
    style: {
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: Math.min(4, headingLevel + 1),
    style: {
      margin: "0 0 var(--space-2)",
      fontFamily: "var(--font-nav)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      fontSize: "var(--size-sub)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-default)",
      fontSize: "var(--size-sm)",
      lineHeight: "var(--leading-normal)"
    }
  }, s.body))))));
}
Object.assign(__ds_scope, { Shipping });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Shipping.jsx", error: String((e && e.message) || e) }); }

// components/layout/Sizing.jsx
try { (() => {
/* C-Sizing — Size Chart Drawer (F-007 Size Chart).
   Renders only the measurements a product defines; the inches table is worked out
   from the cm values (D-005). Slides from the right. */

const DEFAULT_CHART = {
  measures: [{
    key: "bust",
    label: "Bust"
  }, {
    key: "waist",
    label: "Waist"
  }, {
    key: "length",
    label: "Length"
  }],
  rows: [{
    size: "XS",
    cm: {
      bust: 78,
      waist: 60,
      length: 38
    }
  }, {
    size: "S",
    cm: {
      bust: 82,
      waist: 64,
      length: 39
    }
  }, {
    size: "M",
    cm: {
      bust: 87,
      waist: 69,
      length: 40
    }
  }, {
    size: "L",
    cm: {
      bust: 93,
      waist: 75,
      length: 41
    }
  }, {
    size: "XL",
    cm: {
      bust: 99,
      waist: 81,
      length: 42
    }
  }]
};
const toInch = cm => Math.round(cm / 2.54 * 10) / 10;
function Table({
  measures,
  rows,
  unit
}) {
  const cell = {
    padding: "var(--pad-pill-y) var(--space-3)",
    textAlign: "left",
    fontFamily: "var(--font-body)",
    fontSize: "var(--size-sm)",
    borderBottom: "1px solid var(--border-default)"
  };
  const head = {
    ...cell,
    color: "var(--text-meta)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-label)",
    fontSize: "var(--size-xs)"
  };
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: head
  }, "Size"), measures.map(m => /*#__PURE__*/React.createElement("th", {
    key: m.key,
    style: {
      ...head,
      textAlign: "right"
    }
  }, m.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.size
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell,
      color: "var(--text-strong)"
    }
  }, r.size), measures.map(m => /*#__PURE__*/React.createElement("td", {
    key: m.key,
    style: {
      ...cell,
      textAlign: "right",
      color: "var(--text-default)",
      fontVariantNumeric: "tabular-nums"
    }
  }, unit === "in" ? toInch(r.cm[m.key]) : r.cm[m.key]))))));
}
function Sizing({
  open = false,
  onClose,
  headingLevel = 2,
  productName = "",
  chart = DEFAULT_CHART,
  className = "",
  style = {}
}) {
  // keep only measures that at least one row actually defines
  const measures = chart.measures.filter(m => chart.rows.some(r => r.cm[m.key] != null));
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur-med) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("aside", {
    className: "sher-band " + className,
    "aria-label": "Size chart",
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      width: "min(94vw, 460px)",
      background: "var(--surface-page)",
      boxShadow: "var(--shadow-drawer)",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform var(--dur-med) var(--ease-out)",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "var(--space-5)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-title",
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, "Size Chart"), productName && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.25rem 0 0",
      color: "var(--text-meta)",
      fontSize: "var(--size-sm)"
    }
  }, productName)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close size chart",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0,
      color: "var(--text-default)",
      fontSize: "var(--size-sm)",
      lineHeight: "var(--leading-normal)"
    }
  }, "This guide is measurements-based and varies by style. Every piece can be tailored \u2014 reach out if you're unsure and we'll help you choose."), /*#__PURE__*/React.createElement("p", {
    className: "sher-eyebrow",
    style: {
      margin: "var(--space-5) 0 var(--space-2)"
    }
  }, "Centimetres"), /*#__PURE__*/React.createElement(Table, {
    measures: measures,
    rows: chart.rows,
    unit: "cm"
  }), /*#__PURE__*/React.createElement("p", {
    className: "sher-eyebrow",
    style: {
      margin: "0 0 var(--space-2)"
    }
  }, "Inches"), /*#__PURE__*/React.createElement(Table, {
    measures: measures,
    rows: chart.rows,
    unit: "in"
  }))));
}
Object.assign(__ds_scope, { Sizing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Sizing.jsx", error: String((e && e.message) || e) }); }

// components/module/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SHER logo. Two variations from the brand: the monogram MARK alone, and the
   SQUARE lockup (mark + SHER wordmark beneath). Colors: black, white, dark.
   Only a black mark PNG and black/white square PNGs were provided — the white
   mark and dark mark are derived from the black mark via CSS filter. */

// Resolve /assets relative to the DS bundle so URLs work at any page depth.
let _base;
function dsBase() {
  if (_base != null) return _base;
  try {
    const s = Array.from(document.querySelectorAll("script[src]")).find(x => /_ds_bundle\.js(\?|$)/.test(x.src));
    _base = s ? s.src.replace(/_ds_bundle\.js.*$/, "") : "";
  } catch {
    _base = "";
  }
  return _base;
}
const asset = name => dsBase() + "assets/" + name;

// tone the black mark PNG to white / dark-gray without extra assets
const FILTER = {
  black: "none",
  dark: "brightness(0) saturate(100%) invert(18%)",
  // ~#333231
  white: "brightness(0) invert(1)"
};
function Logo({
  variant = "mark",
  // "mark" | "square"
  color = "black",
  // "black" | "white" | "dark"
  size = 40,
  // px — mark height, or square width
  href,
  alt = "SHER",
  assetBase,
  // optional override for the /assets base URL
  className = "",
  style = {},
  ...rest
}) {
  const A = assetBase != null ? {
    markBase: assetBase + "logo-icon-black.png",
    squareBlack: assetBase + "logo-square-black.png",
    squareWhite: assetBase + "logo-square-white.png"
  } : {
    markBase: asset("logo-icon-black.png"),
    squareBlack: asset("logo-square-black.png"),
    squareWhite: asset("logo-square-white.png")
  };
  let src, imgStyle;
  if (variant === "square") {
    src = color === "white" ? A.squareWhite : A.squareBlack;
    imgStyle = {
      width: size,
      height: "auto",
      filter: color === "dark" ? FILTER.dark : "none"
    };
  } else {
    src = A.markBase;
    imgStyle = {
      width: size,
      height: size,
      filter: FILTER[color] || "none"
    };
  }
  const img = /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    style: {
      display: "block",
      ...imgStyle,
      ...style
    }
  }, rest));
  if (href) {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      className: className,
      "aria-label": alt,
      style: {
        display: "inline-flex",
        lineHeight: 0
      }
    }, img);
  }
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-flex",
      lineHeight: 0
    }
  }, img);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/Logo.jsx", error: String((e && e.message) || e) }); }

// components/layout/Footer.jsx
try { (() => {
/* C-Footer — Footer, on every screen.
   Three link columns (Shop & Learn, More Information, Connect with Us) plus a
   bottom bar with copyright, Privacy Policy, and Terms of Service. */

const SHOP = [{
  label: "Corset Tops",
  href: "/corset-tops"
}, {
  label: "Matching Sets",
  href: "/matching-sets"
}, {
  label: "Cocktail Dress",
  href: "/cocktail-dresses"
}, {
  label: "Shop All",
  href: "/shop"
}];
const INFO = [{
  label: "Our Story",
  href: "/about"
}, {
  label: "Contact",
  href: "/contact"
}, {
  label: "Shipping & Returns",
  href: "/shipping-returns"
}];
const SOCIAL = [{
  label: "Instagram",
  href: "#",
  icon: "instagram"
}, {
  label: "Facebook",
  href: "#",
  icon: "facebook"
}, {
  label: "TikTok",
  href: "#",
  icon: "tiktok"
}];
function Footer({
  headingLevel = 2,
  shopLinks = SHOP,
  infoLinks = INFO,
  socialLinks = SOCIAL,
  year = new Date().getFullYear(),
  className = "",
  style = {}
}) {
  const colHead = {
    margin: "0 0 var(--space-4)",
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: "var(--size-xs)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    color: "var(--text-on-inverse)",
    opacity: 0.6
  };
  const link = {
    display: "block",
    padding: "var(--pad-row-sm) 0",
    fontFamily: "var(--font-body)",
    fontSize: "var(--size-sm)",
    color: "var(--text-on-inverse)",
    textDecoration: "none",
    letterSpacing: "var(--tracking-item)"
  };
  const Col = ({
    title,
    links
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    style: colHead
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    style: link
  }, l.label))));
  return /*#__PURE__*/React.createElement("footer", {
    className: "sher-band " + className,
    style: {
      background: "var(--surface-inverse)",
      color: "var(--text-on-inverse)",
      padding: "var(--space-9) var(--gutter) var(--space-6)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-footer-logo",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "square",
    color: "white",
    size: 104,
    href: "/"
  })), /*#__PURE__*/React.createElement(Col, {
    title: "Shop & Learn",
    links: shopLinks
  }), /*#__PURE__*/React.createElement(Col, {
    title: "More Info",
    links: infoLinks
  }), /*#__PURE__*/React.createElement("div", {
    className: "sher-footer-connect",
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    style: colHead
  }, "Connect with Us"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      marginTop: "var(--pad-row-sm)",
      justifyContent: "center"
    }
  }, socialLinks.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.label,
    href: s.href,
    "aria-label": s.label,
    target: "_blank",
    rel: "noreferrer",
    style: {
      color: "var(--text-on-inverse)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: s.icon,
    size: 22
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-4)",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "var(--space-8)",
      paddingTop: "var(--space-5)",
      borderTop: "1px solid var(--border-inverse)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-item)",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 SHER ", year), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/privacy-policy",
    style: {
      color: "var(--text-on-inverse)",
      textDecoration: "none"
    }
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("a", {
    href: "/terms-of-service",
    style: {
      color: "var(--text-on-inverse)",
      textDecoration: "none"
    }
  }, "Terms of Service")))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Footer.jsx", error: String((e && e.message) || e) }); }

// components/layout/Menu.jsx
try { (() => {
/* C-Menu — Menu Drawer.
   Opens from the hamburger, slides in from the left. Dark mark logo, a "Shop Now"
   group, then Our Story / Contact Us / Login. A link closes the drawer + navigates. */

const SHOP = [{
  label: "Corset Tops",
  href: "/corset-tops"
}, {
  label: "Matching Sets",
  href: "/matching-sets"
}, {
  label: "Cocktail Dress",
  href: "/cocktail-dresses"
}, {
  label: "Shop All",
  href: "/shop"
}];
const SECONDARY = [{
  label: "Our Story",
  href: "/about"
}, {
  label: "Contact Us",
  href: "/contact"
}, {
  label: "Login / Account",
  href: "/account"
}];
function Menu({
  open = false,
  onClose,
  headingLevel = 2,
  shopLinks = SHOP,
  secondaryLinks = SECONDARY,
  onNavigate,
  logoHref = "/",
  className = "",
  style = {}
}) {
  const go = href => e => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
    onClose && onClose();
  };
  const linkStyle = {
    display: "block",
    fontFamily: "var(--font-nav)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)",
    color: "var(--text-strong)",
    padding: "var(--space-2) 0",
    textDecoration: "none"
  };
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur-med) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("nav", {
    className: "sher-band " + className,
    "aria-label": "Main menu",
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: "min(88vw, 380px)",
      background: "var(--surface-page)",
      boxShadow: "var(--shadow-drawer)",
      transform: open ? "translateX(0)" : "translateX(-100%)",
      transition: "transform var(--dur-med) var(--ease-out)",
      display: "flex",
      flexDirection: "column",
      padding: "var(--space-5)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "mark",
    color: "dark",
    size: 36,
    href: logoHref,
    onClick: go(logoHref)
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close menu",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 24
  }))), /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    style: {
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--text-meta)",
      fontFamily: "var(--font-body)",
      fontWeight: 400,
      textTransform: "uppercase",
      margin: "0 0 var(--space-3)"
    }
  }, "Shop Now"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "var(--space-6)"
    }
  }, shopLinks.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: go(l.href),
    className: "t-title",
    style: linkStyle
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      marginTop: "auto",
      borderTop: "1px solid var(--border-default)",
      paddingTop: "var(--space-5)"
    }
  }, secondaryLinks.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: go(l.href),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-base)",
      letterSpacing: "var(--tracking-item)",
      color: "var(--text-default)",
      padding: "var(--pad-row-md) 0",
      textDecoration: "none"
    }
  }, l.label)))));
}
Object.assign(__ds_scope, { Menu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Menu.jsx", error: String((e && e.message) || e) }); }

// components/layout/Sticky.jsx
try { (() => {
/* C-Sticky — Sticky Header.
   Sticky on every screen. On Home it takes over after 60vh of scroll. Solid page
   background with a hairline base. Dark symbol (mark) logo centered; hamburger
   (opens C-Menu) left, cart (opens C-Cart) right. */

function Sticky({
  announcement,
  announcementTone = "dark",
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  showAnnouncement = true,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: className,
    style: {
      position: "sticky",
      top: 0,
      zIndex: "var(--z-header)",
      background: "var(--surface-page)",
      color: "var(--text-strong)",
      borderBottom: "1px solid var(--border-default)",
      ...style
    }
  }, showAnnouncement && /*#__PURE__*/React.createElement(__ds_scope.AnnouncementBar, {
    tone: announcementTone
  }, announcement || undefined), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "var(--header-h)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "var(--container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Open menu",
    onClick: onMenu,
    className: "sher-hedge-start"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "menu",
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, calc(-50% + 4px))"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "mark",
    color: "dark",
    size: 52,
    href: logoHref
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: `Open cart${cartCount ? `, ${cartCount} items` : ""}`,
    onClick: onCart,
    className: "sher-hedge-end",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bag",
    size: 24
  }), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      right: 2,
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-inverse)",
      color: "var(--text-on-inverse)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-nano)",
      lineHeight: "16px",
      textAlign: "center",
      fontVariantNumeric: "tabular-nums"
    }
  }, cartCount)))));
}
Object.assign(__ds_scope, { Sticky });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Sticky.jsx", error: String((e && e.message) || e) }); }

// components/layout/Transparent.jsx
try { (() => {
/* C-Transparent — Transparent Header.
   Home only. Sits over the hero: transparent, non-sticky, scrolls away with the
   page. Oversized WHITE square logo, centered, overflowing below the header bar.
   Hamburger (opens C-Menu) left, cart (opens C-Cart) right. */

function Transparent({
  announcement,
  announcementTone,
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: className,
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: "var(--z-header)",
      color: "var(--sher-white)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.AnnouncementBar, {
    tone: announcementTone
  }, announcement || undefined), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--header-h)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "var(--container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Open menu",
    onClick: onMenu,
    className: "sher-hedge-start",
    style: {
      color: "var(--sher-white)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "menu",
    size: 26
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: `Open cart${cartCount ? `, ${cartCount} items` : ""}`,
    onClick: onCart,
    className: "sher-hedge-end",
    style: {
      color: "var(--sher-white)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bag",
    size: 24
  }), cartCount > 0 && /*#__PURE__*/React.createElement(CartCount, {
    count: cartCount,
    light: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(var(--space-2) + 4px)",
      left: "50%",
      transform: "translateX(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "square",
    color: "white",
    size: 128,
    href: logoHref,
    style: {
      pointerEvents: "auto"
    }
  }))));
}
function CartCount({
  count,
  light
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      right: 2,
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      borderRadius: "var(--radius-pill)",
      background: light ? "var(--sher-white)" : "var(--surface-inverse)",
      color: light ? "var(--surface-inverse)" : "var(--text-on-inverse)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-nano)",
      lineHeight: "16px",
      textAlign: "center",
      fontVariantNumeric: "tabular-nums"
    }
  }, count);
}
Object.assign(__ds_scope, { Transparent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Transparent.jsx", error: String((e && e.message) || e) }); }

// components/module/Price.jsx
try { (() => {
/* SHER price — formats a money amount in the brand's serif. Checkout settles in
   USD (F-006); currency defaults to USD. Optional strikethrough compare-at price. */

function fmt(amount, currency) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2
    }).format(amount);
  } catch {
    return "$" + amount;
  }
}
function Price({
  amount,
  currency = "USD",
  compareAt,
  size = "md",
  // "sm" | "md" | "lg"
  className = "",
  style = {}
}) {
  const fs = {
    sm: "var(--size-sm)",
    md: "var(--fs-item, var(--size-item-lg))",
    lg: "var(--size-title-lg)"
  }[size];
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      fontFamily: "var(--font-body)",
      color: "var(--text-strong)",
      fontSize: fs,
      display: "inline-flex",
      alignItems: "baseline",
      gap: "var(--space-2)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, fmt(amount, currency)), compareAt != null && compareAt > amount && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-meta)",
      textDecoration: "line-through",
      fontSize: "0.85em" /* relative to the price it annotates — intentionally not a scale rung */
    }
  }, fmt(compareAt, currency)));
}
Object.assign(__ds_scope, { Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/Price.jsx", error: String((e && e.message) || e) }); }

// components/module/ProductCard.jsx
try { (() => {
/* ProductCard — the unit of the product grid (F-001). Media over an optional
   `category` eyebrow + title on the left with the price right-aligned on the same
   row. Pass a `media` node (e.g. an <image-slot> or <img>) for the image, or a
   `src`; with neither it renders a tonal placeholder. Sold-out dims + badges it. */

function ProductCard({
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
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const titleStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "var(--fs-item, var(--size-item-lg))",
    color: "var(--text-strong)",
    textDecoration: hover ? "underline" : "none",
    textUnderlineOffset: "0.25em"
  };
  const eyebrowStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "var(--size-xs)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    color: "var(--text-meta)",
    marginBottom: "var(--space-1)"
  };
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      textDecoration: "none",
      color: "var(--text-strong)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "3 / 4",
      overflow: "hidden",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-raised)",
      marginBottom: "var(--space-3)"
    }
  }, media ? media : src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: hover ? "scale(1.03)" : "scale(1)",
      transition: "transform var(--dur-slow) var(--ease-out)"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase"
    }
  }, title), soldOut && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "var(--space-3)",
      left: "var(--space-3)",
      background: "var(--surface-page)",
      color: "var(--text-strong)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      padding: "var(--space-1) var(--pad-pill-y)",
      borderRadius: "var(--radius-sm)"
    }
  }, "Sold Out")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, category && /*#__PURE__*/React.createElement("span", {
    style: eyebrowStyle
  }, category), /*#__PURE__*/React.createElement("span", {
    style: {
      ...titleStyle,
      display: "block"
    }
  }, title)), price != null && /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: price,
    currency: currency,
    compareAt: compareAt,
    size: "md",
    style: {
      flexShrink: 0,
      textAlign: "right"
    }
  })));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/module/QuantityStepper.jsx
try { (() => {
/* SHER quantity stepper — the − N + control on cart line items and the product
   page. Controlled or uncontrolled; clamps to [min, max]. */

function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  // "sm" | "md"
  disabled = false,
  className = "",
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const val = value != null ? value : internal;
  const set = n => {
    const clamped = Math.max(min, Math.min(max, n));
    if (value == null) setInternal(clamped);
    onChange && onChange(clamped);
  };
  const dim = size === "sm" ? 30 : 38;
  const btn = (dir, name, dis) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": dir,
    disabled: dis || disabled,
    onClick: () => set(val + (dir === "increase" ? 1 : -1)),
    style: {
      width: dim,
      height: dim,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      background: "transparent",
      color: "var(--text-strong)",
      cursor: dis || disabled ? "not-allowed" : "pointer",
      opacity: dis || disabled ? 0.3 : 1,
      transition: "opacity var(--dur-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size === "sm" ? 14 : 16
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-page)",
      ...style
    }
  }, btn("decrease", "minus", val <= min), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: dim,
      textAlign: "center",
      fontFamily: "var(--font-body)",
      fontSize: size === "sm" ? "var(--size-sm)" : "var(--size-base)",
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums"
    }
  }, val), btn("increase", "plus", val >= max));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/layout/Cart.jsx
try { (() => {
/* C-Cart — Cart Drawer (F-005 Cart Management, F-006 Checkout).
   Slides from the right. Line items (image, name, options, stepper, price, remove),
   a subtotal, and a Checkout handoff. Shows an empty state when there are no items. */

function Cart({
  open = false,
  onClose,
  headingLevel = 2,
  items = [],
  currency = "USD",
  onQuantityChange,
  onRemove,
  onCheckout,
  className = "",
  style = {}
}) {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const empty = items.length === 0;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur-med) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("aside", {
    className: "sher-band " + className,
    "aria-label": "Your cart",
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      width: "min(92vw, 420px)",
      background: "var(--surface-page)",
      boxShadow: "var(--shadow-drawer)",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform var(--dur-med) var(--ease-out)",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-5)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-title",
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, "Your Cart"), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close cart",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 24
  }))), empty ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-4)",
      padding: "var(--space-6)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bag",
    size: 40,
    style: {
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-meta)"
    }
  }, "Your cart is empty."), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    as: "a",
    href: "/shop",
    onClick: onClose
  }, "Continue Shopping")) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: "flex",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 96,
      background: "var(--surface-raised)",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      flexShrink: 0
    }
  }, it.image && /*#__PURE__*/React.createElement("img", {
    src: it.image,
    alt: it.name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-base)",
      color: "var(--text-strong)"
    }
  }, it.name), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: `Remove ${it.name}`,
    size: 28,
    onClick: () => onRemove && onRemove(it.id)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "trash",
    size: 16,
    style: {
      color: "var(--text-muted)"
    }
  }))), it.options && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-sm)",
      color: "var(--text-meta)",
      marginTop: 2
    }
  }, it.options), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "auto",
      paddingTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.QuantityStepper, {
    size: "sm",
    value: it.quantity,
    onChange: q => onQuantityChange && onQuantityChange(it.id, q)
  }), /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: it.price * it.quantity,
    currency: currency,
    size: "sm"
  })))))), !empty && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)",
      padding: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-nav)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)"
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: subtotal,
    currency: currency,
    size: "md"
  })), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    fullWidth: true,
    onClick: onCheckout
  }, "Checkout"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      textAlign: "center",
      fontSize: "var(--size-xs)",
      color: "var(--text-meta)",
      letterSpacing: "var(--tracking-item)"
    }
  }, "Checkout securely in USD, powered by Shopify"))));
}
Object.assign(__ds_scope, { Cart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Cart.jsx", error: String((e && e.message) || e) }); }

// components/module/SizeSelector.jsx
try { (() => {
/* SizeSelector — the product page's size chips. Sold-out sizes render disabled
   with a struck label; the selected chip inverts to the dark fill. Controlled
   (`value`/`onChange`) or uncontrolled. */

function SizeSelector({
  sizes = [],
  value,
  defaultValue,
  onChange,
  label = "Size",
  className = "",
  style = {}
}) {
  const first = sizes.find(s => !s.soldOut);
  const [internal, setInternal] = React.useState(defaultValue ?? (first ? first.label : null));
  const val = value !== undefined ? value : internal;
  const set = s => {
    if (s.soldOut) return;
    if (value === undefined) setInternal(s.label);
    onChange && onChange(s.label);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": label,
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)"
    }
  }, sizes.map(s => {
    const active = s.label === val;
    return /*#__PURE__*/React.createElement("button", {
      key: s.label,
      type: "button",
      disabled: s.soldOut,
      "aria-pressed": active,
      "aria-label": s.soldOut ? `${s.label} — sold out` : s.label,
      onClick: () => set(s),
      style: {
        minWidth: 48,
        minHeight: 44,
        padding: "0 var(--space-3)",
        fontFamily: "var(--font-button)",
        textTransform: "uppercase",
        fontSize: "var(--size-xs)",
        letterSpacing: "var(--tracking-label)",
        border: "1px solid " + (active ? "var(--surface-inverse)" : "var(--border-strong)"),
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--surface-inverse)" : "transparent",
        color: active ? "var(--text-on-inverse)" : "var(--text-strong)",
        textDecoration: s.soldOut ? "line-through" : "none",
        opacity: s.soldOut ? 0.35 : 1,
        cursor: s.soldOut ? "not-allowed" : "pointer",
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)"
      }
    }, s.label);
  })));
}
Object.assign(__ds_scope, { SizeSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/SizeSelector.jsx", error: String((e && e.message) || e) }); }

// components/layout/ProductPanel.jsx
try { (() => {
/* ProductPanel — the product page's main band (S-006): the media gallery beside
   the purchase column (breadcrumb, name, price, description, type attribute, size,
   quantity, buy buttons, and the size-chart / shipping drawer links). Stacks to one
   column below 768px via a CSS container query on its OWN width. When every size
   is sold out the buy buttons swap to a Preorder link. Set `stacked` to keep the
   band one column at every width. */

function ProductPanel({
  breadcrumb = [],
  name,
  headingLevel = 1,
  price,
  compareAt,
  currency = "USD",
  description,
  attributeLabel,
  // e.g. "Closure Type"
  attributeValue,
  // e.g. "Lace Closure"
  sizes = [],
  size,
  onSize,
  quantity,
  onQuantity,
  media = [],
  onAddToCart,
  onBuyNow,
  onSizeChart,
  onShipping,
  preorderHref = "/contact",
  stacked = false,
  className = "",
  style = {}
}) {
  const allSoldOut = sizes.length > 0 && sizes.every(s => s.soldOut);
  const linkStyle = {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: "var(--size-sm)",
    color: "var(--text-strong)",
    textDecoration: "underline",
    textUnderlineOffset: "0.25em",
    textAlign: "left"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sher-band " + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-productpanel" + (stacked ? " stacked" : "")
  }, /*#__PURE__*/React.createElement(__ds_scope.MediaGallery, {
    media: media
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, breadcrumb.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.Breadcrumb, {
    items: breadcrumb
  }), /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-hero",
    style: {
      margin: 0,
      maxWidth: "24ch",
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, name), price != null && /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: price,
    compareAt: compareAt,
    currency: currency,
    size: "lg"
  }), sizes.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.SizeSelector, {
    sizes: sizes,
    value: size,
    onChange: onSize
  }), !allSoldOut && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.QuantityStepper, {
    value: quantity,
    onChange: onQuantity
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, allSoldOut ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    as: "a",
    href: preorderHref,
    variant: "primary",
    size: "lg",
    fullWidth: true
  }, "Preorder") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "surface",
    size: "lg",
    fullWidth: true,
    onClick: onAddToCart
  }, "Add to Cart"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    onClick: onBuyNow
  }, "Buy Now"))), (description || attributeValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      paddingTop: "var(--space-2)"
    }
  }, description && /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)",
      maxWidth: "56ch"
    }
  }, description), attributeValue && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-sm)",
      color: "var(--text-meta)"
    }
  }, attributeLabel ? `${attributeLabel}: ` : "", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)"
    }
  }, attributeValue))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      paddingTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkStyle,
    onClick: onSizeChart
  }, "View Size Chart"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkStyle,
    onClick: onShipping
  }, "Shipping & Returns")))));
}
Object.assign(__ds_scope, { ProductPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ProductPanel.jsx", error: String((e && e.message) || e) }); }

// components/module/ViewToggle.jsx
try { (() => {
/* ViewToggle — F-003 Grid View Toggle. A compact segmented control that switches
   the product grid's density (fewer vs more columns). Each option renders a glyph
   of N vertical bars indicating its column count. Controlled or uncontrolled. */

const DEFAULT_OPTIONS = [{
  key: "comfortable",
  barsMobile: 1,
  barsDesktop: 2,
  label: "Larger cards"
}, {
  key: "compact",
  barsMobile: 2,
  barsDesktop: 3,
  label: "Smaller cards"
}];

// bars beyond the mobile count are hidden below the desktop breakpoint by a
// container query on the toggle's OWN container (tokens/components.css), so the
// glyph mirrors the grid's column count at every size.
function Bars({
  mobile,
  desktop,
  active
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 2,
      alignItems: "stretch",
      height: 14
    }
  }, Array.from({
    length: desktop
  }).map((_, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    className: k >= mobile ? "vt-bar-extra" : undefined,
    style: {
      width: 3,
      borderRadius: 1,
      background: active ? "var(--text-on-inverse)" : "var(--text-strong)"
    }
  })));
}
function ViewToggle({
  value,
  defaultValue,
  options = DEFAULT_OPTIONS,
  onChange,
  className = "",
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? options[0].key);
  const val = value != null ? value : internal;
  const set = k => {
    if (value == null) setInternal(k);
    onChange && onChange(k);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Grid view",
    className: "sher-viewtoggle " + className,
    style: {
      display: "inline-flex",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      ...style
    }
  }, options.map(o => {
    const active = o.key === val;
    return /*#__PURE__*/React.createElement("button", {
      key: o.key,
      type: "button",
      "aria-label": o.label,
      title: o.label,
      "aria-pressed": active,
      onClick: () => set(o.key),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 34,
        border: "none",
        cursor: "pointer",
        padding: 0,
        background: active ? "var(--surface-inverse)" : "transparent",
        transition: "background var(--dur-fast) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement(Bars, {
      mobile: o.barsMobile,
      desktop: o.barsDesktop,
      active: active
    }));
  }));
}
Object.assign(__ds_scope, { ViewToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/module/ViewToggle.jsx", error: String((e && e.message) || e) }); }

// components/layout/ProductGrid.jsx
try { (() => {
/* ProductGrid — the results band of a shop / category page: a toolbar (result
   count + grid ViewToggle) over a responsive grid of ProductCards.
   Column counts come from ONE prop: `columns`, a "mobile/tablet/desktop" string
   passed to CSS as --cols-sm/-md/-lg and resolved by container queries on the
   grid's OWN width (tablet ≥640, desktop ≥1024), so it matches wherever it's
   placed. The toolbar's toggle reports via `onView`; the page decides which
   `columns` string to pass back for each state.
   While the toolbar is scrolled out of view a floating copy of the ViewToggle
   sticks to the bottom-left of the scrollport (`floatingToggle`, on by default).
   It uses position:sticky + a capture-phase scroll listener, so it works in any
   scroll container without knowing about the page chrome. */

const triple = v => {
  const parts = String(v ?? "").split("/").map(s => parseInt(s, 10));
  const f = [1, 1, 2];
  return [0, 1, 2].map(i => Number.isFinite(parts[i]) ? parts[i] : f[i]);
};
function ProductGrid({
  products = [],
  columns = "1/1/2",
  label = "pieces",
  count,
  onView,
  showToolbar = true,
  floatingToggle = true,
  pageSize,
  loadMoreLabel = "Load More",
  endMark = "none",
  emptyMessage = "No pieces match this filter yet.",
  className = "",
  style = {}
}) {
  const [toggle, setToggle] = React.useState("comfortable");
  const setV = k => {
    setToggle(k);
    onView && onView(k);
  };
  const ref = React.useRef(null);
  const toolbarRef = React.useRef(null);
  const [floatVisible, setFloatVisible] = React.useState(false);

  // find the nearest scrolling ancestor so we can compare against ITS edges
  const scrollportRect = () => {
    let el = ref.current && ref.current.parentElement;
    while (el && el !== document.body) {
      const o = getComputedStyle(el).overflowY;
      if (o === "auto" || o === "scroll") return el.getBoundingClientRect();
      el = el.parentElement;
    }
    return {
      top: 0,
      bottom: window.innerHeight
    };
  };
  React.useEffect(() => {
    if (!floatingToggle || !showToolbar) return;
    const check = () => {
      const tb = toolbarRef.current,
        root = ref.current;
      if (!tb || !root) return;
      const sp = scrollportRect();
      const scrolledPastToolbar = tb.getBoundingClientRect().bottom <= sp.top;
      // hide before it can park on (and overlap) the grid's last row
      const gridStillInView = root.getBoundingClientRect().bottom > sp.bottom + 72;
      setFloatVisible(scrolledPastToolbar && gridStillInView);
    };
    // capture phase catches scroll from ANY ancestor scroller (scroll doesn't bubble)
    document.addEventListener("scroll", check, true);
    window.addEventListener("resize", check);
    check();
    return () => {
      document.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
  }, [floatingToggle, showToolbar]);
  const [cSm, cMd, cLg] = triple(columns);
  const n = count != null ? count : products.length;

  // paged reveal: show `pageSize` at a time, growing by pageSize per click
  const [shown, setShown] = React.useState(pageSize || 0);
  React.useEffect(() => {
    setShown(pageSize || 0);
  }, [pageSize, products.length]);
  const paged = pageSize ? products.slice(0, shown) : products;
  const remaining = pageSize ? Math.max(0, products.length - shown) : 0;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "sher-band " + className,
    style: {
      "--cols-sm": cSm,
      "--cols-md": cMd,
      "--cols-lg": cLg,
      ...style
    }
  }, showToolbar && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      marginBottom: "var(--space-5)",
      borderBottom: "1px solid var(--border-default)",
      paddingBottom: "var(--space-4)"
    },
    ref: toolbarRef
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-xs)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, n, " ", label), /*#__PURE__*/React.createElement(__ds_scope.ViewToggle, {
    value: toggle,
    onChange: setV
  })), products.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      padding: "var(--space-8) 0",
      textAlign: "center",
      color: "var(--text-meta)"
    }
  }, emptyMessage) : /*#__PURE__*/React.createElement("div", {
    className: "sher-productgrid"
  }, paged.map(p => /*#__PURE__*/React.createElement(__ds_scope.ProductCard, {
    key: p.id,
    title: p.title,
    price: p.price,
    compareAt: p.compareAt,
    soldOut: p.soldOut,
    href: p.href,
    media: p.media,
    category: p.category
  }))), pageSize && products.length > 0 && (remaining > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    onClick: () => setShown(s => s + pageSize)
  }, loadMoreLabel)) : endMark === "rule" ?
  /*#__PURE__*/
  // end of the collection: a short centred rule terminates the grid
  React.createElement("hr", {
    "aria-hidden": "true",
    style: {
      marginTop: "var(--space-8)",
      marginBottom: 0,
      marginLeft: "auto",
      marginRight: "auto",
      width: 64,
      border: 0,
      borderTop: "1px solid var(--border-strong)"
    }
  }) : endMark === "mark" ?
  /*#__PURE__*/
  // end of the collection: a diamond knocked out of a tapered hairline
  React.createElement("div", {
    "aria-hidden": "true",
    className: "sher-endmark",
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 1,
      width: 220,
      background: "linear-gradient(90deg,transparent,var(--border-strong) 22%,var(--border-strong) 78%,transparent)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: 6,
      height: 6,
      background: "var(--text-strong)",
      transform: "rotate(45deg)",
      boxShadow: "0 0 0 4px var(--surface-page)"
    }
  })) : endMark === "monogram" ?
  /*#__PURE__*/
  // end of the collection: the SHER mark between two outward-fading rules
  React.createElement("div", {
    "aria-hidden": "true",
    className: "sher-endmark",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 1,
      width: 140,
      background: "linear-gradient(90deg,transparent,var(--border-default))"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "mark",
    size: 13,
    style: {
      opacity: 0.45,
      flexShrink: 0
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 1,
      width: 140,
      background: "linear-gradient(90deg,var(--border-default),transparent)"
    }
  })) : null), floatingToggle && showToolbar && products.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: "var(--space-5)",
      height: 0,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      opacity: floatVisible ? 1 : 0,
      transform: floatVisible ? "translateY(0)" : "translateY(8px)",
      pointerEvents: floatVisible ? "auto" : "none",
      transition: "opacity var(--dur-med) var(--ease-out), transform var(--dur-med) var(--ease-out)",
      background: "var(--surface-page)",
      padding: "var(--space-2)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-raised)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ViewToggle, {
    value: toggle,
    onChange: setV
  }))));
}
Object.assign(__ds_scope, { ProductGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ProductGrid.jsx", error: String((e && e.message) || e) }); }

// components/layout/RelatedProducts.jsx
try { (() => {
/* RelatedProducts — the "You May Also Like" band (S-006): a heading, subtitle and
   an actions row BESIDE a small grid of same-category products, per the PRD
   outline's `(text) | Product Grid`. The actions row holds the Back to Category
   button plus any `children` passed alongside it, side by side or one per row
   (`actionsLayout`), with the back button's fill set by `backVariant`. Stacked, one
   `actionsMeasure` cap on the row keeps every button the same width. Stacks below 768px via a CSS
   container query on the band's own width — no JS measurement. */

function RelatedProducts({
  heading = "You May Also Like",
  headingLevel = 2,
  subtitle,
  backLabel,
  backHref,
  products = [],
  columns = "1/2/2",
  backVariant = "secondary",
  actionsLayout = "row",
  actionsMeasure = "34ch",
  children,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sher-band " + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "sher-related"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Heading, {
    level: headingLevel,
    className: "t-section",
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)",
      fontWeight: 400
    }
  }, heading), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--text-default)",
      lineHeight: "var(--leading-normal)",
      maxWidth: "40ch"
    }
  }, subtitle), backLabel && backHref || children ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-2)",
      // "stack" puts one button per row, each filling the text column
      flexDirection: actionsLayout === "stack" ? "column" : "row",
      alignItems: actionsLayout === "stack" ? "stretch" : "center",
      alignSelf: actionsLayout === "stack" ? "stretch" : "auto",
      // one cap on the row keeps both buttons exactly the same width
      maxWidth: actionsLayout === "stack" ? actionsMeasure : undefined,
      flexWrap: actionsLayout === "stack" ? "nowrap" : "wrap"
    }
  }, backLabel && backHref && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    as: "a",
    href: backHref,
    variant: backVariant,
    fullWidth: actionsLayout === "stack"
  }, backLabel), children) : null), /*#__PURE__*/React.createElement(__ds_scope.ProductGrid, {
    products: products,
    columns: columns,
    showToolbar: false
  })));
}
Object.assign(__ds_scope, { RelatedProducts });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/RelatedProducts.jsx", error: String((e && e.message) || e) }); }

// image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(0,0,0,.12);border-top-color:rgba(0,0,0,.45);' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "image-slot.js", error: String((e && e.message) || e) }); }

__ds_ns.Cart = __ds_scope.Cart;

__ds_ns.CategoryGrid = __ds_scope.CategoryGrid;

__ds_ns.ContactMethods = __ds_scope.ContactMethods;

__ds_ns.ContentProse = __ds_scope.ContentProse;

__ds_ns.EditorialSplit = __ds_scope.EditorialSplit;

__ds_ns.FeatureColumns = __ds_scope.FeatureColumns;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.HeroCarousel = __ds_scope.HeroCarousel;

__ds_ns.HeroCarouselStg = __ds_scope.HeroCarouselStg;

__ds_ns.HeroTitle = __ds_scope.HeroTitle;

__ds_ns.MediaGallery = __ds_scope.MediaGallery;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.ProductGrid = __ds_scope.ProductGrid;

__ds_ns.ProductPanel = __ds_scope.ProductPanel;

__ds_ns.RelatedProducts = __ds_scope.RelatedProducts;

__ds_ns.Shipping = __ds_scope.Shipping;

__ds_ns.ShopEditorial = __ds_scope.ShopEditorial;

__ds_ns.ShopFaq = __ds_scope.ShopFaq;

__ds_ns.ShopTitle = __ds_scope.ShopTitle;

__ds_ns.Sizing = __ds_scope.Sizing;

__ds_ns.Sticky = __ds_scope.Sticky;

__ds_ns.Transparent = __ds_scope.Transparent;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ButtonPill = __ds_scope.ButtonPill;

__ds_ns.Heading = __ds_scope.Heading;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.SizeSelector = __ds_scope.SizeSelector;

__ds_ns.ViewToggle = __ds_scope.ViewToggle;

})();
