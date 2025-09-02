import { getTranslations } from 'next-intl/server';
import HeroSection from '../../../components/molecules/HeroSection';
import HubSpotSection from './HubSpotSection';
import AutomationSection from './AutomationSection';
import AuditSection from './AuditSection';
import ErrorBoundary from '../../../components/common/ErrorBoundary';
import { auditItems, automationItems, hubspotItems } from '../../../data/homeItems';

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: 'Services',
    description: 'Our comprehensive business solutions'
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <main className="min-h-screen">{/* убрал боковые отступы (p-10) */}
      <ErrorBoundary>
        <HeroSection
          title={t('hero.title')}
          description={t('hero.description')}
          backgroundImage="https://readdy.ai/api/search-image?query=Modern%20business%20consulting%20office%20with%20professional%20team%20working%20on%20digital%20transformation%20projects%2C%20sleek%20workspace%20with%20multiple%20screens%20showing%20business%20analytics%20and%20automation%20tools%2C%20contemporary%20office%20environment%20with%20glass%20walls%20and%20modern%20technology%2C%20professional%20consulting%20atmosphere%20with%20clean%20minimal%20design%20and%20blue%20accent%20lighting&width=1920&height=1080&seq=services-hero-bg&orientation=landscape"
          imageLink="https://readdy.ai/api/search-image?query=Modern%20business%20consulting%20office%20with%20professional%20team%20working%20on%20digital%20transformation%20projects%2C%20sleek%20workspace%20with%20multiple%20screens%20showing%20business%20analytics%20and%20automation%20tools%2C%20contemporary%20office%20environment%20with%20glass%20walls%20and%20modern%20technology%2C%20professional%20consulting%20atmosphere%20with%20clean%20minimal%20design%20and%20blue%20accent%20lighting&width=1920&height=1080&seq=services-hero-bg&orientation=landscape"
          backgroundColor="bg-blue-700"
          overlayOpacity={25}
          primaryButton={{ text: t('hero.ctaPrimary'), href: `/${locale}/contact` }}
          secondaryButton={{ text: t('hero.ctaSecondary'), href: `/${locale}/about` }}
          showScrollIndicator={true}
          minHeight="min-h-screen"
          className="pt-20"
        />
        <HubSpotSection
          locale={locale}
          title={t('hubspot.title')}
          subtitle={t('hubspot.description')}
          items={hubspotItems}
        />

      <AutomationSection
        locale={locale}
        title={t('automation.title')}
        subtitle={t('automation.description')}
        items={automationItems}
      />

      <AuditSection
        locale={locale}
        title={t('audit.title')}
        subtitle={t('audit.description')}
        items={auditItems}
      />

      <section style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>{t('cta.headline')}</h2>
        <p>{t('cta.text')}</p>
        <button>{t('cta.button')}</button>
      </section>
        </ErrorBoundary>
    </main>
  );
}
