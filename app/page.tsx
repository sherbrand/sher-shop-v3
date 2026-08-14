import type { ReactElement } from "react";

/* Placeholder home. A dark full-viewport hero band so the transparent header
   reads correctly and has something to hand off from on scroll. The real hero
   carousel, category tiles, and featured products are build step B-008. */
export default function HomePage(): ReactElement {
  return (
    <main>
      <section className="flex min-h-screen items-center justify-center bg-[var(--surface-inverse)] px-[var(--gutter)] text-center">
        <div className="flex flex-col items-center gap-[var(--space-4)]">
          <h1 className="text-[length:var(--size-display)] text-[var(--text-on-inverse)]">
            SHER
          </h1>
          <p className="max-w-[46ch] text-[var(--text-on-inverse)] opacity-80">
            Modern womenswear. The store is on its way.
          </p>
        </div>
      </section>
    </main>
  );
}
