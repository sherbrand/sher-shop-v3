import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our SHER Brand",
  description:
    "Meet the SHER brand: sensual, refined womenswear built by hand from real corsetry. Read our philosophy and the story of founder Sherilyn.",
};

// Brand-tone placeholder for imagery until real photography is wired.
function Placeholder(): React.ReactElement {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #f3efec 0%, #ded6ce 100%)" }}
      />
    </div>
  );
}

export default function AboutPage(): React.ReactElement {
  return (
    <>
      {/* S-010.1 — intro */}
      <section className="mx-auto max-w-[800px] px-4 pb-16 pt-32 sm:px-6">
        <p className="eyebrow text-primary">About Us</p>
        <h1 className="font-display-h mt-3 text-[32px] text-ink sm:text-[38px]">Our SHER Brand</h1>
        <p className="mt-6 text-[18px] leading-relaxed text-ink/80">
          The SHER brand makes womenswear that is sensual and refined. We believe sensuality
          should lift a woman up, never cheapen her. Every piece is built by hand, one at a time,
          on real corsetry. Corset tops, matching sets, and cocktail dresses that shape the body
          and read elegant. We started SHER because premium, well-made sensual clothing was hard
          to find, so we make it ourselves.
        </p>
      </section>

      {/* S-010.2 — Image | Philosophy */}
      <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <Placeholder />
          <div>
            <p className="eyebrow text-primary">Our Philosophy</p>
            <h2 className="font-display-h mt-3 text-[24px] text-ink">Sensuality That Elevates</h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-ink/80">
              Sensual does not have to mean cheap. That line sits at the center of everything we
              make. We design clothes that show off the body with control, not with excess. The cut
              hints instead of shouts. The fit flatters instead of clings. A SHER piece makes a woman
              feel bold and sure of herself, and it reads elegant to everyone else. That is
              sensuality that elevates.
            </p>
          </div>
        </div>
      </section>

      {/* S-010.3 — Founder | Image */}
      <section className="mx-auto max-w-[1200px] px-4 py-14 pb-24 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="md:order-2">
            <Placeholder />
          </div>
          <div className="md:order-1">
            <p className="eyebrow text-primary">Meet the Founder</p>
            <h2 className="font-display-h mt-3 text-[24px] text-ink">The Woman Behind It, Sherilyn</h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-ink/80">
              Sherilyn founded SHER to make the sensual, well-built clothing she could not find for
              herself. She leads the design of every piece, from the cut of a corset top to the drape
              of a dress. Her standard is simple: it has to look elegant, feel strong, and last. That
              standard runs through the whole SHER brand.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
