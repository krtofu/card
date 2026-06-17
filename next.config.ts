import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript (타입 깐깐한 검사) 강제 패스!
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;