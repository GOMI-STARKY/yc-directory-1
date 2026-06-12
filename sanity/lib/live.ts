import "server-only";

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

const { sanityFetch, SanityLive: _SanityLive } = defineLive({ client });

export { sanityFetch };

export function SanityLive() {
  return null;
}
