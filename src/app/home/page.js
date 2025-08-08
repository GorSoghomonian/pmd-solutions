import { getTranslations } from 'next-intl/server';
import HeroSection from '../../components/ui/HeroSection';
import HubSpotSection from './HubSpotSection';
import AutomationSection from './AutomationSection';
import AuditSection from './AuditSection';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { auditItems, automationItems, hubspotItems } from '../../data/homeItems';

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaLabel={t('hero.cta')}
      />

      <ErrorBoundary>
        <HubSpotSection
          title={t('hubspot.title')}
          subtitle={t('hubspot.description')}
          items={hubspotItems}
          learnMoreLabel={t('hubspot.learnMore')}
          getQuoteLabel={t('hubspot.getQuote')}
          statSuccessLabel={t('hubspot.statSuccess')}
          statProjectsLabel={t('hubspot.statProjects')}
        />
      </ErrorBoundary>

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

      <section style={{padding: '60px 0', textAlign: 'center'}}>
        <h2>{t('cta.headline')}</h2>
        <p>{t('cta.text')}</p>
        <button>{t('cta.button')}</button>
      </section>
    </>
  );
}

