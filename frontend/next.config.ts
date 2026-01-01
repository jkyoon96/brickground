import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // React 19 features
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.brickground.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
