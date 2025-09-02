import createMiddleware from 'next-intl/middleware';
import intlConfig from './next-intl.config';

export default createMiddleware({
  ...intlConfig,
  // Автоматический редирект с корневого пути на локализованный
  localeDetection: true
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};

