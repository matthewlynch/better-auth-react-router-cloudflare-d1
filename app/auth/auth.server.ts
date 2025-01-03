import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { Kysely, CamelCasePlugin } from "kysely";
import { D1Dialect } from "@noxharmonium/kysely-d1";
import type { AppLoadContext } from "react-router";

let authInstance: ReturnType<typeof betterAuth>;

export function createBetterAuth(
  database: BetterAuthOptions["database"],
  env: {
    BETTER_AUTH_SECRET: string;
    OAUTH_GITHUB_CLIENT_ID: string;
    OAUTH_GITHUB_CLIENT_SECRET: string;
  },
) {
  if (!authInstance) {
    authInstance = betterAuth({
      database,
      emailAndPassword: {
        enabled: false,
      },
      secret: env.BETTER_AUTH_SECRET,
      socialProviders: {
        github: {
          clientId: env.OAUTH_GITHUB_CLIENT_ID,
          clientSecret: env.OAUTH_GITHUB_CLIENT_SECRET,
        },
      },
    });
  }

  return authInstance;
}

export function getAuth(ctx: AppLoadContext) {
  if (!authInstance) {
    authInstance = createBetterAuth(
      {
        // This project uses D1 so we have to use an instance of Kysely.
        // You could swap this out if you're using a different database.
        db: new Kysely({
          dialect: new D1Dialect({
            database: ctx.cloudflare.env.DB,
          }),
          plugins: [
            // Drizzle schema uses snake_case so this plugin is required for
            // better-auth to talk to the database
            new CamelCasePlugin(),
          ],
        }),
        type: "sqlite",
      },
      ctx.cloudflare.env,
    );
  }

  return authInstance;
}
