import { getTranslations } from 'next-intl/server';
import HeroSection from '../../../components/molecules/HeroSection';
import CoreServices from './CoreServices';
import IndustriesSection from './IndustriesSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import ContactCTA from './ContactCTA';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  return {
    title: t('meta.title', { default: 'Home' }),
    description: t('meta.description', { default: '' }),
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  
  const coreServicesTranslations = {
    titlePrefix: t('coreServices.titlePrefix'),
    titleAccent: t('coreServices.titleAccent'),
    subtitle: t('coreServices.subtitle'),
    learnMore: t('coreServices.learnMore'),
    viewAllServices: t('coreServices.viewAllServices'),
  };
  
  const industriesTranslations = {
    titlePrefix: t('industries.titlePrefix'),
    titleAccent: t('industries.titleAccent'),
    subtitle: t('industries.subtitle'),
  };
  
  const whyChooseTranslations = {
    titlePrefix: t('whyChoose.titlePrefix'),
    titleAccent: t('whyChoose.titleAccent'),
    subtitle: t('whyChoose.subtitle'),
  };

  return (
    <main className="min-h-screen overflow-visible bg-black">
      <ErrorBoundary>
        <HeroSection
          title={
            <>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-bold mt-14 md:mt-29">
                {t('hero.titleLine1')}
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-400">
                {t('hero.titleLine2')}
              </span>
            </>
          }
          description={
            <span className="block text-xl md:text-2xl mt-2 text-blue-100">
              {t('hero.description')}
            </span>
          }
          primaryButton={{ text: t('hero.ctaPrimary'), href: `/${locale}/services` }}
          secondaryButton={{ text: t('hero.ctaSecondary'), href: `/${locale}/about` }}
          additional={
            <>
              <div className="mt-2 md:mt-16 md:pb-10 max-w-7xl mx-auto text-center text-white">
              <div className="flex sm:grid sm:grid-cols-3 gap-8 sm:gap-32  px-4 sm:px-0">
                <div className="shrink-23 sm:shrink">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold">500+</div>
                  <div className="text-blue-200 text-base sm:text-lg">{t('stats.projects')}</div>
                </div>
                <div className="shrink-23 sm:shrink">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold">50+</div>
                  <div className="text-blue-200 text-base sm:text-lg">{t('stats.clients')}</div>
                </div>
                <div className="shrink-0 sm:shrink pr-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold">5+</div>
                  <div className="text-blue-200 text-base sm:text-lg">{t('stats.years')}</div>
                </div>
              </div>
            </div>
            </>
          }
          backgroundImage="https://readdy.ai/api/search-image?query=Modern%20professional%20business%20consulting%20office%20environment%20with%20technology%20integration%2C%20sleek%20workspace%20with%20business%20professionals%20collaborating%20on%20digital%20solutions%2C%20clean%20contemporary%20office%20space%20with%20consulting%20team%20working%20on%20business%20automation%20and%20process%20optimization%2C%20high-tech%20business%20environment%20with%20data%20visualization%20screens%20and%20modern%20furniture%2C%20professional%20consulting%20atmosphere%20with%20blue%20and%20white%20color%20scheme&width=1920&height=1080&seq=hero-bg&orientation=landscape"
          backgroundColor="bg-blue-800"
          overlayOpacity={15}
      
          showScrollIndicator={true}
          minHeight="h-screen"
          className="flex items-center justify-center pb-23 text-white"
        >


        </HeroSection>

        <CoreServices 
          locale={locale} 
          titlePrefix={coreServicesTranslations.titlePrefix}
          titleAccent={coreServicesTranslations.titleAccent}
          subtitle={coreServicesTranslations.subtitle}
        />

        <IndustriesSection 
          locale={locale}
          titlePrefix={industriesTranslations.titlePrefix}
          titleAccent={industriesTranslations.titleAccent}
          subtitle={industriesTranslations.subtitle}
        />
        <IndustriesSection 
          locale={locale} 
          i18nSection="whyChoose" 
          button={false}
          titlePrefix={whyChooseTranslations.titlePrefix}
          titleAccent={whyChooseTranslations.titleAccent}
          subtitle={whyChooseTranslations.subtitle}
        />
        <TestimonialsSection locale={locale} />
        <BlogSection locale={locale} />
        <ContactCTA locale={locale} />  
      </ErrorBoundary>
    </main>
  );
}