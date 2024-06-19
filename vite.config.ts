/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import svgr from "vite-plugin-svgr";

// vitest automatically sets NODE_ENV to 'test' when running tests
const isTestEnv = process.env.NODE_ENV === "test";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    target: "esnext",
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
    !isTestEnv && TanStackRouterVite(),
    svgr({ svgrOptions: { icon: true } }),
    sentryVitePlugin({
      org: "salem-fenn-1cdc31184",
      project: "hakubun",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  define: {
    "process.env": {},
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
