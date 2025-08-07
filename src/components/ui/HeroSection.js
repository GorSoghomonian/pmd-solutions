import Image from 'next/image';
import ActionButtons from '../../components/ui/ActionButtons';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-blue-600">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://readdy.ai/api/search-image?query=Modern%20business%20consulting%20office%20with%20professional%20team%20working%20on%20digital%20transformation%20projects%2C%20sleek%20workspace%20with%20multiple%20screens%20showing%20business%20analytics%20and%20automation%20tools%2C%20contemporary%20office%20environment%20with%20glass%20walls%20and%20modern%20technology%2C%20professional%20consulting%20atmosphere%20with%20clean%20minimal%20design%20and%20blue%20accent%20lighting&width=1920&height=1080&seq=services-hero-bg&orientation=landscape"
          alt="Modern business consulting office with team working on digital transformation projects, sleek workspace, business analytics, automation tools, glass walls, and blue accent lighting"
          fill
          priority
          className="object-cover opacity-40"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white">Our Servasdasdasdices</h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
          Transform your business with our comprehensive suite of consulting and automation services. From strategic planning to digital transformation, we deliver results that drive growth.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6">
          <ActionButtons
            buttons={[
              {
                text: "Get Started Today →",
                href: "/contact",
                className:
                  "group relative px-8 py-4 bg-white text-[#2A73DD] rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer",
              },
              {
                text: "Learn More About Us",
                href: "/about",
                icon: "⭑",
                className:
                  "group px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-[#2A73DD] transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2",
              },
            ]}
          />
        </div>
        <div className="mt-8 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-2xl">⌄</span>
            </div>
            <span className="animate-bounce text-white">Scroll to explore</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-end gap-2">
        <button className="bg-blue-500 rounded-full p-3 shadow-lg">
          <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M8 12h8M8 16h5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">1</span>
      </div>
    </section>
  );
}