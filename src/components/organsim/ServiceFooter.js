import { useTranslations } from 'next-intl';
import { popularIntegrations, integrationBenefits } from '../../data/homeItems';
import ActionButtons from '../molecules/ActionButtons';

export default function ServiceFooter() {
  const t = useTranslations('home.integrations');

  const localizedBenefits = integrationBenefits.map((benefit) => ({
    ...benefit,
    title: t(`benefits.${benefit.key}`)
  }));

  const localizedIntegrations = popularIntegrations.map((integration) => ({
    ...integration,
    name: t(`popular.${integration.key}.name`),
    description: t(`popular.${integration.key}.description`)
  }));

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-10 bg-blue-950"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 bg-white/10 rounded-full flex items-center justify-center">
            <i className="ri-links-line text-white text-xl sm:text-2xl"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto px-1">
            {t('description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start max-w-5xl mx-auto">
          {/* Популярные интеграции */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-8">
              {t('popularTitle')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {localizedIntegrations.map((integration) => (
                <div
                  key={integration.key}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 mb-1.5 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                      <i className={`${integration.icon} text-white text-[10px] sm:text-xs`}></i>
                    </div>
                    <h4 className="text-white font-semibold text-[10px] sm:text-xs mb-0.5 leading-snug">
                      {integration.name}
                    </h4>
                    <p className="text-blue-200 text-[10px] sm:text-xs leading-tight px-0.5 line-clamp-2">
                      {integration.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Преимущества интеграций */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-8">
              {t('benefitsTitle')}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {localizedBenefits.map((benefit) => (
                <div
                  key={benefit.key}
                  className="flex items-start gap-3 p-2.5 sm:p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`${benefit.icon} text-white text-[10px] sm:text-sm`}></i>
                  </div>
                  <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                    {benefit.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ActionButtons
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center gap-4"
          buttons={[
            {
              text: t('btnLearnMore'),
              href: '/services/automation',
              className:
                'w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#2A73DD] bg-[#2A73DD] text-white rounded-full hover:bg-[#2A73DD] font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
            },
            {
              text: t('btnStart'),
              href: '/contact',
              icon: '⭑',
              className:
                'w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#2A73DD] text-[#2A73DD]  rounded-full hover:text-white hover:bg-[#2A73DD] font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
            }
          ]}
        />
      </div>
    </section>
  );
}
