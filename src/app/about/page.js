import Image from "next/image";
import { getTranslations } from "next-intl/server"; // i18n
import HeroSection from "../../components/ui/HeroSection"; // добавлено
import ActionButtons from "../../components/ui/ActionButtons"; // добавлено

// TODO: Extract all text content for i18n support
// TODO: Move team member data to external data source or CMS
// TODO: Implement proper image optimization for team photos
// TODO: Add error boundaries and loading states
// TODO: Consider lazy loading for images below the fold
// TODO: Use a consistent button component across the site

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
      {/* Hero Section */}
      {/* TODO: Extract hero component for reuse across pages */}
      <HeroSection
        title={
          <span className="text-6xl md:text-7xl lg:text-8xl font-bold">
            {t('hero.title')}
          </span>
        }
        description={
          <>
            <span className="block text-2xl md:text-3xl font-light mb-6 text-blue-200">
              {t('hero.subtitle')}
            </span>
            <span className="block text-lg md:text-xl text-blue-100">
              {t('hero.description')}
            </span>
          </>
        }
        // Градиент как раньше
        backgroundColor="bg-gradient-to-br from-[#2A73DD] via-[#1d4ed8] to-[#1746A2]"
        overlayOpacity={0}
        showScrollIndicator={false}
        minHeight="h-screen"
        primaryButton={{ text: t('hero.cta'), href: '/contact' }}
      />

      {/* TODO: Extract to reusable two-column layout component */}
      {/* TODO: Make statistics data configurable */}
      <section className="bg-white text-gray-900 min-h-[500px] flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-20 py-25 relative">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Content Section */}
          <div className="flex-1">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">{t('aboutSection.title')}</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mt-5">
                {t('aboutSection.p1')}
                <br className="hidden md:inline" />
                {t('aboutSection.p2')}
              </p>

              {/* Statistics - TODO: Make data-driven and easily updatable */}
              <ul className="mb-8 space-x-8 mt-5 flex ml-5">
                <li className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <i className="ri-check-line text-blue-600 mr-2 mt-1" />
                    <span className="text-xl font-bold text-blue-600">23+</span>
                  </div>
                  <span className="text-sm text-gray-700">{t('aboutSection.stats.years')}</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <i className="ri-check-line text-blue-600 mr-2 mt-1" />
                    <span className="text-xl font-bold text-blue-600">500+</span>
                  </div>
                  <span className="text-sm text-gray-700">{t('aboutSection.stats.projects')}</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <i className="ri-check-line text-blue-600 mr-2 mt-1" />
                    <span className="text-xl font-bold text-blue-600">98%</span>
                  </div>
                  <span className="text-sm text-gray-700">{t('aboutSection.stats.satisfaction')}</span>
                </li>
              </ul>
              {/* TODO: Replace with ActionButtons component */}
              {/* Используем ActionButtons для CTA */}
              <ActionButtons
                buttons={[
                  {
                    text: t('aboutSection.cta'),
                    href: '/about',
                    className:
                      'px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer bg-[#2A73DD] text-white hover:bg-blue-700',
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: 600, height: 384 }} className="overflow-hidden rounded-2xl shadow-lg bg-white">
              {/* Using Next.js Image component for optimization */}
              <Image
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
                alt={t('aboutSection.imageAlt')}
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                unoptimized={false}
              />

              <div className="absolute bottom-[-40px] right-[-40px] bg-white shadow-xl rounded-full w-36 h-36 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-blue-600">2000</span>
                <span className="text-sm text-gray-500">{t('aboutSection.founded')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 w-full h-8 pointer-events-none shadow-[0_8px_24px_0_rgba(34,34,34,0.10)] rounded-b-2xl"></div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-white py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4text-5xl lg:text-6xl text-[#030000] mb-6 transition-all duration-1000 opacity-100 translate-y-0">
            {t('team.title')}
          </h2>
          <div className="flex justify-center mb-8">
            <span className="w-24 h-1 bg-blue-600 rounded" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-500 opacity-100 translate-y-0 text-center mb-12">
            {t('team.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
                alt="Sarah Johnson"
                className="w-full h-72 object-cover"
              />
              <div className="p-6 w-full">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <a href="#" className="text-blue-600 font-semibold text-sm mb-2 block">{t('team.members.sarah.role')}</a>
                <p className="text-gray-600 text-sm">{t('team.members.sarah.desc')}</p>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"
                alt="Michael Chen"
                className="w-full h-72 object-cover"
              />
              <div className="p-6 w-full">
                <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
                <a href="#" className="text-blue-600 font-semibold text-sm mb-2 block">{t('team.members.michael.role')}</a>
                <p className="text-gray-600 text-sm">{t('team.members.michael.desc')}</p>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80"
                alt="Emily Rodriguez"
                className="w-full h-72 object-cover"
              />
              <div className="p-6 w-full">
                <h3 className="text-xl font-bold mb-1">Emily Rodriguez</h3>
                <a href="#" className="text-blue-600 font-semibold text-sm mb-2 block">{t('team.members.emily.role')}</a>
                <p className="text-gray-600 text-sm">{t('team.members.emily.desc')}</p>
              </div>
            </div>
            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80"
                alt="David Kim"
                className="w-full h-72 object-cover"
              />
              <div className="p-6 w-full">
                <h3 className="text-xl font-bold mb-1">David Kim</h3>
                <a href="#" className="text-blue-600 font-semibold text-sm mb-2 block">{t('team.members.david.role')}</a>
                <p className="text-gray-600 text-sm">{t('team.members.david.desc')}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Тень у нижней границы секции */}
        <div className="absolute left-0 bottom-0 w-full h-14 pointer-events-none shadow-[0_12px_32px_0_rgba(34,34,34,0.13)] rounded-b-2xl"></div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-gradient-to-br from-[#0a0a13] via-[#11111a] to-black py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6 transition-all duration-1000 opacity-100 translate-y-0 text-center">
            {t('contact.title.before')} <span className="text-blue-500">{t('contact.title.highlight')}</span> {t('contact.title.after')}
          </h2>
          <p className="text-xl text-gray-200 text-center mb-12 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-[#18181c] rounded-2xl shadow-xl p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">{t('contact.form.title')}</h3>
              <form>
                <input
                  type="text"
                  placeholder={t('contact.form.name')}
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder={t('contact.form.email')}
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder={t('contact.form.company')}
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder={t('contact.form.message')}
                  className="w-full mb-6 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                >
                  {t('contact.form.submit')} <span className="ri-send-plane-line"></span>
                </button>
              </form>
            </div>
            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div className="bg-[#18181c] rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('contact.info.title')}</h3>
                <div className="flex items-center mb-4">
                  <span className="ri-mail-line text-blue-500 text-2xl mr-4" />
                  <div>
                    <span className="text-gray-400 text-sm">{t('contact.info.emailLabel')}</span>
                    <div className="text-white font-semibold">info@pmdsolutions.com</div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <span className="ri-phone-line text-blue-500 text-2xl mr-4" />
                  <div>
                    <span className="text-gray-400 text-sm">{t('contact.info.phoneLabel')}</span>
                    <div className="text-white font-semibold">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="ri-map-pin-line text-blue-500 text-2xl mr-4" />
                  <div>
                    <span className="text-gray-400 text-sm">{t('contact.info.addressLabel')}</span>
                    <div className="text-white font-semibold">
                      123 Business Ave, Suite 100<br />New York, NY 10001
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#18181c] rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('contact.hours.title')}</h3>
                <div className="flex flex-col gap-2 text-white">
                  <div className="flex justify-between">
                    <span>{t('contact.hours.weekdays')}</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.hours.saturday')}</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.hours.sunday')}</span>
                    <span>{t('contact.hours.closed')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Тень у верхней границы секции */}
        <div className="absolute top-0 left-0 w-full h-24 pointer-events-none shadow-[0_-8px_24px_0_rgba(34,34,34,0.10)] rounded-t-2xl"></div>
      </section>
    </main>
  );
}