import {NextIntlClientProvider} from 'next-intl';
import '../globals.css';
import Header from '../../components/organsim/Header';

export const metadata = {
  title: 'PMD Solutions',
  description: 'PMD Solutions with internationalization'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'ru'}];
}

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
  
  // Проверяем валидность локали
  const validLocale = ['en', 'ru'].includes(locale) ? locale : 'en';
  
  // Простая загрузка сообщений с обработкой ошибок
  let messages;
  try {
    messages = await import(`../../../messages/${validLocale}.json`).then(m => m.default);
  } catch (error) {
    console.error(`Failed to load messages for locale ${validLocale}:`, error);
    // Fallback на английский
    messages = await import(`../../../messages/en.json`).then(m => m.default);
  }
  
  return (
    <html lang={validLocale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
        />
      </head>
      <body style={{margin: 0}}>
        <NextIntlClientProvider locale={validLocale} messages={messages}>
          <Header />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
