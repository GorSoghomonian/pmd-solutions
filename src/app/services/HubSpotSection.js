import Image from 'next/image';
import FeatureCard from '../../components/ui/FeatureCard';
import ActionButtons from '../../components/ui/ActionButtons';
import {useTranslations} from 'next-intl';

export default function HubSpotSection({title, subtitle, items = []}) {
  const t = useTranslations('home.hubspot');
  const tCards = useTranslations('home.hubspot.cards');

  const list = Array.isArray(items) ? items : [];
  if (!list.length) return null;

  // Локализация карточек по titleKey/descriptionKey из homeItems
  const localized = list.map(it => {
    const base = it.key || it.titleKey;
    return {
      ...it,
      // icon остается как есть (React-нода <i> ...)
      title: base ? t(`cards.${base}.title`) : it.title,
      description: base ? t(`cards.${base}.desc`) : it.description
    };
  });

  return (
    <section className="relative mt-20 pb-20">
      <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mb-6">
                <span className="text-2xl text-orange-600">⚙️</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                {title || t('title')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {subtitle || t('description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {localized.map((item, idx) => {
                // Strip out key before spreading
                const { key: itemKey, ...rest } = item;
                return (
                  <FeatureCard
                    key={itemKey ?? rest.id ?? idx}
                    {...rest}
                  />
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ActionButtons
                buttons={[
                  {
                    text: t('learnMore'),
                    href: '/services/hubspot',
                    className:
                      'px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
                  },
                  {
                    text: t('getQuote'),
                    href: '/contact',
                    icon: '⭑',
                    className:
                      'px-8 py-4 border-2 border-[#2A73DD] text-[#2A73DD] rounded-full font-semibold hover:bg-[#2A73DD] hover:text-white transition-all duration-300 hover:scale-105 text-center whitespace-nowrap cursor-pointer'
                  }
                ]}
              />
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
              alt="HubSpot"
              width={800}
              height={500}
              priority
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2A73DD]/20 to-transparent rounded-2xl" />
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2A73DD]">98%</div>
                <div className="text-sm text-gray-600">{t('statSuccess')}</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">150+</div>
                <div className="text-sm text-gray-600">{t('statProjects')}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}