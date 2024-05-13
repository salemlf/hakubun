import { CapacitorConfig } from "@capacitor/cli";

const baseConfig: CapacitorConfig = {
  appId: "io.hakubun.app",
  appName: "Hakubun",
  webDir: "dist",
  ios: {
    contentInset: "always",
  },
};

const config: CapacitorConfig = {
  ...baseConfig,
  ...(process.env.NODE_ENV == "dev" && {
    server: {
      url: "http://192.168.0.23:5173",
      cleartext: true,
    },
  }),
};

export default config;
