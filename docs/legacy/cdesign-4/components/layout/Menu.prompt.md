One-line: C-Menu — the left slide-in menu drawer from the hamburger: a "Shop Now" group over the categories, then Our Story / Contact / Login.

```jsx
<Menu open={menuOpen} onClose={closeMenu} onNavigate={goTo} headingLevel={2} />
```

- A link closes the drawer and navigates. Pass shopLinks / secondaryLinks to override the defaults.
- headingLevel changes the "Shop Now" tag (h1–h4) only, not its style.
- `logoHref` sets the drawer logo's link target (default `/`).
