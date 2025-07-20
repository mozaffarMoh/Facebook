import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Facebook',
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["icon.png"],
    manifest: {
      name: "X and O game",
      short_name: "XOGAME",
      start_url: "/X-and-O/",
      scope: "/X-and-O/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#1976d2",
      description: "Play Tic‑Tac‑Toe offline with Xs and Os!",
      screenshots: [
        {
          src: "screenshot-mobile.png",
          sizes: "540x960",
          type: "image/png",
          form_factor: "narrow",
          label: "Mobile overview",
        },
        {
          src: "screenshot-desktop.png",
          sizes: "1280x720",
          type: "image/png",
          form_factor: "wide",
          label: "Desktop layout",
        },
      ],
      icons: [
        {
          src: "icon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  }),],

})
