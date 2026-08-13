One-line: The SHER announcement bar — the thin uppercase promo strip above both headers.

```jsx
<AnnouncementBar />
<AnnouncementBar tone="light">Complimentary tailoring on every piece</AnnouncementBar>
<AnnouncementBar tone="accent">New season · the corset edit</AnnouncementBar>
```

- Defaults to the PRD shipping message; pass children to override.
- `tone`: "dark" (inverted, default), "light" (surface tone), or "accent" (white on accent, AA).
- Text size comes from `--fs-announce` (falls back to `--size-announce-lg`); pages step it 10.5 → 11.5px at the sm breakpoint.
