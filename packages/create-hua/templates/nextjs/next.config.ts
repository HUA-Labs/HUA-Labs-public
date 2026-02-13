import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Suppress optional peer dependency warnings (e.g. lucide-react)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      { message: /Can't resolve 'lucide-react'/ },
    ];
    return config;
  },
};

export default nextConfig;
