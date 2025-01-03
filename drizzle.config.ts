import type { Config } from "drizzle-kit";

const LOCAL_DB_PATH = process.env.LOCAL_DB_PATH;

export default LOCAL_DB_PATH
  ? ({
      schema: "./database/schema.ts",
      dialect: "sqlite",
      dbCredentials: {
        url: LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      schema: "./database/schema.ts",
      out: "./drizzle",
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_TOKEN!,
      },
    } satisfies Config);
