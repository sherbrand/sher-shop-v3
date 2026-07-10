// Tailwind CSS v4 is wired through PostCSS. No tailwind.config.js needed —
// v4 is configured in CSS (see app/globals.css).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
