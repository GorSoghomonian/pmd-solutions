import FeatureCard from '../../../components/molecules/FeatureCard';
import ActionButtons from '../../../components/molecules/ActionButtons';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function SoftwareSection({ 
  locale,
  title, 
  subtitle, 
  items = [],
  technologies = [],
  buildItems = []
}) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const localizedTechnologies = technologies.map((tech) => ({
    ...tech,
    title: t(`softwareDevelopment.technologies.${tech.key}.title`, { default: tech.title || '' }),
    description: t(`softwareDevelopment.technologies.${tech.key}.items`, { default: tech.description || '' })
  }));

  const localizedBuildItems = buildItems.map((item) => ({
    ...item,
    title: t(`softwareDevelopment.buildItems.${item.key}`, { default: item.title || '' })
  }));

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Левая часть - изображение */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hidden md:block">
              <Image
                alt="Software Development - Developer working on multiple screens"
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                width={800}
                height={500}
                priority
                className="w-full h-[500px] object-cover"
              />
              {/* Floating icon top */}
              <div className="absolute top-6 left-6">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">💻</span>
                </div>
              </div>
              {/* Floating icon bottom */}
              <div className="absolute bottom-6 right-6">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-purple-600 text-xl">🚀</span>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - контент */}
          <div className="order-1 lg:order-2">
            <div className="mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mb-6">
                <span className="text-2xl text-purple-600">💻</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {title || t('softwareDevelopment.title')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {subtitle || t('softwareDevelopment.description')}
              </p>
            </div>

            {/* Технологии в сетке */}
            {localizedTechnologies.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {localizedTechnologies.map((tech, idx) => (
                  <FeatureCard
                    key={tech.key}
                    icon={tech.icon}
                    title={tech.title}
                    description={tech.description}
                    iconBg={tech.iconBg}
                    iconColor={tech.iconColor}
                    cardSize="sm"
                    titleFont="sm"
                    descFont="sm"
                  />
                ))}
              </div>
            )}

            {/* Что мы строим */}
            {localizedBuildItems.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('softwareDevelopment.buildHeading')}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {localizedBuildItems.map((item, idx) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <i className="ri-code-line text-purple-600 text-sm"></i>
                      <span className="text-gray-700">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопки действий */}
            <ActionButtons
              buttons={[
                {
                  text: t('softwareDevelopment.learnMore'),
                  href: `/${locale}/services/development`,
                  className: 'px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
                },
                {
                  text: t('softwareDevelopment.getQuote'),
                  href: `/${locale}/contact`,
                  icon: '🔒',
                  className: 'px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full hover:text-white hover:bg-purple-600 font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
                }
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
