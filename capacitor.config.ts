import { CapacitorConfig } from "@capacitor/cli";

const baseConfig: CapacitorConfig = {
  appId: "io.hakubun.app",
  appName: "Hakubun",
  webDir: "dist",
};

const config: CapacitorConfig = {
  ...baseConfig,
  ...(process.env.NODE_ENV == "dev" && {
    server: {
      url: "http://192.168.0.23:5173",
      cleartext: true,
    },
    ios: {
      contentInset: "always",
    },
  }),
};

export default config;
