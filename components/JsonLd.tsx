import type { ReactElement } from "react";
import type { JsonLdData } from "@/lib/seo";

/* Server-rendered JSON-LD (F-009). Emits a <script type="application/ld+json">
   into the page's server markup, so crawlers read it without running any JS.
   The data is our own (never user input), and we escape "<" so a value can
   never close the script tag early. */
export function JsonLd({ data }: { data: JsonLdData }): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
