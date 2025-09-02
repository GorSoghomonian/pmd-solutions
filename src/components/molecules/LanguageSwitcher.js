'use client';
import {useTransition} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

export default function LanguageSwitcher() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale) => {
    if (pending || locale === newLocale) return;
    
    startTransition(() => {
      // Получаем текущий путь без локали
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
      
      // Создаем новый путь с новой локалью
      const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      
      console.log('Switching from:', pathname, 'to:', newPath); // для отладки
      router.push(newPath);
    });
  };

  return (
    <div style={{
      display: 'flex', 
      gap: 8,
      padding: '8px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '8px'
    }}>
      <button 
        disabled={pending || locale === 'en'} 
        onClick={() => switchLocale('en')}
        style={{
          padding: '4px 12px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: locale === 'en' ? '#2A73DD' : 'transparent',
          color: locale === 'en' ? 'white' : '#333',
          cursor: pending || locale === 'en' ? 'not-allowed' : 'pointer',
          fontWeight: locale === 'en' ? 'bold' : 'normal'
        }}
      >
        EN
      </button>
      <button 
        disabled={pending || locale === 'ru'} 
        onClick={() => switchLocale('ru')}
        style={{
          padding: '4px 12px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: locale === 'ru' ? '#2A73DD' : 'transparent',
          color: locale === 'ru' ? 'white' : '#333',
          cursor: pending || locale === 'ru' ? 'not-allowed' : 'pointer',
          fontWeight: locale === 'ru' ? 'bold' : 'normal'
        }}
      >
        RU
      </button>
      {pending && <span style={{color: '#666'}}>Loading...</span>}
    </div>
  );
}