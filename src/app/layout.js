// app/layout.js
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import './globals.css';
import Header from '../components/layout/Header';

export const metadata = {
  title: 'App',
  description: 'App with next-intl (no routing mode)'
};

export default async function RootLayout({children}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
        />
      </head>
      <body style={{margin: 0}}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
