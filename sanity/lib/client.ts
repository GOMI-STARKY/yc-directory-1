import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

let _client: ReturnType<typeof createClient> | null = null;

export function getClient() {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}

export const client = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return getClient()[prop as keyof ReturnType<typeof createClient>];
  },
});
