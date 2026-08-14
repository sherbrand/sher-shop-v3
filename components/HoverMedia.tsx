"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactElement } from "react";

/* F-001 grid thumbnail with hover/touch image swap. On desktop hover
   (mouseenter/leave) or a mobile/tablet touch-hold (touchstart/end) it swaps to
   the product's next image, and swaps back on leave/lift. A product with no
   second image never swaps. It lives in our own component and is passed into
   ProductCard as its `media`, so the design component stays untouched. */
export function HoverMedia({
  first,
  second,
  alt,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  first: string;
  second?: string;
  alt: string;
  sizes?: string;
}): ReactElement {
  const [swapped, setSwapped] = useState(false);
  const canSwap = Boolean(second);
  const show = (): void => {
    if (canSwap) setSwapped(true);
  };
  const hide = (): void => setSwapped(false);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={show}
      onMouseLeave={hide}
      onTouchStart={show}
      onTouchEnd={hide}
    >
      <Image
        src={first}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          swapped ? "opacity-0" : "opacity-100"
        }`}
      />
      {second && (
        <Image
          src={second}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)] ${
            swapped ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
