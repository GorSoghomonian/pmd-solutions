import { getTranslations } from 'next-intl/server';
import ActionButtons from '../../../components/molecules/ActionButtons';

export default async function ServiceFooter({ locale }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const integrationBenefits = [
    { key: 'unified', title: 'Unified Data Flow' },
    { key: 'efficiency', title: 'Increased Efficiency' },
    { key: 'realtime', title: 'Real-time Sync' },
    { key: 'scalable', title: 'Scalable Solutions' }
  ];

  const popularIntegrations = [
    { key: 'hubspot', name: 'HubSpot', description: 'CRM & Marketing' },
    { key: 'salesforce', name: 'Salesforce', description: 'Sales Platform' },
    { key: 'slack', name: 'Slack', description: 'Team Communication' },
    { key: 'zapier', name: 'Zapier', description: 'Automation Platform' },
    { key: 'shopify', name: 'Shopify', description: 'E-commerce Platform' },
    { key: 'mailchimp', name: 'MailChimp', description: 'Email Marketing' }
  ];

  const localizedBenefits = integrationBenefits.map((benefit) => ({
    ...benefit,
    title: t(`integrations.benefits.${benefit.key}`, { default: benefit.title })
  }));

  const localizedIntegrations = popularIntegrations.map((integration) => ({
    ...integration,
    name: t(`integrations.popular.${integration.key}.name`, { default: integration.name }),
    description: t(`integrations.popular.${integration.key}.description`, { default: integration.description })
  }));

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-10 bg-blue-950"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
            <i className="ri-links-line text-white text-2xl"></i>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('integrations.title')}
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
            {t('integrations.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 items-start max-w-5xl mx-auto">
          {/* Популярные интеграции */}
          <div className="">
            <h3 className="text-2xl font-bold text-white mb-8">
              {t('integrations.popularTitle')}
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-3 w-120">
              {localizedIntegrations.map((integration) => (
                <div
                  key={integration.key}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl">🔗</span>
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1">{integration.name}</h4>
                    <p className="text-blue-200 text-xs">{integration.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Преимущества интеграций */}
          <div className="">
            <h3 className="text-2xl font-bold text-white mb-8">
              {t('integrations.benefitsTitle')}
            </h3>
            <div className="space-y-4">
              {localizedBenefits.map((benefit, index) => (
                <div key={benefit.key} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                  <span className="text-white font-medium">{benefit.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <ActionButtons
                buttons={[
                  {
                    text: t('integrations.getStarted'),
                    href: `/${locale}/contact`,
                    className: 'px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
                  },
                  {
                    text: t('integrations.learnMore'),
                    href: `/${locale}/services/integrations`,
                    className: 'px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105 text-center whitespace-nowrap cursor-pointer'
                  }
                ]}
                align="left"
                gap="md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
