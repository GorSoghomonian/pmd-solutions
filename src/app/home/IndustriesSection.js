import { getTranslations } from 'next-intl/server';
import IconInfoCard from '../../components/ui/IconInfoCard';
import { industriesItems } from '../../data/homeItems';
import ActionButtons from '../../components/ui/ActionButtons';

export default async function IndustriesSection() {
  const t = await getTranslations('home');
  const items = industriesItems;

  return (
    <section className="relative py-20 bg-blue-50/50">
      <div className="container mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800">
          {t('industries.titlePrefix', { defaultMessage: 'Industries' })}{' '}
          <span className="text-blue-600">
            {t('industries.titleAccent', { defaultMessage: 'We Serve' })}
          </span>
        </h2>
        <p className="mt-4 text-center text-slate-500 max-w-3xl mx-auto">
          {t('industries.subtitle', {
            defaultMessage:
              'Specialized solutions tailored to the unique challenges and opportunities in your industry',
          })}
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it) => (
            <IconInfoCard
              key={it.key}
              size="lg"
              title={t(`industries.${it.key}.title`)}
              description={t(`industries.${it.key}.description`)}
              iconBg={it.iconBg}
              iconColor={it.iconColor}
              icon={
                <div className="text-2xl">
                  {it.icon}
                </div>
              }
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
        <ActionButtons
              buttons={[
                {
                  text: 'Explore Industries →',
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