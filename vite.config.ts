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
      name: "Facebook",
      short_name: "Facebook",
      start_url: "/Facebook/",
      scope: "/Facebook/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#1976d2",
      description: "browse Facebook",
      screenshots: [
        {
          src: "screenshot-mobile.png",
          sizes: "960x540",
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
