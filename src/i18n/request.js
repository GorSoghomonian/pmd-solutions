import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies(); // ВАЖНО: await
  const cookieLocale = cookieStore.get('locale')?.value;
  const locale = (cookieLocale === 'ru' || cookieLocale === 'en') ? cookieLocale : 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});