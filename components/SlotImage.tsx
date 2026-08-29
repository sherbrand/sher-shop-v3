import type { ReactElement } from "react";
import { mediaSlot } from "@/lib/slots";

/* One picture from D-004, named by its slot (F-008). The file and its alt both
   live in the slot file, so swapping an image is a data edit rather than a code
   edit, and the alt travels with the picture it describes.

   A slot with no image yet renders nothing. The band still draws its media panel,
   so an unfilled slot reads as an empty panel rather than a broken layout. */
export function SlotImage({ slot }: { slot: string }): ReactElement | null {
  const media = mediaSlot(slot);
  if (!media?.image) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
    <img
      src={media.image}
      alt={media.alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
    />
  );
}
