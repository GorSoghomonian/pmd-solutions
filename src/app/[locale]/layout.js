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
  
  const validLocale = ['en', 'ru'].includes(locale) ? locale : 'en';

  let messages;
  try {
    messages = await import(`../../../messages/${validLocale}.json`).then(m => m.default);
  } catch (error) {
    console.error(`Failed to load messages for locale ${validLocale}:`, error);
    messages = await import(`../../../messages/en.json`).then(m => m.default);
  }
  
  return (
    <NextIntlClientProvider locale={validLocale} messages={messages}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
      />
      <Header />
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
