'use client';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  return (
    <footer style={{padding: '24px 0', fontSize: 14, color: '#555'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-24 flex-wrap">
        <div>&copy; {year} · {t('rights')}</div>
        <nav style={{display: 'flex', gap: 16}}>
          <a href="/privacy">{t('privacy')}</a>
          <a href="/terms">{t('terms')}</a>
        </nav>
      </div>
    </footer>
  );
}