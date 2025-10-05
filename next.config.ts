/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ข้ามการตรวจ ESLint ตอน build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ ข้าม TypeScript error ด้วย
  },
};

export default nextConfig;
