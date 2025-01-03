// This file is *ONLY* used by the CLI!
// Run `pnpm authgen` to generate the drizzle auth schema found
// in ./database/auth-schema.ts when ever you make changes to your
// better auth config

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { createBetterAuth } from "./app/auth/auth.server";
import { schema } from "./database/schema";

const db = drizzle({ connection: { source: process.env.LOCAL_DB_PATH } });
const database = drizzleAdapter(db, {
  schema,
  provider: "sqlite",
  usePlural: false,
});

export const auth = createBetterAuth(database, {
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  OAUTH_GITHUB_CLIENT_ID: process.env.OAUTH_GITHUB_CLIENT_ID,
  OAUTH_GITHUB_CLIENT_SECRET: process.env.OAUTH_OAUTH_GITHUB_CLIENT_SECRET,
} as {
  BETTER_AUTH_SECRET: string;
  OAUTH_GITHUB_CLIENT_ID: string;
  OAUTH_GITHUB_CLIENT_SECRET: string;
});
