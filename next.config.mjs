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
    ],
    // Modern formats for smaller sizes
    formats: ['image/avif', 'image/webp'],
    // Reasonable device sizes to avoid oversized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Optimize image caching
    minimumCacheTTL: 31536000, // 1 year
  },
  // Headers for optimal caching
  async headers() {
    return [
      {
        source: '/:path*.{jpg,jpeg,png,gif,webp,avif,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.{css,woff,woff2,ttf,otf}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  experimental: {
    // Tree-shake these heavy packages
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns'],
    // Optimize CSS bundling for better performance
    optimizeCss: true,
    // Remove legacy browser support and ES5 polyfills for smaller bundle size
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  // Compression
  compress: true,
  // Strict mode for React (catches issues early)
  reactStrictMode: true,
  // Improve production build
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
