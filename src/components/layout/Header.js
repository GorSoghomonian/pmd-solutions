'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pacifico } from 'next/font/google';
import { useTranslations, useLocale } from 'next-intl';
import { useTransition, useState } from 'react';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin']
});

const navItems = [
  { href: '/home', key: 'home', fallback: 'Home' },
  { href: '/industries', key: 'industries', fallback: 'Industries' },
  { href: '/clients', key: 'clients', fallback: 'Clients' }, // если нет роутов — можно убрать
  { href: '/about', key: 'about', fallback: 'About' },
  { href: '/blog', key: 'blog', fallback: 'Blog' }, // если нет роутов — можно убрать
];

const servicesMenu = [
  { href: '/services', label: 'All Services' },
  { href: '/services/automation', label: 'Business Process Automation' },
  { href: '/services/hubspot', label: 'CRM Implementation' },
  { href: '/services/development', label: 'Custom Development' },
  { href: '/services/integrations', label: 'System Integrations' },
  { href: '/services/audit', label: 'Process Audit' },
];

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const locale = useLocale();
  const [pending, startTransition] = useTransition();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  const isActive = (href) => {
    if (href === '/home') return pathname === '/home';
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="px-6 py-4">
          <div className="flex items-center">
            {/* Brand */}
            <Link href="/home" className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-[#2A73DD] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className={`text-2xl transition-colors duration-300 text-[#030000]`}>
                {t('brand', { default: 'PMD Solutions' })}
              </span>
            </Link>

            {/* Right cluster */}
            <div className="ml-auto hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`font-medium transition-colors duration-300 ${
                    isActive(item.href) ? 'text-[#2A73DD]' : 'text-gray-700 hover:text-[#2A73DD]'
                  }`}
                >
                  {t(item.key, { default: item.fallback })}
                </Link>
              ))}
              {/* Services dropdown (desktop) */}
              <div className="relative group">
                <button
                  className="font-medium transition-colors duration-300 flex items-center space-x-1 text-gray-700 group-hover:text-[#2A73DD]"
                  type="button"
                >
                  <span>{t('services', { default: 'Services' })}</span>
                  <i className="ri-arrow-down-s-line transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <div className="py-2">
                    {servicesMenu.map((s, i) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`block px-4 py-3 transition-colors duration-300 cursor-pointer ${
                          i === 0
                            ? 'text-gray-700 hover:text-[#2A73DD] hover:bg-blue-50 font-semibold border-b border-gray-100'
                            : 'text-gray-700 hover:text-[#2A73DD] hover:bg-blue-50'
                        }`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* CTA */}
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-[#2A73DD] text-white rounded-xl font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A73DD] to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative flex items-center space-x-2">
                  <span>{t('getStarted', { default: 'Get Started' })}</span>
                  <i className="ri-rocket-line transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
                </div>
              </Link>
              {/* Lang */}
              <div className="flex items-center gap-2 pl-2">
                <button
                  disabled={pending}
                  onClick={() => switchLocale('en')}
                  aria-label={t('langEn', { default: 'English' })}
                  className={`${flagBtnBase} ${locale === 'en' ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300 hover:border-blue-500'}`}
                >
                  <span role="img" aria-hidden="true">🇬🇧</span>
                </button>
                <button
                  disabled={pending}
                  onClick={() => switchLocale('ru')}
                  aria-label={t('langRu', { default: 'Russian' })}
                  className={`${flagBtnBase} ${locale === 'ru' ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300 hover:border-blue-500'}`}
                >
                  <span role="img" aria-hidden="true">🇷🇺</span>
                </button>
              </div>
            </div>
            {/* Compact md row and burger grouped right */}
            <div className="ml-auto flex items-center lg:hidden gap-2">
              <div className="hidden md:flex items-center space-x-6">
                {navItems.slice(0, 5).map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`font-medium text-sm transition-all duration-300 ${
                      isActive(item.href) ? 'text-[#2A73DD]' : 'text-gray-700 hover:text-[#2A73DD]'
                    }`}
                  >
                    {t(item.key, { default: item.fallback })}
                  </Link>
                ))}
                <Link href="/services" className="font-medium text-sm transition-all duration-300 text-gray-700 hover:text-[#2A73DD]">
                  {t('services', { default: 'Services' })}
                </Link>
              </div>
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                type="button"
              >
                <i className={`text-xl transition-transform duration-300 ri-${mobileOpen ? 'close-line' : 'menu-line'} w-5 h-5 flex items-center justify-center`} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
