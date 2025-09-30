/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /cli\/.*/,
      use: 'ignore-loader'
    });
    return config;
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig; 