import FeatureCard from "./FeatureCard";
import Image from "next/image";

export default function FeatureCardsSection({ items }) {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left side */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            HubSpot Implementation <br />& Support
          </h2>
          <p className="text-gray-700 text-lg mb-10">
            Transform your sales and marketing operations with expert HubSpot implementation. We help businesses maximize their CRM potential through strategic setup, customization, and ongoing optimization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {items.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-md">
              Learn More →
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
              Get Quote 💬
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="relative lg:w-1/2">
          <Image
            src="/images/hubspot-screen.png"
            alt="Dashboard"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
          <div className="absolute top-4 right-4 bg-white shadow-md px-4 py-2 rounded-lg text-center">
            <p className="text-blue-600 font-bold text-xl">98%</p>
            <p className="text-sm text-gray-500">Success Rate</p>
          </div>
          <div className="absolute bottom-4 left-4 bg-white shadow-md px-4 py-2 rounded-lg text-center">
            <p className="text-orange-600 font-bold text-xl">150+</p>
            <p className="text-sm text-gray-500">Projects Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
