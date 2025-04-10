import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
// @ts-ignore
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), TanStackRouterVite({ target: 'react', autoCodeSplitting: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/dq': {
        target: 'http://nasdaq.test',
        changeOrigin: true
      },
      '/images': {
        target: 'http://nasdaq.test',
        changeOrigin: true
      },
    }
  }
})
