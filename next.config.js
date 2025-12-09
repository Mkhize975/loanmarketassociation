/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Enable SWR and other optimizations
  compress: true,
  
  // Environment variables
  env: {
    // Add your environment variables here
  },

  // Custom webpack config (if needed)
  webpack: (config, { isServer }) => {
    return config;
  },

  // Internationalization (if needed)
  i18n: {
    // locales: ['en', 'es'],
    // defaultLocale: 'en',
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Redirects (if needed)
  async redirects() {
    return [];
  },

  // Rewrites (if needed)
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
