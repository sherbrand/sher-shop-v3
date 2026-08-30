"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

/* F-001 grid thumbnail. On desktop hover (mouseenter/leave) or a tablet and
   mobile touch-hold (touchstart/end) the card comes alive, and settles back on
   leave or lift.

   A product with a video plays it. The stream arrives in chunks, so a short
   hover downloads only the seconds it shows rather than the whole file, and
   nothing at all loads until the pointer arrives. A browser that cannot play
   the stream shows the second picture instead, which is the same swap every
   product without a video gets. So the picture path is never dead code. */

export function HoverMedia({
  first,
  second,
  stream,
  alt,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  first: string;
  /** The picture to swap to. Used when there is no stream, or none can play. */
  second?: string;
  /** HLS manifest for a product with a video. */
  stream?: string;
  alt: string;
  sizes?: string;
}): ReactElement {
  const [active, setActive] = useState(false);
  const [canStream, setCanStream] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Whether this browser plays HLS at all. Safari and Chrome on Android do;
  // Firefox does not, and falls back to the picture swap.
  useEffect(() => {
    if (!stream) return;
    const probe = document.createElement("video");
    setCanStream(probe.canPlayType("application/x-mpegURL") !== "");
  }, [stream]);

  const playing = canStream && Boolean(stream);
  const canSwap = playing || Boolean(second);

  const show = (): void => {
    if (!canSwap) return;
    setActive(true);
    const video = videoRef.current;
    if (video) void video.play().catch(() => {});
  };

  const hide = (): void => {
    setActive(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  /* Slower than the drawers and the header, which are UI moving out of the way.
     This is one picture becoming another, and at 240ms it read as a cut. */
  const FADE =
    "object-cover transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-out)]";

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
        className={`${FADE} ${active ? "opacity-0" : "opacity-100"}`}
      />
      {playing ? (
        <video
          ref={videoRef}
          src={stream}
          muted
          loop
          playsInline
          // Nothing loads until the pointer arrives, so a grid of cards costs
          // no video bytes to scroll past.
          preload="none"
          poster={first}
          aria-hidden
          className={`absolute inset-0 h-full w-full ${FADE} ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        second && (
          <Image
            src={second}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className={`${FADE} ${active ? "opacity-100" : "opacity-0"}`}
          />
        )
      )}
    </div>
  );
}
