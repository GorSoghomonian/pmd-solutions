'use client';
import React from 'react';
import Image from 'next/image';

export default function IndustriesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen text-white flex items-center justify-center overflow-hidden">
        {/* Задний фон — сетка картинок */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://readdy.ai/api/search-image?query=Modern%20business%20industries%20collage%20with%20real%20estate%20buildings%2C%20logistics%20trucks%2C%20retail%20stores%2C%20healthcare%20facilities%2C%20and%20service%20companies%2C%20professional%20corporate%20atmosphere%2C%20blue%20and%20white%20color%20scheme%2C%20clean%20minimalist%20design%2C%20high-tech%20business%20environment%2C%20contemporary%20architecture%20and%20technology%20integration&width=1920&height=1080&seq=hero-industries&orientation=landscape")`,
          }}
        />

        {/* Синий overlay */}
        <div className="absolute inset-0 bg-blue-800/80 z-10" />

        {/* Контент */}
        <div className="relative z-20 text-center pb-30 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <br className="hidden md:inline" />
            Industries We
            <span className="block text-6xl md:text-8xl font-extrabold">Cover</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8  max-w-3xl mx-auto">
            Specialized solutions across five core sectors, designed to transform
            <br />
            your business operations and drive sustainable growth.
          </p>

          {/* Кнопки-индустрии */}
          <div className="flex flex-wrap justify-center gap-6 text-lg mb-6">
            {[
              { label: 'Real Estate', icon: 'ri-building-line' },
              { label: 'Logistics', icon: 'ri-truck-line' },
              { label: 'Retail', icon: 'ri-store-line' },
              { label: 'Services', icon: 'ri-customer-service-line' },
              { label: 'Healthcare', icon: 'ri-hospital-line' },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <i className={`${icon} text-white text-xl`} />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="text-sm opacity-80">Scroll to explore</p>
          <div className="mt-2 animate-bounce text-white text-2xl">↓</div>
        </div>
      </section>

      {/* Real Estate Section */}
      <section
        className="bg-[#2A73DD] text-white h-screen flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-20"
      >
        <div className="w-full max-w-7xl mx-auto px-6 mt-10 flex flex-col lg:flex-row items-center gap-12">
          {/* Контент секции */}
          <div className="flex-1">
            <div className='flex items-center mb-6'>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-2xl text-white" />
              </div>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">Real Estate</h2>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 mt-5">
                We transform property management and sales processes through advanced CRM systems and automated workflows.<br className="hidden md:inline" />
                Our expertise helps real estate professionals streamline lead generation, client communication, and transaction management.
              </p>
              <ul className="mb-8 space-y-3 mt-5">
                <li className="flex items-start">
                  <i className="ri-check-line text-blue-300 mr-2 mt-1" />
                  <span>Automated lead nurturing systems that increased conversion rates by 40%</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-blue-300 mr-2 mt-1" />
                  <span>Integrated property management platforms for multi-location agencies</span>
                </li>
              </ul>
              <button className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer bg-white text-[#2A73DD] hover:bg-gray-100">
                See Case Study →
              </button>
            </div>
          </div>

          {/* Картинка через next/image */}
          <div className="flex-1 flex items-center justify-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: 600, height: 384 }} className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Real Estate Industry preview"
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                unoptimized={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
