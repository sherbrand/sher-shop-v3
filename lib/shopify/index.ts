// ============================================================
//  Single Storefront API wrapper.
//  RULE: every Shopify GraphQL call goes through shopifyFetch().
//        No direct fetch() to Shopify anywhere else.
//  RULE: server-side only. NEVER import this into a 'use client' component
//        — it reads the secret token from process.env.
//  Queries live in ./queries, mutations in ./mutations (added as needed).
// ============================================================

// Read config from the environment (server-side). See .env.example.
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN; // e.g. "sher-9551.myshopify.com"
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN; // secret — server only

// Shopify releases a new API version each quarter (YYYY-MM).
// TODO: confirm the latest stable version in the Shopify dev docs before launch.
const API_VERSION = "2025-07";

export type ShopifyFetchArgs = {
  query: string;
  variables?: Record<string, unknown>;
  // Next.js data-cache controls for RSC fetching.
  cache?: RequestCache;
  tags?: string[]; // use with revalidateTag() after mutations
};

type ShopifyGraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

// Typed wrapper. Callers pass the expected data shape as <T>. No `any`.
export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: ShopifyFetchArgs): Promise<T> {
  // Fail loud when env is missing, so setup mistakes surface immediately.
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "[shopify] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN — check .env.local",
    );
  }

  const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;
  console.log(`[shopify] POST ${endpoint}`); // debug log

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Storefront API auth. The token never leaves the server.
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags ? { next: { tags } } : {}),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[shopify] HTTP ${res.status}: ${body}`);
    throw new Error(`[shopify] Storefront API HTTP ${res.status}`);
  }

  const json = (await res.json()) as ShopifyGraphQLResponse<T>;

  if (json.errors?.length) {
    console.error("[shopify] GraphQL errors:", JSON.stringify(json.errors));
    throw new Error(`[shopify] GraphQL error: ${json.errors[0]?.message ?? "unknown"}`);
  }

  return json.data as T;
}
