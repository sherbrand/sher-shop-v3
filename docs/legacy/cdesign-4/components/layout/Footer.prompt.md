One-line: C-Footer — the dark site footer on every screen: three link columns, social marks, and a copyright + policy bottom bar.

```jsx
<Footer headingLevel={2} year={2026} />
```

- Columns: Shop & Learn, More Info, Connect with Us. Pass shopLinks / infoLinks / socialLinks to override.
- Responsive: logo row / shop+more (2-across) / connect row on mobile & tablet; equal 4 columns on desktop.
- Social icons are Simple Icons brand marks (instagram / facebook / tiktok). headingLevel sets the column-heading tags only.