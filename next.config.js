const createNextIntlPlugin = require('next-intl/plugin');

// Подключаем request-конфиг для выбора локали из cookie
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  images: {
    // Можно использовать domains (хватает для твоих случаев)
    domains: ['readdy.ai', 'images.unsplash.com', 'localhost'],
    // Если хочешь оставить remotePatterns — раскомментируй:
    // remotePatterns: [
    //   {protocol: 'https', hostname: 'images.unsplash.com'},
    //   {protocol: 'https', hostname: 'readdy.ai'}
    // ]
  }
});