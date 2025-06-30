import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      // JPEG optimization
      mozjpeg: {
        quality: 75, // Quality level (0-100)
      },
      // PNG optimization
      pngquant: {
        quality: [0.6, 0.8], // Quality range
        speed: 4,
      },
      // WebP conversion and optimization
      webp: {
        quality: 75,
      },
      // GIF optimization
      gifsicle: {
        optimizationLevel: 7,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
