'use client';
import {useTranslations} from 'next-intl';

export default function HomeExtra() {
  const tHome = useTranslations('home');
  const tNav = useTranslations('nav');

  return (
    <div>
      <h1>{tHome('headline')}</h1>
      <p>{tHome('welcomeUser', {name: 'Alex'})}</p>
      <p>{tHome('items', {count: 1})}</p>
      <p>{tHome('items', {count: 3})}</p>
      <nav>
        <a href="/home">{tNav('home')}</a>
      </nav>
    </div>
  );
}