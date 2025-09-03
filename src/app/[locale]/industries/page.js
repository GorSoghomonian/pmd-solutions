import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import HeroSection from '../../../components/molecules/HeroSection';
import ActionButtons from '../../../components/molecules/ActionButtons'; // добавлено
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

// TODO: Extract industry data to external data source
// TODO: Implement i18n for all text content

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'industries' });
  return {
    title: t('meta.title', { defaultMessage: 'Industries' }),
    description: t('meta.description', { defaultMessage: '' })
  };
}

export default async function IndustriesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'industries' });

  // TODO: Extract industries data to separate file
const list = t.raw('arrList') || [];  // исправил регистр
const items = Array.isArray(list) ? list : [];
  console.log(items)
  // const industries = [
  //   { key: 'realEstate', icon: 'ri-building-line' },
  //   { key: 'logistics', icon: 'ri-truck-line' },
  //   { key: 'retail', icon: 'ri-store-line' },
  //   { key: 'services', icon: 'ri-customer-service-line' },
  //   { key: 'healthcare', icon: 'ri-hospital-line' },
  // ];

  return (
    <main>
      {/* Hero Section */}
      <ErrorBoundary>

        <HeroSection
          title={
            <>
              {t('hero.titlePart1')}
              <span className="block text-6xl md:text-8xl font-extrabold">{t('hero.titlePart2')}</span>
            </>
          }
          description={
            <>
              {t('hero.descriptionLine1')}
              {t('hero.descriptionLine2')}
            </>
          }
          additional={
            <>
            <div className="flex flex-wrap justify-center gap-6 text-lg mt-6">
            {items.map(({ key, iconClass }) => (
              <div key={key} className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <i className={`${iconClass} text-white text-xl`} />
                </div>
                <span>{t(`list.${key}`)}</span>
              </div>
            ))}
          </div>
            </>
          }
          backgroundImage="https://readdy.ai/api/search-image?query=Modern%20business%20industries%20collage%20with%20real%20estate%20buildings%2C%20logistics%20trucks%2C%20retail%20stores%2C%20healthcare%20facilities%2C%20and%20service%20companies%2C%20professional%20corporate%20atmosphere%2C%20blue%20and%20white%20color%20scheme%2C%20clean%20minimalist%20design%2C%20high-tech%20business%20environment%2C%20contemporary%20architecture%20and%20technology%20integration&width=1920&height=1080&seq=hero-industries&orientation=landscape"
          backgroundColor="bg-blue-800"
          overlayOpacity={20}
          scrollLabel={t('hero.scroll')}
          showScrollIndicator
          minHeight="h-screen"
        >
          {/* TODO: Make these functional navigation buttons instead of static display */}
        </HeroSection>

        {/* Real Estate Section */}
        <section
          className="bg-[#2A73DD] text-white h-screen flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-20"
        >
          <div className="w-full max-w-7xl mx-auto px-6 mt-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Контент секции */}
            <div className="flex-1">
              <div className='flex items-center mb-6'>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/20">
                  <i className="ri-building-line text-2xl text-white" />
                </div>
              </div>
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">{t('realEstate.title')}</h2>
                <p className="text-lg md:text-xl leading-relaxed text-white/90 mt-5">
                  {t('realEstate.paragraph1')}<br className="hidden md:inline" />
                  {t('realEstate.paragraph2')}
                </p>
                <ul className="mb-8 space-y-3 mt-5">
                  <li className="flex items-start">
                    <i className="ri-check-line text-blue-300 mr-2 mt-1" />
                    <span>{t('realEstate.bullet1')}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-blue-300 mr-2 mt-1" />
                    <span>{t('realEstate.bullet2')}</span>
                  </li>
                </ul>
                <ActionButtons
                  buttons={[
                    {
                      text: t('realEstate.cta'),
                      href: '/industries/real-estate',
                      className:
                        'px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer bg-white text-[#2A73DD] hover:bg-gray-100',
                    },
                  ]}
                />
              </div>
            </div>

            {/* Картинка через next/image */}
            <div className="flex-1 md:flex items-center justify-center sm:block hidden">
              <div style={{ position: 'relative', width: '100%', maxWidth: 600, height: 384 }} className="overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt={t('realEstate.title')}
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 600px"
                  unoptimized={false}
                />
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    </main>
  );
}
