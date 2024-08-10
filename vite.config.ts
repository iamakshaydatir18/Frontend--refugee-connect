import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'RefugeeConnect',
        short_name: 'RefugeeConnect',
        start_url: './',
        display: 'standalone',
        background_color: '#ffffff',
        description: 'Refugee Connect Web Application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'public/images/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'public/images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'public/images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'public/images/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      // Workbox configuration for caching strategies
      workbox: {
        // Example: Cache first strategy for all assets
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|png|jpg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
              }
            }
          }
        ]
      }
    })
  ]
});
