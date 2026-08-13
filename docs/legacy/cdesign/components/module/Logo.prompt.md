One-line: The SHER logo — monogram mark alone or the square mark+wordmark lockup — for headers, drawers, and footer.

```jsx
<Logo variant="mark" color="dark" size={40} href="/" />       {/* sticky header */}
<Logo variant="square" color="white" size={120} href="/" />   {/* transparent hero header */}
```

- `variant`: "mark" (monogram) or "square" (mark + SHER wordmark).
- `color`: black / white / dark. White mark and dark mark are toned from the black PNG via CSS filter.
- `size` is the mark height (or square width). Pass `href` to make it a link.
