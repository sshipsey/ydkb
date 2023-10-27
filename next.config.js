/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        port: '',
        pathname:
          '/avatar/ef952dde9c30c10e47627aff7a13e6a24b09d56d4e632c5df6d7650fee28c732',
      },
    ],
  },
};

module.exports = nextConfig;
