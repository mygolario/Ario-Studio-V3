import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mrario.ir',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
    // Modern formats for smaller sizes
    formats: ['image/avif', 'image/webp'],
    // Reasonable device sizes to avoid oversized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    // Tree-shake these heavy packages
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns'],
  },
  // Compression
  compress: true,
  // Strict mode for React (catches issues early)
  reactStrictMode: true,
  // Improve production build
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
