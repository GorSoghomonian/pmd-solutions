import { getTranslations, getMessages } from 'next-intl/server';
import IconInfoCard from '../../components/ui/IconInfoCard';
import { industriesItems, whyChooseItems } from '../../data/homeItems';
import ActionButtons from '../../components/ui/ActionButtons';
import RevealOnScroll from '../../components/ui/RevealOnScroll';

export default async function IndustriesSection({
  i18nSection = 'industries',
  title,
  titlePrefix,
  titleAccent,
  subtitle,
  items,
  button,
  footer, // NEW: кастомный футер вместо кнопки
  className = '',
} = {}) {
  const t = await getTranslations('home');
  const allMessages = await getMessages();
  const homeMsgs = allMessages?.home ?? {};

  // безопасный перевод с фолбэком
  const safeT = (key, def) => {
    try {
      return t(key, { default: def });
    } catch {
      return def;
    }
  };

  const finalTitlePrefix =
    titlePrefix ?? t(`${i18nSection}.titlePrefix`, { default: 'Industries' });
  const finalTitleAccent =
    titleAccent ?? t(`${i18nSection}.titleAccent`, { default: 'We Serve' });
  const finalSubtitle =
    subtitle ??
    t(`${i18nSection}.subtitle`, {
      default:
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
      t(`${i18nSection}.${key}.title`, { default: it.title ?? '' });
    const descriptionText =
      it.description ??
      t(`${i18nSection}.${key}.description`, { default: it.description ?? '' });

    const iconNode = typeof it.icon === 'string' ? <span>{it.icon}</span> : it.icon;

    return (
      <div
        key={key}
        className="group h-full will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2
                  [&_h3]:transition-colors [&_h3]:duration-500
                  hover:[&_h3]:text-[#2A73DD]"
      >
        <IconInfoCard
          size="lg"
          title={titleText}
          description={descriptionText}
          iconBg={it.iconBg}
          iconColor={it.iconColor}
          icon={<div className="text-2xl">{iconNode}</div>}
          delay={100 * idx} // 0ms, 100ms, 200ms, ...
        />
      </div>
    );
  });

  // безопасное получение текста кнопки (не вызываем t, если ключа нет)
  const hasButton = homeMsgs?.[i18nSection]?.button != null;
  const buttonText = hasButton ? t(`${i18nSection}.button`) : 'Explore →';

  const defaultButton = {
    text: buttonText,
    href: '/services',
    className:
      'group relative px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-[#1f63c5] transition-all duration-300 hover:scale-105 shadow-lg',
  };
  const finalButton = button === false ? null : { ...defaultButton, ...(button || {}) };

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

        <p className="mt-4 text-center text-slate-500 max-w-3xl mx-auto">
          {finalSubtitle}
        </p>

        <RevealOnScroll threshold={0.25} rootMargin="0px 0px -10% 0px">
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards}
          </div>
        </RevealOnScroll>

        {footer ? (
          <div className="mt-12 flex justify-center pb-5">
            {footer}
          </div>
        ) : (
          finalButton && (
            <div className="mt-12 flex justify-center">
              <ActionButtons buttons={[finalButton]} />
            </div>
          )
        )}
      </div>

      {/* нижняя тень (длиннее и мягче) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 h-12 w-[115%] -translate-x-1/2 rounded-full bg-slate-300/40 blur-2xl"
      />
    </section>
  );
}