import Link from 'next/link';
import { Pacifico } from "next/font/google";
import FeatureCard from "../components/ui/FeatureCard";
import FeatureCardsSection from "../components/ui/FeatureCardsSection";
import ActionButtons from "../components/ui/ActionButtons";

// 1. Секции из первого скриншота (маленькие карточки)
const devItems = [
  {
    icon: "💻",
    title: "Frontend Development",
    description: "React, Next.js, Vue.js, Angular",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm"
  },
  {
    icon: "🖥️",
    title: "Backend Development",
    description: "Node.js, Python, .NET, PHP",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm"
  },
  {
    icon: "🗄️",
    title: "Database Solutions",
    description: "PostgreSQL, MongoDB, MySQL",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm"
  },
  {
    icon: "☁️",
    title: "Cloud Integration",
    description: "AWS, Azure, Google Cloud",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm"
  },
  {
    icon: "📱",
    title: "Mobile Development",
    description: "React Native, Flutter, iOS, Android",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm"
  },
  {
    icon: "🔗",
    title: "API Development",
    description: "RESTful APIs, GraphQL, Microservices",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm"
  },
];

// 2. Секции из второго скриншота (средние карточки)
const auditItems = [
  {
    icon: "🔍",
    title: "Process Analysis",
    description: "Deep dive into your current workflows and identify bottlenecks",
    bgColor: "#f7f9fa",
    iconBg: "bg-green-600",
    cardSize: "md"
  },
  {
    icon: "🛡️",
    title: "Compliance Review",
    description: "Ensure your processes meet industry standards and regulations",
    bgColor: "#f7f9fa",
    iconBg: "bg-green-600",
    cardSize: "md"
  },
  {
    icon: "⚡",
    title: "Efficiency Assessment",
    description: "Measure performance and identify optimization opportunities",
    bgColor: "#f7f9fa",
    iconBg: "bg-green-600",
    cardSize: "md"
  },
  {
    icon: "💡",
    title: "Recommendations",
    description: "Strategic recommendations for process improvements",
    bgColor: "#f7f9fa",
    iconBg: "bg-green-600",
    cardSize: "md"
  },
];

// 3. Секции из третьего скриншота (большие карточки)
const automationItems = [
  {
    icon: "🔄",
    title: "Workflow Automation",
    description: "Streamline repetitive tasks and business processes",
    badge: "70% Time Saved",
    badgeColor: "bg-blue-100 text-blue-700",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "md",
    descFont: "sm",
    titleFont: "sm"
  },
  {
    icon: "✉️",
    title: "Email Marketing",
    description: "Automated email campaigns and nurture sequences",
    badge: "3x Higher ROI",
    badgeColor: "bg-blue-100 text-blue-700",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "md",
    descFont: "sm",
    titleFont: "sm"
    
  },
  {
    icon: "🎧",
    title: "Customer Support",
    description: "Automated ticketing and response systems",
    badge: "50% Faster Response",
    badgeColor: "bg-blue-100 text-blue-700",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "md",
    descFont: "sm",    
    titleFont: "sm"
  },
  {
    icon: "📊",
    title: "Reporting & Analytics",
    description: "Automated data collection and insights generation",
    badge: "Real-time Insights",
    badgeColor: "bg-blue-100 text-blue-700",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "md",
    descFont: "sm"
  },
];

