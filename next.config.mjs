/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TODO: Add your actual image domains for production
    domains: ['readdy.ai', 'images.unsplash.com'],
    // TODO: Consider adding image optimization settings
    // formats: ['image/webp', 'image/avif'],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // TODO: Add i18n configuration when implementing internationalization
  // i18n: {
  //   locales: ['en', 'es', 'fr'],
  //   defaultLocale: 'en',
  // },
  // TODO: Add security headers for production
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         // Add more security headers
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
