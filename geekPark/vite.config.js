import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react({}), visualizer(
    {
      open: true,// 打包后自动打开页面
      gzipSize: true,// 查看 gzip 压缩大小
      brotliSize: true// 查看 brotli 压缩大小
    }
  )],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
