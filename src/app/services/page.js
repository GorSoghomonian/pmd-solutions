import { getTranslations } from 'next-intl/server';
import HeroSection from '../../components/molecules/HeroSection';
import HubSpotSection from './HubSpotSection';
import AutomationSection from './AutomationSection';
import AuditSection from './AuditSection';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { auditItems, automationItems, hubspotItems } from '../../data/homeItems';
import SoftwareSection from './SoftwareSection';
import ServiceFooter from '../../components/organsim/ServiceFooter';

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ServicesPage() {
  const t = await getTranslations('home');

  const title = t('hero.title', { defaultMessage: '' });
  const description = t('hero.description', { defaultMessage: '' });
  const primaryCta = t('hero.ctaPrimary', { defaultMessage: '' });
  const secondaryCta = t('hero.ctaSecondary', { defaultMessage: '' });
  const scrollLbl = t('hero.scroll', { defaultMessage: '' });

  return (
    <main className="min-h-screen">{/* убрал боковые отступы (p-10) */}
      <ErrorBoundary>
        <HeroSection
          title={title || undefined}
          description={description || undefined}
          backgroundImage="https://readdy.ai/api/search-image?query=Modern%20business%20consulting%20office%20with%20professional%20team%20working%20on%20digital%20transformation%20projects%2C%20sleek%20workspace%20with%20multiple%20screens%20showing%20business%20analytics%20and%20automation%20tools%2C%20contemporary%20office%20environment%20with%20glass%20walls%20and%20modern%20technology%2C%20professional%20consulting%20atmosphere%20with%20clean%20minimal%20design%20and%20blue%20accent%20lighting&width=1920&height=1080&seq=services-hero-bg&orientation=landscape"
          imageLink="https://readdy.ai/api/search-image?query=Modern%20business%20consulting%20office%20with%20professional%20team%20working%20on%20digital%20transformation%20projects%2C%20sleek%20workspace%20with%20multiple%20screens%20showing%20business%20analytics%20and%20automation%20tools%2C%20contemporary%20office%20environment%20with%20glass%20walls%20and%20modern%20technology%2C%20professional%20consulting%20atmosphere%20with%20clean%20minimal%20design%20and%20blue%20accent%20lighting&width=1920&height=1080&seq=services-hero-bg&orientation=landscape"
          backgroundColor="bg-blue-700"
          overlayOpacity={25}
          primaryButton={primaryCta ? { text: primaryCta, href: '/contact' } : undefined}
          secondaryButton={secondaryCta ? { text: secondaryCta, href: '/services' } : undefined}
          scrollLabel={scrollLbl || undefined}
          showScrollIndicator={Boolean(scrollLbl)}
          minHeight="min-h-screen"
          className="pt-20"
        />
        <HubSpotSection
          title={t('hubspot.title')}
          subtitle={t('hubspot.description')}
          items={hubspotItems}
          learnMoreLabel={t('hubspot.learnMore')}
          getQuoteLabel={t('hubspot.getQuote')}
          statSuccessLabel={t('hubspot.statSuccess')}
          statProjectsLabel={t('hubspot.statProjects')}
        />

      <AutomationSection
        title={t('automation.title')}
        subtitle={t('automation.description')}
        items={automationItems}
      />

      <AuditSection
        title={t('audit.title')}
        subtitle={t('audit.description')}
        items={auditItems}
        gainHeading={t('audit.gainHeading')}
        gainsColumn1={[
          t('audit.gains.identify'),
          t('audit.gains.compliance'),
          t('audit.gains.decisions')
        ]}
        gainsColumn2={[
          t('audit.gains.costs'),
          t('audit.gains.productivity'),
          t('audit.gains.resources')
        ]}
        btnLearnMore={t('audit.btnLearnMore')}
        btnSchedule={t('audit.btnSchedule')}
        statCostReductionLabel={t('audit.statCostReduction')}
        statAuditsCompletedLabel={t('audit.statAuditsCompleted')}
      />
      <SoftwareSection
      />
      <ServiceFooter />
        </ErrorBoundary>
    </main>
  );
}
