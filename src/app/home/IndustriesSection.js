import { getTranslations } from 'next-intl/server';
import IconInfoCard from '../../components/ui/IconInfoCard';
import { industriesItems, whyChooseItems } from '../../data/homeItems';
import ActionButtons from '../../components/ui/ActionButtons';

export default async function IndustriesSection({
  i18nSection = 'industries', // ключ секции в messages: 'industries' | 'whyChoose' | ...
  title,
  titlePrefix,
  titleAccent,
  subtitle,
  items,
  button,
  className = '',
} = {}) {
  const t = await getTranslations('home');

  const finalTitlePrefix =
    titlePrefix ?? t(`${i18nSection}.titlePrefix`, { defaultMessage: 'Industries' });
  const finalTitleAccent =
    titleAccent ?? t(`${i18nSection}.titleAccent`, { defaultMessage: 'We Serve' });
  const finalSubtitle =
    subtitle ??
    t(`${i18nSection}.subtitle`, {
      defaultMessage:
        'Specialized solutions tailored to the unique challenges and opportunities in your industry',
    });

  // Источник карточек: переданные items или набор из homeItems по ключу секции
  const itemsMap = {
    industries: industriesItems,
    whyChoose: whyChooseItems,
  };
  const source = Array.isArray(items) && items.length > 0 ? items : (itemsMap[i18nSection] || industriesItems);

  const cards = source.map((it, idx) => {
    const key = it.key ?? String(idx);
    const titleText =
      it.title ??
      t(`${i18nSection}.${key}.title`, { defaultMessage: it.title ?? '' });
    const descriptionText =
      it.description ??
      t(`${i18nSection}.${key}.description`, { defaultMessage: it.description ?? '' });

    const iconNode = typeof it.icon === 'string' ? <span>{it.icon}</span> : it.icon;

    return (
      <IconInfoCard
        key={key}
        size="lg"
        title={titleText}
        description={descriptionText}
        iconBg={it.iconBg}
        iconColor={it.iconColor}
        icon={<div className="text-2xl">{iconNode}</div>}
      />
    );
  });

  const defaultButton = {
    text: t(`${i18nSection}.button`, { defaultMessage: 'Explore →' }),
    href: '/services',
    className:
      'group relative px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-[#1f63c5] transition-all duration-300 hover:scale-105 shadow-lg',
  };
  const finalButton =
    button === false ? null : { ...defaultButton, ...(button || {}) };

  return (
    <section className={`relative py-20 bg-blue-50/50 ${className}`}>
      <div className="container mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800">
          {title ?? (
            <>
              {finalTitlePrefix}{' '}
              <span className="text-blue-600">{finalTitleAccent}</span>
            </>
          )}
        </h2>

        <p className="mt-4 text-center text-slate-500 max-w-3xl mx-auto">
          {finalSubtitle}
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards}
        </div>

        {finalButton && (
          <div className="mt-12 flex justify-center">
            <ActionButtons buttons={[finalButton]} />
          </div>
        )}
      </div>
    </section>
  );
}