import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = 'en'; // или логика выбора по cookies/headers

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});