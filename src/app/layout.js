import { Geist, Geist_Mono, Pacifico } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header'; 

// Font configurations - consider extracting to a separate fonts config file for better organization
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'], variable: '--font-pacifico' });

// TODO: Make metadata dynamic for i18n support
export const metadata = {
  title: 'PMD Solutions',
  description: 'Leading consulting firm',
};

export default function RootLayout({ children }) {
  return (
    // TODO: Make lang attribute dynamic for i18n support
    <html lang="en">
      <head>
        {/* TODO: Consider moving external font links to next.config.js or use Next.js font optimization */}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}>
        {/* Global header component - consider adding Footer component here as well */}
        <Header /> 
        {children}
      </body>
    </html>
  );
}
