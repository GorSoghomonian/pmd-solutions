import { getTranslations } from "next-intl/server";

export default async function ContactSection () {

  const t = await getTranslations('about');

  return (
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
  )
}