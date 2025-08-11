import { getTranslations, getMessages } from 'next-intl/server';
import Link from 'next/link';
import ActionButtons from '../../components/ui/ActionButtons';
import Image from 'next/image';

import { servicesData, servicesItems } from '../../data/homeItems';

export default async function CoreServices({
  i18nSection = 'coreServices',
  title,
  titlePrefix,
  titleAccent,
  subtitle,
  items,
  button,
  className = '',
} = {}) {
  const t = await getTranslations('home');
  const allMessages = await getMessages();
  const homeMsgs = allMessages?.home ?? {};

  const safeT = (key, def) => {
    try {
      return t(key, { default: def });
    } catch {
      return def;
    }
  };

  const finalTitlePrefix =
    titlePrefix ?? safeT(`${i18nSection}.titlePrefix`, 'Our');
  const finalTitleAccent =
    titleAccent ?? safeT(`${i18nSection}.titleAccent`, 'Core Services');
  const finalSubtitle =
    subtitle ??
    safeT(
      `${i18nSection}.subtitle`,
      'Comprehensive business solutions designed to optimize your operations and drive sustainable growth'
    );

  const source =
    Array.isArray(items) && items.length > 0
      ? items
      : (servicesData?.services ?? servicesItems);

  const hasLearnMore = homeMsgs?.[i18nSection]?.learnMore != null;
  const learnMoreText = hasLearnMore
    ? safeT(`${i18nSection}.learnMore`, 'Learn More')
    : 'Learn More';

  const hasButton = homeMsgs?.[i18nSection]?.viewAllServices != null;
  const buttonText = hasButton
    ? safeT(`${i18nSection}.viewAllServices`, 'View all Services')
    : 'View all Services';

  const defaultButton = {
    text: buttonText,
    href: '/services',
    className:
      'group relative px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-[#1f63c5] transition-all duration-300 hover:scale-105 shadow-lg',
  };
  const finalButton = button === false ? null : { ...defaultButton, ...(button || {}) };

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center">
          {title ?? (
            <>
              {finalTitlePrefix}{' '}
              <span className="text-[#2A73DD]">{finalTitleAccent}</span>
            </>
          )}
        </h2>
        <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
          {finalSubtitle}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {source.map((s) => {
            const lsTitle = safeT(`${i18nSection}.services.${s.id}.title`, s.title ?? s.id);
            const lsDesc = safeT(`${i18nSection}.services.${s.id}.desc`, s.description ?? '');

            return (
              <div
                key={s.id}
                className="group rounded-3xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(42,115,221,0.15)] transition-shadow"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={lsTitle}
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
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{lsTitle}</h3>
                  <p className="mt-3 text-gray-600">{lsDesc}</p>

                  <div className="mt-6">
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-2 text-[#2A73DD] font-semibold hover:underline"
                    >
                      {learnMoreText}{' '}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
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