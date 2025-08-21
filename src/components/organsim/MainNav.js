'use client';
import {useTranslations} from 'next-intl';

export default function MainNav() {
  const t = useTranslations('nav');
  const linkStyle = {textDecoration: 'none', color: '#222', fontSize: 14};
  const wrapStyle = {display: 'flex', gap: 20, alignItems: 'center'};

  return (
    <nav style={wrapStyle}>
      <a href="/home" style={linkStyle}>{t('home')}</a>
      <a href="/about" style={linkStyle}>{t('about')}</a>
      <a href="/services" style={linkStyle}>{t('services')}</a>
    </nav>
  );
}