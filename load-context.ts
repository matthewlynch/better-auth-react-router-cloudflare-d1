import type { PlatformProxy } from "wrangler";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./database/schema";

// `Env` is defined in worker-configuration.d.ts

type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Omit<
      PlatformProxy<Env, IncomingRequestCfProperties>,
      "dispose" | "caches"
    > & {
      caches:
        | PlatformProxy<Env, IncomingRequestCfProperties>["caches"]
        | CacheStorage;
    };
  };
};

declare module "react-router" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
  }
}

// Shared implementation compatible with Vite, Wrangler, and Cloudflare Workers
export function getLoadContext({ context }: GetLoadContextArgs) {
  const db = drizzle(context.cloudflare.env.DB, { schema });

  return {
    ...context,
    db,
  };
}
