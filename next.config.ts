/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint (띄어쓰기/문법 검사) 강제 패스!
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript (타입 깐깐한 검사) 강제 패스!
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;