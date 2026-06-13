import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

function getWriteClient() {
  const c = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
  if (!c.config().token) {
    throw new Error("Write token not found.");
  }
  return c;
}

let _writeClient: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_writeClient) {
    _writeClient = getWriteClient();
  }
  return _writeClient;
}

export const writeClient = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    const client = getClient();
    const value = client[prop as keyof ReturnType<typeof createClient>];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
