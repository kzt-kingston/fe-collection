import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import VueDevTools from "vite-plugin-vue-devtools";
import removeConsole from "vite-plugin-remove-console";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VueDevTools(),
    removeConsole(), // Remove console.log in production
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Frontend Collection",
        short_name: "FE Collection",
        description: "A collection of frontend resources",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/logo-small.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/logo-medium.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // ~ 5MB
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
