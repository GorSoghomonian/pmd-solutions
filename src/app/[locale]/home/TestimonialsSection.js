'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function TestimonialsSection({ className = '' } = {}) {
  const t = useTranslations('home');
  const messages = useMessages();
  const mt = messages?.home?.testimonials ?? {};


  const defaultAvatar =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#2A73DD" offset="0"/><stop stop-color="#1e3a8a" offset="1"/></linearGradient></defs><rect fill="url(#g)" width="100" height="100"/><circle cx="50" cy="40" r="18" fill="#ffffff"/><rect x="22" y="64" width="56" height="18" rx="9" fill="#ffffff"/></svg>`
    );


  const baseAuthor = t('testimonials.author', { fallback: 'David Chen' });
  const baseRole = t('testimonials.role', { fallback: 'Founding Partner' });
  const baseCompany = t('testimonials.company', { fallback: 'Elite Real Estate' });
  const baseQuote = t('testimonials.quote', {
    fallback:
      'The custom development work PMD delivered exceeded our expectations. Our property management platform now handles 10x more transactions seamlessly.',
  });
  const baseAvatar = t('testimonials.avatarUrl', { fallback: '' });


  const slides = useMemo(() => {
    const getItem = (i) => ({
      quote: t(`testimonials.items.${i}.quote`, { fallback: baseQuote }),
      avatarUrl: t(`testimonials.items.${i}.avatarUrl`, { fallback: baseAvatar }),
      author: t(`testimonials.items.${i}.author`, { fallback: baseAuthor }),
      role: t(`testimonials.items.${i}.role`, { fallback: baseRole }),
      company: t(`testimonials.items.${i}.company`, { fallback: baseCompany }),
    });
    return [0, 1, 2, 3].map(getItem);
  }, [t, baseQuote, baseAvatar, baseAuthor, baseRole, baseCompany]);


  const [index, setIndex] = useState(0);


  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' }, [autoplay.current]);
  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    onSelect();
    return () => embla.off('select', onSelect);
  }, [embla]);

  const goTo = (i) => embla?.scrollTo(i);
  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  // Высота карточек = как у первого слайда
  const cardRefs = useRef([]);
  const [cardHeight, setCardHeight] = useState(0);
  useEffect(() => {
    const first = cardRefs.current[0];
    if (!first) return;
    const measure = () => setCardHeight(first.offsetHeight || 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(first);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [slides]);

  // Фолбэк для битых URL
  const [broken, setBroken] = useState({});
  const onImgError = (i) => setBroken((p) => ({ ...p, [i]: true }));
  const getAvatarSrc = (src, i) => (broken[i] || !src ? defaultAvatar : src);

  // Заголовки из messages
  const titlePrefix = mt.titlePrefix ?? 'What Our';
  const titleAccent = mt.titleAccent ?? 'Clients Say';
  const subtitle =
    mt.subtitle ?? 'Real results from real businesses who trust PMD Solutions with their digital transformation';

  // KPI под каруселью (берём из messages, если есть)
  const defaultKpis = [
    { value: '98%',  label: 'Client Satisfaction' },
    { value: '250%', label: 'Average ROI Increase' },
    { value: '45',   label: 'Hours Saved Weekly' },
    { value: '100%', label: 'Project Success Rate' },
  ];
  const kpis = useMemo(() => {
    if (Array.isArray(mt.kpis) && mt.kpis.length) {
      return mt.kpis
        .map((k, i) => ({
          value: k?.value ?? defaultKpis[i]?.value ?? '',
          label: k?.label ?? defaultKpis[i]?.label ?? '',
        }))
        .slice(0, 4);
    }
    return defaultKpis;
  }, [mt.kpis]);

  return (
    <div className={`relative bg-white rounded-t-3xl shadow-[0_6px_18px_-4px_rgba(0,0,0,0.08)] -mt-10 z-10 overflow-hidden ${className}`}>
      <section id="testimonials-section" className="py-20 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {titlePrefix} <span className="text-[#2A73DD]">{titleAccent}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Карусель */}
          <div className="max-w-4xl mx-auto mb-16 relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((s, i) => (
                  <div key={i} className="min-w-0 flex-[0_0_100%] px-0 group rounded-3xl overflow-hidden bg-white shadow-[0_6px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transform transition-transform duration-300 hover:-translate-y-1">
                    <div
                      ref={(el) => (cardRefs.current[i] = el)}
                      className="bg-gradient-to-br from-[#2A73DD] to-blue-800 rounded-3xl p-12 text-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] min-h-[280px]"
                      style={{ height: cardHeight || undefined }}
                    >
                      <div className="mb-8">
                        <div className="flex justify-center mb-4" aria-label="5 star rating">
                          <i className="ri-star-fill text-yellow-400 text-2xl" />
                          <i className="ri-star-fill text-yellow-400 text-2xl" />
                          <i className="ri-star-fill text-yellow-400 text-2xl" />
                          <i className="ri-star-fill text-yellow-400 text-2xl" />
                          <i className="ri-star-fill text-yellow-400 text-2xl" />
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-medium leading-tight mb-8">“{s.quote}”</blockquote>
                      </div>

                      <div className="flex items-center justify-center gap-3 md:gap-4 mt-0">
                        <button
                          type="button"
                          aria-label="Previous slide"
                          onClick={scrollPrev}
                          className="p-2 md:p-2.5 text-white/90 hover:text-white transition"
                        >
                          <i className="ri-arrow-left-s-line text-2xl md:text-3xl" />
                        </button>

                        <div className="flex items-center justify-center space-x-4">
                          <Image
                            src={getAvatarSrc(s.avatarUrl, i)}
                            alt={s.author || baseAuthor}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
                            onError={() => onImgError(i)}
                            unoptimized
                          />
                          <div className="text-left">
                            <div className="font-bold text-xl">{s.author || baseAuthor}</div>
                            <div className="text-blue-200">{s.role || baseRole}</div>
                            <div className="text-blue-200 font-medium">{s.company || baseCompany}</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label="Next slide"
                          onClick={scrollNext}
                          className="p-2 md:p-2.5 text-white/90 hover:text-white transition"
                        >
                          <i className="ri-arrow-right-s-line text-2xl md:text-3xl" />
                        </button>
                      </div>

                      <div className="flex justify-center space-x-3 mt-8">
                        {slides.map((_, d) => (
                          <button
                            key={d}
                            aria-label={`Go to slide ${d + 1}`}
                            onClick={() => goTo(d)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === d ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KPI блок под каруселью */}
          <div className="max-w-5xl mx-auto pt-12 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {kpis.map((k, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-extrabold text-[#2A73DD]">{k.value}</div>
                  <div className="mt-2 text-sm md:text-base text-gray-500">{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-[105%] -translate-x-1/2 rounded-full"
          style={{
            boxShadow: '0 10px 24px -12px rgba(40, 61, 77, 0.16)'
          }}
        />
      </section>
    </div>
  );
}