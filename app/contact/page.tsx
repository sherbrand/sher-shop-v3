import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SHER for orders, press, and returns. Send a direct message for the fastest reply, email us for business, or use our warehouse address for returns.",
};

export default function ContactPage(): React.ReactElement {
  return (
    <main className="mx-auto max-w-[800px] px-4 pb-28 pt-32 sm:px-6">
      <h1 className="font-display-h text-[28px] text-ink">Contact Us</h1>
      <p className="mt-4 text-[18px] leading-relaxed text-ink/70">
        Reach SHER the way that suits you. Message us for a fast reply, email us for business, or
        use the address below for returns.
      </p>

      <div className="mt-14 space-y-12">
        {/* S-011.2 — direct message */}
        <section>
          <h2 className="font-display-h text-[22px] text-ink">
            Direct Message <span className="text-ink/45">— For the fastest response</span>
          </h2>
          <div className="mt-4 flex items-center gap-5 text-ink/80">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M13 22v-8h2.7l.4-3H13V9.2c0-.9.3-1.5 1.6-1.5H16V5.1C15.7 5 14.8 5 13.8 5 11.6 5 10 6.3 10 8.9V11H7.5v3H10v8h3Z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="transition-colors hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.9v2.4c-1.3 0-2.5-.4-3.5-1v5.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.5a2.9 2.9 0 1 0 2 2.8V3h2.5Z" />
              </svg>
            </a>
          </div>
        </section>

        {/* S-011.3 — email */}
        <section>
          <h2 className="font-display-h text-[22px] text-ink">
            Email <span className="text-ink/45">— For business inquiries</span>
          </h2>
          <a
            href="mailto:hello@sherbrand.co"
            className="font-ui mt-3 inline-block text-[15px] text-primary transition-colors hover:text-primary-dark"
          >
            hello@sherbrand.co
          </a>
        </section>

        {/* S-011.4 — address */}
        <section>
          <h2 className="font-display-h text-[22px] text-ink">
            Warehouse Address <span className="text-ink/45">— For product returns</span>
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink/80">
            456/49 Moo 10, T.Bangpla, A.Bangplee,
            <br />
            Samutprakarn 10540, Thailand
          </p>
        </section>
      </div>
    </main>
  );
}
