'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pacifico } from 'next/font/google';
import { useTranslations, useLocale } from 'next-intl';
import { useTransition } from 'react';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin']
});

const navItems = [
  { href: '/home', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/industries', key: 'industries' },
  { href: '/services', key: 'services' }
];

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const locale = useLocale();
  const [pending, startTransition] = useTransition();

  const switchLocale = (next) => {
    if (next === locale) return;
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    startTransition(() => {
      window.location.reload();
    });
  };

  const flagBtnBase =
    'w-8 h-8 flex items-center justify-center rounded-full border text-sm transition select-none';
  const active =
    'border-blue-600 ring-2 ring-blue-300';
  const inactive =
    'border-gray-300 hover:border-blue-500';

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between px-8 py-6">
          <div
            className={`text-2xl font-bold text-black ${pacifico.className}`}
            aria-label={t('logo')}
          >
            {t('logo')}
          </div>

          <ul className="flex items-center gap-6 font-medium text-gray-700">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link href={item.href} className="inline-block">
                    <span className={isActive ? 'text-blue-600' : 'hover:text-blue-600 transition'}>
                      {t(item.key)}
                      {item.key === 'services' && ' ▾'}
                    </span>
                  </Link>
                </li>
              );
            })}

            {/* Language flags as continuation of nav */}
            <li>
              <button
                disabled={pending}
                onClick={() => switchLocale('en')}
                aria-label={t('langEn')}
                className={`${flagBtnBase} ${locale === 'en' ? active : inactive}`}
              >
                <span role="img" aria-hidden="true">🇬🇧</span>
              </button>
            </li>
            <li>
              <button
                disabled={pending}
                onClick={() => switchLocale('ru')}
                aria-label={t('langRu')}
                className={`${flagBtnBase} ${locale === 'ru' ? active : inactive}`}
              >
                <span role="img" aria-hidden="true">🇷🇺</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
