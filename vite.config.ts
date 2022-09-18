import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/auth": {
        ws: true,
        changeOrigin: true,
        target: "https://ff1d-87-247-67-226.ngrok.io/",
      },
    },
  },
});
