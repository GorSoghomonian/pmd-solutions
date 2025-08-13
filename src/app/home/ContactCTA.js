'use client';

import Link from 'next/link';
import ActionButtons from '../../components/ui/ActionButtons';
import { useTranslations } from 'next-intl';

export default function ContactCTA({ className = '' } = {}) {
  const t = useTranslations('home.contactCta');

  return (
    <section className={`relative mb-0 overflow-visible bg-black ${className}`}>
      <div
        className="relative rounded-none md:rounded-3xl overflow-hidden pt-14 pb-8 md:pb-10 bg-gradient-to-b from-[#0B0F19] to-black ring-1 ring-white/10 px-6"
      >
        {/* glow decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center text-white p-5">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
            {t('title.prefix')} <span className="text-[#2A73DD]">{t('title.accent')}</span> {t('title.suffix')}
          </h2>
          <p className="mt-6 text-lg md:text-2xl text-blue-100 p-3">
            {t('subtitle')}
          </p>

          <div className="mt-10 flex justify-center">
            <ActionButtons
              buttons={[
                {
                  text: `${t('primaryButton.label')} `,
                  href: t('primaryButton.href'),
                  variant: 'primary',
                  size: 'lg',
                  icon: <i className="ri-rocket-line ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>,
                  className:
                    'bg-[#2A73DD] hover:bg-[#1f5ec0] text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl text-lg md:text-xl font-semibold transition-all duration-200 ease-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A73DD]/40',
                },
                {
                  text: t('secondaryButton.label'),
                  href: t('secondaryButton.href'),
                  variant: 'secondary',
                  size: 'lg',
                  icon: <i className="ri-service-line ml-2 transition-transform duration-300 group-hover:rotate-12"></i>,
                  className:
                    'border border-white/60 text-white hover:bg-white/10 rounded-full px-8 py-4 text-lg md:text-xl font-semibold transition-all duration-200 ease-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                },
              ]}
              align="center"
              gap="md"
            />
          </div>

          {/* contact cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8 text-center text-white hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-900/40 text-blue-300 flex items-center justify-center mx-auto">
                <i className="ri-mail-line text-2xl" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{t('cards.email.title')}</h3>
              <p className="mt-2 text-blue-200">{t('cards.email.desc')}</p>
              <Link
                href={t('cards.email.href')}
                className="mt-4 inline-block text-[#2A73DD] hover:text-[#1f5ec0] font-semibold"
              >
                {t('cards.email.value')}
              </Link>
            </div>

            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8 text-center text-white hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-900/40 text-blue-300 flex items-center justify-center mx-auto">
                <i className="ri-phone-line text-2xl" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{t('cards.phone.title')}</h3>
              <p className="mt-2 text-blue-200">{t('cards.phone.desc')}</p>
              <Link
                href={t('cards.phone.href')}
                className="mt-4 inline-block text-[#2A73DD] hover:text-[#1f5ec0] font-semibold"
              >
                {t('cards.phone.value')}
              </Link>
            </div>

            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8 text-center text-white hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-900/40 text-blue-300 flex items-center justify-center mx-auto">
                <i className="ri-calendar-line text-2xl" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{t('cards.book.title')}</h3>
              <p className="mt-2 text-blue-200">{t('cards.book.desc')}</p>
              <Link
                href={t('cards.book.href')}
                className="mt-4 inline-block text-[#2A73DD] hover:text-[#1f5ec0] font-semibold"
              >
                {t('cards.book.value')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}