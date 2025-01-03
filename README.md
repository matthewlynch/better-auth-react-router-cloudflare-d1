# Better Auth + Drizzle + React Router on Cloudflare Workers with D1

This repo was generated from the [`react-router-cloudflare-d1` template](https://github.com/matthewlynch/react-router-cloudflare-d1)

You can start a react-router project from this repo by running:

```
npx create-react-router@latest --template matthewlynch/better-auth-react-router-cloudflare-d1
```

## Getting Started

1. Run `cp .dev-example.vars .dev.vars` to create an .env file you can use to override variables defined in `wrangler.toml` or set secret values you don't want to check into source control
2. Update the `name` field in `wranlger.toml`
3. Install dependencies `pnpm install`
4. Create a database by running [`wrangler d1 create <name>`](https://developers.cloudflare.com/d1/wrangler-commands/#d1-create) and update `wranlger.toml` with the UUID and name for the database
5. Add your GitHub OAuth Client ID/Secret & optionally your Cloudflare Account ID/Database UUID/Token to `.dev.vars` (you only need this when you want to view data via Drizzle Studio for your remote database)
6. Run `pnpm typegen` any time you make changes to `wranlger.toml` to ensure types from bindings and module rules are up to date for type safety
7. Run `pnpm db:warm` to ensure wrangler has created a local database
8. Run `pnpm db:migrate` to apply the migration files to your local database
9. Run `pnpm dev` to start the app

## Better Auth config

1. Make changes to the `better-auth` config in `./app/auth/auth.server.ts`
2. Run `pnpm auth:db:generate` to create the `better-auth` drizzle schema file `./database/auth-schema.ts` 
3. Run `pnpm db:generate` to create migration files
4. Run `pnpm db:migrate` to apply the migration files to your local database

---

Built with ❤️ by [Matt](https://mattlynch.dev)
