import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/testing/setup.ts"],
    },
    define: process.env.VITEST
      ? { "process.env": {} }
      : { global: "window", "process.env": {} },
  })
);