// 4. Секции из четвертого скриншота (большие карточки)
const hubspotItems = [
  {
    icon: "⚙️",
    title: "Custom Setup",
    description: "Tailored HubSpot configuration for your unique business needs",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "md",
    descFont: "sm"
  },
  {
    icon: "👥",
    title: "Team Training",
    description: "Comprehensive training to maximize your team's productivity",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "md",
    descFont: "sm"
  },
  {
    icon: "📈",
    title: "Performance Optimization",
    description: "Ongoing support to ensure peak system performance",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm",
    descFont: "sm"  
  },
  {
    icon: "💾",
    title: "Data Migration",
    description: "Seamless transfer of your existing data and processes",
    bgColor: "#f7f9fa",
    iconBg: "bg-blue-600",
    cardSize: "sm",
    descFont: "sm"
  },
];

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-blue-600">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20business%20consulting%20office%20with%20professional%20team%20working%20on%20digital%20transformation%20projects%2C%20sleek%20workspace%20with%20multiple%20screens%20showing%20business%20analytics%20and%20automation%20tools%2C%20contemporary%20office%20environment%20with%20glass%20walls%20and%20modern%20technology%2C%20professional%20consulting%20atmosphere%20with%20clean%20minimal%20design%20and%20blue%20accent%20lighting&width=1920&height=1080&seq=services-hero-bg&orientation=landscape"
            alt="Modern business consulting office"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        {/* Контент */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white">Our Services</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Transform your business with our comprehensive suite of consulting and automation services. From strategic planning to digital transformation, we deliver results that drive growth.
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6">
            <ActionButtons
              buttons={[
                {
                  text: "Get Started Today →",
                  href: "#",
                  className:
                    "group relative px-8 py-4 bg-white text-[#2A73DD] rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer",
                },
                {
                  text: "Learn More About Us",
                  href: "#",
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
        {/* Кнопка чата справа внизу */}
        <div className="absolute bottom-6 right-6 z-10 flex flex-col items-end gap-2">
          <button className="bg-blue-500 rounded-full p-3 shadow-lg">
            <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M8 12h8M8 16h5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">1</span>
        </div>
      </section>

      {/* HubSpot Implementation & Support Section */}
      <section className="relative mt-20 pb-20">
        {/* Темная тень по всей ширине */}
        <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левая часть */}
            <div>
              <div className="mb-8">
                <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mb-6">
                  <span className="text-2xl text-orange-600">⚙️</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  HubSpot Implementation &amp; Support
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Transform your sales and marketing operations with expert HubSpot implementation. We help businesses maximize their CRM potential through strategic setup, customization, and ongoing optimization.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {hubspotItems.map((item, idx) => (
                  <FeatureCard
                    key={idx}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    bgColor={item.bgColor}
                    iconBg={item.iconBg}
                    iconColor={item.iconColor}
                    badge={item.badge}
                    badgeColor={item.badgeColor}
                    cardSize={item.cardSize}
                    descFont={item.descFont}
                  />
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <ActionButtons
                  buttons={[
                    {
                      text: "Learn More →",
                      href: "#",
                      className:
                        "px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer",
                    },
                    {
                      text: "Get Quote",
                      href: "#",
                      icon: "⭑",
                      className:
                        "px-8 py-4 border-2 border-[#2A73DD] text-[#2A73DD] rounded-full font-semibold hover:bg-[#2A73DD] hover:text-white transition-all duration-300 hover:scale-105 text-center whitespace-nowrap cursor-pointer",
                    },
                  ]} />
              </div>
            </div>
            {/* Правая часть */}
            <div className="relative">
              <img
                alt="HubSpot Implementation Service"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2A73DD]/20 to-transparent rounded-2xl"></div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2A73DD]">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">150+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Automation & Support Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Левая часть с фото */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <img
                alt="HubSpot Implementation Service"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
              />
          {/* Пример круглых иконок поверх фото */}
          <div className="absolute top-6 left-6">
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🖥️</span>
            </div>
          </div>
          <div className="absolute bottom-6 right-6">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-blue-600 text-2xl">🔔</span>
            </div>
          </div>
        </div>
        {/* Правая часть с текстом и карточками */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <h2 className="text-5xl font-bold text-gray-900 ">
            Business Automation &amp; Support
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Revolutionize your operations with intelligent automation solutions. We design and implement systems that reduce manual work, eliminate errors, and boost productivity across your organization.
          </p>
          {/* Карточки automationItems */}
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            {automationItems.map((item, idx) => (
              <FeatureCard
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.description}
                badge={item.badge}
                badgeColor={item.badgeColor}
                bgColor={item.bgColor}
                iconBg={item.iconBg}
                cardSize={item.cardSize}
                titleFont='sm'
              />
            ))}
          </div>
          {/* Кнопки */}
          <ActionButtons
            buttons={[
              {
                text: "Learn More",
                href: "#",
                className:
                  "px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer",
              },
              {
                text: "Start Automation",
                href: "#",
                icon: "⭑",
                className:
                  "px-8 py-4 border-2 border-[#2A73DD] text-[#2A73DD] rounded-full font-semibold text-lg hover:bg-[#2A73DD] hover:text-white transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

