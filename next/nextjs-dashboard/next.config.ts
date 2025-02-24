import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // 启用 React 严格模式（推荐）

  // 启用实验性特性（如果需要）
  experimental: {
    // appDir: true,  // 启用 appDir 特性（如果你在使用它）
    // 你可以根据需要启用更多的实验特性
  },
  typescript: {
    ignoreBuildErrors: true, // 默认不忽略 TypeScript 错误
  },
};

export default nextConfig;
