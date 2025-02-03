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
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Frontend Collection - PWA",
        short_name: "FE Collection",
        description: "A collection of frontend resources",
        start_url: "/",
        display: "standalone",
        theme_color: "#42b883",
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
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      },
    }),
    // VueDevTools(),
    removeConsole(), // Remove console.log in production
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
