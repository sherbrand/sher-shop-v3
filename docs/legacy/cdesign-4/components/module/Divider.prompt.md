One-line: Divider — the end/section mark that closes a band or separates one from the next, in three treatments.

```jsx
<Divider />                                   {/* mark — diamond on a tapered hairline */}
<Divider variant="monogram" />                {/* SHER mark between fading rules */}
<Divider variant="rule" />                    {/* short centred hairline */}
<Divider knockout="var(--surface-raised)" />  {/* on a tinted band */}
```

- `variant` picks the treatment; `mark` is the default. All three are built from border tokens, so they inherit the palette.
- `knockout` sets the ring colour behind the `mark` diamond — match it to the band's background or the ring will read as a light halo on a tinted section.
- Set the surrounding space with `style` (or a wrapper); the component adds no margin of its own. **C-ProductGrid** renders it for `endMark`.
