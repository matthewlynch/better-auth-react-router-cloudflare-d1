import { createAuthClient } from "better-auth/react";

let authClient: ReturnType<typeof createAuthClient>;

export function getAuthClient({
  // the base url of your auth server
  baseURL = "http://localhost:5173",
}: {
  baseURL?: string;
}) {
  if (!authClient) {
    authClient = createAuthClient({
      baseURL,
    });
  }

  return authClient;
}
