import Image from 'next/image';
import ActionButtons from '../../../components/molecules/ActionButtons';
import { getTranslations } from 'next-intl/server';
import FeatureCard from '../../../components/molecules/FeatureCard';

export default async function AutomationSection({ locale, title, subtitle, badge, items = [] }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return null;

  const localized = list.map((it, idx) => {
    const key = it.key || it.titleKey;
    return {
      ...it,
      title: t(`automation.cards.${key}.title`, { default: it.title || '' }),
      description: t(`automation.cards.${key}.desc`, { default: it.description || '' }),
      badge: it.badge ? t(`automation.cards.${it.badge}`, { default: it.badge || '' }) : it.badge,
      iconHtml: it.icon || '' 
    };
  });

  return (
    <section className="relative pt-20 pb-20 bg-[#f7f9fa]">
      <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="relative w-full lg:w-1/2 sm:flex justify-center hidden md:block">
          <Image
            alt="Automation"
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
            width={800}
            height={500}
            priority
            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute top-6 left-6">
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🖥️</span>
            </div>
          </div>
          <div className="absolute bottom-6 right-6">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-blue-600 text-2xl">🔔</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-8 z-10">
          <h2 className="text-5xl font-bold text-gray-900 ">
            {title || t('title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {subtitle || t('description')}
          </p>
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
                          {localized.map((item, idx) => {
                            const { key: itemKey, ...rest } = item;
                            return (
                              <FeatureCard
                                key={itemKey ?? rest.id ?? idx}
                                {...rest}
                              />
                            );
                          })}
                        </div>
          </div>
          <ActionButtons
            buttons={[
              {
                text: t('automation.btnLearnMore'),
                href: `/`,
                className:
                  'px-8 py-4 border-2 border-[#2A73DD] bg-[#2A73DD] text-white rounded-full hover:bg-[#2A73DD] font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
              },
              {
                text: t('automation.btnStart'),
                href: '/',
                icon: '⭑',
                className:
                  'px-8 py-4 border-2 border-[#2A73DD] text-[#2A73DD]  rounded-full hover:text-white hover:bg-[#2A73DD] font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
              }
            ]}
          />
        </div>
      </div>
    </section>
  );
}