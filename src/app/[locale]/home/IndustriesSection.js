import { getTranslations } from 'next-intl/server';
import IconInfoCard from '../../../components/molecules/IconInfoCard';
import { industriesItems, whyChooseItems } from '../../../data/homeItems';
import ActionButtons from '../../../components/molecules/ActionButtons';
import RevealOnScroll from '../../../components/molecules/RevealOnScroll';

export default async function IndustriesSection({
  locale = 'en',
  i18nSection = 'industries',
  title,
  titlePrefix,
  titleAccent,
  subtitle,
  items,
  button,
  footer, 
  className = '',
} = {}) {
  const t = await getTranslations({locale, namespace: 'home'});
  
  const safeT = (key, def) => {
    try {
      return t(key, { default: def });
    } catch {
      return def;
    }
  };

  const finalTitlePrefix = titlePrefix ?? t(`${i18nSection}.titlePrefix`, { default: 'Industries' });
  const finalTitleAccent = titleAccent ?? t(`${i18nSection}.titleAccent`, { default: 'We Serve' });
  const finalSubtitle = subtitle ?? t(`${i18nSection}.subtitle`, {
    default: 'Specialized solutions tailored to the unique challenges and opportunities in your industry',
  });

  // Источник карточек
  const itemsMap = {
    industries: industriesItems,
    whyChoose: whyChooseItems,
  };
  const source = Array.isArray(items) && items.length > 0 ? items : (itemsMap[i18nSection] || industriesItems);

  const cards = source.map((it, idx) => {
    const key = it.key ?? String(idx);
    const titleText =
      it.title ??
      t(`${i18nSection}.${key}.title`, { default: it.title ?? '' });
    const descriptionText =
      it.description ??
      t(`${i18nSection}.${key}.description`, { default: it.description ?? '' });

    const iconNode = typeof it.icon === 'string' ? <span>{it.icon}</span> : it.icon;

    return (
      <div
        key={key}
        className="group h-full rounded-3xl overflow-hidden bg-white will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2
                  [&_h3]:transition-colors [&_h3]:duration-500
                  hover:[&_h3]:text-[#2A73DD] shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
      >
        <IconInfoCard
          size="lg"
          title={titleText}
          description={descriptionText}
          iconBg={it.iconBg}
          iconColor={it.iconColor}
          icon={<div className="text-2xl">{iconNode}</div>}
          delay={100 * idx}
        />
      </div>
    );
  });

  // безопасное получение текста кнопки
  const buttonText = safeT(`${i18nSection}.button`, 'Explore →');

  const defaultButton = {
    text: buttonText,
    href: `/${locale}/industries`,
    className:
      'group relative px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-[#1f63c5] transition-all duration-300 hover:scale-105 shadow-lg',
  };
  const finalButton = button === false ? null : { ...defaultButton, ...(button || {}) };

  const defaultBadgesFooter = i18nSection === 'whyChoose' ? (
    <div className="mt-20 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">
        {t('whyChoose.badges.title', { default: 'Our Certifications & Partnerships' })}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        <div className="flex items-center space-x-2 bg-orange-50 px-6 py-3 rounded-full">
          <i className="ri-award-fill text-orange-600 text-xl"></i>
          <span className="font-semibold text-gray-700">
            {t('whyChoose.badges.hubspot', { default: 'HubSpot Certified' })}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-full">
          <i className="ri-verified-badge-line text-green-600 text-xl"></i>
          <span className="font-semibold text-gray-700">
            {t('whyChoose.badges.partner', { default: 'Business Plus Partner' })}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-purple-50 px-6 py-3 rounded-full">
          <i className="ri-star-line text-purple-600 text-xl"></i>
          <span className="font-semibold text-gray-700">
            {t('whyChoose.badges.topAgency', { default: 'Top Rated Agency' })}
          </span>
        </div>
      </div>
    </div>
  ) : null;


  const computedFooter = footer !== undefined ? footer : defaultBadgesFooter;

  return (
    <section className={`relative isolate py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800">
          {title ?? (
            <>
              {finalTitlePrefix}{' '}
              <span className="text-blue-600">{finalTitleAccent}</span>
            </>
          )}
        </h2>

        <p className="mt-4 text-center text-xl text-slate-500 max-w-3xl mx-auto">
          {finalSubtitle}
        </p>

        <RevealOnScroll threshold={0.25} rootMargin="0px 0px -10% 0px">
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards}
          </div>
        </RevealOnScroll>

        {computedFooter ? (
          <div className="mt-12 flex justify-center pb-5">
            {computedFooter}
          </div>
        ) : (
          finalButton && (
            <div className="mt-12 flex justify-center">
              <ActionButtons buttons={[finalButton]} />
            </div>
          )
        )}
      </div>
      <div
  aria-hidden
  className="pointer-events-none absolute -bottom-8 left-1/2 h-12 w-[115%] -translate-x-1/2 rounded-full bg-black/10 blur-2xl"
></div>
    </section>
  );
}