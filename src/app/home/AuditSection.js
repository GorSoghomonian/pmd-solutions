import Image from 'next/image';
import FeatureCard from '../../components/ui/FeatureCard';
import ActionButtons from '../../components/ui/ActionButtons';

export default function AuditSection({ auditItems }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-20 flex flex-col lg:flex-row items-center gap-16">
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <div className="mb-4">
          <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full mb-6">
            <span className="text-2xl text-green-600">📷</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Business Process Audit
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed ">
            Uncover hidden opportunities for improvement with our comprehensive business process audit. We analyze your operations from top to bottom, identifying inefficiencies and providing actionable recommendations.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6 ">
          {auditItems.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </div>
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">What You'll Gain:</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-green-700 text-[15px]">
            <div>
              <div className="flex items-center gap-2 mb-1"><span>✅</span>Identify hidden inefficiencies</div>
              <div className="flex items-center gap-2 mb-1"><span>✅</span>Improve compliance standards</div>
              <div className="flex items-center gap-2 mb-1"><span>✅</span>Streamline decision-making</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1"><span>✅</span>Reduce operational costs</div>
              <div className="flex items-center gap-2 mb-1"><span>✅</span>Enhance team productivity</div>
              <div className="flex items-center gap-2 mb-1"><span>✅</span>Optimize resource allocation</div>
            </div>
          </div>
        </div>
        <ActionButtons
          buttons={[
            {
              text: "Learn More →",
              href: "/services/audit",
              className:
                "px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer",
            },
            {
              text: "Schedule Audit",
              href: "/contact",
              icon: "🗓️",
              className:
                "px-8 py-4 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105 text-center whitespace-nowrap cursor-pointer flex items-center gap-2",
            },
          ]}
        />
      </div>
      <div className="relative w-full lg:w-1/2 flex justify-center">
        <Image
          alt="Business Audit"
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
          width={800}
          height={500}
          priority
          className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
        />
        <div className="absolute top-6 right-6 bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">35%</div>
            <div className="text-sm text-gray-600">Avg. Cost Reduction</div>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">200+</div>
            <div className="text-sm text-gray-600">Audits Completed</div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">📷</span>
          </div>
        </div>
      </div>
    </section>
  );
}