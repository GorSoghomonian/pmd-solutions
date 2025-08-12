import { getTranslations } from 'next-intl/server';
import HeroSection from '../../components/ui/HeroSection';
import CoreServices from './CoreServices';
import IndustriesSection from './IndustriesSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import ContactCTA from './ContactCTA'; // добавлено

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t('meta.title', { default: 'Home' }),
    description: t('meta.description', { default: '' }),
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');

  const badgesFooter = (
    <div className="mt-20 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">
        {t('whyChoose.badges.title', { default: 'Our Certifications & Partnerships' })}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        <div className="flex items-center space-x-2 bg-orange-50 px-6 py-3 rounded-full">
          <i className="ri-award-fill text-orange-600 text-xl"></i>
          <span className="font-semibold text-gray-700">
            {t('whyChoose.badges.hubspot', { default: 'HubSpot Certified' })}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-6 py-3 rounded-full">
          <i className="ri-shield-check-line text-blue-600 text-xl"></i>
          <span className="font-semibold text-gray-700">
            {t('whyChoose.badges.iso', { default: 'ISO 27001' })}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-full">
          <i className="ri-verified-badge-line text-green-600 text-xl"></i>
          <span className="font-semibold text-gray-700">
            {t('whyChoose.badges.partner', { default: 'Business Plus Partner' })}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-purple-50 px-6 py-3 rounded-full">
          <i className="ri-star-line text-purple-600 text-xl"></i>
          <span className="font-semibold text-gray-700">
            {t('whyChoose.badges.topAgency', { default: 'Top Rated Agency' })}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen overflow-visible bg-black">
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
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center text-white ">
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
      <IndustriesSection i18nSection="whyChoose" button={false} footer={badgesFooter} />
      <TestimonialsSection />
      <BlogSection />
      <ContactCTA />  //
    </main>
  );
}