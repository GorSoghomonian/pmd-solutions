import Link from 'next/link';
import ActionButtons from '../../components/ui/ActionButtons';
import Image from 'next/image';

export default function CoreServices() {
  const services = [
    {
      id: 'bpa',
      title: 'Business Process Automation',
      desc:
        'Streamline workflows and reduce manual work with intelligent automation solutions tailored to your business needs.',
      image:
        'https://readdy.ai/api/search-image?query=Modern%20business%20process%20automation%20workflow%20with%20digital%20systems%20and%20automated%20processes%2C%20clean%20technological%20interface%20showing%20workflow%20optimization%20and%20efficiency%20improvement%2C%20professional%20automation%20dashboard%20with%20interconnected%20processes%20and%20data%20flows%2C%20streamlined%20business%20operations%20with%20digital%20transformation%20elements&width=400&height=300&seq=automation-service&orientation=landscape',
      href: '/services/automation',
      iconBg: 'bg-blue-50 text-blue-600',
      iconClass: 'ri-flow-chart text-blue-600 text-2xl',
    },
    {
      id: 'crm',
      title: 'CRM Implementation',
      desc:
        'Expert HubSpot setup and optimization to enhance your sales, marketing, and customer service operations.',
      image:
        'https://readdy.ai/api/search-image?query=Professional%20CRM%20implementation%20with%20HubSpot%20dashboard%20interface%2C%20modern%20customer%20relationship%20management%20system%20showing%20sales%20analytics%20and%20customer%20data%2C%20clean%20business%20software%20interface%20with%20CRM%20tools%20and%20customer%20management%20features%2C%20professional%20sales%20team%20using%20CRM%20platform%20for%20business%20growth&width=400&height=300&seq=crm-service&orientation=landscape',
      href: '/services/crm',
      iconBg: 'bg-orange-50 text-orange-600',
      iconClass: 'ri-customer-service-line text-orange-600 text-2xl',
    },
    {
      id: 'custom',
      title: 'Custom Development',
      desc:
        'Bespoke software solutions designed specifically for your unique business requirements and challenges.',
      image:
        'https://readdy.ai/api/search-image?query=Custom%20software%20development%20workspace%20with%20developers%20creating%20tailored%20business%20solutions%2C%20modern%20programming%20environment%20with%20multiple%20monitors%20showing%20code%20and%20applications%2C%20professional%20software%20engineering%20team%20building%20custom%20platforms%20and%20digital%20solutions%2C%20clean%20tech%20workspace%20with%20development%20tools%20and%20custom%20applications&width=400&height=300&seq=development-service&orientation=landscape',
      href: '/services/custom',
      iconBg: 'bg-purple-50 text-purple-600',
      iconClass: 'ri-code-s-slash-line text-purple-600 text-2xl',
    },
    {
      id: 'integrations',
      title: 'System Integrations',
      desc:
        'Seamlessly connect your existing tools and platforms for improved data flow and operational efficiency.',
      image:
        'https://readdy.ai/api/search-image?query=System%20integration%20concept%20with%20multiple%20platforms%20and%20applications%20connected%20through%20APIs%20and%20data%20flows%2C%20modern%20business%20software%20integration%20dashboard%20showing%20connected%20systems%20and%20data%20synchronization%2C%20professional%20IT%20infrastructure%20with%20integrated%20platforms%20and%20seamless%20data%20exchange&width=400&height=300&seq=integration-service&orientation=landscape',
      href: '/services/integrations',
      iconBg: 'bg-indigo-50 text-indigo-600',
      iconClass: 'ri-links-line text-indigo-600 text-2xl',
    },
    {
      id: 'audit',
      title: 'Process Audit',
      desc:
        'Comprehensive analysis of your current processes to identify optimization opportunities and efficiency gains.',
      image:
        'https://readdy.ai/api/search-image?query=Business%20process%20audit%20and%20analysis%20with%20professional%20consultants%20reviewing%20workflows%20and%20efficiency%20metrics%2C%20modern%20office%20environment%20with%20business%20analysts%20examining%20process%20documentation%20and%20performance%20charts%2C%20professional%20audit%20team%20conducting%20business%20process%20evaluation%20with%20data%20analysis%20tools&width=400&height=300&seq=audit-service&orientation=landscape',
      href: '/services/audit',
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconClass: 'ri-file-search-line text-emerald-600 text-2xl',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center">
          Our <span className="text-[#2A73DD]">Core Services</span>
        </h2>
        <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
          Comprehensive business solutions designed to optimize your operations and drive sustainable growth
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="group rounded-3xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(42,115,221,0.15)] transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
              </div>

              <div className="p-6 md:p-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.iconBg} mb-4`}>
                  <i className={s.iconClass} aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-3 text-gray-600">{s.desc}</p>

                <div className="mt-6">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-[#2A73DD] font-semibold hover:underline"
                  >
                    Learn More <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA под сеткой через ActionButtons */}
        <div className="mt-12 flex justify-center">
          <ActionButtons
            buttons={[
              {
                text: 'View all Services',
                href: '/services',
                className:
                  'group relative px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-[#1f63c5] transition-all duration-300 hover:scale-105 shadow-lg',
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}