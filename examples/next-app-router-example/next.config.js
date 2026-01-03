/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@hua-labs/i18n-core",
    "@hua-labs/i18n-core-zustand",
    "@hua-labs/i18n-loaders"
  ],
};

module.exports = nextConfig;

