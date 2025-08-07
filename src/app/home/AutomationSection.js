import Image from 'next/image';
import FeatureCard from '../../components/ui/FeatureCard';
import ActionButtons from '../../components/ui/ActionButtons';

export default function AutomationSection({ automationItems }) {
  return (
    <section className="relative mt-20 pb-20">
      <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <Image
            alt="HubSpot Implementation Service"
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
            width={800}
            height={500}
            priority
            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
          />
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
        <div className="w-full lg:w-1/2 flex flex-col gap-8 z-10">
          <h2 className="text-5xl font-bold text-gray-900 ">
            Business Automation &amp; Support
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Revolutionize your operations with intelligent automation solutions. We design and implement systems that reduce manual work, eliminate errors, and boost productivity across your organization.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            {automationItems.map((item, idx) => (
              <FeatureCard key={idx} {...item} />
            ))}
          </div>
          <ActionButtons
            buttons={[
              {
                text: "Learn More",
                href: "/services/automation",
                className:
                  "px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer",
              },
              {
                text: "Start Automation",
                href: "/contact",
                icon: "⭑",
                className:
                  "px-8 py-4 border-2 border-[#2A73DD] text-[#2A73DD] rounded-full font-semibold text-lg hover:bg-[#2A73DD] hover:text-white transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}