import { getTranslations } from "next-intl/server";
import Image from "next/image";



export default async function TeamSection({ locale }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
      <section className="bg-white py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4text-5xl lg:text-6xl text-[#030000] mb-6 transition-all duration-1000 opacity-100 translate-y-0 ">
            {t('team.title')}
          </h2>
          <div className="flex justify-center mb-8"><span className="w-24 h-1 bg-blue-600 rounded" /></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-500 opacity-100 translate-y-0  text-center mb-16">
            {t('team.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center mx-auto">
            {["sarah","michael","emily","david"].map(key => (
              <div key={key} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center md:w-auto w-95  mx-auto">
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
  )
}