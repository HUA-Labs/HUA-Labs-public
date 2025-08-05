import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/translations/:path*',
        destination: '/api/translations/:path*',
      },
    ];
  },
};

export default nextConfig;
