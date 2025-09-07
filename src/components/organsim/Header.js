'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Pacifico } from 'next/font/google';
import { useTranslations, useLocale } from 'next-intl';
import { useTransition, useState, useEffect } from 'react';

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

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const locale = useLocale();
  const [pending, startTransition] = useTransition();

  const servicesMenu = t.raw('servicesMenu');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { 
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const switchLocale = (newLocale) => {
    if (pending || locale === newLocale) return;
    
    startTransition(() => {

      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

      const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      
      router.push(newPath);
    });
  };

  const flagBtnBase =
    'w-8 h-8 flex items-center justify-center rounded-full border text-sm transition select-none';
  const active =
    'border-[#2A73DD] ring-2 ring-[#2A73DD]/40';
  const inactive =
    'border-gray-300 hover:border-[#2A73DD]';

  const isActive = (href) => {
    const localizedHref = `/${locale}${href}`;
    if (href === '/home') return pathname === localizedHref;
    return pathname?.startsWith(localizedHref);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="px-6 py-4">
          <div className="flex items-center">
            {/* Brand */}
            <Link href={`/${locale}/home`} className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-[#002A93] rounded-lg flex items-center justify-center">
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
                  href={`/${locale}${item.href}`}
                  className={`font-medium transition-colors duration-300 ${
                    isActive(item.href) ? 'text-[#002A93]' : 'text-gray-700 hover:text-[#2A73DD]'
                  }`}
                >
                  {t(item.key, { default: item.fallback })}
                </Link>
              ))}
              {/* Services dropdown (desktop) */}
              <div className="relative group">
                <button
                  className="font-medium transition-colors duration-300 flex items-center space-x-1 text-gray-700 group-hover:text-[#2A73DD] "
                  type="button"
                >
                  <span>{t('services', { default: 'Services' })}</span>
                  <i className="ri-arrow-down-s-line transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 z-12 w-64 bg-white rounded-xl shadow-2xl border  border-gray-100 transition-all duration-300 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <div className="py-2">
                    {servicesMenu?.map((s, i) => (
                      <Link
                        key={`${s.href}-${i}`}
                        href={`/${locale}${s.href}`}
                        className={`block px-4 py-3 transition-colors duration-300 cursor-pointer ${
                          i === 0
                            ? 'text-gray-700 hover:text-[#2A73DD] hover:bg-[#B0C1D6]/30 font-semibold border-b border-gray-100'
                            : 'text-gray-700 hover:text-[#2A73DD] hover:bg-[#B0C1D6]/30'
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
                className="group relative px-8 py-4 bg-[#002A93] text-white rounded-xl font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A73DD] to-[#002A93] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
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
                  className={`${flagBtnBase} ${locale === 'en' ? 'border-royalBlue ring-2 ring-royalBlue/40' : 'border-gray-300 hover:border-royalBlue'}`}
                >
                  <span role="img" aria-hidden="true">🇬🇧</span>
                </button>
                <button
                  disabled={pending}
                  onClick={() => switchLocale('ru')}
                  aria-label={t('langRu', { default: 'Russian' })}
                  className={`${flagBtnBase} ${locale === 'ru' ? 'border-royalBlue ring-2 ring-royalBlue/40' : 'border-gray-300 hover:border-royalBlue'}`}
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
                    href={`/${locale}${item.href}`}
                    className={`font-medium text-sm transition-all duration-300 ${
                      isActive(item.href) ? 'text-[#002A93]' : 'text-gray-700 hover:text-[#2A73DD]'
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

      {/* Mobile overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-white min-h-[100dvh] ${mobileOpen ? 'block pointer-events-auto' : 'hidden pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile drawer */}
      <aside
        id="mobile-menu"
        className={`fixed inset-0 z-[70] w-full bg-white min-h-[100dvh] flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/home" className="flex items-center space-x-3" onClick={() => setMobileOpen(false)}>
            <div className="w-9 h-9 shrink-0 bg-[#002A93] bg-royalBlue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">{t('brand', { default: 'PMD Solutions' })}</span>
          </Link>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        {/* Scrollable content that fills the remaining height */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-2">
            <ul className="px-2 space-y-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#B0C1D6]/30 text-[#002A93] font-semibold'
                        : 'text-slate-800 hover:bg-[#B0C1D6]/20'
                    }`}
                  >
                    {t(item.key, { default: item.fallback })}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-800 hover:bg-[#B0C1D6]/20 hover:text-[#002A93]"
                >
                  <span>{t('services', { default: 'Services' })}</span>
                  <i className={`ri-arrow-down-s-line transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`${mobileServicesOpen ? 'block' : 'hidden'} pl-2`}>
                  {servicesMenu?.map((s, i) => (
                    <Link
                      key={`${s.href}-${i}`}
                      href={`/${locale}${s.href}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-5 py-2.5 rounded-lg text-slate-700 hover:text-[#002A93] hover:bg-[#B0C1D6]/20"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>

            <div className="px-4 py-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-xl text-white font-semibold shadow-xl bg-gradient-to-r from-[#2A73DD] to-[#002A93] hover:from-[#2A73DD]/90 hover:to-[#002A93]/90 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
              >
                {t('getStarted', { default: 'Get Started' })} <i className="ri-rocket-line ml-1"></i>
              </Link>
            </div>

            <div className="px-4 pb-6 flex items-center gap-2">
              <button
                disabled={pending}
                onClick={() => switchLocale('en')}
                aria-label={t('langEn', { default: 'English' })}
                className={`${flagBtnBase} ${locale === 'en' ? active : inactive}`}
              >
                <span role="img" aria-hidden="true">🇬🇧</span>
              </button>
              <button
                disabled={pending}
                onClick={() => switchLocale('ru')}
                aria-label={t('langRu', { default: 'Russian' })}
                className={`${flagBtnBase} ${locale === 'ru' ? active : inactive}`}
              >
                <span role="img" aria-hidden="true">🇷🇺</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </header>
  );
}
