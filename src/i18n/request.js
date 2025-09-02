import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Проверяем, что локаль валидна
  const validLocale = ['en', 'ru'].includes(locale) ? locale : 'en';
  
  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});