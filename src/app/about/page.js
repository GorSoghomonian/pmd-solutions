import Image from "next/image";
import { getTranslations } from "next-intl/server"; // i18n
import HeroSection from "../../components/molecules/HeroSection"; // добавлено
import ActionButtons from "../../components/molecules/ActionButtons"; // добавлено

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

      {/* About Section */}
      <section className="bg-white text-gray-900 min-h-[500px] flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-20 py-18 relative">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Content Section */}
          <div className="flex-1">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">{t('aboutSection.title')}</h2>
              <div className='w-24 h-1 bg-[#2A73DD] transition-all duration-1000 delay-300 opacity-100 scale-x-100 my-4'></div>
              <p className="text-xl lg:text-2xl text-gray-600  transition-all duration-1000 delay-500 opacity-100 translate-y-0">
                {t('aboutSection.p1')}
              </p>
              <p className='text-lg text-gray-500 leading-relaxed transition-all duration-1000 delay-700 opacity-100 translate-y-0 my-8'>
                {t('aboutSection.p2')}
              </p>

              {/* Statistics */}
              <div>
                <ul className="mb-8 space-x-8 mt-5 flex ml-5 ">
                  <li className="flex flex-col items-center justify-center p-6">
                    <div className="flex items-center mb-2 ">
                      <span className="text-3xl font-bold text-[#2A73DD] mb-2">{t('aboutSection.values.years')}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{t('aboutSection.stats.years')}</span>
                  </li>
                  <li className="flex flex-col items-center justify-center p-6">
                    <div className="flex items-center mb-2">                      
                      <span className="text-3xl font-bold text-[#2A73DD] mb-2">{t('aboutSection.values.projects')}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{t('aboutSection.stats.projects')}</span>
                  </li>
                  <li className="flex flex-col items-center justify-center p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-3xl font-bold text-[#2A73DD] mb-2 mx-6 ">{t('aboutSection.values.satisfaction')}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{t('aboutSection.stats.satisfaction')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <div style={{ position: 'relative', width: '100%', maxWidth: 600, height: 384 }} className="rounded-2xl shadow-lg bg-white">
              <div className="overflow-hidden rounded-2xl h-full">
                <Image
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
                  alt={t('aboutSection.imageAlt')}
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                  unoptimized={false}
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white shadow-xl rounded-full w-32 h-32 flex flex-col items-center justify-center text-center z-30 opacity-95">
                <span className="text-2xl font-bold text-blue-600">{t('aboutSection.values.foundedYear')}</span>
                <span className="text-sm text-gray-500">{t('aboutSection.founded')}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 left-1/2 h-12 w-[115%] -translate-x-1/2 rounded-full bg-black/10 blur-2xl"
        ></div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-white py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4text-5xl lg:text-6xl text-[#030000] mb-6 transition-all duration-1000 opacity-100 translate-y-0">
            {t('team.title')}
          </h2>
          <div className="flex justify-center mb-8"><span className="w-24 h-1 bg-blue-600 rounded" /></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-500 opacity-100 translate-y-0 text-center mb-16">
            {t('team.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["sarah","michael","emily","david"].map(key => (
              <div key={key} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">
                <Image
                  src={
                    key === 'sarah' ? 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' :
                    key === 'michael' ? 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80' :
                    key === 'emily' ? 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80' :
                    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80'
                  }
                  alt={t(`team.members.${key}.name`, { default: key })}
                  width={400}
                  height={288}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6 w-full">
                  <h3 className="text-xl font-bold mb-1">{t(`team.members.${key}.name`, { default: key })}</h3>
                  <a href="#" className="text-blue-600 font-semibold text-sm mb-2 block">{t(`team.members.${key}.role`)}</a>
                  <p className="text-gray-600 text-sm">{t(`team.members.${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full h-14 pointer-events-none shadow-[0_12px_32px_0_rgba(34,34,34,0.13)] rounded-b-2xl"></div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-gradient-to-br from-[#0a0a13] via-[#11111a] to-black py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6 transition-all duration-1000 opacity-100 translate-y-0 text-center">
            {t('contact.title.before')} <span className="text-blue-500">{t('contact.title.highlight')}</span> {t('contact.title.after')}
          </h2>
          <p className="text-xl text-gray-200 text-center mb-12 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#18181c] rounded-2xl shadow-xl p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">{t('contact.form.title')}</h3>
              <form>
                <input type="text" placeholder={t('contact.form.name')} className="w-full mb-4 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder={t('contact.form.email')} className="w-full mb-4 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder={t('contact.form.company')} className="w-full mb-4 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea placeholder={t('contact.form.message')} className="w-full mb-6 px-4 py-3 rounded-lg bg-[#23232b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} />
                <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                  {t('contact.form.submit')} <span className="ri-send-plane-line"></span>
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-8">
              <div className="bg-[#18181c] rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('contact.info.title')}</h3>
                <div className="flex items-center mb-4">
                  <span className="ri-mail-line text-blue-500 text-2xl mr-4" />
                  <div>
                    <span className="text-gray-400 text-sm">{t('contact.info.emailLabel')}</span>
                    <div className="text-white font-semibold">{t.optional?.('contact.info.emailValue') || 'info@pmdsolutions.com'}</div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <span className="ri-phone-line text-blue-500 text-2xl mr-4" />
                  <div>
                    <span className="text-gray-400 text-sm">{t('contact.info.phoneLabel')}</span>
                    <div className="text-white font-semibold">{t.optional?.('contact.info.phoneValue') || '+1 (555) 123-4567'}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="ri-map-pin-line text-blue-500 text-2xl mr-4" />
                  <div>
                    <span className="text-gray-400 text-sm">{t('contact.info.addressLabel')}</span>
                    <div className="text-white font-semibold whitespace-pre-line">{t.optional?.('contact.info.addressValue') || '123 Business Ave, Suite 100\nNew York, NY 10001'}</div>
                  </div>
                </div>
              </div>
              <div className="bg-[#18181c] rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('contact.hours.title')}</h3>
                <div className="flex flex-col gap-2 text-white">
                  <div className="flex justify-between"><span>{t('contact.hours.weekdays')}</span><span>{t.optional?.('contact.hours.weekdaysHours') || '9:00 AM - 6:00 PM'}</span></div>
                  <div className="flex justify-between"><span>{t('contact.hours.saturday')}</span><span>{t.optional?.('contact.hours.saturdayHours') || '10:00 AM - 4:00 PM'}</span></div>
                  <div className="flex justify-between"><span>{t('contact.hours.sunday')}</span><span>{t('contact.hours.closed')}</span></div>
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