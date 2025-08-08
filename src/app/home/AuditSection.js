import Image from 'next/image';
import FeatureCard from '../../components/ui/FeatureCard';
import ActionButtons from '../../components/ui/ActionButtons';
import {useTranslations} from 'next-intl';

export default function AuditSection({
  title,
  subtitle,
  items = [],
  imageSrc = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  imageAlt = 'Business Process Audit'
}) {
  const tAudit = useTranslations('home.audit');          // общий раздел
  const tCards = useTranslations('home.audit.cards');    // карточки

  const list = Array.isArray(items) ? items : [];
  if (!list.length) return null;

  const localized = list.map(it => ({
    ...it,
    // Если ключ уже содержит .title / .desc — не добавляем второй раз
    title: it.titleKey
      ? tCards(it.titleKey.endsWith('.title') ? it.titleKey : `${it.titleKey}.title`)
      : it.title,
    description: it.descriptionKey
      ? tCards(it.descriptionKey.endsWith('.desc') ? it.descriptionKey : `${it.descriptionKey}.desc`)
      : it.description
  }));

  return (
    <section className="relative mt-24 pb-20">
      <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-6">
                <span className="text-2xl text-green-600">🛡️</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                {title || tAudit('title')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {subtitle || tAudit('description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {localized.map((item, idx) => (
                <FeatureCard key={idx} {...item} />
              ))}
            </div>

            <div className="mb-10">
              <h4 className="font-semibold text-gray-900 mb-2">
                {tAudit('gainHeading')}
              </h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-green-700 text-[15px]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><span>✅</span>{tAudit('gains.identify')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{tAudit('gains.compliance')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{tAudit('gains.decisions')}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><span>✅</span>{tAudit('gains.costs')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{tAudit('gains.productivity')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{tAudit('gains.resources')}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ActionButtons
                buttons={[
                  {
                    text: tAudit('btnLearnMore'),
                    href: '/services/audit',
                    className:
                      'px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
                  },
                  {
                    text: tAudit('btnSchedule'),
                    href: '/contact',
                    icon: '🗓️',
                    className:
                      'px-8 py-4 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105 text-center whitespace-nowrap cursor-pointer flex items-center gap-2'
                  }
                ]}
              />
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-[16/10] rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-green-500/15 to-transparent" />
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">35%</div>
                  <div className="text-sm text-gray-600">{tAudit('statCostReduction')}</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-gray-600">{tAudit('statAuditsCompleted')}</div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/40">
                  <span className="text-white text-2xl">🛡️</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}