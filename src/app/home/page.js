'use client';

import { useTranslations } from 'next-intl';
import Head from 'next/head';
import HeroSection from '../../components/ui/HeroSection';
import HubSpotSection from './HubSpotSection';
import AutomationSection from './AutomationSection';
import AuditSection from './AuditSection';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { devItems, auditItems, automationItems, hubspotItems } from '../../data/homeItems';

export default function Home() {
  const t = useTranslations(); // Ключи верхнего уровня из JSON

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content={t('keywords')} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <main>
        <ErrorBoundary>
          <HeroSection />
          <h1>{t('title')}</h1>
          <HubSpotSection hubspotItems={hubspotItems} />
          <AutomationSection automationItems={automationItems} />
          <AuditSection auditItems={auditItems} />
        </ErrorBoundary>
      </main>
    </>
  );
}

