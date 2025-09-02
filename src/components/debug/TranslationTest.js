'use client';
import {useTranslations, useLocale} from 'next-intl';

export default function TranslationTest() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>Locale: {locale}</div>
      <div>Hero Title Line 1: {t('hero.titleLine1', {default: 'N/A'})}</div>
      <div>Hero Title Line 2: {t('hero.titleLine2', {default: 'N/A'})}</div>
      <div>Core Services Title: {t('coreServices.titleAccent', {default: 'N/A'})}</div>
    </div>
  );
}
