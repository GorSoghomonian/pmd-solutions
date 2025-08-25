import { getTranslations } from "next-intl/server";
import Image from "next/image";



export default async function AboutSec() {

    const t = await getTranslations('about');

  return (
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
                        <span className="text-sm text-gray-600 font-medium text-center">{t('aboutSection.stats.years')}</span>
                      </li>
                      <li className="flex flex-col items-center justify-center p-6">
                        <div className="flex items-center mb-2">                      
                          <span className="text-3xl font-bold text-[#2A73DD] mb-2">{t('aboutSection.values.projects')}</span>
                        </div>
                        <span className="text-sm text-gray-600 font-medium text-center">{t('aboutSection.stats.projects')}</span>
                      </li>
                      <li className="flex flex-col items-center justify-center p-6">
                        <div className="flex items-center mb-2">
                          <span className="text-3xl font-bold text-[#2A73DD] mb-2">{t('aboutSection.values.satisfaction')}</span>
                        </div>
                        <span className="text-sm text-gray-600 font-medium text-center">{t('aboutSection.stats.satisfaction')}</span>
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
  )
}