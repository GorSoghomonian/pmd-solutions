import Image from "next/image";
import { getTranslations } from "next-intl/server"; // i18n
import HeroSection from "../../components/molecules/HeroSection"; // добавлено
import ActionButtons from "../../components/molecules/ActionButtons"; // добавлено
import AboutSec from "./AboutSec";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Typewriter from "../../components/molecules/TypeWriter";

// TODO: Extract all text content for i18n support
// TODO: Move team member data to external data source or CMS
// TODO: Implement proper image optimization for team photos
// TODO: Add error boundaries and loading states
// TODO: Consider lazy loading for images below the fold


export async function generateMetadata() {
  const t = await getTranslations('about');
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <main>
      <ErrorBoundary>
        <HeroSection
          title={
            <span className="text-6xl md:text-7xl lg:text-8xl font-bold">
              {t('hero.title')}
            </span>
          }
          description={
            <>
            <Typewriter
              text={t("hero.subtitle")}
              speed={80}
              className="block text-2xl md:text-3xl font-light mb-6 text-blue-200"
      />
              <span className="block text-lg md:text-xl text-blue-100">
                {t('hero.description')}
              </span>
            </>
          }
          additional={
            <>
          <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-32 right-20 w-96 h-96 bg-[#2A73DD]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-bounce"></div>
              </div>
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rotate-45 animate-spin"
                  style={{ animationDuration: "8s" }}
                />
                <div
                  className="absolute top-3/4 right-1/4 w-6 h-6 bg-[#2A73DD]/40 rounded-full animate-bounce"
                  style={{ animationDelay: "2s" }}
                />
                <div
                  className="absolute bottom-1/4 left-3/4 w-8 h-8 bg-white/20 rotate-45 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

      {/* Дополнительные анимации */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-6 h-6 bg-[#2A73DD]/40 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-3/4 w-8 h-8 bg-white/20 rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
            </>
          }
          // Градиент как раньше
          backgroundColor="bg-gradient-to-br from-[#2A73DD] via-[#1d4ed8] to-[#1746A2]"
          overlayOpacity={14}
          showScrollIndicator={false}
          minHeight="h-screen"
          primaryButton={{ text: t('hero.cta'), href: '/contact' }}
        />
        <AboutSec />
        <TeamSection />
        <ContactSection />
      </ErrorBoundary>
    </main>
  );
}