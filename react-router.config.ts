import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  serverBuildFile: "index.js",
  async prerender() {
    return [];
  },
} satisfies Config;