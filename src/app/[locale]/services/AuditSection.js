import Image from 'next/image';
import FeatureCard from '../../../components/molecules/FeatureCard';
import ActionButtons from '../../../components/molecules/ActionButtons';
import { getTranslations } from 'next-intl/server';
import { getAllHubSpotData } from '../../../lib/api'; 
import { auditItems } from '../../../data/homeItems';

export default async function AuditSection({
  locale,
  title,
  subtitle,
  items = [],
  imageSrc = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  imageAlt = 'Business Process Audit'
}) {
  const t = await getTranslations({ locale, namespace: 'home' });

  console.log('🔄 AuditSection: Fetching data from API...');
  const apiData = await getAllHubSpotData();
  const finalItems = apiData.auditItems?.length ? apiData.auditItems : (items.length ? items : auditItems);
  
  console.log('📋 AuditSection: Final items count:', finalItems.length);
  console.log('📋 Raw item example:', finalItems[0]);

  if (!finalItems.length) return null;

  const localized = finalItems.map(it => {
    let title = it.title || '';
    let description = it.description || '';
    if (it.titleKey && it.titleKey.includes('.')) {
      const [section, field] = it.titleKey.split('.');
      const translationKey = `audit.cards.${section}.${field}`;
      title = t(translationKey, { default: `Missing: ${translationKey}` });
      console.log(`🔍 Translation lookup: "${translationKey}" -> "${title}"`);
    } else if (it.titleKey) {
      
      const translationKey = `audit.cards.${it.titleKey}`;
      title = t(translationKey, { default: `Missing: ${translationKey}` });
      console.log(`🔍 Translation lookup: "${translationKey}" -> "${title}"`);
    }
    
    if (it.descriptionKey && it.descriptionKey.includes('.')) {
      const [section, field] = it.descriptionKey.split('.');
      const translationKey = `audit.cards.${section}.${field}`;
      description = t(translationKey, { default: `Missing: ${translationKey}` });
    } else if (it.descriptionKey) {
      
      const translationKey = `audit.cards.${it.descriptionKey}`;
      description = t(translationKey, { default: `Missing: ${translationKey}` });
    }

    if (!title || title.includes('Missing:')) {
      const testTitles = ['Process Analysis', 'Compliance Review', 'Efficiency Assessment', 'Recommendations'];
      title = testTitles[finalItems.indexOf(it)] || 'Test Title';
    }
    
    if (!description || description.includes('Missing:')) {
      const testDescriptions = [
        'In-depth review of current workflows and bottlenecks',
        'Ensure processes meet standards and regulations', 
        'Measure KPIs and identify optimization opportunities',
        'Strategic recommendations for process improvements'
      ];
      description = testDescriptions[finalItems.indexOf(it)] || 'Test Description';
    }

    let icon = it.icon;
    if (typeof it.icon === 'string' && it.icon.includes('<i class="ri-')) {
      const classMatch = it.icon.match(/class="([^"]+)"/);
      if (classMatch) {
        const iconClass = classMatch[1];
        icon = <i className={iconClass} />;
      }
    }

    console.log(`🔤 Processing item: titleKey="${it.titleKey}" -> title="${title}"`);
    console.log(`📝 Final title/desc:`, { title, description });

    return {
      ...it,
      icon,
      title,
      description
    };
  });

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
                {title || t('audit.title')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {subtitle || t('audit.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {localized.map((item, idx) => {
                const { key, ...itemProps } = item;
                return (
                  <FeatureCard 
                    key={item.key || idx} 
                    {...itemProps}
                    reverse={idx % 2 === 1} 
                  />
                );
              })}
            </div>

            <div className="mb-10">
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('audit.gainHeading')}
              </h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-green-700 text-[15px]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><span>✅</span>{t('audit.gains.identify')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{t('audit.gains.compliance')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{t('audit.gains.decisions')}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><span>✅</span>{t('audit.gains.costs')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{t('audit.gains.productivity')}</div>
                  <div className="flex items-center gap-2"><span>✅</span>{t('audit.gains.resources')}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ActionButtons
                buttons={[
                  {
                    text: t('audit.btnLearnMore'),
                    href: '/',
                    className:
                      'px-8 py-4 bg-green-600  border-2 border-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
                  },
                  {
                    text: t('audit.btnSchedule'),
                    href: '/',
                    icon: '🗓️',
                    className:
                      'px-8 py-4 border-2 border-green-600 text-green-600 hover:text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer'
                  }
                ]}
              />
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-[16/10] hidden md:block">
              <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className=" absolute inset-0 bg-gradient-to-tr from-green-500/15 to-transparent rounded-2xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/40">
                    <span className="text-white text-2xl">🛡️</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">35%</div>
                  <div className="text-sm text-gray-600">{t('audit.statCostReduction')}</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-gray-600">{t('audit.statAuditsCompleted')}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}