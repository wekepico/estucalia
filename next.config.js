/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
