'use client';
import {useTransition} from 'react';

export default function LanguageSwitcher() {
  const [pending, startTransition] = useTransition();

  const setLocale = async (locale) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div style={{display: 'flex', gap: 8}}>
      <button disabled={pending} onClick={() => setLocale('en')}>EN</button>
      <button disabled={pending} onClick={() => setLocale('ru')}>RU</button>
    </div>
  );
}