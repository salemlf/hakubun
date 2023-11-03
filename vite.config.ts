/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
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
    svgr({ svgrOptions: { icon: true } }),
    sentryVitePlugin({
      org: "salem-fenn-1cdc31184",
      project: "hakubun",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  define: {
    "process.env": {},
  },
});
