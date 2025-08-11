import { getTranslations } from 'next-intl/server';
import HeroSection from '../../components/ui/HeroSection';
import CoreServices from './CoreServices';
import IndustriesSection from './IndustriesSection';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t('meta.title', { defaultMessage: 'Home' }),
    description: t('meta.description', { defaultMessage: '' }),
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <main className="min-h-screen">
      <HeroSection
        title={
          <>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">
              {t('hero.titleLine1')}
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold">
              {t('hero.titleLine2')}
            </span>
          </>
        }
        description={
          <span className="block text-xl md:text-2xl text-blue-100">
            {t('hero.description')}
          </span>
        }
        backgroundImage="https://readdy.ai/api/search-image?query=Modern%20professional%20business%20consulting%20office%20environment%20with%20technology%20integration%2C%20sleek%20workspace%20with%20business%20professionals%20collaborating%20on%20digital%20solutions%2C%20clean%20contemporary%20office%20space%20with%20consulting%20team%20working%20on%20business%20automation%20and%20process%20optimization%2C%20high-tech%20business%20environment%20with%20data%20visualization%20screens%20and%20modern%20furniture%2C%20professional%20consulting%20atmosphere%20with%20blue%20and%20white%20color%20scheme&width=1920&height=1080&seq=hero-bg&orientation=landscape"
        backgroundColor="bg-blue-800"
        overlayOpacity={15}
        decorations={
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
          </>
        }
        primaryButton={{ text: t('hero.ctaPrimary'), href: '/services' }}
        secondaryButton={{ text: t('hero.ctaSecondary'), href: '/about' }}
        showScrollIndicator={true}
        minHeight="h-screen"
        className="flex items-center justify-center pb-10"
      >
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center text-white">
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">500+</div>
            <div className="text-blue-200 text-lg">{t('stats.projects')}</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">50+</div>
            <div className="text-blue-200 text-lg">{t('stats.clients')}</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">5+</div>
            <div className="text-blue-200 text-lg">{t('stats.years')}</div>
          </div>
        </div>
      </HeroSection>

      {/* Core Services */}
      <CoreServices />

      {/* Industries We Serve (по умолчанию из переводов) */}
      <IndustriesSection />

      {/* Why Choose PMD Solutions (весь текст из messages, данные карточек из homeItems) */}
      <IndustriesSection i18nSection="whyChoose" />
    </main>
  );
}