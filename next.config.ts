import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // 忽略生产构建时的 ESLint 错误（如 no-explicit-any 等）
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略生产构建时的 TypeScript 类型错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
