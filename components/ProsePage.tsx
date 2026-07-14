import type { ReactNode } from "react";

// Shared prose layout for long-form text pages (DESIGN.md "prose" container:
// 800px max-width). Used by shipping-returns, privacy-policy, terms-of-service.
export type ProseSection = { h2: string; body: ReactNode };

export function ProsePage({
  eyebrow,
  title,
  subtitle,
  sections,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  sections: ProseSection[];
}): React.ReactElement {
  return (
    <main className="mx-auto max-w-[800px] px-4 pb-28 pt-32 sm:px-6">
      {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
      <h1 className="font-display-h mt-3 text-[28px] text-ink">{title}</h1>
      {subtitle ? (
        <p className="mt-4 text-[18px] leading-relaxed text-ink/70">{subtitle}</p>
      ) : null}
      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.h2}>
            <h2 className="font-display-h text-[22px] text-ink">{s.h2}</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-ink/80">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
