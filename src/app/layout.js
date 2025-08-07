// app/layout.js
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import Header from '../components/layout/Header';
import './globals.css';

import { Geist, Geist_Mono, Pacifico } from 'next/font/google';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'], variable: '--font-pacifico' });

export const metadata = {
  title: 'PMD Solutions',
  description: 'Leading consulting firm',
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
