import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.xml"],
  server: {
    port: 8080,
    open: true,
  },
});
