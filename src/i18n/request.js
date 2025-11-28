import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const validLocale = ['en', 'ru'].includes(locale) ? locale : 'en';
  
  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});