import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), tailwindcss()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), tailwindcss()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
